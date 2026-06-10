'use client';

import { useState, useEffect } from 'react';
import type { FooterColumn, FooterLink } from '@/lib/types';

interface FooterData {
  logo: string;
  navColumns: FooterColumn[];
}

function newId() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function FooterAdminPage() {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/cms/footer')
      .then(r => r.json())
      .then((res: { success: boolean; data: FooterData }) => {
        if (res.success) setData(res.data);
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load footer data.' }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/cms/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json() as { success: boolean; error?: string };
      setMessage(result.success
        ? { type: 'success', text: 'Footer saved successfully!' }
        : { type: 'error', text: result.error ?? 'Save failed.' });
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  function updateColumnTitle(colId: string, title: string) {
    if (!data) return;
    setData({
      ...data,
      navColumns: data.navColumns.map(c =>
        c.id === colId ? { ...c, title } : c
      ),
    });
  }

  function deleteColumn(colId: string) {
    if (!data) return;
    setData({ ...data, navColumns: data.navColumns.filter(c => c.id !== colId) });
  }

  function addColumn() {
    if (!data) return;
    setData({
      ...data,
      navColumns: [...data.navColumns, { id: newId(), title: 'New Column', links: [] }],
    });
  }

  function updateLink(colId: string, linkId: string, field: keyof FooterLink, value: string) {
    if (!data) return;
    setData({
      ...data,
      navColumns: data.navColumns.map(c =>
        c.id === colId
          ? { ...c, links: c.links.map(l => l.id === linkId ? { ...l, [field]: value } : l) }
          : c
      ),
    });
  }

  function deleteLink(colId: string, linkId: string) {
    if (!data) return;
    setData({
      ...data,
      navColumns: data.navColumns.map(c =>
        c.id === colId
          ? { ...c, links: c.links.filter(l => l.id !== linkId) }
          : c
      ),
    });
  }

  function addLink(colId: string) {
    if (!data) return;
    setData({
      ...data,
      navColumns: data.navColumns.map(c =>
        c.id === colId
          ? { ...c, links: [...c.links, { id: newId(), label: 'New Link', href: '#' }] }
          : c
      ),
    });
  }

  if (loading) return <div className="cms-page-loading">Loading…</div>;
  if (!data) return <div className="alert alert-danger">Failed to load data.</div>;

  return (
    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Footer Navigation</h1>
          <p className="cms-page-desc">Manage footer columns and their links.</p>
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

      <div className="row g-3">
        {data.navColumns.map((col) => (
          <div key={col.id} className="col-md-6 col-xl-4">
            <div className="cms-card h-100">
              <div className="cms-card-header">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={col.title}
                  onChange={e => updateColumnTitle(col.id, e.target.value)}
                  style={{ maxWidth: 160 }}
                />
                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteColumn(col.id)}>
                  Delete Column
                </button>
              </div>
              <div className="cms-card-body">
                {col.links.map((link, idx) => (
                  <div key={link.id} className="cms-footer-link-row">
                    <span className="cms-link-num">{idx + 1}</span>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Label"
                      value={link.label}
                      onChange={e => updateLink(col.id, link.id, 'label', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="URL"
                      value={link.href}
                      onChange={e => updateLink(col.id, link.id, 'href', e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteLink(col.id, link.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {col.links.length === 0 && (
                  <p className="text-muted small text-center py-2">No links yet.</p>
                )}
                <button
                  className="btn btn-sm btn-link text-primary mt-2 p-0"
                  onClick={() => addLink(col.id)}
                >
                  + Add Link
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-6 col-xl-4 d-flex align-items-stretch">
          <button
            className="btn btn-outline-secondary w-100 cms-add-column-btn"
            onClick={addColumn}
          >
            + Add Column
          </button>
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
          padding: 14px 16px;
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
          gap: 8px;
        }
        .cms-card-body { padding: 14px 16px; }
        .cms-footer-link-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }
        .cms-link-num {
          width: 22px;
          height: 22px;
          background: #f0f2f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #555;
          flex-shrink: 0;
        }
        .cms-add-column-btn {
          min-height: 100px;
          border: 2px dashed #ccc;
          color: #888;
          font-size: 1rem;
        }
        .cms-add-column-btn:hover {
          border-color: #4361ee;
          color: #4361ee;
        }
      `}</style>
    </div>
  );
}
