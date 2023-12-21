import React, { FC, memo, ReactNode } from 'react';
import { Box, Modal } from '@mui/material';
import { ModalWrapperStyles as styles } from './ModalWrapper.styles';

interface ModalWrapperProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const ModalWrapper: FC<ModalWrapperProps> = memo(({ open, onClose, children }) => (
    <Modal
        open={open}
        onClose={onClose}
        sx={styles.modal}
    >
        <Box sx={styles.box}>
            {children}
        </Box>
    </Modal>
));
