export interface YouTubeLiveStream {
  isLive: boolean;
  videoId?: string;
  title?: string;
  thumbnail?: string;
}

export const getYouTubeLiveStream =
  async (): Promise<YouTubeLiveStream> => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      console.error("Missing YouTube API credentials");

      return {
        isLive: false,
      };
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`,
        {
          next: {
            revalidate: 60,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "YouTube API request failed:",
          response.status,
          response.statusText
        );

        return {
          isLive: false,
        };
      }

      const data = await response.json();

      const liveVideo = data.items?.[0];

      if (!liveVideo) {
        return {
          isLive: false,
        };
      }

      return {
        isLive: true,
        videoId: liveVideo.id.videoId,
        title: liveVideo.snippet.title,
        thumbnail:
          liveVideo.snippet.thumbnails?.high?.url ??
          liveVideo.snippet.thumbnails?.default?.url,
      };
    } catch (error) {
      console.error("Unable to check YouTube livestream:", error);

      return {
        isLive: false,
      };
    }
  };