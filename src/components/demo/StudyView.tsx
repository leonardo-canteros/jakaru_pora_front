import { useMemo, useState } from 'react'
import Icon from '../Icon'
import MeasurementChart from '../MeasurementChart'
import type { Garden, Measurement, MeasurementVariable } from '../../types'
import type { PeriodDays } from '../../pages/DemoPage'

const numberFormat = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })
const dateFormat = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' })
function lastReading(items: Measurement[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date))[0]
}

export default function StudyView({ gardens, measurements, period }: { gardens: Garden[]; measurements: Measurement[]; period: PeriodDays }) {
  const studyGardens = gardens.filter((item) => item.type === 'De estudio')
  const [firstId, setFirstId] = useState(studyGardens[0]?.id ?? gardens[0]?.id ?? '')
  const [secondId, setSecondId] = useState(gardens.find((item) => item.id !== firstId)?.id ?? '')
  const [variable, setVariable] = useState<MeasurementVariable>('Humedad del suelo')
  const firstGarden = gardens.find((item) => item.id === firstId)
  const secondGarden = gardens.find((item) => item.id === secondId)
  const firstRecords = useMemo(() => measurements.filter((item) => item.gardenId === firstId && item.variable === variable), [measurements, firstId, variable])
  const secondRecords = useMemo(() => measurements.filter((item) => item.gardenId === secondId && item.variable === variable), [measurements, secondId, variable])
  const firstLatest = lastReading(firstRecords)
  const secondLatest = lastReading(secondRecords)
  const difference = firstLatest && secondLatest ? firstLatest.value - secondLatest.value : null
  const unit = firstRecords[0]?.unit ?? secondRecords[0]?.unit ?? (variable === 'Humedad del suelo' ? '%' : '°C')

  function changeFirst(id: string) {
    setFirstId(id)
    if (id === secondId) setSecondId(gardens.find((item) => item.id !== id)?.id ?? '')
  }
  function changeSecond(id: string) {
    setSecondId(id)
    if (id === firstId) setFirstId(gardens.find((item) => item.id !== id)?.id ?? '')
  }

  return (
    <section className="view-content study-view">
      <div className="study-intro"><div><span className="section-label">COMPARACIÓN ILUSTRATIVA</span><h2>Observar registros en contexto</h2><p>Elegí dos huertas y una variable para comparar mediciones del mismo período.</p></div><div className="study-disclaimer"><Icon name="study" /><p>Las diferencias describen estos datos de ejemplo. No señalan causas, condiciones ideales ni recomendaciones agronómicas.</p></div></div>
      <div className="dashboard-card comparison-controls">
        <label><span>Huerta A</span><select value={firstId} onChange={(event) => changeFirst(event.target.value)}>{gardens.map((garden) => <option key={garden.id} value={garden.id} disabled={garden.id === secondId}>{garden.name} · {garden.type}</option>)}</select></label>
        <span className="versus">VS</span>
        <label><span>Huerta B</span><select value={secondId} onChange={(event) => changeSecond(event.target.value)}>{gardens.map((garden) => <option key={garden.id} value={garden.id} disabled={garden.id === firstId}>{garden.name} · {garden.type}</option>)}</select></label>
        <label><span>Variable</span><select value={variable} onChange={(event) => setVariable(event.target.value as MeasurementVariable)}><option>Humedad del suelo</option><option>Temperatura ambiente</option></select></label>
      </div>
      <section className="dashboard-card study-chart-card"><div className="card-heading"><div><span className="section-label">EVOLUCIÓN · ÚLTIMOS {period} DÍAS</span><h3>{variable}</h3></div><span className="unit-label">Unidad: {unit}</span></div>
        <MeasurementChart title={`Comparación de ${variable} para ${firstGarden?.name ?? 'huerta A'} y ${secondGarden?.name ?? 'huerta B'}, últimos ${period} días`} unit={unit} series={[
          { label: firstGarden?.name ?? 'Huerta A', color: '#225e89', measurements: firstRecords },
          { label: secondGarden?.name ?? 'Huerta B', color: '#609a2a', measurements: secondRecords },
        ]} />
      </section>
      <div className="comparison-summary">
        {[{ garden: firstGarden, item: firstLatest, letter: 'A', color: 'blue' }, { garden: secondGarden, item: secondLatest, letter: 'B', color: 'green' }].map(({ garden, item, letter, color }) => <article className="dashboard-card compare-value" key={letter}><span className={`compare-key ${color}`}>{letter}</span><div><small>{garden?.name ?? 'Huerta'}</small><strong>{item ? `${numberFormat.format(item.value)} ${item.unit}` : 'Sin datos'}</strong><span>{item ? `Último registro · ${dateFormat.format(new Date(item.date))}` : 'No hay lecturas en este período'}</span></div></article>)}
      </div>
      <div className="difference-note"><Icon name="history" /><p>{difference === null ? 'No hay datos suficientes para calcular una diferencia en el período seleccionado.' : <>Diferencia numérica entre los últimos registros mostrados: <strong>{numberFormat.format(Math.abs(difference))} {unit}</strong>. Es una comparación descriptiva de datos simulados y sirve como insumo para el trabajo de especialistas.</>}</p></div>
    </section>
  )
}
