import fs from "node:fs";
import path from "node:path";

/*
 * =========================================================
 * TACSFON LAUTECH — DAILY SCRIPTURE GENERATOR
 * =========================================================
 *
 * The references are intentionally selected.
 * Bible text itself comes from the public-domain KJV dataset.
 *
 * A reference can be:
 *
 *   ["Philippians", 4, 13]
 *
 * or a range:
 *
 *   ["Proverbs", 3, 5, 6]
 *
 * Format:
 * [book, chapter, startVerse, endVerse?]
 */

const references = [
  // ======================================================
  // FAITH & TRUST
  // ======================================================

  ["Proverbs", 3, 5, 6],
  ["Psalm", 37, 5],
  ["Hebrews", 11, 1],
  ["Hebrews", 11, 6],
  ["Mark", 11, 22],
  ["Romans", 10, 17],
  ["Psalm", 56, 3],
  ["2 Corinthians", 5, 7],
  ["Psalm", 62, 8],
  ["Jeremiah", 17, 7, 8],
  ["Isaiah", 26, 3, 4],
  ["Psalm", 125, 1],
  ["Romans", 8, 28],
  ["Psalm", 9, 10],
  ["Nahum", 1, 7],

  // ======================================================
  // WISDOM & DIRECTION
  // ======================================================

  ["James", 1, 5],
  ["Psalm", 32, 8],
  ["Proverbs", 16, 9],
  ["Proverbs", 4, 7],
  ["Psalm", 119, 105],
  ["Proverbs", 2, 6],
  ["Proverbs", 16, 3],
  ["Isaiah", 30, 21],
  ["Psalm", 25, 4, 5],
  ["Proverbs", 19, 21],
  ["Proverbs", 11, 14],
  ["Proverbs", 15, 22],
  ["Psalm", 143, 10],
  ["Colossians", 1, 9],
  ["Ephesians", 5, 15, 17],

  // ======================================================
  // COURAGE & FEAR
  // ======================================================

  ["2 Timothy", 1, 7],
  ["Isaiah", 41, 10],
  ["Joshua", 1, 9],
  ["Psalm", 27, 1],
  ["Psalm", 23, 4],
  ["Deuteronomy", 31, 8],
  ["Psalm", 118, 6],
  ["Isaiah", 43, 1, 2],
  ["Psalm", 34, 4],
  ["John", 14, 27],
  ["Psalm", 46, 1, 2],
  ["Romans", 8, 31],
  ["Psalm", 112, 7],
  ["1 John", 4, 4],
  ["Psalm", 56, 11],

  // ======================================================
  // ANXIETY, PEACE & WORRY
  // ======================================================

  ["Philippians", 4, 6, 7],
  ["1 Peter", 5, 7],
  ["Matthew", 6, 34],
  ["John", 14, 27],
  ["Psalm", 55, 22],
  ["Isaiah", 26, 3],
  ["Psalm", 94, 19],
  ["Colossians", 3, 15],
  ["Psalm", 4, 8],
  ["Matthew", 11, 28, 30],
  ["Psalm", 29, 11],
  ["John", 16, 33],
  ["Romans", 15, 13],
  ["Psalm", 34, 17],
  ["Philippians", 4, 8],

  // ======================================================
  // STRENGTH & PERSEVERANCE
  // ======================================================

  ["Philippians", 4, 13],
  ["Isaiah", 40, 31],
  ["Galatians", 6, 9],
  ["Nehemiah", 8, 10],
  ["Psalm", 73, 26],
  ["2 Corinthians", 12, 9],
  ["Psalm", 18, 32],
  ["Ephesians", 6, 10],
  ["Habakkuk", 3, 19],
  ["Psalm", 28, 7],
  ["1 Corinthians", 15, 58],
  ["Hebrews", 12, 1],
  ["James", 1, 2, 4],
  ["Romans", 5, 3, 5],
  ["2 Thessalonians", 3, 13],

  // ======================================================
  // PURPOSE & CALLING
  // ======================================================

  ["Ephesians", 2, 10],
  ["Jeremiah", 29, 11],
  ["Romans", 8, 28],
  ["Proverbs", 19, 21],
  ["Philippians", 1, 6],
  ["2 Timothy", 1, 9],
  ["1 Peter", 2, 9],
  ["Matthew", 5, 14, 16],
  ["Colossians", 3, 17],
  ["1 Corinthians", 10, 31],
  ["Philippians", 2, 13],
  ["Romans", 12, 2],
  ["Esther", 4, 14],
  ["Acts", 20, 24],
  ["Ephesians", 4, 1],

  // ======================================================
  // STUDY, WORK & DILIGENCE
  // ======================================================

  ["Colossians", 3, 23],
  ["Proverbs", 22, 29],
  ["Proverbs", 14, 23],
  ["Proverbs", 13, 4],
  ["Ecclesiastes", 9, 10],
  ["Proverbs", 21, 5],
  ["2 Timothy", 2, 15],
  ["Proverbs", 10, 4],
  ["Proverbs", 12, 24],
  ["Daniel", 6, 3],
  ["Philippians", 4, 13],
  ["James", 1, 5],
  ["Proverbs", 16, 3],
  ["Psalm", 90, 17],
  ["Galatians", 6, 9],

  // ======================================================
  // TEMPTATION & PURITY
  // ======================================================

  ["1 Corinthians", 10, 13],
  ["Psalm", 119, 9],
  ["Psalm", 119, 11],
  ["James", 4, 7],
  ["2 Timothy", 2, 22],
  ["Matthew", 26, 41],
  ["Galatians", 5, 16],
  ["1 Thessalonians", 4, 3, 4],
  ["1 Corinthians", 6, 19, 20],
  ["Philippians", 4, 8],
  ["Proverbs", 4, 23],
  ["Romans", 13, 14],
  ["1 Peter", 1, 15, 16],
  ["Psalm", 51, 10],
  ["2 Corinthians", 7, 1],

  // ======================================================
  // PRAYER
  // ======================================================

  ["Jeremiah", 33, 3],
  ["Matthew", 7, 7],
  ["1 Thessalonians", 5, 17],
  ["Mark", 11, 24],
  ["Philippians", 4, 6],
  ["James", 5, 16],
  ["Psalm", 145, 18],
  ["Romans", 12, 12],
  ["Colossians", 4, 2],
  ["1 John", 5, 14],
  ["Psalm", 66, 19],
  ["Matthew", 21, 22],
  ["Luke", 18, 1],
  ["Psalm", 5, 3],
  ["Ephesians", 6, 18],

  // ======================================================
  // IDENTITY IN CHRIST
  // ======================================================

  ["2 Corinthians", 5, 17],
  ["1 Peter", 2, 9],
  ["Galatians", 2, 20],
  ["Romans", 8, 1],
  ["John", 1, 12],
  ["Colossians", 3, 3],
  ["Ephesians", 1, 3],
  ["Philippians", 3, 20],
  ["Romans", 8, 37],
  ["Colossians", 2, 10],
  ["1 Corinthians", 6, 20],
  ["Ephesians", 2, 10],
  ["Romans", 8, 14],
  ["Galatians", 3, 26],
  ["Colossians", 3, 12],

  // ======================================================
  // LOVE & RELATIONSHIPS
  // ======================================================

  ["1 Corinthians", 13, 4, 7],
  ["John", 13, 34, 35],
  ["Ephesians", 4, 2, 3],
  ["Colossians", 3, 13],
  ["Proverbs", 17, 17],
  ["Romans", 12, 10],
  ["1 Peter", 4, 8],
  ["Proverbs", 27, 17],
  ["Ephesians", 4, 32],
  ["Philippians", 2, 3, 4],
  ["Romans", 12, 18],
  ["1 John", 4, 7],
  ["Proverbs", 15, 1],
  ["James", 1, 19],
  ["Colossians", 3, 14],

  // ======================================================
  // FORGIVENESS & GRACE
  // ======================================================

  ["1 John", 1, 9],
  ["Ephesians", 2, 8, 9],
  ["Psalm", 103, 12],
  ["Romans", 5, 8],
  ["Ephesians", 1, 7],
  ["Hebrews", 4, 16],
  ["Micah", 7, 18, 19],
  ["Isaiah", 1, 18],
  ["Colossians", 1, 13, 14],
  ["Romans", 8, 1],
  ["2 Corinthians", 5, 21],
  ["Titus", 2, 11],
  ["Psalm", 86, 5],
  ["Hebrews", 8, 12],
  ["Luke", 6, 36],

  // ======================================================
  // GOD'S PROVISION
  // ======================================================

  ["Philippians", 4, 19],
  ["Matthew", 6, 31, 33],
  ["Psalm", 23, 1],
  ["Psalm", 34, 10],
  ["2 Corinthians", 9, 8],
  ["Psalm", 37, 25],
  ["Matthew", 7, 11],
  ["Psalm", 84, 11],
  ["Deuteronomy", 8, 18],
  ["Psalm", 68, 19],
  ["Romans", 8, 32],
  ["Psalm", 81, 10],
  ["Luke", 12, 24],
  ["Psalm", 145, 15, 16],
  ["Matthew", 6, 26],

  // ======================================================
  // SPIRITUAL GROWTH
  // ======================================================

  ["Romans", 12, 2],
  ["2 Peter", 3, 18],
  ["Colossians", 2, 6, 7],
  ["Galatians", 5, 22, 23],
  ["John", 15, 5],
  ["Psalm", 1, 2, 3],
  ["Hebrews", 5, 14],
  ["Colossians", 1, 10],
  ["Ephesians", 4, 15],
  ["Philippians", 3, 13, 14],
  ["James", 1, 22],
  ["2 Corinthians", 3, 18],
  ["1 Timothy", 4, 15],
  ["Joshua", 1, 8],
  ["John", 8, 31, 32],

  // ======================================================
  // SERVICE & LEADERSHIP
  // ======================================================

  ["Mark", 10, 45],
  ["Galatians", 5, 13],
  ["1 Peter", 4, 10],
  ["Matthew", 20, 26, 28],
  ["Philippians", 2, 3, 5],
  ["Colossians", 3, 23],
  ["Romans", 12, 11],
  ["Proverbs", 11, 25],
  ["Matthew", 5, 16],
  ["Hebrews", 6, 10],
  ["1 Corinthians", 15, 58],
  ["Joshua", 24, 15],
  ["Luke", 22, 26],
  ["Acts", 20, 35],
  ["Romans", 12, 6],

  // ======================================================
  // HOPE & DISCOURAGEMENT
  // ======================================================

  ["Romans", 15, 13],
  ["Psalm", 42, 11],
  ["Lamentations", 3, 22, 23],
  ["Isaiah", 40, 31],
  ["Psalm", 30, 5],
  ["Jeremiah", 29, 11],
  ["Romans", 12, 12],
  ["Psalm", 126, 5],
  ["2 Corinthians", 4, 16, 18],
  ["Psalm", 31, 24],
  ["Hebrews", 10, 23],
  ["Psalm", 130, 5],
  ["Romans", 5, 5],
  ["1 Peter", 1, 3],
  ["Psalm", 71, 14],

  // ======================================================
  // GRATITUDE & WORSHIP
  // ======================================================

  ["Psalm", 100, 4],
  ["1 Thessalonians", 5, 18],
  ["Psalm", 95, 1, 2],
  ["Colossians", 3, 17],
  ["Psalm", 103, 1, 2],
  ["Hebrews", 13, 15],
  ["Psalm", 34, 1],
  ["Colossians", 4, 2],
  ["Psalm", 150, 6],
  ["Ephesians", 5, 20],
  ["Psalm", 92, 1],
  ["Philippians", 4, 4],
  ["Psalm", 118, 24],
  ["Psalm", 96, 9],
  ["Psalm", 145, 3],

  // ======================================================
  // OBEDIENCE & HOLINESS
  // ======================================================

  ["John", 14, 15],
  ["1 Peter", 1, 15, 16],
  ["James", 1, 22],
  ["Romans", 12, 1],
  ["Psalm", 119, 9],
  ["Deuteronomy", 5, 33],
  ["1 Samuel", 15, 22],
  ["John", 15, 10],
  ["Romans", 6, 12, 13],
  ["2 Corinthians", 7, 1],
  ["Psalm", 119, 60],
  ["1 Thessalonians", 4, 7],
  ["Hebrews", 12, 14],
  ["Titus", 2, 12],
  ["Micah", 6, 8],

  // ======================================================
  // EVANGELISM & WITNESS
  // ======================================================

  ["Matthew", 28, 19, 20],
  ["Mark", 16, 15],
  ["Romans", 1, 16],
  ["Acts", 1, 8],
  ["Matthew", 5, 16],
  ["1 Peter", 3, 15],
  ["2 Timothy", 4, 2],
  ["Romans", 10, 14],
  ["Proverbs", 11, 30],
  ["Daniel", 12, 3],
  ["Colossians", 4, 5, 6],
  ["Psalm", 96, 3],
  ["Acts", 4, 20],
  ["2 Corinthians", 5, 20],
  ["Philemon", 1, 6],

  // ======================================================
  // GOD'S PRESENCE
  // ======================================================

  ["Psalm", 16, 11],
  ["Psalm", 139, 7, 10],
  ["Hebrews", 13, 5],
  ["Matthew", 28, 20],
  ["Exodus", 33, 14],
  ["Psalm", 46, 1],
  ["Isaiah", 41, 10],
  ["James", 4, 8],
  ["Psalm", 73, 28],
  ["John", 14, 16, 17],
  ["Psalm", 27, 4],
  ["Zephaniah", 3, 17],
  ["Psalm", 23, 4],
  ["Acts", 17, 27, 28],
  ["Psalm", 84, 10],

  // ======================================================
  // CONTENTMENT & PRIORITIES
  // ======================================================

  ["Matthew", 6, 33],
  ["Philippians", 4, 11, 12],
  ["1 Timothy", 6, 6],
  ["Hebrews", 13, 5],
  ["Luke", 12, 15],
  ["Proverbs", 15, 16],
  ["Psalm", 37, 4],
  ["Matthew", 16, 26],
  ["Colossians", 3, 2],
  ["Psalm", 90, 12],
  ["Ecclesiastes", 3, 1],
  ["Proverbs", 4, 25, 27],
  ["Luke", 10, 41, 42],
  ["Philippians", 3, 8],
  ["Psalm", 39, 4],

  // ======================================================
  // RESTORATION & NEW BEGINNINGS
  // ======================================================

  ["Isaiah", 43, 18, 19],
  ["2 Corinthians", 5, 17],
  ["Joel", 2, 25],
  ["Psalm", 51, 10],
  ["Lamentations", 3, 22, 23],
  ["Philippians", 3, 13, 14],
  ["Ezekiel", 36, 26],
  ["Psalm", 40, 1, 3],
  ["Isaiah", 40, 31],
  ["Romans", 6, 4],
  ["Psalm", 147, 3],
  ["Jeremiah", 30, 17],
  ["Hosea", 6, 1],
  ["Psalm", 30, 11],
  ["Revelation", 21, 5],

  // ======================================================
  // FINAL 35 — BALANCED DAILY WORD
  // ======================================================

  ["Psalm", 121, 1, 2],
  ["Proverbs", 18, 10],
  ["Romans", 8, 38, 39],
  ["Matthew", 11, 28],
  ["Psalm", 91, 1, 2],
  ["John", 15, 7],
  ["Isaiah", 54, 17],
  ["Proverbs", 3, 7],
  ["Psalm", 19, 14],
  ["Romans", 12, 21],

  ["Ephesians", 3, 20],
  ["Psalm", 37, 23, 24],
  ["Matthew", 5, 8],
  ["John", 10, 10],
  ["Proverbs", 24, 16],
  ["Psalm", 119, 133],
  ["Romans", 8, 18],
  ["Isaiah", 55, 8, 9],
  ["Psalm", 138, 8],
  ["Matthew", 6, 21],

  ["Galatians", 2, 20],
  ["Psalm", 51, 17],
  ["Romans", 12, 12],
  ["John", 8, 36],
  ["Isaiah", 60, 1],
  ["Psalm", 119, 165],
  ["Proverbs", 27, 17],
  ["Ephesians", 4, 29],
  ["Psalm", 133, 1],
  ["Romans", 13, 12],

  ["Psalm", 127, 1],
  ["Philippians", 1, 6],
  ["Psalm", 20, 4],
  ["Jude", 1, 24],
  ["Psalm", 90, 17],
];

