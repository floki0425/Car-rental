import LandingIcon from './LandingIcon'

function HeroSection({ children, heroImage, heroHighlights }) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <img src={heroImage} alt="Premium luxury rental car" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.74)_35%,rgba(0,0,0,0.24)_74%,rgba(0,0,0,0.16)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.10)_45%,rgba(255,255,255,0.12)_100%)]" />

      <div className="container-shell relative z-10 flex min-h-[780px] flex-col justify-end pb-8 pt-24 sm:min-h-[820px] sm:pb-10 sm:pt-28 lg:min-h-[860px] lg:pb-12">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.32em] text-gray-300">Elevated Travel Experience</p>
          <h1 className="mt-5 max-w-xl text-4xl font-black leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Premium Car Rentals Made Simple
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
            Book reliable, well-maintained vehicles for business trips, family travel, or special occasions. Experience the pinnacle of automotive concierge service.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#plan-rental"
              className="inline-flex items-center justify-center gap-2 rounded-none bg-black px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_20px_45px_rgba(0,0,0,0.34)] ring-1 ring-gray-500/40 transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white"
            >
              <LandingIcon name="calendar" className="h-4 w-4" />
              Book Now
            </a>
            <a
              href="#popular-cars"
              className="inline-flex items-center justify-center rounded-none border border-white/35 bg-white/90 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-gray-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              View Vehicles
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-white/90 text-gray-700 shadow-sm">
                  <LandingIcon name={item.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">{item.title}</span>
                  <span className="block text-xs font-semibold text-gray-200">{item.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {children ? (
          <div className="relative z-20 mt-10 w-full">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default HeroSection
