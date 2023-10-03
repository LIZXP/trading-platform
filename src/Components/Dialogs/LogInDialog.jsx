import React, { useState, useEffect } from 'react';
import { Box, TextField, Dialog, DialogTitle, Button } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FireStoredbFiles/firestore';
import PopUp from '../Basic/PopupMessage/PopupMessage';

export default function LogInDialog({ logInOpen, handleDialogToggle }) {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const checkEmptyFields = () => {
        let emptyFields = [];
        if (!userEmail) emptyFields.push("userEmail");
        if (!password) emptyFields.push("Password");
        return emptyFields;
    };

    const clearInputField = () => {
        setUserEmail("");
        setPassword("");
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
                await signInWithEmailAndPassword(auth, userEmail, password);
                clearInputField();
                handleDialogToggle("login", false);
                showPopUp('User Created!', '#4CAF50');
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
        <Dialog onClose={() => handleDialogToggle("login", false)} open={logInOpen} maxWidth="sm" fullWidth={true} className={shake ? 'shake' : ''}>
            <Box sx={{ p: 3 }}>
                <DialogTitle textAlign={"center"} sx={{ fontWeight: "bolder", fontSize: "24px" }}>Log In</DialogTitle>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
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
                <div style={{ width: '100%', textAlign: "end", margin: "0 auto 10px 0" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleSubmit(e)}
                    >
                        LogIn
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