import PageBanner from "../components/PageBanner";

export default function MyTrips() {
  return (
    <main>
      <PageBanner
        eyebrow="Coming next"
        title="My Trips"
        subtitle="This page will list your saved trips from Firestore, plus a Settings panel for your default vibe, radius, and units."
      />
    </main>
  );
}