/*
 * =========================================================
 * GENERATOR
 * =========================================================
 */

const biblePath = path.resolve(
  process.cwd(),
  "data/kjv.json"
);

const outputPath = path.resolve(
  process.cwd(),
  "src/data/scriptures.data.ts"
);

const bible = JSON.parse(
  fs.readFileSync(
    biblePath,
    "utf8"
  )
);

/*
 * The KJV dataset identifies books using abbreviations
 * such as Gen, Exod, Ps, Matt, Rom, etc.
 *
 * This maps the names used by our curated list
 * to those codes.
 */

const bookCodes = {
  Genesis: "Gen",
  Exodus: "Exod",
  Leviticus: "Lev",
  Numbers: "Num",
  Deuteronomy: "Deut",
  Joshua: "Josh",
  Judges: "Judg",
  Ruth: "Ruth",

  "1 Samuel": "1Sam",
  "2 Samuel": "2Sam",
  "1 Kings": "1Kgs",
  "2 Kings": "2Kgs",
  "1 Chronicles": "1Chr",
  "2 Chronicles": "2Chr",

  Ezra: "Ezra",
  Nehemiah: "Neh",
  Esther: "Esth",
  Job: "Job",

  Psalms: "Ps",
  Psalm: "Ps",

  Proverbs: "Prov",
  Ecclesiastes: "Eccl",
  "Song of Solomon": "Song",

  Isaiah: "Isa",
  Jeremiah: "Jer",
  Lamentations: "Lam",
  Ezekiel: "Ezek",
  Daniel: "Dan",
  Hosea: "Hos",
  Joel: "Joel",
  Amos: "Amos",
  Obadiah: "Obad",
  Jonah: "Jonah",
  Micah: "Mic",
  Nahum: "Nah",
  Habakkuk: "Hab",
  Zephaniah: "Zeph",
  Haggai: "Hag",
  Zechariah: "Zech",
  Malachi: "Mal",

  Matthew: "Matt",
  Mark: "Mark",
  Luke: "Luke",
  John: "John",
  Acts: "Acts",
  Romans: "Rom",

  "1 Corinthians": "1Cor",
  "2 Corinthians": "2Cor",
  Galatians: "Gal",
  Ephesians: "Eph",
  Philippians: "Phil",
  Colossians: "Col",

  "1 Thessalonians": "1Thess",
  "2 Thessalonians": "2Thess",
  "1 Timothy": "1Tim",
  "2 Timothy": "2Tim",
  Titus: "Titus",
  Philemon: "Phlm",

  Hebrews: "Heb",
  James: "Jas",
  "1 Peter": "1Pet",
  "2 Peter": "2Pet",
  "1 John": "1John",
  "2 John": "2John",
  "3 John": "3John",
  Jude: "Jude",
  Revelation: "Rev",
};

