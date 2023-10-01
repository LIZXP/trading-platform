import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { avatarsList } from '../../FireStoredbFiles/avatarsList';
import { Avatar, Box, Popover, Stack } from '@mui/material';

export default function RegistrationDialog({ signUpOpen, handleDialogToggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [aka, setAka] = useState('');
    const [avatar, setAvatar] = useState(avatarsList[0]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAvatarClick = (avatarUrl) => {
        setAvatar(avatarUrl);
        handleClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ username, password, aka, avatar });
    };

    return (
        <Dialog onClose={() => handleDialogToggle("signUp", false)} open={signUpOpen} maxWidth="sm" fullWidth={true}>
            <Box sx={{ p: 3 }}>
                <DialogTitle textAlign={"center"} sx={{ fontWeight: "bolder", fontSize: "24px" }}>Register</DialogTitle>
                <div>
                    <Popover
                        id="avatar-popover"
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {avatarsList.map((imgUrl, i) => (
                                <MenuItem key={i} onClick={() => handleAvatarClick(imgUrl)}>
                                    <img style={{ width: '51px' }} src={imgUrl} alt={`avatar${i}`} />
                                </MenuItem>
                            ))}
                        </div>
                    </Popover>
                    <Stack sx={{ marginBottom: "21px" }} alignItems="center">
                        <span style={{ marginBottom: "10px" }}>Select Avatar</span>
                        <Avatar sx={{ width: 72, height: 72 }} src={avatar} alt="Selected avatar" aria-describedby={anchorEl ? 'avatar-popover' : undefined} onClick={handleClick} />
                    </Stack>
                </div>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="AKA"
                    variant="outlined"
                    fullWidth
                    value={aka}
                    onChange={(e) => setAka(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <div style={{ width: '100%', textAlign: "end", margin: "0 auto 10px 0" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Register
                    </Button>
                </div>
            </Box>
        </Dialog>
    );
}