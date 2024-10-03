'use client';

import * as React from 'react';

export interface EditorContextProps {
  videoId: string;
  title: string;
  error: string | null;
  setVideoId: (videoId: string) => void;
  setTitle: (title: string) => void;
  downloadSubtitle: (videoId: string) => Promise<void>;
}

export const EditorContext = React.createContext<EditorContextProps>({
  videoId: '',
  title: 'Untitled',
  error: null,
  setVideoId: () => {},
  setTitle: () => {},
  downloadSubtitle: () => Promise.resolve(),
});

const downloadSubtitle = async (videoId: string) => {
  const response = await fetch(`/api/subtitle/${videoId}`);
  const data = await response.json();

  if (typeof data.srt !== 'string') {
    throw new TypeError('Failed to download subtitle');
  }

  return data.srt;
};

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoId, setVideoId] = React.useState('');
  const [title, setTitle] = React.useState('Untitled');
  const [error, setError] = React.useState<string | null>(null);
  const memoizedValue = React.useMemo(
    () => ({ videoId, setVideoId, title, setTitle, downloadSubtitle, error }),
    [videoId, title, error]
  );

  return <EditorContext.Provider value={memoizedValue}>{children}</EditorContext.Provider>;
};

export const useEditorContext = () => React.useContext(EditorContext);
