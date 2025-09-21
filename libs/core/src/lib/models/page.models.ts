export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  categoryId?: string;
  regionId?: string;
  themeId?: string;
  isHome: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  updatedAt?: string;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Region {
  id: string;
  city: string;
  district?: string;
}

export interface Theme {
  id: string;
  name: string;
  css?: string;
  images?: string[];
}

export interface Contact {
  id: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
}

export interface Upload {
  id: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}
