import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const leagueSpartan = League_Spartan({
        subsets: ['latin'],
        variable: '--font-league-spartan',
});
export const metadata: Metadata = {
        title: 'Jira Clone',
        description: 'Jira Clone',
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en">
                        <body className={cn(leagueSpartan.className, 'antialiased min-h-screen')}>{children}</body>
                </html>
        );
}
