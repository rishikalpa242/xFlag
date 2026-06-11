'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function SchedulesClient({ games, leagues }: { games: any[], leagues: any[] }) {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Group games by date
  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      if (selectedLeague && g.league !== selectedLeague && g.leagueName !== selectedLeague) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!g.teamA?.name?.toLowerCase().includes(q) && !g.teamB?.name?.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [games, selectedLeague, searchQuery]);

  const gamesByDate = useMemo(() => {
    const map = new Map<string, any[]>();
    filteredGames.forEach(g => {
      const dateStr = new Date(g.date).toLocaleDateString();
      if (!map.has(dateStr)) map.set(dateStr, []);
      map.get(dateStr)!.push(g);
    });
    // Sort dates
    return Array.from(map.entries()).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
  }, [filteredGames]);

  return (
    <section className="schedules-section section-padding">
        <div className="container">
            <div className="top-part" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
                <select className="form-select" style={{ maxWidth: '200px' }} value={selectedLeague} onChange={e => setSelectedLeague(e.target.value)}>
                    <option value="">All Leagues</option>
                    {leagues.map((l: any) => (
                      <option key={l._id} value={l.name}>{l.name}</option>
                    ))}
                </select>

                <div className="search-bar" style={{ marginLeft: 'auto' }}>
                    <div className="input-group">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Search teams..." 
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="schedule-body">
                <div className="w-100">
                    <table className="table table-dark table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Date / Time</th>
                                <th>Matchup</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gamesByDate.map(([date, dayGames]) => (
                              <optgroup key={date} label={date} style={{ display: 'contents' }}>
                                {dayGames.map(game => (
                                  <tr key={game._id}>
                                      <td>
                                        <div style={{ fontWeight: 'bold' }}>{game.time}</div>
                                        <div style={{ fontSize: '0.9em', color: '#ccc' }}>{date}</div>
                                      </td>
                                      <td>
                                          <div className="d-flex align-items-center justify-content-center" style={{ gap: '15px' }}>
                                              <div className="text-end" style={{ width: '40%' }}>
                                                  <img src={game.teamA?.logo || '/assets/images/team-placeholder.svg'} alt="" style={{ width: 30, marginRight: 10, verticalAlign: 'middle' }} />
                                                  <span>{game.teamA?.name || 'TBD'}</span>
                                              </div>
                                              <div className="text-center" style={{ width: '20%', fontWeight: 'bold', color: '#ff5a00' }}>
                                                  {game.status === 'completed' ? `${game.teamA?.score ?? 0} - ${game.teamB?.score ?? 0}` : 'vs'}
                                              </div>
                                              <div className="text-start" style={{ width: '40%' }}>
                                                  <img src={game.teamB?.logo || '/assets/images/team-placeholder.svg'} alt="" style={{ width: 30, marginRight: 10, verticalAlign: 'middle' }} />
                                                  <span>{game.teamB?.name || 'TBD'}</span>
                                              </div>
                                          </div>
                                      </td>
                                      <td>{game.locationName || 'TBD'}</td>
                                      <td style={{ textTransform: 'capitalize' }}>
                                        {game.status === 'completed' ? 'Final' : game.status?.replace('_', ' ') || 'Upcoming'}
                                      </td>
                                  </tr>
                                ))}
                              </optgroup>
                            ))}
                            {gamesByDate.length === 0 && (
                              <tr>
                                <td colSpan={4} className="text-center py-4 text-muted">No games scheduled.</td>
                              </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
  );
}
