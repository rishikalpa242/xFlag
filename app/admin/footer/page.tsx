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

    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Footer Navigation</h1>
          <p className="cms-page-desc">Manage footer columns and their links.</p>
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

      <div className="cms-grid">
        {data.navColumns.map((col) => (
          <div key={col.id} className="cms-col-card">
            <div className="cms-card h-100">
              <div className="cms-card-header">
                <input
                  type="text"
                  className="cms-input cms-input-title"
                  value={col.title}
                  placeholder="Column Title"
                  onChange={e => updateColumnTitle(col.id, e.target.value)}
                />
                <button className="cms-btn-icon cms-btn-danger" onClick={() => deleteColumn(col.id)} title="Delete Column">
                  ✕
                </button>
              </div>
              <div className="cms-card-body">
                <div className="cms-links-container">
                  {col.links.map((link, idx) => (
                    <div key={link.id} className="cms-footer-link-row">
                      <div className="cms-drag-handle">⋮⋮</div>
                      <div className="cms-link-fields">
                        <input
                          type="text"
                          className="cms-input cms-input-sm"
                          placeholder="Label"
                          value={link.label}
                          onChange={e => updateLink(col.id, link.id, 'label', e.target.value)}
                        />
                        <input
                          type="text"
                          className="cms-input cms-input-sm"
                          placeholder="URL"
                          value={link.href}
                          onChange={e => updateLink(col.id, link.id, 'href', e.target.value)}
                        />
                      </div>
                      <button
                        className="cms-btn-icon cms-btn-danger cms-btn-sm"
                        onClick={() => deleteLink(col.id, link.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                {col.links.length === 0 && (
                  <div className="cms-empty-state-mini">
                    <p>No links yet.</p>
                  </div>
                )}
                <button
                  className="cms-btn-text cms-mt-3"
                  onClick={() => addLink(col.id)}
                >
                  + Add Link
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="cms-col-card">
          <button
            className="cms-add-column-btn"
            onClick={addColumn}
          >
            <span className="cms-add-icon">+</span>
            <span>Add Column</span>
          </button>
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

        .cms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .cms-col-card {
          display: flex;
          flex-direction: column;
        }
        .h-100 { height: 100%; }

        .cms-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .cms-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          background: #fafafa;
          gap: 12px;
        }
        .cms-card-body { 
          padding: 20px; 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
        }
        
        .cms-links-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cms-footer-link-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid #e2e8f0;
          padding: 8px;
          border-radius: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cms-footer-link-row:hover {
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        
        .cms-drag-handle {
          color: #cbd5e1;
          cursor: grab;
          font-size: 1.1rem;
          line-height: 1;
          padding-left: 4px;
        }
        .cms-link-fields {
          display: flex;
          gap: 8px;
          flex: 1;
        }

        .cms-input {
          flex: 1;
          min-width: 80px;
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
          padding: 8px 10px;
          font-size: 0.85rem;
        }
        .cms-input-title {
          font-weight: 600;
          color: #0f172a;
          border-color: transparent;
          background: transparent;
          padding: 6px 10px;
        }
        .cms-input-title:hover {
          background: #f1f5f9;
        }
        .cms-input-title:focus {
          background: #fff;
          border-color: #3b82f6;
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
        .cms-btn-text {
          background: transparent;
          border: none;
          color: #3b82f6;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          align-self: flex-start;
        }
        .cms-btn-text:hover {
          background: #eff6ff;
        }
        .cms-mt-3 { margin-top: 12px; }

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
          flex-shrink: 0;
        }
        .cms-btn-icon:hover {
          background: #fee2e2;
          color: #ef4444;
          border-color: #fca5a5;
        }
        .cms-btn-sm {
          width: 30px;
          height: 30px;
          border-radius: 6px;
        }

        .cms-empty-state-mini {
          text-align: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px dashed #cbd5e1;
          color: #64748b;
          font-size: 0.9rem;
        }

        .cms-add-column-btn {
          min-height: 160px;
          height: 100%;
          border: 2px dashed #cbd5e1;
          border-radius: 16px;
          background: #f8fafc;
          color: #64748b;
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cms-add-column-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background: #eff6ff;
        }
        .cms-add-icon {
          font-size: 2rem;
          line-height: 1;
        }
        
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
