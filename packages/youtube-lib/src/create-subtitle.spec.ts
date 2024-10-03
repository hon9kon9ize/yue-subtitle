import { downloadYoutubeAudio, checkYoutubeVideoExists } from "./create-subtitle";
import fs from "node:fs";
import os from "node:os";

describe("createSubtitle", () => {
  it("should create a subtitle", async () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=C0DPdy98e4c";

    await downloadYoutubeAudio(youtubeUrl);

    const tmpDir = os.tmpdir();
    const audioFile = `${tmpDir}/audio.mp3`;

    expect(fs.existsSync(audioFile)).toBe(true);
  }, 10000);

  it("should check if youtube video exists", async () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=C0DPdy98e4c";

    const exists = await checkYoutubeVideoExists(youtubeUrl);

    expect(exists).toBe(true);
  }, 10000);
});
