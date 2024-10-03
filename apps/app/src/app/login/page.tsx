import { auth, providerMap, signIn } from '@/auth';
import { Button } from '@/components/ui';
import GitHubLogoIcon from './github.svg';
import GoogleLogoIcon from './google.svg';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

function LoginButtonIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'GitHub':
      return <GitHubLogoIcon width="1.2em" height="1.2em" />;
    case 'Google':
      return <GoogleLogoIcon width="1.2em" height="1.2em" />;
    default:
      return null;
  }
}

export default async function LoginPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return session ? null : (
    <div className="flex flex-col gap-8 text-center">
      <h1 className="text-3xl font-bold">Sign in</h1>

      <div className="flex flex-col gap-4">
        {Object.values(providerMap).map(provider => (
          <form
            key={provider.id}
            action={async () => {
              'use server';
              try {
                await signIn(provider.id, {
                  redirectTo: props.searchParams?.callbackUrl ?? '',
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                }
                throw error;
              }
            }}
          >
            <Button className="flex flex-row gap-2 justify-center align-middle">
              <LoginButtonIcon icon={provider.name} />
              <span>Sign in with {provider.name}</span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
