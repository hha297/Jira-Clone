'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateWorkspaceSchema } from '../schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DottedSeparator } from '@/components/dotted-separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useRef } from 'react';
import { ArrowLeftIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Workspace } from '../type';
import { useUpdateWorkspace } from '../api/use-update-workspace';

interface EditWorkspaceFormProps {
        onCancel?: () => void;
        initialValues: Workspace;
}

export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
        const router = useRouter();
        const { mutate, isPending } = useUpdateWorkspace();
        const inputRef = useRef<HTMLInputElement>(null);

        const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
                resolver: zodResolver(updateWorkspaceSchema),
                defaultValues: {
                        ...initialValues,
                        image: initialValues.imageUrl || '',
                },
        });

        const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
                const finalValues = {
                        ...values,
                        images: values.image instanceof File ? values.image : '',
                };
                mutate(
                        { form: finalValues, param: { workspaceId: initialValues.$id } },
                        {
                                onSuccess: ({ data }) => {
                                        form.reset();
                                        router.push(`/workspaces/${data.$id}`);
                                },
                        },
                );
        };
        console.log(initialValues);

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                        form.setValue('image', file);
                }
                console.log(file);
        };

        return (
                <Card className="w-full h-full border-none shadow-none">
                        <CardHeader className="flex flex-row items-center  gap-x-4 p-7 space-y-0">
                                <Button
                                        size={'sm'}
                                        onClick={onCancel ? onCancel : () => router.back()}
                                        variant={'secondary'}
                                >
                                        <ArrowLeftIcon className="size-4" />
                                        Back
                                </Button>
                                <CardTitle className="text-xl font-bold">{initialValues.name}</CardTitle>
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
                                                                                <FormLabel>Workspace Name</FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                placeholder="Workspace name"
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                name="image"
                                                                control={form.control}
                                                                render={({ field }) => (
                                                                        <div className="flex flex-col gap-y-2 pt-4">
                                                                                <div className="flex items-center gap-x-5">
                                                                                        {field.value ? (
                                                                                                <div className="size-20 relative rounded-md overflow-hidden">
                                                                                                        <Image
                                                                                                                src={
                                                                                                                        field.value instanceof
                                                                                                                        File
                                                                                                                                ? URL.createObjectURL(
                                                                                                                                          field.value,
                                                                                                                                  )
                                                                                                                                : field.value
                                                                                                                }
                                                                                                                fill
                                                                                                                className="object-cover"
                                                                                                                alt="Image"
                                                                                                        />
                                                                                                </div>
                                                                                        ) : (
                                                                                                <div>
                                                                                                        <Avatar className="size-20">
                                                                                                                <AvatarFallback>
                                                                                                                        <ImageIcon className="size-10 text-neutral-400" />
                                                                                                                </AvatarFallback>
                                                                                                        </Avatar>
                                                                                                </div>
                                                                                        )}
                                                                                        <div className="flex flex-col gap-y-2">
                                                                                                <p className="text-sm">
                                                                                                        Workspace Icon
                                                                                                </p>
                                                                                                {/* Fix here if something changes after trial pro plan expired */}
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                        Supported all
                                                                                                        image formats.
                                                                                                        Max size: 5GB
                                                                                                </p>
                                                                                                <input
                                                                                                        className="hidden"
                                                                                                        type="file"
                                                                                                        accept="image/*"
                                                                                                        ref={inputRef}
                                                                                                        disabled={
                                                                                                                isPending
                                                                                                        }
                                                                                                        onChange={
                                                                                                                handleImageChange
                                                                                                        }
                                                                                                />
                                                                                                {field.value ? (
                                                                                                        <Button
                                                                                                                type="button"
                                                                                                                disabled={
                                                                                                                        isPending
                                                                                                                }
                                                                                                                variant={
                                                                                                                        'destructive'
                                                                                                                }
                                                                                                                size={
                                                                                                                        'sm'
                                                                                                                }
                                                                                                                className="w-fit mt-2"
                                                                                                                onClick={() => {
                                                                                                                        field.onChange(
                                                                                                                                null,
                                                                                                                        );
                                                                                                                        if (
                                                                                                                                inputRef.current
                                                                                                                        ) {
                                                                                                                                inputRef.current.value =
                                                                                                                                        '';
                                                                                                                        }
                                                                                                                }}
                                                                                                        >
                                                                                                                Remove
                                                                                                                Image
                                                                                                        </Button>
                                                                                                ) : (
                                                                                                        <Button
                                                                                                                type="button"
                                                                                                                disabled={
                                                                                                                        isPending
                                                                                                                }
                                                                                                                variant={
                                                                                                                        'teritary'
                                                                                                                }
                                                                                                                size={
                                                                                                                        'sm'
                                                                                                                }
                                                                                                                className="w-fit mt-2"
                                                                                                                onClick={() =>
                                                                                                                        inputRef.current?.click()
                                                                                                                }
                                                                                                        >
                                                                                                                Upload
                                                                                                                Image
                                                                                                        </Button>
                                                                                                )}
                                                                                        </div>
                                                                                </div>
                                                                        </div>
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
                                                                Save Changes
                                                        </Button>
                                                </div>
                                        </form>
                                </Form>
                        </CardContent>
                </Card>
        );
};
