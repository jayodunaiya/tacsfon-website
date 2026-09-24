import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import { getEditorialBySlug } from "@/lib/editorials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

// ---------------------------------------------
// Helpers
// ---------------------------------------------

function sanitizeFilename(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function cleanText(value: string) {
  return value
    .replace(/\r/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/\u00a0/g, " ")
    .trim();
}

// ---------------------------------------------
// GET
// ---------------------------------------------

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;

    const editorial = await getEditorialBySlug(slug);

    if (!editorial) {
      return NextResponse.json(
        {
          error: "Editorial not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ---------------------------------------------
    // PDF setup
    // ---------------------------------------------

    const pdf = await PDFDocument.create();

    pdf.setTitle(editorial.title);
    pdf.setAuthor("TACSFON LAUTECH");
    pdf.setSubject("TACSFON Editorial Publication");
    pdf.setCreator("TACSFON LAUTECH");

    const regularFont = await pdf.embedFont(
      StandardFonts.Helvetica
    );

    const boldFont = await pdf.embedFont(
      StandardFonts.HelveticaBold
    );

    const italicFont = await pdf.embedFont(
      StandardFonts.HelveticaOblique
    );

    // A4
    const PAGE_WIDTH = 595.28;
    const PAGE_HEIGHT = 841.89;

    const LEFT = 55;
    const RIGHT = 55;
    const TOP = 75;
    const BOTTOM = 65;

    const CONTENT_WIDTH =
      PAGE_WIDTH - LEFT - RIGHT;

    const green = rgb(
      22 / 255,
      101 / 255,
      52 / 255
    );

    const black = rgb(
      20 / 255,
      20 / 255,
      20 / 255
    );

    const grey = rgb(
      110 / 255,
      110 / 255,
      110 / 255
    );

    const lightGrey = rgb(
      220 / 255,
      220 / 255,
      220 / 255
    );

    // ---------------------------------------------
    // Text wrapping
    // ---------------------------------------------

    function wrapText(
      text: string,
      font: typeof regularFont,
      fontSize: number,
      maxWidth: number
    ) {
      const words = cleanText(text)
        .split(/\s+/)
        .filter(Boolean);

      const lines: string[] = [];

      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine
          ? `${currentLine} ${word}`
          : word;

        const width =
          font.widthOfTextAtSize(
            testLine,
            fontSize
          );

        if (width <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
          }

          currentLine = word;
        }
      }

      if (currentLine) {
        lines.push(currentLine);
      }

      return lines;
    }

    // ---------------------------------------------
    // Create first page
    // ---------------------------------------------

    let page = pdf.addPage([
      PAGE_WIDTH,
      PAGE_HEIGHT,
    ]);

    let y = PAGE_HEIGHT - TOP;

    // ---------------------------------------------
    // Page header
    // ---------------------------------------------

    function drawHeader() {
      page.drawText(
        "TACSFON LAUTECH",
        {
          x: LEFT,
          y: PAGE_HEIGHT - 40,
          size: 8,
          font: boldFont,
          color: green,
        }
      );

      const label = "EDITORIAL";

      const labelWidth =
        boldFont.widthOfTextAtSize(
          label,
          8
        );

      page.drawText(label, {
        x:
          PAGE_WIDTH -
          RIGHT -
          labelWidth,
        y: PAGE_HEIGHT - 40,
        size: 8,
        font: boldFont,
        color: grey,
      });

      page.drawLine({
        start: {
          x: LEFT,
          y: PAGE_HEIGHT - 52,
        },

        end: {
          x:
            PAGE_WIDTH -
            RIGHT,
          y: PAGE_HEIGHT - 52,
        },

        thickness: 0.5,
        color: lightGrey,
      });
    }

    function newPage() {
      page = pdf.addPage([
        PAGE_WIDTH,
        PAGE_HEIGHT,
      ]);

      y = PAGE_HEIGHT - TOP;

      drawHeader();
    }

    function ensureSpace(
      amount: number
    ) {
      if (
        y - amount <
        BOTTOM
      ) {
        newPage();
      }
    }

    // ---------------------------------------------
    // Generic paragraph renderer
    // ---------------------------------------------

    function drawParagraph(
      text: string,
      options?: {
        size?: number;
        lineHeight?: number;
        bold?: boolean;
        italic?: boolean;
        muted?: boolean;
        spacingAfter?: number;
      }
    ) {
      const size =
        options?.size ?? 11;

      const lineHeight =
        options?.lineHeight ?? 18;

      const spacingAfter =
        options?.spacingAfter ?? 12;

      let font = regularFont;

      if (options?.bold) {
        font = boldFont;
      }

      if (options?.italic) {
        font = italicFont;
      }

      const lines = wrapText(
        text,
        font,
        size,
        CONTENT_WIDTH
      );

      for (const line of lines) {
        ensureSpace(lineHeight);

        page.drawText(line, {
          x: LEFT,
          y,
          size,
          font,
          color: options?.muted
            ? grey
            : black,
        });

        y -= lineHeight;
      }

      y -= spacingAfter;
    }

    // ---------------------------------------------
    // FIRST PAGE HEADER
    // ---------------------------------------------

    drawHeader();

    // ---------------------------------------------
    // Publication label
    // ---------------------------------------------

    page.drawText(
      "EDITORIAL PUBLICATION",
      {
        x: LEFT,
        y,
        size: 8,
        font: boldFont,
        color: green,
      }
    );

    y -= 30;

    // ---------------------------------------------
    // Title
    // ---------------------------------------------

    const titleLines =
      wrapText(
        editorial.title,
        boldFont,
        25,
        CONTENT_WIDTH
      );

    for (const line of titleLines) {
      ensureSpace(32);

      page.drawText(line, {
        x: LEFT,
        y,
        size: 25,
        font: boldFont,
        color: black,
      });

      y -= 31;
    }

    y -= 10;

    // ---------------------------------------------
    // Category
    // ---------------------------------------------

    const category =
      editorial.category ||
      "Editorial";

    page.drawText(
      category.toUpperCase(),
      {
        x: LEFT,
        y,
        size: 8,
        font: boldFont,
        color: green,
      }
    );

    y -= 18;

    // ---------------------------------------------
    // Date
    // ---------------------------------------------

    page.drawText(
      formatDate(
        editorial.published_at
      ),
      {
        x: LEFT,
        y,
        size: 9,
        font: regularFont,
        color: grey,
      }
    );

    y -= 25;

    // ---------------------------------------------
    // Divider
    // ---------------------------------------------

    page.drawLine({
      start: {
        x: LEFT,
        y,
      },

      end: {
        x:
          PAGE_WIDTH -
          RIGHT,
        y,
      },

      thickness: 0.5,
      color: lightGrey,
    });

    y -= 28;

    // ---------------------------------------------
    // Excerpt
    // ---------------------------------------------

    if (
      editorial.excerpt &&
      editorial.excerpt.trim()
    ) {
      drawParagraph(
        editorial.excerpt,
        {
          size: 12,
          lineHeight: 19,
          italic: true,
          muted: true,
          spacingAfter: 20,
        }
      );
    }

    // ---------------------------------------------
    // Article content
    // ---------------------------------------------

    const paragraphs =
      editorial.content
        .split(/\n\s*\n/)
        .map((paragraph) =>
          paragraph.trim()
        )
        .filter(Boolean);

    for (
      const paragraph
      of paragraphs
    ) {
      drawParagraph(
        paragraph,
        {
          size: 11,
          lineHeight: 18,
          spacingAfter: 12,
        }
      );
    }

    // ---------------------------------------------
    // Ending
    // ---------------------------------------------

    ensureSpace(85);

    y -= 5;

    page.drawLine({
      start: {
        x: LEFT,
        y,
      },

      end: {
        x: LEFT + 55,
        y,
      },

      thickness: 2,
      color: green,
    });

    y -= 25;

    page.drawText(
      "TACSFON LAUTECH CHAPTER",
      {
        x: LEFT,
        y,
        size: 9,
        font: boldFont,
        color: black,
      }
    );

    y -= 15;

    page.drawText(
      "The Apostolic Church Students' Fellowship of Nigeria",
      {
        x: LEFT,
        y,
        size: 8,
        font: regularFont,
        color: grey,
      }
    );

    // ---------------------------------------------
    // Page numbers
    // ---------------------------------------------

    const pages =
      pdf.getPages();

    pages.forEach(
      (
        currentPage,
        index
      ) => {
        const number =
          `${index + 1} / ${pages.length}`;

        const width =
          regularFont.widthOfTextAtSize(
            number,
            8
          );

        currentPage.drawText(
          number,
          {
            x:
              PAGE_WIDTH -
              RIGHT -
              width,
            y: 30,
            size: 8,
            font: regularFont,
            color: grey,
          }
        );
      }
    );

    // ---------------------------------------------
    // Generate file
    // ---------------------------------------------

    const pdfBytes =
      await pdf.save();

    const safeTitle =
      sanitizeFilename(
        editorial.title
      ) || "Editorial";

    return new Response(
      pdfBytes as BodyInit,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="TACSFON-LAUTECH-${safeTitle}.pdf"`,

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Editorial PDF generation failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to generate publication.",
      },
      {
        status: 500,
      }
    );
  }
}