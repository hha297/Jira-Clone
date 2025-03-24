import { MoreHorizontalIcon } from 'lucide-react';
import { Task } from '../type';
import { TaskActions } from './task-actions';
import { DottedSeparator } from '@/components/dotted-separator';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { TaskDate } from './task-date';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';

interface KanbanCardProps {
        task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
        return (
                <div className="bg-white p-2 mb-2 rounded shadow-sm space-y-3">
                        <div className="flex justify-between items-start gap-x-2">
                                <p className="line-clamp-2">{task.name}</p>
                                <TaskActions id={task.$id} projectId={task.projectId}>
                                        <MoreHorizontalIcon className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
                                </TaskActions>
                        </div>
                        <DottedSeparator />
                        <div className="flex items-center justify-between gap-x-2">
                                <MemberAvatar name={task.assignee.name} fallbackClassName="text-xs" />
                                <div className="size-[2px] flex-1 rounded-full bg-neutral-300" />
                                <TaskDate value={task.dueDate} className="text-sm" />
                        </div>
                        <div className="flex items-center gap-x-2">
                                <ProjectAvatar
                                        name={task.project.name}
                                        image={task.project.imageUrl}
                                        fallbackClassName="text-xs"
                                />
                                <span className="text-xs font-medium">{task.project.name}</span>
                        </div>
                </div>
        );
};
