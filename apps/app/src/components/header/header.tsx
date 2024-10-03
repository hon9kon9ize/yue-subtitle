import { cn } from '@/lib/utils';
import type { Session } from 'next-auth';
import AppIcon from './app_icon.svg';
import { LogOutIcon } from 'lucide-react';
import { Button } from '../ui';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import React from 'react';

export interface HeaderProps {
  className?: string;
  session?: Session | null;
  logout?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ className, session, logout }) => {
  return (
    <nav className="flex flex-row justify-between items-center">
      <h1 className={cn('text-white font-bold flex flex-row gap-1 py-2', className)}>
        <div className="text-[1.25em]">
          <AppIcon alt="YueSub" className="m-1 self-center" />
        </div>
        <span>粵Sub</span>
      </h1>

      {session ? (
        <div className="flex flex-row gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" className="btn btn-primary">
                <LogOutIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogPortal>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be redirected to the login page.
                </AlertDialogDescription>
                <div className="flex flex-row gap-2 justify-end">
                  <AlertDialogCancel asChild>
                    <button>Cancel</button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>{logout}</AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </div>
      ) : null}
    </nav>
  );
};
