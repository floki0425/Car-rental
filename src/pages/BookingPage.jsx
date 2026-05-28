import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import fallbackCars from '../data/fallbackCars'
import { supabase } from '../lib/supabase'

const initialState = {
  full_name: '',
  email: '',
  phone: '',
  pickup_date: '',
  return_date: '',
  pickup_location: '',
  rental_option: 'Self Drive',
  message: '',
}

function BookingPage() {
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getCar = async () => {
      if (supabase) {
        const { data } = await supabase.from('cars').select('*').eq('id', carId).maybeSingle()
        if (data) { setCar(data); return }
      }
      setCar(fallbackCars.find((item) => item.id === carId || item.slug === carId) || null)
    }
    getCar()
  }, [carId])

  const isInvalidDates = useMemo(() => {
    if (!form.pickup_date || !form.return_date) return false
    return new Date(form.return_date) < new Date(form.pickup_date)
  }, [form.pickup_date, form.return_date])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (isInvalidDates) return setError('Return date must be on or after pickup date.')
    if (!supabase) return setError('Supabase is not configured. Add env variables to submit inquiries.')

    setSubmitting(true)
    try {
      const payload = { ...form, car_id: carId }
      const { error: insertError } = await supabase.from('booking_inquiries').insert(payload)
      if (insertError) throw insertError

      const { error: fnError } = await supabase.functions.invoke('send-booking-email', {
        body: { ...payload, car_name: car?.name || 'Selected Car' },
      })
      if (fnError) console.error('Email function error:', fnError)
      navigate('/thank-you')
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="container-shell py-10">
      <h1 className="section-title">Booking Inquiry</h1>
      <p className="mt-2 text-slate-600">{car ? `You selected: ${car.name}` : 'Complete the form below to continue.'}</p>
      <form onSubmit={handleSubmit} className="card mt-6 grid gap-4" noValidate>
        <input required name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="rounded-xl border border-slate-300 px-3 py-2" />
        <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="rounded-xl border border-slate-300 px-3 py-2" />
        <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="rounded-xl border border-slate-300 px-3 py-2" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">Pickup Date<input required type="date" name="pickup_date" value={form.pickup_date} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" /></label>
          <label className="grid gap-1 text-sm">Return Date<input required type="date" name="return_date" value={form.return_date} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" /></label>
        </div>
        <input required name="pickup_location" value={form.pickup_location} onChange={handleChange} placeholder="Pickup Location" className="rounded-xl border border-slate-300 px-3 py-2" />
        <select required name="rental_option" value={form.rental_option} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2"><option>Self Drive</option><option>With Driver</option></select>
        <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Message (optional)" className="rounded-xl border border-slate-300 px-3 py-2" />
        {error && <p className="rounded-xl bg-red-100 p-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={submitting} className="rounded-xl bg-[var(--brand-navy)] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">{submitting ? 'Submitting...' : 'Submit Inquiry'}</button>
      </form>
    </section>
  )
}

export default BookingPage

