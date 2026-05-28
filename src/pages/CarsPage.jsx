import { useEffect, useMemo, useState } from 'react'
import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'
import LoadingSpinner from '../components/LoadingSpinner'
import fallbackCars from '../data/fallbackCars'
import { supabase } from '../lib/supabase'

function CarsPage() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ search: '', type: '', transmission: '', sort: 'asc' })

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (!supabase) { setCars(fallbackCars); return }
        const { data, error: fetchError } = await supabase.from('cars').select('*').eq('is_available', true)
        if (fetchError) throw fetchError
        setCars(data?.length ? data : fallbackCars)
      } catch {
        setError('Unable to load cars from server. Showing sample cars instead.')
        setCars(fallbackCars)
      } finally { setLoading(false) }
    }
    fetchCars()
  }, [])

  const filteredCars = useMemo(() => {
    const query = filters.search.toLowerCase()
    return [...cars]
      .filter((car) => (!filters.type ? true : car.type === filters.type))
      .filter((car) => (!filters.transmission ? true : car.transmission === filters.transmission))
      .filter((car) => car.name.toLowerCase().includes(query))
      .sort((a, b) => (filters.sort === 'asc' ? a.price_per_day - b.price_per_day : b.price_per_day - a.price_per_day))
  }, [cars, filters])

  return (
    <section className="container-shell py-10">
      <h1 className="section-title">Available Cars</h1>
      <p className="mt-2 text-slate-600">Find your perfect ride for any trip.</p>
      <div className="mt-5"><FilterBar filters={filters} setFilters={setFilters} /></div>
      {loading && <LoadingSpinner />}
      {!!error && <p className="mt-4 rounded-xl bg-amber-100 p-3 text-amber-700">{error}</p>}
      {!loading && !filteredCars.length && <p className="mt-6 rounded-xl bg-white p-6 text-center text-slate-600 shadow">No cars found for your filters.</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredCars.map((car) => <CarCard key={car.id} car={car} />)}</div>
    </section>
  )
}

export default CarsPage

