"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";
import SearchFilter from "./SearchFilter";
import styles from "./ProductsClient.module.css";

interface ProductsClientProps {
	products: Product[];
	categories?: string[];
}
export default function ProductsClient({
	products,
	categories,
}: ProductsClientProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filters, setFilters] = useState<{
		category: string;
		priceRange: number[];
	}>({
		category: "all",
		priceRange: [0, 1000],
	});

	// Get categories from props or extract from products
	const availableCategories = useMemo(() => {
		if (categories && categories.length > 0) {
			return ["all", ...categories];
		}

		// Extract unique categories from products
		const uniqueCategories = Array.from(
			new Set(products.map((product) => product.category).filter(Boolean))
		).sort();

		return ["all", ...uniqueCategories];
	}, [categories, products]);

	// Filter and search products based on current state
	const filteredProducts = useMemo(() => {
		let filtered = products;

		// Filter by search term
		if (searchTerm.trim()) {
			filtered = filtered.filter(
				(product) =>
					product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filter by category
		if (filters.category !== "all") {
			filtered = filtered.filter(
				(product) =>
					product.category.toLowerCase() === filters.category.toLowerCase()
			);
		}

		// Filter by price range
		filtered = filtered.filter(
			(product) =>
				product.price >= filters.priceRange[0] &&
				product.price <= filters.priceRange[1]
		);

		return filtered;
	}, [products, searchTerm, filters]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	const handleFilter = (newFilters: {
		category: string;
		priceRange: number[];
	}) => {
		setFilters(newFilters);
	};

	return (
		<>
			<SearchFilter
				onSearch={handleSearch}
				onFilter={handleFilter}
				categories={availableCategories}
			/>
			<div className={styles.productsContainer}>
				{filteredProducts.length === 0 ? (
					<div className={styles.emptyState}>
						<h3 className={styles.emptyStateTitle}>No products found</h3>
						<p className={styles.emptyStateText}>
							Try adjusting your search or filters.
						</p>
					</div>
				) : (
					<ProductGrid products={filteredProducts} />
				)}
			</div>
		</>
	);
}
