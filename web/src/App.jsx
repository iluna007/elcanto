import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import { useProjectTheme } from './hooks/useProjectTheme'
import { useNavbarHeight } from './hooks/useNavbarHeight'

const MapPage = lazy(() => import('./pages/MapPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

function LegacyProjectRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/proyectos/${slug}` : '/proyectos'} replace />
}

function AppLayout() {
  useProjectTheme()
  useNavbarHeight()

  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
          <Route path="/propiedades" element={<Navigate to="/proyectos" replace />} />
          <Route path="/propiedades/:slug" element={<LegacyProjectRedirect />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/sobre-nosotros" element={<AboutPage />} />
        </Routes>
      </Suspense>
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
