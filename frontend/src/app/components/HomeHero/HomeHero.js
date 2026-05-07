'use client'
import Link from 'next/link'
import './HomeHero.css'

export default function HomeHero() {
  return (
    <section className="hero" aria-label="Main hero section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Perfect Course</h1>
          <p className="hero-subtitle">
            Find and bookmark the best online courses to boost your skills and advance your career
          </p>
          <div className="hero-actions">
            <Link href="/courses" className="hero-button primary">
              Browse Courses
            </Link>
            <Link href="/auth" className="hero-button secondary">
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}