import { useMemo, useState } from 'react'
import Icon from '../Icon'
import MeasurementChart from '../MeasurementChart'
import type { FollowUp, Garden, Measurement } from '../../types'
import type { PeriodDays } from '../../pages/DemoPage'

const dateFormat = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' })
const numberFormat = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })
type GardenFilter = 'Todas' | Garden['type']
const normalizeSearch = (text: string) => text.toLocaleLowerCase('es-AR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export default function GardensView({ gardens, garden, measurements, followUps, period, selectedId, onSelect }: {
  gardens: Garden[]
  garden?: Garden
  measurements: Measurement[]
  followUps: FollowUp[]
  period: PeriodDays
  selectedId: string
  onSelect: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<GardenFilter>('Todas')
  const filteredGardens = useMemo(() => gardens.filter((item) => {
    const matchesType = filter === 'Todas' || item.type === filter
    const matchesQuery = normalizeSearch(`${item.name} ${item.locality} ${item.crops.join(' ')}`).includes(normalizeSearch(query.trim()))
    return matchesType && matchesQuery
  }), [gardens, filter, query])
  const gardenReadings = measurements.filter((item) => item.gardenId === garden?.id)
  const recentReadings = [...gardenReadings].sort((a, b) => b.date.localeCompare(a.date))
  const moisture = gardenReadings.filter((item) => item.variable === 'Humedad del suelo').sort((a, b) => a.date.localeCompare(b.date))

  return (
    <section className="view-content gardens-view">
      <div className="directory-toolbar">
        <label className="search-field"><Icon name="search" /><span className="sr-only">Buscar huertas</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, localidad o cultivo" /></label>
        <label className="filter-select"><span>Tipo de huerta</span><select value={filter} onChange={(event) => setFilter(event.target.value as GardenFilter)}><option>Todas</option><option>De estudio</option><option>Comunitaria</option><option>Familiar</option></select></label>
      </div>
      <div className="garden-directory-layout">
        <div className="garden-results">
          <div className="results-caption"><span>{filteredGardens.length} {filteredGardens.length === 1 ? 'huerta' : 'huertas'}</span><small>Escenarios ilustrativos</small></div>
          {filteredGardens.length ? filteredGardens.map((item) => <button type="button" className={item.id === selectedId ? 'garden-result active' : 'garden-result'} key={item.id} aria-pressed={item.id === selectedId} onClick={() => onSelect(item.id)}><span className="garden-result-icon"><Icon name="garden" /></span><span className="garden-result-info"><small>{item.type}</small><strong>{item.name}</strong><span>{item.locality}</span><em>{item.crops.join(' · ')}</em></span><Icon name="arrow" /></button>) : <div className="empty-state"><span><Icon name="search" /></span><h3>No encontramos huertas</h3><p>Probá con otro nombre o cambiá el filtro por tipo.</p><button type="button" className="button-text" onClick={() => { setQuery(''); setFilter('Todas') }}>Limpiar búsqueda</button></div>}
        </div>
        {garden ? <div className="garden-inspector">
          <section className="dashboard-card garden-profile"><div className="profile-top"><span className="profile-icon"><Icon name="garden" /></span><span className="garden-type-badge">{garden.type}</span></div><span className="section-label">FICHA DE EJEMPLO</span><h2>{garden.name}</h2><p>{garden.locality}</p><div className="crop-tags">{garden.crops.map((crop) => <span key={crop}>{crop}</span>)}</div></section>
          <section className="dashboard-card chart-card compact-chart"><div className="card-heading"><div><span className="section-label">HUMEDAD DEL SUELO · {period} DÍAS</span><h3>Registros disponibles</h3></div></div><MeasurementChart title={`Humedad del suelo en ${garden.name} durante ${period} días`} unit="%" series={[{ label: garden.name, color: '#609a2a', measurements: moisture }]} /></section>
          <section className="dashboard-card table-card"><div className="card-heading"><div><span className="section-label">HISTORIAL</span><h3>Mediciones y notas</h3></div><span className="subtle-count">{gardenReadings.length} lecturas</span></div>
            {recentReadings.length ? <div className="reading-table-wrap"><table className="reading-table"><thead><tr><th>Fecha</th><th>Variable</th><th>Valor</th></tr></thead><tbody>{recentReadings.map((item) => <tr key={item.id}><td data-label="Fecha"><time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time></td><td data-label="Variable">{item.variable}</td><td data-label="Valor">{numberFormat.format(item.value)} {item.unit}</td></tr>)}</tbody></table></div> : <p className="empty-inline">Sin mediciones en el período de consulta.</p>}
            <div className="inspector-notes"><h4>Seguimiento · {followUps.length} notas</h4>{followUps.length ? [...followUps].sort((a, b) => b.date.localeCompare(a.date)).map((item) => <p key={item.id}><time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time>{item.observation}</p>) : <p>No hay notas para el período elegido.</p>}</div>
          </section>
        </div> : <div className="empty-state"><h3>Seleccioná una huerta</h3><p>Elegí un escenario de ejemplo de la lista.</p></div>}
      </div>
    </section>
  )
}
