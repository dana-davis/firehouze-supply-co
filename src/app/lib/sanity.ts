import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { Product } from '@/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: { asset: { _ref: string } } | { _ref: string }) {
  return builder.image(source)
}

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



export const fetchProducts = async (): Promise<Product[]> => {
  return client.fetch(productsQuery);
};

export const fetchProduct = async (slug: string): Promise<Product | null> => {
  return client.fetch(productQuery, { slug });
};

// Query to get all unique categories from products
export const categoriesQuery = `
  *[_type == "product" && defined(category)] {
    category
  } | order(category asc)
`;

// Alternative: Get distinct categories only
export const distinctCategoriesQuery = `
  array::unique(*[_type == "product" && defined(category)].category) | order(@)
`;

export const fetchCategories = async (): Promise<string[]> => {
  const result = await client.fetch(distinctCategoriesQuery);
  return result;
};