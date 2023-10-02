import React, { useState, useRef } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import MainPageNavBar from "./Components/MainPageNavBar";
import pokemonVideo from './assets/pokemonVideo.mp4';

function MainPage() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleSoundToggle = () => {
    const video = videoRef.current;
    if (video) {
      setIsMuted(!isMuted);
      video.muted = !isMuted;
    }
  };

  return (
    <Box>
      <Stack>
        <MainPageNavBar />
      </Stack>
      <Stack sx={{ position: 'relative', height: 'calc(100vh - 64px)' }}>
        <video
          ref={videoRef}
          src={pokemonVideo}
          loop
          autoPlay
          muted={isMuted}
          style={{ marginTop: "64px", height: "100%", width: "100%", objectFit: 'cover' }}
        />
        <IconButton
          color="primary"
          aria-label="Toggle sound"
          component="span"
          onClick={handleSoundToggle}
          sx={{ position: 'absolute', bottom: 30, left: 30 }}
        >
          {isMuted ? <VolumeOff style={{ fontSize: 80, fill: 'red' }} /> : <VolumeUp style={{ fontSize: 80, fill: 'red' }} />}
        </IconButton>
      </Stack >
    </Box>
  );
}

export default MainPage;
