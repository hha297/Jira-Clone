import { getCurrent } from '@/features/auth/queries';
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher';
import { redirect } from 'next/navigation';
import React from 'react';

const TaskPage = async () => {
        const user = await getCurrent();
        if (!user) {
                redirect('/sign-in');
        }
        return (
                <div>
                        <TaskViewSwitcher />
                </div>
        );
};

export default TaskPage;
