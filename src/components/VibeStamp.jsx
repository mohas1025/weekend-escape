import { useRef } from 'react'

export default function VibeStamp({ label, tagline, icon, active, onClick }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotateY = ((x - midX) / midX) * 10
    const rotateX = -((y - midY) / midY) * 10
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform =
      'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  return (
    <button
      type="button"
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      className={`glass bg-white/10 group relative flex flex-col items-center gap-2 rounded-3xl px-5 py-7 text-center will-change-transform ${
        active
          ? 'ring-2 ring-cyan shadow-[0_0_30px_rgba(53,232,196,0.45)]'
          : 'shadow-[0_10px_30px_rgba(21,14,43,0.35)] hover:shadow-[0_18px_40px_rgba(21,14,43,0.45)]'
      }`}
    >
      <span
        className="text-4xl drop-shadow-lg"
        style={{ transform: 'translateZ(30px)' }}
      >
        {icon}
      </span>
      <span
        className="font-display text-xl font-bold text-cream"
        style={{ transform: 'translateZ(24px)' }}
      >
        {label}
      </span>
      <span
        className="font-body text-[11px] uppercase tracking-wider text-cream/70"
        style={{ transform: 'translateZ(18px)' }}
      >
        {tagline}
      </span>
      {active && (
        <span
          className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-cyan text-xs font-bold text-ink shadow-lg"
          style={{ transform: 'translateZ(40px)' }}
        >
          ✓
        </span>
      )}
    </button>
  )
}
