import React, { useState, useEffect } from 'react';
import { Box, TextField, Dialog, DialogTitle, Button } from '@mui/material';

export default function LogInDialog({ logInOpen, handleDialogToggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [shake, setShake] = useState(false);

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
        if (!username) emptyFields.push("Username");
        if (!password) emptyFields.push("Password");
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
            console.log({ username, password });
        }
    };

    return (
        <Dialog onClose={() => handleDialogToggle("login", false)} open={logInOpen} maxWidth="sm" fullWidth={true}>
            <Box sx={{ p: 3 }}>
                <DialogTitle textAlign={"center"} sx={{ fontWeight: "bolder", fontSize: "24px" }}>Log In</DialogTitle>
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
        </Dialog>
    );
}