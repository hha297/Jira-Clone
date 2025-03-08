import { getCurrent } from '@/features/auth/action';
import { getWorkspace } from '@/features/workspaces/action';

import { redirect } from 'next/navigation';

export default async function Home() {
        const user = await getCurrent();
        if (!user) {
                redirect('/sign-in');
        }

        const workspaces = await getWorkspace();
        if (workspaces.total === 0) {
                redirect('/workspaces');
        } else {
                redirect(`/workspaces/${workspaces.documents[0].$id}`);
        }
}
