'use client';

import { useState, useEffect, useRef } from 'react';

interface LogoInfo {
  field: 'logo1' | 'logo2' | 'footerLogo';
  title: string;
  description: string;
  currentSrc: string;
}

interface CmsHeaderFooter {
  logo1: string;
  logo2: string;
  footerLogo: string;
}

export default function LogosAdminPage() {
  const [logos, setLogos] = useState<CmsHeaderFooter>({ logo1: '', logo2: '', footerLogo: '' });
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadLogos() {
      try {
        const [hRes, fRes] = await Promise.all([
          fetch('/api/cms/header').then(r => r.json()) as Promise<{ success: boolean; data: { logo1: string; logo2: string } }>,
          fetch('/api/cms/footer').then(r => r.json()) as Promise<{ success: boolean; data: { logo: string } }>,
        ]);
        setLogos({
          logo1: hRes.data?.logo1 ?? '',
          logo2: hRes.data?.logo2 ?? '',
          footerLogo: fRes.data?.logo ?? '',
        });
      } catch {
        // ignore — empty defaults are fine
      } finally {
        setLoading(false);
      }
    }
    loadLogos();
  }, []);

  async function handleUpload(field: 'logo1' | 'logo2' | 'footerLogo', file: File) {
    setUploadStatus(prev => ({ ...prev, [field]: 'uploading' }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field);

    try {
      const res = await fetch('/api/cms/logos', { method: 'POST', body: formData });
      const result = await res.json() as { success: boolean; data?: { path: string }; error?: string };

      if (result.success && result.data) {
        setLogos(prev => ({ ...prev, [field]: result.data!.path }));
        setUploadStatus(prev => ({ ...prev, [field]: 'success' }));
        setTimeout(() => setUploadStatus(prev => ({ ...prev, [field]: '' })), 3000);
      } else {
        setUploadStatus(prev => ({ ...prev, [field]: `error:${result.error ?? 'Upload failed'}` }));
      }
    } catch {
      setUploadStatus(prev => ({ ...prev, [field]: 'error:Network error' }));
    }
  }

  const logoConfigs: LogoInfo[] = [
    {
      field: 'logo1',
      title: 'Header Logo 1',
      description: 'Left logo in the top header bar (displayed on desktop).',
      currentSrc: logos.logo1,
    },
    {
      field: 'logo2',
      title: 'Header Logo 2',
      description: 'Right/secondary logo in the top header bar, also used in the mobile menu.',
      currentSrc: logos.logo2,
    },
    {
      field: 'footerLogo',
      title: 'Footer Logo',
      description: 'Logo displayed in the footer (typically the white/light version).',
      currentSrc: logos.footerLogo,
    },
  ];

  if (loading) return <div className="cms-page-loading">Loading…</div>;

  return (
    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Logos</h1>
          <p className="cms-page-desc">
            Upload replacement logos. Accepted formats: JPEG, PNG, WebP, SVG (max 5 MB).
          </p>
        </div>
      </div>

      <div className="cms-grid">
        {logoConfigs.map(logo => (
          <div key={logo.field} className="cms-col-card">
            <LogoCard
              info={logo}
              status={uploadStatus[logo.field] ?? ''}
              onUpload={(file) => handleUpload(logo.field, file)}
            />
          </div>
        ))}
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
        
        .cms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .cms-col-card {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

function LogoCard({
  info,
  status,
  onUpload,
}: {
  info: LogoInfo;
  status: string;
  onUpload: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onUpload(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onUpload(file);
    }
  }

  const isUploading = status === 'uploading';
  const isSuccess = status === 'success';
  const isError = status.startsWith('error:');
  const errorText = isError ? status.replace('error:', '') : '';

  const displaySrc = preview ?? (info.currentSrc ? info.currentSrc : null);

  return (
    <div className="cms-logo-card">
      <div className="cms-logo-card-header">
        <div className="cms-logo-title-wrap">
          <span className="cms-logo-icon">🖼️</span>
          <h6>{info.title}</h6>
        </div>
        <p>{info.description}</p>
      </div>

      <div className="cms-logo-card-body">
        {/* Upload status overlay / badges */}
        <div className="cms-logo-status-container">
          {isUploading && <span className="cms-badge cms-badge-info">Uploading...</span>}
          {isSuccess && <span className="cms-badge cms-badge-success">✓ Updated</span>}
          {isError && <span className="cms-badge cms-badge-error">⚠ {errorText}</span>}
        </div>

        <div 
          className={`cms-logo-dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{ background: info.field === 'footerLogo' ? '#0f172a' : '#f8fafc' }}
        >
          {displaySrc ? (
            <div className="cms-logo-preview-wrap">
              <img
                src={displaySrc}
                alt={info.title}
                className="cms-logo-preview-img"
              />
              <div className="cms-logo-hover-overlay">
                <span>Click or drop to replace</span>
              </div>
            </div>
          ) : (
            <div className="cms-logo-empty">
              <span className="cms-upload-icon">☁️</span>
              <p>Click or drop file here</p>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          className="cms-btn cms-btn-outline w-100"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Browse Files'}
        </button>
      </div>

      <style>{`
        .cms-logo-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .cms-logo-card-header {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          background: #fafafa;
        }
        .cms-logo-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .cms-logo-icon {
          font-size: 1.2rem;
        }
        .cms-logo-card-header h6 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
        }
        .cms-logo-card-header p {
          margin: 0;
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.4;
        }
        
        .cms-logo-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .cms-logo-status-container {
          min-height: 28px;
          margin-bottom: 12px;
          display: flex;
          justify-content: flex-end;
        }
        .cms-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
        }
        .cms-badge-info { background: #eff6ff; color: #2563eb; }
        .cms-badge-success { background: #ecfdf5; color: #059669; }
        .cms-badge-error { background: #fef2f2; color: #dc2626; }

        .cms-logo-dropzone {
          border-radius: 12px;
          border: 2px dashed #cbd5e1;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .cms-logo-dropzone:hover, .cms-logo-dropzone.dragging {
          border-color: #3b82f6;
        }
        .cms-logo-dropzone.dragging {
          background: #eff6ff !important;
        }
        
        .cms-logo-preview-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          position: relative;
        }
        .cms-logo-preview-img {
          max-height: 100px;
          max-width: 90%;
          object-fit: contain;
          transition: transform 0.2s;
        }
        .cms-logo-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cms-logo-hover-overlay span {
          color: white;
          font-weight: 500;
          font-size: 0.9rem;
          background: rgba(255,255,255,0.2);
          padding: 6px 14px;
          border-radius: 20px;
        }
        .cms-logo-dropzone:hover .cms-logo-hover-overlay {
          opacity: 1;
        }
        
        .cms-logo-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
        }
        .cms-upload-icon {
          font-size: 2rem;
          opacity: 0.6;
        }
        .cms-logo-empty p {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 500;
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
        .cms-btn-outline {
          background: transparent;
          border: 1px solid #cbd5e1;
          color: #475569;
        }
        .cms-btn-outline:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #1e293b;
        }
        .w-100 { width: 100%; }
      `}</style>
    </div>
  );
}
