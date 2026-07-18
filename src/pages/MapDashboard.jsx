import PageBanner from "../components/PageBanner";

export default function MapDashboard() {
  return (
    <main>
      <PageBanner
        eyebrow="Coming next"
        title="Map Dashboard"
        subtitle="This page will plot saved trips on a Leaflet map, alongside a chart summarizing trips by vibe."
      />
    </main>
  );
}
