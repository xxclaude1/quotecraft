import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { Dashboard } from './pages/Dashboard'
import { QuoteBuilder } from './pages/QuoteBuilder'
import { Clients } from './pages/Clients'
import { Templates } from './pages/Templates'
import { PriceBook } from './pages/PriceBook'
import { SettingsPage } from './pages/SettingsPage'
import { seedDatabase } from './db/seed'
import { getOrCreateBusiness } from './db/database'

export function App() {
  useEffect(() => {
    getOrCreateBusiness().then(() => seedDatabase())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="/quotes/:id" element={<QuoteBuilder />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/pricebook" element={<PriceBook />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
