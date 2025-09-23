import React, { useState, useEffect } from 'react';
import ImageSlider from './imageSlider';
import TrainerSlider from './trainerSlider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EnrollModal from './enrollModal';

export default function Homepage() {
  const buttonLabels = ['Cloud Computing','Cyber Security','DevOps','Data Science','Software Testing'];
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setLoggedInUserEmail(email);
      setIsLoggedIn(true);
    }

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

  const handleButtonClick = (label) => setActiveButton(label);

  const getButtonStyle = (label) => ({
    padding: '0.8rem 1.2rem',
    fontSize: '0.95rem',
    borderRadius: '12px',
    background: activeButton === label ? '#FF914C' : '#F2F4F8',
    color: activeButton === label ? 'white' : '#B9B5B2',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    flex: '1 1 30%',
    minWidth: '100px',
    maxWidth: 'calc((100% - 20px)/3)'
  });

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
    <div style={styles.container}>
      {showModal && <EnrollModal message={modalMessage} onClose={() => setShowModal(false)} />}
      <div style={styles.content}>
        <h1 style={styles.title}>
          Skill your way<br /> up to success<br /> with us
        </h1>
        <p style={styles.subtitle}>
          Get the skills you need for<br /> the future of work.
        </p>

        <Box sx={styles.searchBox}>
          <TextField
            placeholder="Search the course you want"
            variant="outlined"
            sx={{ flexGrow: 1, minWidth: '150px' }}
            InputProps={{ style: { height: '3rem', borderRadius: '10px', fontSize: '1rem'} }}
          />
          <button style={styles.searchBtn}>Search</button>
        </Box>

        <Box sx={styles.buttonBox}>
          {buttonLabels.map(label => (
            <button key={label} onClick={() => handleButtonClick(label)} style={getButtonStyle(label)}>
              {label}
            </button>
          ))}
        </Box>

        <ImageSlider />
        <img src="src/assets/dots.png" alt="dots" style={styles.dots} />

       {/* Popular Courses */}

<div style={{
  width: '100%',
  maxWidth: '1100px',
  margin: '2rem auto',
  background: '#003F7D',
  borderRadius: '25px',
  padding: '1.5rem',
  boxSizing: 'border-box',
  color: 'white'
}}>
  <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'white', marginBottom: '1.5rem' }}>Popular Courses</h2>

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
</div>



        {/* Achievements */}
        <div style={styles.achievements}>
          <h2 style={styles.sectionTitle}>Our Achievements</h2>
          <div style={styles.achievementsWrapper}>
            <img src="src/assets/image3.png" style={styles.achievementImg} />
            <img src='src/assets/pic1.png' style={{borderRadius:"22px",width:"150px",height:"150px"}}/>
            <img src='src/assets/pic2.png' style={{borderRadius:"22px",width:"150px",height:"150px"}}/>
            <img src='src/assets/pic3.png' style={{borderRadius:"22px",width:"350px",height:"100px"}}/>
            <img src="src/assets/dots2.png" style={styles.achievementDots} />
          </div>
        </div>

        {/* Trainers */}
        <div>
          <h2 style={styles.sectionTitle}>Meet Our Professional Mentors & Trainers</h2>
          <TrainerSlider />
        </div>

        {/* Certifications */}
        <div>
          <h2 style={styles.sectionTitle}>Our Certifications</h2>
          <div style={styles.certifications}>
            <img src="src/assets/iso1.png" style={styles.certImg} />
            <img src="src/assets/iso2.png" style={styles.certImg} />
            <img src="src/assets/iso3.png" style={styles.certImg} />
            <img src="src/assets/iso4.png" style={styles.certImg} />
          </div>
        </div>

        {/* Collaboration */}
        <div>
          <h2 style={styles.sectionTitle}>Our Collaboration</h2>
          <img src="src/assets/collaborations.png" style={styles.collabImg} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Calibri, sans-serif',
    userSelect: 'none',
    padding: '2rem 1rem',
    boxSizing: 'border-box',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  content: {
    width: '100%',
    padding: '0 1rem',
    boxSizing: 'border-box',
  },
  title: { color: '#003F7D', fontSize: '80px', lineHeight: 1.2, marginBottom: '1rem' },
  subtitle: { color: '#A1A1A1', fontSize: '1rem', marginBottom: '1.5rem' },
  searchBox: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
  searchBtn: { width: '70px', height: '3rem', borderRadius: '10px', background: '#003F7D', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' },
  buttonBox: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' },
  dots: { width: '90%', maxWidth: '350px', marginBottom: '1.5rem' },
  popularCourses: { width: '100%', marginBottom: '2rem' },
  sectionTitle: { textAlign: 'center', fontSize: '1.8rem', color: '#003F7D', marginBottom: '1.5rem' },
  coursesWrapper: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
  courseCard: { background: 'white', borderRadius: '16px', padding: '1rem', color: '#003F7D', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '280px' },
  courseImg: { width: '100px', height: '100px', marginBottom: '0.5rem', userSelect: 'none', display: 'block', objectFit: 'contain' },
  courseTitle: { fontSize: '1.2rem', textAlign: 'center', marginBottom: '0.5rem' },
  courseDesc: { textAlign: 'center', flexGrow: 1, fontSize: '0.85rem' },
  courseButtons: { display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', width: '100%', marginTop: '0.5rem' },
  liveDemoBtn: { flex: 1, padding: '0.4rem', cursor: 'pointer', background: "rgba(253, 253, 253, 1)", borderRadius: '6px', border: '1px solid #F98149', fontSize: '0.8rem' },
  enrollBtn: { flex: 1, padding: '0.4rem', fontSize: '0.8rem' },
  downloadBtn: { marginTop: '0.5rem', width: '140px', height: '30px', borderRadius: '16px', color: "#FFFFFF", background: "#F98149", fontSize: "0.75rem", border: "none" },
  showMoreWrapper: { textAlign: 'center', marginTop: '1rem' },
  showMoreBtn: { backgroundColor: 'white', color: '#003F7D', borderRadius: '25px', padding: '0.6rem 1rem', fontSize: '0.9rem', cursor: 'pointer', border: 'none', minWidth: '120px' },
  pagination: { marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' },
  pageBtn: { padding: '0.4rem 0.6rem', borderRadius: '50%', border: 'none', cursor: 'pointer', fontWeight: 'bold', minWidth: '28px', minHeight: '28px' },
  achievements: { background: "#F3F3F3", marginTop: '2rem', padding: '2rem 0' },
  achievementsWrapper: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' },
  achievementImg: { width: '100%', maxWidth: '500px', height: 'auto' },
  achievementDots: { width: '100px', height: '100px', opacity: 0.4 },
  certifications: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
  certImg: { width: '100px', height: '100px', objectFit: 'contain' },
  collabImg: { width: '100%', maxWidth: '1000px', height: 'auto', display: 'block', margin: '0 auto 2rem auto' }
};
