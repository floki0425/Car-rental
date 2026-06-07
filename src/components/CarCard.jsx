import { Link } from 'react-router-dom'
import { formatPHP } from '../lib/utils'

function SpecIcon({ type }) {
  const paths = {
    seats: 'M7 4h5a3 3 0 0 1 3 3v5H8a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Zm1 8v6m0 0h9m-9 0H5',
    transmission: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6',
  }

  return (
    <svg className="h-4 w-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  )
}

function CarCard({ car, tripSearch = '', tripState }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-none border border-gray-200 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
      <div className="relative h-56 overflow-hidden bg-gray-900">
        <img src={car.image_url} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/45 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-none bg-white px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-black shadow-sm">
          {car.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-950">{car.name}</h3>
          <p className="mt-1 text-sm font-medium text-gray-500">{car.fuel_type || 'Premium rental vehicle'}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-gray-100 py-4 text-sm font-semibold text-gray-600">
          <span className="inline-flex items-center gap-2">
            <SpecIcon type="seats" />
            {car.seats} Seats
          </span>
          <span className="inline-flex items-center gap-2">
            <SpecIcon type="transmission" />
            {car.transmission}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p>
            <span className="block text-xl font-black text-black">{formatPHP(car.price_per_day)}</span>
            <span className="text-sm font-medium text-gray-500">/ day</span>
          </p>
          <Link
            to={{ pathname: `/cars/${car.id}`, search: tripSearch }}
            state={tripState}
            className="inline-flex items-center justify-center rounded-none bg-black px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CarCard
