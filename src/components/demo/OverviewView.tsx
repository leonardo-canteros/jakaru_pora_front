
import Icon from '../Icon'
import MeasurementChart from '../MeasurementChart'
import type { FollowUp, Garden, Measurement, MeasurementVariable } from '../../types'
import type { PeriodDays } from '../../pages/DemoPage'

const dateFormat = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' })
const numberFormat = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })

function newest<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date))
}
function lastOfVariable(items: Measurement[], variable: MeasurementVariable) {
  return newest(items.filter((item) => item.variable === variable))[0]
}

export default function OverviewView({ garden, gardens, measurements, followUps, period, variable, onVariable, onDetails }: {
  garden: Garden
  gardens: Garden[]
  measurements: Measurement[]
  followUps: FollowUp[]
  period: PeriodDays
  variable: MeasurementVariable
  onVariable: (value: MeasurementVariable) => void
  onDetails: () => void
}) {
  const latestMoisture = lastOfVariable(measurements, 'Humedad del suelo')
  const latestTemperature = lastOfVariable(measurements, 'Temperatura ambiente')
  const latestReadings = newest(measurements).slice(0, 4)
  const latestNotes = newest(followUps).slice(0, 3)
  const graphData = [...measurements].filter((item) => item.variable === variable).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <section className="view-content">
      <div className="overview-welcome">
        <div><span className="section-label">HUERTA SELECCIONADA · {garden.type.toUpperCase()}</span><h2>{garden.name}</h2><p>{garden.locality} <span>·</span> {garden.crops.join(', ')}</p></div>
        <button className="button-outline" type="button" onClick={onDetails}>Ver ficha de la huerta <Icon name="arrow" /></button>
      </div>

      <div className="stat-grid">
        <article className="stat-card stat-emphasis"><span>Lecturas en {period} días</span><strong>{measurements.length}</strong><small>Registros de esta huerta</small><i className="stat-icon"><Icon name="overview" /></i></article>
        <article className="stat-card"><span>Humedad del suelo</span><strong>{latestMoisture ? <>{numberFormat.format(latestMoisture.value)}<small> {latestMoisture.unit}</small></> : '—'}</strong><small>{latestMoisture ? `Última lectura · ${dateFormat.format(new Date(latestMoisture.date))}` : 'Sin lecturas en el período'}</small><i className="stat-icon"><Icon name="drop" /></i></article>
        <article className="stat-card"><span>Temperatura ambiente</span><strong>{latestTemperature ? <>{numberFormat.format(latestTemperature.value)}<small> {latestTemperature.unit}</small></> : '—'}</strong><small>{latestTemperature ? `Última lectura · ${dateFormat.format(new Date(latestTemperature.date))}` : 'Sin lecturas en el período'}</small><i className="stat-icon"><Icon name="thermometer" /></i></article>
        <article className="stat-card"><span>Registros de seguimiento</span><strong>{followUps.length}</strong><small>Notas en este período</small><i className="stat-icon"><Icon name="history" /></i></article>
      </div>

      <div className="overview-grid">
        <section className="dashboard-card chart-card">
          <div className="card-heading"><div><span className="section-label">EVOLUCIÓN · {period} DÍAS</span><h3>Mediciones de la huerta</h3></div><label className="select-label" htmlFor="overview-variable"><span>Variable</span><select id="overview-variable" value={variable} onChange={(event) => onVariable(event.target.value as MeasurementVariable)}><option>Humedad del suelo</option><option>Temperatura ambiente</option></select></label></div>
          <MeasurementChart title={`${variable} durante los últimos ${period} días para ${garden.name}`} unit={graphData[0]?.unit ?? (variable === 'Humedad del suelo' ? '%' : '°C')} series={[{ label: garden.name, color: '#287a70', measurements: graphData }]} />
        </section>
        <section className="dashboard-card recent-card">
          <div className="card-heading"><div><span className="section-label">ÚLTIMAS CARGAS</span><h3>Lecturas recientes</h3></div><Icon name="history" /></div>
          {latestReadings.length ? <ol className="reading-list">{latestReadings.map((item) => <li key={item.id}><span className={item.variable === 'Humedad del suelo' ? 'reading-symbol moisture' : 'reading-symbol temperature'}><Icon name={item.variable === 'Humedad del suelo' ? 'drop' : 'thermometer'} /></span><span className="reading-info"><b>{item.variable}</b><small>{dateFormat.format(new Date(item.date))}</small></span><strong>{numberFormat.format(item.value)} {item.unit}</strong></li>)}</ol> : <p className="empty-inline">Todavía no hay lecturas en este período.</p>}
        </section>
      </div>

      <section className="dashboard-card follow-card">
        <div className="card-heading"><div><span className="section-label">BITÁCORA</span><h3>Últimos registros de seguimiento</h3></div><span className="subtle-count">{followUps.length} en {period} días</span></div>
        {latestNotes.length ? <div className="follow-grid">{latestNotes.map((item) => <article key={item.id}><time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time><p>{item.observation}</p></article>)}</div> : <p className="empty-inline">No hay observaciones cargadas para el período.</p>}
      </section>
      <p className="demo-footnote"><span className="sim-dot" /> Datos ficticios de interfaz · {gardens.length} huertas de ejemplo</p>
    </section>
  )
}
