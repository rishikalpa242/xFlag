
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveOrganization } from '@/lib/flagmag';

export default async function Locations() {
  const org = await getLiveOrganization();
  const locations = org?.locations || [];

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>Locations</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>LOCATIONS</h1>
        </div>
      </section>

      <section className="location-search-section">
        <div className="container">
          <div className="location-area">
            <h4>Select Location</h4>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
              <button className="btn btn-primary" type="button" id="search-addon">
                SEARCH <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="xflag-location section-padding">
        <div className="container">
          <h2>XFLAG LOCATIONS</h2>
          <div className="row g-4">
            {locations.length > 0 ? locations.map((loc: any, i: number) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="location-box">
                  <div className="image-area">
                    <img src="/assets/images/location-img.jpg" alt="" />
                  </div>
                  <div className="content-area">
                    <h4>{(loc.locationName || loc.cityName).toUpperCase()}</h4>
                    <p>{loc.cityName}, {loc.stateAbbr}</p>
                    <Link href={`/locations/${loc._id}`}>Details</Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center text-muted py-5">No locations found.</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
