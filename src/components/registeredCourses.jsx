// registeredCourses.jsx
import React, { useEffect, useState } from "react";

export default function RegisteredCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in as an instructor to view this page");
      return;
    }

    fetch("http://localhost:5000/api/registered-courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch registered courses");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "2rem auto",
      fontFamily: "Calibri, sans-serif",
      padding: "1rem",
    }}>
      <h1 style={{ color: "#003F7D", textAlign: "center", marginBottom: "1.5rem" }}>
        Registered Courses
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", color: "#003F7D" }}>Loading...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "700px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#003F7D", color: "white" }}>
                <th style={thStyle}>Student User ID</th>
                <th style={thStyle}>Student Email</th>
                <th style={thStyle}>Course ID</th>
                <th style={thStyle}>Course Name</th>
                <th style={thStyle}>Course Info</th>
                <th style={thStyle}>Enrolled At</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={tdStyle} data-label="Student User ID">{course.registeredStudentUserId}</td>
                  <td style={tdStyle} data-label="Student Email">{course.registeredStudentUserEmail}</td>
                  <td style={tdStyle} data-label="Course ID">{course.courseId}</td>
                  <td style={tdStyle} data-label="Course Name">{course.courseName}</td>
                  <td style={tdStyle} data-label="Course Info">{course.info}</td>
                  <td style={tdStyle} data-label="Enrolled At">{new Date(course.enrolledAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          table {
            font-size: 0.9rem;
          }
          th, td {
            padding: 0.6rem 0.5rem;
          }
        }
        @media (max-width: 768px) {
          table {
            font-size: 0.85rem;
          }
          th, td {
            padding: 0.5rem 0.4rem;
          }
        }
        @media (max-width: 500px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            display: none;
          }
          tr {
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 0.5rem;
            background: #f9f9f9;
          }
          td {
            padding: 0.5rem;
            text-align: right;
            position: relative;
          }
          td::before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 0.5rem;
            font-weight: bold;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}

const thStyle = {
  padding: "0.8rem",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "0.6rem",
};
