function TestimonialsSection({ testimonials }) {
  return (
    <section className="bg-[#F7F3EC] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.36em] text-[#C8A96A]">Voices Of Trust</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">What Our Clients Say</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
            >
              <span className="absolute right-6 top-4 text-6xl font-black leading-none text-[#E8E2D6]">99</span>
              <div className="relative text-sm font-black tracking-[0.16em] text-orange-500">5.0</div>
              <p className="relative mt-5 text-sm leading-7 text-slate-700">"{testimonial.quote}"</p>
              <footer className="relative mt-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F3EC] text-xs font-black text-[#A8894F] ring-1 ring-[#E8E2D6]">
                  {testimonial.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <span>
                  <span className="block text-sm font-black text-slate-950">{testimonial.name}</span>
                  <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-500">{testimonial.type}</span>
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
