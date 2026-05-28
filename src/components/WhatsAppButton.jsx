function WhatsAppButton() {
  const number = import.meta.env.WHATSAPP_NUMBER || import.meta.env.VITE_WHATSAPP_NUMBER || '639000000000'
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
      aria-label="Message us on WhatsApp"
    >
      WhatsApp
    </a>
  )
}

export default WhatsAppButton

