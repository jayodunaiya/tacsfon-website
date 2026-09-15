import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/books";

/*
 * We're deliberately pulling from books that work particularly
 * well for a daily scripture / devotional feature.
 */
const books = [
  { file: "Ps", name: "Psalms" },
  { file: "Prov", name: "Proverbs" },
  { file: "Isa", name: "Isaiah" },

  { file: "Matt", name: "Matthew" },
  { file: "Mark", name: "Mark" },
  { file: "Luke", name: "Luke" },
  { file: "John", name: "John" },

  { file: "Rom", name: "Romans" },
  { file: "1Cor", name: "1 Corinthians" },
  { file: "2Cor", name: "2 Corinthians" },

  { file: "Gal", name: "Galatians" },
  { file: "Eph", name: "Ephesians" },
  { file: "Phil", name: "Philippians" },
  { file: "Col", name: "Colossians" },

  { file: "1Thess", name: "1 Thessalonians" },
  { file: "2Thess", name: "2 Thessalonians" },

  { file: "1Tim", name: "1 Timothy" },
  { file: "2Tim", name: "2 Timothy" },

  { file: "Heb", name: "Hebrews" },
  { file: "Jas", name: "James" },

  { file: "1Pet", name: "1 Peter" },
  { file: "2Pet", name: "2 Peter" },

  { file: "1John", name: "1 John" },
];

/*
 * Some verses are perfectly valid scripture but don't work well
 * standing alone as a homepage "daily word".
 *
 * This only removes obvious candidates such as genealogies,
 * measurements and fragments that rely heavily on context.
 */
const excludedWords = [
  "begat",
  "cubits",
  "talents",
  "shekels",
  "numbered",
  "genealogy",
  "generations of",
];

/*
 * Keeps the homepage typography from being destroyed by either
 * extremely tiny or extremely long verses.
 */
const isSuitableVerse = (text) => {
  if (!text) return false;

  const cleaned = text.trim();

  if (cleaned.length < 45) {
    return false;
  }

  if (cleaned.length > 240) {
    return false;
  }

  const lower = cleaned.toLowerCase();

  return !excludedWords.some((word) =>
    lower.includes(word)
  );
};

const fetchBook = async (book) => {
  const response = await fetch(
    `${BASE_URL}/${book.file}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Could not load ${book.name}: ${response.status}`
    );
  }

  const data = await response.json();

  const verses = [];

  for (const chapter of data.chapters) {
    for (const verse of chapter.verses) {
      if (!isSuitableVerse(verse.text)) {
        continue;
      }

      verses.push({
        verse: verse.text.trim(),
        reference: `${book.name} ${chapter.chapter}:${verse.number}`,
      });
    }
  }

  return verses;
};

const generate = async () => {
  console.log("Loading KJV scriptures...\n");

  const versesByBook = [];

  for (const book of books) {
    console.log(`Loading ${book.name}...`);

    const verses = await fetchBook(book);

    versesByBook.push({
      name: book.name,
      verses,
    });
  }

  /*
   * Instead of taking the first 365 verses from Psalms,
   * we'll move through the books in rounds.
   *
   * This gives the year variety:
   *
   * Psalms
   * Proverbs
   * Isaiah
   * Matthew
   * John
   * Romans
   * etc.
   */
  const selected = [];

  let verseIndex = 0;

  while (selected.length < 365) {
    let addedSomething = false;

    for (const book of versesByBook) {
      const scripture =
        book.verses[verseIndex];

      if (!scripture) {
        continue;
      }

      selected.push(scripture);

      addedSomething = true;

      if (selected.length === 365) {
        break;
      }
    }

    if (!addedSomething) {
      break;
    }

    verseIndex++;
  }

  if (selected.length < 365) {
    throw new Error(
      `Only ${selected.length} scriptures could be generated.`
    );
  }

  /*
   * Attach Day 1 -> Day 365.
   */
  const dailyScriptures = selected.map(
    (scripture, index) => ({
      day: index + 1,
      ...scripture,
    })
  );

  const output = `import { ScriptureItem } from "@/types/scripture.types";

/*
 * 365 Daily Scriptures
 * Translation: King James Version (KJV)
 *
 * Generated from public-domain scripture data.
 * Do not manually reorder unless you intentionally want
 * to change which verse belongs to each day.
 */

export const dailyScriptures: ScriptureItem[] = ${JSON.stringify(
    dailyScriptures,
    null,
    2
  )};
`;

  const outputPath = path.join(
    process.cwd(),
    "src",
    "data",
    "scriptures.data.ts"
  );

  await fs.mkdir(
    path.dirname(outputPath),
    {
      recursive: true,
    }
  );

  await fs.writeFile(
    outputPath,
    output,
    "utf8"
  );

  console.log("\n--------------------------------");
  console.log("Daily scripture generation complete.");
  console.log("--------------------------------");
  console.log(`Scriptures: ${dailyScriptures.length}`);
  console.log(`Saved to: ${outputPath}`);
};

generate().catch((error) => {
  console.error("\nFailed to generate scriptures:");
  console.error(error);

  process.exit(1);
});