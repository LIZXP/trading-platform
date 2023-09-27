import { Stack } from '@mui/material';
import React from 'react';

function Body() {
    return (
        <Stack direction="row">
            <Stack sx={{ width: '5%', height: '100%' }} >sidebar</Stack>
            <Stack sx={{ width: '95%' }} spacing={1}>
                <Stack sx={{ height: '50px' }}>body nav button bar</Stack>
                <Stack sx={{}}>main content</Stack>
            </Stack>
        </Stack>
    );
}

export default Body;