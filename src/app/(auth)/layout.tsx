'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
interface AuthLayoutProps {
        children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
        const pathName = usePathname();
        return (
                <main className="bg-neutral-100 min-h-screen">
                        <div className="mx-auto max-w-screen-2xl p-4">
                                <nav className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                                                <h1 className="text-2xl font-bold">Jira</h1>
                                        </div>

                                        <Button variant={'secondary'} asChild>
                                                <Link href={pathName === '/sign-in' ? '/sign-up' : '/sign-in'}>
                                                        {pathName === '/sign-in' ? 'Sign Up' : 'Sign In'}
                                                </Link>
                                        </Button>
                                </nav>
                                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                                        {children}
                                </div>
                        </div>
                </main>
        );
};

export default AuthLayout;
