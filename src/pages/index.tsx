import { GetStaticProps } from "next";
import Head from "next/head";
import { fetchProducts, fetchCategories, fetchLogo } from "../lib/sanity";
import ProductsClient from "../components/ProductsClient";
import styles from "../styles/page.module.css";
import { Product, Logo } from "../types";

interface HomeProps {
	products: Product[];
	categories: { title: string; slug: string; subcategories: string[] }[];
	logo: Logo;
}

export default function Home({ products, categories }: HomeProps) {
	return (
		<>
			<Head>
				<title>Firehouze Supply Co</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={`${styles.pageWrapper} page-wrapper`}>
				<main className={styles.container}>
					<ProductsClient products={products} categories={categories} />
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const [products, categories, logo] = await Promise.all([
			fetchProducts(),
			fetchCategories(),
			fetchLogo(),
		]);

		return {
			props: {
				products,
				categories,
				logo,
			},
			revalidate: 60, // Revalidate every minute
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				products: [],
				categories: [],
				logo: null,
			},
			revalidate: 60,
		};
	}
};
