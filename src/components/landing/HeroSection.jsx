import LandingIcon from './LandingIcon'

function HeroSection({ heroImage, heroHighlights }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0B0B0A] text-white">
      <img src={heroImage} alt="Premium luxury rental car" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,11,10,0.92)_0%,rgba(11,11,10,0.74)_35%,rgba(11,11,10,0.28)_74%,rgba(11,11,10,0.16)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(11,11,10,0.46)_0%,rgba(11,11,10,0.12)_45%,rgba(255,255,255,0.12)_100%)]" />

      <div className="container-shell flex min-h-[680px] flex-col justify-end pb-24 pt-24 sm:min-h-[720px] sm:pb-28 sm:pt-28 lg:min-h-[760px] lg:pb-32">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#E8D6AE]">Elevated Travel Experience</p>
          <h1 className="mt-5 max-w-xl text-4xl font-black leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Premium Car Rentals Made Simple
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Book reliable, well-maintained vehicles for business trips, family travel, or special occasions. Experience the pinnacle of automotive concierge service.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#plan-rental"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B0B0A] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_20px_45px_rgba(0,0,0,0.34)] ring-1 ring-[#C8A96A]/45 transition hover:-translate-y-0.5 hover:bg-[#C8A96A] hover:text-[#0B0B0A]"
            >
              <LandingIcon name="calendar" className="h-4 w-4" />
              Book Now
            </a>
            <a
              href="#popular-cars"
              className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-white/90 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              View Vehicles
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/90 text-[#C8A96A] shadow-sm">
                  <LandingIcon name={item.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">{item.title}</span>
                  <span className="block text-xs font-semibold text-slate-200">{item.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
