import NavbarCommon from "@/components/common/navbar.common";
import HeroHome from "@/components/home/hero.home";
import WelcomeHome from "@/components/home/welcome.home";
import SundayExperienceHome from "@/components/home/sunday-experience.home";
import LatestSermonHome from "@/components/home/latest-sermon.home";
import UpcomingEventsHome from "@/components/home/upcoming-events.home";
import MinistriesHome from "@/components/home/ministries.home";
import EditorialHome from "@/components/home/editorial.home";
import ScrollProgress from "@/components/home/scroll-progress.home";
import ScriptureHome from "@/components/home/scripture.home";
import GalleryHome from "@/components/home/gallery.home";
import VisitCtaHome from "@/components/home/visit-cta.home";
import { getEditorials } from "@/lib/editorials";
import { getGalleryImages } from "@/lib/gallery";
import { getSermons } from "@/lib/sermons";

export default async function Home() {
  const [editorials, galleryImages, sermons] =
  await Promise.all([
    getEditorials(),
    getGalleryImages(),
    getSermons(),
  ]);

  return (
    <main>
      <NavbarCommon />

      <HeroHome />
      <WelcomeHome />
      <SundayExperienceHome />
      <LatestSermonHome sermon={sermons[0]} />
      <UpcomingEventsHome />
      <MinistriesHome />
      <EditorialHome editorials={editorials} />
      <ScrollProgress />
      <ScriptureHome />
      <GalleryHome images={galleryImages} />
      <VisitCtaHome />
    </main>
  );
}