/*
 * Find a book.
 */

function getBook(bookName) {
  const code =
    bookCodes[bookName];

  if (!code) {
    throw new Error(
      `Unknown book: ${bookName}`
    );
  }

  const book =
    bible.books.find(
      (item) =>
        item.book === code
    );

  if (!book) {
    throw new Error(
      `Book "${bookName}" (${code}) was not found in kjv.json`
    );
  }

  return book;
}

/*
 * Find a chapter.
 *
 * Supports either:
 *
 * chapters: [
 *   { chapter: 1, verses: [...] }
 * ]
 *
 * or:
 *
 * chapters: [
 *   { number: 1, verses: [...] }
 * ]
 */

function getChapter(
  book,
  chapterNumber
) {
  if (
    !Array.isArray(
      book.chapters
    )
  ) {
    throw new Error(
      `No chapters found for ${book.book}`
    );
  }

  /*
   * Some Bible JSON datasets use
   * the array position itself as
   * the chapter number.
   */

  const byNumber =
    book.chapters.find(
      (chapter) =>
        Number(
          chapter.chapter ??
            chapter.number
        ) ===
        Number(
          chapterNumber
        )
    );

  if (byNumber) {
    return byNumber;
  }

  const byIndex =
    book.chapters[
      chapterNumber - 1
    ];

  if (!byIndex) {
    throw new Error(
      `Chapter ${chapterNumber} not found in ${book.book}`
    );
  }

  return byIndex;
}

