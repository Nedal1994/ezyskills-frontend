import React, { useState } from 'react';

// Modal component
function EnrollModal({ message, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '27px',
          width: "707px",
          height: "440px",
          padding: '30px 40px',
          textAlign: 'center',
        }}
      >
        <br /><br /><br />
        <img
          src="src/assets/ok.png"
          style={{
            width: '157px',
            height: '134px',
            top: '56px',
            left: '275px',
            angle: '0 deg',
            opacity: 1
          }}
        />
        <h2 style={{ fontSize: "31px", fontFamily: "calibri" }}>Thanks for your interest</h2>
        <p style={{ fontSize: '22px', fontFamily: "calibri" }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            width: '121px',
            height: '39px',
            fontSize: "20px",
            background: "rgba(255, 136, 0, 1)",
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [showModal, setShowModal] = useState(true); // modal shows immediately

  return (
    <div>
      {showModal && (
        <EnrollModal
          message="We will get back to you soon."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
