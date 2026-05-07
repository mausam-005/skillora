import Header from './components/Header/Header'
import HomeHero from './components/HomeHero/HomeHero'
import Footer from './components/Footer/Footer'

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <HomeHero />
      </main>
      <Footer />
    </div>
  )
}
