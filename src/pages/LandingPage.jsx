import { Link } from 'react-router-dom'
import CarCard from '../components/CarCard'
import fallbackCars from '../data/fallbackCars'

const benefits = ['Best Prices', 'Well Maintained', 'With or Without Driver', '24/7 Support']
const categories = ['Sedan', 'SUV', 'Van', 'Luxury']

function LandingPage() {
  return (
    <>
      <section className="container-shell py-14">
        <div className="rounded-3xl bg-[var(--brand-navy)] p-8 text-white shadow-xl sm:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-200">DriveGo Car Rentals</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Rent a Car Your Way</h1>
          <p className="mt-4 max-w-2xl text-blue-100">Affordable and reliable car rental services for city drives, family trips, and business travel.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/cars" className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white">Book Now</Link>
            <Link to="/cars" className="rounded-xl border border-blue-300 px-5 py-3 font-semibold text-white">View Cars</Link>
          </div>
        </div>
      </section>

      <section className="container-shell py-8"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((item) => <article key={item} className="card text-center font-semibold">{item}</article>)}</div></section>
      <section className="container-shell py-8"><h2 className="section-title">Popular Categories</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{categories.map((category) => <div key={category} className="card text-center font-semibold">{category}</div>)}</div></section>
      <section className="container-shell py-8"><div className="flex items-end justify-between"><h2 className="section-title">Popular Cars</h2><Link to="/cars" className="text-sm font-semibold text-blue-700">Browse all</Link></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fallbackCars.slice(0, 3).map((car) => <CarCard key={car.id} car={car} />)}</div></section>
      <section className="container-shell py-8"><h2 className="section-title">Testimonials</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{['Super easy booking process and smooth ride.', 'Great value and very clean vehicles.', 'Customer support was fast and helpful.'].map((text) => <blockquote key={text} className="card text-slate-700">"{text}"</blockquote>)}</div></section>
      <section className="container-shell py-8"><h2 className="section-title">Why Choose DriveGo</h2><p className="mt-3 card text-slate-700">We focus on comfort, transparent pricing, and dependable service to help you get on the road with confidence.</p></section>
      <section className="container-shell py-12"><div className="rounded-3xl bg-blue-600 p-8 text-center text-white"><h2 className="text-3xl font-bold">Ready to book your ride?</h2><Link to="/cars" className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-blue-700">View Available Cars</Link></div></section>
    </>
  )
}

export default LandingPage

