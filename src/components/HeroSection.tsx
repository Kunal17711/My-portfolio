"use client";

import {
  ArrowRight,
  Music2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  X,
} from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

function formatTime(value: number) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const didSetupAutoplayRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.72);
  const [audioReady, setAudioReady] = useState(true);
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const volumePercent = volume * 100;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !audioReady || didSetupAutoplayRef.current) {
      return;
    }

    didSetupAutoplayRef.current = true;

    const startAudio = async () => {
      try {
        audio.volume = volume;
        await audio.play();
        setIsPlaying(true);
        window.removeEventListener("pointerdown", startAudio);
        window.removeEventListener("keydown", startAudio);
      } catch {
        setIsPlaying(false);
      }
    };

    startAudio();
    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, [audioReady, volume]);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio || !audioReady) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const skipAudio = (seconds: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      audio.duration || 0,
    );
  };

  const closeMusicCard = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
    }

    setIsPlaying(false);
    setIsMusicOpen(false);
  };

  return (
    <section id="home" className="hero-2000 relative min-h-[100svh] overflow-hidden bg-black text-white">
      <audio
        ref={audioRef}
        src="/audio/music.mp3"
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => {
          setAudioReady(false);
          setIsPlaying(false);
        }}
      />

      <div className="hero-2000-bg" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <img
        src="/assets/star.webp"
        alt=""
        aria-hidden="true"
        className="hero-star hero-star-one"
      />
      <img
        src="/assets/star.webp"
        alt=""
        aria-hidden="true"
        className="hero-star hero-star-two"
      />
      <img
        src="/assets/star.webp"
        alt=""
        aria-hidden="true"
        className="hero-star hero-star-three"
      />

      <div className="hero-side-rail" aria-hidden="true">
        <span className="hero-rail-dot" />
        <span className="hero-rail-dot is-small" />
        <span className="hero-rail-text">WEB CREATOR</span>
        <span className="hero-rail-line" />
        <span className="hero-rail-text">DEVELOPER</span>
        <span className="hero-rail-dot is-blue" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-8 pt-32 sm:px-8 md:px-12 lg:px-20 lg:pt-28">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
          <div className="hero-copy max-w-3xl">
            <p className="hero-kicker">welcome to my space_</p>
            <h1 className="hero-chrome-title mt-5">
              <span style={{ "--delay": "120ms" } as CSSProperties}>
                I DON&apos;T JUST
              </span>
              <span style={{ "--delay": "260ms" } as CSSProperties}>
                BUILD
              </span>
              <span style={{ "--delay": "400ms" } as CSSProperties}>
                WEBSITES.
              </span>
            </h1>
            <p className="hero-subcopy mt-7 max-w-md text-xl leading-snug text-white/82 md:text-2xl">
              I build the first impression{" "}
              <span className="text-[#8ec5ff]">your brand</span> deserves.
            </p>
            <div className="hero-cta-row mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/projects" className="hero-primary-btn">
                <span>View my work</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/about" className="hero-secondary-btn">
                <span>About me</span>
                <span aria-hidden="true" className="hero-blue-square" />
              </Link>
            </div>
          </div>

          <div className="pointer-events-none hidden min-h-[520px] lg:block" aria-hidden="true" />
        </div>

        <div className="hero-status-bar mt-10">
          <span className="hero-blue-square" aria-hidden="true" />
          <span>// system update</span>
          <span className="hidden h-5 w-px bg-white/22 sm:block" aria-hidden="true" />
          <span>I&apos;m currently available for new projects worldwide.</span>
          <span className="ml-auto hidden text-white/55 md:inline">scroll to explore +</span>
        </div>
      </div>

      {isMusicOpen ? (
        <div className="hero-music-card">
          <div className="hero-music-titlebar">
            <span>// now playing</span>
            <button type="button" aria-label="Close music card" onClick={closeMusicCard}>
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="hero-music-body px-4 pb-4 pt-3">
            <p className="hero-track-title text-lg leading-snug text-white/86">
              late nights,
              <br />
              early builds
              <br />
              <span className="text-[#8ec5ff]">24/7</span>
            </p>

            <div className={`hero-eq mt-4 ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
              {Array.from({ length: 14 }).map((_, index) => (
                <span key={index} style={{ "--i": index } as CSSProperties} />
              ))}
            </div>

            <label className="sr-only" htmlFor="hero-audio-progress">
              Music progress
            </label>
            <input
              id="hero-audio-progress"
              className="hero-progress mt-4"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              style={{ "--progress": `${progressPercent}%` } as CSSProperties}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = nextTime;
                }
                setCurrentTime(nextTime);
              }}
              disabled={!audioReady}
            />
            <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.16em] text-white/48">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="hero-control-row mt-4 flex items-center justify-between gap-2">
              <button type="button" className="hero-audio-btn" aria-label="Rewind 10 seconds" onClick={() => skipAudio(-10)}>
                <RotateCcw size={15} aria-hidden="true" />
              </button>
              <button type="button" className="hero-audio-main" aria-label={isPlaying ? "Pause music" : "Play music"} onClick={toggleAudio} disabled={!audioReady}>
                {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
              </button>
              <button type="button" className="hero-audio-btn" aria-label="Forward 10 seconds" onClick={() => skipAudio(10)}>
                <RotateCw size={15} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Volume2 size={14} className="text-white/58" aria-hidden="true" />
              <label className="sr-only" htmlFor="hero-audio-volume">
                Music volume
              </label>
              <input
                id="hero-audio-volume"
                className="hero-volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                style={{ "--volume": `${volumePercent}%` } as CSSProperties}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="hero-music-reopen"
          aria-label="Open music card"
          onClick={() => setIsMusicOpen(true)}
        >
          <Music2 size={17} aria-hidden="true" />
        </button>
      )}

    </section>
  );
}
