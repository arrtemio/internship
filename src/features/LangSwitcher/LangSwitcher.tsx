import React, { memo } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LangSwitcherStyle as style } from './LangSwitcher.style';

const LangSwitcher = memo(() => {
    const { t, i18n } = useTranslation('translation');
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'pl' : 'en');
    };

    return (
        <Button
            variant="text"
            color="inherit"
            onClick={toggleLanguage}
            sx={style}
        >
            {t('Lang')}
        </Button>
    );
});

export default LangSwitcher;
