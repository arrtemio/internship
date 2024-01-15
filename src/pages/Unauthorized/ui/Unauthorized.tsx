import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { errorAlign } from 'styles/style';

export const Unauthorized = () => {
    const { t } = useTranslation('translation');
    return (
        <Container sx={errorAlign}>
            <Typography
                data-testid="Unauthorized"
                textAlign="center"
                variant="h4"
            >
                {t('You must be logged in to use the application!')}
            </Typography>
        </Container>
    );
};
