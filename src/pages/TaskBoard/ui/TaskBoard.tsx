import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { Box, Container } from '@mui/material';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import {
    changeTaskStatus, getTasksData, Status, subscribeToTasks,
} from 'entities/Task';
import { getUserData } from 'entities/User';
import { StatusValues } from 'entities/Task/model/types/task';
import { AddMainTask } from 'widgets/AddMainTask/AddMainTask';
import { BoardColumn } from 'widgets/dragAndDrop';

import { TaskBoardStyle as styles } from './TaskBoard.style';

export const TaskBoard = memo(() => {
    const dispatch = useAppDispatch();
    const [isDraggable, setIsDraggable] = useState<boolean>(false);

    const tasks = useAppSelector(getTasksData);
    const email = useAppSelector(getUserData)?.email || '';

    useEffect(() => {
        if (email) {
            const unsubscribe = dispatch(subscribeToTasks(email));

            return () => {
                unsubscribe();
            };
        }

        return () => {};
    }, [dispatch, email]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return;
        setIsDraggable(false);

        const startedCell = result.source.droppableId;
        const droppedCell = result.destination.droppableId as Status;
        const taskID = result.draggableId;

        if (startedCell === droppedCell) return;

        dispatch(changeTaskStatus({ taskID, status: droppedCell }));
    }, [dispatch]);

    const onDragStart = useCallback((start: DragStart) => setIsDraggable(true), []);

    return (
        <Container sx={styles.container} data-testid="TaskBoard">
            <AddMainTask />
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Box sx={styles.board_wrapper}>
                    {StatusValues.map((status) => (
                        <BoardColumn
                            key={status}
                            tasks={tasks}
                            status={status}
                            isDraggable={isDraggable}
                        />
                    ))}
                </Box>
            </DragDropContext>
        </Container>
    );
});
