'use client';
import { useState, useEffect, useRef } from 'react';

export default function Lightbox({ photos }) {
  const [open, setOpen]   = useState(false);
  const [idx, setIdx]     = useState(0);
  const heroTouchX        = useRef(null);
  const lbTouchX          = useRef(null);
  const didSwipeHero      = useRef(false);

  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'Escape')     setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, photos.length]);

  const heroImg = photos[idx] || '';

  return (
    <>
      {/* Hero with nav arrows + swipe */}
      <div
        className="gal-hero"
        onClick={() => { if (didSwipeHero.current) { didSwipeHero.current = false; return; } setOpen(true); }}
        onTouchStart={(e) => { heroTouchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (heroTouchX.current === null) return;
          const diff = heroTouchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            didSwipeHero.current = true;
            diff > 0 ? next() : prev();
          }
          heroTouchX.current = null;
        }}
      >
        {heroImg
          ? <img src={heroImg} alt="" />
          : <div style={{ height: 480, background: '#e2e8f0' }} />
        }
        {photos.length > 1 && (
          <>
            <div className="gal-ctr">
              <i className="fas fa-images" /> {idx + 1} / {photos.length} · Click para galería
            </div>
            <button
              className="gal-arr gal-arr-l"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              className="gal-arr gal-arr-r"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Siguiente"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="thumbs-row" style={{ padding: '12px 3rem 0' }}>
          {photos.map((url, i) => (
            <img
              key={i}
              className={`thumb${i === idx ? ' active' : ''}`}
              src={url}
              loading="lazy"
              alt=""
              onClick={() => { setIdx(i); setOpen(true); }}
            />
          ))}
        </div>
      )}

      {/* Lightbox overlay */}
      {open && (
        <div className="lb-overlay" onClick={() => setOpen(false)}>
          <div className="lb-topbar" onClick={(e) => e.stopPropagation()}>
            <span className="lb-counter-top">{idx + 1} / {photos.length}</span>
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
              if (diff > 50)       next();
              else if (diff < -50) prev();
              lbTouchX.current = null;
            }}
          >
            <button className="lb-arr" onClick={prev} aria-label="Anterior">
              <i className="fas fa-chevron-left" />
            </button>
            <img className="lb-img" src={photos[idx]} alt="" />
            <button className="lb-arr" onClick={next} aria-label="Siguiente">
              <i className="fas fa-chevron-right" />
            </button>
          </div>

          <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {photos.map((url, i) => (
              <div
                key={i}
                className={`lb-th${i === idx ? ' active' : ''}`}
                onClick={() => setIdx(i)}
              >
                <img src={url} loading="lazy" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
