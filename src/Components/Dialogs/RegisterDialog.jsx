import React, { useState, useEffect } from 'react';
import { avatarsList } from '../../FireStoredbFiles/avatarsList';
import { Box, TextField, Dialog, DialogTitle, Button, Avatar, Popover, Stack, MenuItem } from '@mui/material';
import './mainpageDialogStyles.css'

export default function RegistrationDialog({ signUpOpen, handleDialogToggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [aka, setAka] = useState('');
    const [avatar, setAvatar] = useState(avatarsList[0]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (errorMsg) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 1000);
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        }
    }, [errorMsg]);

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

    const checkEmptyFields = () => {
        let emptyFields = [];
        if (!username) emptyFields.push("Username");
        if (!password) emptyFields.push("Password");
        if (!aka) emptyFields.push("AKA");
        if (!avatar) emptyFields.push("Avatar");
        return emptyFields;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const emptyFields = checkEmptyFields();
        if (emptyFields.length > 0) {
            const fieldNames = emptyFields.join(", ");
            setErrorMsg(`Please fill or Select the required field: ${fieldNames}`);
            return;
        } else {
            console.log({ username, password, aka, avatar });
        }
    };

    return (
        <Dialog onClose={() => handleDialogToggle("signUp", false)} open={signUpOpen} maxWidth="sm" fullWidth={true} className={shake ? 'shake' : ''}>
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
                        {avatar && <Avatar sx={{ width: 72, height: 72 }} src={avatar} alt="Selected avatar" aria-describedby={anchorEl ? 'avatar-popover' : undefined} onClick={handleClick} />}
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
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                </div>
                {errorMsg && (
                    <div className="errorMsg fadeInOut">
                        {errorMsg}
                    </div>
                )}
            </Box>
        </Dialog>
    );
}