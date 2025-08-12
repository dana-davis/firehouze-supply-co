import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/sanity";
import styles from "./ProductCard.module.css";
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
	viewType?: "grid" | "list";
}

export default function ProductCard({
	product,
	viewType = "grid",
}: ProductCardProps) {
	const description = extractTextFromPortableText(product.description);
	return (
		<div
			className={`${styles.card} ${
				viewType === "list" ? styles.listCard : ""
			}`}>
			<Link href={`/products/${product.slug.current}`}>
				<div className={styles.imageContainer}>
					{product.mainImage ? (
						<Image
							src={
								product.mainImage.externalURL ||
								urlFor(product.mainImage).url() ||
								""
							}
							alt={product.title || "Product image"}
							className={styles.image}
							fill
							sizes={
								viewType === "list"
									? "(max-width: 768px) 30vw, 20vw"
									: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							}
							loading="lazy"
						/>
					) : (
						<div className={styles.noImage}>
							<span>No image available</span>
						</div>
					)}
				</div>

				<div className={styles.content}>
					<h3 className={styles.title}>{product.title || "Unnamed Product"}</h3>
					{viewType === "list" && description && (
						<p className={styles.description}>{description}</p>
					)}
					<div className={styles.footer}>
						<span className={styles.price}>${product.price}</span>
						{product.category && (
							<span className={styles.category}>{product.category}</span>
						)}
					</div>
				</div>
			</Link>
		</div>
	);
}
