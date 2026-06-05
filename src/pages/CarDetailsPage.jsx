import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import carsData from '../data/fallbackCars'
import { cx, formatPHP, getTripDetailsFromNavigation, getTripDetailsSearch } from '../lib/utils'

function DetailIcon({ path }) {
  return (
    <svg className="h-5 w-5 text-[#C8A96A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

function GalleryArrow({ direction }) {
  const path = direction === 'next' ? 'm9 5 7 7-7 7' : 'm15 19-7-7 7-7'

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

const iconPaths = {
  seats: 'M7 4h5a3 3 0 0 1 3 3v5H8a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Zm1 8v6m0 0h9m-9 0H5',
  gear: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6',
  fuel: 'M7 20V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15M6 20h11M16 8h2l2 2v8a2 2 0 0 1-2 2h-1M9 7h4',
  doors: 'M8 20V4h8l2 4v12M8 20h10M11 12h.01',
  check: 'm5 12 4 4L19 6',
  info: 'M12 8h.01M11 12h1v5h1M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
}

function CarDetailsPage() {
  const { id } = useParams()
  const location = useLocation()
  const car = useMemo(() => carsData.find((item) => item.id === id || item.slug === id) || null, [id])
  const tripDetails = useMemo(() => getTripDetailsFromNavigation(location), [location])
  const tripSearch = useMemo(() => {
    const search = getTripDetailsSearch(tripDetails)
    return search ? `?${search}` : ''
  }, [tripDetails])
  const tripState = useMemo(() => ({ tripDetails }), [tripDetails])
  const [selectedImage, setSelectedImage] = useState('')

  if (!car) {
    return (
      <section className="container-shell py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-xl font-black text-slate-950">Car not found.</p>
          <Link to={{ pathname: '/cars', search: tripSearch }} state={tripState} className="primary-button mt-5">Back to Fleet</Link>
        </div>
      </section>
    )
  }

  const gallery = car.gallery?.length ? car.gallery : []
  const galleryImages = [car.image_url, ...gallery].filter((img, index, images) => img && images.indexOf(img) === index)
  const activeImage = galleryImages.includes(selectedImage) ? selectedImage : car.image_url
  const activeImageIndex = Math.max(galleryImages.indexOf(activeImage), 0)
  const hasMultipleImages = galleryImages.length > 1
  const goToImage = (direction) => {
    if (!hasMultipleImages) return
    const nextIndex = direction === 'next'
      ? (activeImageIndex + 1) % galleryImages.length
      : (activeImageIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedImage(galleryImages[nextIndex])
  }
  const specs = [
    { label: 'Seats', value: `${car.seats} Seats`, icon: iconPaths.seats },
    { label: 'Transmission', value: car.transmission, icon: iconPaths.gear },
    { label: 'Fuel', value: car.fuel_type || 'N/A', icon: iconPaths.fuel },
    { label: 'Doors', value: `${car.doors || 4} Doors`, icon: iconPaths.doors },
  ]

  return (
    <section className="bg-[#F7F3EC]">
      <div className="container-shell py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-slate-500">
          <Link to="/" className="transition hover:text-[#A8894F]">Home</Link>
          <span>/</span>
          <Link to={{ pathname: '/cars', search: tripSearch }} state={tripState} className="transition hover:text-[#A8894F]">Fleet</Link>
          <span>/</span>
          <span className="text-slate-950">{car.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <img src={activeImage || car.image_url} alt={car.name} className="h-72 w-full object-cover sm:h-[32rem]" />
              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    onClick={() => goToImage('previous')}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-x-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#C8A96A]/25"
                    aria-label="Show previous car photo"
                  >
                    <GalleryArrow direction="previous" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToImage('next')}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg shadow-slate-950/20 transition hover:translate-x-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#C8A96A]/25"
                    aria-label="Show next car photo"
                  >
                    <GalleryArrow direction="next" />
                  </button>
                  <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-black text-white backdrop-blur">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-4 flex gap-3 overflow-auto pb-2">
              {galleryImages.map((img) => (
                <button
                  key={img}
                  type="button"
                  className={cx(
                    'shrink-0 rounded-xl border bg-white p-1 transition focus:outline-none focus:ring-4 focus:ring-[#C8A96A]/20',
                    activeImage === img ? 'border-[#C8A96A] shadow-md shadow-[#C8A96A]/15' : 'border-slate-200 hover:border-slate-400',
                  )}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${car.name} thumbnail`} className="h-20 w-28 rounded-lg object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="rounded-full bg-[#F7F3EC] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#A8894F] ring-1 ring-[#E8E2D6]">{car.type}</span>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{car.name}</h1>
                <p className="mt-3 text-sm font-semibold text-slate-500">Inspected, insured, and ready for your next trip.</p>
              </div>
              <p className="shrink-0">
                <span className="block text-sm font-semibold text-slate-500 sm:text-right">Starting from</span>
                <span className="text-3xl font-black text-[#A8894F]">{formatPHP(car.price_per_day)}</span>
                <span className="ml-1 text-base font-semibold text-slate-600">/ day</span>
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F3EC]">
                    <DetailIcon path={spec.icon} />
                  </span>
                  <p className="mt-3 text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-500">{spec.label}</p>
                  <p className="mt-1 font-black text-slate-950">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <h2 className="text-2xl font-black text-slate-950">Overview</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{car.overview}</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="card">
                <h2 className="flex items-center gap-3 text-xl font-black text-slate-950">
                  <DetailIcon path={iconPaths.check} />
                  Features
                </h2>
                <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                  {(car.features || []).map((feature) => <li key={feature} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />{feature}</li>)}
                </ul>
              </div>

              <div className="card">
                <h2 className="flex items-center gap-3 text-xl font-black text-slate-950">
                  <DetailIcon path={iconPaths.info} />
                  Requirements
                </h2>
                <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                  {(car.requirements || []).map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />{item}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <h2 className="text-2xl font-black text-slate-950">Booking Summary</h2>
              <p className="mt-1 text-sm text-slate-600">Selected vehicle: {car.name}</p>
              <div className="my-5 border-t border-slate-200" />
              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Daily Rate</span>
                  <span className="font-black text-slate-950">{formatPHP(car.price_per_day)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Rental Option</span>
                  <span className="font-black text-slate-950">Self Drive or Driver</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-dashed border-slate-200 pt-4">
                  <span className="text-lg font-black text-slate-950">Estimated Total</span>
                  <span className="text-lg font-black text-[#A8894F]">{formatPHP(car.price_per_day)}</span>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">
                Final pricing may vary by rental duration, delivery, driver option, and add-ons.
              </p>
              <Link
                to={{ pathname: `/booking/${car.id}`, search: tripSearch }}
                state={tripState}
                className="primary-button mt-6 w-full"
              >
                Book This Car
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CarDetailsPage
