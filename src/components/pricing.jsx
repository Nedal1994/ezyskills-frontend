// pricing.jsx
import React, { useRef, useState, useEffect } from "react";

const pricingPlans = [
  {
    title: "College Program",
    price: "₹ 20,000 + Tax",
    info:"(Exclusive of GST &Taxes)",
    features: ["For Colleges, Universities & Group Of Students", "Common Timings"],
  },
  {
    title: "Employee Program",
    price: "₹ 50,000 + Tax",
    info:"(Exclusive of GST &Taxes)",
    features: ["1-1 Individuals", "Choose Timings"],
  },
  {
    title: "Complete Transformation Program",
    price: "₹ 75,000 + Tax",
    info:"(Exclusive of GST &Taxes)",
    features: ["1-1 Individuals", "Flexible Timings"],
  },
];

export default function Pricing() {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        setCurrent((prev) => (prev < pricingPlans.length - 1 ? prev + 1 : prev));
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const container = sliderRef.current;
    container.addEventListener("touchstart", handleMouseDown);
    container.addEventListener("touchmove", handleMouseMove);
    container.addEventListener("touchend", handleMouseUp);
    return () => {
      container.removeEventListener("touchstart", handleMouseDown);
      container.removeEventListener("touchmove", handleMouseMove);
      container.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const sliderHeight = windowWidth < 480 ? "400px" : windowWidth < 768 ? "480px" : "540px";
  const topHalfHeight = windowWidth < 480 ? "38%" : windowWidth < 768 ? "36%" : "34%";

  return (
    <div style={{ padding: "3rem 1rem", boxSizing: "border-box", backgroundColor: '#f3f4f6', fontFamily:"'Inter', sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "700", marginBottom: "3rem", color: 'rgba(0, 63, 125, 1)' }}>Our Pricing</h1>

      <div
        ref={sliderRef}
        style={{
          width: "90%",
          maxWidth: "520px",
          height: sliderHeight,
          overflow: "hidden",
          borderRadius: "20px",
          position: "relative",
          touchAction: "pan-y",
          userSelect: "none",
          margin: "0 auto",
          backgroundColor: '#fff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease",
            transform: `translateX(-${current * 100}%)`,
            height: "100%",
          }}
        >
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                minWidth: "100%",
                height: "100%",
                padding: "0",
                boxSizing: "border-box",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Top Half - Orange */}
              <div style={{ height: topHalfHeight, backgroundColor: '#FF8B36', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '10px', backgroundColor: '#fff', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <span style={{ color: '#FF8B36', fontWeight: '700', fontSize: '0.95rem' }}>{plan.title}</span>
                </div>
                <p style={{ fontSize: "2rem", fontWeight: "800", marginTop: '2rem' }}>{plan.price}</p>
                <p style={{ fontSize: "1rem", fontWeight: "400", marginTop: '0.5rem' }}>{plan.info}</p>
              </div>

              {/* Bottom Half - White */}
              <div style={{ flex: 1, backgroundColor: '#fff', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem", width: '100%' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: "0.75rem", color: '#4b5563', fontWeight: '500', display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                      <span style={{ marginRight: '0.5rem', color: '#FF8B36', fontSize: '1rem' }}>✔</span>{feature}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    width: '220px',
                    height: '60px',
                    borderRadius: '10px',
                    border: '2px solid #FF8B36',
                    backgroundColor: '#fff',
                    color: '#FF8B36',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 18px rgba(255,139,54,0.25)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 22px rgba(255,139,54,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(255,139,54,0.25)';
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "2rem",
        }}
      >
        {pricingPlans.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: current === idx ? "32px" : "18px",
              height: "5px",
              borderRadius: "2.5px",
              backgroundColor: current === idx ? "#FF8B36" : "#d1d5db",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}