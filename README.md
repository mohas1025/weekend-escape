# Weekend Escape

A responsive travel-planning web app for spontaneous day trips. Pick a vibe
and a drive radius, browse nearby attractions with live weather and photos,
and save trips to revisit later.

Built for CPSC-349: Web Frontend Engineering.

## Status

🚧 In progress. Home page is built. Explore, Attraction Detail, My Trips,
and Map Dashboard are scaffolded as placeholders and being built next.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Routing:** React Router
- **Auth / Database:** Firebase Authentication + Firestore
- **Map:** Leaflet / React-Leaflet
- **Charts:** Recharts
- **Deployment:** Vercel

## APIs Used

| API | Type | Purpose |
|---|---|---|
| [Open-Meteo](https://open-meteo.com) | Public, keyless | Current weather per attraction |
| [Geoapify Places](https://www.geoapify.com) | Private, API key | Nearby attraction/POI data |
| [Unsplash](https://unsplash.com/developers) | Private, API key | Attraction photos |

## Routes / Pages

| Route | Purpose |
|---|---|
| `/` | Home — pick vibe and drive radius |
| `/explore` | Browse nearby attractions, live filter |
| `/attraction/:id` | Single attraction detail, weather, photo |
| `/trips` | Saved trips + user settings |
| `/map` | Map of saved trips + trip breakdown chart |

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own API keys:
   ```bash
   cp .env.example .env
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Deployment

Deployed on Vercel: _link coming soon_

## Screenshots

_Coming soon_
