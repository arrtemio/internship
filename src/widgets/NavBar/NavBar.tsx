import {
    AppBar, Box, Toolbar, Typography, Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from 'features/ThemeSwitcher/ThemeSwitcher';
import { flexGrow } from 'styles/style';
import LangSwitcher from 'features/LangSwitcher/LangSwitcher';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { AuthModal } from 'features/AuthModal/AuthModal';
import { getUserIsAuth, logOut } from 'entities/User';

export const NavBar = memo(() => {
    const isAuth = useAppSelector(getUserIsAuth);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleLogout = () => {
        dispatch(logOut());
    };

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
                    <Box mr="20px">
                        <Button
                            component={Link}
                            to="/"
                            color="inherit"
                        >
                            { t('Tasks') }
                        </Button>
                        <Button
                            component={Link}
                            to="/statistics"
                            color="inherit"
                            data-testid="ToStatistics"
                        >
                            { t('Statistics') }
                        </Button>
                    </Box>
                    <LangSwitcher />
                    <ThemeSwitcher />
                    {isAuth
                        ? (
                            <Button onClick={handleLogout} color="inherit">
                                {t('LogOut')}
                            </Button>
                        )
                        : (
                            <>
                                <Button onClick={openModal} color="inherit">
                                    {t('Login')}
                                </Button>
                                <AuthModal open={modalOpen} onClose={closeModal} />
                            </>
                        )}
                </Toolbar>
            </AppBar>
        </Box>
    );
});
