import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VibeStamp from '../components/VibeStamp'

const VIBES = [
  { id: 'adventure', label: 'Adventure', tagline: 'Trails & lookouts', icon: '⛰️' },
  { id: 'chill', label: 'Chill', tagline: 'Slow mornings', icon: '🌾' },
  { id: 'foodie', label: 'Foodie', tagline: 'Worth the drive', icon: '🍽️' },
  { id: 'scenic', label: 'Scenic', tagline: 'Windows down', icon: '📷' },
]

export default function Home() {
  const [vibe, setVibe] = useState('adventure')
  const [radius, setRadius] = useState(45)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/explore?vibe=${vibe}&radius=${radius}`)
  }

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center sm:pt-24">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-trail">
          No plan required
        </span>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-pine sm:text-7xl">
          Get out of town
          <br />
          <span className="italic text-poppy">by Friday.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-pine/70 sm:text-lg">
          Pick a vibe and how far you're willing to drive. We'll find the
          spots, check the weather, and hand you a trip worth leaving the
          house for.
        </p>
      </section>

      {/* Trip builder card */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-pine/10 bg-paper p-6 shadow-[0_1px_0_0_rgba(22,48,43,0.05)] sm:p-10"
        >
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-pine/50">
              01 — Pick a vibe
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {VIBES.map((v) => (
                <VibeStamp
                  key={v.id}
                  label={v.label}
                  tagline={v.tagline}
                  icon={v.icon}
                  active={vibe === v.id}
                  onClick={() => setVibe(v.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-pine/50">
                02 — How far will you go?
              </h2>
              <span className="font-mono text-2xl font-semibold text-poppy">
                {radius}<span className="text-sm text-pine/50"> mi</span>
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-pine/10 accent-poppy"
            />
            <div className="mt-1 flex justify-between font-mono text-[11px] text-pine/40">
              <span>5 mi</span>
              <span>150 mi</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 w-full rounded-full bg-pine py-4 font-display text-lg font-semibold text-fog transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Find my weekend →
          </button>
        </form>
      </section>

      {/* How it works strip */}
      <section className="border-t border-pine/10 bg-paper/60 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-3">
          {[
            {
              n: '01',
              title: 'Set your radius',
              body: 'Tell us your vibe and how far you\u2019ll drive — no itinerary building required.',
            },
            {
              n: '02',
              title: 'Browse real spots',
              body: 'Live attraction data, weather, and photos for every destination nearby.',
            },
            {
              n: '03',
              title: 'Save & revisit',
              body: 'Sign in to save trips and pick up right where you left off next time.',
            },
          ].map((step) => (
            <div key={step.n} className="flex gap-4">
              <span className="font-mono text-3xl font-semibold text-fog-deep">
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-pine">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-pine/60">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
