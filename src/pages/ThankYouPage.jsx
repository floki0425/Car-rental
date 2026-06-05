import { Link } from 'react-router-dom'

const steps = [
  ['Inquiry Review', 'Our team validates your details and selected vehicle requirements.'],
  ['Availability Confirmation', 'We verify the unit, schedule, and rental option for your trip.'],
  ['Final Booking Link', 'You receive the next steps to confirm payment and delivery details.'],
]

function ThankYouPage() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '639000000000'

  return (
    <section className="bg-[#F7F3EC]">
      <div className="container-shell py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-[0_0_55px_rgba(34,197,94,0.24)]" aria-hidden="true">
            <svg className="h-14 w-14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 12.5 10.7 15.2 16.5 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Thank You! Your Inquiry is Submitted</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Our team will review your request and get back to you soon. Your premium rental experience is just around the corner.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">What happens next</h2>
          <div className="mt-6 grid gap-6">
            {steps.map(([title, text], index) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3EC] text-sm font-black text-[#A8894F] ring-1 ring-[#E8E2D6]">{index + 1}</span>
                <span>
                  <span className="block text-lg font-black text-slate-950">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 rounded-2xl bg-[#0B0B0A] p-5 text-white shadow-[0_20px_60px_rgba(11,11,10,0.16)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
          <div>
            <h2 className="text-xl font-black">Need a faster response?</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">Connect directly with our booking support through WhatsApp.</p>
          </div>
          <a href={`https://wa.me/${number}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-green-600">
            Message on WhatsApp
          </a>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/cars" className="primary-button">Back to Fleet</Link>
          <Link to="/" className="secondary-button">Back to Home</Link>
        </div>
      </div>
    </section>
  )
}

export default ThankYouPage
