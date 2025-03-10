import { DATABASE_ID, MEMBERS_ID } from '@/config';
import { Databases, Query } from 'node-appwrite';

interface GetMemberProps {
        databases: Databases;
        userId: string;
        workspaceId: string;
}
export const getMember = async ({ databases, userId, workspaceId }: GetMemberProps) => {
        const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
                Query.equal('userId', userId),
                Query.equal('workspaceId', workspaceId),
        ]);
        return members.documents[0];
};
