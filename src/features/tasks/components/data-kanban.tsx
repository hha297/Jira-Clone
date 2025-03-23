import { useState } from 'react';
import { Task, TaskStatus } from '../type';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { KanbanColumnHeader } from './kanban-column-header';
interface DataKanbanProps {
        data: Task[];
}

const boards: TaskStatus[] = [
        TaskStatus.BACKLOG,
        TaskStatus.TODO,
        TaskStatus.IN_PROGRESS,
        TaskStatus.IN_REVIEW,
        TaskStatus.DONE,
];

type TasksState = {
        [key in TaskStatus]: Task[];
};

export const DataKanban = ({ data }: DataKanbanProps) => {
        const [tasks, setTasks] = useState<TasksState>(() => {
                const initialTask: TasksState = {
                        [TaskStatus.BACKLOG]: [],
                        [TaskStatus.TODO]: [],
                        [TaskStatus.IN_PROGRESS]: [],
                        [TaskStatus.IN_REVIEW]: [],
                        [TaskStatus.DONE]: [],
                };

                data.forEach((task) => {
                        initialTask[task.status].push(task);
                });

                Object.keys(initialTask).forEach((status) => {
                        initialTask[status as TaskStatus].sort((a, b) => a.position - b.position);
                });

                return initialTask;
        });
        return (
                <DragDropContext onDragEnd={() => {}}>
                        <div className="flex overflow-x-auto">
                                {boards.map((board) => {
                                        return (
                                                <div
                                                        key={board}
                                                        className="flex-1 mx-2 bg-muted p-2 rounded-md min-w-52"
                                                >
                                                        <KanbanColumnHeader
                                                                board={board}
                                                                taskCount={tasks[board].length}
                                                        />
                                                </div>
                                        );
                                })}
                        </div>
                </DragDropContext>
        );
};
