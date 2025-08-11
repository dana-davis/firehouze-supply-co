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
			<Head>
				<title>Firehouze Supply Co</title>
				<meta
					name="description"
					content="Your one-stop shop for all things fire."
				/>
				<link rel="icon" href="/public/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/public/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/public/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/public/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/public/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/public/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/public/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/public/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/public/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/public/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/public/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/public/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/public/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/public/favicon-16x16.png"
				/>
				<link rel="manifest" href="/public/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta
					name="msapplication-TileImage"
					content="/public/ms-icon-144x144.png"
				/>
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header logo={logo} categories={categories} />
				<main>{children}</main>
				<Footer logo={logo} />
			</body>
		</html>
	);
}
