'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { success: boolean; message?: string; error?: string };

      if (data.success) {
        setMessage(data.message || 'Reset link sent.');
      } else {
        setError(data.error ?? 'Request failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cms-login-page">
      <div className="cms-login-card">
        <div className="cms-login-logo">
          <img src="/assets/images/logo2.png" alt="XFlag" />
        </div>
        <h2>Forgot Password</h2>
        <p className="cms-login-sub">Enter your admin email to receive a reset link</p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        {message && <div className="alert alert-success py-2 small">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="cms-label">Email</label>
            <input
              type="email"
              className="form-control cms-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? 'Sending…' : 'Send Reset Link'}
          </button>
          <div className="text-center">
            <a href="/admin/login" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>
              &larr; Back to Login
            </a>
          </div>
        </form>
      </div>

      <style>{`
        .cms-login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0d0d1a; }
        .cms-login-card { width: 100%; max-width: 400px; background: #16162a; border: 1px solid #2a2a45; border-radius: 12px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .cms-login-logo { text-align: center; margin-bottom: 20px; }
        .cms-login-logo img { height: 50px; object-fit: contain; }
        .cms-login-card h2 { color: #fff; text-align: center; margin-bottom: 4px; font-size: 1.4rem; }
        .cms-login-sub { color: #888; text-align: center; font-size: 0.85rem; margin-bottom: 28px; }
        .cms-label { color: #aaa; font-size: 0.85rem; margin-bottom: 6px; display: block; }
        .cms-input { background: #0d0d1a !important; border: 1px solid #2a2a45 !important; color: #fff !important; }
        .cms-input:focus { border-color: #4361ee !important; box-shadow: 0 0 0 3px rgba(67,97,238,0.2) !important; }
      `}</style>
    </div>
  );
}
