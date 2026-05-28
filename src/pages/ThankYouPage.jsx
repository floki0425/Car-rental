import { Link } from 'react-router-dom'

function ThankYouPage() {
  const number = import.meta.env.WHATSAPP_NUMBER || import.meta.env.VITE_WHATSAPP_NUMBER || '639000000000'

  return (
    <section className="container-shell py-16">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">?</div>
        <h1 className="mt-5 text-4xl font-bold">Thank You!</h1>
        <p className="mt-2 text-slate-600">Your booking inquiry has been submitted.</p>
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left text-sm text-slate-700">
          <h2 className="font-semibold">What’s next</h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>We will review your inquiry</li>
            <li>Our team will contact you via phone or message</li>
            <li>You can message us directly for faster response</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`https://wa.me/${number}`} target="_blank" rel="noreferrer" className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-white">Message Us on WhatsApp</a>
          <Link to="/" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Back to Home</Link>
        </div>
      </div>
    </section>
  )
}

export default ThankYouPage

