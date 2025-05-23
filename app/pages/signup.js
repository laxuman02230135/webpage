'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AuthProvider from '../components/AuthProvider';
import pool from '../lib/db';
import bcrypt from 'bcrypt';

export default function Signup() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !studentId || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO users (name, student_id, email, password) VALUES ($1, $2, $3, $4)',
        [name, studentId, email, hashedPassword]
      );
      router.push('/login');
    } catch (err) {
      setError('Signup failed: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <AuthProvider>
      <Head>
        <title>Signup | CST Canteen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ebcaa2;
          padding: 20px;
        }
        .form-box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .form-box h2 {
          color: #93502a;
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: center;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          color: #333;
          margin-bottom: 8px;
          font-size: 1rem;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
          color: #333;
        }
        .form-group input:focus {
          border-color: #c9a875;
          outline: none;
        }
        .error {
          color: #ff5252;
          font-size: 0.9rem;
          margin-bottom: 15px;
          text-align: center;
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #c9a875;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-btn:hover {
          background-color: #b08f5e;
        }
        .links {
          margin-top: 20px;
          text-align: center;
        }
        .links a {
          color: #93502a;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .links a:hover {
          color: #c9a875;
        }
        .links p {
          margin: 10px 0;
        }
        @media (max-width: 768px) {
          .form-box {
            padding: 20px;
          }
          .form-box h2 {
            font-size: 1.5rem;
          }
          .form-group input {
            padding: 8px;
          }
          .submit-btn {
            padding: 10px;
          }
        }
      `}</style>
      <div className="container">
        <div className="form-box">
          <h2>Signup for CST Canteen</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
            <button type="submit" className="submit-btn">Signup</button>
          </form>
          <div className="links">
            <p>Already have an account? <Link href="/login">Login</Link></p>
            <p><Link href="/">Back to Home</Link></p>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}