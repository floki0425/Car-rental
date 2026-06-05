const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

let gaLoaded = false
let metaLoaded = false

export function initGoogleAnalytics() {
  if (!GA_ID || gaLoaded) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_ID, {
    send_page_view: false,
  })

  gaLoaded = true
}

export function trackPageView(path) {
  if (window.gtag && GA_ID) {
    window.gtag('config', GA_ID, {
      page_path: path,
    })
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'PageView')
  }
}

export function initMetaPixel() {
  if (!META_PIXEL_ID || metaLoaded) return

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', META_PIXEL_ID)
  metaLoaded = true
}

export function trackLeadEvent(data = {}) {
  if (window.gtag && GA_ID) {
    window.gtag('event', 'generate_lead', {
      event_category: 'booking',
      event_label: data.carName || 'car rental inquiry',
      value: data.value || 0,
    })
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'Lead', {
      content_name: data.carName || 'Car Rental Inquiry',
      value: data.value || 0,
      currency: 'PHP',
    })
  }
}