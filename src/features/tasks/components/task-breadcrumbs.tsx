import { Project } from '@/features/projects/type';
import { Task } from '../type';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import Link from 'next/link';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteTask } from '../api/use-detele-task';
import { useConfirm } from '@/hooks/use-confirm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface TaskBreadcrumbsProps {
        project: Project;
        task: Task;
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
        const workspaceId = useWorkspaceId();
        const { mutate, isPending } = useDeleteTask();
        const [ConfirmDialog, confirm] = useConfirm(
                'Delete Task',
                'Are you sure you want to delete this task?',
                'destructive',
        );
        const router = useRouter();
        const onDelete = async () => {
                const ok = await confirm();
                if (!ok) return;
                mutate(
                        { param: { taskId: task.$id } },
                        {
                                onSuccess: () => {
                                        toast.success('Task deleted');
                                        router.push(`/workspaces/${workspaceId}/tasks`);
                                },
                        },
                );
        };
        return (
                <div className="flex items-center gap-x-2">
                        <ConfirmDialog />
                        <ProjectAvatar name={project.name} image={project.imageUrl} className="size-6 lg:size-8" />
                        <Link href={`/workspace/${workspaceId}/projects/${project.$id}`}>
                                <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover: opacity-75">
                                        {project.name}
                                </p>
                        </Link>
                        <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
                        <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
                        <Button
                                onClick={onDelete}
                                disabled={isPending}
                                className="ml-auto"
                                variant={'destructive'}
                                size={'sm'}
                        >
                                <TrashIcon className="size-4" />
                                <span className="hidden lg:block">Delete Task</span>
                        </Button>
                </div>
        );
};
