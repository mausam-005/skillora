'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar/SearchBar'
import FilterBar from '../components/FilterBar/FilterBar'
import CourseCard from '../components/CourseCard/CourseCard'
import Footer from '../components/Footer/Footer'
import './courses.css'

import api from '../../lib/axios'

// Mock data for categories (you could also move this to DB later)
const categories = [
  { id: 'web-dev', name: 'Web Development' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'mobile-dev', name: 'Mobile Development' },
  { id: 'design', name: 'Design' },
  { id: 'business', name: 'Business' },
  { id: 'marketing', name: 'Marketing' }
]

function CoursesContent() {
  const searchParams = useSearchParams()
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const handleBookmarkToggle = (course) => {
    // Re-render handled internally or trigger refresh if needed
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams()
        
        const category = searchParams.get('category')
        const search = searchParams.get('search')
        const price = searchParams.get('price')
        const rating = searchParams.get('rating')
        
        if (category) queryParams.append('category', category)
        if (search) queryParams.append('search', search)
        if (price) queryParams.append('price', price)
        if (rating) queryParams.append('rating', rating)

        const res = await api.get(`/courses?${queryParams.toString()}`)
        // Map _id from MongoDB to id for frontend compatibility
        const mappedCourses = res.data.map(c => ({ ...c, id: c._id }))
        setFilteredCourses(mappedCourses)
      } catch (err) {
        console.error('Failed to fetch courses', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [searchParams])

  return (
    <>
      <SearchBar />
      <FilterBar categories={categories} />
      
      {loading ? (
        <div className="loading-state">Loading courses...</div>
      ) : filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No courses found matching your criteria.</p>
          <button 
            className="btn primary"
            onClick={() => window.location.href = '/courses'}
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  )
}

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="courses-page">
        <div className="container">
          <h1>Browse Courses</h1>
          <Suspense fallback={<div className="loading-state">Loading courses...</div>}>
            <CoursesContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}