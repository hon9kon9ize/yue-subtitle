import { Suspense } from 'react';
import type { Metadata } from 'next';
import Page from './page';
import { EditorProvider } from '@/components/editor/EditorProvider';

export const metadata: Metadata = {
  title: 'Cantonese Subtitle Editor',
  description: 'Edit Cantonese subtitles for your Cantonese videos',
};

export default async function EditLayout() {
  return (
    <EditorProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Page />
      </Suspense>
    </EditorProvider>
  );
}
