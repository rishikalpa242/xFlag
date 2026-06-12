import { getLiveSchedules, getLiveLeagues } from './lib/flagmag';

async function main() {
  const leagues = await getLiveLeagues();
  const beverly = leagues.find((l: any) => l.slug === 'beverly-spring-2026');
  
  if (!beverly) {
    console.log("League not found");
    return;
  }
  
  const schedules = await getLiveSchedules();
  const leagueSchedules = schedules.filter((s: any) => s.league === beverly._id);
  
  console.log("Schedules Count:", leagueSchedules.length);
  if (leagueSchedules.length > 0) {
    console.log("Sample Schedule:", JSON.stringify(leagueSchedules[0], null, 2));
    console.log("Sample Schedule 2:", JSON.stringify(leagueSchedules[1], null, 2));
  }
}

main().catch(console.error);
