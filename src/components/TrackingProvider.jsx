import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initGoogleAnalytics,
  initMetaPixel,
  trackPageView,
} from '../lib/tracking'

function TrackingProvider() {
  const location = useLocation()

  useEffect(() => {
    initGoogleAnalytics()
    initMetaPixel()
  }, [])

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return null
}

export default TrackingProvider
