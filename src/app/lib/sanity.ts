import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { Product, Image, Logo } from '@/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-08-07'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: { asset: { _ref: string } } | { _ref: string }) {
  return builder.image(source)
}

export const logoQuery = `
  *[_type == "logo"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    image {
      _type,
      asset-> {
        _id,
        _ref,
        _type,
        url
      }
    }
  }
`

export const fetchLogo = async (): Promise<Logo> => {
  const result = await client.fetch(logoQuery);
  return result || { 
    _id: '', 
    _type: 'logo',
    _createdAt: '',
    _updatedAt: '',
    _rev: '',
    title: '',
    image: null
  };
};

export const productsQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    description,
    mainImage,
    category,
    potency,
    strain,
    gallery
  }
`

export const productQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    description,
    mainImage,
    category,
    potency,
    strain,
    gallery
  }
`
export const mainMenuQuery = `
  *[_type == "mainMenu"]
`

export const fetchMainMenu = async (): Promise<{ items: { title: string }[] }> => {
  const result = await client.fetch(mainMenuQuery);
  return result || { items: [] };
};
console.log('fetchMainMenu query:', fetchMainMenu());
export const fetchProducts = async (): Promise<Product[]> => {
  return client.fetch(productsQuery);
};

export const fetchProduct = async (slug: string): Promise<Product> => {
  const product = await client.fetch(productQuery, { slug });
  return product;
};

export const categoriesQuery = `
  *[_type == "categories"] {
   category_title
  }
`;

export const fetchCategories = async (): Promise<{ title: string; slug: string }[]> => {
  const result = await client.fetch(categoriesQuery);
  console.log('Fetched categories:', result);
  return result[0].category_title.map((category:string) => ({
    title: category,
    slug: category.toLowerCase().replace(/\-/g, '')
  }));
};