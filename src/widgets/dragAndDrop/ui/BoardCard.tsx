import React, { FC, useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import {
    Box, Button, Card, Typography,
} from '@mui/material';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { Task } from 'entities/Task';
import { getUserData } from 'entities/User';
import { ModalWrapper } from 'shared/ui/ModalWrapper/ModalWrapper';
import { getDateAndTime } from 'shared/lib/helpers';
import { styles } from './styles';
import { MainTask } from '../../MainTask/MainTask';

interface BoardCardProps {
    task: Task,
    index: number,
}

export const BoardCard: FC<BoardCardProps> = ({ task, index }) => {
    const {
        createdAt, completedAt, title, status, isImportant, taskPerformer, id,
    } = task;
    const email = useAppSelector(getUserData)?.email || '';
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { t } = useTranslation('translation');

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    const createdTime = getDateAndTime(createdAt);
    const completeTime = getDateAndTime(completedAt);

    const isDragDisabled = email !== taskPerformer;

    const wrapperStyle = useMemo(() => (
        isImportant ? styles.wrapperShadows(status) : undefined
    ), [isImportant, status]);

    return (
        <>
            <Draggable
                draggableId={id}
                index={index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <Box
                        data-testid={`BoardCard-${id}`}
                        sx={snapshot.isDragging ? styles.wrapperDragShadow : wrapperStyle}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card sx={styles.board_card(isDragDisabled)}>
                            <Typography
                                align="left"
                                sx={styles.title(status)}
                                data-testid="BoardCard-title"
                            >
                                {title}
                            </Typography>
                            <Box sx={styles.date}>
                                <Typography variant="caption">
                                    {t('Created')}
                                    :
                                    {createdTime}
                                </Typography>
                                {completeTime && !snapshot.isDragging
                                    ? (
                                        <Typography variant="caption">
                                            {t('Completed')}
                                            :
                                            {completeTime}
                                        </Typography>
                                    )
                                    : (
                                        <Typography
                                            sx={styles.empty}
                                            variant="caption"
                                        >
                                            -
                                        </Typography>
                                    )}
                            </Box>
                            <Button
                                variant="text"
                                sx={styles.more}
                                onClick={handleOpenModal}
                                data-testid="BoardCard-Btn"
                            >
                                {t('Click for more')}
                            </Button>
                        </Card>
                    </Box>
                )}
            </Draggable>
            <ModalWrapper
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <MainTask task={task} />
            </ModalWrapper>
        </>
    );
};
