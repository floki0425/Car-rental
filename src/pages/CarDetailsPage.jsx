import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import fallbackCars from '../data/fallbackCars'
import { supabase } from '../lib/supabase'
import { formatPHP } from '../lib/utils'

function CarDetailsPage() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    const fetchCar = async () => {
      try {
        if (supabase) {
          const { data } = await supabase.from('cars').select('*').eq('id', id).maybeSingle()
          if (data) { setCar(data); setActiveImage(data.image_url); return }
        }
        const localCar = fallbackCars.find((item) => item.id === id || item.slug === id)
        setCar(localCar || null)
        setActiveImage(localCar?.image_url || '')
      } finally { setLoading(false) }
    }
    fetchCar()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!car) return <p className="container-shell py-12">Car not found.</p>
  const gallery = car.gallery?.length ? car.gallery : [car.image_url]

  return (
    <section className="container-shell py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img src={activeImage || car.image_url} alt={car.name} className="h-72 w-full rounded-2xl object-cover sm:h-96" />
          <div className="mt-3 flex gap-2 overflow-auto">{gallery.map((img) => <button key={img} type="button" className="rounded-xl border border-slate-200" onClick={() => setActiveImage(img)}><img src={img} alt={`${car.name} thumbnail`} className="h-16 w-24 rounded-xl object-cover" /></button>)}</div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{car.name}</h1>
          <p className="mt-2 text-2xl font-bold text-blue-700">{formatPHP(car.price_per_day)} / day</p>
          <div className="card mt-5 grid grid-cols-2 gap-3 text-sm"><p>Seats: {car.seats}</p><p>Transmission: {car.transmission}</p><p>Fuel Type: {car.fuel_type}</p><p>Doors: {car.doors}</p><p>Aircon: Yes</p></div>
          <p className="card mt-4 text-slate-700">{car.overview}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="card"><h2 className="font-semibold">Features</h2><ul className="mt-2 list-inside list-disc text-sm text-slate-700">{(car.features || []).map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
            <div className="card"><h2 className="font-semibold">Requirements</h2><ul className="mt-2 list-inside list-disc text-sm text-slate-700">{(car.requirements || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <Link to={`/booking/${car.id}`} className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Book This Car</Link>
        </div>
      </div>
    </section>
  )
}

export default CarDetailsPage

