'use client';

import { useState, useMemo, useEffect, Fragment } from 'react';

export default function SchedulesClient({ games, leagues }: { games: any[], leagues: any[] }) {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Filter games based on search and league
  const filteredGames = useMemo(() => {
    return games.filter((g: any) => {
      if (selectedLeague && g.league !== selectedLeague && g.leagueName !== selectedLeague) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!g.teamA?.name?.toLowerCase().includes(q) && !g.teamB?.name?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [games, selectedLeague, searchQuery]);

  // Sort games by date and time
  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return (a.time || '').localeCompare(b.time || '');
    });
  }, [filteredGames]);

  // Group into weeks (7-day buckets from the earliest game)
  const { weeks, weekCount } = useMemo(() => {
    if (sortedGames.length === 0) return { weeks: new Map(), weekCount: 0 };
    const firstDate = new Date(sortedGames[0].date);
    firstDate.setHours(0, 0, 0, 0);
    const map = new Map<number, any[]>();
    sortedGames.forEach((g: any) => {
      const d = new Date(g.date);
      d.setHours(0, 0, 0, 0);
      const diff = Math.floor((d.getTime() - firstDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekNum = diff + 1;
      if (!map.has(weekNum)) map.set(weekNum, []);
      map.get(weekNum)!.push(g);
    });
    return { weeks: map, weekCount: map.size };
  }, [sortedGames]);

  // Extract locations for the current week
  const weekGames = weeks.get(selectedWeek) || [];
  const locations = useMemo(() => {
    const locs = new Set<string>();
    weekGames.forEach((g: any) => {
      if (g.location) locs.add(g.location);
    });
    return Array.from(locs);
  }, [weekGames]);

  // Auto-select first location if none is selected
  useEffect(() => {
    if ((!selectedLocation || !locations.includes(selectedLocation)) && locations.length > 0) {
      setSelectedLocation(locations[0]);
    }
  }, [locations, selectedLocation]);

  // Games for current week AND selected location
  const currentViewGames = useMemo(() => {
    if (!selectedLocation) return [];
    return weekGames.filter((g: any) => g.location === selectedLocation);
  }, [weekGames, selectedLocation]);

  // Group games by Exact Date + Time
  const gamesByDateTime = useMemo(() => {
    const map = new Map<string, any[]>();
    currentViewGames.forEach((g: any) => {
      const dateStr = new Date(g.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
      const timeStr = g.time || 'TBD';
      const key = `${timeStr}__${dateStr}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(g);
    });
    return Array.from(map.entries());
  }, [currentViewGames]);

  const weekNumbers = Array.from({ length: weekCount }, (_, i) => i + 1);

  return (
    <section className="schedules-section section-padding">
      <div className="container">

        {/* Top filter bar */}
        <div className="top-part" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
          <select defaultValue="" className="form-select" style={{ maxWidth: '180px', backgroundColor: '#231F20', color: '#fff', border: 'none' }}>
            <option value="" disabled>States</option>
          </select>
          <select
            className="form-select"
            style={{ maxWidth: '180px', backgroundColor: '#231F20', color: '#fff', border: 'none' }}
            value={selectedLeague}
            onChange={e => setSelectedLeague(e.target.value)}
          >
            <option value="">Leagues</option>
            {leagues.map((l: any) => (
              <option key={l._id} value={l.name}>{l.name}</option>
            ))}
          </select>
          <select defaultValue="" className="form-select" style={{ maxWidth: '180px', backgroundColor: '#231F20', color: '#fff', border: 'none' }}>
            <option value="" disabled>All teams</option>
          </select>

          <div className="search-bar" style={{ marginLeft: 'auto', minWidth: '250px' }}>
            <div className="input-group" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ border: 'none', boxShadow: 'none' }}
              />
              <button className="btn" type="button" style={{ background: 'transparent', border: 'none', color: '#888' }}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Main body */}
        <div className="schedule-body" style={{ display: 'flex', background: '#fff', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>

          {/* LEFT — Week sidebar */}
          <div className="left-side" style={{ width: '200px', backgroundColor: '#000', padding: '20px 0', minHeight: '400px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {weekNumbers.length > 0 ? weekNumbers.map(w => (
                <li key={w} style={{ padding: '0 20px', marginBottom: '15px' }}>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); setSelectedWeek(w); setSelectedLocation(null); }}
                    style={{
                      color: selectedWeek === w ? '#fff' : '#888',
                      fontWeight: selectedWeek === w ? 700 : 400,
                      textDecoration: 'none',
                      textTransform: 'lowercase',
                      fontSize: '15px',
                      display: 'block'
                    }}
                  >
                    week {w}
                  </a>
                </li>
              )) : (
                <li style={{ padding: '0 20px' }}><span style={{ color: '#888', fontSize: '14px' }}>No games</span></li>
              )}
            </ul>
          </div>

          {/* RIGHT — Schedule table */}
          <div className="right-side" style={{ flex: 1, padding: '20px' }}>
            
            {/* Location Tabs */}
            <div className="state-carousel-area" style={{ display: 'flex', gap: '5px', background: '#f5f5f5', padding: '5px', borderRadius: '4px', marginBottom: '20px', alignItems: 'center' }}>
              <button style={{ border: 'none', background: '#666', color: '#fff', padding: '5px 15px', borderRadius: '4px' }}>&lt;</button>
              <div style={{ flex: 1, display: 'flex', gap: '2px', overflowX: 'auto', justifyContent: 'space-around' }}>
                {locations.length > 0 ? locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    style={{
                      border: 'none',
                      background: selectedLocation === loc ? '#fff' : 'transparent',
                      color: selectedLocation === loc ? '#000' : '#888',
                      fontWeight: selectedLocation === loc ? 800 : 600,
                      padding: '10px 20px',
                      textTransform: 'uppercase',
                      fontSize: '13px',
                      borderRadius: '4px',
                      boxShadow: selectedLocation === loc ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                    }}
                  >
                    {loc}
                  </button>
                )) : (
                  <div style={{ padding: '10px', color: '#888', fontSize: '13px', fontWeight: 600 }}>NO LOCATIONS FOR WEEK {selectedWeek}</div>
                )}
              </div>
              <button style={{ border: 'none', background: '#666', color: '#fff', padding: '5px 15px', borderRadius: '4px' }}>&gt;</button>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="table" style={{ borderCollapse: 'collapse', width: '100%', minWidth: '800px', border: '1px solid #eee' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, padding: '15px', background: '#f9f9f9', color: '#231F20', width: '120px' }}>date/time</th>
                    <th style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, padding: '15px', background: '#f9f9f9', color: '#231F20', textAlign: 'center' }}>field 1</th>
                    <th style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, padding: '15px', background: '#f9f9f9', color: '#231F20', textAlign: 'center' }}>field 2</th>
                    <th style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, padding: '15px', background: '#f9f9f9', color: '#231F20', textAlign: 'center' }}>field 3</th>
                  </tr>
                </thead>
                <tbody>
                  {gamesByDateTime.map(([dateTimeKey, slotGames]) => {
                    const [time, date] = dateTimeKey.split('__');
                    // We map up to 3 games for Field 1, Field 2, Field 3
                    const g1 = slotGames[0];
                    const g2 = slotGames[1];
                    const g3 = slotGames[2];

                    const getLogoUrl = (url?: string) => {
                      if (!url) return '/assets/images/team-placeholder.svg';
                      if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
                      return url;
                    };

                    const renderGameCell = (game: any) => {
                      if (!game) return <td style={{ border: '1px solid #eee' }}></td>;
                      return (
                        <td style={{ border: '1px solid #eee', padding: '15px 10px', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
                            <div style={{ textAlign: 'center', width: '40%' }}>
                              <img src={getLogoUrl(game.teamA?.logo)} style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '5px' }} alt="" />
                              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', lineHeight: 1.2 }}>
                                {game.teamA?.name || 'TBD'}
                              </span>
                            </div>
                            <div style={{ fontWeight: 700, color: '#F13B26', fontSize: '14px', whiteSpace: 'nowrap' }}>
                              {game.status === 'completed' ? `${game.teamA?.score ?? 0} - ${game.teamB?.score ?? 0}` : <span style={{ fontSize: '12px', padding: '3px 8px', border: '1px solid #eee', borderRadius: '4px', color: '#888', background: '#fbfbfb' }}>vs</span>}
                            </div>
                            <div style={{ textAlign: 'center', width: '40%' }}>
                              <img src={getLogoUrl(game.teamB?.logo)} style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '5px' }} alt="" />
                              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', lineHeight: 1.2 }}>
                                {game.teamB?.name || 'TBD'}
                              </span>
                            </div>
                          </div>
                        </td>
                      );
                    };

                    return (
                      <tr key={dateTimeKey} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '15px', border: '1px solid #eee', fontSize: '12px', color: '#231F20', fontWeight: 600, verticalAlign: 'middle' }}>
                          <div style={{ marginBottom: '4px' }}>{time}</div>
                          <div style={{ color: '#888', fontWeight: 400 }}>{date}</div>
                        </td>
                        {renderGameCell(g1)}
                        {renderGameCell(g2)}
                        {renderGameCell(g3)}
                      </tr>
                    );
                  })}
                  {gamesByDateTime.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        No games scheduled for {selectedLocation || 'this location'}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
