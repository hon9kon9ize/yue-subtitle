import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import { prisma } from '@/db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

const providers: Provider[] = [
  GoogleProvider({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  }),
  GithubProvider({
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
  }),
];

export const authOptions = {
  theme: { logo: 'https://yuesub.hon9kon9ize.com/img/logo-sm.png' },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers,
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export const providerMap = providers
  .map(provider => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter(provider => provider.id !== 'credentials');

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}
