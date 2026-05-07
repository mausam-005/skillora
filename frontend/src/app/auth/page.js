'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '../../lib/axios'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './auth.css'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }
    
    if (!isLogin && !formData.name) {
      setError('Please enter your name')
      return
    }
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;
        
      const res = await api.post(endpoint, payload);
      
      // Save token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Force trigger storage event to update Header
      window.dispatchEvent(new Event('storage'));
      
      router.push('/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during authentication');
    }
  }

  return (
    <>
      <Header />
      <main className="auth-page">
        <div className="container">
          <div className="auth-form-container">
            <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
            
            <div className="auth-toggle">
              <button
                className={isLogin ? 'active' : ''}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={!isLogin ? 'active' : ''}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}