export const PICKUP_LOCATION_VALUES = {
  withinNcr: 'within_ncr',
  outsideNcr: 'outside_ncr',
  anyPointLuzon: 'any_point_luzon',
}

export const PICKUP_LOCATION_OPTIONS = [
  { value: PICKUP_LOCATION_VALUES.withinNcr, label: 'WITHIN NCR' },
  { value: PICKUP_LOCATION_VALUES.outsideNcr, label: 'OUTSIDE NCR' },
  { value: PICKUP_LOCATION_VALUES.anyPointLuzon, label: 'ANY POINT OF LUZON' },
]

export const RENTAL_DURATION_VALUES = {
  twelveHours: '12_hours',
  twentyFourHours: '24_hours',
}

export const RENTAL_DURATION_OPTIONS = [
  { value: RENTAL_DURATION_VALUES.twelveHours, label: '12 hours' },
  { value: RENTAL_DURATION_VALUES.twentyFourHours, label: '24 hours' },
]

export const DEFAULT_PICKUP_LOCATION = PICKUP_LOCATION_VALUES.withinNcr
export const DEFAULT_RENTAL_DURATION = RENTAL_DURATION_VALUES.twentyFourHours

const pickupLocationLabels = PICKUP_LOCATION_OPTIONS.reduce((labels, option) => {
  labels[option.value] = option.label
  return labels
}, {})

const rentalDurationLabels = RENTAL_DURATION_OPTIONS.reduce((labels, option) => {
  labels[option.value] = option.label
  return labels
}, {})

const locationAliasMap = {
  'within ncr': PICKUP_LOCATION_VALUES.withinNcr,
  within_ncr: PICKUP_LOCATION_VALUES.withinNcr,
  'outside ncr': PICKUP_LOCATION_VALUES.outsideNcr,
  outside_ncr: PICKUP_LOCATION_VALUES.outsideNcr,
  'any point of luzon': PICKUP_LOCATION_VALUES.anyPointLuzon,
  any_point_luzon: PICKUP_LOCATION_VALUES.anyPointLuzon,
}

const durationAliasMap = {
  '12 hours': RENTAL_DURATION_VALUES.twelveHours,
  '12 hour': RENTAL_DURATION_VALUES.twelveHours,
  '12_hours': RENTAL_DURATION_VALUES.twelveHours,
  '12': RENTAL_DURATION_VALUES.twelveHours,
  '24 hours': RENTAL_DURATION_VALUES.twentyFourHours,
  '24 hour': RENTAL_DURATION_VALUES.twentyFourHours,
  '24_hours': RENTAL_DURATION_VALUES.twentyFourHours,
  '24': RENTAL_DURATION_VALUES.twentyFourHours,
}

const dynamicPricing = {
  'byd-emax-7': {
    [PICKUP_LOCATION_VALUES.withinNcr]: {
      [RENTAL_DURATION_VALUES.twelveHours]: 2000,
      [RENTAL_DURATION_VALUES.twentyFourHours]: 2600,
    },
    [PICKUP_LOCATION_VALUES.outsideNcr]: {
      [RENTAL_DURATION_VALUES.twelveHours]: 2400,
      [RENTAL_DURATION_VALUES.twentyFourHours]: 3100,
    },
    [PICKUP_LOCATION_VALUES.anyPointLuzon]: {
      [RENTAL_DURATION_VALUES.twentyFourHours]: 3500,
    },
  },
  xpander: {
    [PICKUP_LOCATION_VALUES.withinNcr]: {
      [RENTAL_DURATION_VALUES.twelveHours]: 1800,
      [RENTAL_DURATION_VALUES.twentyFourHours]: 2500,
    },
    [PICKUP_LOCATION_VALUES.outsideNcr]: {
      [RENTAL_DURATION_VALUES.twelveHours]: 2300,
      [RENTAL_DURATION_VALUES.twentyFourHours]: 3000,
    },
    [PICKUP_LOCATION_VALUES.anyPointLuzon]: {
      [RENTAL_DURATION_VALUES.twentyFourHours]: 3300,
    },
  },
}

const normalizeText = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '_')

