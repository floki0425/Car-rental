import { Link } from 'react-router-dom'
import LandingIcon from './LandingIcon'

function ServiceCard({ service }) {
  return (
    <article className="group rounded-2xl border border-[#E8E2D6] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C8A96A]/60 hover:shadow-[0_18px_50px_rgba(11,11,10,0.08)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F3EC] text-[#C8A96A] ring-1 ring-[#E8E2D6] transition group-hover:bg-[#C8A96A] group-hover:text-[#0B0B0A] group-hover:ring-[#C8A96A]">
        <LandingIcon name={service.icon} />
      </div>
      <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
    </article>
  )
}

function ServicesSection({ services, conciergeStandards }) {
  return (
    <section id="services" className="bg-[#F7F3EC] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.36em] text-[#C8A96A]">Services</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Simple rental options, handled with care</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Choose the service that fits your trip. We keep the process clear, prepared, and easy from inquiry to pickup.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-[#E8E2D6] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-wrap gap-3">
            {conciergeStandards.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full bg-[#F7F3EC] px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-[#E8E2D6]">
                <LandingIcon name="check" className="h-4 w-4 text-[#C8A96A]" />
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/cars"
            className="inline-flex items-center justify-center rounded-xl bg-[#0B0B0A] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#C8A96A] hover:text-[#0B0B0A]"
          >
            View Fleet
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
