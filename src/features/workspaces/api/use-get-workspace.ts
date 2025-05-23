import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

interface UseGetProjectProps {
        workspaceId: string;
}
export const useGetWorkspace = ({ workspaceId }: UseGetProjectProps) => {
        const query = useQuery({
                queryKey: ['workspaces', workspaceId],
                queryFn: async () => {
                        const response = await client.api.workspaces[':workspaceId'].$get({
                                param: { workspaceId },
                        });

                        if (!response.ok) {
                                throw new Error('Failed to get workspace');
                        }
                        const { data } = await response.json();
                        return data;
                },
        });

        return query;
};
