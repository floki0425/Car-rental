function SectionHeader({ eyebrow, title, align = 'left', action }) {
  return (
    <div className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${align === 'center' ? 'text-center sm:block' : ''}`}>
      <div>
        <p className="text-[0.65rem] font-black uppercase tracking-[0.36em] text-[#C8A96A]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
