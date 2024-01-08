import {
    FC, memo, useState, ChangeEvent,
} from 'react';
import { ModalWrapper } from 'shared/ui/ModalWrapper/ModalWrapper';
import {
    Box, Button, Link, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { signIn, signUp } from 'entities/User';
import { PassField } from 'shared/ui/PassField/PassField';
import { FormValidator } from 'shared/lib/helpers';
import { AuthModalStyles as styles } from './AuthModal.styles';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = memo(({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');

    const { t } = useTranslation('translation');

    const handleSwitchIsRegister = () => {
        setIsRegister((prevState) => !prevState);
    };

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if (emailError) setEmailError('');
        setEmail(e.target.value);
    };

    const handleChangePass = (e: ChangeEvent<HTMLInputElement>) => {
        if (passError) setPassError('');
        setPassword(e.target.value);
    };

    const handleRegister = () => {
        const emailCorrect = FormValidator.emailChecking(email, setEmailError);
        const passCorrect = FormValidator.passChecking(password, setPassError);

        if (emailCorrect && passCorrect) {
            dispatch(signUp({ email, password }));
            onClose();
        }
    };

    const handleLogin = () => {
        const emailCorrect = FormValidator.emailChecking(email, setEmailError);
        const passCorrect = FormValidator.passChecking(password, setPassError);

        if (emailCorrect && passCorrect) {
            dispatch(signIn({ email, password }));
            onClose();
        }
    };

    return (
        <ModalWrapper
            open={open}
            onClose={onClose}
        >
            <Box sx={styles.wrapper} data-testid="AuthModal-wrapper">
                <Typography
                    variant="h5"
                    align="center"
                    data-testid="AuthModal-title"
                >
                    {t(isRegister ? 'Registration' : 'Login')}
                </Typography>
                <Box sx={styles.form}>
                    <TextField
                        placeholder={t('Email')}
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        error={!!emailError}
                        helperText={t(emailError) || ' '}
                        data-testid="AuthModal-email"
                        label={t('Email')}
                    />
                    <PassField
                        value={password}
                        onChange={handleChangePass}
                        error={!!passError}
                        helperText={t(passError)}
                        testedComponent="AuthModal"
                    />
                </Box>
                { isRegister
                    ? (
                        <Button data-testid="AuthModal-btn-register" onClick={handleRegister}>
                            {t('Registration')}
                        </Button>
                    )
                    : (
                        <Button data-testid="AuthModal-btn-login" onClick={handleLogin}>
                            {t('Login')}
                        </Button>
                    )}
                <Box sx={styles.caption}>
                    <Typography data-testid="AuthModal-caption" variant="caption">
                        {t(isRegister ? 'Already have an account?' : 'Do not have an account yet?')}
                    </Typography>
                    <Link
                        variant="caption"
                        component="button"
                        onClick={handleSwitchIsRegister}
                        data-testid="AuthModal-caption-switch"
                    >
                        {t(isRegister ? 'Login' : 'Registration')}
                    </Link>
                </Box>
            </Box>
        </ModalWrapper>
    );
});
