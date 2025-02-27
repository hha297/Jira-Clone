import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import React from 'react';
import Link from 'next/link';
import { signUpSchema } from '../schema';
import { useSignUp } from '../api/use-signup';

export const SignUpCard = () => {
        const { mutate } = useSignUp();
        const form = useForm<z.infer<typeof signUpSchema>>({
                resolver: zodResolver(signUpSchema),
                defaultValues: {
                        name: '',
                        email: '',
                        password: '',
                },
        });

        const onSubmit = (values: z.infer<typeof signUpSchema>) => {
                mutate({ json: values });
                console.log(values);
        };

        return (
                <Card className="w-full h-full md:w-[480px]  border-none shadow-none">
                        <CardHeader className="flex items-center justify-center text-center p-7">
                                <CardTitle className="text-2xl">Sign Up</CardTitle>
                                <CardDescription>
                                        By signing up, you agree to our{' '}
                                        <Link href="/privacy">
                                                <span className="text-blue-700">Privacy Policy</span>
                                        </Link>{' '}
                                        and {''}
                                        <Link href="/terms">
                                                <span className="text-blue-700">Terms of Service</span>
                                        </Link>
                                </CardDescription>
                        </CardHeader>
                        <div className="px-7">
                                <DottedSeparator />
                        </div>
                        <CardContent className="p-7">
                                <Form {...form}>
                                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                                                {/* Name Field */}
                                                <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                                <FormItem>
                                                                        <FormControl>
                                                                                <Input
                                                                                        type="text"
                                                                                        placeholder="Enter your name"
                                                                                        {...field}
                                                                                />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                </FormItem>
                                                        )}
                                                />

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

                                                <Button disabled={false} size="lg" className="w-full">
                                                        Sign Up
                                                </Button>
                                        </form>
                                </Form>
                        </CardContent>
                        <div className="px-7">
                                <DottedSeparator />
                        </div>
                        <CardContent className="p-7 flex flex-col gap-y-4">
                                <Button variant={'secondary'} size={'lg'} className="w-full" disabled={false}>
                                        <FcGoogle className="size-5 mr-1" />
                                        Sign Up with Google
                                </Button>
                                <Button variant={'secondary'} size={'lg'} className="w-full" disabled={false}>
                                        <FaGithub className="size-5 mr-1" />
                                        Sign Up with Github
                                </Button>
                                <div className="px-7">
                                        <DottedSeparator />
                                </div>
                                <CardContent className="p-7 flex items-center justify-center">
                                        <p>Already have an account? </p>
                                        <Link href="/sign-in" className="text-blue-700 ml-1">
                                                Sign In
                                        </Link>
                                </CardContent>
                        </CardContent>
                </Card>
        );
};
