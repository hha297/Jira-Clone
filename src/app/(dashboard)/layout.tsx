import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal';

import React from 'react';

interface DashboardLayoutProps {
        children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
        return (
                <div className="min-h-screen">
                        <div className="flex w-full h-full">
                                <div className="fixed left-0 top-0 hidden lg:block lg:w-64 h-full overflow-y-auto">
                                        <Sidebar />
                                </div>
                                <div className="lg:pl-64 w-full">
                                        <div className="mx-auto max-w-screen-2xl h-full">
                                                <Navbar />
                                                <main className="h-full py-8 px-6 flex flex-col">{children}</main>
                                        </div>
                                </div>
                        </div>
                        <CreateWorkspaceModal />
                </div>
        );
};

export default DashboardLayout;
