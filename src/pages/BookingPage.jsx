import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import carsData from '../data/fallbackCars'
import {
  DEFAULT_PICKUP_LOCATION,
  DEFAULT_RENTAL_DURATION,
  PICKUP_LOCATION_OPTIONS,
  RENTAL_DURATION_OPTIONS,
  getAvailableRentalDurationOptions,
  getRentalEstimate,
  normalizePickupLocation,
  normalizeRentalDuration,
} from '../lib/pricing'
import { supabase } from '../lib/supabase'
import { trackLeadEvent } from '../lib/tracking'
import { formatPHP, getTripDetailsFromNavigation } from '../lib/utils'

const initialState = {
  full_name: '',
  email: '',
  phone: '',
  pickup_date: '',
  return_date: '',
  pickup_location: DEFAULT_PICKUP_LOCATION,
  rental_duration: DEFAULT_RENTAL_DURATION,
  rental_option: 'Self Drive',
  message: '',
}

const requiredFieldMessages = {
  full_name: 'Please fill up the Full Name field.',
  email: 'Please fill up the Email Address field.',
  phone: 'Please fill up the Phone Number field.',
  pickup_date: 'Please select a Pick-up Date.',
  return_date: 'Please select a Return Date.',
  pickup_location: 'Please select a Pick-up Location.',
  rental_duration: 'Please select a Rental Duration.',
  rental_option: 'Please select a Rental Option.',
}

const backendErrorMessages = {
  'Invalid email format': 'Please enter a valid email address.',
  'Invalid rental_option value': 'Please select a valid rental option.',
  'Return date cannot be earlier than pickup date':
    'Return date cannot be earlier than pick-up date.',
  'Client funnel not found or inactive':
    'Booking form is temporarily unavailable. Please contact support.',
}

const fallbackErrorMessage =
  'Something went wrong while sending your inquiry. Please try again.'

function normalizeFormState(values = {}) {
  const pickupLocation = normalizePickupLocation(
    values.pickup_location || DEFAULT_PICKUP_LOCATION,
  )
  const rentalDuration = normalizeRentalDuration(
    values.rental_duration || DEFAULT_RENTAL_DURATION,
    pickupLocation,
  )

  return {
    full_name: values.full_name || '',
    email: values.email || '',
    phone: values.phone || '',
    pickup_date: values.pickup_date || '',
    return_date: values.return_date || '',
    pickup_location: pickupLocation,
    rental_duration: rentalDuration,
    rental_option: values.rental_option || 'Self Drive',
    message: values.message || '',
  }
}

function getMissingRequiredFieldMessage(form) {
  const missingField = Object.keys(requiredFieldMessages).find(
    (fieldName) => !String(form[fieldName] || '').trim(),
  )

  return missingField ? requiredFieldMessages[missingField] : ''
}

function mapBookingErrorMessage(errorMessage) {
  if (!errorMessage) return fallbackErrorMessage

  const missingField = errorMessage.match(/^Missing required field:\s*(\w+)$/i)?.[1]

  if (missingField && requiredFieldMessages[missingField]) {
    return requiredFieldMessages[missingField]
  }

  return backendErrorMessages[errorMessage] || fallbackErrorMessage
}

async function getFunctionErrorMessage(fnError, data) {
  if (data?.error) return data.error

  const response = fnError?.context

  if (response && typeof response.json === 'function') {
    try {
      const errorBody = await response.json()
      if (errorBody?.error) return errorBody.error
    } catch {
      // Response body may already be read or may not be JSON.
    }
  }

  return fnError?.message
}

function FormSection({ title, children }) {
  return (
    <fieldset className="grid gap-4 border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
      <legend className="mb-4 text-xl font-black text-gray-950">{title}</legend>
      {children}
    </fieldset>
  )
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-700">
      {label}
      {children}
    </label>
  )
}

