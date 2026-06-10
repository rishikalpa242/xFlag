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
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} py-2 mb-4`}>
          {message.text}
        </div>
      )}

      {/* Nav Links */}
      <div className="cms-card">
        <div className="cms-card-header">
          <h5>Navigation Links</h5>
          <button className="btn btn-sm btn-outline-primary" onClick={addNavLink}>+ Add Link</button>
        </div>
        <div className="cms-card-body">
          {data.navLinks.map((link, idx) => (
            <div key={link.id} className="cms-link-row">
              <div className="cms-link-main">
                <span className="cms-link-num">{idx + 1}</span>
                <div className="cms-link-fields">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Label"
                    value={link.label}
                    onChange={e => updateNavLink(link.id, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="URL e.g. /about-us"
                    value={link.href}
                    onChange={e => updateNavLink(link.id, 'href', e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
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
                        className="form-control form-control-sm"
                        placeholder="Sub-label"
                        value={item.label}
                        onChange={e => updateDropdownItem(link.id, item.id, 'label', e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Sub-URL"
                        value={item.href}
                        onChange={e => updateDropdownItem(link.id, item.id, 'href', e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteDropdownItem(link.id, item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="btn btn-sm btn-link text-muted cms-add-sub"
                onClick={() => addDropdownItem(link.id)}
              >
                + Add dropdown item
              </button>
            </div>
          ))}

          {data.navLinks.length === 0 && (
            <p className="text-muted text-center py-3">No nav links. Click &quot;Add Link&quot; to start.</p>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="cms-card mt-4">
        <div className="cms-card-header">
          <h5>Top CTA Buttons</h5>
          <button className="btn btn-sm btn-outline-primary" onClick={addCtaButton}>+ Add Button</button>
        </div>
        <div className="cms-card-body">
          {data.ctaButtons.map((btn, idx) => (
            <div key={btn.id} className="cms-link-row">
              <div className="cms-link-main">
                <span className="cms-link-num">{idx + 1}</span>
                <div className="cms-link-fields">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Button Label"
                    value={btn.label}
                    onChange={e => updateCtaButton(btn.id, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="URL"
                    value={btn.href}
                    onChange={e => updateCtaButton(btn.id, 'href', e.target.value)}
                  />
                  <select
                    className="form-select form-select-sm"
                    value={btn.variant}
                    onChange={e => updateCtaButton(btn.id, 'variant', e.target.value)}
                    style={{ maxWidth: 120 }}
                  >
                    <option value="primary">Primary</option>
                    <option value="info">Info</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteCtaButton(btn.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {data.ctaButtons.length === 0 && (
            <p className="text-muted text-center py-3">No CTA buttons.</p>
          )}
        </div>
      </div>

      <div className="mt-4 text-end">
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <style>{`
        .cms-page-loading { padding: 40px; color: #555; }
        .cms-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .cms-page-title { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin: 0 0 4px; }
        .cms-page-desc { color: #666; font-size: 0.9rem; margin: 0; }
        .cms-card {
          background: #fff;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .cms-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
        }
        .cms-card-header h5 { margin: 0; font-size: 0.95rem; font-weight: 600; color: #222; }
        .cms-card-body { padding: 16px 20px; }
        .cms-link-row {
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 10px;
          padding: 12px;
          background: #fff;
        }
        .cms-link-main {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cms-link-num {
          width: 24px;
          height: 24px;
          background: #f0f2f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: #555;
          flex-shrink: 0;
        }
        .cms-link-fields {
          display: flex;
          gap: 8px;
          flex: 1;
          flex-wrap: wrap;
        }
        .cms-link-fields .form-control,
        .cms-link-fields .form-select {
          flex: 1;
          min-width: 120px;
        }
        .cms-dropdown-list {
          margin-top: 8px;
          padding-left: 34px;
        }
        .cms-dropdown-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .cms-dropdown-arrow { color: #999; flex-shrink: 0; }
        .cms-add-sub {
          margin-top: 6px;
          padding: 0;
          font-size: 0.8rem;
          padding-left: 34px;
          display: block;
        }
      `}</style>
    </div>
  );
}
