import { Link } from 'react-router-dom'
import { formatPHP } from '../lib/utils'

function CarCard({ car }) {
  return (
    <article className="card flex h-full flex-col">
      <img src={car.image_url} alt={car.name} className="h-44 w-full rounded-xl object-cover" loading="lazy" />
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold">{car.name}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {car.seats} Seats • {car.transmission}
        </p>
        <p className="mt-3 text-xl font-bold text-blue-700">{formatPHP(car.price_per_day)} / day</p>
        <Link
          to={`/cars/${car.id}`}
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-navy)] px-4 py-2 font-medium text-white transition hover:bg-slate-800"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}

export default CarCard

