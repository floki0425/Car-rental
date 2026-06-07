function WhatsAppButton() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '639000000000'

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-none bg-black text-white shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
      aria-label="Message us on WhatsApp"
    >
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.6 10.2c.4 1.4 1.7 2.8 3.2 3.2l1.1-1.1c.2-.2.5-.3.8-.2 1 .3 2 .4 3 .4.4 0 .8.4.8.8v1.8c0 .4-.4.8-.8.8A10.7 10.7 0 0 1 6 5.3c0-.4.4-.8.8-.8h1.8c.4 0 .8.4.8.8 0 1 .1 2 .4 3 .1.3 0 .6-.2.8l-1 1.1Z" />
        <path d="M12 21a9 9 0 1 0-7.8-4.5L3 21l4.5-1.2A9 9 0 0 0 12 21Z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
