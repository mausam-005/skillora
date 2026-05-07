import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './about.css'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page">
        <div className="container">
          <div className="about-header">
            <h1 className="about-title">About <span>Skillora</span></h1>
            <p className="about-intro">
              Empowering learners worldwide with accessible, high-quality education
            </p>
          </div>
          
          <div className="about-content">
            <section className="about-section" aria-labelledby="mission-heading">
              <div className="about-icon">🚀</div>
              <h2 id="mission-heading">Our Mission</h2>
              <p>
                Skillora was founded with one goal: to make learning accessible, flexible, and inspiring.
                We believe everyone deserves the chance to learn skills that empower their future — anywhere, anytime.
              </p>
            </section>
            
            <section className="about-section" aria-labelledby="team-heading">
              <div className="about-icon">👩‍💻</div>
              <h2 id="team-heading">Our Team</h2>
              <p>
                We're a collective of passionate educators, developers, and designers committed
                to crafting a seamless learning experience — combining curated content with intuitive design.
              </p>
            </section>
            
            <section className="about-section" aria-labelledby="why-heading">
              <div className="about-icon">✨</div>
              <h2 id="why-heading">Why Choose Skillora?</h2>
              <ul className="about-features">
                <li className="about-feature">
                  <span className="feature-icon">📚</span>
                  <span>Curated high-quality courses from trusted educators</span>
                </li>
                <li className="about-feature">
                  <span className="feature-icon">🔍</span>
                  <span>Smart recommendations based on your interests</span>
                </li>
                <li className="about-feature">
                  <span className="feature-icon">⭐</span>
                  <span>Save your favorites with our easy bookmark system</span>
                </li>
                <li className="about-feature">
                  <span className="feature-icon">🆕</span>
                  <span>Fresh content added regularly</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}