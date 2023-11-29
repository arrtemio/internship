import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSwitcher from 'features/ThemeSwitcher/ThemeSwitcher';
import { flexGrow } from 'styles/style';

export const NavBar = () => (
    <Box sx={flexGrow}>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={flexGrow}
                >
                    Task list
                </Typography>
                <ThemeSwitcher />
            </Toolbar>
        </AppBar>
    </Box>
);
