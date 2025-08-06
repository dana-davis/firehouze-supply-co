import ProductCard from "./ProductCard";
import styles from "../page.module.css";
import { Product } from "@/types";

interface ProductGridProps {
	products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
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
		<div className={styles.grid}>
			{products.map((product) => (
				<ProductCard key={product._id} product={product} />
			))}
		</div>
	);
}
