import { Hono } from 'hono';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../schema';
import { zValidator } from '@hono/zod-validator';
import { sessionMiddleware } from '@/lib/session-middleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, TASKS_ID, WORKSPACES_ID } from '@/config';
import { ID, Query } from 'node-appwrite';
import { MemberRole } from '@/features/members/type';
import { generateInviteCode } from '@/lib/utils';
import { getMember } from '@/features/members/utils';
import { z } from 'zod';
import { Workspace } from '../type';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { TaskStatus } from '@/features/tasks/type';

const app = new Hono()
        .get('/', sessionMiddleware, async (c) => {
                const databases = c.get('databases');
                const user = c.get('user');

                const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
                        Query.equal('userId', user.$id),
                ]);

                if (members.total === 0) {
                        return c.json({ data: { documents: [], total: 0 } });
                }

                const workspaceIds = members.documents.map((member) => member.workspaceId);

                const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
                        Query.orderDesc('$createdAt'),
                        Query.contains('$id', workspaceIds),
                ]);
                return c.json({ data: workspaces });
        })
        .get('/:workspaceId', sessionMiddleware, async (c) => {
                const databases = c.get('databases');
                const user = c.get('user');
                const { workspaceId } = c.req.param();

                const member = await getMember({ databases, userId: user.$id, workspaceId });

                if (!member) {
                        return c.json({ error: 'Unauthorized' }, 401);
                }

                const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACES_ID, workspaceId);

                return c.json({ data: workspace });
        })
        .get('/:workspaceId/analytics', sessionMiddleware, async (c) => {
                const user = c.get('user');
                const databases = c.get('databases');
                const { workspaceId } = c.req.param();

                const member = await getMember({
                        databases,
                        workspaceId,
                        userId: user.$id,
                });

                if (!member) {
                        return c.json({ error: 'Unauthorized' }, 401);
                }

                const now = new Date();
                const thisMonthStart = startOfMonth(now);
                const thisMonthEnd = endOfMonth(now);
                const lastMonthStart = startOfMonth(subMonths(now, 1));
                const lastMonthEnd = endOfMonth(subMonths(now, 1));

                const thisMonthTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString()),
                ]);

                const lastMonthTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString()),
                ]);

                const taskCount = thisMonthTasks.total;
                const taskDiff = taskCount - lastMonthTasks.total;

                const thisMonthAssignTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.equal('assigneeId', member.$id),
                        Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString()),
                ]);

                const lastMonthAssignTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.equal('assigneeId', member.$id),
                        Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString()),
                ]);

                const assignedTaskCount = thisMonthAssignTasks.total;
                const assignedTaskDiff = assignedTaskCount - lastMonthAssignTasks.total;

                const thisMonthIncompletedTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.notEqual('status', TaskStatus.DONE),
                        Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString()),
                ]);

                const lastMonthIncompletedTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.notEqual('status', TaskStatus.DONE),
                        Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString()),
                ]);

                const incompletedTaskCount = thisMonthIncompletedTasks.total;
                const incompletedTaskDiff = incompletedTaskCount - lastMonthIncompletedTasks.total;

                const thisMonthCompletedTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.equal('status', TaskStatus.DONE),
                        Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString()),
                ]);

                const lastMonthCompletedTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.equal('status', TaskStatus.DONE),
                        Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString()),
                ]);

                const completedTaskCount = thisMonthCompletedTasks.total;
                const completedTaskDiff = completedTaskCount - lastMonthCompletedTasks.total;

                const thisMonthOverdueTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.notEqual('status', TaskStatus.DONE),
                        Query.lessThan('dueDate', now.toISOString()),
                        Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString()),
                ]);

                const lastMonthOverdueTasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                        Query.equal('workspaceId', workspaceId),
                        Query.notEqual('status', TaskStatus.DONE),
                        Query.lessThan('dueDate', now.toISOString()),
                        Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
                        Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString()),
                ]);

                const overdueTaskCount = thisMonthOverdueTasks.total;
                const overdueTaskDiff = overdueTaskCount - lastMonthOverdueTasks.total;

                return c.json({
                        data: {
                                taskCount,
                                taskDiff,
                                assignedTaskCount,
                                assignedTaskDiff,
                                incompletedTaskCount,
                                incompletedTaskDiff,
                                completedTaskCount,
                                completedTaskDiff,
                                overdueTaskCount,
                                overdueTaskDiff,
                        },
                });
        })

        .post('/', zValidator('form', createWorkspaceSchema), sessionMiddleware, async (c) => {
                const databases = c.get('databases');
                const storage = c.get('storage');
                const user = c.get('user');

                const { name, image } = c.req.valid('form');

                let uploadedImageUrl: string | undefined;

                if (image instanceof File) {
                        const file = await storage.createFile(IMAGES_BUCKET_ID, ID.unique(), image);

                        const arrayBuffer = await storage.getFilePreview(IMAGES_BUCKET_ID, file.$id);

                        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
                }

                const workspace = await databases.createDocument(DATABASE_ID, WORKSPACES_ID, ID.unique(), {
                        name,
                        userId: user.$id,
                        imageUrl: uploadedImageUrl,
                        inviteCode: generateInviteCode(6),
                });

                await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
                        userId: user.$id,
                        workspaceId: workspace.$id,
                        role: MemberRole.ADMIN,
                });
                return c.json({ data: workspace });
        })
        .patch('/:workspaceId', sessionMiddleware, zValidator('form', updateWorkspaceSchema), async (c) => {
                const databases = c.get('databases');
                const storage = c.get('storage');
                const user = c.get('user');
                const { workspaceId } = c.req.param();
                const { name, image } = c.req.valid('form');

                const member = await getMember({ databases, userId: user.$id, workspaceId });

                if (!member || member.role !== MemberRole.ADMIN) {
                        return c.json({ error: 'Unauthorized' }, 401);
                }

                let uploadedImageUrl: string | undefined;

                if (image instanceof File) {
                        const file = await storage.createFile(IMAGES_BUCKET_ID, ID.unique(), image);

                        const arrayBuffer = await storage.getFilePreview(IMAGES_BUCKET_ID, file.$id);

                        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
                } else {
                        uploadedImageUrl = image;
                }

                const workspace = await databases.updateDocument(DATABASE_ID, WORKSPACES_ID, workspaceId, {
                        name,
                        imageUrl: uploadedImageUrl,
                });

                return c.json({ data: workspace });
        })

        .delete('/:workspaceId', sessionMiddleware, async (c) => {
                const databases = c.get('databases');
                const user = c.get('user');
                const { workspaceId } = c.req.param();
                const member = await getMember({ databases, workspaceId, userId: user.$id });

                if (!member || member.role !== MemberRole.ADMIN) {
                        return c.json({ error: 'Unauthorized' }, 401);
                }
                //TODO: Delete all members of the workspace and all the documents of the workspace
                await databases.deleteDocument(DATABASE_ID, WORKSPACES_ID, workspaceId);

                return c.json({ data: { $id: workspaceId } });
        })
        .post('/:workspaceId/reset-invite-code', sessionMiddleware, async (c) => {
                const databases = c.get('databases');
                const user = c.get('user');
                const { workspaceId } = c.req.param();
                const member = await getMember({ databases, workspaceId, userId: user.$id });

                if (!member || member.role !== MemberRole.ADMIN) {
                        return c.json({ error: 'Unauthorized' }, 401);
                }
                const workspace = await databases.updateDocument(DATABASE_ID, WORKSPACES_ID, workspaceId, {
                        inviteCode: generateInviteCode(6),
                });

                return c.json({ data: workspace });
        })
        .post(
                '/:workspaceId/join',
                sessionMiddleware,
                zValidator('json', z.object({ inviteCode: z.string() })),
                async (c) => {
                        const { workspaceId } = c.req.param();
                        const { inviteCode } = c.req.valid('json');

                        const databases = c.get('databases');
                        const user = c.get('user');

                        const member = await getMember({ databases, workspaceId, userId: user.$id });
                        // User is already a member of the workspace
                        if (member) {
                                return c.json({ error: 'User is already a member of the workspace' }, 400);
                        }

                        const workspace = await databases.getDocument<Workspace>(
                                DATABASE_ID,
                                WORKSPACES_ID,
                                workspaceId,
                        );
                        if (!workspace) {
                                return c.json({ error: 'Workspace not found' }, 404);
                        }

                        if (workspace.inviteCode !== inviteCode) {
                                return c.json({ error: 'Invalid invite code' }, 400);
                        }
                        //TODO: Add the user to the workspace
                        await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
                                userId: user.$id,
                                workspaceId,
                                role: MemberRole.MEMBER,
                        });
                        return c.json({ data: workspace });
                },
        );
export default app;
