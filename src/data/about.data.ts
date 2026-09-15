import {
  FiBookOpen,
  FiHeart,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import {
  AboutBelief,
  AboutCulture,
  AboutIntro,
  AboutMission,
  AboutStoryParagraph,
  AboutValue,
  AboutWhoWeAre,
} from "@/types/about.types";


export const aboutIntro: AboutIntro = {
  label: "About TACSFON",
  heading: "More than a",
  highlightedHeading: "fellowship.",
  description:
    "We are a community of believers growing in faith, building meaningful relationships and living out the love of Christ together.",
};


export const whoWeAre: AboutWhoWeAre = {
  label: "Who We Are",
  heading: "A place to know God,",
  mutedHeading: "grow in faith and find family.",
  paragraphs: [
    "TACSFON LAUTECH is a Christian fellowship committed to helping students build a genuine relationship with God while becoming grounded in His Word.",
    "Beyond weekly gatherings, we believe fellowship should shape everyday life — how we learn, serve, love, lead and represent Christ wherever we go.",
  ],
};


export const storyParagraphs: AboutStoryParagraph[] = [
  {
    text: "TACSFON has always been about creating an environment where students can encounter God deeply and grow alongside people who share the same hunger for Him.",
  },
  {
    text: "Through worship, teaching, prayer, discipleship and fellowship, generations of students have found a place to become stronger in faith and more intentional about their walk with God.",
  },
  {
    text: "The journey continues with the same heart: to raise people who know God and live for Him boldly.",
  },
];


export const aboutBeliefs: AboutBelief[] = [
  {
    id: 1,
    title: "The Unity of the Godhead",
    description:
      "The unity of the Godhead and the Trinity of the persons therein.",
  },
  {
    id: 2,
    title: "Repentance and Regeneration",
    description:
      "The utter depravity of the human nature, the necessity for repentance and regeneration and eternal doom of the finally impenitent.",
  },
  {
    id: 3,
    title: "Our Lord Jesus Christ",
    description:
      "The virgin birth, sinless life, atoning death, triumphant resurrection, ascension and abiding intercession of our Lord Jesus Christ, second coming and millennial reign upon the earth.",
  },
  {
    id: 4,
    title: "Justification and Sanctification",
    description:
      "Justification and sanctification of the believer through the finished work of Christ.",
  },
  {
    id: 5,
    title: "The Baptism of the Holy Ghost",
    description:
      "The baptism of the Holy Ghost with signs following.",
  },
  {
    id: 6,
    title: "The Gifts of the Holy Ghost",
    description:
      "The nine gifts of the Holy Ghost for the edification, exhortation and comfort the church, which is the body of Christ.",
  },
  {
    id: 7,
    title: "Baptism and the Lord's Supper",
    description:
      "The sacrament of baptism by immersion and the Lord's Supper.",
  },
  {
    id: 8,
    title: "The Holy Scriptures",
    description:
      "The divine inspiration and authority of the Holy Scriptures.",
  },
  {
    id: 9,
    title: "Church Government",
    description:
      "Church government by Apostle, Prophets, Evangelists, Pastors, Teachers, Elders, and Deacons.",
  },
  {
    id: 10,
    title: "Falling From Grace",
    description:
      "The possibility of falling from grace.",
  },
  {
    id: 11,
    title: "Tithes and Offerings",
    description:
      "The obligatory nature of tithes and offerings.",
  },
];


export const aboutValues: AboutValue[] = [
  {
    title: "The Word",
    description:
      "We are committed to knowing God through His Word and allowing truth to shape the way we live.",
    icon: FiBookOpen,
  },
  {
    title: "Worship",
    description:
      "We worship God sincerely, not as a routine, but as a response to who He is.",
    icon: FiHeart,
  },
  {
    title: "Community",
    description:
      "We grow together, support one another and create room for genuine fellowship.",
    icon: FiUsers,
  },
  {
    title: "Impact",
    description:
      "We believe our faith should influence our campus, our relationships and the world around us.",
    icon: FiZap,
  },
];


export const aboutCulture: AboutCulture = {
  label: "Our Culture",
  heading: "We do life",
  mutedHeading: "together.",
  description:
    "TACSFON is not simply a place to attend meetings. It is a place to belong, to be known, to grow, to serve and to build lasting relationships.",
};


export const aboutMission: AboutMission = {
  label: "Our Mission",
  statement:
    "To raise believers who know God deeply, live out their faith boldly and influence their world for Christ.",
};