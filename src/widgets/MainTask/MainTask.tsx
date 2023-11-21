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
import { MainTaskStyle } from './MainTask.style';

interface MainTaskProps {
    task: Task;
    ID: string;
}

export const MainTask: FC<MainTaskProps> = memo(({ task, ID }) => {
    const { subTasks, id } = task;
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
        dispatch(tasksActions.createSubTask({ subTask, taskID: id }));
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
                <Box sx={MainTaskStyle.taskBox}>
                    <TaskCard task={task} />
                    {!expanded && (
                        <Typography
                            sx={MainTaskStyle.click}
                        >
                            Click for more
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Container sx={MainTaskStyle.details}>
                    <AddTask
                        size="small"
                        placeholder="Create sub task"
                        action={createSubTask}
                    />
                    {subTasks
                        && (
                            <Box sx={MainTaskStyle.subTasksList}>
                                {subTasks.map((sub) => (
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
