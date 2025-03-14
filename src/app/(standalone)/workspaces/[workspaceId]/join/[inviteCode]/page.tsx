import { getCurrent } from '@/features/auth/queries';
import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form';
import { getWorkspaceInfo } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import React from 'react';

interface WorkspaceIdJoinPageProps {
        params: {
                workspaceId: string;
                inviteCode: string;
        };
}
const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
        const user = await getCurrent();
        if (!user) {
                redirect('/sign-in');
        }

        const workspace = await getWorkspaceInfo({ workspaceId: params.workspaceId });

        if (!workspace) {
                redirect('/');
        }
        return (
                <div>
                        <JoinWorkspaceForm initialValues={workspace} />
                </div>
        );
};

export default WorkspaceIdJoinPage;
