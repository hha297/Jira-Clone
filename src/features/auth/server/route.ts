import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { deleteCookie, setCookie } from 'hono/cookie';
import { signInSchema, signUpSchema } from '../schema';
import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { AUTH_COOKIE } from '../constants';
const app = new Hono()
        .post('/signin', zValidator('json', signInSchema), async (c) => {
                const { email, password } = c.req.valid('json');
                const { account } = await createAdminClient();
                const session = await account.createEmailPasswordSession(email, password);
                setCookie(c, AUTH_COOKIE, session.secret, {
                        path: '/',
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 60 * 60 * 24 * 30,
                });
                return c.json({ success: true });
        })
        .post('/signup', zValidator('json', signUpSchema), async (c) => {
                const { name, email, password } = c.req.valid('json');
                const { account } = await createAdminClient();
                await account.create(ID.unique(), email, password, name);

                const session = await account.createEmailPasswordSession(email, password);
                setCookie(c, AUTH_COOKIE, session.secret, {
                        path: '/',
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 60 * 60 * 24 * 30,
                });
                return c.json({ success: true });
        })
        .post('/signout', async (c) => {
                deleteCookie(c, AUTH_COOKIE);
                return c.json({ success: true });
        });

export default app;
