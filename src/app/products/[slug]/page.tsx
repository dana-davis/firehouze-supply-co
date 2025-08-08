import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct, urlFor } from "../../lib/sanity";
import { Product, PortableTextBlock } from "@/types";
import styles from "./product.module.css";

// Import placeholder products for fallback
const placeholderProducts: Product[] = [
	{
		_id: "765e3815-8335-4665-a0f9-acbad2dc712c",
		category: "flower",
		description: [
			{
				_key: "f3eb693f-4c4",
				_type: "block",
				children: [
					{
						_key: "ef9525c9-d9b",
						_type: "span",
						marks: [],
						text: "A hybrid with tropical flavor and energetic buzz.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 13,
		},
		price: 50,
		slug: {
			_type: "slug",
			current: "pineapple-express-flower-0",
		},
		strain: "sativa",
		title: "Pineapple Express (Flower)",
	},
	{
		_id: "83accd54-d9fe-471d-b04a-fc96de7ea3d5",
		category: "flower",
		description: [
			{
				_key: "9d092045-67b",
				_type: "block",
				children: [
					{
						_key: "5e564cc8-ad0",
						_type: "span",
						marks: [],
						text: "A hybrid with tropical flavor and energetic buzz.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 49,
		},
		price: 30,
		slug: {
			_type: "slug",
			current: "pineapple-express-flower-1",
		},
		strain: "sativa",
		title: "Pineapple Express (Flower)",
	},
	{
		_id: "f2453e86-92c0-4efc-8489-42dc411af897",
		category: "flower",
		description: [
			{
				_key: "5906a786-1d0",
				_type: "block",
				children: [
					{
						_key: "1082bccb-636",
						_type: "span",
						marks: [],
						text: "A classic sativa-dominant hybrid with uplifting effects and sweet berry aroma.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 79,
		},
		price: 20,
		slug: {
			_type: "slug",
			current: "blue-dream-flower-2",
		},
		strain: "sativa",
		title: "Blue Dream (Flower)",
	},
	{
		_id: "079f1952-fd1f-4d7c-9b5b-7892ce98f3ed",
		category: "flower",
		description: [
			{
				_key: "9d092045-67b",
				_type: "block",
				children: [
					{
						_key: "5e564cc8-ad0",
						_type: "span",
						marks: [],
						text: "A hybrid with tropical flavor and energetic buzz.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 37,
		},
		price: 30,
		slug: {
			_type: "slug",
			current: "og-kush-flower-5",
		},
		strain: "hybrid",
		title: "OG Kush (Flower)",
	},
	{
		_id: "8208fb76-abaf-4253-b9be-806c357596cf",
		category: "flower",
		description: [
			{
				_key: "ce96a1e4-54c",
				_type: "block",
				children: [
					{
						_key: "b3a349e4-154",
						_type: "span",
						marks: [],
						text: "An indica-dominant hybrid known for its relaxing effects and earthy flavor.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 75,
		},
		price: 50,
		slug: {
			_type: "slug",
			current: "og-kush-flower-6",
		},
		strain: "indica",
		title: "OG Kush (Flower)",
	},
	{
		_id: "5bed43e6-2590-44b3-8c46-785f4492332b",
		category: "flower",
		description: [
			{
				_key: "6d5c40b3-ae4",
				_type: "block",
				children: [
					{
						_key: "a2286b37-129",
						_type: "span",
						marks: [],
						text: "A hybrid with tropical flavor and energetic buzz.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 33,
		},
		price: 30,
		slug: {
			_type: "slug",
			current: "pineapple-express-flower-7",
		},
		strain: "hybrid",
		title: "Pineapple Express (Flower)",
	},
	{
		_id: "370c2a55-225f-40f6-a1d0-3b6d57b3f1ff",
		category: "prerolls",
		description: [
			{
				_key: "b6eb2981-c83",
				_type: "block",
				children: [
					{
						_key: "e428f108-e2a",
						_type: "span",
						marks: [],
						text: "Smooth and relaxing, perfect for winding down after a long day.",
					},
				],
				markDefs: [],
				style: "normal",
			},
		],
		gallery: [
			{
				_type: "image",
				asset: {
					_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
					_type: "reference",
				},
			},
		],
		mainImage: {
			_type: "image",
			asset: {
				_ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-png",
				_type: "reference",
			},
		},
		potency: {
			_type: "potencyType",
			unit: "percent",
			value: 20,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "indica-pre-roll-prerolls-0",
		},
		strain: "sativa",
		title: "Indica Pre-Roll (Prerolls)",
	},
	// ... add more placeholder products as needed
];

// Helper function to find a product by slug
function findPlaceholderProduct(slug: string): Product | null {
	return (
		placeholderProducts.find((product) => product.slug?.current === slug) ||
		null
	);
}

// Function to render Portable Text as JSX
function renderPortableText(blocks: PortableTextBlock[]) {
	console.log("Rendering Portable Text:", blocks);
	return blocks?.map((block, index) => {
		const text = block.children.map((child) => child.text).join("");

		switch (block.style) {
			case "h1":
				return (
					<h1 key={block._key} className={styles.heading1}>
						{text}
					</h1>
				);
			case "h2":
				return (
					<h2 key={block._key} className={styles.heading2}>
						{text}
					</h2>
				);
			case "h3":
				return (
					<h3 key={block._key} className={styles.heading3}>
						{text}
					</h3>
				);
			default:
				return (
					<p key={block._key} className={styles.paragraph}>
						{text}
					</p>
				);
		}
	});
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	let product = await fetchProduct(slug);
	let isPlaceholderProduct = false;

	// If no product found in CMS, search placeholder products
	if (!product._id || product._id === "") {
		const placeholderProduct = findPlaceholderProduct(slug);
		if (placeholderProduct) {
			product = placeholderProduct;
			console.log("Using placeholder product :", product);
			isPlaceholderProduct = true;
		} else {
			notFound();
		}
	}

	// If still no product found, return 404
	// if (!product) {
	// 	notFound();
	// }
	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Back to Products
			</Link>

			<div className={styles.productLayout}>
				{/* Product Image */}
				<div className={styles.imageSection}>
					{product.mainImage && isPlaceholderProduct ? (
						<Image
							// src={urlFor(product.mainImage).url() || ""}
							src={
								product.category === "flower"
									? "/flower.png"
									: product.category === "extracts"
									? "/extracts.png"
									: product.category === "edibles"
									? "/edibles.png"
									: product.category === "prerolls"
									? "/prerolls.png"
									: product.category === "vape"
									? "/vape.png"
									: product.category === "merch"
									? "/merch.png"
									: "/default-product.png"
							}
							alt={product.title || "Product image"}
							className={styles.productImage}
							width={300}
							height={300}
							loading="lazy"
						/>
					) : product.mainImage && !isPlaceholderProduct ? (
						<Image
							src={urlFor(product.mainImage).url() || ""}
							alt={product.title || "Product image"}
							className={styles.productImage}
							width={300}
							height={300}
							loading="lazy"
						/>
					) : (
						<div className={styles.noImage}>
							<span>No image available</span>
						</div>
					)}
				</div>

				{/* Product Details */}
				<div className={styles.detailsSection}>
					{product.category && (
						<div className={styles.category}>{product.category}</div>
					)}

					<h1 className={styles.productTitle}>
						{product.title || "Unnamed Product"}
					</h1>

					<div className={styles.price}>${product.price}</div>

					<div className={styles.description}>
						{renderPortableText(product.description)}
					</div>
				</div>
			</div>
		</div>
	);
}
