"use client";

import { useEffect, useRef, useState } from "react";

/*
 * The loom film behind the home hero.
 *
 * Built to work on every device rather than to be skipped on most of them:
 * - The poster is plain HTML (<picture>), so the hero is complete before any
 *   JavaScript runs, and stays complete if the film never plays.
 * - The film is a short, silent loop at the footage's full 1080p, in the
 *   most efficient format each browser can play: AV1 (Chrome, Edge, Firefox,
 *   newer Apple devices), then HEVC (other Apple devices), then H.264, which
 *   everything plays. Phones held upright get a native portrait crop.
 * - Nothing downloads until we know the film is wanted: reduced-motion and
 *   data-saver visitors keep the still frame and can start the film themselves.
 * - Autoplay can still be refused (iOS Low Power Mode, some in-app browsers);
 *   the still frame stays and the button offers Play.
 * - It pauses while scrolled out of view, and can always be paused (WCAG 2.2.2).
 */

const PORTRAIT = "(max-width: 767px) and (orientation: portrait)";
const CODECS = [
  { ext: "av1", type: 'video/mp4; codecs="av01.0.08M.08"' },
  { ext: "hevc", type: 'video/mp4; codecs="hvc1.1.6.L120.90"' },
  { ext: "h264", type: 'video/mp4; codecs="avc1.640029"' },
] as const;

function filmSource(video: HTMLVideoElement) {
  const cut = window.matchMedia(PORTRAIT).matches ? "portrait" : "1080p";
  const codec = CODECS.find((c) => video.canPlayType(c.type) === "probably") ?? CODECS[2];
  return `/assets/hero/looms-${cut}.${codec.ext}.mp4`;
}

type FilmState = "idle" | "playing" | "paused";

type NetworkInformation = { saveData?: boolean };

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false); // JS has run: show the control
  const [state, setState] = useState<FilmState>("idle");
  const [visible, setVisible] = useState(false); // first frame painted
  const userPaused = useRef(false);

  const load = () => {
    const video = videoRef.current;
    if (!video || video.getAttribute("src")) return video;
    video.src = filmSource(video);
    return video;
  };

  const play = async () => {
    const video = load();
    if (!video) return;
    video.muted = true; // must be set as a property for autoplay to be allowed
    try {
      await video.play();
    } catch {
      // Autoplay refused. Keep the still frame; the button offers Play.
      setState("paused");
    }
  };

  useEffect(() => {
    setReady(true);
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData;
    if (reduceMotion || saveData) {
      userPaused.current = true;
      setState("paused");
    } else {
      void play();
    }

    // Pause while the hero is off screen; resume when it returns, unless the
    // visitor paused it themselves.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || userPaused.current || !video.getAttribute("src")) return;
        if (entry.isIntersecting) void play();
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (state === "playing") {
      userPaused.current = true;
      video.pause();
    } else {
      userPaused.current = false;
      void play();
    }
  };

  const playing = state === "playing";

  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        <picture>
          <source media={PORTRAIT} type="image/avif" srcSet="/assets/hero/looms-poster-portrait.avif" />
          <source media={PORTRAIT} srcSet="/assets/hero/looms-poster-portrait.jpg" />
          <source type="image/avif" srcSet="/assets/hero/looms-poster-1080p.avif" />
          {/* Plain <img>: next/image cannot switch crops by orientation. */}
          <img
            src="/assets/hero/looms-poster-1080p.jpg"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          onPlaying={() => {
            setVisible(true);
            setState("playing");
          }}
          onPause={() => setState("paused")}
        />
      </div>

      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause the factory film" : "Play the factory film"}
          className="mono absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-3 z-30 flex min-h-11 min-w-11 items-center gap-2 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:right-7"
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <rect x="1.5" y="1" width="2.4" height="8" fill="currentColor" />
              <rect x="6.1" y="1" width="2.4" height="8" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path d="M2 1 9 5 2 9Z" fill="currentColor" />
            </svg>
          )}
          <span>{playing ? "Pause" : "Play film"}</span>
        </button>
      )}
    </>
  );
}
