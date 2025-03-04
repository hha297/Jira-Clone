import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
type ResponseType = InferResponseType<(typeof client.api.auth.signup)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.signup)['$post']>;

export const useSignUp = () => {
        const router = useRouter();
        const queryClient = useQueryClient();
        const mutation = useMutation<ResponseType, Error, RequestType>({
                mutationFn: async ({ json }) => {
                        const response = await client.api.auth.signup['$post']({ json });
                        if (!response.ok) throw new Error('Failed to sign up');
                        return await response.json();
                },
                onSuccess: () => {
                        toast.success('Signed up');
                        router.refresh();
                        queryClient.invalidateQueries({ queryKey: ['current'] });
                },
                onError: () => {
                        toast.error('Failed to sign up');
                },
        });

        return mutation;
};
