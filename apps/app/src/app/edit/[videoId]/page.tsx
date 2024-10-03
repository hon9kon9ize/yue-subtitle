'use client';

import { useParams } from 'next/navigation';
import { Editor } from '@/components/editor';

export default function Page() {
  const params = useParams();
  const { videoId } = params;

  return <Editor videoId={videoId.toString()} />;
}
