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
			</div>
		</header>
	);
}
