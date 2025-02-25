import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';

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
                        <body className={leagueSpartan.className}>{children}</body>
                </html>
        );
}
