import React, {
    FC, memo, useMemo, useState,
} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography,
} from '@mui/material';

import { SubTaskCard, Task, TaskCard } from 'entities/Task';
import { AddSubTask } from 'features/AddSubTask/AddSubTask';
import { useTranslation } from 'react-i18next';
import { MainTaskStyle as styles } from './MainTask.style';

interface MainTaskProps {
    task: Task;
}

export const MainTask: FC<MainTaskProps> = memo(({ task }) => {
    const {
        subTasks, id, taskPerformer, isImportant, status,
    } = task;
    const [expanded, setExpanded] = useState<boolean>(false);
    const { t } = useTranslation('translation');

    const wrapperStyle = useMemo(() => (
        isImportant ? styles.wrapperShadows(status) : undefined
    ), [isImportant, status]);

    const handleExpanded = () => setExpanded(!expanded);

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
                    <AddSubTask id={task.id} />
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
