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
};

export async function readCmsData(): Promise<CmsData> {
  await connection();
  try {
    const raw = await readFile(CMS_FILE, 'utf-8');
    return JSON.parse(raw) as CmsData;
  } catch {
    return DEFAULT_CMS;
  }
}

export async function writeCmsData(data: CmsData): Promise<void> {
  const dir = path.dirname(CMS_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(CMS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
