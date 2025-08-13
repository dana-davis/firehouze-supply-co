// Sanity Portable Text types
export interface PortableTextSpan {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  [key: string]: unknown;
}

export interface PortableTextBlock {
  _key: string;
  _type: 'block';
  children: PortableTextSpan[];
  markDefs: PortableTextMarkDef[];
  style: string;
}

export type Image = {
  _type: 'image';
  asset: {
    _id?: string;
    _ref: string;
    _type: 'reference';
    url?: string;
  };
  externalURL?: string; // Optional field for external image URLs
};

export interface Logo {
  _id: string;
  _type: 'logo';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  image: Image;
}

export interface Product {
  _id: string;
  title: string | null;
  slug: {
    current: string;
    _type: 'slug';
  };
  price: number;
  description: PortableTextBlock[];
  mainImage: Image | null;
  gallery?: Image[] | null;
  potency?: {
    _type: 'potencyType';
    unit: 'percent';
    value: number;
  };
  strain?: string | null;
  category: string;
  flowerType: string | null;
  size: {
    value: number;
    unit: 'grams' | 'count';
  };
}
