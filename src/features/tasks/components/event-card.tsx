/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project } from '@/features/projects/type';
import { TaskStatus } from '../type';
import { cn } from '@/lib/utils';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useRouter } from 'next/navigation';

interface EventCardProps {
        title: string;
        assignee: any;
        project: Project;
        status: TaskStatus;
        id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
        [TaskStatus.BACKLOG]: 'border-l-gray-400',
        [TaskStatus.TODO]: 'border-l-red-400',
        [TaskStatus.IN_PROGRESS]: 'border-l-yellow-400',
        [TaskStatus.IN_REVIEW]: 'border-l-blue-400',
        [TaskStatus.DONE]: 'border-l-emerald-400',
};

export const EventCard = ({ title, assignee, project, status, id }: EventCardProps) => {
        const workspaceId = useWorkspaceId();
        const router = useRouter();

        const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                router.push(`/workspaces/${workspaceId}/tasks/${id}`);
        };
        return (
                <div className="px-2">
                        <div
                                onClick={onClick}
                                className={cn(
                                        'p-2 text-xs bg-white text-primary border rounded-r-md border-l-4 flex flex-col gap-y-2 cursor-pointer hover:opacity-75 transition',
                                        statusColorMap[status],
                                )}
                        >
                                <p>{title}</p>
                                <div className="flex items-center gap-x-1">
                                        <MemberAvatar name={assignee?.name} />
                                        <div className="size-1 rounded-full bg-neutral-300" />

                                        <ProjectAvatar name={project?.name} image={project?.imageUrl} />
                                </div>
                        </div>
                </div>
        );
};
