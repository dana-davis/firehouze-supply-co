import { useState, useEffect, useCallback, useRef } from "react";
import { urlFor } from "../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { Logo } from "@/types";

interface HeaderProps {
	logo: Logo;
	categories: { title: string; slug: string; subcategories: string[] }[];
}

export default function Header({ logo, categories }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set()
	);
	const scrollPositionRef = useRef(0);

	// Optimized scroll handler with throttling
	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					setIsScrolled(window.scrollY > 80);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Body scroll management
	const toggleBodyScroll = useCallback((disable: boolean) => {
		if (disable) {
			scrollPositionRef.current = window.scrollY;
			document.body.style.cssText = `
				overflow: hidden;
				position: fixed;
				top: -${scrollPositionRef.current}px;
				width: 100%;
			`;
			document.body.classList.add(styles.noScroll);
			document.documentElement.classList.add("mobile-menu-open");
		} else {
			document.body.style.cssText = "";
			document.body.classList.remove(styles.noScroll);
			document.documentElement.classList.remove("mobile-menu-open");
			window.scrollTo(0, scrollPositionRef.current);
		}
	}, []);

	// Mobile menu handlers
	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
		setExpandedCategories(new Set()); // Reset expanded categories when closing menu
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen((prev) => !prev);
	}, []);

	// Handle category expansion for mobile
	const toggleCategoryExpansion = useCallback((categorySlug: string) => {
		setExpandedCategories((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(categorySlug)) {
				newSet.delete(categorySlug);
			} else {
				newSet.add(categorySlug);
			}
			return newSet;
		});
	}, []);

	// Event listeners for mobile menu
	useEffect(() => {
		if (!isMobileMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest(`.${styles.header}`)) {
				closeMobileMenu();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeMobileMenu();
			}
		};

		const handleTouchMove = (event: TouchEvent) => {
			event.preventDefault();
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("touchmove", handleTouchMove);
		};
	}, [isMobileMenuOpen, closeMobileMenu]);

	// Handle body scroll when mobile menu opens/closes
	useEffect(() => {
		toggleBodyScroll(isMobileMenuOpen);
		return () => toggleBodyScroll(false); // Cleanup on unmount
	}, [isMobileMenuOpen, toggleBodyScroll]);

	// Navigation items component for reusability
	const NavigationItems = ({ isMobile = false }: { isMobile?: boolean }) => (
		<>
			<Link
				href="/"
				className={isMobile ? styles.mobileNavLink : styles.navLink}
				onClick={isMobile ? closeMobileMenu : undefined}>
				All Products
			</Link>
			{categories?.map((category) => {
				const hasSubcategories =
					category.subcategories && category.subcategories.length > 0;
				const isExpanded = expandedCategories.has(category.slug);

				// Shared subcategory links component
				const SubcategoryLinks = () => (
					<>
						<Link
							href={`/?category=${category.slug}`}
							className={
								isMobile ? styles.mobileSubNavLink : styles.dropdownLink
							}
							onClick={isMobile ? closeMobileMenu : undefined}>
							All {category.title}
						</Link>
						{category.subcategories.map((subcategory, index) => (
							<Link
								key={`${category.slug}-${index}`}
								href={`/?category=${
									category.slug
								}&subcategory=${encodeURIComponent(subcategory.toLocaleLowerCase().replaceAll(" ", "_"))}`}
								className={
									isMobile ? styles.mobileSubNavLink : styles.dropdownLink
								}
								onClick={isMobile ? closeMobileMenu : undefined}>
								{subcategory}
							</Link>
						))}
					</>
				);

				// Mobile-specific rendering
				if (isMobile) {
					return (
						<div key={category.slug}>
							{hasSubcategories ? (
								<Link
									href={`/?category=${category.slug}`}
									className={`${styles.mobileNavLink} ${styles.mobileNavButton}`}
									onClick={() => toggleCategoryExpansion(category.slug)}>
									<span>{category.title}</span>
									<span
										className={`${styles.expandArrow} ${
											isExpanded ? styles.expanded : ""
										}`}>
										▼
									</span>
								</Link>
							) : (
								<Link
									href={`/?category=${category.slug}`}
									className={styles.mobileNavLink}
									onClick={closeMobileMenu}>
									{category.title}
								</Link>
							)}
							{hasSubcategories && isExpanded && (
								<div
									className={`${styles.mobileSubcategories} ${styles.expanded}`}>
									<SubcategoryLinks />
								</div>
							)}
						</div>
					);
				}

				// Desktop-specific rendering
				return (
					<div key={category.slug} className={styles.navDropdown}>
						<Link
							href={`/?category=${category.slug}`}
							className={`${styles.navLink} ${
								hasSubcategories ? styles.hasDropdown : ""
							}`}>
							{category.title}
							{hasSubcategories && (
								<span className={styles.dropdownArrow}>▼</span>
							)}
						</Link>
						{hasSubcategories && (
							<div className={styles.dropdownMenu}>
								<SubcategoryLinks />
							</div>
						)}
					</div>
				);
			})}
		</>
	);

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
			<div className={styles.container}>
				<Link href="/" className={styles.logo}>
					<Image
						src={logo ? urlFor(logo.image).url() : "/default-logo.png"}
						alt={logo?.title || "Fire Houze"}
						width={150}
						height={100}
						priority
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav className={styles.nav}>
					<NavigationItems />
				</nav>

				{/* Mobile Menu Button */}
				<button
					className={styles.mobileMenuButton}
					onClick={toggleMobileMenu}
					aria-label="Toggle mobile menu"
					aria-expanded={isMobileMenuOpen}>
					<span
						className={`${styles.hamburger} ${
							isMobileMenuOpen ? styles.active : ""
						}`}>
						<span></span>
						<span></span>
						<span></span>
					</span>
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`${styles.mobileMenuOverlay} ${
					isMobileMenuOpen ? styles.active : ""
				}`}>
				<nav className={styles.mobileNav}>
					<NavigationItems isMobile />
				</nav>
			</div>
		</header>
	);
}
