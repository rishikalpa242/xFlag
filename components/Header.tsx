import Link from 'next/link';
import { readCmsData } from '@/lib/cms';

export default async function Header() {
  const cms = await readCmsData();
  const { logo1, logo2, navLinks, ctaButtons } = cms.header;

  return (
    <header className="header">
      <div className="top-header">
          <div className="container-fluid">
              <div className="row justify-content-between align-items-center">
                  <div className="col-auto logo">
                      <Link href="/">
                          <img src={logo1} alt="Logo" />
                          <img src={logo2} alt="Logo" />
                      </Link>
                  </div>

                  <div className="col right-area">
                      <div className="header-btn-col">
                          {ctaButtons.map(btn => (
                            <Link
                              key={btn.id}
                              href={btn.href}
                              className={`btn ${btn.variant === 'info' ? 'btn-info-primary' : 'btn-primary book-btn'}`}
                            >
                              {btn.label}
                            </Link>
                          ))}
                      </div>

                      {/* FOR MOBILE */}
                      <ul className="hdr-mob-area">
                          <li><Link href="#" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search"></i></Link></li>
                          <li><Link href="#"><i className="fas fa-user"></i></Link></li>
                          <li>
                              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                                  <i className="fa-solid fa-bars-staggered"></i>
                              </button>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <div className="nav-area-main">
          <div className="container-fluid">
              <div className="row">
                  <nav className="navbar navbar-expand-lg">
                      {/* Desktop Menu */}
                      <div className="collapse navbar-collapse d-none d-lg-flex">
                          <ul className="navbar-nav">
                              {navLinks.map(link => (
                                link.dropdown.length > 0 ? (
                                  <li key={link.id} className="nav-item dropdown">
                                      <Link className="nav-link dropdown-toggle" href={link.href} data-bs-toggle="dropdown">
                                        {link.label}
                                      </Link>
                                      <ul className="dropdown-menu">
                                          {link.dropdown.map(sub => (
                                            <li key={sub.id}>
                                              <Link className="dropdown-item" href={sub.href}>{sub.label}</Link>
                                            </li>
                                          ))}
                                      </ul>
                                  </li>
                                ) : (
                                  <li key={link.id} className="nav-item">
                                    <Link className="nav-link" href={link.href}>{link.label}</Link>
                                  </li>
                                )
                              ))}
                          </ul>
                      </div>

                      {/* Mobile Offcanvas */}
                      <div className="offcanvas offcanvas-end d-lg-none" tabIndex={-1} id="mobileMenu">
                          <div className="offcanvas-header">
                              <div className="offcanvas-logo"><img src={logo2} alt="" /></div>
                              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                          </div>
                          <div className="offcanvas-body">
                              <ul className="navbar-nav">
                                  {navLinks.map(link => (
                                    link.dropdown.length > 0 ? (
                                      <li key={link.id} className="nav-item dropdown">
                                          <Link className="nav-link dropdown-toggle" href={link.href} data-bs-toggle="dropdown">
                                            {link.label}
                                          </Link>
                                          <ul className="dropdown-menu">
                                              {link.dropdown.map(sub => (
                                                <li key={sub.id}>
                                                  <Link className="dropdown-item" href={sub.href}>{sub.label}</Link>
                                                </li>
                                              ))}
                                          </ul>
                                      </li>
                                    ) : (
                                      <li key={link.id} className="nav-item">
                                        <Link className="nav-link" href={link.href}>{link.label}</Link>
                                      </li>
                                    )
                                  ))}
                              </ul>

                              <div className="header-btn-col for-mobile">
                                  {ctaButtons.map(btn => (
                                    <Link key={btn.id} href={btn.href} className="btn btn-info-primary">{btn.label}</Link>
                                  ))}
                                  <Link href="#"><img src="/assets/images/mob-xflag-btn.png" alt="" /></Link>
                              </div>

                              <div className="social">
                                  <h5>Follow Us on</h5>
                                  <ul>
                                      <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                      <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                      <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </nav>

                  <div className="right-part">
                      <ul className="social-icon">
                          <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                          <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                          <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                          <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li>
                      </ul>

                      <div className="search-bar">
                          <div className="input-group">
                              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                              <button className="" type="button" id="search-addon">
                                  <i className="fas fa-search"></i>
                              </button>
                          </div>
                      </div>

                      <div className="flagmag-button">
                          <Link href="#"><img src="/assets/images/flagmag-btn.png" alt="" /></Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </header>
  );
}
