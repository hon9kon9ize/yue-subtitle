'use server';

import { SourceType, Subtitle } from '@prisma/client';
import { prisma } from './db';

export const addSource = async (sourceUrl: string, sourceType: SourceType, userId: string) => {
  const newSource = await prisma.source.create({
    data: {
      url: sourceUrl,
      type: sourceType,
    },
  });

  await prisma.subtitle.create({
    data: {
      sourceId: newSource.id,
      userId,
      title: 'Untitled',
      srt: '',
      status: 'PENDING',
    },
  });
};

export const updateSubtitle = async (id: string, updatedSubtitle: Subtitle) => {
  await prisma.subtitle.update({
    where: { id },
    data: updatedSubtitle,
  });
};

export const deleteSubtitle = async (id: string) => {
  await prisma.subtitle.delete({
    where: { id },
  });
};

export const getSubtitle = async (id: string) => {
  return await prisma.subtitle.findUnique({
    where: { id },
    include: {
      source: true,
    },
  });
};

export type PaginatedSubtitlesSortBy = 'createdAt' | 'updatedAt';
export type PaginatedSubtitleOrder = 'asc' | 'desc';

export interface PaginatedSubtitles {
  subtitles: Subtitle[];
  total: number;
  offset: number;
  limit: number;
  sortBy: PaginatedSubtitlesSortBy;
  order: PaginatedSubtitleOrder;
}

export const getSubtitles = async (
  userId: string,
  offset: number = 0,
  limit: number = 12,
  sortBy: PaginatedSubtitlesSortBy = 'updatedAt',
  order: PaginatedSubtitleOrder = 'desc'
): Promise<PaginatedSubtitles> => {
  const subtitles = await prisma.subtitle.findMany({
    where: { userId },
    include: {
      source: true,
    },
    skip: offset,
    take: limit,
    orderBy: [
      {
        [sortBy]: order,
      },
    ],
  });

  const total = await prisma.subtitle.count({
    where: { userId },
  });

  return { subtitles, total, offset, limit, sortBy, order } as PaginatedSubtitles;
};
