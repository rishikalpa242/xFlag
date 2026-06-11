import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { connection } from 'next/server';
import type { CmsData } from './types';

const CMS_FILE = path.join(process.cwd(), 'data', 'cms.json');

const DEFAULT_CMS: CmsData = {
  header: {
    logo1: '/assets/images/logo1.png',
    logo2: '/assets/images/logo2.png',
    navLinks: [
      { id: 'nav-1', label: 'Home', href: '/', dropdown: [] },
      {
        id: 'nav-2',
        label: 'About',
        href: '/about-us',
        dropdown: [
          { id: 'nav-2-1', label: 'Our Team', href: '/about-us' },
          { id: 'nav-2-2', label: 'Our Story', href: '/about-us' },
        ],
      },
      { id: 'nav-3', label: 'Locations', href: '/locations', dropdown: [] },
      { id: 'nav-4', label: 'Schedules', href: '/schedules', dropdown: [] },
      { id: 'nav-5', label: 'XStats', href: '/xstats', dropdown: [] },
      { id: 'nav-6', label: 'Shop Now', href: '#', dropdown: [] },
      { id: 'nav-7', label: 'Resources', href: '/resources', dropdown: [] },
    ],
    ctaButtons: [
      { id: 'cta-1', label: 'National Tournament', href: '#', variant: 'primary' },
      { id: 'cta-2', label: 'Youth Flag Football', href: '#', variant: 'info' },
      { id: 'cta-3', label: 'My Account', href: '#', variant: 'primary' },
    ],
  },
  footer: {
    logo: '/assets/images/white-logo.png',
    navColumns: [
      {
        id: 'col-1',
        title: 'Home',
        links: [
          { id: 'fc-1-1', label: 'XStats', href: '/xstats' },
          { id: 'fc-1-2', label: 'Locations', href: '/locations' },
          { id: 'fc-1-3', label: 'Store', href: '#' },
          { id: 'fc-1-4', label: 'Media', href: '#' },
        ],
      },
      {
        id: 'col-2',
        title: 'About XFF',
        links: [
          { id: 'fc-2-1', label: 'History', href: '#' },
          { id: 'fc-2-2', label: 'Testimonials', href: '#' },
          { id: 'fc-2-3', label: 'News Contact', href: '#' },
          { id: 'fc-2-4', label: 'XFF', href: '#' },
        ],
      },
      {
        id: 'col-3',
        title: 'Info',
        links: [
          { id: 'fc-3-1', label: 'Expansion Opps', href: '#' },
          { id: 'fc-3-2', label: 'Rules & Policies', href: '#' },
          { id: 'fc-3-3', label: 'Waivers', href: '#' },
        ],
      },
    ],
  },
  homepage: {
    banners: [
      {
        id: 'banner-1',
        image: '/assets/images/banner1.jpg',
        title: 'Experience the Power & Passion of FLAG FOOTBALL',
        subtitle: 'The only League Spanning Coast to Coast.',
        ctaText: 'National Tournaments',
        ctaLink: '#',
      },
      {
        id: 'banner-2',
        image: '/assets/images/banner1.jpg',
        title: 'Experience the Power & Passion of FLAG FOOTBALL',
        subtitle: 'The only League Spanning Coast to Coast.',
        ctaText: 'National Tournaments',
        ctaLink: '#',
      },
      {
        id: 'banner-3',
        image: '/assets/images/banner1.jpg',
        title: 'Experience the Power & Passion of FLAG FOOTBALL',
        subtitle: 'The only League Spanning Coast to Coast.',
        ctaText: 'National Tournaments',
        ctaLink: '#',
      },
    ],
    successSection: {
      title: 'Success in Numbers',
      stats: [
        { id: 'stat-1', number: '18+', label: 'YEARS OF EXPERIENCE' },
        { id: 'stat-2', number: '58+', label: 'Seasons' },
        { id: 'stat-3', number: '1000+', label: 'Games Played' },
        { id: 'stat-4', number: '800+', label: 'All -time Players' },
      ],
    },
    stripBanner: {
      image: '/assets/images/strip-banner1.jpg',
      ctaText: 'Register now',
      ctaLink: '#',
    },
    matchHighlights: {
      title: 'match highlights',
      images: [
        { id: 'mh-1', image: '/assets/images/g1.jpg' },
        { id: 'mh-2', image: '/assets/images/g2.jpg' },
        { id: 'mh-3', image: '/assets/images/g3.jpg' },
        { id: 'mh-4', image: '/assets/images/g4.jpg' },
      ],
    },
    featuredLocations: {
      title: 'Featured LOCATIONS',
      locations: [
        { id: 'loc-1', image: '/assets/images/location-img.jpg', title: 'Robb Field', address: '2525 Bacon St San Diego', link: '/location-details' },
        { id: 'loc-2', image: '/assets/images/location-img.jpg', title: 'Robb Field', address: '2525 Bacon St San Diego', link: '/location-details' },
        { id: 'loc-3', image: '/assets/images/location-img.jpg', title: 'Robb Field', address: '2525 Bacon St San Diego', link: '/location-details' },
        { id: 'loc-4', image: '/assets/images/location-img.jpg', title: 'Robb Field', address: '2525 Bacon St San Diego', link: '/location-details' },
      ],
      ctaText: 'VIEW ALL LOCATIONS',
      ctaLink: '/locations',
    },
    scoreboardSection: {
      title: 'League Scoreboard',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      ctaText: 'VIEW MORE',
      ctaLink: '#',
    },
    differenceSection: {
      title: 'The Difference We Deliver',
      subtitle: 'Experience, energy, and excellence in every match',
      items: [
        { id: 'diff-1', icon: '/assets/images/d1.png', title: 'Professional Game Management', description: 'Every match is organized with expert planning, from scheduling to scorekeeping.' },
        { id: 'diff-2', icon: '/assets/images/d2.png', title: 'Fair Play & Safety First', description: 'Certified referees and strict safety standards ensure every player enjoys the game.' },
        { id: 'diff-3', icon: '/assets/images/d3.png', title: 'Top-Class Facilities', description: 'We provide premium fields, quality gear, and smooth logistics for every event.' },
        { id: 'diff-4', icon: '/assets/images/d4.png', title: 'Community & Team Spirit', description: 'We bring players together — building friendships, sportsmanship, and a growing Flag Football community.' },
      ],
      ctaText: 'Read MORE',
      ctaLink: '#',
    },
    sponsorsSection: {
      title: 'Sponsors',
      sponsors: [
        { id: 'sponsor-1', image: '/assets/images/s1.jpg' },
        { id: 'sponsor-2', image: '/assets/images/s2.jpg' },
        { id: 'sponsor-3', image: '/assets/images/s3.jpg' },
        { id: 'sponsor-4', image: '/assets/images/s4.jpg' },
        { id: 'sponsor-5', image: '/assets/images/s5.jpg' },
      ],
      ctaText: 'Want to Sponsor ?',
      ctaLink: '#',
    },
    newsSection: {
      title: 'League News and Updates',
    },
    testimonialsSection: {
      title: 'What Our Players Say',
      testimonials: [
        { id: 'test-1', rating: 5, text: 'Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever!', authorImage: '/assets/images/t1.png', authorName: 'John Flores', date: 'Aug 20, 2020' },
        { id: 'test-2', rating: 5, text: 'Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever!', authorImage: '/assets/images/t1.png', authorName: 'John Flores', date: 'Aug 20, 2020' },
      ],
    },
  },
};

export async function readCmsData(): Promise<CmsData> {
  await connection();
  try {
    const raw = await readFile(CMS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<CmsData>;
    return {
      header: parsed.header || DEFAULT_CMS.header,
      footer: parsed.footer || DEFAULT_CMS.footer,
      homepage: parsed.homepage || DEFAULT_CMS.homepage,
    } as CmsData;
  } catch {
    return DEFAULT_CMS;
  }
}

export async function writeCmsData(data: CmsData): Promise<void> {
  const dir = path.dirname(CMS_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(CMS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
