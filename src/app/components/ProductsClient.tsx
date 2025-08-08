"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";
import SearchFilter from "./SearchFilter";
import styles from "./ProductsClient.module.css";

interface ProductsClientProps {
	products: Product[];
	categories?: { title: string; slug: string }[];
}

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
				_key: "9868c097-524",
				_type: "block",
				children: [
					{
						_key: "340ea9d3-2dc",
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
			value: 48,
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
			value: 64,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "og-kush-flower-3",
		},
		strain: "indica",
		title: "OG Kush (Flower)",
	},
	{
		_id: "b4921d31-010e-4586-992d-1cc00e75053e",
		category: "flower",
		description: [
			{
				_key: "5b071146-f7c",
				_type: "block",
				children: [
					{
						_key: "cf73194f-258",
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
			value: 73,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "og-kush-flower-4",
		},
		strain: "sativa",
		title: "OG Kush (Flower)",
	},
	{
		_id: "eeb7c4eb-7423-4097-ad0c-74970519299e",
		category: "flower",
		description: [
			{
				_key: "9b34d178-96c",
				_type: "block",
				children: [
					{
						_key: "73ac1312-045",
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
	{
		_id: "2df50e20-c0ca-4d17-81e0-8587245cb4c2",
		category: "prerolls",
		description: [
			{
				_key: "9794a77d-e4f",
				_type: "block",
				children: [
					{
						_key: "2fee9c11-0b6",
						_type: "span",
						marks: [],
						text: "Uplifting and energizing pre-roll for social gatherings.",
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
			value: 55,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "sativa-pre-roll-prerolls-1",
		},
		strain: "hybrid",
		title: "Sativa Pre-Roll (Prerolls)",
	},
	{
		_id: "1997350b-40c1-48a4-a35b-01538fe26fa8",
		category: "prerolls",
		description: [
			{
				_key: "c5c2d1c8-6dd",
				_type: "block",
				children: [
					{
						_key: "74ddad29-bc9",
						_type: "span",
						marks: [],
						text: "Balanced effects for day or night use.",
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
			value: 48,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "hybrid-pre-roll-prerolls-2",
		},
		strain: "indica",
		title: "Hybrid Pre-Roll (Prerolls)",
	},
	{
		_id: "33a619b1-c233-483e-9711-38b48ce8b3e4",
		category: "prerolls",
		description: [
			{
				_key: "61e05b06-04e",
				_type: "block",
				children: [
					{
						_key: "1ecac160-29b",
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
		price: 40,
		slug: {
			_type: "slug",
			current: "indica-pre-roll-prerolls-3",
		},
		strain: "sativa",
		title: "Indica Pre-Roll (Prerolls)",
	},
	{
		_id: "67ab7b25-c6ae-4097-9fd2-7badd5fadb89",
		category: "prerolls",
		description: [
			{
				_key: "6d5ec944-6dd",
				_type: "block",
				children: [
					{
						_key: "46e85be9-39c",
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
			value: 48,
		},
		price: 35,
		slug: {
			_type: "slug",
			current: "indica-pre-roll-prerolls-4",
		},
		strain: "indica",
		title: "Indica Pre-Roll (Prerolls)",
	},
	{
		_id: "6292244a-3f16-494d-ab7e-ac4646bc3ab8",
		category: "prerolls",
		description: [
			{
				_key: "603f6805-6b8",
				_type: "block",
				children: [
					{
						_key: "5c844304-a91",
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
			value: 68,
		},
		price: 35,
		slug: {
			_type: "slug",
			current: "indica-pre-roll-prerolls-5",
		},
		strain: "hybrid",
		title: "Indica Pre-Roll (Prerolls)",
	},
	{
		_id: "bafb87d7-79dd-4e4d-94ea-2de2d8ea1462",
		category: "prerolls",
		description: [
			{
				_key: "6566fb4f-82b",
				_type: "block",
				children: [
					{
						_key: "1227d3aa-2c9",
						_type: "span",
						marks: [],
						text: "Uplifting and energizing pre-roll for social gatherings.",
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
			value: 88,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "sativa-pre-roll-prerolls-6",
		},
		strain: "sativa",
		title: "Sativa Pre-Roll (Prerolls)",
	},
	{
		_id: "39397216-e3be-4d4c-b7fb-7e6523aaea69",
		category: "prerolls",
		description: [
			{
				_key: "1b59450b-a0d",
				_type: "block",
				children: [
					{
						_key: "775b9268-300",
						_type: "span",
						marks: [],
						text: "Uplifting and energizing pre-roll for social gatherings.",
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
			value: 12,
		},
		price: 20,
		slug: {
			_type: "slug",
			current: "sativa-pre-roll-prerolls-7",
		},
		strain: "indica",
		title: "Sativa Pre-Roll (Prerolls)",
	},
	{
		_id: "5c273717-2602-4b45-8a7e-8debc3443a0a",
		category: "vape",
		description: [
			{
				_key: "d5fab645-94a",
				_type: "block",
				children: [
					{
						_key: "60dac06a-039",
						_type: "span",
						marks: [],
						text: "Fresh pine aroma with balanced hybrid effects.",
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
			value: 86,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "pine-vape-cartridge-vape-0",
		},
		strain: "hybrid",
		title: "Pine Vape Cartridge (Vape)",
	},
	{
		_id: "7265305c-1b08-4e06-a15b-0900a81e2aae",
		category: "vape",
		description: [
			{
				_key: "f2e9a3f6-745",
				_type: "block",
				children: [
					{
						_key: "05a855ae-28e",
						_type: "span",
						marks: [],
						text: "Fresh pine aroma with balanced hybrid effects.",
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
			value: 80,
		},
		price: 50,
		slug: {
			_type: "slug",
			current: "pine-vape-cartridge-vape-1",
		},
		strain: "sativa",
		title: "Pine Vape Cartridge (Vape)",
	},
	{
		_id: "32edb373-6240-4c91-a2bc-9c40c9a793c0",
		category: "vape",
		description: [
			{
				_key: "3add6e87-8d3",
				_type: "block",
				children: [
					{
						_key: "40bb7791-08a",
						_type: "span",
						marks: [],
						text: "Fresh pine aroma with balanced hybrid effects.",
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
			value: 82,
		},
		price: 20,
		slug: {
			_type: "slug",
			current: "pine-vape-cartridge-vape-2",
		},
		strain: "sativa",
		title: "Pine Vape Cartridge (Vape)",
	},
	{
		_id: "c4bb5332-dcae-498f-88b7-616747a3c6dd",
		category: "vape",
		description: [
			{
				_key: "9bcd3807-ea9",
				_type: "block",
				children: [
					{
						_key: "a7cf7aee-38e",
						_type: "span",
						marks: [],
						text: "Zesty citrus flavor with uplifting sativa effects.",
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
			value: 80,
		},
		price: 35,
		slug: {
			_type: "slug",
			current: "citrus-burst-vape-vape-3",
		},
		strain: "hybrid",
		title: "Citrus Burst Vape (Vape)",
	},
	{
		_id: "fe19d3bc-ddea-424d-817a-e8ad9359ae49",
		category: "vape",
		description: [
			{
				_key: "8c687e8e-ecd",
				_type: "block",
				children: [
					{
						_key: "66e9dd7e-9f6",
						_type: "span",
						marks: [],
						text: "Sweet mango-flavored THC oil in a premium cartridge.",
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
			value: 57,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "mango-vape-cartridge-vape-4",
		},
		strain: "sativa",
		title: "Mango Vape Cartridge (Vape)",
	},
	{
		_id: "ffcd5cda-f222-437e-a420-0d6690b55bc6",
		category: "vape",
		description: [
			{
				_key: "7c1ea8b6-35b",
				_type: "block",
				children: [
					{
						_key: "350c9f15-8d0",
						_type: "span",
						marks: [],
						text: "Zesty citrus flavor with uplifting sativa effects.",
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
			value: 66,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "citrus-burst-vape-vape-5",
		},
		strain: "hybrid",
		title: "Citrus Burst Vape (Vape)",
	},
	{
		_id: "8876097c-eec9-4462-a116-a8fec855a77f",
		category: "vape",
		description: [
			{
				_key: "5fc15a3f-cf5",
				_type: "block",
				children: [
					{
						_key: "db1c137a-a62",
						_type: "span",
						marks: [],
						text: "Zesty citrus flavor with uplifting sativa effects.",
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
			value: 72,
		},
		price: 30,
		slug: {
			_type: "slug",
			current: "citrus-burst-vape-vape-6",
		},
		strain: "hybrid",
		title: "Citrus Burst Vape (Vape)",
	},
	{
		_id: "92a4813a-c113-4b76-ac74-d6391e798532",
		category: "vape",
		description: [
			{
				_key: "bd885565-1c6",
				_type: "block",
				children: [
					{
						_key: "ee9cd9c9-87e",
						_type: "span",
						marks: [],
						text: "Zesty citrus flavor with uplifting sativa effects.",
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
			value: 17,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "citrus-burst-vape-vape-7",
		},
		strain: "sativa",
		title: "Citrus Burst Vape (Vape)",
	},
	{
		_id: "7875fa12-2569-431a-9584-43ae3738056f",
		category: "edibles",
		description: [
			{
				_key: "2018746c-3f8",
				_type: "block",
				children: [
					{
						_key: "7dae6362-c43",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 73,
		},
		price: 20,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-0",
		},
		strain: "sativa",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "128a5dee-78da-4f61-be21-e230f8044601",
		category: "edibles",
		description: [
			{
				_key: "23159ccf-bd1",
				_type: "block",
				children: [
					{
						_key: "a13ab5ff-ef0",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 21,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-1",
		},
		strain: "hybrid",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "d0b9afa3-6a64-48e2-92b1-248d3ad68480",
		category: "edibles",
		description: [
			{
				_key: "8f6112fb-ed8",
				_type: "block",
				children: [
					{
						_key: "bd6e950c-1cf",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 88,
		},
		price: 40,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-2",
		},
		strain: "indica",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "44a70ef0-f54b-4edd-96ab-e78ffd4c370c",
		category: "edibles",
		description: [
			{
				_key: "acacdce9-604",
				_type: "block",
				children: [
					{
						_key: "3c4b39f2-ec2",
						_type: "span",
						marks: [],
						text: "Rich milk chocolate infused with hybrid cannabis extract.",
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
			value: 43,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "chocolate-bar-edibles-3",
		},
		strain: "hybrid",
		title: "Chocolate Bar (Edibles)",
	},
	{
		_id: "d1fb8df3-d052-4a54-9904-606645392504",
		category: "edibles",
		description: [
			{
				_key: "373ed9a1-197",
				_type: "block",
				children: [
					{
						_key: "46898ffb-c34",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 74,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-4",
		},
		strain: "hybrid",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "3d870388-c968-4a02-8a17-d3c7cf6a97a9",
		category: "edibles",
		description: [
			{
				_key: "3098c726-fe4",
				_type: "block",
				children: [
					{
						_key: "b7f0dc66-fd9",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 78,
		},
		price: 20,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-5",
		},
		strain: "indica",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "af8f33cf-4b60-4bfc-bf17-3c26ab0c947c",
		category: "edibles",
		description: [
			{
				_key: "f3963b9a-8dc",
				_type: "block",
				children: [
					{
						_key: "d055b65b-c82",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 55,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-6",
		},
		strain: "sativa",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "f77bcecd-0fa4-44d3-94b6-6000e5a97242",
		category: "edibles",
		description: [
			{
				_key: "54e51292-1a8",
				_type: "block",
				children: [
					{
						_key: "76937631-449",
						_type: "span",
						marks: [],
						text: "Assorted fruity gummies infused with THC.",
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
			value: 32,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "gummy-bears-edibles-7",
		},
		strain: "indica",
		title: "Gummy Bears (Edibles)",
	},
	{
		_id: "08ee78c0-47d1-43b9-a03b-0b8202976213",
		category: "extracts",
		description: [
			{
				_key: "61925464-80b",
				_type: "block",
				children: [
					{
						_key: "231dfab5-75f",
						_type: "span",
						marks: [],
						text: "Potent sativa shatter with a strong lemon aroma.",
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
			value: 51,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "shatter---lemon-haze-extracts-0",
		},
		strain: "indica",
		title: "Shatter - Lemon Haze (Extracts)",
	},
	{
		_id: "a67d4ce6-eaa8-4537-a2d6-f20a393a9b49",
		category: "extracts",
		description: [
			{
				_key: "752f4e27-c52",
				_type: "block",
				children: [
					{
						_key: "1d00c789-18f",
						_type: "span",
						marks: [],
						text: "Full-spectrum hybrid extract with dessert-like flavor.",
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
			value: 54,
		},
		price: 50,
		slug: {
			_type: "slug",
			current: "live-resin---gelato-extracts-1",
		},
		strain: "sativa",
		title: "Live Resin - Gelato (Extracts)",
	},
	{
		_id: "5e3fcc52-1cc4-4c9b-ba1e-c6cc3126b080",
		category: "extracts",
		description: [
			{
				_key: "41ab46a3-b2c",
				_type: "block",
				children: [
					{
						_key: "d0668d17-842",
						_type: "span",
						marks: [],
						text: "Smooth indica wax for deep relaxation.",
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
			value: 38,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "wax---og-kush-extracts-2",
		},
		strain: "indica",
		title: "Wax - OG Kush (Extracts)",
	},
	{
		_id: "ef4b8303-cc80-4868-80f8-43f55adcb8da",
		category: "extracts",
		description: [
			{
				_key: "647139d1-08d",
				_type: "block",
				children: [
					{
						_key: "8cc30e9e-800",
						_type: "span",
						marks: [],
						text: "Full-spectrum hybrid extract with dessert-like flavor.",
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
			value: 39,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "live-resin---gelato-extracts-3",
		},
		strain: "indica",
		title: "Live Resin - Gelato (Extracts)",
	},
	{
		_id: "74c5d44b-5f30-4afa-bf38-d13d21878762",
		category: "extracts",
		description: [
			{
				_key: "f98bd889-fee",
				_type: "block",
				children: [
					{
						_key: "5ba64246-087",
						_type: "span",
						marks: [],
						text: "Smooth indica wax for deep relaxation.",
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
			value: 47,
		},
		price: 40,
		slug: {
			_type: "slug",
			current: "wax---og-kush-extracts-4",
		},
		strain: "sativa",
		title: "Wax - OG Kush (Extracts)",
	},
	{
		_id: "5f868d10-a787-4dd9-b218-198f64d0be67",
		category: "extracts",
		description: [
			{
				_key: "0514a6a2-e0b",
				_type: "block",
				children: [
					{
						_key: "3a85c1a5-478",
						_type: "span",
						marks: [],
						text: "Full-spectrum hybrid extract with dessert-like flavor.",
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
			value: 51,
		},
		price: 25,
		slug: {
			_type: "slug",
			current: "live-resin---gelato-extracts-5",
		},
		strain: "indica",
		title: "Live Resin - Gelato (Extracts)",
	},
	{
		_id: "c9400e9c-95cf-4c32-bd03-3c8366db0911",
		category: "extracts",
		description: [
			{
				_key: "8c8623f8-c2e",
				_type: "block",
				children: [
					{
						_key: "cd11fa78-c1a",
						_type: "span",
						marks: [],
						text: "Full-spectrum hybrid extract with dessert-like flavor.",
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
			value: 17,
		},
		price: 50,
		slug: {
			_type: "slug",
			current: "live-resin---gelato-extracts-6",
		},
		strain: "hybrid",
		title: "Live Resin - Gelato (Extracts)",
	},
	{
		_id: "b3be7d11-6fae-467a-8ad7-1ae43abb41dc",
		category: "extracts",
		description: [
			{
				_key: "533763fd-b46",
				_type: "block",
				children: [
					{
						_key: "a231eb62-b8a",
						_type: "span",
						marks: [],
						text: "Full-spectrum hybrid extract with dessert-like flavor.",
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
			value: 16,
		},
		price: 40,
		slug: {
			_type: "slug",
			current: "live-resin---gelato-extracts-7",
		},
		strain: "indica",
		title: "Live Resin - Gelato (Extracts)",
	},
	{
		_id: "aa4a97f6-da6c-4f31-b725-3b78d3872ac9",
		category: "merch",
		description: [
			{
				_key: "23a8b15f-207",
				_type: "block",
				children: [
					{
						_key: "a9e2d9fa-0d1",
						_type: "span",
						marks: [],
						text: "Adjustable flat-bill cap with embroidered logo.",
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
			value: 11,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "snapback-hat-merch-0",
		},
		strain: "hybrid",
		title: "Snapback Hat (Merch)",
	},
	{
		_id: "deac6f8d-914f-4448-b923-e9d16e0c9717",
		category: "merch",
		description: [
			{
				_key: "26b2684b-d5c",
				_type: "block",
				children: [
					{
						_key: "16210c80-d38",
						_type: "span",
						marks: [],
						text: "Durable bag for discreet storage.",
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
			value: 35,
		},
		price: 50,
		slug: {
			_type: "slug",
			current: "smell-proof-bag-merch-1",
		},
		strain: "indica",
		title: "Smell-Proof Bag (Merch)",
	},
	{
		_id: "82550f48-0b14-4b49-b59a-f73958d1811c",
		category: "merch",
		description: [
			{
				_key: "9f994c49-53e",
				_type: "block",
				children: [
					{
						_key: "819100d7-678",
						_type: "span",
						marks: [],
						text: "Soft cotton tee with dispensary logo.",
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
			value: 67,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "logo-t-shirt-merch-2",
		},
		strain: "sativa",
		title: "Logo T-Shirt (Merch)",
	},
	{
		_id: "84759b1a-09bb-4671-bdf5-186d15f903ff",
		category: "merch",
		description: [
			{
				_key: "fa333972-06f",
				_type: "block",
				children: [
					{
						_key: "539969d9-abc",
						_type: "span",
						marks: [],
						text: "Adjustable flat-bill cap with embroidered logo.",
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
			value: 57,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "snapback-hat-merch-3",
		},
		strain: "sativa",
		title: "Snapback Hat (Merch)",
	},
	{
		_id: "c9cba20b-5455-40dd-b4e8-5a807eec482a",
		category: "merch",
		description: [
			{
				_key: "196a32b1-db6",
				_type: "block",
				children: [
					{
						_key: "86ffa2ed-430",
						_type: "span",
						marks: [],
						text: "Durable bag for discreet storage.",
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
			value: 48,
		},
		price: 40,
		slug: {
			_type: "slug",
			current: "smell-proof-bag-merch-4",
		},
		strain: "hybrid",
		title: "Smell-Proof Bag (Merch)",
	},
	{
		_id: "f8707b0a-13bc-45a4-9d94-49569336738b",
		category: "merch",
		description: [
			{
				_key: "763faca2-a8c",
				_type: "block",
				children: [
					{
						_key: "05a85be7-ea1",
						_type: "span",
						marks: [],
						text: "Adjustable flat-bill cap with embroidered logo.",
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
			value: 73,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "snapback-hat-merch-5",
		},
		strain: "indica",
		title: "Snapback Hat (Merch)",
	},
	{
		_id: "b4a89d6b-db6c-4b26-b9fb-d305935565a7",
		category: "merch",
		description: [
			{
				_key: "2c77f4ac-d45",
				_type: "block",
				children: [
					{
						_key: "3a1394f3-bab",
						_type: "span",
						marks: [],
						text: "Durable bag for discreet storage.",
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
			value: 62,
		},
		price: 60,
		slug: {
			_type: "slug",
			current: "smell-proof-bag-merch-6",
		},
		strain: "sativa",
		title: "Smell-Proof Bag (Merch)",
	},
	{
		_id: "f5e40d4a-b073-42ee-92fb-37d7d63d85f1",
		category: "merch",
		description: [
			{
				_key: "44e0b089-cd7",
				_type: "block",
				children: [
					{
						_key: "8e27ee49-5fe",
						_type: "span",
						marks: [],
						text: "Soft cotton tee with dispensary logo.",
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
			value: 48,
		},
		price: 70,
		slug: {
			_type: "slug",
			current: "logo-t-shirt-merch-7",
		},
		strain: "hybrid",
		title: "Logo T-Shirt (Merch)",
	},
];
export default function ProductsClient({
	products,
	categories,
}: ProductsClientProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize state from URL parameters
	const [searchTerm, setSearchTerm] = useState<string>(
		searchParams.get("search") || ""
	);
	const [filters, setFilters] = useState<{
		category: string;
	}>({
		category: searchParams.get("category") || "all",
	});

	const [sortBy, setSortBy] = useState<string>(
		searchParams.get("sort") || "name-asc"
	);

	// Watch for URL parameter changes and update state accordingly
	useEffect(() => {
		const newSearchTerm = searchParams.get("search") || "";
		const newCategory = searchParams.get("category") || "all";
		const newSortBy = searchParams.get("sort") || "name-asc";

		setSearchTerm(newSearchTerm);
		setFilters({
			category: newCategory,
		});
		setSortBy(newSortBy);
	}, [searchParams]);

	// Update URL when filters change
	const updateURL = (
		newSearchTerm: string,
		newFilters: { category: string },
		newSortBy?: string
	) => {
		const params = new URLSearchParams();

		if (newSearchTerm) {
			params.set("search", newSearchTerm);
		}

		if (newFilters.category && newFilters.category !== "all") {
			params.set("category", newFilters.category);
		}

		if (newSortBy && newSortBy !== "name-asc") {
			params.set("sort", newSortBy);
		}

		const newURL = params.toString()
			? `?${params.toString()}`
			: window.location.pathname;
		router.push(newURL, { scroll: false });
	};

	// Get categories from props or extract from products
	const availableCategories = useMemo(() => {
		if (categories && categories.length > 0) {
			return [{ title: "All", slug: "all" }, ...categories];
		}

		// Extract unique categories from products
		const uniqueCategories = Array.from(
			new Set(products.map((product) => product.category).filter(Boolean))
		)
			.sort()
			.map((category) => ({
				title: category,
				slug: category.toLowerCase(),
			}));

		return [{ title: "All", slug: "all" }, ...uniqueCategories];
	}, [categories, products]);

	// Filter and search products based on current state
	const filteredProducts = useMemo(() => {
		let filtered = [products, ...placeholderProducts].flat();

		// Filter by search term
		if (searchTerm.trim()) {
			filtered = filtered.filter(
				(product) =>
					product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filter by category
		if (filters.category !== "all") {
			filtered = filtered.filter(
				(product) =>
					product.category.toLowerCase() === filters.category.toLowerCase()
			);
		}

		// Sort products
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "name-asc":
					return (a.title || "").localeCompare(b.title || "");
				case "name-desc":
					return (b.title || "").localeCompare(a.title || "");
				case "price-asc":
					return a.price - b.price;
				case "price-desc":
					return b.price - a.price;
				default:
					return 0;
			}
		});

		return filtered;
	}, [products, searchTerm, filters, sortBy]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		updateURL(term, filters, sortBy);
	};

	const handleFilter = (newFilters: { category: string }) => {
		setFilters(newFilters);
		updateURL(searchTerm, newFilters, sortBy);
	};

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		updateURL(searchTerm, filters, newSortBy);
	};

	// Function to clear all filters
	const clearFilters = () => {
		const defaultFilters = { category: "all" };
		const defaultSort = "name-asc";
		setFilters(defaultFilters);
		setSearchTerm("");
		setSortBy(defaultSort);
		updateURL("", defaultFilters, defaultSort);
	};

	return (
		<>
			<SearchFilter
				onSearch={handleSearch}
				onFilter={handleFilter}
				categories={availableCategories}
				initialSearchTerm={searchTerm}
				initialCategory={filters.category}
			/>

			<div className={styles.productsContainer}>
				{/* Sort Controls */}
				<div className={styles.sortSection}>
					<label htmlFor="sort-select" className={styles.sortLabel}>
						Sort by:
					</label>
					<select
						id="sort-select"
						value={sortBy}
						onChange={(e) => handleSort(e.target.value)}
						className={styles.sortSelect}>
						<option value="name-asc">Name (A-Z)</option>
						<option value="name-desc">Name (Z-A)</option>
						<option value="price-asc">Price (Low to High)</option>
						<option value="price-desc">Price (High to Low)</option>
					</select>
				</div>
				{filteredProducts.length === 0 ? (
					<div className={styles.emptyState}>
						<h3 className={styles.emptyStateTitle}>No products found</h3>
						<p className={styles.emptyStateText}>
							Try adjusting your search or filters.
						</p>
					</div>
				) : (
					<ProductGrid products={filteredProducts} />
				)}
			</div>
		</>
	);
}
