'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

export default function AdminShell({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
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
    { href: '/admin/logos', label: 'Logos', icon: '◈' },
  ];

  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <div className="cms-sidebar-brand">
          <span className="cms-brand-text">XFlag CMS</span>
        </div>

        <nav className="cms-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`cms-nav-item${pathname === item.href ? ' active' : ''}`}
            >
              <span className="cms-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="cms-sidebar-footer">
          <button className="cms-logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="cms-content">
        {children}
      </main>

      <style>{`
        .cms-shell {
          display: flex;
          min-height: 100vh;
          background: #f0f2f5;
          font-family: Inter, sans-serif;
        }
        .cms-sidebar {
          width: 240px;
          min-width: 240px;
          background: #16162a;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #2a2a45;
        }
        .cms-sidebar-brand {
          padding: 24px 20px;
          border-bottom: 1px solid #2a2a45;
        }
        .cms-brand-text {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .cms-nav {
          flex: 1;
          padding: 12px 0;
        }
        .cms-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          color: #9999bb;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background 0.15s, color 0.15s;
          border-left: 3px solid transparent;
        }
        .cms-nav-item:hover {
          background: #1e1e3a;
          color: #fff;
        }
        .cms-nav-item.active {
          background: #1e1e3a;
          color: #fff;
          border-left-color: #4361ee;
        }
        .cms-nav-icon {
          font-size: 0.9rem;
          opacity: 0.7;
        }
        .cms-sidebar-footer {
          padding: 16px 20px;
          border-top: 1px solid #2a2a45;
        }
        .cms-logout-btn {
          width: 100%;
          background: transparent;
          border: 1px solid #2a2a45;
          color: #9999bb;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.15s;
        }
        .cms-logout-btn:hover {
          background: #2a2a45;
          color: #fff;
        }
        .cms-content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .cms-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
