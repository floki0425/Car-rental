import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { cleanTripDetails, getTripDetailsSearch } from '../../lib/utils'
import LandingIcon from './LandingIcon'

const pickupTimes = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

const timeWheelOptionHeight = 44

const formatLocalDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getLocalDateString = (daysToAdd = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + daysToAdd)

  return formatLocalDate(date)
}

const getLocalDateAfter = (dateString, daysToAdd = 1) => {
  const [year, month, day] = String(dateString || '')
    .split('-')
    .map(Number)
  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) {
    return getLocalDateString(daysToAdd)
  }

  date.setDate(date.getDate() + daysToAdd)

  return formatLocalDate(date)
}

const hasTripDetail = (details, field) =>
  Object.prototype.hasOwnProperty.call(details, field)

const parseLocalDateString = (dateString) => {
  const [year, month, day] = String(dateString || '')
    .split('-')
    .map(Number)
  const date = new Date(year, month - 1, day)

  return Number.isNaN(date.getTime()) ? new Date() : date
}

const compareLocalDateStrings = (firstDate, secondDate) =>
  parseLocalDateString(firstDate).getTime() -
  parseLocalDateString(secondDate).getTime()

const getDurationDaysFromReturnDate = (pickupDate, returnDate) => {
  const dayInMs = 24 * 60 * 60 * 1000
  const durationDays = Math.round(
    (parseLocalDateString(returnDate).getTime() -
      parseLocalDateString(pickupDate).getTime()) /
      dayInMs,
  )

  return Math.max(1, durationDays)
}

const formatDateLabel = (dateString) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parseLocalDateString(dateString))

const formatTimeLabel = (time) => {
  const [hour, minute] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hour, minute, 0, 0)

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

const getDateTimeFromDateAndTime = (dateString, time) => {
  const [hour, minute] = String(time || '09:00')
    .split(':')
    .map(Number)
  const date = parseLocalDateString(dateString)

  date.setHours(
    Number.isNaN(hour) ? 9 : hour,
    Number.isNaN(minute) ? 0 : minute,
    0,
    0,
  )

  return date
}

const getComputedReturnDateTime = (
  pickupDate,
  pickupTime,
  durationDays,
  addHalfDay,
) => {
  const returnDateTime = getDateTimeFromDateAndTime(pickupDate, pickupTime)

  returnDateTime.setDate(
    returnDateTime.getDate() + Math.max(1, durationDays),
  )

  if (addHalfDay) {
    returnDateTime.setHours(returnDateTime.getHours() + 12)
  }

  return returnDateTime
}

const formatReturnDateTimeLabel = (date) => {
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
  const timeLabel = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)

  return `${dateLabel} at ${timeLabel}`
}

const getCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const calendarStart = new Date(year, month, 1 - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart)
    date.setDate(calendarStart.getDate() + index)

    return date
  })
}

function ModalLayer({ children }) {
  if (typeof document === 'undefined') {
    return children
  }

  return createPortal(children, document.body)
}

function FieldChevron() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-gray-700"
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
      <span className="text-[0.64rem] font-black uppercase tracking-[0.28em] text-gray-500">
        {label}
      </span>

      <span className="flex h-14 items-center gap-3 rounded-md border border-white/60 bg-white/75 px-5 shadow-[0_14px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl transition focus-within:border-black focus-within:ring-4 focus-within:ring-gray-300">
        <LandingIcon name={icon} className="h-5 w-5 shrink-0 text-gray-700" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400 [color-scheme:light]"
        />

        {hasChevron ? <FieldChevron /> : null}
      </span>
    </label>
  )
}

