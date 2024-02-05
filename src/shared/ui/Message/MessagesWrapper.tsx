import React, { memo, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getMessages } from 'entities/Task';
import { Message } from './Message';
import { useAppSelector } from '../../lib/hooks/redux';
import { getPermission } from '../../lib/notification';

import { MessageStyle as styles } from './Message.style';

export const MessagesWrapper = memo(() => {
    const messages = useAppSelector(getMessages);

    useEffect(() => {
        getPermission();
    }, []);

    if (!messages.length) return null;

    return (
        <Stack sx={styles.wrapper} spacing={1}>
            {messages.map((message, index) => <Message message={message} key={`${message.taskID}-${message.type}`} />)}
        </Stack>
    );
});
