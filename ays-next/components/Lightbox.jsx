'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Lightbox({ photos }) {
  const [heroIdx, setHeroIdx]         = useState(0);
  const [prevHeroIdx, setPrevHeroIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [open, setOpen]               = useState(false);
  const [lbIdx, setLbIdx]             = useState(0);
  const [hovering, setHovering]       = useState(false);

  const heroIdxRef   = useRef(0);
  const hoveringRef  = useRef(false);
  const fadeTimerRef = useRef(null);
  const lbTouchX     = useRef(null);
  const heroTouchX   = useRef(null);
  const didSwipe     = useRef(false);
  const loadTokenRef = useRef(0);

  const n = photos.length;

  const startHeroTransition = useCallback((newIdx) => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setPrevHeroIdx(heroIdxRef.current);
    setHeroIdx(newIdx);
    setTransitioning(true);
    heroIdxRef.current = newIdx;
    fadeTimerRef.current = setTimeout(() => {
      setPrevHeroIdx(null);
      setTransitioning(false);
    }, 700);
  }, []);

  const goHero = useCallback((newIdx) => {
    if (newIdx === heroIdxRef.current || !photos[newIdx]) return;
    const token = ++loadTokenRef.current;
    if (typeof window === 'undefined') {
      startHeroTransition(newIdx);
      return;
    }

    let done = false;
    const finish = () => {
      if (done || token !== loadTokenRef.current) return;
      done = true;
      startHeroTransition(newIdx);
    };
    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = photos[newIdx];
    if (img.complete) finish();
  }, [photos, startHeroTransition]);

  // Autoplay — pauses when open or hovering
  useEffect(() => {
    if (n < 2 || open) return;
    const id = setInterval(() => {
      if (!hoveringRef.current) goHero((heroIdxRef.current + 1) % n);
    }, 4000);
    return () => clearInterval(id);
  }, [n, open, goHero]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  // Keyboard + body scroll lock for lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setLbIdx(i => (i + 1) % n);
      if (e.key === 'ArrowLeft')  setLbIdx(i => (i - 1 + n) % n);
      if (e.key === 'Escape')     setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, n]);

  if (!n) return <div className="gal-hero gal-empty" />;

  const showArrows = n > 1 && (hovering || open);

  return (
    <>
      {/* Hero — full-width, 80vh, crossfade autoplay */}
      <div
        className="gal-hero"
        onClick={() => {
          if (didSwipe.current) { didSwipe.current = false; return; }
          setLbIdx(0);
          setOpen(true);
        }}
        onMouseEnter={() => { setHovering(true);  hoveringRef.current = true;  }}
        onMouseLeave={() => { setHovering(false); hoveringRef.current = false; }}
        onTouchStart={(e) => { heroTouchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (heroTouchX.current === null) return;
          const diff = heroTouchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            didSwipe.current = true;
            goHero(diff > 0 ? (heroIdx + 1) % n : (heroIdx - 1 + n) % n);
          }
          heroTouchX.current = null;
        }}
      >
        {/* Bottom layer: previous image stays visible while new one fades in */}
        {prevHeroIdx !== null && (
          <img src={photos[prevHeroIdx]} width="1600" height="1000" decoding="async" alt="" className="gal-hero-img" style={{ zIndex: 1 }} />
        )}
        {/* Top layer: current image — animated only during transitions */}
        <img
          key={heroIdx}
          src={photos[heroIdx]}
          width="1600"
          height="1000"
          decoding="async"
          alt=""
          className={`gal-hero-img${transitioning ? ' gal-hero-img-in' : ''}`}
          style={{ zIndex: 2 }}
        />
        {n > 1 && (
          <div className="gal-ctr" style={{ zIndex: 4 }}>
            <i className="fas fa-images" /> {heroIdx + 1} / {n} · Click para galería
          </div>
        )}
      </div>

      {/* Fixed arrows — appear on hover or when lightbox is open */}
      {showArrows && (
        <>
          <button
            className="gal-arr-fx gal-arr-fx-l"
            onClick={(e) => {
              e.stopPropagation();
              if (open) setLbIdx(i => (i - 1 + n) % n);
              else goHero((heroIdx - 1 + n) % n);
            }}
            aria-label="Anterior"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            className="gal-arr-fx gal-arr-fx-r"
            onClick={(e) => {
              e.stopPropagation();
              if (open) setLbIdx(i => (i + 1) % n);
              else goHero((heroIdx + 1) % n);
            }}
            aria-label="Siguiente"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </>
      )}

      {/* Lightbox overlay */}
      {open && (
        <div className="lb-overlay" onClick={() => setOpen(false)}>
          <div className="lb-topbar" onClick={(e) => e.stopPropagation()}>
            <span className="lb-counter-top">{lbIdx + 1} / {n}</span>
            <button className="lb-cl" onClick={() => setOpen(false)}>
              <i className="fas fa-xmark" />
            </button>
          </div>

          <div
            className="lb-main"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { lbTouchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (lbTouchX.current === null) return;
              const diff = lbTouchX.current - e.changedTouches[0].clientX;
              if (diff > 50)       setLbIdx(i => (i + 1) % n);
              else if (diff < -50) setLbIdx(i => (i - 1 + n) % n);
              lbTouchX.current = null;
            }}
          >
            <img className="lb-img" src={photos[lbIdx]} width="1600" height="1000" decoding="async" alt="" />
          </div>

          <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {photos.map((url, i) => (
              <div
                key={i}
                className={`lb-th${i === lbIdx ? ' active' : ''}`}
                onClick={() => setLbIdx(i)}
              >
                <img src={url} width="160" height="110" loading="lazy" decoding="async" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
