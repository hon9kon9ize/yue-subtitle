import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { videoId: string } }) {
  const { videoId } = params;

  console.log('GET /api/subtitle/[videoId]', videoId);

  const srt = fs.readFileSync(
    path.join(__dirname, '../../../../../../test/__fixtures__/test.srt'),
    'utf8'
  );

  return NextResponse.json({ srt });
  // let videoId = params.videoId;
  // const ytClient = await Innertube.create({
  //   cache: new UniversalCache(false),
  //   generate_session_locally: true,
  // });

  // // http://localhost:3000/api/download/zGDzdps75ns.webm
  // videoId = videoId.replace(/\.\w+$/, "");

  // if (!videoId) {
  //   return NextResponse.json({ error: "Youtube video not found" }, { status: 404 });
  // }

  // if (!ytdl.validateID(videoId)) {
  //   return NextResponse.json({ error: "Youtube video not found" }, { status: 404 });
  // }

  // const videoInfo = await ytClient.getBasicInfo(videoId);
  // const format = videoInfo.chooseFormat({
  //   type: "audio",
  //   quality: "bestefficiency",
  //   format: "webm",
  // });
  // const fileSize = format.content_length;

  // if (!fileSize) {
  //   return Response.json({ message: "Couldn't find format" }, { status: 404 });
  // }

  // try {
  //   const data = await ytClient.download(videoId, {
  //     type: "video+audio",
  //     quality: "bestefficiency",
  //     format: "any",
  //   });

  //   const res = new NextResponse(data, {
  //     status: 200,
  //   });

  //   res.headers.set("Content-Length", fileSize.toString());
  //   res.headers.set("Content-Type", "audio/webm");
  //   res.headers.set("Content-Disposition", `attachment; filename="${videoId}.webm"`);

  //   return res;
  // } catch (error) {
  //   return NextResponse.json({ error: "Failed to download audio" }, { status: 500 });
  // }
}
