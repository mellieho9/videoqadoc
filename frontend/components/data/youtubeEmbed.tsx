"use client";
import { AnnotationContext } from "@/contexts/annotation";
import { useContext, useEffect } from "react";

const YouTubeEmbed = ({ videoId = "M7lc1UVf-VE" }) => {
  const { setSegmentWatched } = useContext(AnnotationContext);

  useEffect(() => {
    // Dynamically load YouTube IFrame API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let videoInteractions = [];

    window.onYouTubeIframeAPIReady = () => {
      new YT.Player("player", {
        height: "360",
        width: "100%",
        videoId: videoId,
        playerVars: { playsinline: 1 },
        events: {
          onReady: (event) => {
            event.target.playVideo();

            // Start collecting player info every second
            const intervalId = setInterval(() => {
              const player = event.target;
              const playerData = {
                currentTime: player.getCurrentTime(),
                duration: player.getDuration(),
                state: player.getPlayerState(),
                playbackQuality: player.getPlaybackQuality(),
                playbackRate: player.getPlaybackRate(),
                volume: player.getVolume(),
                timestamp: new Date().getTime(),
              };

              videoInteractions.push(playerData);

              // Update global state
              setSegmentWatched([...videoInteractions]);
            }, 1000);

            // Cleanup interval when unmounting
            event.target.intervalId = intervalId;
          },
        },
      });
    };

    // Cleanup on unmount
    return () => {
      if (window.YT && window.YT.Player) {
        const player = document.getElementById("player");
        if (player) {
          clearInterval(player.intervalId); // Clear interval
          player.remove();
        }
      }
    };
  }, [videoId, setSegmentWatched]);

  return <div id="player"></div>;
};

export default YouTubeEmbed;
