"use client";
import { useEffect, useState } from "react";

export const CustomYouTubeEmbed = ({ videoId }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [supportsPassive, setSupportsPassive] = useState(false);

  useEffect(() => {
    // Passive event listener feature detection
    try {
      const opts = Object.defineProperty({}, "passive", {
        get: () => {
          setSupportsPassive(true);
          return true;
        },
      });
      window.addEventListener("test", null, opts);
      window.removeEventListener("test", null, opts);
    } catch (e) {
      setSupportsPassive(false);
    }
  }, []);

  return (
    <div
      className="youtube-embed relative w-full aspect-video"
      onScroll={(e) => {
        if (!supportsPassive) e.preventDefault();
      }}
      style={{ touchAction: "none" }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        onLoad={() => setIframeLoaded(true)}
        style={{
          willChange: "transform",
          contain: "layout",
        }}
      />
      {!iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          Loading video...
        </div>
      )}
    </div>
  );
};
