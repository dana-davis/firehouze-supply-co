import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Firehouze Supply Co - Your one-stop shop for all things fire."
				/>
				<meta name="og:image" content="/og-image.png" />
				<meta name="og:title" content="Firehouze Supply Co" />
				<meta
					name="og:description"
					content="Your one-stop shop for all things fire."
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
