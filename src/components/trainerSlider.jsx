// trainerSlider.jsx
import React, { useRef, useState, useEffect } from 'react';
import slide1 from '../assets/trainer1.png';
import slide2 from '../assets/trainer2.png';
import slide3 from '../assets/trainer3.png';

const slides = [slide1, slide2, slide3];

export default function ImageSlider() {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX || e.touches[0].clientX;
    const diff = x - startX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
      } else {
        setCurrent((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const container = sliderRef.current;
    container.addEventListener('touchstart', handleMouseDown);
    container.addEventListener('touchmove', handleMouseMove);
    container.addEventListener('touchend', handleMouseUp);
    return () => {
      container.removeEventListener('touchstart', handleMouseDown);
      container.removeEventListener('touchmove', handleMouseMove);
      container.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Responsive height: smaller screens get smaller height
  const sliderHeight = windowWidth < 480 ? '200px' : windowWidth < 768 ? '250px' : '350px';

  return (
    <div style={{ padding: '2rem', boxSizing: 'border-box' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0 1rem',
        }}
      >
        {/* Slider */}
        <div
          ref={sliderRef}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: sliderHeight,
            overflow: 'hidden',
            borderRadius: '12px',
            position: 'relative',
            touchAction: 'pan-y',
            userSelect: 'none',
            flexShrink: 0,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Slide ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Line indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
        }}
      >
        {slides.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: current === idx ? '25px' : '15px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: current === idx ? '#FF8B36' : '#C4C4C4',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
