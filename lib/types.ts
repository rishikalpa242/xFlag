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
  variant: 'primary' | 'info' | 'secondary';
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
}
