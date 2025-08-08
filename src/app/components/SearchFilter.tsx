"use client";

import { useState, useEffect } from "react";
import styles from "./SearchFilter.module.css";

interface SearchFilterProps {
	onSearch?: (searchTerm: string) => void;
	onFilter?: (filters: { category: string }) => void;
	categories?: { title: string; slug: string }[];
	initialSearchTerm?: string;
	initialCategory?: string;
}

export default function SearchFilter({
	onSearch,
	onFilter,
	categories,
	initialSearchTerm = "",
	initialCategory = "all",
}: SearchFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
	const [selectedCategory, setSelectedCategory] =
		useState<string>(initialCategory);

	// Update state when initial values change (URL parameters change)
	useEffect(() => {
		setSearchTerm(initialSearchTerm);
		setSelectedCategory(initialCategory);
	}, [initialSearchTerm, initialCategory]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		onSearch?.(term);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		onFilter?.({ category });
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchSection}>
				<div className={styles.searchBox}>
					<input
						type="text"
						placeholder="Search products..."
						value={searchTerm}
						onChange={handleSearch}
						className={styles.searchInput}
					/>
					<button className={styles.searchBtn}>🔍</button>
				</div>
			</div>
			<div className={styles.filterSection}>
				<div className={styles.filterGroup}>
					<label className={styles.filterLabel}>Product Type</label>
					<div className={styles.categoryButtons}>
						{categories &&
							categories.length > 0 &&
							categories.map((category) => (
								<button
									key={category.slug}
									onClick={() => handleCategoryChange(category.slug)}
									className={`${styles.categoryBtn} ${
										selectedCategory === category.slug ? styles.active : ""
									}`}>
									{category.title.charAt(0).toUpperCase() +
										category.title.slice(1)}
								</button>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
