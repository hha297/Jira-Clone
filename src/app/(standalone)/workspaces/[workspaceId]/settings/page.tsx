import { getCurrent } from '@/features/auth/queries';

import { redirect } from 'next/navigation';
import React from 'react';
import { WorkspaceIdSettingsClient } from './client';

const WorkspaceIdSettingsPage = async () => {
        const user = await getCurrent();
        if (!user) {
                redirect('/sign-in');
        }

        return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingsPage;
