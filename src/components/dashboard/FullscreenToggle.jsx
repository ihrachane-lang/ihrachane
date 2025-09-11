// FullscreenToggle.jsx
"use client"; // if using Next 13 app router; otherwise omit
import React, { useCallback, useEffect, useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

export default function FullscreenToggle() {
  const [isFs, setIsFs] = useState(false);

  const isFullscreen = () =>
    !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

  const requestFullscreen = (el) => {
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
    return Promise.reject(new Error("Fullscreen not supported"));
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
    return Promise.reject(new Error("Exit fullscreen not supported"));
  };

  const toggle = useCallback(async () => {
    try {
      if (!isFullscreen()) {
        await requestFullscreen(document.documentElement);
        setIsFs(true);
      } else {
        await exitFullscreen();
        setIsFs(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFs(isFullscreen());
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    document.addEventListener("mozfullscreenchange", handler);
    document.addEventListener("MSFullscreenChange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
      document.removeEventListener("mozfullscreenchange", handler);
      document.removeEventListener("MSFullscreenChange", handler);
    };
  }, []);

  return (
    <button onClick={toggle} className="">
      {isFs ? <MdFullscreenExit className="text-2xl hover:scale-90" /> : <MdFullscreen className="text-2xl hover:scale-110" />}
    </button>
  );
}
