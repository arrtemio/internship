import { FC, memo, useState } from 'react';
import { ModalWrapper } from 'shared/ui/ModalWrapper/ModalWrapper';
import {
    Box, Button, Link, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { signIn, signUp } from 'entities/User';
import { PassField } from 'shared/ui/PassField/PassField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormMessages } from 'shared/lib/messages';

import { AuthModalStyles as styles } from './AuthModal.styles';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

export type AuthInputs = {
    email: string;
    password: string;
}

export const AuthModal: FC<AuthModalProps> = memo(({ open, onClose }) => {
    const dispatch = useAppDispatch();

    const {
        register, handleSubmit, formState: { errors },
    } = useForm<AuthInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [isRegister, setIsRegister] = useState(false);
    const { t } = useTranslation('translation');

    const handleSwitchIsRegister = () => {
        setIsRegister(!isRegister);
    };

    const onSubmitHandle: SubmitHandler<AuthInputs> = (data) => {
        const { email, password } = data;
        const authAction = isRegister ? signUp : signIn;

        dispatch(authAction({ email, password }));
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
                        {...register('email', {
                            required: FormMessages.EMPTY,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: FormMessages.EMAIL,
                            },
                        })}
                        placeholder={t('Email')}
                        label={t('Email')}
                        error={!!errors.email?.message}
                        helperText={errors.email?.message ? t(errors.email.message) : ' '}
                        data-testid="AuthModal-email"
                    />
                    <PassField
                        register={register}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message ? t(errors.password.message) : ' '}
                    />
                    <Button
                        data-testid={`AuthModal-btn-${isRegister ? 'register' : 'login'}`}
                        onClick={handleSubmit(onSubmitHandle)}
                        type="submit"
                    >
                        {t(isRegister ? 'Registration' : 'Login')}
                    </Button>
                </Box>
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
