// src/app/page.tsx
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { Suspense } from "react";
import { fetchProducts, fetchCategories, fetchProductsByAPI } from "./lib/sanity";
import ProductsClient from "./components/ProductsClient";
import styles from "./page.module.css";
import { Product } from '@/types';

export default async function Home() {
	const products = await fetchProducts();
	console.log("Fetched products:", products);
	const categories = await fetchCategories();
	console.log("Fetched categories:", categories);

	return (
		<div className={`${styles.pageWrapper} page-wrapper`}>
			{/* Products Section */}
			<main className={styles.container}>
				<Suspense fallback={<div>Loading products...</div>}>
					<ProductsClient products={products} categories={categories} />
				</Suspense>
			</main>
		</div>
	);
}