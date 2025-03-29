'use client';

import { Analytics } from '@/components/analytics';
import { DottedSeparator } from '@/components/dotted-separator';
import { PageError } from '@/components/page-error';
import { PageLoader } from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { Member } from '@/features/members/type';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';

import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { Project } from '@/features/projects/type';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { Task } from '@/features/tasks/type';

import { useGetWorkspaceAnalytics } from '@/features/workspaces/api/use-get-workspace-analytics';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const WorkspaceIdClient = () => {
        const workspaceId = useWorkspaceId();
        const { data: analytics, isLoading: isAnalyticsLoading } = useGetWorkspaceAnalytics({
                workspaceId: workspaceId,
        });
        const { data: tasks, isLoading: isTasksLoading } = useGetTasks({ workspaceId: workspaceId });
        const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId: workspaceId });
        const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId: workspaceId });

        const isLoading = isAnalyticsLoading || isTasksLoading || isProjectsLoading || isMembersLoading;
        if (isLoading) {
                return <PageLoader />;
        }

        if (!analytics || !tasks || !projects || !members) {
                return <PageError message="Project not found" />;
        }
        return (
                <div className="h-full flex flex-col space-y-4">
                        <Analytics data={analytics} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TaskList tasks={tasks.documents} total={tasks.total} />
                                <ProjectList projects={projects.documents} total={projects.total} />
                                <MemberList members={members.documents} total={members.total} />
                        </div>
                </div>
        );
};

interface TaskListProps {
        tasks: Task[];
        total: number;
}
export const TaskList = ({ tasks, total }: TaskListProps) => {
        const workspaceId = useWorkspaceId();
        const { open: createTask } = useCreateTaskModal();
        return (
                <div className="flex flex-col gap-y-4 col-span-1">
                        <div className="bg-muted rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold">Tasks ({total})</h2>
                                        <Button variant={'muted'} size={'sm'} onClick={createTask}>
                                                <PlusIcon className="size-4 text-neutral-400" />
                                        </Button>
                                </div>
                                <DottedSeparator className="my-4" />
                                <ul className="flex flex-col gap-y-4">
                                        {tasks.map((task) => (
                                                <li key={task.$id} className="flex flex-col gap-y-2">
                                                        <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                                                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                                                        <CardContent className="p-4">
                                                                                <p className="text-lg font-medium truncate">
                                                                                        {task.name}
                                                                                </p>
                                                                                <div className="flex items-center gap-x-2">
                                                                                        <p>{task.project?.name}</p>
                                                                                        <div className="size-[2px] flex-1 rounded-full bg-neutral-300" />
                                                                                        <div className="text-sm text-muted-foreground flex items-center">
                                                                                                <CalendarIcon className="size-4 mr-1" />
                                                                                                <span className="truncate">
                                                                                                        {formatDistanceToNow(
                                                                                                                new Date(
                                                                                                                        task.dueDate,
                                                                                                                ),
                                                                                                        )}
                                                                                                </span>
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </Link>
                                                </li>
                                        ))}
                                        <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                                                No task found
                                        </li>
                                        <Button variant={'muted'} size={'sm'} className="mt-4 w-full">
                                                <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
                                        </Button>
                                </ul>
                        </div>
                </div>
        );
};

interface ProjectListProps {
        projects: Project[];
        total: number;
}
export const ProjectList = ({ projects, total }: ProjectListProps) => {
        const workspaceId = useWorkspaceId();
        const { open: createProject } = useCreateProjectModal();
        return (
                <div className="flex flex-col gap-y-4 col-span-1">
                        <div className="bg-white border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold">Projects ({total})</h2>
                                        <Button variant={'secondary'} size={'sm'} onClick={createProject}>
                                                <PlusIcon className="size-4 text-neutral-400" />
                                        </Button>
                                </div>
                                <DottedSeparator className="my-4" />
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {projects.map((project) => (
                                                <li key={project.$id} className="flex flex-col gap-y-2">
                                                        <Link
                                                                href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                                                        >
                                                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                                                        <CardContent className="p-4">
                                                                                <ProjectAvatar
                                                                                        className="size-12"
                                                                                        fallbackClassName="text-lg"
                                                                                        name={project.name}
                                                                                        image={project.imageUrl}
                                                                                />
                                                                                <p className="text-lg font-medium truncate">
                                                                                        {project.name}
                                                                                </p>
                                                                        </CardContent>
                                                                </Card>
                                                        </Link>
                                                </li>
                                        ))}
                                        <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                                                No project found
                                        </li>
                                </ul>
                        </div>
                </div>
        );
};

interface MemberListProps {
        members: Member[];
        total: number;
}
export const MemberList = ({ members, total }: MemberListProps) => {
        const workspaceId = useWorkspaceId();

        return (
                <div className="flex flex-col gap-y-4 col-span-1">
                        <div className="bg-white border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold">Members ({total})</h2>
                                        <Button variant={'secondary'} size={'icon'} asChild>
                                                <Link href={`/workspaces/${workspaceId}/members`}>
                                                        <SettingsIcon className="size-4 text-neutral-400" />
                                                </Link>
                                        </Button>
                                </div>
                                <DottedSeparator className="my-4" />
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {members.map((member) => (
                                                <li key={member.$id} className="flex flex-col gap-y-2">
                                                        <Card className="shadow-none rounded-lg overflow-hidden">
                                                                <CardContent className="p-4 flex flex-col items-center gap-x-2">
                                                                        <MemberAvatar
                                                                                className="size-12"
                                                                                fallbackClassName="text-lg"
                                                                                name={member.name}
                                                                        />
                                                                        <div className="flex flex-col items-center overflow-hidden mt-2">
                                                                                <p className="text-sm font-medium truncate">
                                                                                        {member.name}
                                                                                </p>
                                                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                                                        {member.email}
                                                                                </p>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </li>
                                        ))}
                                        <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                                                No member found
                                        </li>
                                </ul>
                        </div>
                </div>
        );
};
