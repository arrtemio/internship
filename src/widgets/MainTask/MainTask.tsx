import React, { FC, memo, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container, Typography,
} from '@mui/material';

import {
    Status,
    BaseTask,
    SubTaskCard,
    Task,
    TaskCard,
    tasksActions,
} from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { AddTask } from 'features/Addtask/AddTask';
import { generateRandomId } from 'shared/lib/helpers';
import { flexColumn } from 'styles/style';

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

        const subTask: BaseTask = {
            id: randomID,
            title,
            status: Status.TO_DO,
            completedAt: null,
        };
        dispatch(tasksActions.createSubTask({ subTask, taskID: task.id }));
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
                <Box sx={{ ...flexColumn, width: '100%' }}>
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
                <Container sx={{ ...flexColumn, gap: '10px' }}>
                    <AddTask placeholder="Create sub task" action={createSubTask} />
                    {task.subTasks
                        && (
                            <Box sx={{ ...flexColumn, gap: '5px' }}>
                                {task.subTasks.map((sub) => (
                                    <SubTaskCard
                                        key={sub.id}
                                        subTask={sub}
                                        taskID={task.id}
                                    />
                                ))}
                            </Box>
                        )}
                </Container>
            </AccordionDetails>
        </Accordion>
    );
});
