'use client';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/features/auth/api/use-current';
import { useSignOut } from '@/features/auth/api/use-signout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
        const router = useRouter();
        const { data, isLoading } = useCurrentUser();
        const { mutate } = useSignOut();

        useEffect(() => {
                if (!data && !isLoading) {
                        router.push('/sign-in');
                }
        }, [data]);
        return (
                <div>
                        Only visible for authenticated users
                        <Button onClick={() => mutate()}>Sign Out</Button>
                </div>
        );
}
