import React, { useState, useEffect } from 'react';
import { FullAvatarsList, avatarsList, getAvatarSrc } from '../../FireStoredbFiles/avatarsList';
import { Box, TextField, Dialog, DialogTitle, Button, Avatar, Popover, Stack, MenuItem } from '@mui/material';
import './mainpageDialogStyles.css'
import { createDocument, db, registerUserValidation } from '../../FireStoredbFiles/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import PopUp from '../Basic/PopupMessage/PopupMessage';
import { auth } from "../../FireStoredbFiles/firestore";
import { doc, setDoc } from 'firebase/firestore';

export default function RegistrationDialog({ signUpOpen, handleDialogToggle }) {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aka, setAka] = useState('');
    const [avatar, setAvatar] = useState(avatarsList[0].name);
    const [anchorEl, setAnchorEl] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [shake, setShake] = useState(false);
    const [popUp, setPopUp] = useState({ show: false, message: '', fontColor: '#000', duration: 3000 });

    useEffect(() => {
        let shakeTimeoutId, errorMsgTimeoutId;

        if (errorMsg) {
            setShake(true);
            shakeTimeoutId = setTimeout(() => {
                setShake(false);
            }, 1000);
            errorMsgTimeoutId = setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        }
        return () => {
            clearTimeout(shakeTimeoutId);
            clearTimeout(errorMsgTimeoutId);
        };
    }, [errorMsg]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAvatarClick = (avatarName) => {
        setAvatar(avatarName);
        handleClose();
    };

    const checkEmptyFields = () => {
        let emptyFields = [];
        if (!userEmail) emptyFields.push("UserEmail");
        if (!password) emptyFields.push("Password");
        if (!aka) emptyFields.push("AKA");
        if (!avatar) emptyFields.push("Avatar");
        return emptyFields;
    };

    const clearInputField = () => {
        setUserEmail("");
        setPassword("");
        setAka("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emptyFields = checkEmptyFields();
        if (emptyFields.length > 0) {
            const fieldNames = emptyFields.join(", ");
            showPopUp(`Please fill or Select the required field: ${fieldNames}`, '#fc5012');
            return;
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    aka: aka,
                    adminMsg: "",
                    avatar: avatar,
                    isAdmin: false
                });
                showPopUp('User Created!', '#4CAF50');
                clearInputField();
                handleClose();
            } catch (error) {
                showPopUp(error.message, '#f44336');
                clearInputField();
            }
        }
    };

    const showPopUp = (message, fontColor = '#000', duration = 3000) => {
        setPopUp({ show: true, message, fontColor, duration });
        setTimeout(() => {
            setPopUp({ show: false, message: '', fontColor: '#000', duration: 3000 });
        }, duration);
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
                            {avatarsList.map((obj, i) => (
                                <MenuItem key={i} onClick={() => handleAvatarClick(obj.name)}>
                                    <img style={{ width: '51px' }} src={obj.src} alt={`avatar${i}`} />
                                </MenuItem>
                            ))}
                        </div>
                    </Popover>
                    <Stack sx={{ marginBottom: "21px" }} alignItems="center">
                        <span style={{ marginBottom: "10px" }}>Select Avatar</span>
                        {avatar && <Avatar sx={{ width: 72, height: 72 }} src={getAvatarSrc(avatar, FullAvatarsList)} alt="Selected avatar" aria-describedby={anchorEl ? 'avatar-popover' : undefined} onClick={handleClick} />}
                    </Stack>
                </div>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password (min 6 characters)"
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
                {errorMsg && (
                    <div className="errorMsg fadeInOut">
                        {errorMsg}
                    </div>
                )}
            </Box>
            <PopUp
                message={popUp.message}
                show={popUp.show}
                fontColor={popUp.fontColor}
                duration={popUp.duration}
            />
        </Dialog>
    );
}