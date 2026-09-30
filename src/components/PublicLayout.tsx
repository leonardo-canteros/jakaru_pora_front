import { Link, Outlet } from 'react-router-dom'
import SiteHeader from './SiteHeader'

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <SiteHeader />
      <main><Outlet /></main>
      <footer className="public-footer">
        <div className="public-container footer-main">
          <div><Link className="footer-wordmark" to="/">Agronautas</Link><p>Software y hardware para el ámbito agropecuario.</p></div>
          <div className="footer-links"><Link to="/?section=propuesta">La propuesta</Link><Link to="/?section=etapas">Etapas</Link><Link to="/demo">Abrir demo <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="public-container footer-bottom"><span>Jakaru Porá · Proyecto en desarrollo</span><span>La demo usa datos completamente simulados.</span></div>
      </footer>
    </div>
  )
}
