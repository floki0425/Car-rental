function LandingIcon({ name, className = 'h-5 w-5' }) {
  const paths = {
    shield: 'M12 3.5 5.5 6v5.2c0 4 2.7 7.7 6.5 8.8 3.8-1.1 6.5-4.8 6.5-8.8V6L12 3.5Zm0 4.6v7.8m-3.2-3.2H15',
    calendar: 'M7 3v4m10-4v4M4.5 9h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
    headset: 'M4 12a8 8 0 0 1 16 0v3a2 2 0 0 1-2 2h-1v-6h3M4 15a2 2 0 0 0 2 2h1v-6H4v4Zm9 5h2a3 3 0 0 0 3-3M9 20h3',
    check: 'm5 12 4 4L19 6',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    seat: 'M7 4h5a3 3 0 0 1 3 3v5H8a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Zm1 8v6m0 0h9m-9 0H5',
    gear: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6',
    price: 'M4 7.5V6a2 2 0 0 1 2-2h1.5M20 7.5V6a2 2 0 0 0-2-2h-1.5M4 16.5V18a2 2 0 0 0 2 2h1.5M20 16.5V18a2 2 0 0 1-2 2h-1.5M8 12h8m-4-4v8',
    driver: 'M7 17v-5a5 5 0 0 1 10 0v5M5 20h14M9 9h6M12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
    car: 'M5 16h2m10 0h2M7 16a3 3 0 1 0 6 0m-6 0a3 3 0 0 1 6 0m4 0a3 3 0 1 0 6 0m-6 0a3 3 0 0 1 6 0M4 13l2.2-5.2A3 3 0 0 1 9 6h6.8a3 3 0 0 1 2.8 1.9L21 13v3h-2M5 16H3v-3l2-2h16',
    location: 'M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    search: 'm21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z',
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export default LandingIcon
