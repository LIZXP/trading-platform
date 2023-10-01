import { Box, Stack, IconButton } from "@mui/material";
import React, { useState, useRef } from "react";
import MainPageNavBar from "./Components/MainPageNavBar";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
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
      <Stack>
        <video
          ref={videoRef}
          src={pokemonVideo}
          loop
          autoPlay
          muted={isMuted}
          style={{ height: '800px', width: 'auto', marginTop: "64px" }}  // Adjust the height as necessary
        />
        <IconButton
          color="primary"
          aria-label="Toggle sound"
          component="span"
          onClick={handleSoundToggle}
          sx={{ position: 'absolute', bottom: 120, left: 120 }}
        >
          {isMuted ? <VolumeOff style={{ fontSize: 80, fill: 'red' }} /> : <VolumeUp style={{ fontSize: 80, fill: 'red' }} />}
        </IconButton>
      </Stack>
    </Box>
  );
}

export default MainPage;
