import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import CreateAccount from './components/createAccount';
import Login from './components/login';
import Footer from './components/footer';
import Contact from './components/contact';
import Faqs from './components/faqs';
import Courses from './components/courses';
import Pricing from './components/pricing';
import RegisteredCourses from './components/registeredCourses';

function App() {
  const [user, setUser] = useState(null);

  // On app load, restore user from localStorage (token + user info)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const userObj = JSON.parse(userData);
        setUser({ ...userObj, token });
      } catch {
        // Clear corrupt data if any
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* other routes */}
        <Route path="/registered-courses" element={<RegisteredCourses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
