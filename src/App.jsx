import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AuctionsPage from './pages/AuctionsPage'
import OtcPage from './pages/OtcPage'
import NewsPage from './pages/NewsPage'
import DisclosurePage from './pages/DisclosurePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auctions" element={<AuctionsPage />} />
        <Route path="/otc" element={<OtcPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/disclosure" element={<DisclosurePage />} />
      </Route>
    </Routes>
  )
}
