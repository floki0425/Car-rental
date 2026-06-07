function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container-shell grid gap-10 border-t border-white/10 py-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div>
          <p className="text-2xl font-black tracking-tight text-white">Hoppins</p>
          <p className="mt-3 max-w-xs text-sm leading-6">
            Premium car rentals in the Philippines, built for business trips, family travel, and special occasions.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:justify-self-center">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
            <li>
              <a href="/" className="transition hover:text-white">Home</a>
            </li>
            <li>
              <a href="/cars" className="transition hover:text-white">Fleet</a>
            </li>
            <li>
              <a href="/#why" className="transition hover:text-white">Why Hoppins</a>
            </li>
            <li>
              <a href="/#concierge" className="transition hover:text-white">Contact</a>
            </li>
          </ul>
        </nav>

        <p className="text-sm lg:justify-self-end">&copy; {new Date().getFullYear()} Hoppin With Shawn&apos;s Car Rental. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
