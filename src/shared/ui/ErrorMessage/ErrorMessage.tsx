import { FC, memo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorMessageStyle as styles } from './ErrorMessage.style';

interface ErrorMessageProps {
    error: string,
}

export const ErrorMessage: FC<ErrorMessageProps> = memo(({ error }) => {
    const [open, setOpen] = useState<boolean>(Boolean(error));
    const { t } = useTranslation(('translation'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                sx={styles.alert}
            >
                {t(error)}
            </Alert>
        </Snackbar>
    );
});
