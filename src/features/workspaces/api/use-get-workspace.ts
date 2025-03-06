import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkspace = () => {
        const query = useQuery({
                queryKey: ['workspace'],
                queryFn: async () => {
                        const response = await client.api.workspaces.$get();

                        if (!response.ok) {
                                throw new Error('Failed to get workspace');
                        }
                        const { data } = await response.json();
                        return data;
                },
        });

        return query;
};
