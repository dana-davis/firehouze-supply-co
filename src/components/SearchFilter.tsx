import { useState, useEffect, useMemo } from "react";
import styles from "./SearchFilter.module.css";

interface SearchFilterProps {
	onSearch?: (searchTerm: string) => void;
	onFilter?: (filters: { category: string; subcategory?: string }) => void;
	onSort?: (sortBy: string) => void;
	onViewChange?: (view: "grid" | "list") => void;
	categories?: { title: string; slug: string; subcategories: string[] }[];
	initialSearchTerm?: string;
	initialCategory?: string;
	initialSubcategory?: string;
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
	initialSubcategory = "",
	initialSortBy = "name-asc",
	currentView = "grid",
}: SearchFilterProps) {
	const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
	const [selectedCategory, setSelectedCategory] =
		useState<string>(initialCategory);
	const [selectedSubcategory, setSelectedSubcategory] =
		useState<string>(initialSubcategory);
	const [sortBy, setSortBy] = useState<string>(initialSortBy);

	// Update state when initial values change (URL parameters change)
	useEffect(() => {
		setSearchTerm(initialSearchTerm);
		setSelectedCategory(initialCategory);
		setSelectedSubcategory(initialSubcategory);
		setSortBy(initialSortBy);
	}, [initialSearchTerm, initialCategory, initialSubcategory, initialSortBy]);

	// Get available subcategories for the selected category
	const availableSubcategories = useMemo(() => {
		if (selectedCategory === "all") return [];
		const category = categories?.find((cat) => cat.slug === selectedCategory);
		return category?.subcategories || [];
	}, [categories, selectedCategory]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		onSearch?.(term);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		// Reset subcategory when category changes
		setSelectedSubcategory("");
		onFilter?.({ category, subcategory: "" });
	};

	const handleSubcategoryChange = (subcategory: string) => {
		console.log("Selected subcategory:", subcategory);
		setSelectedSubcategory(subcategory);
		onFilter?.({ category: selectedCategory, subcategory });
	};

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		onSort?.(newSortBy);
	};

	// Shared SearchBox component
	const SearchBox = ({ className }: { className?: string }) => (
		<div className={`${styles.searchBox} ${className || ""}`}>
			<input
				type="text"
				placeholder="Search products..."
				value={searchTerm}
				onChange={handleSearch}
				className={styles.searchInput}
				autoComplete="off"
				autoCapitalize="words"
			/>
			<button className={styles.searchBtn} aria-label="Search" type="button">
				🔍
			</button>
		</div>
	);

	// Shared SortSelect component
	const SortSelect = ({ className }: { className?: string }) => (
		<>
			<label className={styles.sortLabel}>Sort by:</label>
			<select
				value={sortBy}
				onChange={(e) => handleSort(e.target.value)}
				className={`${styles.sortSelect} ${className || ""}`}>
				<option value="name-asc">Name (A-Z)</option>
				<option value="name-desc">Name (Z-A)</option>
				<option value="price-asc">Price (Low to High)</option>
				<option value="price-desc">Price (High to Low)</option>
			</select>
		</>
	);

	// Shared CategoryButtons component
	const CategoryButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
		<>
			{categories?.map((category) => (
				<button
					key={category.slug}
					onClick={() => handleCategoryChange(category.slug)}
					className={`${
						isMobile ? styles.mobileFilterBtn : styles.categoryBtn
					} ${
						selectedCategory === category.slug
							? isMobile
								? styles.mobileActive
								: styles.active
							: ""
					}`}>
					{category.title.charAt(0).toUpperCase() + category.title.slice(1)}
				</button>
			))}
		</>
	);

	// Shared SubcategoryButtons component
	const SubcategoryButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
		<>
			<button
				onClick={() => handleSubcategoryChange("")}
				className={`${isMobile ? styles.mobileFilterBtn : styles.categoryBtn} ${
					selectedSubcategory === ""
						? isMobile
							? styles.mobileActive
							: styles.active
						: ""
				}`}>
				All
			</button>
			{availableSubcategories.map((subcategory, index) => {
				const subcategoryValue = isMobile
					? subcategory
					: subcategory.toLowerCase().replaceAll(" ", "_");
				const isActive = isMobile
					? selectedSubcategory === subcategory
					: selectedSubcategory === subcategoryValue;

				return (
					<button
						key={`${isMobile ? "mobile-" : ""}${selectedCategory}-${index}`}
						onClick={() => handleSubcategoryChange(subcategoryValue)}
						className={`${
							isMobile ? styles.mobileFilterBtn : styles.categoryBtn
						} ${
							isActive ? (isMobile ? styles.mobileActive : styles.active) : ""
						}`}>
						{subcategory}
					</button>
				);
			})}
		</>
	);

	return (
		<div className={styles.container}>
			{/* Desktop Search and Filter Section */}
			<div className={styles.desktopSection}>
				<div className={styles.searchSectionWrapper}>
					<div className={styles.filterSection}>
						<div className={styles.filterGroup}>
							<label className={styles.filterLabel}>Product Type</label>
							<div className={styles.categoryButtons}>
								<CategoryButtons />
							</div>
						</div>

						{/* Subcategory Filter - Only show if category is selected and has subcategories */}
						{availableSubcategories.length > 0 && (
							<div className={styles.filterGroup}>
								<label className={styles.filterLabel}>Subcategory</label>
								<div className={styles.categoryButtons}>
									<SubcategoryButtons />
								</div>
							</div>
						)}
					</div>
					<div className={styles.searchSection}>
						<SearchBox />
					</div>
				</div>

				{/* Desktop Sort Section */}
				<div className={styles.sortSection}>
					<SortSelect />
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
						<SearchBox />
					</div>

					{/* Mobile Sort */}
					<div className={styles.mobileSortSection}>
						<SortSelect />
					</div>

					{/* Mobile Category Filter */}
					<div className={styles.mobileFilterGroup}>
						<label className={styles.mobileFilterLabel}>Product Type</label>
						<div className={styles.mobileFilterButtons}>
							<CategoryButtons isMobile />
						</div>
					</div>

					{/* Mobile Subcategory Filter - Only show if category is selected and has subcategories */}
					{availableSubcategories.length > 0 && (
						<div className={styles.mobileFilterGroup}>
							<label className={styles.mobileFilterLabel}>Subcategory</label>
							<div className={styles.mobileFilterButtons}>
								<SubcategoryButtons isMobile />
							</div>
						</div>
					)}
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
