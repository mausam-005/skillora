'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import './Header.css'

export default function Header() {
  const [theme, setTheme] = useState('light')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Initialize theme and load cart
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)

    const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      if (!token) return;
      try {
        const res = await api.get('/user/profile')
        setUser(res.data)
        setCartItems(res.data.cart || [])
      } catch (err) {
        console.error('Not logged in')
      }
    }
    fetchProfile()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  // Update cart items count when cart changes or user logs in
  useEffect(() => {
    const handleStorageChange = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(null)
        setCartItems([])
        return
      }
      try {
        const res = await api.get('/user/profile')
        setUser(res.data)
        setCartItems(res.data.cart || [])
      } catch (err) {}
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setCartItems([])
    window.dispatchEvent(new Event('storage'))
    router.push('/')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo" onClick={closeMenu}>
            <img 
              src="/images/logo.png" 
              alt="Skillora Logo" 
              width={36}
              height={36}
              className="logo-img" 
            />
            <span className="logo-text">Skillora</span>
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <ul className="nav-list">
              <li className="nav-item">
                <Link href="/courses" className="nav-link" onClick={closeMenu}>
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/bookmarks" className="nav-link" onClick={closeMenu}>
                  Bookmarks
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/cart" className="nav-link" onClick={closeMenu}>
                  Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <button className="nav-link" onClick={handleLogout} style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>
                    Sign Out ({user.name})
                  </button>
                ) : (
                  <Link href="/auth" className="nav-link" onClick={closeMenu}>
                    Sign In
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <button 
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? (
                    <span className="theme-icon">🌙</span>
                  ) : (
                    <span className="theme-icon">☀️</span>
                  )}
                  <span className="theme-text">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}