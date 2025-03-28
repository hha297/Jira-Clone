import { ProjectAnalyticsResponseType } from '@/features/projects/api/use-get-project-analytics';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { AnalyticsCard } from './analytics-card';
import { DottedSeparator } from './dotted-separator';
// interface AnalyticsProps {
//         data?: {
//                 taskCount: number;
//                 taskDiff: number;
//                 projectCount?: number;
//                 projectDiff?: number;
//                 incompletedTaskCount?: number;
//                 incompletedTaskDiff?: number;
//                 assignedTaskCount: number;
//                 assignedTaskDiff: number;
//                 completedTaskCount: number;
//                 completedTaskDiff: number;
//                 overdueTaskCount: number;
//                 overdueTaskDiff: number;
//         };
// }

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
        return (
                <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
                        <div className="w-full flex flex-row">
                                <div className="flex items-center flex-1">
                                        <AnalyticsCard
                                                title="Tasks"
                                                value={data.taskCount}
                                                variant={data.taskDiff > 0 ? 'up' : 'down'}
                                                increasedValue={data.taskDiff}
                                        />
                                        <DottedSeparator direction="vertical" />
                                </div>
                                <div className="flex items-center flex-1">
                                        <AnalyticsCard
                                                title="Assigned Tasks"
                                                value={data.assignedTaskCount}
                                                variant={data.assignedTaskDiff > 0 ? 'up' : 'down'}
                                                increasedValue={data.assignedTaskDiff}
                                        />
                                        <DottedSeparator direction="vertical" />
                                </div>
                                <div className="flex items-center flex-1">
                                        <AnalyticsCard
                                                title="Incompleted Tasks"
                                                value={data.incompletedTaskCount}
                                                variant={data.incompletedTaskDiff > 0 ? 'up' : 'down'}
                                                increasedValue={data.incompletedTaskDiff}
                                        />
                                        <DottedSeparator direction="vertical" />
                                </div>
                                <div className="flex items-center flex-1">
                                        <AnalyticsCard
                                                title="Completed Tasks"
                                                value={data.completedTaskCount}
                                                variant={data.completedTaskDiff > 0 ? 'up' : 'down'}
                                                increasedValue={data.completedTaskDiff}
                                        />
                                        <DottedSeparator direction="vertical" />
                                </div>
                                <div className="flex items-center flex-1">
                                        <AnalyticsCard
                                                title="Overdue Tasks"
                                                value={data.overdueTaskCount}
                                                variant={data.overdueTaskDiff > 0 ? 'up' : 'down'}
                                                increasedValue={data.overdueTaskDiff}
                                        />
                                        <DottedSeparator direction="vertical" />
                                </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                </ScrollArea>
        );
};
