"use client";
import { useState, useEffect } from "react";
import { urlFor } from "../lib/sanity";

import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { Logo } from "@/types";

export default function Header({
	logo,
	categories,
}: {
	logo: Logo;
	categories: { title: string; slug: string }[];
}) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	console.log("Header component rendered with logo:", logo);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			// Reduce threshold for earlier transition
			setIsScrolled(scrollTop > 80);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu when clicking outside or on escape
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as Element;
			if (isMobileMenuOpen && !target.closest(`.${styles.header}`)) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		// Prevent touchmove events to stop scrolling
		const handleTouchMove = (event: TouchEvent) => {
			if (isMobileMenuOpen) {
				event.preventDefault();
			}
		};

		if (isMobileMenuOpen) {
			// Store current scroll position
			const scrollY = window.scrollY;

			document.addEventListener("mousedown", handleOutsideClick);
			document.addEventListener("keydown", handleEscape);
			document.addEventListener("touchmove", handleTouchMove, {
				passive: false,
			});

			// Apply multiple scroll prevention methods
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";
			document.body.classList.add(styles.noScroll);
			document.documentElement.classList.add("mobile-menu-open");
		} else {
			// Restore scroll position when closing menu
			const scrollY = document.body.style.top;
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.classList.remove(styles.noScroll);
			document.documentElement.classList.remove("mobile-menu-open");

			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY || "0") * -1);
			}
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("touchmove", handleTouchMove);

			// Always clean up styles
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.classList.remove(styles.noScroll);
			document.documentElement.classList.remove("mobile-menu-open");
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
			<div className={styles.container}>
				<Link href="/" className={styles.logo}>
					<Image
						src={logo ? urlFor(logo.image).url() : "/default-logo.png"}
						alt={logo?.title || "Fire Houze"}
						width={150}
						height={100}
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav className={styles.nav}>
					<Link href="/" className={styles.navLink}>
						All Products
					</Link>
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/?category=${category.slug}`}
							className={styles.navLink}>
							{category.title}
						</Link>
					))}
				</nav>

				{/* Mobile Menu Button */}
				<button
					className={styles.mobileMenuButton}
					onClick={toggleMobileMenu}
					aria-label="Toggle mobile menu">
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
					<Link
						href="/"
						className={styles.mobileNavLink}
						onClick={() => setIsMobileMenuOpen(false)}>
						All Products
					</Link>
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/?category=${category.slug}`}
							className={styles.mobileNavLink}
							onClick={() => setIsMobileMenuOpen(false)}>
							{category.title}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
