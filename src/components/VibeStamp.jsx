export default function VibeStamp({ label, tagline, icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-5 py-6 text-center transition-all ${
        active
          ? 'border-poppy bg-paper shadow-[4px_4px_0_0_var(--color-poppy)] -translate-y-1'
          : 'border-pine/25 bg-paper/60 hover:-translate-y-0.5 hover:border-pine/50 hover:shadow-[3px_3px_0_0_rgba(22,48,43,0.15)]'
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <span className="font-display text-lg font-semibold text-pine">{label}</span>
      <span className="font-mono text-[11px] uppercase tracking-wide text-trail">{tagline}</span>
    </button>
  )
}
