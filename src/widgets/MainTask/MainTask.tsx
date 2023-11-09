import React, { FC, memo } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
} from '@mui/material';

import { StatusEnum, SubTask, Task } from '../../entities/Task/model/types/task';
import { SubTaskCard } from '../../shared/ui/TaskCards/SubTaskCard';
import { tasksActions } from '../../entities/Task/model/slice/tasksSlice';
import { useAppDispatch } from '../../shared/lib/hooks/redux';
import { AddTask } from '../Addtask/ui/AddTask';
import { TaskCard } from '../../shared/ui/TaskCards/TaskCard';

interface MainTaskProps {
    task: Task;
}

export const MainTask: FC<MainTaskProps> = memo(({ task }) => {
    const dispatch = useAppDispatch();

    const createSubTask = (title: string) => {
        const subTask: SubTask = {
            id: Date.now(),
            title,
            status: StatusEnum.TO_DO,
            taskId: task.id,
            completedAt: null,
        };
        dispatch(tasksActions.createSubTask(subTask));
    };
    return (
        <Accordion
            sx={{ mb: '10px' }}
            TransitionProps={{ unmountOnExit: false }}
        >
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <TaskCard task={task} />
            </AccordionSummary>
            <AccordionDetails>
                <Container sx={{ margin: '10px' }}>
                    <AddTask action={createSubTask} />
                    {task.subTasks
                        && (
                            <Box>
                                {task.subTasks.map((sub) => <SubTaskCard key={sub.id} task={sub} />)}
                            </Box>
                        )}
                </Container>
            </AccordionDetails>
        </Accordion>
    );
});
