import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>Fire Houze</h3>
            <p className={styles.brandDescription}>
              Premium quality supplies with that fire touch.
            </p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Shop</h4>
              <Link href="/" className={styles.link}>All Products</Link>
              <Link href="/categories" className={styles.link}>Categories</Link>
              <Link href="/deals" className={styles.link}>Deals</Link>
            </div>
            
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Support</h4>
              <Link href="/contact" className={styles.link}>Contact</Link>
              <Link href="/faq" className={styles.link}>FAQ</Link>
              <Link href="/shipping" className={styles.link}>Shipping</Link>
            </div>
            
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Connect</h4>
              <a href="#" className={styles.link}>Instagram</a>
              <a href="#" className={styles.link}>Twitter</a>
              <a href="#" className={styles.link}>Facebook</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 Fire Houze Supply Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
