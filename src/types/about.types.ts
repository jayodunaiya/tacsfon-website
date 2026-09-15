import { IconType } from "react-icons";

export interface AboutValue {
  title: string;
  description: string;
  icon: IconType;
}

export interface AboutStoryParagraph {
  text: string;
}

export interface AboutMission {
  label: string;
  statement: string;
}

export interface AboutCulture {
  label: string;
  heading: string;
  mutedHeading: string;
  description: string;
}

export interface AboutIntro {
  label: string;
  heading: string;
  highlightedHeading: string;
  description: string;
}

export interface AboutWhoWeAre {
  label: string;
  heading: string;
  mutedHeading: string;
  paragraphs: string[];
}

export interface AboutBelief {
  id: number;
  title: string;
  description: string;
}