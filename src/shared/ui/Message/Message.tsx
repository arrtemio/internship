import React, {
    FC, memo, useCallback, useEffect, useState,
} from 'react';
import {
    Alert, AlertTitle, IconButton, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { IMessage } from 'entities/Task/model/types/task';
import { tasksActions } from 'entities/Task';
import { useAppDispatch } from '../../lib/hooks/redux';

import { MessageStyle as styles } from './Message.style';

interface MessageProps {
    message: IMessage;
}

export const Message: FC<MessageProps> = memo(({ message }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const {
        title, taskID, isImportant, type,
    } = message;

    const deleteMessage = useCallback(() => {
        dispatch(tasksActions.removeMessage(taskID));
        setIsOpen(false);
    }, [taskID, dispatch]);

    useEffect(() => {
        const autoCloseMessage = setTimeout(() => deleteMessage(), 8000);

        return () => {
            clearTimeout(autoCloseMessage);
        };
    }, [dispatch, deleteMessage]);

    if (isOpen) {
        return (
            <Alert
                severity="info"
                variant="filled"
                sx={styles.alert(isImportant)}
                action={(
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={deleteMessage}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                )}
            >
                <AlertTitle>{t(type)}</AlertTitle>
                <Typography variant="body1">{title}</Typography>
            </Alert>
        );
    }

    return null;
});
