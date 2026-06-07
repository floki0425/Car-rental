import { Link } from 'react-router-dom'
import LandingIcon from './LandingIcon'

function ServiceCard({ service }) {
  return (
    <article className="group rounded-none border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-none bg-gray-50 text-gray-700 ring-1 ring-gray-200 transition group-hover:bg-gray-800 group-hover:text-white group-hover:ring-gray-500">
        <LandingIcon name={service.icon} />
      </div>
      <h3 className="mt-5 text-lg font-black tracking-tight text-gray-950">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-600">{service.text}</p>
    </article>
  )
}

function ServicesSection({ services, conciergeStandards }) {
  return (
    <section id="services" className="scroll-mt-28 bg-gray-50 px-4 py-24 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.36em] text-gray-700">Services</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">Simple rental options, handled with care</h2>
          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            Choose the service that fits your trip. We keep the process clear, prepared, and easy from inquiry to pickup.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-none border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-wrap gap-3">
            {conciergeStandards.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-none bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700 ring-1 ring-gray-200">
                <LandingIcon name="check" className="h-4 w-4 text-gray-700" />
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/cars"
            className="inline-flex items-center justify-center rounded-none bg-black px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white"
          >
            View Fleet
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
