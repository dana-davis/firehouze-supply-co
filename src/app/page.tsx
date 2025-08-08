// src/app/page.tsx

import { Suspense } from "react";
import { fetchProducts, fetchCategories } from "./lib/sanity";
import ProductsClient from "./components/ProductsClient";
import styles from "./page.module.css";

export default async function Home() {
	const products = await fetchProducts();
	const categories = await fetchCategories();
	console.log("Fetched products:", products);
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
