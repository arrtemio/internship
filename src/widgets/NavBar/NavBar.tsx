import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSwitcher from 'features/ThemeSwitcher/ThemeSwitcher';
import { flexGrow } from 'styles/style';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import LangSwitcher from 'features/LangSwitcher/LangSwitcher';

export const NavBar = memo(() => {
    const { t } = useTranslation('translation');

    return (
        <Box sx={flexGrow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={flexGrow}
                    >
                        { t('Task list') }
                    </Typography>
                    <LangSwitcher />
                    <ThemeSwitcher />
                </Toolbar>
            </AppBar>
        </Box>
    );
});
