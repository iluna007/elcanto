import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import MapPage from './pages/MapPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import { useProjectTheme } from './hooks/useProjectTheme'

function LegacyProjectRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/proyectos/${slug}` : '/proyectos'} replace />
}

function AppLayout() {
  useProjectTheme()

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
        <Route path="/propiedades" element={<Navigate to="/proyectos" replace />} />
        <Route path="/propiedades/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
