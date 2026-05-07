'use client'
import { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import CourseCard from '../components/CourseCard/CourseCard'
import Footer from '../components/Footer/Footer'
import Link from 'next/link'
import api from '../../lib/axios'
import './bookmarks.css'

export default function BookmarksPage() {
  const [bookmarkedCourses, setBookmarkedCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const res = await api.get('/user/profile')
        if (res.data.bookmarks) {
          const mapped = res.data.bookmarks.map(b => ({ ...b, id: b._id }))
          setBookmarkedCourses(mapped)
        }
      } catch (err) {}
      setIsLoading(false)
    }
    fetchBookmarks()
  }, [])

  const handleBookmarkToggle = async (course) => {
    try {
      await api.put('/user/bookmarks', { courseId: course.id })
      setBookmarkedCourses(prev => prev.filter(b => b.id !== course.id))
      window.dispatchEvent(new Event('storage'))
    } catch(err) {
      alert('Failed to remove bookmark')
    }
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Loading your bookmarks...</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="bookmarks-page">
        <div className="container">
          <h1>Your Bookmarked Courses</h1>
          
          {bookmarkedCourses.length > 0 ? (
            <div className="courses-grid">
              {bookmarkedCourses.map((course) => (
              <CourseCard
                key={`${course.id}-${course.title}`} // More unique key
                course={course}
                isBookmarked={true}
                onBookmarkToggle={handleBookmarkToggle}
                showRemoveOption={true}
              />
            ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No bookmarks yet</h2>
              <p>Save your favorite courses to access them later</p>
              <Link href="/courses" className="browse-button">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}