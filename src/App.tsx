import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import DemoPage from './pages/DemoPage'
import HomePage from './pages/HomePage'
import { DemoProvider } from './state/DemoContext'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/demo/*" element={<DemoProvider><DemoPage /></DemoProvider>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
