import { useState, useEffect } from "react";
import styles from "./SearchFilter.module.css";

interface SearchFilterProps {
	onSearch?: (searchTerm: string) => void;
	onFilter?: (filters: { category: string }) => void;
	onSort?: (sortBy: string) => void;
	onViewChange?: (view: "grid" | "list") => void;
	categories?: { title: string; slug: string }[];
	initialSearchTerm?: string;
	initialCategory?: string;
	initialSortBy?: string;
	currentView?: "grid" | "list";
}

export default function SearchFilter({
	onSearch,
	onFilter,
	onSort,
	onViewChange,
	categories,
	initialSearchTerm = "",
	initialCategory = "all",
	initialSortBy = "name-asc",
	currentView = "grid",
}: SearchFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
	const [selectedCategory, setSelectedCategory] =
		useState<string>(initialCategory);
	const [sortBy, setSortBy] = useState<string>(initialSortBy);

	// Update state when initial values change (URL parameters change)
	useEffect(() => {
		setSearchTerm(initialSearchTerm);
		setSelectedCategory(initialCategory);
		setSortBy(initialSortBy);
	}, [initialSearchTerm, initialCategory, initialSortBy]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		onSearch?.(term);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		onFilter?.({ category });
	};

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		onSort?.(newSortBy);
	};

	return (
		<div className={styles.container}>
			{/* Desktop Search and Filter Section */}
			<div className={styles.desktopSection}>
				<div className={styles.searchSectionWrapper}>
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
					<div className={styles.searchSection}>
						<div className={styles.searchBox}>
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={handleSearch}
								className={styles.searchInput}
								autoComplete="off"
								autoCapitalize="words"
							/>
							<button
								className={styles.searchBtn}
								aria-label="Search"
								type="button">
								🔍
							</button>
						</div>
					</div>
				</div>

				{/* Desktop Sort Section */}
				<div className={styles.sortSection}>
					<label className={styles.sortLabel}>Sort by:</label>
					<select
						value={sortBy}
						onChange={(e) => handleSort(e.target.value)}
						className={styles.sortSelect}>
						<option value="name-asc">Name (A-Z)</option>
						<option value="name-desc">Name (Z-A)</option>
						<option value="price-asc">Price (Low to High)</option>
						<option value="price-desc">Price (High to Low)</option>
					</select>
				</div>
			</div>

			{/* Mobile Collapsible Panel */}
			<details className={styles.mobileFilterPanel}>
				<summary className={styles.filterSummary}>
					<span className={styles.filterSummaryText}>Search & Filter</span>
					<span className={styles.filterSummaryIcon}>▼</span>
				</summary>
				<div className={styles.filterContent}>
					{/* Mobile Search */}
					<div className={styles.mobileSearchSection}>
						<div className={styles.searchBox}>
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={handleSearch}
								className={styles.searchInput}
								autoComplete="off"
								autoCapitalize="words"
							/>
							<button
								className={styles.searchBtn}
								aria-label="Search"
								type="button">
								🔍
							</button>
						</div>
					</div>

					{/* Mobile Sort */}
					<div className={styles.mobileSortSection}>
						<label className={styles.sortLabel}>Sort by:</label>
						<select
							value={sortBy}
							onChange={(e) => handleSort(e.target.value)}
							className={styles.sortSelect}>
							<option value="name-asc">Name (A-Z)</option>
							<option value="name-desc">Name (Z-A)</option>
							<option value="price-asc">Price (Low to High)</option>
							<option value="price-desc">Price (High to Low)</option>
						</select>
					</div>

					{/* Mobile Category Filter */}
					<div className={styles.mobileFilterGroup}>
						<label className={styles.mobileFilterLabel}>Product Type</label>
						<div className={styles.mobileFilterButtons}>
							{categories &&
								categories.length > 0 &&
								categories.map((category) => (
									<button
										key={category.slug}
										onClick={() => handleCategoryChange(category.slug)}
										className={`${styles.mobileFilterBtn} ${
											selectedCategory === category.slug
												? styles.mobileActive
												: ""
										}`}>
										{category.title.charAt(0).toUpperCase() +
											category.title.slice(1)}
									</button>
								))}
						</div>
					</div>
				</div>
			</details>
			{/* Mobile View Toggle */}
			<div className={styles.mobileViewToggle}>
				<label className={styles.viewToggleLabel}>View:</label>
				<div className={styles.viewToggleButtons}>
					<button
						onClick={() => onViewChange?.("grid")}
						className={`${styles.viewToggleBtn} ${
							currentView === "grid" ? styles.viewToggleActive : ""
						}`}
						aria-label="Grid view">
						<span className={styles.viewToggleIcon}>⊞</span>
						Grid
					</button>
					<button
						onClick={() => onViewChange?.("list")}
						className={`${styles.viewToggleBtn} ${
							currentView === "list" ? styles.viewToggleActive : ""
						}`}
						aria-label="List view">
						<span className={styles.viewToggleIcon}>☰</span>
						List
					</button>
				</div>
			</div>
		</div>
	);
}
