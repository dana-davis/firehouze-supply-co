import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
	fetchProduct,
	fetchProducts,
	urlFor,
	fetchLogo,
	fetchCategories,
} from "../../lib/sanity";
import { Product, PortableTextBlock, Logo } from "../../types";
import styles from "../../styles/product.module.css";

interface ProductPageProps {
	product: Product;
	logo: Logo;
	categories: { title: string; slug: string }[];
}

// Function to render Portable Text as JSX
function renderPortableText(blocks: PortableTextBlock[]) {
	return blocks?.map((block, index) => {
		const text = block.children.map((child) => child.text).join("");

		switch (block.style) {
			case "h1":
				return (
					<h1 key={block._key} className={styles.heading1}>
						{text}
					</h1>
				);
			case "h2":
				return (
					<h2 key={block._key} className={styles.heading2}>
						{text}
					</h2>
				);
			case "h3":
				return (
					<h3 key={block._key} className={styles.heading3}>
						{text}
					</h3>
				);
			default:
				return (
					<p key={block._key} className={styles.paragraph}>
						{text}
					</p>
				);
		}
	});
}

export default function ProductPage({ product }: ProductPageProps) {
	if (!product) {
		return (
			<div className={styles.container}>
				<h1>Product not found</h1>
				<Link href="/">← Back to Products</Link>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{product.title} - Firehouze Supply Co</title>
				<meta
					name="description"
					content={`${product.title} - $${product.price}`}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className={styles.container}>
				<Link href="/" className={styles.backLink}>
					← Back to Products
				</Link>

				<div className={styles.productLayout}>
					<div className={styles.imageSection}>
						{product.mainImage && product.mainImage.externalURL ? (
							<Image
								src={
									product.mainImage.externalURL ||
									urlFor(product.mainImage).url() ||
									""
								}
								alt={product.title || "Product image"}
								className={styles.productImage}
								width={300}
								height={300}
								loading="lazy"
							/>
						) : (
							<div className={styles.noImage}>
								<span>No image available</span>
							</div>
						)}
					</div>

					<div className={styles.detailsSection}>
						{product.category && (
							<div className={styles.category}>{product.category}</div>
						)}

						<h1 className={styles.productTitle}>
							{product.title || "Unnamed Product"}
						</h1>

						{product.size && (
							<div className={styles.sizeWrapper}>
								Size: <div className={styles.size}>{product.size.value} {product.size.unit}</div>
							</div>
						)}

						<div className={styles.price}><span>Price:</span>${product.price}</div>

						{product.potency && (
							<div className={styles.potency}>
								<span>Potency:</span> {product.potency?.value}
								{product.potency?.unit === "percent" ? "%" : ""}
							</div>
						)}

						{product.strain && (
							<div className={styles.strain}><span>Strain:</span> {product.strain}</div>
						)}

						<div className={styles.description}>
              <h3>Description</h3>
							{renderPortableText(product.description)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const products = await fetchProducts();

		const paths = products.map((product) => ({
			params: { slug: product.slug.current },
		}));

		return {
			paths,
			fallback: "blocking", // Enable ISR for new products
		};
	} catch (error) {
		console.error("Error fetching product paths:", error);
		return {
			paths: [],
			fallback: "blocking",
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const slug = params?.slug as string;

		const [product, logo, categories] = await Promise.all([
			fetchProduct(slug),
			fetchLogo(),
			fetchCategories(),
		]);

		if (!product) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				product,
				logo,
				categories,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error("Error fetching product:", error);
		return {
			notFound: true,
		};
	}
};
