import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct, urlFor } from "../../lib/sanity";
import { Product, PortableTextBlock } from "@/types";
import styles from "./product.module.css";

// Function to render Portable Text as JSX
function renderPortableText(blocks: PortableTextBlock[]) {
	console.log("Rendering Portable Text:", blocks);
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

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await fetchProduct(slug);

	// If still no product found, return 404
	if (!product) {
		notFound();
	}
	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Back to Products
			</Link>

			<div className={styles.productLayout}>
				{/* Product Image */}
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

				{/* Product Details */}
				<div className={styles.detailsSection}>
					{product.category && (
						<div className={styles.category}>{product.category}</div>
					)}

					<h1 className={styles.productTitle}>
						{product.title || "Unnamed Product"}
					</h1>

					<div className={styles.price}>${product.price}</div>

					<div className={styles.description}>
						{renderPortableText(product.description)}
					</div>
				</div>
			</div>
		</div>
	);
}
