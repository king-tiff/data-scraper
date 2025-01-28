import fs from "fs";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: "AIzaSyBRrQ--vSpYX6bxUtu0pPWXM0jCqKQtqnw", // Replace with your YouTube Data API key
});

async function getVideosFromChannel(channelId) {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      channelId,
      maxResults: 10, // Adjust the number of results
      order: "date",
    });

    const videos = response.data.items.map(video => ({
      title: video.snippet.title,
      videoId: video.id.videoId,
      publishedAt: video.snippet.publishedAt,
    }));

    console.log("Videos fetched successfully:", videos);

    // Save data to a JSON file
    fs.writeFileSync("videos.json", JSON.stringify(videos, null, 2));
    console.log("Videos data saved to videos.json");
  } catch (error) {
    console.error("Error fetching channel videos:", error);
  }
}

// Example usage
getVideosFromChannel("UCzf-5Eb1MSk3BTKJRA2pEMA"); // Replace with a YouTube channel ID
