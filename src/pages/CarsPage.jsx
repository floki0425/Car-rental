import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'
import carsData from '../data/fallbackCars'
import { getTripDetailsFromNavigation, getTripDetailsSearch } from '../lib/utils'

function CarsPage() {
  const location = useLocation()
  const [filters, setFilters] = useState({ search: '', type: '', transmission: '', sort: 'asc' })
  const tripDetails = useMemo(() => getTripDetailsFromNavigation(location), [location])
  const tripSearch = useMemo(() => {
    const search = getTripDetailsSearch(tripDetails)
    return search ? `?${search}` : ''
  }, [tripDetails])
  const tripState = useMemo(() => ({ tripDetails }), [tripDetails])

  const filteredCars = useMemo(() => {
    const query = filters.search.toLowerCase()
    return [...carsData]
      .filter((car) => (!filters.type ? true : car.type === filters.type))
      .filter((car) => (!filters.transmission ? true : car.transmission === filters.transmission))
      .filter((car) => car.name.toLowerCase().includes(query))
      .sort((a, b) => (filters.sort === 'asc' ? a.price_per_day - b.price_per_day : b.price_per_day - a.price_per_day))
  }, [filters])

  return (
    <section className="bg-gray-50">
      <div className="container-shell py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Premium Selection</p>
          <h1 className="mt-4 section-title">Explore Our Fleet</h1>
          <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
            Find your perfect ride for any trip, from weekday errands to executive travel and weekend escapes.
          </p>
        </div>

        <div className="mt-10">
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>

        {!filteredCars.length && (
          <div className="mt-8 rounded-none border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-black text-gray-950">No cars found</p>
            <p className="mt-2 text-sm text-gray-600">Try changing your search, vehicle type, or transmission filter.</p>
          </div>
        )}

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => <CarCard key={car.id} car={car} tripSearch={tripSearch} tripState={tripState} />)}
        </div>
      </div>

      <div id="concierge" className="bg-black px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Did not find what you are looking for?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Our team can help source a specific vehicle model or arrange a custom long-term rental for your schedule.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#concierge" className="primary-button">Contact Concierge</a>
            <a href="/cars" className="secondary-button border-white/20 bg-transparent text-white hover:bg-white hover:text-gray-950">Browse All Fleet</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarsPage
