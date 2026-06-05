export const formatPHP = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

export const cx = (...classes) => classes.filter(Boolean).join(' ')

export const tripDetailFields = ['pickup_location', 'pickup_date', 'return_date']

export const cleanTripDetails = (details = {}) =>
  tripDetailFields.reduce((cleaned, field) => {
    const value = String(details[field] || '').trim()
    if (value) cleaned[field] = value
    return cleaned
  }, {})

export const getTripDetailsSearch = (details = {}) => {
  const params = new URLSearchParams()
  const cleanDetails = cleanTripDetails(details)

  tripDetailFields.forEach((field) => {
    if (cleanDetails[field]) params.set(field, cleanDetails[field])
  })

  return params.toString()
}

export const getTripDetailsFromSearch = (search = '') => {
  const params = new URLSearchParams(search)

  return cleanTripDetails({
    pickup_location: params.get('pickup_location'),
    pickup_date: params.get('pickup_date'),
    return_date: params.get('return_date'),
  })
}

export const getTripDetailsFromNavigation = (location) =>
  cleanTripDetails({
    ...(location?.state?.tripDetails || {}),
    ...getTripDetailsFromSearch(location?.search),
  })

