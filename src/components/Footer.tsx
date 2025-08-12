import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { urlFor } from "../lib/sanity";
import { Logo } from "@/types";

export default function Footer({ logo }: { logo: Logo }) {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.brand}>
						<Image
							src={logo ? urlFor(logo.image).url() : "/default-logo.png"}
							alt={logo?.title || "Fire Houze"}
							width={120}
							height={75}
						/>
					</div>
					<p className={styles.copyright}>
						© 2025 Firehouze Supply Co. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
