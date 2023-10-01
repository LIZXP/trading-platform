import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import logo from '../assets/logo.svg';
import './styles/mainPageStyle.css';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }} position="sticky" >
            <AppBar sx={{ background: "grey" }}>
                <Toolbar>
                    <img src={logo} alt="CJP logo" style={{ height: "51px" }} />
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            fontFamily: 'Rubik',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            fontSize: "30px",
                            marginTop: "auto",
                            marginLeft: "10px",
                        }}>
                        Fun Trading
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ ml: 'auto', mr: "120px" }}>
                        <Button color="inherit">Sign Up</Button>
                        <Button color="inherit">Login</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}