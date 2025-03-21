'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '../type';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon, MoreVerticalIcon } from 'lucide-react';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { TaskDate } from './task-date';
import { Badge } from '@/components/ui/badge';
import { snakeCaseToTitleCase } from '@/lib/utils';
import { TaskActions } from './task-actions';
export const columns: ColumnDef<Task>[] = [
        {
                accessorKey: 'name',
                header: ({ column }) => {
                        return (
                                <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                                >
                                        Task Name
                                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                        );
                },
                cell: ({ row }) => {
                        const name = row.original.name;

                        return <p className="line-clamp-1 ml-4">{name}</p>;
                },
        },

        {
                accessorKey: 'project',
                header: ({ column }) => {
                        return (
                                <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                                >
                                        Project
                                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                        );
                },
                cell: ({ row }) => {
                        const project = row.original.name;

                        return (
                                <div className="flex items-center gap-x-2 text-sm font-medium">
                                        <ProjectAvatar name={project} />
                                        {project}
                                </div>
                        );
                },
        },
        {
                accessorKey: 'assignee',
                header: ({ column }) => {
                        return (
                                <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                                >
                                        Assignee
                                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                        );
                },
                cell: ({ row }) => {
                        const assignee = row.original.assignee;

                        return (
                                <div className="flex items-center gap-x-2 text-sm font-medium">
                                        <MemberAvatar
                                                name={assignee.name}
                                                fallbackClassName="text-xs"
                                                className="size-6"
                                        />
                                        {assignee.name}
                                </div>
                        );
                },
        },
        {
                accessorKey: 'dueDate',
                header: ({ column }) => {
                        return (
                                <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                                >
                                        Due Date
                                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                        );
                },
                cell: ({ row }) => {
                        const dueDate = row.original.dueDate;

                        return <TaskDate value={dueDate} />;
                },
        },
        {
                accessorKey: 'status',
                header: ({ column }) => {
                        return (
                                <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                                >
                                        Status
                                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                        );
                },
                cell: ({ row }) => {
                        const status = row.original.status;

                        return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>;
                },
        },
        {
                id: 'actions',
                cell: ({ row }) => {
                        const id = row.original.$id;
                        const projectId = row.original.projectId;

                        return (
                                <TaskActions id={id} projectId={projectId}>
                                        <Button variant="ghost" className="size-8 p-0" onClick={() => {}}>
                                                <MoreVerticalIcon className="size-4" />
                                        </Button>
                                </TaskActions>
                        );
                },
        },
];
