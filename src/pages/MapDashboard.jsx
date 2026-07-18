export default function MapDashboard() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-trail">
        Coming next
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-pine">
        Map Dashboard
      </h1>
      <p className="mx-auto mt-4 max-w-md text-pine/60">
        This page will plot saved trips on a Leaflet map, alongside a chart
        summarizing trips by vibe.
      </p>
    </main>
  )
}
