import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>SKILLORA</Link>
      <nav className={styles.nav}>
        <Link href="/about" className={styles.navLink}>About</Link>
        <Link href="/courses" className={styles.navLink}>Courses</Link>
        <Link href="/bookmarks" className={styles.navLink}>Bookmarks</Link>
        <Link href="/login" className={styles.authButton}>Login</Link>
      </nav>
    </header>
  )
}