/*
 * Extract one verse or a verse range.
 */

function getScriptureText(
  bookName,
  chapterNumber,
  startVerse,
  endVerse = startVerse
) {
  const book =
    getBook(bookName);

  const chapter =
    getChapter(
      book,
      chapterNumber
    );

  if (
    !Array.isArray(
      chapter.verses
    )
  ) {
    throw new Error(
      `No verses found for ${bookName} ${chapterNumber}`
    );
  }

  const selected =
    chapter.verses.filter(
      (verse) => {
        const number =
          Number(
            verse.number
          );

        return (
          number >=
            startVerse &&
          number <=
            endVerse
        );
      }
    );

  const expected =
    endVerse -
    startVerse +
    1;

  if (
    selected.length !==
    expected
  ) {
    throw new Error(
      `Expected ${expected} verse(s) for ${bookName} ${chapterNumber}:${startVerse}-${endVerse}, but found ${selected.length}.`
    );
  }

  return selected
    .map((verse) =>
      String(
        verse.text ?? ""
      ).trim()
    )
    .filter(Boolean)
    .join(" ");
}

/*
 * Display references nicely.
 */

function formatReference(
  book,
  chapter,
  startVerse,
  endVerse
) {
  const displayBook =
    book === "Psalms"
      ? "Psalm"
      : book;

  if (
    endVerse &&
    endVerse !==
      startVerse
  ) {
    return `${displayBook} ${chapter}:${startVerse}-${endVerse}`;
  }

  return `${displayBook} ${chapter}:${startVerse}`;
}

