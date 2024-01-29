import React, { memo } from 'react';
import { Stack } from '@mui/material';
import { getMessages } from 'entities/Task';
import { useAppSelector } from '../../lib/hooks/redux';
import { Message } from './Message';

import { MessageStyle as styles } from './Message.style';

export const MessagesWrapper = memo(() => {
    const messages = useAppSelector(getMessages);

    if (messages.length) {
        return (
            <Stack sx={styles.wrapper} spacing={1}>
                {messages.map((message) => <Message message={message} key={message.taskID} />)}
            </Stack>
        );
    }

    return null;
});
