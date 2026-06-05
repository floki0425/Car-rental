import { Link } from 'react-router-dom'

function FinalCtaSection() {
  return (
    <section id="concierge" className="bg-[#F7F3EC] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#0B0B0A,#151515_55%,#A8894F)] px-6 py-14 text-center text-white shadow-[0_26px_90px_rgba(11,11,10,0.28)] sm:px-10 lg:px-16">
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">Ready to book your ride?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#F7F3EC] sm:text-base">
            Join thousands of satisfied travelers who choose Hoppins for their premium transport needs.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#111111] transition hover:-translate-y-0.5 hover:bg-[#C8A96A]"
            >
              View Available Cars
            </Link>
            <a
              href="/#concierge"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#111111]"
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
