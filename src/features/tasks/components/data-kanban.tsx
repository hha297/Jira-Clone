import { useCallback, useEffect, useState } from 'react';
import { Task, TaskStatus } from '../type';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { KanbanColumnHeader } from './kanban-column-header';
import { KanbanCard } from './kanban-card';
interface DataKanbanProps {
        data: Task[];
        onChange: (task: { $id: string; status: TaskStatus; position: number }[]) => void;
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

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
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

        useEffect(() => {
                const newTask: TasksState = {
                        [TaskStatus.BACKLOG]: [],
                        [TaskStatus.TODO]: [],
                        [TaskStatus.IN_PROGRESS]: [],
                        [TaskStatus.IN_REVIEW]: [],
                        [TaskStatus.DONE]: [],
                };

                data.forEach((task) => {
                        newTask[task.status].push(task);
                });

                Object.keys(newTask).forEach((status) => {
                        newTask[status as TaskStatus].sort((a, b) => a.position - b.position);
                });

                setTasks(newTask);
        }, [data]);

        const onDragEnd = useCallback(
                (result: DropResult) => {
                        if (!result.destination) return;
                        const { source, destination } = result;

                        const sourceStatus = source.droppableId as TaskStatus;
                        const destinationStatus = destination.droppableId as TaskStatus;

                        let updatePayload: { $id: string; status: TaskStatus; position: number }[] = [];

                        setTasks((prevTasks) => {
                                const newTasks = { ...prevTasks };
                                //Safely remove the task from the source column
                                const sourceColumn = [...newTasks[sourceStatus]];
                                const [movedTask] = sourceColumn.splice(source.index, 1);

                                //If there's no task in the destination column, add the task to the end of the column
                                if (!movedTask) {
                                        console.error('No task found at source index');
                                        return prevTasks;
                                }

                                // Create a new task object with the updated status and position
                                const updatedMovedTask =
                                        sourceStatus !== destinationStatus
                                                ? { ...movedTask, status: destinationStatus }
                                                : movedTask;

                                // Update the source column
                                newTasks[sourceStatus] = sourceColumn;

                                // Add the task to the destination column
                                const destinationColumn = [...newTasks[destinationStatus]];
                                destinationColumn.splice(destination.index, 0, updatedMovedTask);
                                newTasks[destinationStatus] = destinationColumn;

                                updatePayload = [];

                                updatePayload.push({
                                        $id: updatedMovedTask.$id,
                                        status: destinationStatus,
                                        position: Math.min((destination.index + 1) * 1000, 1_000_000),
                                });

                                // Update the position of the other tasks in the destination column
                                newTasks[destinationStatus].forEach((task, index) => {
                                        if (task && task.$id !== updatedMovedTask.$id) {
                                                const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                                                if (task.position !== newPosition) {
                                                        updatePayload.push({
                                                                $id: task.$id,
                                                                status: destinationStatus,
                                                                position: newPosition,
                                                        });
                                                }
                                        }
                                });

                                // If the task was moved to a different column, update the position of the other tasks in the source column
                                if (sourceStatus !== destinationStatus) {
                                        newTasks[sourceStatus].forEach((task, index) => {
                                                if (task) {
                                                        const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                                                        if (task.position !== newPosition) {
                                                                updatePayload.push({
                                                                        $id: task.$id,
                                                                        status: sourceStatus,
                                                                        position: newPosition,
                                                                });
                                                        }
                                                }
                                        });
                                }

                                return newTasks;
                        });
                        onChange(updatePayload);
                },
                [onChange],
        );

        return (
                <DragDropContext onDragEnd={onDragEnd}>
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
                                                        <Droppable droppableId={board} key={board}>
                                                                {(provided) => (
                                                                        <div
                                                                                {...provided.droppableProps}
                                                                                ref={provided.innerRef}
                                                                                className="min-h-52 py-2"
                                                                        >
                                                                                {tasks[board].map((task, index) => {
                                                                                        return (
                                                                                                <Draggable
                                                                                                        key={task.$id}
                                                                                                        draggableId={
                                                                                                                task.$id
                                                                                                        }
                                                                                                        index={index}
                                                                                                >
                                                                                                        {(provided) => (
                                                                                                                <div
                                                                                                                        ref={
                                                                                                                                provided.innerRef
                                                                                                                        }
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}
                                                                                                                >
                                                                                                                        <KanbanCard
                                                                                                                                task={
                                                                                                                                        task
                                                                                                                                }
                                                                                                                        />
                                                                                                                </div>
                                                                                                        )}
                                                                                                </Draggable>
                                                                                        );
                                                                                })}
                                                                                {provided.placeholder}
                                                                        </div>
                                                                )}
                                                        </Droppable>
                                                </div>
                                        );
                                })}
                        </div>
                </DragDropContext>
        );
};
