import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/sanity";
import styles from "../page.module.css";
import { Product, PortableTextBlock } from "@/types";

// Helper function to extract text from Portable Text blocks
function extractTextFromPortableText(blocks: PortableTextBlock[]): string {
	if (!blocks || blocks.length === 0) return "";
	return blocks
		.map((block) => block.children.map((child) => child.text).join(""))
		.join("\n");
}

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const description = extractTextFromPortableText(product.description);

	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				{product.mainImage ? (
					<Image
						src={urlFor(product.mainImage).url()}
						alt={product.title || "Product image"}
						width={400}
						height={400}
						className={styles.productImage}
					/>
				) : (
					<div className={styles.noImage}>
						<span>No image</span>
					</div>
				)}
			</div>

			<div>
				<div className={styles.category}>
					{product.category && <span>{product.category}</span>}
				</div>

				<h3 className={styles.cardTitle}>
					<Link href={`/products/${product.slug.current}`}>
						{product.title || "Unnamed Product"}
					</Link>
				</h3>
				<div className={styles.cardPrice}>
					<span className={styles.price}>${product.price}</span>
				</div>
			</div>
		</div>
	);
}
