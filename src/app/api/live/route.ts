import { NextResponse } from "next/server";

import { getYouTubeLiveStream } from "@/lib/youtube-live";

export const GET = async () => {
  const liveStream = await getYouTubeLiveStream();

  return NextResponse.json(liveStream);
};