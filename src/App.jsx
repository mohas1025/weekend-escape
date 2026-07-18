import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AttractionDetail from './pages/AttractionDetail'
import MyTrips from './pages/MyTrips'
import MapDashboard from './pages/MapDashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/attraction/:id" element={<AttractionDetail />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/map" element={<MapDashboard />} />
      </Routes>
    </div>
  )
}
