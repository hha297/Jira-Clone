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

const formSchema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(256),
});

export const SignInCard = () => {
        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                        email: '',
                        password: '',
                },
        });

        const onSubmit = (values: z.infer<typeof formSchema>) => {
                console.log(values);
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

                                                <Button disabled={false} size="lg" className="w-full">
                                                        Sign In
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
                                        Sign In with Google
                                </Button>
                                <Button variant={'secondary'} size={'lg'} className="w-full" disabled={false}>
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
