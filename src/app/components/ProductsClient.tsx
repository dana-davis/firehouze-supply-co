"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";
import SearchFilter from "./SearchFilter";
import styles from "./ProductsClient.module.css";

interface ProductsClientProps {
	products: Product[];
	categories?: { title: string; slug: string }[];
}

export default function ProductsClient({
	products,
	categories,
}: ProductsClientProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize state from URL parameters
	const [searchTerm, setSearchTerm] = useState<string>(
		searchParams.get("search") || ""
	);
	const [filters, setFilters] = useState<{
		category: string;
	}>({
		category: searchParams.get("category") || "all",
	});

	const [sortBy, setSortBy] = useState<string>(
		searchParams.get("sort") || "name-asc"
	);

	// Watch for URL parameter changes and update state accordingly
	useEffect(() => {
		const newSearchTerm = searchParams.get("search") || "";
		const newCategory = searchParams.get("category") || "all";
		const newSortBy = searchParams.get("sort") || "name-asc";

		setSearchTerm(newSearchTerm);
		setFilters({
			category: newCategory,
		});
		setSortBy(newSortBy);
	}, [searchParams]);

	// Update URL when filters change
	const updateURL = (
		newSearchTerm: string,
		newFilters: { category: string },
		newSortBy?: string
	) => {
		const params = new URLSearchParams();

		if (newSearchTerm) {
			params.set("search", newSearchTerm);
		}

		if (newFilters.category && newFilters.category !== "all") {
			params.set("category", newFilters.category);
		}

		if (newSortBy && newSortBy !== "name-asc") {
			params.set("sort", newSortBy);
		}

		const newURL = params.toString()
			? `?${params.toString()}`
			: window.location.pathname;
		router.push(newURL, { scroll: false });
	};

	// Get categories from props or extract from products
	const availableCategories = useMemo(() => {
		if (categories && categories.length > 0) {
			return [{ title: "All", slug: "all" }, ...categories];
		}

		// Extract unique categories from products
		const uniqueCategories = Array.from(
			new Set(products.map((product) => product.category).filter(Boolean))
		)
			.sort()
			.map((category) => ({
				title: category,
				slug: category.toLowerCase(),
			}));

		return [{ title: "All", slug: "all" }, ...uniqueCategories];
	}, [categories, products]);

	// Filter and search products based on current state
	const filteredProducts = useMemo(() => {
		let filtered = [...products];

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

		// Sort products
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "name-asc":
					return (a.title || "").localeCompare(b.title || "");
				case "name-desc":
					return (b.title || "").localeCompare(a.title || "");
				case "price-asc":
					return a.price - b.price;
				case "price-desc":
					return b.price - a.price;
				default:
					return 0;
			}
		});

		return filtered;
	}, [products, searchTerm, filters, sortBy]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		updateURL(term, filters, sortBy);
	};

	const handleFilter = (newFilters: { category: string }) => {
		setFilters(newFilters);
		updateURL(searchTerm, newFilters, sortBy);
	};

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		updateURL(searchTerm, filters, newSortBy);
	};

	// Function to clear all filters
	const clearFilters = () => {
		const defaultFilters = { category: "all" };
		const defaultSort = "name-asc";
		setFilters(defaultFilters);
		setSearchTerm("");
		setSortBy(defaultSort);
		updateURL("", defaultFilters, defaultSort);
	};

	return (
		<>
			<SearchFilter
				onSearch={handleSearch}
				onFilter={handleFilter}
				onSort={handleSort}
				categories={availableCategories}
				initialSearchTerm={searchTerm}
				initialCategory={filters.category}
				initialSortBy={sortBy}
			/>

			<div className={styles.productsContainer}>
				{/* Desktop Sort Controls */}
				<div className={styles.sortSection}>
					<label htmlFor="sort-select" className={styles.sortLabel}>
						Sort by:
					</label>
					<select
						id="sort-select"
						value={sortBy}
						onChange={(e) => handleSort(e.target.value)}
						className={styles.sortSelect}>
						<option value="name-asc">Name (A-Z)</option>
						<option value="name-desc">Name (Z-A)</option>
						<option value="price-asc">Price (Low to High)</option>
						<option value="price-desc">Price (High to Low)</option>
					</select>
				</div>
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
