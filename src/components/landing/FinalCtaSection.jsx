import { Link } from 'react-router-dom'

function FinalCtaSection() {
  return (
    <section id="concierge" className="bg-gray-50 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-none bg-black px-6 py-14 text-center text-white shadow-[0_26px_90px_rgba(0,0,0,0.24)] sm:px-10 lg:px-16">
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">Ready to book your ride?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-100 sm:text-base">
            Join thousands of satisfied travelers who choose Hoppins for their premium transport needs.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center rounded-none bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white"
            >
              View Available Cars
            </Link>
            <a
              href="/#concierge"
              className="inline-flex items-center justify-center rounded-none border border-white/40 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-950"
            >
              Contact Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
