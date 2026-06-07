const LOCATION_VALUES = {
  anyPointLuzon: 'any_point_luzon',
  outsideNcr: 'outside_ncr',
  withinNcr: 'within_ncr',
}

const locationAliasMap = {
  'any point of luzon': LOCATION_VALUES.anyPointLuzon,
  any_point_luzon: LOCATION_VALUES.anyPointLuzon,
  'outside ncr': LOCATION_VALUES.outsideNcr,
  outside_ncr: LOCATION_VALUES.outsideNcr,
  'within ncr': LOCATION_VALUES.withinNcr,
  within_ncr: LOCATION_VALUES.withinNcr,
}

const rentalRates = {
  'byd-emax': {
    [LOCATION_VALUES.withinNcr]: {
      twelveHours: 2000,
      twentyFourHours: 2600,
    },
    [LOCATION_VALUES.outsideNcr]: {
      twelveHours: 2400,
      twentyFourHours: 3100,
    },
    [LOCATION_VALUES.anyPointLuzon]: {
      twelveHours: null,
      twentyFourHours: 3500,
    },
  },
  xpander: {
    [LOCATION_VALUES.withinNcr]: {
      twelveHours: 1800,
      twentyFourHours: 2500,
    },
    [LOCATION_VALUES.outsideNcr]: {
      twelveHours: 2300,
      twentyFourHours: 3000,
    },
    [LOCATION_VALUES.anyPointLuzon]: {
      twelveHours: null,
      twentyFourHours: 3300,
    },
  },
}

const normalizeText = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '_')

export const normalizeLocation = (location) => {
  const rawLocation = String(location || '').trim()
  const normalizedLocation = normalizeText(rawLocation)
  const spacedLocation = rawLocation.toLowerCase().replace(/\s+/g, ' ')

  return locationAliasMap[normalizedLocation] || locationAliasMap[spacedLocation] || ''
}

const getCarPricingKey = (car) => {
  const slug = normalizeText(car?.slug || car?.id)
  const name = normalizeText(car?.name || car)
  const combined = `${slug}_${name}`

  if (combined.includes('byd_emax')) {
    return 'byd-emax'
  }

  if (combined.includes('xpander')) {
    return 'xpander'
  }

  return ''
}

const normalizeDurationDays = (durationDays) => {
  const numericDuration = Number(durationDays || 1)

  return Number.isFinite(numericDuration) ? Math.max(1, numericDuration) : 1
}

const normalizeBoolean = (value) =>
  value === true || String(value).trim().toLowerCase() === 'true' || value === '1'

export const getRentalRates = (car, pickupLocation) => {
  const location = normalizeLocation(pickupLocation)
  const pricingKey = getCarPricingKey(car)
  const rates = rentalRates[pricingKey]?.[location]

  if (!rates) {
    return null
  }

  return {
    ...rates,
    isFixedTwentyFourHours: location === LOCATION_VALUES.anyPointLuzon,
    location,
  }
}

export const getEstimatedRentalTotal = (car, tripDetails = {}) => {
  const location = normalizeLocation(tripDetails.pickup_location)
  const rates = getRentalRates(car, location)

  if (!location || !rates) {
    return null
  }

  const durationDays = normalizeDurationDays(tripDetails.duration_days)
  const addHalfDay =
    rates.isFixedTwentyFourHours ? false : normalizeBoolean(tripDetails.add_half_day)
  const total =
    durationDays * rates.twentyFourHours +
    (addHalfDay ? Number(rates.twelveHours || 0) : 0)

  return {
    addHalfDay,
    durationDays,
    isFixedTwentyFourHours: rates.isFixedTwentyFourHours,
    location,
    rates,
    total,
  }
}

export const formatPeso = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(Number(amount || 0))
