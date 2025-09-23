import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    if (!role) {
      setMessage('Please select a role');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createaccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully');
        setMessage('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
      } else {
        setMessage(data.msg || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

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

        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyle}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div style={styles.roleContainer}>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === 'student'}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            Student
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={role === 'instructor'}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            Instructor
          </label>
        </div>

        {message && <div style={styles.message}>{message}</div>}

        <div style={styles.rememberContainer}>
          <label>
            <input type="checkbox" style={{ marginRight: '8px' }} />
            Remember Me
          </label>
          <a href="/login" style={styles.link}>
            Already have an account? Log in
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
          <button type="submit" style={submitBtnStyle}>
            Create Account
          </button>
        </div>

        <div style={orDividerStyle}>— or sign up with —</div>

        <div style={styles.socialContainer}>
          <SocialButton
            icon={<img src="src/assets/google.png" alt="Google" style={{ width: 20, height: 20 }} />}
            text="Sign in"
            bgColor="#fff"
            color="#000"
            borderColor="#ddd"
          />
          <SocialButton
            icon={<FacebookIcon style={{ color: '#fff' }} />}
            text="Sign in"
            bgColor="#1877F2"
            color="#fff"
            borderColor="#1877F2"
          />
          <SocialButton
            icon={<AppleIcon style={{ color: '#fff' }} />}
            text="Sign in"
            bgColor="#404040"
            color="#fff"
            borderColor="#000"
          />
        </div>
      </form>

      <img
        src="src/assets/create-account-login.png"
        alt="Create account visual"
        style={styles.image}
      />
    </div>
  );
};

const SocialButton = ({ icon, text, bgColor, color, borderColor }) => (
  <button
    style={{
      ...socialBtnBase,
      backgroundColor: bgColor,
      color,
      border: `1px solid ${borderColor}`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = shadeColor(bgColor, -10);
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = bgColor;
    }}
  >
    {icon} {text}
  </button>
);

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F2F4F8',
    gap: '1.5rem',
    padding: '1rem',
  },
  form: {
    width: '100%',
    maxWidth: '480px',
    padding: '30px',
    borderRadius: '43px',
    backgroundColor: 'white',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    fontFamily: 'Calibri',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2rem',
    color: '#003F7D',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  roleContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  message: {
    color: 'red',
    marginBottom: '15px',
  },
  rememberContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  link: { color: '#F98149', textDecoration: 'none' },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  image: {
    width: '100%',
    maxWidth: '450px',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    userSelect: 'none',
  },
};

const inputStyle = {
  width: '100%',
  padding: '8px 0',
  border: 'none',
  borderBottom: '2px solid #ccc',
  backgroundColor: 'transparent',
  fontSize: '15px',
  outline: 'none',
  marginBottom: '20px',
};

const submitBtnStyle = {
  width: '160px',
  height: '38px',
  borderRadius: '12px',
  backgroundColor: '#003F7D',
  color: 'white',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom: '20px',
};

const orDividerStyle = {
  textAlign: 'center',
  color: '#aaa',
  marginBottom: '15px',
};

const socialBtnBase = {
  flex: 'none',
  padding: '7px 12px',
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
  height: '40px',
};

function shadeColor(color, percent) {
  let f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) / 100 + R) * 0x10000 +
      (Math.round((t - G) * p) / 100 + G) * 0x100 +
      (Math.round((t - B) * p) / 100 + B)
    )
      .toString(16)
      .slice(1)
  );
}

export default CreateAccount;
