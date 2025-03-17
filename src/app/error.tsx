'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';

const ErrorPage = () => {
        return (
                <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
                        <AlertTriangleIcon className="size-12 opacity-50" />
                        <p className="text-lg">Something went wrong</p>
                        <Button variant={'teritary'} asChild>
                                <Link href={'/'}>Back to Home</Link>
                        </Button>
                </div>
        );
};

export default ErrorPage;
