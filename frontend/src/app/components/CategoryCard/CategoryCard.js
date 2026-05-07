import Link from 'next/link'
import './CategoryCard.css'

export default function CategoryCard({ category }) {
  return (
    <Link href={`/courses?category=${category.id}`} className="category-card">
      <div className="category-icon">
        {category.icon}
      </div>
      <h3>{category.name}</h3>
      <p>{courseCount} courses</p>
    </Link>
  )
}