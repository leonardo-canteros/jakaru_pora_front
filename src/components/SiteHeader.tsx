import { Link } from 'react-router-dom'

export default function SiteHeader() {
  return (
    <header className="public-header">
      <div className="public-container public-header-inner">
        <Link className="wordmark" to="/" aria-label="Agronautas, inicio">
          <span>Agronautas</span>
          <small>Jakaru Porá · huertas</small>
        </Link>
        <nav className="public-nav" aria-label="Navegación principal">
          <Link to="/?section=propuesta">La propuesta</Link>
          <Link to="/?section=etapas">Etapas</Link>
          <Link className="nav-demo" to="/demo">Explorar la demo <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  )
}
