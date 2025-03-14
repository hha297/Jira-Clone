'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useInviteCode } from '../hooks/use-invite-code';
import { useJoinWorkspace } from '../api/use-join-workspace';
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { useRouter } from 'next/navigation';

interface JoinWorkspaceFormProps {
        initialValues: {
                name: string;
        };
}
export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
        const workspaceId = useWorkspaceId();
        const inviteCode = useInviteCode();
        const { mutate, isPending } = useJoinWorkspace();
        const router = useRouter();
        const onSubmit = () => {
                mutate(
                        { param: { workspaceId }, json: { inviteCode } },
                        {
                                onSuccess: ({ data }) => {
                                        router.push(`/workspaces/${data.$id}`);
                                },
                        },
                );
        };
        return (
                <Card className="w-full h-full border-none shadow-none">
                        <CardHeader className="p-7">
                                <CardTitle className="text-2xl font-bold">Join Workspace</CardTitle>
                                <CardDescription className="text-sm mt-2">
                                        You have been invited to join <strong>{initialValues.name}</strong>. If you
                                        don&apos;t have an invite code, ask the workspace owner to generate one for you.
                                </CardDescription>
                        </CardHeader>
                        <div className="px-7">
                                <DottedSeparator />
                        </div>
                        <CardContent className="p-7">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
                                        <Button
                                                className="w-full lg:w-fit"
                                                size={'lg'}
                                                variant={'secondary'}
                                                type="button"
                                                asChild
                                                disabled={isPending}
                                        >
                                                <Link href="/">Cancel</Link>
                                        </Button>
                                        <Button
                                                className="w-full lg:w-fit"
                                                size={'lg'}
                                                type="button"
                                                onClick={onSubmit}
                                                disabled={!inviteCode || isPending}
                                        >
                                                Join Workspace
                                        </Button>
                                </div>
                        </CardContent>
                </Card>
        );
};
