import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { Loader } from 'lucide-react';
import { useGetTask } from '../api/use-get-task';
import { EditTaskForm } from './edit-task-form';

interface EditTaskFormWrapperProps {
        onCancel: () => void;
        id: string;
}

export const EditTaskFormWrapper = ({ onCancel, id }: EditTaskFormWrapperProps) => {
        const workspaceId = useWorkspaceId();
        const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId });
        const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });
        const { data: initialValues, isLoading: isLoadingTask } = useGetTask({ taskId: id });

        const projectOptions =
                projects?.documents.map((project) => ({
                        id: project.$id,
                        name: project.name,
                        imageUrl: project.imageUrl,
                })) ?? [];

        const memberOptions =
                members?.documents.map((member) => ({
                        id: member.$id,
                        name: member.name,
                })) ?? [];

        const isLoading = isProjectsLoading || isMembersLoading || isLoadingTask;

        if (isLoading) {
                <Card className="w-full h-96 border-none shadow-none">
                        <CardContent className="flex items-center justify-center h-full">
                                <Loader className="size-6 animate-spin text-muted-foreground" />
                        </CardContent>
                </Card>;
        }

        if (!initialValues) return null;

        return (
                <EditTaskForm
                        projectOptions={projectOptions}
                        memberOptions={memberOptions}
                        onCancel={onCancel}
                        initialValues={initialValues}
                />
        );
};
