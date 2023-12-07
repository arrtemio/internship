import { FC, memo } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { LoaderStyles as styles } from './Loader.styles';

interface LoaderProps {
    isLoading: boolean;
}

export const Loader: FC<LoaderProps> = memo(({ isLoading }) => (
    <Backdrop
        sx={styles.backdrop}
        open={isLoading}
    >
        <CircularProgress color="primary" />
    </Backdrop>
));
