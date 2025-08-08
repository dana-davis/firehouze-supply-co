import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./animations.css";
import "./buttons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { fetchLogo,fetchCategories } from "./lib/sanity";

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
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				 <Header logo={logo} categories={categories} />
				<main>{children}</main>
				<Footer logo={logo} />
			</body>
		</html>
	);
}