/*
 * ---------------------------------------------------------
 * Validate curated list
 * ---------------------------------------------------------
 */

if (
  references.length !== 365
) {
  console.error(
    `\n❌ Expected 365 references, but found ${references.length}.\n`
  );

  process.exit(1);
}

/*
 * ---------------------------------------------------------
 * Generate
 * ---------------------------------------------------------
 */

const generated = [];

console.log(
  "\nGenerating 365 TACSFON daily scriptures...\n"
);

for (
  let index = 0;
  index <
  references.length;
  index++
) {
  const [
    book,
    chapter,
    startVerse,
    endVerse,
  ] = references[index];

  const finalEndVerse =
    endVerse ??
    startVerse;

  const reference =
    formatReference(
      book,
      chapter,
      startVerse,
      finalEndVerse
    );

  try {
    const verse =
      getScriptureText(
        book,
        chapter,
        startVerse,
        finalEndVerse
      );

    if (!verse) {
      throw new Error(
        "Verse text is empty."
      );
    }

    generated.push({
      day: index + 1,
      verse,
      reference,
    });

    console.log(
      `✓ ${String(
        index + 1
      ).padStart(
        3,
        "0"
      )}/365 — ${reference}`
    );
  } catch (error) {
    console.error(
      `\n❌ Failed at day ${
        index + 1
      }: ${reference}`
    );

    console.error(error);

    process.exit(1);
  }
}

