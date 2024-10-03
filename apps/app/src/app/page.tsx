import { getSubtitles } from '@/actions';
import { auth } from '@/auth';
import { FrownIcon } from 'lucide-react';
import { SubtitleList, SUBTITLES_PER_PAGE } from '@/components/subtitles';
import { redirect } from 'next/navigation';

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const offset = searchParams.offset ? parseInt(searchParams.offset as string) : 0;
  const query = searchParams.query ? (searchParams.query as string) : '';

  if (!session?.user?.id) {
    redirect('/login');
  }

  const { subtitles } = await getSubtitles(session.user.id, offset);
  const hasMore = subtitles.length === SUBTITLES_PER_PAGE;

  return <SubtitleList initialSubtitles={subtitles} />;
}
