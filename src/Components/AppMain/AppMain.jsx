import { Avatar, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { FullAvatarsList, getAvatarSrc } from '../../FireStoredbFiles/avatarsList';
import logo from '../../assets/logo.svg';
import './Styles/AppMain.css'

const AppMain = () => {
    return (
        <Grid container className="main-content-container">
            <Grid item xs={12} sx={{ border: "1px solid red", minHeight: "10vh" }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} className="neon" ml={"10px"} alignItems={"center"}>
                        <img src={logo} alt="CJP logo" style={{ height: "60px", marginBottom: "10px", marginRight: "5px" }} />
                        <p className="advanced-neon-text">Fun Trading</p>
                    </Stack>
                    <Stack>
                        <Avatar alt="Remy Sharp" src={getAvatarSrc('ethan', FullAvatarsList)} sx={{ margin: "15px 20px 2px", width: 36, height: 36, border: "3px solid green", padding: "5px" }} />
                        <Typography variant='span' textAlign={"center"}>Ethan</Typography >
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12} sx={{ border: "3px solid green", minHeight: "90vh", overflow: "auto" }}>
                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={1} sx={{ border: "3px solid blue" }}> </Grid>
                    <Grid item xs={11} sx={{ border: "3px solid yellow" }}>
                        <Grid container sx={{ height: '100%' }}>
                            <Grid item xs={12} sx={{ border: "1px solid red", height: '8%' }}></Grid>
                            <Grid item xs={12} gap={1} sx={{ border: "1px solid red", height: '8%' }}></Grid>
                            <Grid item xs={12} gap={1} sx={{ border: "1px solid red", height: '84%' }}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AppMain;