function PickupDateField({ value, onOpen }) {
  return (
    <label className="grid gap-3">
      <span className="text-[0.64rem] font-black uppercase tracking-[0.28em] text-gray-500">
        Pick-up Date
      </span>

      <button
        type="button"
        onClick={onOpen}
        className="flex h-14 items-center gap-3 rounded-md border border-white/60 bg-white/75 px-5 text-left shadow-[0_14px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        <LandingIcon name="calendar" className="h-5 w-5 shrink-0 text-gray-700" />
        <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">
          {formatDateLabel(value)}
        </span>
        <FieldChevron />
      </button>

      <input type="hidden" name="pickup_date" value={value} readOnly />
    </label>
  )
}

function ReturnDateField({ value, onOpen }) {
  return (
    <label className="grid gap-3">
      <span className="text-[0.64rem] font-black uppercase tracking-[0.28em] text-gray-500">
        Drop-off Date
      </span>

      <button
        type="button"
        onClick={onOpen}
        className="flex h-14 items-center gap-3 rounded-md border border-white/60 bg-white/75 px-5 text-left shadow-[0_14px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        <LandingIcon name="calendar" className="h-5 w-5 shrink-0 text-gray-700" />
        <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">
          {formatDateLabel(value)}
        </span>
        <FieldChevron />
      </button>

      <input type="hidden" name="return_date" value={value} readOnly />
    </label>
  )
}

function PickupTimeWheel({ value, onChange }) {
  const wheelRef = useRef(null)
  const scrollTimerRef = useRef(null)
  const selectedIndex = Math.max(0, pickupTimes.indexOf(value))

  useEffect(() => {
    wheelRef.current?.scrollTo({
      top: selectedIndex * timeWheelOptionHeight,
      behavior: 'auto',
    })
  }, [selectedIndex])

  useEffect(
    () => () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    },
    [],
  )

  const handleScroll = () => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current)
    }

    scrollTimerRef.current = setTimeout(() => {
      const wheel = wheelRef.current

      if (!wheel) return

      const nextIndex = Math.min(
        pickupTimes.length - 1,
        Math.max(0, Math.round(wheel.scrollTop / timeWheelOptionHeight)),
      )
      const nextTime = pickupTimes[nextIndex]

      if (nextTime && nextTime !== value) {
        onChange(nextTime)
      }

      wheel.scrollTo({
        top: nextIndex * timeWheelOptionHeight,
        behavior: 'smooth',
      })
    }, 120)
  }

  return (
    <div className="relative mx-auto mt-3 w-full max-w-xs">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-11 -translate-y-1/2 rounded-md border-y border-gray-200 bg-gray-50/80"
        aria-hidden="true"
      />
      <div
        ref={wheelRef}
        onScroll={handleScroll}
        className="relative h-52 snap-y snap-mandatory overflow-y-auto overscroll-contain py-[82px] scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Pickup time"
      >
        {pickupTimes.map((time, index) => {
          const isSelected = time === value
          const distanceFromSelected = Math.abs(index - selectedIndex)

          return (
            <button
              key={time}
              type="button"
              onClick={() => onChange(time)}
              className={[
                'relative z-20 flex h-11 w-full snap-center items-center justify-center rounded-md text-center transition',
                isSelected
                  ? 'text-lg font-black text-gray-900'
                  : distanceFromSelected === 1
                    ? 'text-base font-bold text-gray-500'
                    : 'text-sm font-semibold text-gray-300',
              ].join(' ')}
            >
              {formatTimeLabel(time)}
            </button>
          )
        })}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-100/90 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-100/90 to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}

