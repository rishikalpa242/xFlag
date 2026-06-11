export interface DropdownItem {
  id: string;
  label: string;
  href: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  dropdown: DropdownItem[];
}

export interface CtaButton {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'info' | 'secondary' | 'dark' | 'light';
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface HomepageBanner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface SuccessStat {
  id: string;
  number: string;
  label: string;
}

export interface StripBanner {
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface MatchHighlight {
  id: string;
  image: string;
}

export interface FeaturedLocation {
  id: string;
  image: string;
  title: string;
  address: string;
  link: string;
}

export interface DifferenceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Sponsor {
  id: string;
  image: string;
}

export interface Testimonial {
  id: string;
  rating: number; // 1-5
  text: string;
  authorImage: string;
  authorName: string;
  date: string;
}

export interface CmsData {
  header: {
    logo1: string;
    logo2: string;
    navLinks: NavLink[];
    ctaButtons: CtaButton[];
  };
  footer: {
    logo: string;
    navColumns: FooterColumn[];
  };
  homepage?: {
    banners: HomepageBanner[];
    successSection: {
      title: string;
      stats: SuccessStat[];
    };
    stripBanner: StripBanner;
    matchHighlights: {
      title: string;
      images: MatchHighlight[];
    };
    featuredLocations: {
      title: string;
      locations: FeaturedLocation[];
      ctaText: string;
      ctaLink: string;
    };
    scoreboardSection: {
      title: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
    differenceSection: {
      title: string;
      subtitle: string;
      items: DifferenceItem[];
      ctaText: string;
      ctaLink: string;
    };
    sponsorsSection: {
      title: string;
      sponsors: Sponsor[];
      ctaText: string;
      ctaLink: string;
    };
    newsSection: {
      title: string;
    };
    testimonialsSection: {
      title: string;
      testimonials: Testimonial[];
    };
  };
}
