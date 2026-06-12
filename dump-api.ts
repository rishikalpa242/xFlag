import { getLiveStandings, getLiveSchedules, getLiveLeagues } from './lib/flagmag';

async function main() {
  const leagues = await getLiveLeagues();
  const beverly = leagues.find((l: any) => l.slug === 'beverly-spring-2026');
  console.log('League:', JSON.stringify(beverly, null, 2));

  const standings = await getLiveStandings('beverly-spring-2026');
  console.log('Standings:', JSON.stringify(standings, null, 2));

  const schedules = await getLiveSchedules();
  const beverlySchedules = schedules.filter((s: any) => s.league === beverly?._id);
  console.log('Schedules count:', beverlySchedules.length);
  if (beverlySchedules.length > 0) {
    console.log('Sample Schedule:', JSON.stringify(beverlySchedules[0], null, 2));
  }
}

main().catch(console.error);
