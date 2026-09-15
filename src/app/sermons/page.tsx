// src/app/sermons/page.tsx

import { getSermons } from "@/lib/sermons";

import FeaturedSermon from "@/components/sermons/featured-sermon.sermons";
import SermonArchive from "@/components/sermons/sermon-archive.sermons";

const SermonsPage = async () => {
  const sermons = await getSermons();

  const featuredSermon =
    sermons.find((sermon) => sermon.featured) ??
    sermons[0];

  return (
    <main className="bg-white text-black">

      {featuredSermon && (
        <FeaturedSermon sermon={featuredSermon} />
      )}

      <SermonArchive sermons={sermons} />

    </main>
  );
};

export default SermonsPage;