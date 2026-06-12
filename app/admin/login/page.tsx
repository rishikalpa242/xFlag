'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { success: boolean; error?: string };

      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error ?? 'Login failed');
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
        <h2>CMS Admin</h2>
        <p className="cms-login-sub">Sign in to manage your site content</p>

        {error && (
          <div className="alert alert-danger py-2 small">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="cms-label">Email</label>
            <input
              type="email"
              className="form-control cms-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <label className="cms-label">Password</label>
              <Link href="/admin/forgot-password" style={{ fontSize: '0.85rem', color: '#4361ee', textDecoration: 'none' }}>Forgot Password?</Link>
            </div>
            <input
              type="password"
              className="form-control cms-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>

      <style>{`
        .cms-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0d1a;
        }
        .cms-login-card {
          width: 100%;
          max-width: 400px;
          background: #16162a;
          border: 1px solid #2a2a45;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .cms-login-logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .cms-login-logo img {
          height: 50px;
          object-fit: contain;
        }
        .cms-login-card h2 {
          color: #fff;
          text-align: center;
          margin-bottom: 4px;
          font-size: 1.4rem;
        }
        .cms-login-sub {
          color: #888;
          text-align: center;
          font-size: 0.85rem;
          margin-bottom: 28px;
        }
        .cms-label {
          color: #aaa;
          font-size: 0.85rem;
          margin-bottom: 6px;
          display: block;
        }
        .cms-input {
          background: #0d0d1a !important;
          border: 1px solid #2a2a45 !important;
          color: #fff !important;
        }
        .cms-input:focus {
          border-color: #4361ee !important;
          box-shadow: 0 0 0 3px rgba(67,97,238,0.2) !important;
        }
      `}</style>
    </div>
  );
}
