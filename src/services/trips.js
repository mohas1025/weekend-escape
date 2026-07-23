// Firestore data layer for saved trips and per-user settings.
// Data model:
//   users/{uid}                -> { defaultVibe, defaultRadius, units, displayName }
//   users/{uid}/trips/{tripId} -> { name, category, lat, lon, photo, vibe, createdAt }
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export function subscribeTrips(uid, onChange) {
  const tripsRef = collection(db, "users", uid, "trips");
  const q = query(tripsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const trips = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    onChange(trips);
  });
}

export async function saveTrip(uid, attraction) {
  const tripsRef = collection(db, "users", uid, "trips");
  await addDoc(tripsRef, {
    name: attraction.name,
    category: attraction.category || "attraction",
    vibe: attraction.vibe || "adventure",
    lat: attraction.lat ?? null,
    lon: attraction.lon ?? null,
    photo: attraction.photo || null,
    createdAt: serverTimestamp(),
  });
}

export async function removeTrip(uid, tripId) {
  await deleteDoc(doc(db, "users", uid, "trips", tripId));
}

const DEFAULT_SETTINGS = {
  defaultVibe: "adventure",
  defaultRadius: 45,
  units: "imperial",
  displayName: "",
};

export async function getUserSettings(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists()
    ? { ...DEFAULT_SETTINGS, ...snap.data() }
    : DEFAULT_SETTINGS;
}

export async function saveUserSettings(uid, settings) {
  const ref = doc(db, "users", uid);
  await setDoc(ref, settings, { merge: true });
}
