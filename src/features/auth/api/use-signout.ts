import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
type ResponseType = InferResponseType<(typeof client.api.auth.signout)['$post']>;

export const useSignOut = () => {
        const router = useRouter();
        const queryClient = useQueryClient();
        const mutation = useMutation<ResponseType, Error>({
                mutationFn: async () => {
                        const response = await client.api.auth.signout['$post']();
                        if (!response.ok) throw new Error('Failed to sign out');

                        return await response.json();
                },
                onSuccess: () => {
                        toast.success('Signed out');
                        router.refresh();
                        queryClient.invalidateQueries({ queryKey: ['current'] });
                },
                onError: () => {
                        toast.error('Failed to sign out');
                },
        });

        return mutation;
};
