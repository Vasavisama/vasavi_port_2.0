'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import CinematicLayer from './CinematicLayer';
import styles from './VideoIntro.module.css';

export default function VideoIntro() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const playCountRef = useRef(0);

  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);

  useEffect(() => {
    const startPlayback = async () => {
      if (!videoRef.current || !bgVideoRef.current) return;

      videoRef.current.muted = false;
      bgVideoRef.current.muted = true;

      try {
        await Promise.all([videoRef.current.play(), bgVideoRef.current.play()]);
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    startPlayback();

    // GSAP entrance timeline
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power2.out' })
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        nameRef.current?.querySelectorAll('.name-line') ?? [],
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' },
        '-=0.6'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        controlsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !muted;
    videoRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current || !bgVideoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      bgVideoRef.current.pause();
    } else {
      if (videoRef.current.ended || playCountRef.current >= 2) {
        playCountRef.current = 0;
        videoRef.current.currentTime = 0;
        bgVideoRef.current.currentTime = 0;
      }
      videoRef.current.play();
      bgVideoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleVideoEnded = () => {
    if (!videoRef.current || !bgVideoRef.current) return;

    playCountRef.current += 1;

    if (playCountRef.current < 2) {
      videoRef.current.currentTime = 0;
      bgVideoRef.current.currentTime = 0;
      videoRef.current.play();
      bgVideoRef.current.play();
      return;
    }

    bgVideoRef.current.pause();
    setPlaying(false);
  };

  const scrollToNext = () => {
    const next = document.getElementById('about');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Ambient blurred BG video */}
      <div className={styles.bgVideoWrap}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/hero-video.mp4"
          autoPlay
          muted
          playsInline
        />
        <div className={styles.bgBlur} />
      </div>

      {/* Gradient overlays */}
      <div className={styles.gradientLeft} />
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />
      <div className={styles.vignetteOverlay} />

      {/* Main foreground video */}
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.mainVideo}
          src="/hero-video.mp4"
          autoPlay
          muted={false}
          playsInline
          onEnded={handleVideoEnded}
        />
        <div className={styles.videoGlow} />
      </div>

      {/* Three.js cinematic particles */}
      <CinematicLayer />

      {/* Text content */}
      <div className={styles.content}>
        <div className={styles.tagline} ref={taglineRef}>
          Full Stack Developer · BITS Pilani · 2024–2027
        </div>

        <div className={styles.nameBlock} ref={nameRef}>
          <div className={`${styles.nameLine} name-line`}>Sama</div>
          <div className={`${styles.nameLine} ${styles.nameLineAccent} name-line`}>Vasavi</div>
        </div>

        <div className={styles.subtitle} ref={subtitleRef}>
          <span className={styles.subtitleInner}>
            Crafting immersive digital experiences with{' '}
            <em>React · Node.js · MERN Stack · Laravel</em>
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls} ref={controlsRef}>
        <button
          className={styles.glassBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>

        <button
          className={styles.glassBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
              <path d="M15.54,8.46a5,5,0,0,1,0,7.07" />
              <path d="M19.07,4.93a10,10,0,0,1,0,14.14" />
            </svg>
          )}
          <span>{muted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>

      {/* Sound hint badge */}
      {showSoundHint && (
        <div className={styles.soundHint}>
          <span className={styles.soundDot} />
          Tap for sound
        </div>
      )}

      {/* Scroll indicator */}
      <div
        className={styles.scrollIndicator}
        ref={scrollIndicatorRef}
        onClick={scrollToNext}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </div>
    </section>
  );
}
