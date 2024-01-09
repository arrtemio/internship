import React, {
    FC, memo, useMemo, useState,
} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography,
} from '@mui/material';

import { SubTaskCard, Task, TaskCard } from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { AddSubTask } from 'features/AddSubTask/AddSubTask';
import { useTranslation } from 'react-i18next';
import { createSubTaskDto } from 'entities/Task/model/types/task';
import { createSubTask } from 'entities/Task/model/actions/tasksActions';
import { MainTaskStyle as styles } from './MainTask.style';

interface MainTaskProps {
    task: Task;
}

export const MainTask: FC<MainTaskProps> = memo(({ task }) => {
    const {
        subTasks, id, taskPerformer, isImportant, status,
    } = task;
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');

    const wrapperStyle = useMemo(() => (
        isImportant ? styles.wrapperShadows(status) : undefined
    ), [isImportant, status]);

    const handleExpanded = () => setExpanded(!expanded);

    const createNewSubTask = (title: string) => {
        const subTask = createSubTaskDto(title);
        dispatch(createSubTask({ subTask, taskID: id }));
    };

    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded}
            data-testid="MainTask"
            sx={wrapperStyle}
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
                    <AddSubTask
                        action={createNewSubTask}
                        id={task.id}
                    />
                    {subTasks
                        && (
                            <Box sx={styles.subTasksList}>
                                {subTasks.map((sub) => (
                                    <SubTaskCard
                                        taskPerformer={taskPerformer}
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
