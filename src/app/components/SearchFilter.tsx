"use client";

import { useState } from "react";
import styles from "./SearchFilter.module.css";

interface SearchFilterProps {
	onSearch?: (searchTerm: string) => void;
	onFilter?: (filters: { category: string; priceRange: number[] }) => void;
	categories?: string[];
}

export default function SearchFilter({
	onSearch,
	onFilter,
	categories,
}: SearchFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		onSearch?.(term);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		onFilter?.({ category, priceRange });
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
					<label className={styles.filterLabel}>Category</label>
					<div className={styles.categoryButtons}>
						{categories?.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryChange(category)}
								className={`${styles.categoryBtn} ${
									selectedCategory === category ? styles.active : ""
								}`}>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
