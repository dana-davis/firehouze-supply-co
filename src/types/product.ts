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

type Image = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

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
  category: string;
}
