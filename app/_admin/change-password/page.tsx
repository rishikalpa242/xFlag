'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Password changed successfully! You can now use your new password.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change password.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Change Password</h1>
          <p className="cms-page-desc">Update your admin account password.</p>
        </div>
      </div>

      {message && (
        <div className={`cms-alert cms-alert-${message.type}`}>
          <span className="cms-alert-icon">{message.type === 'success' ? '✓' : '⚠'}</span>
          {message.text}
        </div>
      )}

      <div className="cms-card" style={{ maxWidth: '600px' }}>
        <div className="cms-card-body">
          <form onSubmit={handleSubmit}>
            <div className="cms-form-group">
              <label className="cms-label">Current Password</label>
              <input
                type="password"
                className="cms-input"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="cms-form-group" style={{ marginTop: '20px' }}>
              <label className="cms-label">New Password</label>
              <input
                type="password"
                className="cms-input"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
              <small style={{ color: '#64748b', display: 'block', marginTop: '4px' }}>Minimum 8 characters.</small>
            </div>
            
            <div className="cms-form-group" style={{ marginTop: '20px' }}>
              <label className="cms-label">Confirm New Password</label>
              <input
                type="password"
                className="cms-input"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div style={{ marginTop: '30px' }}>
              <button 
                type="submit" 
                className="cms-btn cms-btn-primary" 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .cms-page-header {
          margin-bottom: 32px;
        }
        .cms-page-title { 
          font-size: 1.75rem; 
          font-weight: 700; 
          color: #0f172a; 
          margin: 0 0 8px; 
          letter-spacing: -0.5px; 
        }
        .cms-page-desc { color: #64748b; font-size: 0.95rem; margin: 0; }
        
        .cms-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .cms-card-body { 
          padding: 30px; 
        }

        .cms-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cms-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #334155;
        }
        .cms-input {
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #334155;
          outline: none;
          transition: all 0.2s;
        }
        .cms-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .cms-btn {
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cms-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .cms-btn-primary {
          background: #3b82f6;
          color: white;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }
        .cms-btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }

        .cms-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .cms-alert-icon { font-size: 1.2rem; }
        .cms-alert-success { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
        .cms-alert-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
      `}</style>
    </div>
  );
}
