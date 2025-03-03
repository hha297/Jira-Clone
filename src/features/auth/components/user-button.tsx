'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/features/auth/api/use-current';
import { Loader, LogOutIcon } from 'lucide-react';
import { useSignOut } from '../api/use-signout';

export const UserButton = () => {
        const { data: user, isLoading } = useCurrentUser();
        const { mutate: signOut } = useSignOut();
        if (isLoading)
                return (
                        <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
                                <Loader className="size-4 animate-spin text-muted-foreground" />
                        </div>
                );
        if (!user) return null;
        const { name, email } = user!;

        const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? 'U';
        return (
                <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="outline-none relative">
                                <Avatar className=" size-10 hover:opacity-75 transition border border-neutral-100">
                                        <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                                                {avatarFallback}
                                        </AvatarFallback>
                                </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                                <div className="flex flex-col items-center justify-center gap-2 px-2 py-4">
                                        <Avatar className=" size-20  transition border border-neutral-100">
                                                <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
                                                        {avatarFallback}
                                                </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col justify-center items-center">
                                                <p className="text-sm font-medium text-neutral-900">{name || 'User'}</p>
                                                <p className="text-sm text-neutral-500">{email}</p>
                                        </div>
                                </div>
                                <DottedSeparator className="my-1" />
                                <DropdownMenuItem
                                        onClick={() => signOut()}
                                        className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
                                >
                                        <LogOutIcon className="size-4 mr-2" />
                                        Sign Out
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};
