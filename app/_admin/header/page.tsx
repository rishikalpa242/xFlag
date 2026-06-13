'use client';

import { useState, useEffect } from 'react';
import type { NavLink, CtaButton, DropdownItem } from '@/lib/types';

interface HeaderData {
  logo1: string;
  logo2: string;
  navLinks: NavLink[];
  ctaButtons: CtaButton[];
}

function newId() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function HeaderAdminPage() {
  const [data, setData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/cms/header')
      .then(r => r.json())
      .then((res: { success: boolean; data: HeaderData }) => {
        if (res.success) setData(res.data);
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load header data.' }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/cms/header', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json() as { success: boolean; error?: string };
      setMessage(result.success
        ? { type: 'success', text: 'Header saved successfully!' }
        : { type: 'error', text: result.error ?? 'Save failed.' });
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  function updateNavLink(id: string, field: keyof NavLink, value: string) {
    if (!data) return;
    setData({
      ...data,
      navLinks: data.navLinks.map(l =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    });
  }

  function deleteNavLink(id: string) {
    if (!data) return;
    setData({ ...data, navLinks: data.navLinks.filter(l => l.id !== id) });
  }

  function addNavLink() {
    if (!data) return;
    setData({
      ...data,
      navLinks: [...data.navLinks, { id: newId(), label: 'New Link', href: '/', dropdown: [] }],
    });
  }

  function addDropdownItem(linkId: string) {
    if (!data) return;
    setData({
      ...data,
      navLinks: data.navLinks.map(l =>
        l.id === linkId
          ? { ...l, dropdown: [...l.dropdown, { id: newId(), label: 'Sub Link', href: '/' }] }
          : l
      ),
    });
  }

  function updateDropdownItem(linkId: string, itemId: string, field: keyof DropdownItem, value: string) {
    if (!data) return;
    setData({
      ...data,
      navLinks: data.navLinks.map(l =>
        l.id === linkId
          ? {
              ...l,
              dropdown: l.dropdown.map(d =>
                d.id === itemId ? { ...d, [field]: value } : d
              ),
            }
          : l
      ),
    });
  }

  function deleteDropdownItem(linkId: string, itemId: string) {
    if (!data) return;
    setData({
      ...data,
      navLinks: data.navLinks.map(l =>
        l.id === linkId
          ? { ...l, dropdown: l.dropdown.filter(d => d.id !== itemId) }
          : l
      ),
    });
  }

  function updateCtaButton(id: string, field: keyof CtaButton, value: string) {
    if (!data) return;
    setData({
      ...data,
      ctaButtons: data.ctaButtons.map(b =>
        b.id === id ? { ...b, [field]: value } : b
      ),
    });
  }

  function deleteCtaButton(id: string) {
    if (!data) return;
    setData({ ...data, ctaButtons: data.ctaButtons.filter(b => b.id !== id) });
  }

  function addCtaButton() {
    if (!data) return;
    setData({
      ...data,
      ctaButtons: [...data.ctaButtons, { id: newId(), label: 'New Button', href: '#', variant: 'primary' }],
    });
  }

  if (loading) return <div className="cms-page-loading">Loading…</div>;
  if (!data) return <div className="alert alert-danger">Failed to load data.</div>;

  return (
    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Header Navigation</h1>
          <p className="cms-page-desc">Manage the main navigation links and top CTA buttons.</p>
        </div>
        <button className="cms-btn cms-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`cms-alert cms-alert-${message.type}`}>
          <span className="cms-alert-icon">{message.type === 'success' ? '✓' : '⚠'}</span>
          {message.text}
        </div>
      )}

      {/* Nav Links */}
      <div className="cms-card">
        <div className="cms-card-header">
          <div className="cms-card-title">
            <span className="cms-card-icon">☰</span>
            <h5>Navigation Links</h5>
          </div>
          <button className="cms-btn cms-btn-outline" onClick={addNavLink}>+ Add Link</button>
        </div>
        <div className="cms-card-body">
          <div className="cms-links-container">
            {data.navLinks.map((link, idx) => (
              <div key={link.id} className="cms-link-row">
                <div className="cms-link-main">
                  <div className="cms-drag-handle">⋮⋮</div>
                  <span className="cms-link-num">{idx + 1}</span>
                  <div className="cms-link-fields">
                    <input
                      type="text"
                      className="cms-input"
                      placeholder="Label (e.g. Home)"
                      value={link.label}
                      onChange={e => updateNavLink(link.id, 'label', e.target.value)}
                    />
                    <input
                      type="text"
                      className="cms-input"
                      placeholder="URL (e.g. /home)"
                      value={link.href}
                      onChange={e => updateNavLink(link.id, 'href', e.target.value)}
                    />
                  </div>
                  <button
                    className="cms-btn-icon cms-btn-danger"
                    onClick={() => deleteNavLink(link.id)}
                    title="Delete link"
                  >
                    ✕
                  </button>
                </div>

                {/* Dropdown items */}
                {link.dropdown.length > 0 && (
                  <div className="cms-dropdown-list">
                    {link.dropdown.map(item => (
                      <div key={item.id} className="cms-dropdown-row">
                        <span className="cms-dropdown-arrow">↳</span>
                        <input
                          type="text"
                          className="cms-input cms-input-sm"
                          placeholder="Sub-label"
                          value={item.label}
                          onChange={e => updateDropdownItem(link.id, item.id, 'label', e.target.value)}
                        />
                        <input
                          type="text"
                          className="cms-input cms-input-sm"
                          placeholder="Sub-URL"
                          value={item.href}
                          onChange={e => updateDropdownItem(link.id, item.id, 'href', e.target.value)}
                        />
                        <button
                          className="cms-btn-icon cms-btn-danger cms-btn-sm"
                          onClick={() => deleteDropdownItem(link.id, item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cms-add-sub-wrapper">
                  <button
                    className="cms-btn-text"
                    onClick={() => addDropdownItem(link.id)}
                  >
                    + Add dropdown item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {data.navLinks.length === 0 && (
            <div className="cms-empty-state">
              <span className="cms-empty-icon">📂</span>
              <p>No navigation links defined.</p>
              <button className="cms-btn cms-btn-outline" onClick={addNavLink}>Create First Link</button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="cms-card mt-5">
        <div className="cms-card-header">
          <div className="cms-card-title">
            <span className="cms-card-icon">⚡</span>
            <h5>Top CTA Buttons</h5>
          </div>
          <button className="cms-btn cms-btn-outline" onClick={addCtaButton}>+ Add Button</button>
        </div>
        <div className="cms-card-body">
          <div className="cms-links-container">
            {data.ctaButtons.map((btn, idx) => (
              <div key={btn.id} className="cms-link-row">
                <div className="cms-link-main">
                  <span className="cms-link-num">{idx + 1}</span>
                  <div className="cms-link-fields">
                    <input
                      type="text"
                      className="cms-input"
                      placeholder="Button Label"
                      value={btn.label}
                      onChange={e => updateCtaButton(btn.id, 'label', e.target.value)}
                    />
                    <input
                      type="text"
                      className="cms-input"
                      placeholder="URL"
                      value={btn.href}
                      onChange={e => updateCtaButton(btn.id, 'href', e.target.value)}
                    />
                    <select
                      className="cms-input"
                      value={btn.variant}
                      onChange={e => updateCtaButton(btn.id, 'variant', e.target.value)}
                      style={{ maxWidth: 140 }}
                    >
                      <option value="primary">Primary</option>
                      <option value="info">Info</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>
                  <button
                    className="cms-btn-icon cms-btn-danger"
                    onClick={() => deleteCtaButton(btn.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {data.ctaButtons.length === 0 && (
            <p className="cms-empty-state-text">No CTA buttons configured.</p>
          )}
        </div>
      </div>

      <div className="cms-page-actions">
        <button className="cms-btn cms-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <style>{`
        .cms-page-loading { padding: 40px; color: #64748b; font-weight: 500; }
        .cms-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        .cms-page-title { font-size: 1.75rem; font-weight: 700; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.5px; }
        .cms-page-desc { color: #64748b; font-size: 0.95rem; margin: 0; }
        
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

        .cms-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }
        .mt-5 { margin-top: 32px; }
        .cms-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          background: #fafafa;
        }
        .cms-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cms-card-icon {
          color: #3b82f6;
          font-size: 1.2rem;
        }
        .cms-card-header h5 { margin: 0; font-size: 1.1rem; font-weight: 600; color: #1e293b; }
        .cms-card-body { padding: 24px; }
        
        .cms-links-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cms-link-row {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cms-link-row:hover {
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .cms-link-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cms-drag-handle {
          color: #cbd5e1;
          cursor: grab;
          font-size: 1.2rem;
          line-height: 1;
        }
        .cms-link-num {
          width: 28px;
          height: 28px;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          flex-shrink: 0;
        }
        
        .cms-link-fields {
          display: flex;
          gap: 12px;
          flex: 1;
          flex-wrap: wrap;
        }
        .cms-input {
          flex: 1;
          min-width: 150px;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #334155;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cms-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .cms-input-sm {
          padding: 8px 12px;
          font-size: 0.9rem;
        }

        .cms-dropdown-list {
          margin-top: 16px;
          padding-left: 56px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cms-dropdown-row {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .cms-dropdown-arrow { 
          color: #94a3b8; 
          flex-shrink: 0;
          font-size: 1.2rem;
          transform: translateY(-4px);
        }
        .cms-add-sub-wrapper {
          margin-top: 12px;
          padding-left: 56px;
        }

        .cms-btn {
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .cms-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .cms-btn-primary {
          background: #3b82f6;
          color: white;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }
        .cms-btn-primary:hover:not(:disabled) {
          background: #2563eb;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }
        .cms-btn-outline {
          background: transparent;
          border: 1px solid #cbd5e1;
          color: #475569;
        }
        .cms-btn-outline:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #1e293b;
        }
        .cms-btn-text {
          background: transparent;
          border: none;
          color: #3b82f6;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
        }
        .cms-btn-text:hover {
          background: #eff6ff;
        }

        .cms-btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: transparent;
          transition: all 0.2s;
          color: #94a3b8;
        }
        .cms-btn-icon:hover {
          background: #fee2e2;
          color: #ef4444;
          border-color: #fca5a5;
        }
        .cms-btn-sm {
          width: 32px;
          height: 32px;
        }

        .cms-empty-state {
          padding: 48px 24px;
          text-align: center;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px dashed #cbd5e1;
        }
        .cms-empty-icon { font-size: 2.5rem; margin-bottom: 16px; display: block; opacity: 0.8; }
        .cms-empty-state p { color: #64748b; margin-bottom: 20px; font-size: 1.05rem; }
        .cms-empty-state-text { color: #94a3b8; text-align: center; padding: 24px 0; font-size: 0.95rem; }
        
        .cms-page-actions {
          margin-top: 32px;
          display: flex;
          justify-content: flex-end;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}
