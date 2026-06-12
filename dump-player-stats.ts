async function main() {
  const url = 'https://flagmag.com/api/organizations/xflagfootball/season/beverly-spring-2026/stats/computed?team=Dragons&statType=passing';
  console.log('Fetching', url);
  const res = await fetch(url);
  const data = await res.json();
  console.log('Data:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
