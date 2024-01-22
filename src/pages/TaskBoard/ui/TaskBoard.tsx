import React, {
    memo, useCallback, useEffect,
} from 'react';
import { Box, Container } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import {
    changeTaskStatus, getAllTasks, getTasksData, Status,
} from 'entities/Task';
import { getUserData } from 'entities/User';
import { StatusValues } from 'entities/Task/model/types/task';
import { AddMainTask } from 'widgets/AddMainTask/AddMainTask';
import { BoardColumn } from 'widgets/dragAndDrop';

import { TaskBoardStyle as styles } from './TaskBoard.style';

export const TaskBoard = memo(() => {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector(getTasksData);
    const email = useAppSelector(getUserData)?.email || '';

    useEffect(() => {
        if (email) {
            dispatch(getAllTasks(email));
        }
    }, [dispatch, email]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return;

        const startedCell = result.source.droppableId;
        const droppedCell = result.destination.droppableId as Status;
        const taskID = result.draggableId;

        if (startedCell === droppedCell) return;

        dispatch(changeTaskStatus({ taskID, status: droppedCell }));
    }, [dispatch]);

    return (
        <Container sx={styles.container} data-testid="TaskBoard">
            <AddMainTask />
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={styles.board_wrapper}>
                    {StatusValues.map((status) => (
                        <BoardColumn
                            key={status}
                            tasks={tasks}
                            status={status}
                        />
                    ))}
                </Box>
            </DragDropContext>
        </Container>
    );
});