export const normalizePickupLocation = (value) => {
  const rawValue = String(value || '').trim()
  const normalizedValue = normalizeText(rawValue)
  const spacedValue = rawValue.toLowerCase().replace(/\s+/g, ' ')

  return (
    locationAliasMap[normalizedValue] ||
    locationAliasMap[spacedValue] ||
    DEFAULT_PICKUP_LOCATION
  )
}

export const getPickupLocationLabel = (value) =>
  pickupLocationLabels[normalizePickupLocation(value)]

export const normalizeRentalDuration = (
  value,
  pickupLocation = DEFAULT_PICKUP_LOCATION,
) => {
  const location = normalizePickupLocation(pickupLocation)

  if (location === PICKUP_LOCATION_VALUES.anyPointLuzon) {
    return RENTAL_DURATION_VALUES.twentyFourHours
  }

  const rawValue = String(value || '').trim()
  const normalizedValue = normalizeText(rawValue)
  const spacedValue = rawValue.toLowerCase().replace(/\s+/g, ' ')

  return (
    durationAliasMap[normalizedValue] ||
    durationAliasMap[spacedValue] ||
    DEFAULT_RENTAL_DURATION
  )
}

export const getRentalDurationLabel = (
  value,
  pickupLocation = DEFAULT_PICKUP_LOCATION,
) => rentalDurationLabels[normalizeRentalDuration(value, pickupLocation)]

export const getAvailableRentalDurationOptions = (pickupLocation) => {
  const location = normalizePickupLocation(pickupLocation)

  if (location === PICKUP_LOCATION_VALUES.anyPointLuzon) {
    return RENTAL_DURATION_OPTIONS.filter(
      (option) => option.value === RENTAL_DURATION_VALUES.twentyFourHours,
    )
  }

  return RENTAL_DURATION_OPTIONS
}

const getCarPricingKey = (carOrName) => {
  const slug = normalizeText(carOrName?.slug)
  const name = normalizeText(carOrName?.name || carOrName)

  if (slug.includes('byd_emax') || name.includes('byd_emax')) {
    return 'byd-emax-7'
  }

  if (slug.includes('xpander') || name.includes('xpander')) {
    return 'xpander'
  }

  return slug || name
}

export const hasLocationBasedPricing = (carOrName) =>
  Boolean(dynamicPricing[getCarPricingKey(carOrName)])

export const getRentalRateMeta = (
  carOrName,
  pickupLocation = DEFAULT_PICKUP_LOCATION,
  rentalDuration = DEFAULT_RENTAL_DURATION,
) => {
  const pricingKey = getCarPricingKey(carOrName)
  const location = normalizePickupLocation(pickupLocation)
  const duration = normalizeRentalDuration(rentalDuration, location)
  const rates = dynamicPricing[pricingKey]
  const rate = rates?.[location]?.[duration] || Number(carOrName?.price_per_day || 0)
  const isDynamic = Boolean(rates)

  return {
    duration,
    durationLabel: getRentalDurationLabel(duration, location),
    isDynamic,
    isFixedDuration: location === PICKUP_LOCATION_VALUES.anyPointLuzon,
    location,
    locationLabel: getPickupLocationLabel(location),
    rate,
    unitLabel: isDynamic ? getRentalDurationLabel(duration, location) : 'day',
  }
}

export const getRentalRate = (
  carOrName,
  pickupLocation,
  rentalDuration,
) => getRentalRateMeta(carOrName, pickupLocation, rentalDuration).rate

export const getRentalPeriodCount = (
  pickupDate,
  returnDate,
  rentalDuration = DEFAULT_RENTAL_DURATION,
) => {
  const duration = normalizeRentalDuration(rentalDuration)

  if (duration === RENTAL_DURATION_VALUES.twelveHours) {
    return 1
  }

  const pickup = new Date(pickupDate)
  const dropoff = new Date(returnDate)

  if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
    return 1
  }

  const diffDays = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24))

  return Math.max(diffDays, 1)
}

export const getRentalEstimate = (
  carOrName,
  pickupLocation,
  rentalDuration,
  pickupDate,
  returnDate,
) => {
  const rateMeta = getRentalRateMeta(carOrName, pickupLocation, rentalDuration)
  const periods = getRentalPeriodCount(pickupDate, returnDate, rateMeta.duration)

  return {
    ...rateMeta,
    periods,
    total: rateMeta.rate * periods,
  }
}
