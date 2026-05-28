import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import LandingPage from './pages/LandingPage'
import CarsPage from './pages/CarsPage'
import CarDetailsPage from './pages/CarDetailsPage'
import BookingPage from './pages/BookingPage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/booking/:carId" element={<BookingPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App

