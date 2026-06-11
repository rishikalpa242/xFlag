'use client';

import { useState, useEffect } from 'react';
import { getLiveStandings } from '@/lib/flagmag';

export default function StatsClient({ leagues }: { leagues: any[] }) {
  const [selectedLeague, setSelectedLeague] = useState(leagues[0]?.slug || '');
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedLeague) return;
    setLoading(true);
    getLiveStandings(selectedLeague)
      .then(data => setStandings(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedLeague]);

  return (
    <section className="x-states-section" style={{ minHeight: '60vh', padding: '60px 0' }}>
      <div className="container">
        
        <div className="d-flex flex-wrap gap-2 mb-5">
          {leagues.map(l => (
            <button 
              key={l.slug} 
              className={`btn ${selectedLeague === l.slug ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedLeague(l.slug)}
            >
              {l.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">Loading standings...</div>
        ) : standings.length > 0 ? (
          standings.map((group, i) => (
            <div key={i} className="mb-5">
              {group.name && <h4 className="mb-3 text-white">{group.name}</h4>}
              <div className="table-responsive">
                <table className="table table-dark table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Team</th>
                      <th>W-L</th>
                      <th>Win %</th>
                      <th>PF</th>
                      <th>PA</th>
                      <th>DIFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((team: any, j: number) => (
                      <tr key={j}>
                        <td>
                          <img src={team.logo || '/assets/images/team-placeholder.svg'} alt="" style={{ width: 24, marginRight: 10, verticalAlign: 'middle' }} />
                          {team.name}
                        </td>
                        <td>{team.wins}-{team.losses}</td>
                        <td>{team.wins === 0 && team.losses === 0 ? '-' : team.pct.toFixed(2)}</td>
                        <td>{team.wins === 0 && team.losses === 0 ? '-' : team.pf}</td>
                        <td>{team.wins === 0 && team.losses === 0 ? '-' : team.pa}</td>
                        <td>{team.wins === 0 && team.losses === 0 ? '-' : (team.diff > 0 ? `+${team.diff}` : team.diff)}</td>
                      </tr>
                    ))}
                    {group.rows.length === 0 && (
                      <tr><td colSpan={6} className="text-center text-muted">No teams found in this division.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5 text-muted">Select a league to view standings, or no data available.</div>
        )}

        <div className="banner-area mt-5">
            <div className="mob">
                <img src="/assets/images/states-mob-img.jpg" alt="" />
            </div>
            <div className="content-area">
                <h2>Advanced Stats info</h2>
                <p>Join the advanced stats program comparing overall performances of players and teams.</p>
                <a href="#" className="btn btn-primary">subscribe now</a>
            </div>
        </div>
      </div>
    </section>
  );
}
