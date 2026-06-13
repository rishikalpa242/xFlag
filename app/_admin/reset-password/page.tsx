'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json() as { success: boolean; message?: string; error?: string };

      if (data.success) {
        setMessage(data.message || 'Password reset successfully!');
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setError(data.error ?? 'Reset failed');
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
        <h2>Reset Password</h2>
        <p className="cms-login-sub">Enter your new password below</p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        {message && <div className="alert alert-success py-2 small">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="cms-label">New Password</label>
            <input
              type="password"
              className="form-control cms-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={!token || !!message}
            />
          </div>
          <div className="mb-4">
            <label className="cms-label">Confirm Password</label>
            <input
              type="password"
              className="form-control cms-input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              disabled={!token || !!message}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading || !token || !!message}>
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
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
