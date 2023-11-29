import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSwitcher from 'features/ThemeSwitcher/ThemeSwitcher';

export const NavBar = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Task list
                </Typography>
                <ThemeSwitcher />
            </Toolbar>
        </AppBar>
    </Box>
);
