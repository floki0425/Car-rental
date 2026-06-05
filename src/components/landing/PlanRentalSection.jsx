import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { cleanTripDetails, getTripDetailsSearch } from '../../lib/utils'
import LandingIcon from './LandingIcon'

function FieldChevron() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function TripField({
  label,
  icon,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  hasChevron = false,
}) {
  return (
    <label className="grid gap-3">
      <span className="text-[0.64rem] font-black uppercase tracking-[0.28em] text-slate-500">
        {label}
      </span>

      <span className="flex h-14 items-center gap-3 rounded-xl border border-[#E8E2D6] bg-white px-5 shadow-[0_14px_35px_rgba(11,11,10,0.08)] transition focus-within:border-[#C8A96A] focus-within:ring-4 focus-within:ring-[#C8A96A]/20">
        <LandingIcon name={icon} className="h-5 w-5 shrink-0 text-[#C8A96A]" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 [color-scheme:light]"
        />

        {hasChevron ? <FieldChevron /> : null}
      </span>
    </label>
  )
}

function PlanRentalSection({ tripDetails, setTripDetails }) {
  const navigate = useNavigate()

  const cleanDetails = useMemo(() => cleanTripDetails(tripDetails), [tripDetails])
  const tripSearch = useMemo(() => getTripDetailsSearch(tripDetails), [tripDetails])
  const tripState = useMemo(() => ({ tripDetails: cleanDetails }), [cleanDetails])

  const handleTripChange = (event) => {
    const { name, value } = event.target

    setTripDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTripSearch = (event) => {
    event.preventDefault()

    navigate(
      {
        pathname: '/',
        search: tripSearch ? `?${tripSearch}` : '',
        hash: '#popular-cars',
      },
      { state: tripState },
    )

    window.requestAnimationFrame(() => {
      document
        .getElementById('popular-cars')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <section
      id="plan-rental"
      className="scroll-mt-24 border-t border-[#E8E2D6] bg-gradient-to-b from-white via-[#F7F3EC] to-[#F7F3EC] px-4 pt-16 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.42em] text-[#C8A96A]">
              Trip Details
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-[2.65rem]">
              Plan Your Rental
            </h2>

            <p className="mt-5 max-w-xs text-base leading-8 text-slate-600">
              Enter your trip details and choose the perfect vehicle for your ride.
            </p>
          </div>

          <form
            onSubmit={handleTripSearch}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_auto] lg:items-end"
          >
            <TripField
              label="Pick-up Location"
              icon="location"
              name="pickup_location"
              value={tripDetails.pickup_location}
              onChange={handleTripChange}
              placeholder="Select location"
              hasChevron
            />

            <TripField
              label="Pick-up Date"
              icon="calendar"
              name="pickup_date"
              type="date"
              value={tripDetails.pickup_date}
              onChange={handleTripChange}
              placeholder="mm/dd/yyyy"
            />

            <TripField
              label="Drop-off Date"
              icon="calendar"
              name="return_date"
              type="date"
              value={tripDetails.return_date}
              onChange={handleTripChange}
              placeholder="mm/dd/yyyy"
            />

            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0B0B0A] px-7 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_35px_rgba(11,11,10,0.24)] transition hover:-translate-y-0.5 hover:bg-[#C8A96A] hover:text-[#0B0B0A] focus:outline-none focus:ring-4 focus:ring-[#C8A96A]/25 md:col-span-2 lg:col-span-1 lg:w-auto lg:min-w-[170px]"
            >
              <LandingIcon name="search" className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">Search Cars</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PlanRentalSection
