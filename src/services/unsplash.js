// Private/keyed API — requires VITE_UNSPLASH_KEY in .env
// Docs: https://unsplash.com/documentation
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY
const BASE_URL = 'https://api.unsplash.com/search/photos'

export async function getPhotoForQuery(query) {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=1&client_id=${ACCESS_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch photo')
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}
