import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Trash2 } from "lucide-react";
import PageBanner from "../components/PageBanner";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import {
  subscribeTrips,
  removeTrip,
  getUserSettings,
  saveUserSettings,
} from "../services/trips";

const VIBES = ["adventure", "chill", "foodie", "scenic"];

export default function MyTrips() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);

  const [settings, setSettings] = useState({
    defaultVibe: "adventure",
    defaultRadius: 45,
    units: "imperial",
    displayName: "",
  });
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeTrips(user.uid, (data) => {
      setTrips(data);
      setTripsLoading(false);
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    getUserSettings(user.uid).then((s) => {
      setSettings(s);
      setSettingsLoaded(true);
    });
  }, [user]);

  async function handleRemove(tripId) {
    await removeTrip(user.uid, tripId);
  }

  async function handleSaveSettings(e) {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await saveUserSettings(user.uid, settings);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    } finally {
      setSavingSettings(false);
    }
  }

  if (authLoading) return null;

  if (!user) {
    return (
      <main>
        <PageBanner
          eyebrow="Your saved spots"
          title="My Trips"
          subtitle="Sign in to save attractions and build your own list of weekend escapes."
        />
        <div className="mx-auto max-w-md px-6 py-16 text-center">
          <button
            onClick={() => setShowAuthModal(true)}
            className="rounded-full bg-gradient-to-r from-cyan to-magenta px-6 py-3 font-display font-bold text-ink shadow-md"
          >
            Sign in
          </button>
        </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </main>
    );
  }

  return (
    <main>
      <PageBanner
        eyebrow="Your saved spots"
        title="My Trips"
        subtitle="Everything you've saved, plus your default search preferences."
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <section className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-bold text-ink">Settings</h2>
          <p className="mt-1 text-sm text-ink/50">
            These become your defaults next time you plan a trip from Home.
          </p>

          {settingsLoaded && (
            <form
              onSubmit={handleSaveSettings}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <div>
                <label className="block text-xs font-bold text-ink">
                  Display name
                </label>
                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(e) =>
                    setSettings({ ...settings, displayName: e.target.value })
                  }
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm text-ink focus:border-magenta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink">
                  Default vibe
                </label>
                <select
                  value={settings.defaultVibe}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultVibe: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm capitalize text-ink focus:border-magenta focus:outline-none"
                >
                  {VIBES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink">
                  Default radius ({settings.defaultRadius} mi)
                </label>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={settings.defaultRadius}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultRadius: Number(e.target.value),
                    })
                  }
                  className="glow-slider mt-3 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink">
                  Units
                </label>
                <div className="mt-1 flex gap-2">
                  {["imperial", "metric"].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setSettings({ ...settings, units: u })}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                        settings.units === u
                          ? "bg-gradient-to-r from-cyan to-magenta text-ink"
                          : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
                >
                  {savingSettings
                    ? "Saving…"
                    : savedFlash
                      ? "Saved ✓"
                      : "Save settings"}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-ink">
            Saved trips ({trips.length})
          </h2>

          {tripsLoading && (
            <p className="mt-6 text-sm text-ink/50">Loading your trips…</p>
          )}

          {!tripsLoading && trips.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-ink/20 p-10 text-center">
              <p className="text-sm text-ink/50">
                Nothing saved yet — head to Explore and save a spot you like.
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="mt-4 rounded-full bg-gradient-to-r from-cyan to-magenta px-5 py-2 text-sm font-semibold text-ink shadow-md"
              >
                Explore attractions
              </button>
            </div>
          )}

          {!tripsLoading && trips.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] w-full bg-ink/5">
                    {trip.photo ? (
                      <img
                        src={trip.photo}
                        alt={trip.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ink/20">
                        <MapPin size={32} strokeWidth={1.75} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-ink">
                      {trip.name}
                    </h3>
                    <p className="mt-1 font-body text-xs uppercase tracking-wide text-magenta">
                      {trip.vibe}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(trip.id)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink/60 shadow-md transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove trip"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
