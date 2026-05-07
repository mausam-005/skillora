'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './FilterBar.css'

export default function FilterBar({ categories }) {
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    level: '',
    rating: '',
    duration: '',
    sort: ''
  })
  const router = useRouter()

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters)
    updateUrl(newFilters)
  }

  const updateUrl = (filters) => {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })
    router.push(`/courses?${queryParams.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      price: '',
      level: '',
      rating: '',
      duration: '',
      sort: ''
    })
    router.push('/courses')
  }

  return (
    <div className="filter-container">
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price">Price</label>
          <select
            id="price"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
          >
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="">Default</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      <button onClick={clearFilters} className="clear-filters">
        Clear All Filters
      </button>
    </div>
  )
}