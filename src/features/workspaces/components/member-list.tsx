'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { Fragment } from 'react';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { Separator } from '@/components/ui/separator';
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteMember } from '@/features/members/api/use-delete-member';
import { useUpdateMember } from '@/features/members/api/use-update-member';
import { MemberRole } from '@/features/members/type';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from 'sonner';

export const MemberList = () => {
        const workspaceId = useWorkspaceId();
        const [ConfirmDialog, confirm] = useConfirm(
                'Remove member',
                'Are you sure you want to remove this member?',
                'destructive',
        );
        const { data: members } = useGetMembers({ workspaceId });
        const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
        const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();

        const handleUpdateMember = async (memberId: string, role: MemberRole) => {
                await updateMember({ json: { role }, param: { memberId } });
        };

        const handleDeleteMember = async (memberId: string) => {
                const ok = await confirm();
                if (!ok) {
                        return;
                }
                deleteMember(
                        { param: { memberId } },
                        {
                                onSuccess: () => {
                                        toast.success('Member removed ');
                                        window.location.reload();
                                },
                        },
                );
        };

        return (
                <Card className="w-full h-full border-none shadow-none">
                        <ConfirmDialog />
                        <CardHeader className=" flex flex-row items-center gap-x-4 p-7 space-y-2">
                                <Button variant={'secondary'} size="sm" asChild>
                                        <Link href={`/workspaces/${workspaceId}`}>
                                                <ArrowLeftIcon className="size-4 mr-2" />
                                                Back
                                        </Link>
                                </Button>
                                <CardTitle className="text-2xl font-bold">Members List</CardTitle>
                        </CardHeader>
                        <div className="px-7">
                                <DottedSeparator />
                        </div>
                        <CardContent className="p-7">
                                {members?.documents.map((member, index) => (
                                        <Fragment key={member.$id}>
                                                <div className="flex items-center gap-2">
                                                        <MemberAvatar
                                                                name={member.name}
                                                                fallbackClassName="text-lg"
                                                                className="size-10"
                                                        />
                                                        <div className="flex flex-col ml-2">
                                                                <div className="flex flex-row">
                                                                        <p className="font-medium">{member.name}</p>
                                                                        <div
                                                                                className={`${
                                                                                        member.role === MemberRole.ADMIN
                                                                                                ? 'bg-amber-600'
                                                                                                : 'bg-blue-400'
                                                                                } ml-2 mb-1 rounded-md`}
                                                                        >
                                                                                <p className="text-white text-xs px-2 py-1">
                                                                                        {member.role ===
                                                                                        MemberRole.ADMIN
                                                                                                ? 'Admin'
                                                                                                : 'Member'}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground">
                                                                        {member.email}
                                                                </p>
                                                        </div>
                                                        <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                        <Button
                                                                                className="ml-auto"
                                                                                variant="secondary"
                                                                                size="icon"
                                                                        >
                                                                                <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                                                        </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent side="bottom" align="end">
                                                                        {/* TODO: Add role update depending on number of members === 1, etc */}
                                                                        <DropdownMenuItem
                                                                                className="font-medium"
                                                                                onClick={() =>
                                                                                        handleUpdateMember(
                                                                                                member.$id,
                                                                                                member.role ===
                                                                                                        MemberRole.ADMIN
                                                                                                        ? MemberRole.MEMBER
                                                                                                        : MemberRole.ADMIN,
                                                                                        )
                                                                                }
                                                                                disabled={isUpdatingMember}
                                                                        >
                                                                                Set as{' '}
                                                                                {member.role === MemberRole.ADMIN
                                                                                        ? 'Member'
                                                                                        : 'Admin'}
                                                                        </DropdownMenuItem>

                                                                        <DropdownMenuItem
                                                                                className="font-medium text-amber-700"
                                                                                onClick={() =>
                                                                                        handleDeleteMember(member.$id)
                                                                                }
                                                                                disabled={isDeletingMember}
                                                                        >
                                                                                Remove {member.name}
                                                                        </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                        </DropdownMenu>
                                                </div>
                                                {index < members.documents.length - 1 && (
                                                        <Separator className="my-3 text-neutral-200" />
                                                )}
                                        </Fragment>
                                ))}
                        </CardContent>
                </Card>
        );
};
