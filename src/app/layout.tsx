import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./animations.css";
import "./buttons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { fetchLogo, fetchCategories } from "./lib/sanity";
import Head from "next/head";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const logo = await fetchLogo();
	const categories = await fetchCategories();

	return (
		<html lang="en">
			<head>
				<title>Firehouze Supply Co</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Firehouze Supply Co - Your one-stop shop for all things fire."
				/>
				<meta name="og:image" content="/public/og-image.png" />
				<meta name="og:title" content="Firehouze Supply Co" />
				<meta
					name="og:description"
					content="Your one-stop shop for all things fire."
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header logo={logo} categories={categories} />
				<main>{children}</main>
				<Footer logo={logo} />
			</body>
		</html>
	);
}
