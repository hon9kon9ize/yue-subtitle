'use client';

import EasyEdit from 'react-easy-edit';
import ReactPlayer from 'react-player';
import { useEditorContext } from './EditorProvider';

export interface EditorProps {
  videoId: string;
}

export const Editor: React.FC<EditorProps> = async ({ videoId }) => {
  const { title, setTitle, downloadSubtitle } = useEditorContext();
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  await downloadSubtitle(videoId);

  return (
    <section className="Editor flex flex-col w-full h-full">
      <div className="flex flex-row p-4">
        <h2>
          <EasyEdit type="text" value={title} onSave={setTitle} />
        </h2>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row flex-1">
          <div className="flex flex-col flex-1">
            <ReactPlayer height="100%" url={videoUrl} width="100%" />
          </div>
          <div className="flex flex-row flex-1 px-4 max-w-[280px]">12</div>
        </div>
      </div>
      <div className="flex flex-col flex-1 max-h-[280px] p-4">abc</div>
    </section>
  );
};
