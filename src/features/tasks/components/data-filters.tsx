import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { FolderIcon, ListCheckIcon, Loader, UserIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DottedSeparator } from '@/components/dotted-separator';
import { TaskStatus } from '../type';
import { useTaskFilters } from '../hooks/use-task-filters';
import { DatePicker } from '@/components/date-picker';

interface DataFiltersProps {
        hideProjectFilter?: boolean;
}
export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
        const workspaceId = useWorkspaceId();
        const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId });
        const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });

        const isLoading = isProjectsLoading || isMembersLoading;
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

        if (isLoading) {
                <Card className="w-full h-96 border-none shadow-none">
                        <CardContent className="flex items-center justify-center h-full">
                                <Loader className="size-6 animate-spin text-muted-foreground" />
                        </CardContent>
                </Card>;
        }

        const [{ status, assigneeId, projectId, dueDate }, setFilters] = useTaskFilters();

        const onStatusChange = (value: string) => {
                setFilters({ status: value === 'all' ? null : (value as TaskStatus) });
        };

        const onAssigneeChange = (value: string) => {
                setFilters({ assigneeId: value === 'all' ? null : (value as string) });
        };

        const onProjectChange = (value: string) => {
                setFilters({ projectId: value === 'all' ? null : (value as string) });
        };

        return (
                <div className="flex flex-col lg:flex-row gap-2">
                        <Select
                                defaultValue={status ?? undefined}
                                onValueChange={(value) => onStatusChange(value)}
                                disabled={isLoading}
                        >
                                <SelectTrigger className="w-full lg:w-auto h-8">
                                        <div className="flex items-center pr-2">
                                                <ListCheckIcon className="size-4 mr-2" />
                                                <SelectValue placeholder="All status" />
                                        </div>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="all">All status</SelectItem>
                                        <DottedSeparator />
                                        <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                                        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                                        <SelectItem value={TaskStatus.IN_PROGRESS}>In progress</SelectItem>
                                        <SelectItem value={TaskStatus.IN_REVIEW}>In review</SelectItem>
                                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                                </SelectContent>
                        </Select>
                        <Select
                                defaultValue={assigneeId ?? undefined}
                                onValueChange={(value) => onAssigneeChange(value)}
                                disabled={isLoading}
                        >
                                <SelectTrigger className="w-full lg:w-auto h-8">
                                        <div className="flex items-center pr-2">
                                                <UserIcon className="size-4 mr-2" />
                                                <SelectValue placeholder="All assignees" />
                                        </div>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="all">All assignees</SelectItem>
                                        <DottedSeparator />
                                        {memberOptions.map((member) => (
                                                <SelectItem key={member.id} value={member.id}>
                                                        <span>{member.name}</span>
                                                </SelectItem>
                                        ))}
                                </SelectContent>
                        </Select>
                        {!hideProjectFilter && (
                                <Select
                                        defaultValue={projectId ?? undefined}
                                        onValueChange={(value) => onProjectChange(value)}
                                        disabled={isLoading}
                                >
                                        <SelectTrigger className="w-full lg:w-auto h-8">
                                                <div className="flex items-center pr-2">
                                                        <FolderIcon className="size-4 mr-2" />
                                                        <SelectValue placeholder="All Projects" />
                                                </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                                <SelectItem value="all">All projects</SelectItem>
                                                <DottedSeparator />
                                                {projectOptions.map((member) => (
                                                        <SelectItem key={member.id} value={member.id}>
                                                                <span>{member.name}</span>
                                                        </SelectItem>
                                                ))}
                                        </SelectContent>
                                </Select>
                        )}
                        <DatePicker
                                placeholder="Due date"
                                className="h-8 w-full lg:w-auto"
                                value={dueDate ? new Date(dueDate) : undefined}
                                onChange={(date) => setFilters({ dueDate: date ? date.toISOString() : null })}
                        />
                </div>
        );
};
