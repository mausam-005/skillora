import Link from 'next/link'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Find Your Perfect Online Course</h1>
        <p>Discover thousands of courses from top platforms</p>
        <Link href="/courses" className={styles.ctaButton}>
          Browse Courses
        </Link>
      </div>
    </section>
  )
}