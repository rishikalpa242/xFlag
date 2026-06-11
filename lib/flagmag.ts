'use server';

// Ensure the base URL doesn't have a trailing slash, and append /api for API calls
const BASE_URL = (process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '');
const API_URL = `${BASE_URL}/api`;

// Extract the slug from a full URL if provided, otherwise use the string directly
let rawOrgSlug = process.env.NEXT_PUBLIC_FLAGMAG_ORG_SLUG || 'xflagfootball';
if (rawOrgSlug.includes('/organizations/')) {
  rawOrgSlug = rawOrgSlug.split('/organizations/')[1].split('/')[0];
}
const ORG_SLUG = rawOrgSlug;

/**
 * Fetch the organization details which includes locations and venues.
 */
export async function getLiveOrganization() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Failed to fetch flagmag organization:', error);
    return null;
  }
}

/**
 * Fetch all upcoming and past games for the organization.
 */
export async function getLiveSchedules() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/games`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag games:', error);
    return [];
  }
}

export async function getLiveLeagues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/leagues`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag leagues:', error);
    return [];
  }
}

/**
 * Fetch standings for a specific league.
 */
export async function getLiveStandings(leagueSlug: string) {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/standings`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.divisionGroups || [];
  } catch (error) {
    console.error(`Failed to fetch standings for ${leagueSlug}:`, error);
    return [];
  }
}
