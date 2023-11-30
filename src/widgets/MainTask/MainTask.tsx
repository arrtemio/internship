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
import { useTranslation } from 'react-i18next';
import { MainTaskStyle as styles } from './MainTask.style';

interface MainTaskProps {
    task: Task;
}

export const MainTask: FC<MainTaskProps> = memo(({ task }) => {
    const { subTasks, id } = task;
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');

    const handleExpanded = () => setExpanded((prevState) => !prevState);

    const createSubTask = (title: string) => {
        const subTask: BaseTask = {
            id: generateRandomId(),
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
            data-testid="MainTask"
        >
            <AccordionSummary
                aria-controls={`panel${id}-content`}
                id={`panel${id}-header`}
                onClick={handleExpanded}
                data-testid="MainTask-main"
            >
                <Box sx={styles.taskBox}>
                    <TaskCard task={task} />
                    {!expanded && (
                        <Typography sx={styles.click}>
                            {t('Click for more')}
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Container sx={styles.details} data-testid="MainTask-details">
                    <AddTask
                        size="small"
                        placeholder="Create sub task"
                        action={createSubTask}
                        id={task.id}
                    />
                    {subTasks
                        && (
                            <Box sx={styles.subTasksList}>
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
