export default function PageBanner({ eyebrow, title, subtitle }) {
  return (
    <section className="aurora-bg relative overflow-hidden">
      <div
        className="orb orb-float-a h-56 w-56 bg-cyan/30"
        style={{ top: "-10%", left: "5%" }}
      />
      <div
        className="orb orb-float-b h-64 w-64 bg-sunset/25"
        style={{ bottom: "-20%", right: "8%" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
        {eyebrow && (
          <span className="font-body text-xs uppercase tracking-[0.3em] text-cream/80">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-display text-4xl font-bold text-cream drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-md text-cream/85">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
