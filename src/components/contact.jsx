import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        issue: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    padding: '40px',
                    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                    fontFamily: 'Calibri',
                }}
            >
                <div className="contact-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ flex: '1 1 250px' }}>
                        <label htmlFor="name" style={labelStyle}>Your name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={{ flex: '1 1 250px' }}>
                        <label htmlFor="email" style={labelStyle}>Contact email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                <div className="contact-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ flex: '1 1 250px' }}>
                        <label htmlFor="phone" style={labelStyle}>Phone Number*</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={{ flex: '1 1 250px' }}>
                        <label htmlFor="issue" style={labelStyle}>Issue Related to *</label>
                        <select
                            id="issue"
                            name="issue"
                            value={formData.issue}
                            onChange={handleChange}
                            style={{ ...inputStyle, height: '40px', padding: '8px' }}
                            required
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="course-structure">Course Structure</option>
                            <option value="payment-failure">Payment Failure</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label htmlFor="message" style={labelStyle}>Your message*</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: '150px', resize: 'none', width: '100%' }}
                        required
                    />
                </div>

                <p style={{ fontSize: '14px', color: '#555', marginBottom: '30px' }}>
                    By submitting this form you agree to our terms and conditions and our Privacy Policy which explains how we may collect, use and disclose your personal information including to third parties.
                </p>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#003F7D',
                        color: 'white',
                        padding: '12px 25px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </form>

            <br />
            <br />

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '60px',
                    marginTop: '40px',
                    justifyContent: 'center',
                    fontFamily: "calibri"
                }}
            >
                <div style={{ textAlign: 'center', maxWidth: '200px', width: '100%' }}>
                    <img
                        src="src/assets/email.png"
                        alt="Email"
                        style={{
                            width: '136px',
                            height: '136px',
                            opacity: '1',
                            marginBottom: '10px',
                        }}
                    />
                    <p style={{ fontSize: '26px', margin: '8px 0', color: '#F98149', fontWeight: "bolder" }}>Email us</p>
                    <p style={{ marginBottom: '8px' }}>
                        Email us for general queries, including marketing and partnership opportunities.
                    </p>
                    <p style={{ fontWeight: 'bold', color: "#003F7D" }}>hello@ezyskills.com</p>
                </div>

                <div style={{ textAlign: 'center', maxWidth: '200px', width: '100%' }}>
                    <img
                        src="src/assets/call.png"
                        alt="Call"
                        style={{
                            width: '136px',
                            height: '136px',
                            opacity: '1',
                            marginBottom: '10px',
                        }}
                    />
                    <p style={{ fontSize: '26px', margin: '8px 0', color: '#F98149', fontWeight: "bolder" }}>Call us</p>
                    <p style={{ marginBottom: '8px' }}>
                        Call us to speak to a member of our team. We are always happy to help.
                    </p>
                    <p style={{ fontWeight: 'bold', color: "#003F7D" }}>+91 88888 99999</p>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1.8px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    fontFamily: 'Calibri',
    boxSizing: 'border-box',
};

const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#003F7D',
    fontSize: '16px',
};

export default Contact;
