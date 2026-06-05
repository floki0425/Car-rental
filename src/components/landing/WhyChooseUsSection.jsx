import LandingIcon from './LandingIcon'

function WhyChooseUsSection({ items, whyImage }) {
  return (
    <section id="why" className="overflow-hidden bg-[#0B0B0A] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.36em] text-[#E8D6AE]">Drive With Confidence</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Why Choose Hoppins</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            We focus on comfort, transparent pricing, and dependable service to help you get on the road with confidence. Our commitment to excellence defines every mile of your journey.
          </p>

          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#E8D6AE] ring-1 ring-white/10">
                  <LandingIcon name={item.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">{item.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-400">{item.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pb-12 sm:pb-0">
          <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#C8A96A]/20 blur-[90px]" />
          <img
            src={whyImage}
            alt="Premium rental vehicle at night"
            className="relative h-[380px] w-full rounded-[1.75rem] object-cover shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:h-[470px]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-4 right-4 rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-[0_24px_75px_rgba(0,0,0,0.25)] sm:-bottom-8 sm:left-8 sm:right-auto sm:w-80">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <span className="h-9 w-9 rounded-full border-2 border-white bg-slate-200" />
                <span className="h-9 w-9 rounded-full border-2 border-white bg-slate-300" />
                <span className="h-9 w-9 rounded-full border-2 border-white bg-slate-400" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">4.9/5 Rating</p>
                <p className="text-xs font-semibold text-[#A8894F]">5.0 rating</p>
              </div>
            </div>
            <p className="mt-4 text-sm italic leading-6 text-slate-600">"The most seamless rental experience I have had globally."</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
