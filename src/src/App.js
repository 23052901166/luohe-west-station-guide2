import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Admin from './pages/Admin'
import WaitingHall from './screens/WaitingHall'
import PlatformScreen from './screens/PlatformScreen'
import StationSign from './screens/StationSign'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/hall" element={<WaitingHall />} />
        <Route path="/platforms" element={<PlatformScreen />} />
        <Route path="/sign" element={<StationSign />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
