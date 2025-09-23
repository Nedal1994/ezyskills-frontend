// Courses.jsx
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EnrollModal from './enrollModal';

export default function Courses() {
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
        const coursesWithImg = data.map(course => ({
          ...course,
          img: `/assets/${course.title.toLowerCase().replace(/\s/g, '-')}.png`
        }));
        setCourses(coursesWithImg);
      })
      .catch(err => console.error(err));
  }, []);

  const coursesPerPage = 20;
  const initialCoursesCount = 8;
  const displayedCourses = !expanded
    ? courses.slice(0, initialCoursesCount)
    : courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handleEnroll = async (course) => {
    const token = localStorage.getItem('token');
    if (!token) { alert('You need to be logged in as a student to enroll'); return; }
    try {
      const res = await fetch('http://localhost:5000/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ courseId: course.courseId, courseName: course.title, info: course.description })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.msg || 'Enrollment failed'); return; }
      setEnrolledCourses(prev => [...prev, course.courseId]);
      setModalMessage("Thanks for your interest\nWe will get back to you soon");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    } catch (err) { console.error(err); alert('Failed to enroll'); }
  };

  return (
<div style={{
  width: '100%',
  maxWidth: '1100px',
  margin: '2rem auto',
  background: '#003F7D',
  borderRadius: '25px',
  padding: '1.5rem',
  boxSizing: 'border-box',
  color: 'white',
  fontFamily:"calibri"
}}>
  <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'white', marginBottom: '1.5rem' }}>Courses</h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem'
  }}>
    {displayedCourses.map((course, idx) => (
      <div key={idx} style={{
        background: 'white',
        color: '#003F7D',
        borderRadius: '20px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '250px',
        boxSizing: 'border-box'
      }}>
        <img
          src={`/assets/${course.title.toLowerCase().replace(/\s/g, '-')}.png`}
          alt={course.title}
          style={{ width: '100px', height: '100px', marginBottom: '0.8rem', userSelect: 'none' }}
          draggable={false}
        />
        <h3 style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '0.5rem' }}>{course.title}</h3>
        <p style={{ fontSize: '0.85rem', textAlign: 'center', flexGrow: 1 }}>{course.description}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', width: '100%' }}>
          <button style={{
            flex: 1,
            padding: '0.4rem',
            cursor: 'pointer',
            background: 'rgba(253, 253, 253, 1)',
            borderRadius: '6px',
            border: '1px solid #F98149',
            fontSize: '0.8rem'
          }}>Live Demo</button>
          <button onClick={() => handleEnroll(course)} style={{
       flex: 1,
            padding: '0.4rem',
            cursor: 'pointer',
            background: 'rgba(253, 253, 253, 1)',
            borderRadius: '6px',
            border: '1px solid #F98149',
            fontSize: '0.8rem'
          }}>Enroll now</button>
        </div>

        <button style={{
          marginTop: '0.5rem',
          width: '140px',
          height: '30px',
          borderRadius: '20px',
          color: '#FFFFFF',
          background: '#F98149',
          fontSize: '0.75rem',
          border: 'none'
        }}>
          Download curriculum
        </button>
      </div>
    ))}
  </div>

  {/* Show More / Pagination */}
  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
    <button onClick={() => { setExpanded(!expanded); setCurrentPage(1); }} style={{
      backgroundColor: 'white',
      color: '#003F7D',
      borderRadius: '25px',
      padding: '0.6rem 1.2rem',
      fontSize: '0.9rem',
      cursor: 'pointer',
      border: 'none',
      minWidth: '130px'
    }}>
      {expanded ? 'Show Less' : 'View All Courses'}
    </button>

    {expanded && (
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Array.from({ length: 4 }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} style={{
            padding: '0.4rem 0.6rem',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: currentPage === i + 1 ? '#003F7D' : 'white',
            color: currentPage === i + 1 ? 'white' : '#003F7D',
            fontWeight: 'bold',
            minWidth: '28px',
            minHeight: '28px',
            fontSize: '0.85rem'
          }}>{i + 1}</button>
        ))}
      </div>
    )}
  </div>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr min(95%, 1100px) 1fr; }
        }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr min(90%, 1100px) 1fr; }
        }
        @media (max-width: 500px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr min(100%, 1100px) 1fr; }
          div[style*="display: grid"] > div { padding: 0 10px; }
        }
      `}</style>
    </div>
  );
}
