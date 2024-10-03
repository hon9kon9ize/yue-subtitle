import ytdl from "@distube/ytdl-core";
import { finished } from "node:stream/promises";
import fs from "node:fs";
import os from "node:os";

export const downloadYoutubeAudio = async (youtubeUrl: string) => {
  const tmpDir = os.tmpdir();
  const audioFile = `${tmpDir}/audio.mp3`;

  try {
    const audioFileStream = ytdl(youtubeUrl, { filter: "audioonly" })
      .pipe(fs.createWriteStream(audioFile))
      .on("data", chunk => {
        console.log(`Received ${chunk.length} bytes of data.`);
      });

    await finished(audioFileStream);

    return audioFile;
  } catch (error) {
    throw new Error("Failed to download audio");
  }
};

export const checkYoutubeVideoExists = async (youtubeUrl: string) => {
  try {
    const basicInfo = await ytdl.getBasicInfo(youtubeUrl);

    if (basicInfo?.videoDetails?.videoId) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};
