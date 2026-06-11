import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveLeagues } from '@/lib/flagmag';
import StatsClient from './StatsClient';

export default async function Xstats() {
  const leagues = await getLiveLeagues();

  return (
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
            <div className="container">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li>Xstats</li>
                </ul>
            </div>
        </div>

        <section className="inner-banner-section">
            <div className="image-area">
                <img src="/assets/images/about-banner.jpg" alt="" />
            </div>
            <div className="container">
                <h1>Xstats</h1>
            </div>
        </section>

        <StatsClient leagues={leagues} />

      <Footer />
    </div>
  );
}
