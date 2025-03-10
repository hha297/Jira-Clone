import { getCurrent } from '@/features/auth/action';
import { getWorkspace } from '@/features/workspaces/action';
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form';
import { Workspace } from '@/features/workspaces/type';
import { redirect } from 'next/navigation';
import React from 'react';

interface WorkspaceIdSettingsPageProps {
        params: {
                workspaceId: string;
        };
}
const WorkspaceIdSettingsPage = async ({ params }: WorkspaceIdSettingsPageProps) => {
        const user = await getCurrent();
        if (!user) {
                redirect('/sign-in');
        }

        const initialValues = await getWorkspace({ workspaceId: params.workspaceId });
        if (!initialValues) {
                redirect(`/workspaces/${params.workspaceId}`);
        }
        return (
                <div className="w-full lg:max-w-lg xl:max-w-xl mx-auto">
                        <EditWorkspaceForm initialValues={initialValues as Workspace} />
                </div>
        );
};

export default WorkspaceIdSettingsPage;
