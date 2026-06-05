function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-slate-500">{label}</span>
      {children}
    </label>
  )
}

function FilterBar({ filters, setFilters }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const resetFilters = () => setFilters({ search: '', type: '', transmission: '', sort: 'asc' })

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6" aria-label="Car filters">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-end">
        <Field label="Search Vehicle">
          <input
            type="search"
            name="search"
            placeholder="Model or brand..."
            value={filters.search}
            onChange={handleChange}
            className="premium-input"
          />
        </Field>

        <Field label="Vehicle Type">
          <select name="type" value={filters.type} onChange={handleChange} className="premium-input">
            <option value="">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Luxury">Luxury</option>
            <option value="MPV">MPV</option>
            <option value="Electric MPV">Electric MPV</option>
          </select>
        </Field>

        <Field label="Transmission">
          <select name="transmission" value={filters.transmission} onChange={handleChange} className="premium-input">
            <option value="">Any Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </Field>

        <Field label="Sort By">
          <select name="sort" value={filters.sort} onChange={handleChange} className="premium-input">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </Field>

        <button type="button" onClick={resetFilters} className="primary-button h-[3.05rem] whitespace-nowrap">
          Reset
        </button>
      </div>
    </section>
  )
}

export default FilterBar
