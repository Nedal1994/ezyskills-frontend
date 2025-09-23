import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { alert('Please enter email and password'); return; }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.msg || 'Login failed');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('email', data.user.email);
      setUser({ ...data.user, token: data.token });

      await fetch('http://localhost:5000/api/save-userid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.user.id }),
      });

      alert('Login successful');
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const formStyle = {
    ...styles.form,
    padding: windowWidth < 480 ? '25px' : '35px',
    borderRadius: windowWidth < 480 ? '28px' : '38px',
    width: windowWidth < 480 ? '90%' : '500px',
  };

  const titleStyle = {
    ...styles.title,
    fontSize: windowWidth < 480 ? '1.6rem' : '2.2rem',
    marginBottom: windowWidth < 480 ? '1.2rem' : '1.8rem',
  };

  const imageStyle = {
    ...styles.image,
    maxWidth: windowWidth < 480 ? '80%' : '550px', // scaled down more on small screens
    height: 'auto',
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={styles.rememberContainer}>
          <label>
            <input type="checkbox" style={{ marginRight: '8px' }} />
            Remember Me
          </label>
          <a href="/create-account" style={{ color: '#F98149', textDecoration: 'none' }}>
            Don't have an account? Create one
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
          <button type="submit" style={submitBtnStyle}>Login</button>
        </div>

        <div style={orDividerStyle}>— or sign in with —</div>

        <div style={styles.socialContainer}>
          <SocialButton
            icon={<img src="src/assets/google.png" alt="Google" style={{ width: 20, height: 20 }} />}
            text="Login with Google"
            style={socialBtnGoogle}
          />
          <SocialButton icon={<FacebookIcon style={{ color: '#fff' }} />} text="Login with Facebook" style={socialBtnFB} />
          <SocialButton icon={<AppleIcon style={{ color: '#fff' }} />} text="Login with Apple" style={socialBtnApple} />
        </div>
      </form>

      <img src="src/assets/create-account-login.png" alt="Login visual" style={imageStyle} />
    </div>
  );
};

const SocialButton = ({ icon, text, style }) => (
  <button style={{ ...socialBtnBase, ...style }}>
    {icon} {text}
  </button>
);

const inputStyle = {
  width: '100%',
  padding: '10px 0',
  border: 'none',
  borderBottom: '2px solid #ccc',
  backgroundColor: 'transparent',
  fontSize: '16px',
  outline: 'none',
  marginBottom: '30px',
};

const submitBtnStyle = {
  width: '160px',
  height: '38px',
  borderRadius: '10px',
  backgroundColor: '#003F7D',
  color: 'white',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom: '25px',
};

const orDividerStyle = {
  textAlign: 'center',
  color: '#aaa',
  marginBottom: '20px',
};

const socialBtnBase = {
  flex: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontSize: '14px',
  userSelect: 'none',
  transition: 'background-color 0.3s',
  height: '44px',
};

const socialBtnGoogle = {
  width: '100%',
  backgroundColor: '#F3F3F3',
  border: '1px solid #ddd',
  color: '#000',
};

const socialBtnFB = {
  width: '100%',
  backgroundColor: '#1877F2',
  border: '1px solid #1877F2',
  color: '#fff',
};

const socialBtnApple = {
  width: '100%',
  backgroundColor: '#404040',
  border: '1px solid #000',
  color: '#fff',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F2F4F8',
    padding: '1rem',
    boxSizing: 'border-box',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  form: {
    backgroundColor: 'white',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    fontFamily: 'Calibri',
    boxSizing: 'border-box',
  },
  title: {
    color: '#003F7D',
    textAlign: 'center',
  },
  rememberContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '361px',
    margin: '0 auto',
  },
  image: {
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    userSelect: 'none',
  },
};

export default Login;
