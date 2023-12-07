import { Theme } from '@mui/material';

export const LoaderStyles = {
    backdrop: {
        color: '#fff',
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    },
};
