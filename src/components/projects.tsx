'use client';

import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiAddCircleFill } from 'react-icons/ri';

export const Projects = () => {
        //TODO: Get the project ID from useProjectId();
        //const projectId = null;
        const workspaceId = useWorkspaceId();
        const pathname = usePathname();
        const { open } = useCreateProjectModal();
        const { data } = useGetProjects({ workspaceId });
        return (
                <div className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold uppercase text-neutral-500">Projects</p>
                                <RiAddCircleFill
                                        onClick={open}
                                        className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
                                />
                        </div>
                        {data?.documents.map((project) => {
                                const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
                                const isActive = pathname === href;
                                return (
                                        <Link href={href} key={project.$id}>
                                                <div
                                                        className={cn(
                                                                'flex items-center gap-2 p-2 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500',
                                                                isActive &&
                                                                        'bg-white shadow-sm hover:opacity-100 text-primary',
                                                        )}
                                                >
                                                        <ProjectAvatar image={project.imageUrl} name={project.name} />
                                                        <span className="truncate">{project.name}</span>
                                                </div>
                                        </Link>
                                );
                        })}
                </div>
        );
};
