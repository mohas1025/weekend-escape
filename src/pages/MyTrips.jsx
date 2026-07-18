export default function MyTrips() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-trail">
        Coming next
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-pine">
        My Trips
      </h1>
      <p className="mx-auto mt-4 max-w-md text-pine/60">
        This page will list your saved trips from Firestore, plus a Settings
        panel for your default vibe, radius, and units.
      </p>
    </main>
  )
}