function PickupDatePicker({
  draftDate,
  onCancel,
  onConfirm,
  onSelectDate,
  pickupTime,
  setPickupTime,
  setVisibleMonth,
  visibleMonth,
}) {
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth])
  const monthLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth)
  const selectedDate = parseLocalDateString(draftDate)
  const selectedYear = selectedDate.getFullYear()
  const selectedDayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(selectedDate)

  const changeMonth = (offset) => {
    setVisibleMonth((currentMonth) => {
      const nextMonth = new Date(currentMonth)
      nextMonth.setMonth(currentMonth.getMonth() + offset)

      return nextMonth
    })
  }

  return (
    <ModalLayer>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm"
        onMouseDown={onCancel}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pickup-date-picker-title"
          className="relative z-[10000] max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-gray-200 p-4 sm:p-5 md:border-r md:border-b-0">
              <div className="rounded-lg bg-gray-900 px-4 py-3 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      id="pickup-date-picker-title"
                      className="text-lg font-black tracking-tight"
                    >
                      Select Pickup Date
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-300">
                      {selectedYear}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/20 text-base font-black text-white transition hover:bg-white hover:text-gray-900"
                    aria-label="Close pickup date picker"
                  >
                    x
                  </button>
                </div>

                <p className="mt-3 text-2xl font-black tracking-tight">
                  {selectedDayLabel}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-gray-200 pb-3">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:bg-gray-100"
                  aria-label="Show previous month"
                >
                  <span aria-hidden="true">&lt;</span>
                </button>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-gray-800">
                  {monthLabel}
                </p>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:bg-gray-100"
                  aria-label="Show next month"
                >
                  <span aria-hidden="true">&gt;</span>
                </button>
              </div>

              <div className="mt-3 grid grid-cols-7 text-center text-[0.64rem] font-black uppercase tracking-[0.12em] text-gray-500">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
                  <span key={dayName}>{dayName}</span>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1 rounded-lg border border-gray-200 bg-white p-1">
                {calendarDays.map((date) => {
                  const dateString = formatLocalDate(date)
                  const isCurrentMonth = date.getMonth() === visibleMonth.getMonth()
                  const isSelected = dateString === draftDate

                  return (
                    <button
                      key={dateString}
                      type="button"
                      onClick={() => onSelectDate(dateString)}
                      className={[
                        'flex aspect-square items-center justify-center rounded-md border border-gray-100 text-xs font-bold transition sm:text-sm',
                        isSelected
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100',
                        !isCurrentMonth && !isSelected ? 'text-gray-300' : '',
                      ].join(' ')}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col p-4 sm:p-5">
              <div className="rounded-lg border border-gray-200 bg-gray-100/90 p-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gray-500">
                  Pickup Time
                </p>
                <PickupTimeWheel value={pickupTime} onChange={setPickupTime} />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row md:mt-auto md:pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-md border border-gray-200 bg-white px-5 text-sm font-black text-gray-800 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-gray-900 px-5 text-sm font-black text-white transition hover:bg-gray-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayer>
  )
}

function DurationPicker({
  addHalfDay,
  durationDays,
  onCancel,
  onConfirm,
  pickupDate,
  pickupTime,
  setAddHalfDay,
  setDurationDays,
}) {
  const computedReturnDateTime = useMemo(
    () =>
      getComputedReturnDateTime(
        pickupDate,
        pickupTime,
        durationDays,
        addHalfDay,
      ),
    [addHalfDay, durationDays, pickupDate, pickupTime],
  )
  const durationLabel = `${durationDays} ${
    durationDays === 1 ? 'DAY' : 'DAYS'
  }`

  const decreaseDuration = () => {
    setDurationDays((currentDuration) => Math.max(1, currentDuration - 1))
  }

  const increaseDuration = () => {
    setDurationDays((currentDuration) => currentDuration + 1)
  }

  return (
    <ModalLayer>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm"
        onMouseDown={onCancel}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="duration-picker-title"
          className="relative z-[10000] max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                id="duration-picker-title"
                className="text-lg font-black tracking-tight text-gray-900"
              >
                Set Duration
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Please set how many days would you like to rent the vehicle?
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-lg font-black text-gray-700 transition hover:bg-gray-100"
              aria-label="Close duration picker"
            >
              x
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="rounded-lg border border-gray-300 bg-gray-100/90 p-4">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={decreaseDuration}
                disabled={durationDays <= 1}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white text-2xl font-black text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease rental duration"
              >
                -
              </button>

              <p className="min-w-0 flex-1 text-center text-3xl font-black tracking-tight text-gray-900">
                {durationLabel}
              </p>

              <button
                type="button"
                onClick={increaseDuration}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white text-2xl font-black text-gray-700 transition hover:bg-gray-200"
                aria-label="Increase rental duration"
              >
                +
              </button>
            </div>
          </div>

          <label className="mt-4 flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-white p-4">
            <span className="text-sm font-bold text-gray-700">
              Add 12 hours to the duration.
            </span>
            <input
              type="checkbox"
              checked={addHalfDay}
              onChange={(event) => setAddHalfDay(event.target.checked)}
              className="sr-only"
            />
            <span
              className={[
                'flex h-7 w-12 shrink-0 items-center rounded-md p-1 transition',
                addHalfDay ? 'bg-gray-900' : 'bg-gray-300',
              ].join(' ')}
              aria-hidden="true"
            >
              <span
                className={[
                  'h-5 w-5 rounded-sm bg-white shadow transition',
                  addHalfDay ? 'translate-x-5' : 'translate-x-0',
                ].join(' ')}
              />
            </span>
          </label>

          <div className="my-5 border-t border-gray-200" />

          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gray-500">
              You return on
            </p>
            <p className="mt-3 text-2xl font-black leading-tight text-gray-900">
              {formatReturnDateTimeLabel(computedReturnDateTime)}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-11 items-center justify-center rounded-md border border-gray-200 bg-white px-5 text-sm font-black text-gray-800 transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-5 text-sm font-black text-white transition hover:bg-gray-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    </ModalLayer>
  )
}

function PlanRentalSection({ tripDetails, setTripDetails }) {
  const navigate = useNavigate()
  const [isPickupPickerOpen, setIsPickupPickerOpen] = useState(false)
  const [isReturnPickerOpen, setIsReturnPickerOpen] = useState(false)
  const [draftPickupDate, setDraftPickupDate] = useState('')
  const [draftDurationDays, setDraftDurationDays] = useState(1)
  const [addHalfDay, setAddHalfDay] = useState(false)
  const [pickupTime, setPickupTime] = useState('09:00')
  const [draftPickupTime, setDraftPickupTime] = useState('09:00')
  const [visibleMonth, setVisibleMonth] = useState(() =>
    parseLocalDateString(getLocalDateString(0)),
  )

  const effectiveTripDetails = useMemo(() => {
    const details = tripDetails || {}
    const pickupDate = hasTripDetail(details, 'pickup_date') && details.pickup_date
      ? details.pickup_date
      : getLocalDateString(0)
    const requestedReturnDate =
      hasTripDetail(details, 'return_date') && details.return_date
        ? details.return_date
        : getLocalDateAfter(pickupDate, 1)
    const returnDate =
      compareLocalDateStrings(requestedReturnDate, pickupDate) <= 0
        ? getLocalDateAfter(pickupDate, 1)
        : requestedReturnDate

    return {
      ...details,
      pickup_location: hasTripDetail(details, 'pickup_location')
        ? details.pickup_location
        : '',
      pickup_date: pickupDate,
      return_date: returnDate,
    }
  }, [tripDetails])

  const cleanDetails = useMemo(() => cleanTripDetails(effectiveTripDetails), [effectiveTripDetails])
  const tripSearch = useMemo(() => getTripDetailsSearch(effectiveTripDetails), [effectiveTripDetails])
  const tripState = useMemo(() => ({ tripDetails: cleanDetails }), [cleanDetails])

  const openPickupPicker = () => {
    const pickupDate = effectiveTripDetails.pickup_date || getLocalDateString(0)

    setIsReturnPickerOpen(false)
    setDraftPickupDate(pickupDate)
    setDraftPickupTime(pickupTime)
    setVisibleMonth(parseLocalDateString(pickupDate))
    setIsPickupPickerOpen(true)
  }

  const openReturnPicker = () => {
    const pickupDate = effectiveTripDetails.pickup_date || getLocalDateString(0)
    const returnDate =
      effectiveTripDetails.return_date || getLocalDateAfter(pickupDate, 1)

    setIsPickupPickerOpen(false)
    setDraftDurationDays(getDurationDaysFromReturnDate(pickupDate, returnDate))
    setAddHalfDay(false)
    setIsReturnPickerOpen(true)
  }

  const confirmPickupDate = () => {
    const pickupDate = draftPickupDate || getLocalDateString(0)
    const minimumReturnDate = getLocalDateAfter(pickupDate, 1)

    setTripDetails((prev) => {
      const currentDetails = prev || {}
      const currentReturnDate =
        currentDetails.return_date || effectiveTripDetails.return_date
      const returnDate =
        !currentReturnDate ||
        compareLocalDateStrings(currentReturnDate, pickupDate) <= 0
          ? minimumReturnDate
          : currentReturnDate

      return {
        ...currentDetails,
        pickup_date: pickupDate,
        return_date: returnDate,
      }
    })

    setPickupTime(draftPickupTime)
    setIsPickupPickerOpen(false)
  }

  const confirmReturnDate = () => {
    const pickupDate = effectiveTripDetails.pickup_date || getLocalDateString(0)
    const computedReturnDate = formatLocalDate(
      getComputedReturnDateTime(
        pickupDate,
        pickupTime,
        draftDurationDays,
        addHalfDay,
      ),
    )
    const safeReturnDate =
      compareLocalDateStrings(computedReturnDate, pickupDate) <= 0
        ? getLocalDateAfter(pickupDate, 1)
        : computedReturnDate

    setTripDetails((prev) => ({
      ...(prev || {}),
      pickup_date: pickupDate,
      return_date: safeReturnDate,
    }))

    setIsReturnPickerOpen(false)
  }

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
      className="relative z-20 w-full scroll-mt-28 px-0 py-0 text-gray-900"
    >
      <div className="mx-auto w-full max-w-6xl rounded-lg border border-white/60 bg-white/70 px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8">
        <form
          onSubmit={handleTripSearch}
          className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end lg:justify-center"
        >
          <TripField
            label="Pick-up Location"
            icon="location"
            name="pickup_location"
            value={effectiveTripDetails.pickup_location}
            onChange={handleTripChange}
            placeholder="Select location"
            hasChevron
          />

          <PickupDateField
            value={effectiveTripDetails.pickup_date}
            onOpen={openPickupPicker}
          />

          <ReturnDateField
            value={effectiveTripDetails.return_date}
            onOpen={openReturnPicker}
          />

          <button
            type="submit"
            className="inline-flex h-full min-h-[70px] w-full items-center justify-center gap-2.5 rounded-md bg-black px-8 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 md:col-span-2 lg:col-span-1 lg:w-auto lg:min-w-[170px]"
          >
            <LandingIcon name="search" className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Search Cars</span>
          </button>
        </form>
      </div>

      {isPickupPickerOpen ? (
        <PickupDatePicker
          draftDate={draftPickupDate}
          onCancel={() => setIsPickupPickerOpen(false)}
          onConfirm={confirmPickupDate}
          onSelectDate={setDraftPickupDate}
          pickupTime={draftPickupTime}
          setPickupTime={setDraftPickupTime}
          setVisibleMonth={setVisibleMonth}
          visibleMonth={visibleMonth}
        />
      ) : null}

      {isReturnPickerOpen ? (
        <DurationPicker
          addHalfDay={addHalfDay}
          durationDays={draftDurationDays}
          onCancel={() => setIsReturnPickerOpen(false)}
          onConfirm={confirmReturnDate}
          pickupDate={effectiveTripDetails.pickup_date}
          pickupTime={pickupTime}
          setAddHalfDay={setAddHalfDay}
          setDurationDays={setDraftDurationDays}
        />
      ) : null}
    </section>
  )
}

export default PlanRentalSection
