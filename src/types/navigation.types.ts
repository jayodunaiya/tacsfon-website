export interface NavLink {
  label: string;
  href: string;
}

export interface MinistryItem {
  label: string;
  href: string;
  image?: string;
  scripture?: string;
  scriptureRef?: string;
}

export interface MinistryGroup {
  title: string;
  items: MinistryItem[];
}