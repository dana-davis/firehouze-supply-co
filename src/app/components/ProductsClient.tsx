"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";
import SearchFilter from "./SearchFilter";
import styles from "./ProductsClient.module.css";

const PRODUCTS_PER_PAGE = 12; // Number of products to show initially and load per "Load More" click

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

	// Pagination state
	const [displayCount, setDisplayCount] = useState<number>(PRODUCTS_PER_PAGE);

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
		// Reset display count when filters change
		setDisplayCount(PRODUCTS_PER_PAGE);
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
	const allFilteredProducts = useMemo(() => {
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

	// Get the products to display based on current display count
	const displayedProducts = useMemo(() => {
		return allFilteredProducts.slice(0, displayCount);
	}, [allFilteredProducts, displayCount]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setDisplayCount(PRODUCTS_PER_PAGE); // Reset pagination when searching
		updateURL(term, filters, sortBy);
	};

	const handleFilter = (newFilters: { category: string }) => {
		setFilters(newFilters);
		setDisplayCount(PRODUCTS_PER_PAGE); // Reset pagination when filtering
		updateURL(searchTerm, newFilters, sortBy);
	};

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		setDisplayCount(PRODUCTS_PER_PAGE); // Reset pagination when sorting
		updateURL(searchTerm, filters, newSortBy);
	};

	const handleLoadMore = () => {
		setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE);
	};

	// Function to clear all filters
	const clearFilters = () => {
		const defaultFilters = { category: "all" };
		const defaultSort = "name-asc";
		setFilters(defaultFilters);
		setSearchTerm("");
		setSortBy(defaultSort);
		setDisplayCount(PRODUCTS_PER_PAGE); // Reset pagination when clearing filters
		updateURL("", defaultFilters, defaultSort);
	};

	// Check if there are more products to load
	const hasMoreProducts = displayCount < allFilteredProducts.length;

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
				{allFilteredProducts.length === 0 ? (
					<div className={styles.emptyState}>
						<h3 className={styles.emptyStateTitle}>No products found</h3>
						<p className={styles.emptyStateText}>
							Try adjusting your search or filters.
						</p>
					</div>
				) : (
					<>
						<ProductGrid products={displayedProducts} />
						{hasMoreProducts && (
							<div className={styles.loadMoreContainer}>
								<button
									className={styles.loadMoreButton}
									onClick={handleLoadMore}>
									Load More Products (
									{allFilteredProducts.length - displayCount} remaining)
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}
