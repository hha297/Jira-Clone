'use client';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { signInSchema } from '../schema';
import { useSignIn } from '../api/use-signin';
import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';

export const SignInCard = () => {
        const { mutate, isPending } = useSignIn();
        const form = useForm<z.infer<typeof signInSchema>>({
                resolver: zodResolver(signInSchema),
                defaultValues: {
                        email: '',
                        password: '',
                },
        });

        const onSubmit = (values: z.infer<typeof signInSchema>) => {
                mutate({ json: values });
        };

        return (
                <Card className="w-full h-full md:w-[480px] border-none shadow-none">
                        <CardHeader className="flex items-center justify-center text-center p-7">
                                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                        </CardHeader>
                        <div className="px-7">
                                <DottedSeparator />
                        </div>
                        <CardContent className="p-7">
                                <Form {...form}>
                                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                                                {/* Email Field */}
                                                <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                                <FormItem>
                                                                        <FormControl>
                                                                                <Input
                                                                                        type="email"
                                                                                        placeholder="Enter email address"
                                                                                        {...field}
                                                                                />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                </FormItem>
                                                        )}
                                                />

                                                {/* Password Field */}
                                                <FormField
                                                        control={form.control}
                                                        name="password"
                                                        render={({ field }) => (
                                                                <FormItem>
                                                                        <FormControl>
                                                                                <Input
                                                                                        type="password"
                                                                                        placeholder="Enter password"
                                                                                        {...field}
                                                                                />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                </FormItem>
                                                        )}
                                                />

                                                <Button disabled={isPending} size="lg" className="w-full">
                                                        Sign In
                                                </Button>
                                        </form>
                                </Form>
                        </CardContent>
                        <div className="px-7">
                                <DottedSeparator />
                        </div>
                        <CardContent className="p-7 flex flex-col gap-y-4">
                                <Button
                                        variant={'secondary'}
                                        size={'lg'}
                                        className="w-full"
                                        disabled={isPending}
                                        onClick={() => signUpWithGoogle()}
                                >
                                        <FcGoogle className="size-5 mr-1" />
                                        Sign In with Google
                                </Button>
                                <Button
                                        variant={'secondary'}
                                        size={'lg'}
                                        className="w-full"
                                        disabled={isPending}
                                        onClick={() => signUpWithGithub()}
                                >
                                        <FaGithub className="size-5 mr-1" />
                                        Sign In with Github
                                </Button>
                                <div className="px-7">
                                        <DottedSeparator />
                                </div>
                                <CardContent className="p-7 flex items-center justify-center">
                                        <p>Don&apos;t have an account?</p>
                                        <Link href="/sign-up" className="text-blue-700 ml-1">
                                                Sign Up
                                        </Link>
                                </CardContent>
                        </CardContent>
                </Card>
        );
};
