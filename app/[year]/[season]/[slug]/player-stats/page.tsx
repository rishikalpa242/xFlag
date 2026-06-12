import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveLeagues } from '@/lib/flagmag';

export default async function PlayerStatsPage({ 
  params,
  searchParams
}: { 
  params: { year: string; season: string; slug: string };
  searchParams: { team?: string };
}) {
  const { year, season, slug } = await params;
  const sParams = await searchParams;
  const teamName = sParams.team || 'All Players';

  // Fetch league info to get the display name
  const leagues = await getLiveLeagues();
  const league = leagues.find((l: any) => l.slug === slug);
  const seasonName = league?.season?.name || 'Current Season';
  const leagueName = league?.name?.replace(seasonName, '').trim() || league?.name || 'League';

  // Helper to fetch computed stats
  const fetchStats = async (type: string) => {
    try {
      const teamParam = teamName === 'All Players' ? '' : encodeURIComponent(teamName);
      const url = `https://flagmag.com/api/organizations/xflagfootball/season/${slug}/stats/computed?team=${teamParam}&statType=${type}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) return [];
      const data = await res.json();
      return data.players || [];
    } catch (e) {
      console.error(`Failed to fetch ${type} stats:`, e);
      return [];
    }
  };

  const [passingStats, receivingStats, rushingStats] = await Promise.all([
    fetchStats('passing'),
    fetchStats('receiving'),
    fetchStats('rushing')
  ]);

  const getPlayerPhoto = (url?: string) => {
    if (!url) return '/assets/images/t1.png'; // Fallback player image from the template
    if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
    return url;
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">xstats</Link></li>
            <li><Link href={`/${year}/${season}/${slug}`}>Point Table</Link></li>
            <li> Player Stats</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="Banner" />
        </div>
        <div className="container">
          <h1>xstats</h1>
        </div>
      </section>

      <section className="team-point-section section-padding">
        <div className="container-fluid">
          <div className="text-center">
            <h2><span>{seasonName}</span> {leagueName} - {teamName}</h2>
          </div>

          <div className="states-table-main">

            {/* Passing Table */}
            <div className="table-wrap">
              <h4>Passing</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>atts</th>
                    <th>comp</th>
                    <th>%</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>PAT</th>
                    <th>INT</th>
                    <th>SACKS</th>
                    <th>RATING</th>
                  </tr>
                </thead> 
                <tbody>
                  {passingStats.length > 0 ? passingStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.atts}</td>
                      <td>{p.comp}</td>
                      <td>{p.pct}</td>
                      <td>{p.yards}</td>
                      <td>{p.tds}</td>
                      <td>{p.pat}</td>
                      <td>{p.ints}</td>
                      <td>{p.sacks}</td>
                      <td>{p.rate}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={13} className="text-center">No passing stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Receiving Table */}
            <div className="table-wrap">
              <h4>Receiving</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>REC</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>PAT</th>
                    <th>Y/R</th>
                  </tr>
                </thead> 
                <tbody>
                  {receivingStats.length > 0 ? receivingStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.receptions}</td>
                      <td>{p.yards}</td>
                      <td>{p.tds}</td>
                      <td>{p.pat}</td>
                      <td>{p.ypr}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={8} className="text-center">No receiving stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Rushing Table */}
            <div className="table-wrap">
              <h4>Rushing</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>PAT</th>
                    <th>Y/C</th>
                    <th>GP</th>
                    <th>AVG/G</th>
                  </tr>
                </thead> 
                <tbody>
                  {rushingStats.length > 0 ? rushingStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.atts}</td>
                      <td>{p.yards}</td>
                      <td>{p.tds}</td>
                      <td>{p.pat}</td>
                      <td>{p.ypc}</td>
                      <td>{p.gamesPlayed}</td>
                      <td>{p.rushAvgPerGame}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={10} className="text-center">No rushing stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
