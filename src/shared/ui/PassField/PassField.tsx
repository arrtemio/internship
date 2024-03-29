import React, { FC, memo, useState } from 'react';
import {
    FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { AuthInputs } from 'features/AuthModal/AuthModal';
import { FormMessages } from '../../lib/messages';

interface PassFieldProps {
    register: UseFormRegister<AuthInputs>;
    error: boolean;
    helperText: string;
}

export const PassField: FC<PassFieldProps> = memo((props) => {
    const { helperText, error, register } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { t } = useTranslation('translation');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
                {t('Password')}
            </InputLabel>
            <OutlinedInput
                {...register(
                    'password',
                    {
                        required: FormMessages.EMPTY,
                        minLength: { value: 6, message: FormMessages.PASSWORD },
                    },
                )
                }
                id="outlined-adornment-password"
                placeholder={t('Password')}
                type={showPassword ? 'text' : 'password'}
                error={error}
                data-testid="AuthModal-pass"
                label={t('Password')}
                endAdornment={(
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            data-testid="AuthModal-pass-eye"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )}
            />
            <FormHelperText error={error}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
});
