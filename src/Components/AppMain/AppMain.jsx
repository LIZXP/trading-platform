import { Grid, Stack } from '@mui/material';
import React from 'react';

const AppMain = () => {
    return (
        <Grid container className="main-content-container">
            <Grid item xs={12} sx={{ border: "1px solid red", minHeight: "10vh" }}>
                <Stack></Stack>
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