'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

export default function AdminShell({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (
    pathname === '/admin/login' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password'
  ) {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '⬛' },
    { href: '/admin/header', label: 'Header Nav', icon: '☰' },
    { href: '/admin/footer', label: 'Footer Nav', icon: '☷' },
    { href: '/admin/homepage', label: 'Homepage', icon: '⌂' },
    { href: '/admin/logos', label: 'Logos', icon: '◈' },
    { href: '/admin/change-password', label: 'Change Password', icon: '🔐' },
  ];

  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <div className="cms-sidebar-brand" style={{ padding: '24px 24px 16px' }}>
          <Link href="/" title="Return to Main Website" style={{ display: 'block', width: '100%' }}>
            <img src="/assets/images/logo2.png" alt="XFlag" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>

        <div className="cms-nav-section-title">MANAGEMENT</div>
        <nav className="cms-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`cms-nav-item${pathname === item.href ? ' active' : ''}`}
            >
              <span className="cms-nav-icon">{item.icon}</span>
              <span className="cms-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="cms-sidebar-footer">
          <button className="cms-logout-btn" onClick={handleLogout}>
            <span className="cms-nav-icon">⎋</span>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="cms-content-wrapper">
        <header className="cms-topbar">
          <div className="cms-topbar-breadcrumb">
            Dashboard <span className="text-muted mx-2">/</span> {navItems.find(i => i.href === pathname)?.label || 'Overview'}
          </div>
        </header>
        <div className="cms-content">
          {children}
        </div>
      </main>

      <style>{`
        .cms-shell {
          display: flex;
          min-height: 100vh;
          background: #f4f7f9;
          font-family: 'Inter', system-ui, sans-serif;
          color: #334155;
        }
        .cms-sidebar {
          width: 260px;
          min-width: 260px;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #1e293b;
          box-shadow: 4px 0 24px rgba(0,0,0,0.05);
          z-index: 10;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .cms-sidebar-brand {
          padding: 32px 24px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cms-brand-logo-placeholder {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .cms-brand-text {
          color: #f8fafc;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .cms-nav-section-title {
          padding: 0 24px;
          margin-top: 16px;
          margin-bottom: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 1px;
        }
        .cms-nav {
          flex: 1;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cms-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .cms-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: #e2e8f0;
        }
        .cms-nav-item.active {
          background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15));
          color: #38bdf8;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
        }
        .cms-nav-icon {
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        }
        .cms-nav-item.active .cms-nav-icon {
          color: #38bdf8;
        }
        .cms-sidebar-footer {
          padding: 24px 16px;
          margin-top: auto;
        }
        .cms-logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: #94a3b8;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cms-logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.2);
        }
        .cms-content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .cms-topbar {
          height: 72px;
          min-height: 72px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          padding: 0 40px;
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .cms-topbar-breadcrumb {
          font-size: 0.9rem;
          font-weight: 500;
          color: #64748b;
        }
        .cms-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .cms-sidebar { display: none; }
          .cms-topbar { padding: 0 20px; }
          .cms-content { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
