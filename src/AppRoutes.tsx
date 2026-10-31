import { Route, Routes } from 'react-router'
import App from './App'
import CRUDPage from './pages/CRUDPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

/** Connects application URLs to their page components. */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="crud" element={<CRUDPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
