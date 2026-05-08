// app/Cart/page.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '../../lib/axios'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './cart.css'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        const res = await api.get('/user/profile')
        if (res.data.cart) {
          const items = res.data.cart.map(item => ({
            ...item.course,
            id: item.course._id,
            quantity: item.quantity,
          }))
          setCartItems(items)
        }
      } catch (err) {}
    }
    fetchCart()
  }, [])

  return (
    <>
      <Header />
      <main className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link href="/courses">Browse Courses</Link>
            </div>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}