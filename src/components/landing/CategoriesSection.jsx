import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

function CategoriesSection({ categories }) {
  return (
    <section id="destinations" className="bg-[#F7F3EC] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Curated Collections" title="Popular Categories" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/cars"
              className="group relative min-h-[170px] overflow-hidden rounded-xl bg-[#0B0B0A] shadow-[0_18px_55px_rgba(11,11,10,0.12)]"
            >
              <img
                src={category.image}
                alt={`${category.name} rental category`}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-lg font-black tracking-tight">{category.name}</h3>
                <p className="mt-1 text-xs font-semibold text-slate-300">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