function BookingPage() {
  const { carId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const car = useMemo(
    () => carsData.find((item) => item.id === carId || item.slug === carId) || null,
    [carId],
  )

  const tripDetails = useMemo(() => getTripDetailsFromNavigation(location), [location])

  const [form, setForm] = useState(() =>
    normalizeFormState({
      ...initialState,
      ...tripDetails,
    }),
  )

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Keep deep-link trip details synced without clearing contact fields.
    setForm((prev) =>
      normalizeFormState({
        ...prev,
        ...tripDetails,
      }),
    )
  }, [tripDetails])

  const isInvalidDates = useMemo(() => {
    if (!form.pickup_date || !form.return_date) return false

    return new Date(form.return_date) < new Date(form.pickup_date)
  }, [form.pickup_date, form.return_date])

  const availableDurationOptions = useMemo(
    () => getAvailableRentalDurationOptions(form.pickup_location),
    [form.pickup_location],
  )

  const pricing = useMemo(
    () =>
      getRentalEstimate(
        car,
        form.pickup_location,
        form.rental_duration,
        form.pickup_date,
        form.return_date,
      ),
    [
      car,
      form.pickup_date,
      form.pickup_location,
      form.rental_duration,
      form.return_date,
    ],
  )

  const estimatedTotal = isInvalidDates ? 0 : pricing.total

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => {
      const nextValue =
        name === 'pickup_location' ? normalizePickupLocation(value) : value

      return normalizeFormState({
        ...prev,
        [name]: nextValue,
      })
    })

    if (error) setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const requiredFieldError = getMissingRequiredFieldMessage(form)

    if (requiredFieldError) {
      setError(requiredFieldError)
      return
    }

    if (isInvalidDates) {
      setError(mapBookingErrorMessage('Return date cannot be earlier than pickup date'))
      return
    }

    if (!supabase) {
      setError(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.',
      )
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        client_slug: import.meta.env.VITE_CLIENT_SLUG || 'car-rental-demo',
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        pickup_date: form.pickup_date,
        return_date: form.return_date,
        pickup_location: form.pickup_location,
        rental_duration: pricing.duration,
        rental_option: form.rental_option,
        message: form.message.trim(),
        car_name_snapshot: car?.name || 'Selected Car',
        car_price_snapshot: pricing.rate || null,
      }

      const { data, error: fnError } = await supabase.functions.invoke(
        'send-booking-email',
        {
          body: payload,
        },
      )

      if (fnError) {
        throw new Error(await getFunctionErrorMessage(fnError, data))
      }

      if (data?.error) {
        throw new Error(data.error)
      }

      trackLeadEvent({
        carName: car?.name,
        value: pricing.rate,
      })

      navigate('/thank-you')
    } catch (err) {
      setError(mapBookingErrorMessage(err.message))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="container-shell py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="section-eyebrow">Booking Request</p>

          <h1 className="mt-4 section-title">Complete Your Inquiry</h1>

          <p className="mt-4 text-base leading-8 text-gray-600">
            {car
              ? `Please provide your details below to finalize your booking request for the ${car.name}.`
              : 'Complete the form below to continue.'}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-none border border-gray-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8"
            noValidate
          >
            <div className="grid gap-8">
              <FormSection title="Personal Information">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      required
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Juan Dela Cruz"
                      className="premium-input"
                    />
                  </Field>

                  <Field label="Email Address">
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="premium-input"
                    />
                  </Field>
                </div>

                <Field label="Phone Number">
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+63 900 000 0000"
                    className="premium-input"
                  />
                </Field>
              </FormSection>

              <FormSection title="Trip Details">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Pickup Date">
                    <input
                      required
                      type="date"
                      name="pickup_date"
                      value={form.pickup_date}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </Field>

                  <Field label="Return Date">
                    <input
                      required
                      type="date"
                      name="return_date"
                      value={form.return_date}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </Field>
                </div>

                <Field label="Pickup Location">
                  <select
                    required
                    name="pickup_location"
                    value={form.pickup_location}
                    onChange={handleChange}
                    className="premium-input"
                  >
                    {PICKUP_LOCATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </FormSection>

              <FormSection title="Rental Options">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Rental Duration">
                    <select
                      required
                      name="rental_duration"
                      value={pricing.duration}
                      onChange={handleChange}
                      className="premium-input"
                    >
                      {RENTAL_DURATION_OPTIONS.map((option) => {
                        const isAvailable = availableDurationOptions.some(
                          (durationOption) =>
                            durationOption.value === option.value,
                        )

                        return (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={!isAvailable}
                          >
                            {option.label}
                          </option>
                        )
                      })}
                    </select>
                  </Field>

                  <Field label="Service Type">
                    <select
                      required
                      name="rental_option"
                      value={form.rental_option}
                      onChange={handleChange}
                      className="premium-input"
                    >
                      <option>Self Drive</option>
                      <option>With Driver</option>
                    </select>
                  </Field>
                </div>
              </FormSection>

              <FormSection title="Special Requests">
                <Field label="Message">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Mention child seats, extra stops, mileage needs, or delivery notes..."
                    className="premium-input resize-y"
                  />
                </Field>
              </FormSection>
            </div>

            {error ? (
              <p className="mt-6 rounded-none border border-gray-300 bg-gray-50 p-4 text-sm font-semibold text-gray-800">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="primary-button mt-8 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Submitting...' : 'Submit Booking Inquiry'}
            </button>
          </form>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-none border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
              {car?.image_url ? (
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="h-56 w-full object-cover"
                />
              ) : null}

              <div className="p-6">
                <p className="section-eyebrow">Selected Vehicle</p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                  {car?.name || 'Selected Car'}
                </h2>

                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-gray-600">
                  <span>{car?.seats || '-'} Seats</span>
                  <span>{car?.transmission || 'Transmission'}</span>
                  <span>{car?.fuel_type || 'Fuel'}</span>
                </div>

                <div className="my-5 border-t border-gray-200" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Selected Rate</span>
                    <span className="font-black text-gray-950">
                      {formatPHP(pricing.rate)}
                    </span>
                  </div>

                  {pricing.isDynamic ? (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Pickup Location</span>
                      <span className="text-right font-black text-gray-950">
                        {pricing.locationLabel}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Rental Duration</span>
                    <span className="font-black text-gray-950">
                      {pricing.durationLabel}
                      {pricing.periods > 1 ? ` x ${pricing.periods}` : ''}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-dashed border-gray-200 pt-3">
                    <span className="text-lg font-black text-gray-950">
                      Estimated Total
                    </span>
                    <span className="text-lg font-black text-black">
                      {formatPHP(estimatedTotal)}
                    </span>
                  </div>
                </div>

                <p className="mt-5 rounded-none bg-gray-100 p-4 text-sm leading-6 text-gray-600">
                  Pricing includes a basic estimate only. Our team will confirm final
                  rates, availability, and options.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-none border border-gray-200 bg-white p-5 text-center text-sm font-black text-gray-700 shadow-sm">
                Insured
              </div>

              <div className="rounded-none border border-gray-200 bg-white p-5 text-center text-sm font-black text-gray-700 shadow-sm">
                24/7 Support
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default BookingPage
