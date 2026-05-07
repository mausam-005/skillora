'use client'
import { useState, useEffect, useRef } from 'react'
import api from '../../../lib/axios'
import './CourseCard.css'

export default function CourseCard({ 
  course, 
  isBookmarked: initialBookmarked = false, 
  onBookmarkToggle, 
  showRemoveOption = false
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)
  const [showTooltip, setShowTooltip] = useState(false)
  const hoverTimeoutRef = useRef(null)

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const token = localStorage.getItem('token')
      if (!token) return;
      try {
        const res = await api.get('/user/profile')
        const bookmarks = res.data.bookmarks || []
        setIsBookmarked(bookmarks.some(b => b._id === course.id || b === course.id))
      } catch (err) {}
    }
    if (!initialBookmarked) checkBookmarkStatus()
  }, [course.id, initialBookmarked])

  const handleBookmarkToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please log in to bookmark courses')
      return
    }
    
    try {
      await api.put('/user/bookmarks', { courseId: course.id })
      setIsBookmarked(!isBookmarked)
      
      if (onBookmarkToggle) {
        onBookmarkToggle(course)
      }
      window.dispatchEvent(new Event('storage')) // Trigger header update if needed
    } catch (err) {
      alert('Failed to update bookmark')
    }
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please log in to add items to your cart')
      return
    }
    
    try {
      await api.put('/user/cart', { courseId: course.id, action: 'add' })
      window.dispatchEvent(new Event('storage'))
      alert(`${course.title} has been added to your cart!`)
    } catch (err) {
      alert('Failed to add to cart')
    }
  }

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true)
    }, 300)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current)
    setShowTooltip(false)
  }

  useEffect(() => {
    return () => clearTimeout(hoverTimeoutRef.current)
  }, [])

  const displayPrice = () => {
    if (course.price === undefined || course.price === null) return 'Free'
    if (course.price === 0) return 'Free'
    return `$${Number(course.price).toFixed(2)}`
  }

  const displayRating = () => {
    if (!course.rating) return '0.0'
    return Number(course.rating).toFixed(1)
  }

  return (
    <div className="course-card">
      <div className="course-image-container">
        <img 
          src={course.image || '/images/course-placeholder.png'} 
          alt={course.title} 
          className="course-image" 
          onError={(e) => {
            e.target.src = '/images/course-placeholder.png'
          }}
        />
        <div className="course-actions">
          <button 
            onClick={handleBookmarkToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" strokeWidth="2"/>
              </svg>
            )}
          </button>
          {showTooltip && (
            <div className="bookmark-tooltip-wrapper">
              <span className="bookmark-tooltip">
                {isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="course-details">
        <span className="course-category">{course.category || 'Uncategorized'}</span>
        <h3 className="course-title">{course.title || 'Untitled Course'}</h3>
        <p className="course-instructor">{course.instructor || 'Unknown Instructor'}</p>
        <div className="course-meta">
          <span className={`course-price ${!course.price || course.price === 0 ? 'free' : ''}`}>
            {displayPrice()}
          </span>
          <div className="course-rating">
            <span className="stars">
              {'★'.repeat(Math.floor(course.rating || 0))}
              {'☆'.repeat(5 - Math.floor(course.rating || 0))}
            </span>
            <span className="rating-value">{displayRating()}</span>
          </div>
        </div>
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
      {showRemoveOption && (
        <button 
          onClick={handleBookmarkToggle}
          className="remove-bookmark"
        >
          Remove from bookmarks
        </button>
      )}
    </div>
  )
}