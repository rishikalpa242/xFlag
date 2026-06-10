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

  if (loading) return <div style={{ padding: 40, color: '#555' }}>Loading…</div>;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', margin: '0 0 4px' }}>
          Logos
        </h1>
        <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
          Upload replacement logos. Accepted formats: JPEG, PNG, WebP, SVG (max 5 MB).
        </p>
      </div>

      <div className="row g-4">
        {logoConfigs.map(logo => (
          <div key={logo.field} className="col-md-6 col-xl-4">
            <LogoCard
              info={logo}
              status={uploadStatus[logo.field] ?? ''}
              onUpload={(file) => handleUpload(logo.field, file)}
            />
          </div>
        ))}
      </div>
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onUpload(file);
  }

  const isUploading = status === 'uploading';
  const isSuccess = status === 'success';
  const isError = status.startsWith('error:');
  const errorText = isError ? status.replace('error:', '') : '';

  const displaySrc = preview ?? (info.currentSrc ? info.currentSrc : null);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 10,
      border: '1px solid #e0e0e0',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
        <h6 style={{ margin: 0, fontWeight: 600, color: '#222' }}>{info.title}</h6>
        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888' }}>{info.description}</p>
      </div>

      <div style={{ padding: 16 }}>
        {/* Logo preview */}
        <div style={{
          background: info.field === 'footerLogo' ? '#1a1a2e' : '#f8f9fa',
          borderRadius: 8,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          border: '1px solid #eee',
        }}>
          {displaySrc ? (
            <img
              src={displaySrc}
              alt={info.title}
              style={{ maxHeight: 80, maxWidth: '90%', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ color: '#aaa', fontSize: '0.85rem' }}>No logo set</span>
          )}
        </div>

        {/* Upload status */}
        {isUploading && (
          <div className="alert alert-info py-1 small mb-2">Uploading…</div>
        )}
        {isSuccess && (
          <div className="alert alert-success py-1 small mb-2">Logo updated!</div>
        )}
        {isError && (
          <div className="alert alert-danger py-1 small mb-2">{errorText}</div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          className="btn btn-outline-primary btn-sm w-100"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Upload New Logo'}
        </button>
      </div>
    </div>
  );
}
