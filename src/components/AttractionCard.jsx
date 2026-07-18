export default function AttractionCard({ attraction, onClick }) {
  const { name, category, photo } = attraction

  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-ink/5">
        {photo ? (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            📍
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-bold text-ink">{name}</h3>
        <p className="mt-1 font-body text-xs uppercase tracking-wide text-magenta">
          {category}
        </p>
      </div>
    </button>
  )
}
