'use client';

import { Subtitle } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { CloudUploadIcon } from 'lucide-react';

export const SUBTITLES_PER_PAGE = 12;

export interface SubtitleListProps {
  initialSubtitles: Subtitle[];
  onCreate?: () => void;
}

export function SubtitleList({ initialSubtitles, onCreate }: SubtitleListProps) {
  return (
    <div className="SubtitleList flex flex-row flex-wrap gap-2 md:gap-4">
      <h2 className="text-2xl font-bold text-white">Your Subtitles</h2>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center align-middle w-full">
        <Card
          asChild
          key="create"
          className="flex flex-col aspect-square bg-transparent border-gray-600 text-white text-center justify-center align-middle"
        >
          <li>
            <button onClick={onCreate} className="btn btn-primary">
              <CardHeader />
              <CardContent className="py-0 flex-1 flex justify-center align-middle">
                <CloudUploadIcon className="mx-auto" width="2em" height="3em" />
              </CardContent>
              <CardFooter className="flex-col">
                <b>Import Subtitle</b>
              </CardFooter>
            </button>
          </li>
        </Card>
        {initialSubtitles.map(subtitle => (
          <Card asChild key={subtitle.id}>
            <li>
              <CardContent>{subtitle.title}</CardContent>
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
}
