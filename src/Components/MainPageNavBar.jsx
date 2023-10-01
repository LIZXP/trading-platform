import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Stack } from '@mui/material';
import logo from '../assets/logo.svg';
import './styles/mainPageStyle.css';
import RegisterDialog from './Dialogs/RegisterDialog'

export default function ButtonAppBar() {
    const [signUpOpen, setsignUpOpen] = useState(false);
    const [logInOpen, setlogInOpen] = useState(false);

    const handleDialogToggle = (dialog, isOpen) => {
        if (dialog === 'signUp') {
            setsignUpOpen(isOpen);
        } else if (dialog === 'login') {
            setlogInOpen(isOpen);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, zIndex: "10" }} position="sticky" >
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
                        <Button color="inherit" onClick={() => handleDialogToggle('signUp', true)}>Sign Up</Button>
                        <Button color="inherit">Login</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            {signUpOpen ? <RegisterDialog signUpOpen={signUpOpen} handleDialogToggle={handleDialogToggle} /> : null}
        </Box>
    );
}