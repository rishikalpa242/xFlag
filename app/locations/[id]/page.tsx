
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveOrganization } from '@/lib/flagmag';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LocationDetail({ params }: Props) {
  const { id } = await params;
  const org = await getLiveOrganization();
  const locations: any[] = org?.locations || [];
  const loc = locations.find((l: any) => l._id === id);

  if (!loc) return notFound();

  const locationName = loc.locationName || `${loc.cityName}, ${loc.stateAbbr}`;
  const address = [loc.cityName, loc.countyName, loc.stateName].filter(Boolean).join(', ');

  const galleryImages = [
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
    '/assets/images/location-img.jpg',
  ];

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/locations">Locations</Link></li>
            <li>{locationName}</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>{locationName}</h1>
        </div>
      </section>

      <section className="location-gallery contactus-section section-padding">
        <div className="container">

          {/* Gallery Grid */}
          <div className="row g-4">
            <div className="col-12 mb-4">
              <div className="text-center">
                <h2 className="location-gallery-title">Gallery</h2>
              </div>
            </div>
            {galleryImages.map((img, i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="gallery-box">
                  <a data-fancybox="gallery" href={img}>
                    <img src={img} alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info & Facilities */}
          <div className="row g-4 mt-5">
            <div className="col-lg-6">
              <div className="contact-area-wrap">
                <div className="contact-area">
                  <h2>contact info</h2>
                  <ul>
                    <li>
                      <span><i className="fa-solid fa-map-location-dot"></i></span>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">Directions</a>
                    </li>
                    <li>
                      <span><i className="fa-solid fa-phone"></i></span>
                      <a href="#">0123-456-789</a>
                    </li>
                    <li>
                      <span><i className="fa-solid fa-envelope"></i></span>
                      <a href="#">mzimmerman@xflagfootball.com</a>
                    </li>
                    <li>
                      <span><i className="fa-solid fa-location-dot"></i></span>
                      {address}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-area-wrap">
                <div className="contact-area">
                  <h2>facilities</h2>
                  <ul>
                    <li><span>01</span><b className="facility-text">Athlete &amp; Team Facilities</b></li>
                    <li><span>02</span><b className="facility-text">Spectator Amenities</b></li>
                    <li><span>03</span><b className="facility-text">Operational &amp; Media Infrastructure</b></li>
                    <li><span>04</span><b className="facility-text">Safety &amp; Technology</b></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
