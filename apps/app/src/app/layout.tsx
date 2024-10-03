import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import { Header } from '@/components';
import { Toaster } from '@/components/ui/toaster';
import { auth, signOut } from '@/auth';
import { useToast } from '@/components/ui/use-toast';
import { AuthError } from 'next-auth';

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'YueSub',
  description: 'Cantonese Subtitle Editor',
};

async function AppHeader() {
  const session = await auth();

  return (
    <>
      <Header
        session={session}
        logout={
          <form
            action={async () => {
              'use server';
              try {
                console.log('signing out');
                await signOut();
              } catch (error) {
                if (error instanceof AuthError) {
                  console.log(error);
                }
                throw error;
              }
            }}
          >
            <button type="submit">Yes, sign me out</button>
          </form>
        }
      />
    </>
  );
}

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansTC.className} antialiased`}>
        <Toaster />
        <div className="flex h-full min-h-screen w-full flex-col justify-between bg-foreground">
          <main className="flex flex-col mx-auto w-full flex-auto">
            <div className="border-b border-slate-600 px-4 py-2 md:px-4">
              <AppHeader />
            </div>
            <div className="flex flex-col flex-1 px-4 py-4 md:py-8">{children}</div>
          </main>
        </div>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
