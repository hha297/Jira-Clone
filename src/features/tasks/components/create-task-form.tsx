'use client';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DottedSeparator } from '@/components/dotted-separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createTaskSchema } from '../schema';
import { useCreateTask } from '../api/use-create-task';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { DatePicker } from '@/components/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { TaskStatus } from '../type';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { Textarea } from '@/components/ui/textarea';

interface CreateTaskFormProps {
        onCancel?: () => void;
        projectOptions: { id: string; name: string; imageUrl: string }[];
        memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({ onCancel, projectOptions, memberOptions }: CreateTaskFormProps) => {
        const workspaceId = useWorkspaceId();
        const router = useRouter();
        const { mutate, isPending } = useCreateTask();

        const form = useForm<z.infer<typeof createTaskSchema>>({
                resolver: zodResolver(createTaskSchema),
                defaultValues: {
                        workspaceId,
                },
        });

        const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
                mutate(
                        { json: { ...values, workspaceId } },
                        {
                                onSuccess: () => {
                                        form.reset();
                                        onCancel?.();
                                        // TODO: redirect to task page
                                        router.push(`/workspaces/${workspaceId}/projects/}`);
                                },
                        },
                );
        };

        return (
                <Card className="w-full h-full border-none shadow-none">
                        <CardHeader className="flex p-7">
                                <CardTitle className="text-xl font-bold">Create a new task</CardTitle>
                        </CardHeader>

                        <div className="px-7">
                                <DottedSeparator />
                        </div>

                        <CardContent className="p-7">
                                <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)}>
                                                <div className="flex flex-col gap-y-4">
                                                        <FormField
                                                                name="name"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Task Name</FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                placeholder="Task name"
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                name="description"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Description</FormLabel>
                                                                                <FormControl>
                                                                                        <Textarea
                                                                                                placeholder="Description"
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                name="dueDate"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Due Date</FormLabel>
                                                                                <FormControl>
                                                                                        <DatePicker {...field} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                name="projectId"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Project</FormLabel>

                                                                                <Select
                                                                                        defaultValue={field.value}
                                                                                        onValueChange={field.onChange}
                                                                                >
                                                                                        <FormControl>
                                                                                                <SelectTrigger>
                                                                                                        <SelectValue placeholder="Select project" />
                                                                                                </SelectTrigger>
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                        <SelectContent>
                                                                                                {projectOptions.map(
                                                                                                        (project) => (
                                                                                                                <SelectItem
                                                                                                                        key={
                                                                                                                                project.id
                                                                                                                        }
                                                                                                                        value={
                                                                                                                                project.id
                                                                                                                        }
                                                                                                                >
                                                                                                                        <div className="flex items-center gap-x-2">
                                                                                                                                <ProjectAvatar
                                                                                                                                        className="size-6"
                                                                                                                                        name={
                                                                                                                                                project.name
                                                                                                                                        }
                                                                                                                                        image={
                                                                                                                                                project.imageUrl
                                                                                                                                        }
                                                                                                                                />
                                                                                                                                <span>
                                                                                                                                        {
                                                                                                                                                project.name
                                                                                                                                        }
                                                                                                                                </span>
                                                                                                                        </div>
                                                                                                                </SelectItem>
                                                                                                        ),
                                                                                                )}
                                                                                        </SelectContent>
                                                                                </Select>

                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                name="assigneeId"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Assignee</FormLabel>

                                                                                <Select
                                                                                        defaultValue={field.value}
                                                                                        onValueChange={field.onChange}
                                                                                >
                                                                                        <FormControl>
                                                                                                <SelectTrigger>
                                                                                                        <SelectValue placeholder="Select assignee" />
                                                                                                </SelectTrigger>
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                        <SelectContent>
                                                                                                {memberOptions.map(
                                                                                                        (member) => (
                                                                                                                <SelectItem
                                                                                                                        key={
                                                                                                                                member.id
                                                                                                                        }
                                                                                                                        value={
                                                                                                                                member.id
                                                                                                                        }
                                                                                                                >
                                                                                                                        <div className="flex items-center gap-x-2">
                                                                                                                                <MemberAvatar
                                                                                                                                        className="size-6"
                                                                                                                                        name={
                                                                                                                                                member.name
                                                                                                                                        }
                                                                                                                                />
                                                                                                                                <span>
                                                                                                                                        {
                                                                                                                                                member.name
                                                                                                                                        }
                                                                                                                                </span>
                                                                                                                        </div>
                                                                                                                </SelectItem>
                                                                                                        ),
                                                                                                )}
                                                                                        </SelectContent>
                                                                                </Select>

                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                name="status"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Status</FormLabel>

                                                                                <Select
                                                                                        defaultValue={field.value}
                                                                                        onValueChange={field.onChange}
                                                                                >
                                                                                        <FormControl>
                                                                                                <SelectTrigger>
                                                                                                        <SelectValue placeholder="Status" />
                                                                                                </SelectTrigger>
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                        <SelectContent>
                                                                                                <SelectItem
                                                                                                        value={
                                                                                                                TaskStatus.BACKLOG
                                                                                                        }
                                                                                                >
                                                                                                        Backlog
                                                                                                </SelectItem>
                                                                                                <SelectItem
                                                                                                        value={
                                                                                                                TaskStatus.TODO
                                                                                                        }
                                                                                                >
                                                                                                        Todo
                                                                                                </SelectItem>
                                                                                                <SelectItem
                                                                                                        value={
                                                                                                                TaskStatus.IN_PROGRESS
                                                                                                        }
                                                                                                >
                                                                                                        In Progress
                                                                                                </SelectItem>
                                                                                                <SelectItem
                                                                                                        value={
                                                                                                                TaskStatus.IN_REVIEW
                                                                                                        }
                                                                                                >
                                                                                                        In Review
                                                                                                </SelectItem>
                                                                                                <SelectItem
                                                                                                        value={
                                                                                                                TaskStatus.DONE
                                                                                                        }
                                                                                                >
                                                                                                        Done
                                                                                                </SelectItem>
                                                                                        </SelectContent>
                                                                                </Select>

                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                </div>
                                                <DottedSeparator className="py-7" />
                                                <div className="flex items-center justify-between">
                                                        <Button
                                                                type="button"
                                                                size="lg"
                                                                variant="secondary"
                                                                onClick={onCancel}
                                                                disabled={isPending}
                                                                className={cn(!onCancel && 'invisible')}
                                                        >
                                                                Cancel
                                                        </Button>
                                                        <Button
                                                                type="submit"
                                                                size="lg"
                                                                variant="primary"
                                                                disabled={isPending}
                                                        >
                                                                Create Task
                                                        </Button>
                                                </div>
                                        </form>
                                </Form>
                        </CardContent>
                </Card>
        );
};
