'use client';

import { useState, useMemo } from 'react';

export default function StatsClient({ leagues }: { leagues: any[] }) {
  const availableYears = useMemo(() => {
    const ySet = new Set<string>();
    leagues.forEach(l => {
      const seasonName = l.season?.name || '';
      const yrMatch = seasonName.match(/\d{4}/)?.[0];
      if (yrMatch) ySet.add(yrMatch);
    });
    const sorted = Array.from(ySet).sort((a, b) => b.localeCompare(a));
    return sorted.length > 0 ? sorted : ['2026'];
  }, [leagues]);

  const [selectedYear, setSelectedYear] = useState<string>(availableYears[0]);

  const availableSeasons = useMemo(() => {
    const sSet = new Set<string>();
    leagues.forEach(l => {
      const seasonName = l.season?.name || '';
      const yrMatch = seasonName.match(/\d{4}/)?.[0] || '';
      if (yrMatch === selectedYear) {
         const szName = seasonName.replace(/\d{4}/g, '').trim();
         if (szName) sSet.add(szName);
      }
    });
    const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall', 'Holiday'];
    return Array.from(sSet).sort((a, b) => {
      const idxA = seasonOrder.indexOf(a);
      const idxB = seasonOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      return a.localeCompare(b);
    });
  }, [leagues, selectedYear]);

  const [selectedSeason, setSelectedSeason] = useState<string>(availableSeasons[0] || 'Summer');

  // If availableSeasons changes (e.g. year changes) and current selection is invalid, pick the first
  if (availableSeasons.length > 0 && !availableSeasons.includes(selectedSeason)) {
    setSelectedSeason(availableSeasons[0]);
  }

  // Filter leagues matching selected Year and Season
  const filteredLeagues = useMemo(() => {
    if (!selectedYear || !selectedSeason) return [];
    return leagues.filter(l => {
      const seasonName = l.season?.name || '';
      const yrMatch = seasonName.match(/\d{4}/)?.[0] || '';
      const szName = seasonName.replace(/\d{4}/g, '').trim();
      return yrMatch === selectedYear && szName.toLowerCase() === selectedSeason.toLowerCase();
    });
  }, [leagues, selectedYear, selectedSeason]);

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team1.png';
    if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
    return url;
  };

  return (
    <section className="x-states-section">
      <div className="container">
        
        {/* YEARS */}
        <ul className="years-item">
          {availableYears.map(y => (
            <li key={y}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setSelectedYear(y); }}
                style={selectedYear === y ? { background: '#231f20', color: '#fff' } : undefined}
              >
                {y}
              </a>
            </li>
          ))}
        </ul>

        {/* SEASONS */}
        <ul className="seasons-item">
          {availableSeasons.map(s => (
            <li key={s}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setSelectedSeason(s); }}
                style={selectedSeason === s ? { background: '#F13B26', color: '#fff' } : undefined}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="design1">
          <a href="#">seasons Statistical Leaders <span>view</span></a>
        </h3>

        {/* LEAGUES / LOCATIONS GRID */}
        <ul className="seasons-team-list">
          {filteredLeagues.map(league => (
            <li 
              key={league._id}
              style={{ cursor: 'pointer' }}
              onClick={() => window.location.href = `/${selectedYear}/${selectedSeason.toLowerCase()}/${league.slug}`}
            >
              <div className="lf">
                <img src={getLogoUrl(league.image)} alt={league.name} />
              </div>
              <div className="rt">
                <h5>{league.name}</h5>
                <span><i className="fas fa-location-dot"></i> {league.location || 'New York, NY'}</span>
              </div>
            </li>
          ))}
        </ul>

        {filteredLeagues.length === 0 && (
          <div className="text-center py-5 text-muted" style={{ marginBottom: '50px' }}>
            No leagues found for {selectedSeason} {selectedYear}.
          </div>
        )}

        <div className="banner-area">
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
