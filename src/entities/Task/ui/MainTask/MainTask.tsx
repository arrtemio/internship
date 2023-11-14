import React, { FC, memo, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container, Typography,
} from '@mui/material';

import { StatusEnum, SubTask, Task } from '../../model/types/task';
import { SubTaskCard } from '../../../../widgets/TaskCards/SubTaskCard';
import { tasksActions } from '../../model/slice/tasksSlice';
import { useAppDispatch } from '../../../../shared/lib/hooks/redux';
import { AddTask } from '../../../../widgets/Addtask/AddTask';
import { TaskCard } from '../../../../widgets/TaskCards/TaskCard';
import { generateRandomId } from '../../../../shared/lib/helpers';

interface MainTaskProps {
    task: Task;
    ID: string;
}

export const MainTask: FC<MainTaskProps> = memo(({ task, ID }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleExpanded = () => setExpanded((prevState) => !prevState);

    const createSubTask = (title: string) => {
        const randomID = generateRandomId();

        const subTask: SubTask = {
            id: randomID,
            title,
            status: StatusEnum.TO_DO,
            taskId: task.id,
            completedAt: null,
        };
        dispatch(tasksActions.createSubTask(subTask));
    };

    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded}
        >
            <AccordionSummary
                aria-controls={`panel${ID}-content`}
                id={`panel${ID}-header`}
                onClick={handleExpanded}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <TaskCard data-testid="taskCard" task={task} />
                    {!expanded && (
                        <Typography
                            data-testid="clickZone"
                            sx={{ fontSize: 'small' }}
                            align="center"
                        >
                            Click for more
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Container sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <AddTask placeholder="Create sub task" action={createSubTask} />
                    {task.subTasks
                        && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {task.subTasks.map((sub) => <SubTaskCard key={sub.id} task={sub} />)}
                            </Box>
                        )}
                </Container>
            </AccordionDetails>
        </Accordion>
    );
});
