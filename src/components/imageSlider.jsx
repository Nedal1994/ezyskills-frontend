// ImageSlider.jsx
import React, { useRef, useState, useEffect } from 'react';
import slide1 from '../assets/slides/slide1.png';
import slide2 from '../assets/slides/slide2.png';
import slide3 from '../assets/slides/slide3.png';
import slide4 from '../assets/slides/slide4.png';

const slides = [slide1, slide2, slide3, slide4];

export default function ImageSlider() {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

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

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '40px',
          paddingLeft: '20px',
          flexWrap: 'wrap', // makes heading and slider wrap on smaller screens
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 60px)', // slightly smaller and responsive
            color: '#003F7D',
            margin: 0,
            lineHeight: 1.2,
            fontFamily: 'calibri',
            flex: '1 1 300px', // allows heading to shrink on small screens
          }}
        >
          World’s<br />
          First AI Based<br />
          Online Learning<br />
          Platform
        </h1>

        {/* Slider */}
        <div
          ref={sliderRef}
          style={{
            width: '100%',
            maxWidth: '500px', // slightly smaller
            height: 'clamp(200px, 25vw, 250px)', // responsive height
            overflow: 'hidden',
            borderRadius: '12px',
            position: 'relative',
            touchAction: 'pan-y',
            userSelect: 'none',
            flex: '1 1 300px', // allows slider to shrink
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
          gap: '10px',
          marginTop: '16px',
          flexWrap: 'wrap',
        }}
      >
        {slides.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: current === idx ? '30px' : '20px',
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
