import { MinistryGroup } from "@/types/navigation.types";

export const ministryGroups: MinistryGroup[] = [
  {
    title: "Units",
    items: [
      {
        label: "Brothers' Unit",
        href: "/ministries/brothers",
          image: "/images/ministries/brothers-unit.jpg",
        scripture:
          "Be watchful, stand firm in the faith, act like men, be strong.",
        scriptureRef: "1 Corinthians 16:13",
      },
      {
        label: "Sisters' Unit",
        href: "/ministries/sisters",
        image: "/images/sisters-unit.jpg",
        scripture:
          "She is clothed with strength and dignity, and she laughs without fear of the future.",
        scriptureRef: "Proverbs 31:25",
      },
      {
        label: "Welfare Unit",
        href: "/ministries/welfare",
        image: "/images/ministries/welfare-unit.jpg",
        scripture:
          "Carry each other’s burdens, and in this way you will fulfill the law of Christ.",
        scriptureRef: "Galatians 6:2",
      },
    ],
  },

  {
    title: "Subgroups",
    items: [
      { label: "Academics", href: "/ministries/academics" },
      { label: "Bible Study", href: "/ministries/bible-study" },
      { label: "Choral", href: "/ministries/choral" },
      { label: "Drama", href: "/ministries/drama" },
      { label: "Editorial", href: "/ministries/editorial" },
      { label: "Evangelism", href: "/ministries/evangelism" },
      { label: "Follow-Up", href: "/ministries/follow-up" },
      { label: "Foundation School", href: "/ministries/foundation-school" },
      { label: "Organizing", href: "/ministries/organizing" },
      { label: "Prayer", href: "/ministries/prayer" },
      { label: "Publicity", href: "/ministries/publicity" },
      { label: "Ushering", href: "/ministries/ushering" },
    ],
  },
];
 