/*
 * ---------------------------------------------------------
 * Check duplicates
 * ---------------------------------------------------------
 */

const referenceCounts =
  new Map();

for (const item of generated) {
  referenceCounts.set(
    item.reference,
    (referenceCounts.get(
      item.reference
    ) ?? 0) + 1
  );
}

const duplicates = [
  ...referenceCounts.entries(),
].filter(
  ([, count]) =>
    count > 1
);

if (
  duplicates.length > 0
) {
  console.log(
    "\n⚠ Repeated references:"
  );

  for (const [
    reference,
    count,
  ] of duplicates) {
    console.log(
      `   ${reference} × ${count}`
    );
  }
}

/*
 * ---------------------------------------------------------
 * Generate TypeScript
 * ---------------------------------------------------------
 */

const fileContent = `import { ScriptureItem } from "@/types/scripture.types";

/*
 * TACSFON LAUTECH
 * 365 Daily Scriptures
 *
 * Translation: King James Version (KJV)
 *
 * These scriptures were intentionally selected around
 * Christian faith, prayer, wisdom, purpose, purity,
 * perseverance, relationships, service, spiritual growth,
 * courage, hope, discipline and daily Christian living.
 *
 * Scripture text is generated from a local
 * public-domain KJV dataset.
 *
 * AUTO-GENERATED FILE.
 * Do not manually edit individual verses here.
 */

export const dailyScriptures: ScriptureItem[] = ${JSON.stringify(
  generated,
  null,
  2
)};
`;

fs.writeFileSync(
  outputPath,
  fileContent,
  "utf8"
);

console.log(
  "\n------------------------------------"
);

console.log(
  `✓ Generated: ${generated.length} scriptures`
);

console.log(
  `✓ Output: ${outputPath}`
);

console.log(
  "✓ Translation: KJV"
);

console.log(
  "------------------------------------\n"
);