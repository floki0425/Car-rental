function FaqSection({ faqs }) {
  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.36em] text-[#C8A96A]">Helpful Answers</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            Quick answers about requirements, booking options, rates, and confirmation steps before you reserve your ride.
          </p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[#E8E2D6] bg-[#F7F3EC] p-5 shadow-sm transition hover:border-[#C8A96A]/60 hover:bg-white hover:shadow-[0_18px_45px_rgba(11,11,10,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#C8A96A] ring-1 ring-[#E8E2D6] transition group-open:rotate-45 group-hover:ring-[#C8A96A]/60">
                  +
                </span>
              </summary>
              <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
