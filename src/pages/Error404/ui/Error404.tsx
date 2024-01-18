import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { errorAlign } from 'styles/style';

export const Error404 = () => {
    const { t } = useTranslation('translation');
    return (
        <Container sx={errorAlign}>
            <Typography
                data-testid="Error404"
                textAlign="center"
                variant="h4"
            >
                {t('Page not found!')}
            </Typography>
        </Container>
    );
};
