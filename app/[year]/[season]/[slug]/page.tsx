import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveLeagues, getLiveStandings, getLiveSchedules } from '@/lib/flagmag';

export default async function GameStatsPage({ params }: { params: { year: string; season: string; slug: string } }) {
  const { year, season, slug } = await params;

  const [leagues, standings, schedules] = await Promise.all([
    getLiveLeagues(),
    getLiveStandings(slug),
    getLiveSchedules(),
  ]);

  const league = leagues.find((l: any) => l.slug === slug);
  const leagueSchedules = schedules.filter((s: any) => s.league === league?._id);

  // Create a quick lookup for Team W-L records from the standings data
  const teamRecords: Record<string, string> = {};
  standings.forEach((div: any) => {
    div.rows.forEach((row: any) => {
      teamRecords[row.name] = `${row.wins}-${row.losses}`;
    });
  });

  // Group schedules by date
  const gamesByDate = leagueSchedules.reduce((acc: any, game: any) => {
    // Attempt to format the date nicely
    const dateObj = new Date(game.date);
    const dateString = isNaN(dateObj.getTime()) 
      ? game.date 
      : dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    
    if (!acc[dateString]) acc[dateString] = [];
    acc[dateString].push(game);
    return acc;
  }, {});

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team1.png';
    if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
    return url;
  };

  const seasonName = league?.season?.name || 'Current Season';
  const leagueName = league?.name?.replace(seasonName, '').trim() || league?.name || 'League';

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">xstats</Link></li>
            <li> Point Table</li>
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

      {/* Point Table Section */}
      <section className="team-point-section section-padding bg-light-gray">
        <div className="container-fluid">
          <div className="text-center">
            <h2><span>{seasonName}</span> {leagueName}</h2>
            <h3 className="design1"><Link href="#">seasons Statistical Leaders <span>view</span></Link></h3>
          </div>

          <div className={`row g-2 ${standings.length === 1 ? 'justify-content-center' : ''}`}>
            {standings.length > 0 ? (
              standings.map((division: any, dIdx: number) => (
                <div className="col-lg-6" key={dIdx}>
                  <div className="division-table-area">
                    <div className="table-wrap">
                      {division.name && <h4>#{division.name}</h4>}
                      <table className="table">
                        <thead>
                          <tr>
                            <th>TEAM</th>
                            <th>W-L</th>
                            <th>%</th>
                            <th>PF</th>
                            <th>PA</th>
                            <th>+/-</th>
                          </tr>
                        </thead>
                        <tbody>
                          {division.rows.map((row: any, rIdx: number) => (
                            <tr key={rIdx}>
                              <td>
                                <Link href={`/${year}/${season}/${slug}/player-stats?team=${encodeURIComponent(row.name)}`}>
                                  <img src={getLogoUrl(row.logo)} alt={row.name} /> {row.name}
                                </Link>
                              </td>
                              <td>{row.wins}-{row.losses}</td>
                              <td>{row.pct?.toFixed(2) || '0.00'}</td>
                              <td>{row.pf}</td>
                              <td>{row.pa}</td>
                              <td>{row.diff}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p>No standings data available for this league yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Games Table Section */}
      <section className="team-point-section section-padding game-table-section">
        <div className="container-fluid">
          <div className="text-center">
            <h2>Games</h2>
          </div>

          <div className="row gx-2 gy-4">
            {Object.keys(gamesByDate).length > 0 ? (
              Object.keys(gamesByDate).map((dateKey: string, dIdx: number) => (
                <div className="col-lg-6" key={dIdx}>
                  <div className="division-table-area game-table">
                    <div className="table-wrap">
                      <h4>{dateKey}</h4>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Point</th>
                            <th>team</th>
                            <th></th>
                            <th>Point</th>
                            <th>team</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gamesByDate[dateKey].map((game: any, gIdx: number) => (
                            <tr key={gIdx}>
                              <td>{game.teamA?.score !== undefined ? game.teamA.score : '-'}</td>
                              <td>
                                <Link href={`/${year}/${season}/${slug}/player-stats?team=${encodeURIComponent(game.teamA?.name || '')}`}>
                                  <img src={getLogoUrl(game.teamA?.logo)} alt={game.teamA?.name} /> {game.teamA?.name}
                                </Link>
                              </td>
                              <td><span className="vs">vs</span></td>
                              <td>{game.teamB?.score !== undefined ? game.teamB.score : '-'}</td>
                              <td>
                                <Link href={`/${year}/${season}/${slug}/player-stats?team=${encodeURIComponent(game.teamB?.name || '')}`}>
                                  <img src={getLogoUrl(game.teamB?.logo)} alt={game.teamB?.name} /> {game.teamB?.name}
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p>No games scheduled yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
