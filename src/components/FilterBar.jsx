function FilterBar({ filters, setFilters }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="card grid gap-3 md:grid-cols-4" aria-label="Car filters">
      <input type="search" name="search" placeholder="Search car name" value={filters.search} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
      <select name="type" value={filters.type} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2">
        <option value="">All Types</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Van">Van</option>
        <option value="Luxury">Luxury</option>
      </select>
      <select name="transmission" value={filters.transmission} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2">
        <option value="">All Transmission</option>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>
      <select name="sort" value={filters.sort} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2">
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </section>
  )
}

export default FilterBar

