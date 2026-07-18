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
      {/* ===== Animated gradient hero ===== */}
      <section className="aurora-bg relative overflow-hidden">
        {/* floating glass orbs for depth */}
        <div
          className="orb orb-float-a h-72 w-72 bg-cyan/40"
          style={{ top: '10%', left: '8%' }}
        />
        <div
          className="orb orb-float-b h-96 w-96 bg-sunset/30"
          style={{ bottom: '5%', right: '5%' }}
        />
        <div
          className="orb orb-float-a h-56 w-56 bg-magenta/30"
          style={{ top: '40%', right: '15%' }}
        />

        <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-20 text-center sm:pt-28">
          <span className="glass inline-block rounded-full bg-white/15 px-4 py-1.5 font-body text-xs uppercase tracking-[0.3em] text-cream/90">
            No plan required
          </span>
          <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] text-cream drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:text-7xl">
            Get out of town
            <br />
            <span className="bg-gradient-to-r from-cyan via-cream to-sunset bg-clip-text text-transparent">
              by Friday.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-cream/85 sm:text-lg">
            Pick a vibe and how far you're willing to drive. We'll find the
            spots, check the weather, and hand you a trip worth leaving the
            house for.
          </p>
        </div>

        {/* ===== Trip builder — glass 3D card ===== */}
        <div className="relative mx-auto max-w-3xl px-6 pb-24">
          <form
            onSubmit={handleSubmit}
            className="glass bg-white/10 rounded-[2rem] p-6 shadow-[0_25px_60px_rgba(21,14,43,0.5)] sm:p-10"
          >
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-cream/70">
                01 — Pick a vibe
              </h2>
              <div
                className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4"
                style={{ perspective: '1000px' }}
              >
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
                <h2 className="font-display text-sm font-bold uppercase tracking-wide text-cream/70">
                  02 — How far will you go?
                </h2>
                <span className="font-display text-3xl font-black text-cream drop-shadow-lg">
                  {radius}
                  <span className="text-sm font-normal text-cream/60"> mi</span>
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="glow-slider mt-5 w-full"
              />
              <div className="mt-1 flex justify-between font-body text-[11px] text-cream/50">
                <span>5 mi</span>
                <span>150 mi</span>
              </div>
            </div>

            <button
              type="submit"
              className="group mt-10 w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan via-magenta to-sunset bg-[length:200%_auto] bg-left py-4 font-display text-lg font-bold text-ink shadow-[0_10px_30px_rgba(214,51,108,0.4)] transition-[background-position,transform] duration-500 hover:bg-right hover:-translate-y-0.5 active:translate-y-0"
            >
              Find my weekend →
            </button>
          </form>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
          {[
            {
              n: '01',
              title: 'Set your radius',
              body: "Tell us your vibe and how far you'll drive — no itinerary building required.",
              grad: 'from-cyan to-cyan-dark',
            },
            {
              n: '02',
              title: 'Browse real spots',
              body: 'Live attraction data, weather, and photos for every destination nearby.',
              grad: 'from-magenta to-violet',
            },
            {
              n: '03',
              title: 'Save & revisit',
              body: "Sign in to save trips and pick up right where you left off next time.",
              grad: 'from-sunset to-magenta',
            },
          ].map((step) => (
            <div
              key={step.n}
              className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${step.grad} font-display text-sm font-bold text-white shadow-md`}
              >
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-ink/60">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
