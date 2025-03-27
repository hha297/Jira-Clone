'use client';

import { PageError } from '@/components/page-error';
import { PageLoader } from '@/components/page-loader';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { EditProjectForm } from '@/features/projects/components/edit-project-form';
import { useProjectId } from '@/features/projects/hooks/use-project-id';
import React from 'react';

export const ProjectIdSettingsClient = () => {
        const projectId = useProjectId();
        const { data: initialValues, isLoading } = useGetProject({ projectId });
        if (isLoading) {
                return <PageLoader />;
        }

        if (!initialValues) {
                return <PageError message="Project not found" />;
        }
        return (
                <div className="w-full lg:max-w-lg xl:max-w-xl mx-auto">
                        <EditProjectForm initialValues={initialValues} />
                </div>
        );
};
