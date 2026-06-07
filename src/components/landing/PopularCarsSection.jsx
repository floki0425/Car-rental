import { Link } from 'react-router-dom'
import { cleanTripDetails, formatPHP, getTripDetailsSearch } from '../../lib/utils'
import LandingIcon from './LandingIcon'

function PopularCarCard({ car, tripSearch = '', tripState }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-none border border-gray-200/90 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
      <div className="relative h-[15rem] overflow-hidden bg-gray-200">
        <img
          src={car.image_url}
          alt={car.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="p-6">
          <h3 className="text-lg font-black tracking-tight text-gray-950">{car.name}</h3>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-600">
            <span className="inline-flex items-center gap-2">
              <LandingIcon name="seat" className="h-3.5 w-3.5 text-gray-700" />
              {car.seats} Seats
            </span>
            <span className="inline-flex items-center gap-2">
              <LandingIcon name="gear" className="h-3.5 w-3.5 text-gray-700" />
              {car.transmission}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 px-6 py-5">
          <p>
            <span className="text-lg font-black text-black sm:text-xl">{formatPHP(car.price_per_day)}</span>
            <span className="ml-1 text-xs font-semibold text-gray-500">/ day</span>
          </p>
          <Link
            to={{ pathname: `/booking/${car.id}`, search: tripSearch }}
            state={tripState}
            className="inline-flex h-9 min-w-16 items-center justify-center rounded-none bg-black px-4 text-xs font-black text-white shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  )
}

function PopularCarsSection({ cars, tripDetails = {} }) {
  const cleanDetails = cleanTripDetails(tripDetails)
  const search = getTripDetailsSearch(tripDetails)
  const tripSearch = search ? `?${search}` : ''
  const tripState = { tripDetails: cleanDetails }

  return (
    <section id="popular-cars" className="scroll-mt-24 bg-gray-50 px-4 pb-16 pt-8 sm:px-6 sm:pb-[4.5rem] sm:pt-10 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
           
            <h2 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">Available Cars</h2>
          </div>
          <Link
            to={{ pathname: '/cars', search: tripSearch }}
            state={tripState}
            className="inline-flex items-center gap-2 self-start text-sm font-bold text-black transition hover:gap-3 hover:text-black sm:self-auto"
          >
            Browse all <LandingIcon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cars.map((car) => (
            <PopularCarCard key={car.id} car={car} tripSearch={tripSearch} tripState={tripState} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularCarsSection
