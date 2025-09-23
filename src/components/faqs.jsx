import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Who is eligible for this program?',
      answer:
        'Any Degree/Btech/BE/MTech final year, Passed outs, Individuals, Employees are eligible for this program.',
    },
    {
      question: 'What is the duration of the program?',
      answer: 'The duration will be shared based on the program selected.',
    },
    {
      question: 'Do I get the assured placement?',
      answer: 'Placement assistance is provided based on performance.',
    },
    {
      question: 'What is the basic academic percentage required to enroll for the course?',
      answer: 'Minimum 50% is usually preferred, but varies per course.',
    },
    {
      question: 'What is the execution plan of the program?',
      answer: 'Execution plan includes training, assignments, and projects.',
    },
    {
      question: 'Can we take this course online?',
      answer: 'Yes, the course is available online.',
    },
    {
      question: 'I am already employed, will I be eligible for the program?',
      answer: 'Yes, working professionals are also eligible.',
    },
    {
      question: 'What If I miss the session due to an emergency?',
      answer: 'You can access recorded sessions or reschedule.',
    },
    {
      question: 'Do you provide any certificate after the program?',
      answer: 'Yes, a completion certificate will be provided.',
    },
    {
      question: 'Have suggestions for us?',
      answer: 'We would love to hear from you. Please contact us!',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      style={{
        width: '90%',
        maxWidth: '1100px',
        margin: '40px auto',
        fontFamily: 'Calibri, sans-serif',
        padding: '0 10px',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#003F7D', textAlign: 'center' }}>
        Frequently Asked Questions
      </h1>

      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          style={{
            width: '100%',
            border: '1.5px solid #ccc',
            borderRadius: '20px',
            marginBottom: '20px',
            padding: '20px 25px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
            cursor: 'pointer',
          }}
          layout
          onClick={() => toggleFAQ(index)}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <h2 style={{ fontSize: '1.3rem', color: '#003F7D', margin: 0, flex: 1 }}>
              {faq.question}
            </h2>
            <span
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#003F7D',
                userSelect: 'none',
                marginLeft: '10px',
              }}
            >
              {activeIndex === index ? '−' : '+'}
            </span>
          </div>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginTop: '15px',
                  fontSize: '1rem',
                  color: '#333',
                  lineHeight: '1.5',
                }}
              >
                {faq.answer}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default Faqs;
