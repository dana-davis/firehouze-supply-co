import ProductCard from "./ProductCard";
import styles from "../styles/page.module.css";
import { Product } from "@/types";

interface ProductGridProps {
	products: Product[];
	viewType?: "grid" | "list";
}

export default function ProductGrid({
	products,
	viewType = "grid",
}: ProductGridProps) {
	if (!products || products.length === 0) {
		return (
			<div className={styles.emptyState}>
				<h2 className={styles.emptyStateTitle}>No products found</h2>
				<p className={styles.emptyStateText}>
					Check back later for new products.
				</p>
			</div>
		);
	}

	return (
		<div
			className={`${styles.grid} ${
				viewType === "list" ? styles.listView : ""
			}`}>
			{products.map((product) => (
				<ProductCard key={product._id} product={product} viewType={viewType} />
			))}
		</div>
	);
}
