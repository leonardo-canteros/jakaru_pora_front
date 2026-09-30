import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import DemoDialog, { type DialogMode } from '../components/DemoDialog'
import OverviewView from '../components/demo/OverviewView'
import GardensView from '../components/demo/GardensView'
import StudyView from '../components/demo/StudyView'
import { useDemo } from '../state/DemoContext'
import type { MeasurementVariable } from '../types'

export type DemoView = 'overview' | 'gardens' | 'study'
export type PeriodDays = 7 | 30

const viewInfo: Record<DemoView, { title: string; subtitle: string }> = {
  overview: { title: 'Resumen', subtitle: 'Una lectura general de la huerta seleccionada.' },
  gardens: { title: 'Huertas', subtitle: 'Buscá y consultá los espacios de ejemplo.' },
  study: { title: 'Estudio', subtitle: 'Compará registros del mismo período y variable.' },
}
const navItems: { id: DemoView; label: string; icon: 'overview' | 'garden' | 'study' }[] = [
  { id: 'overview', label: 'Resumen', icon: 'overview' },
  { id: 'gardens', label: 'Huertas', icon: 'garden' },
  { id: 'study', label: 'Estudio', icon: 'study' },
]
const shortDate = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', timeZone: 'America/Argentina/Buenos_Aires' })

export function periodRecords<T extends { date: string }>(records: T[], days: PeriodDays, anchor: number) {
  const anchorDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(anchor))
  const start = Date.parse(anchorDay + 'T00:00:00-03:00') - (days - 1) * 24 * 60 * 60 * 1000
  return records.filter((item) => {
    const time = Date.parse(item.date)
    return time >= start && time <= anchor
  })
}

export default function DemoPage() {
  const { gardens, measurements, followUps, storageWarning, addMeasurement, addFollowUp, resetDemo } = useDemo()
  const [view, setView] = useState<DemoView>('overview')
  const [selectedId, setSelectedId] = useState(gardens[0]?.id ?? '')
  const [period, setPeriod] = useState<PeriodDays>(7)
  const [variable, setVariable] = useState<MeasurementVariable>('Humedad del suelo')
  const [dialog, setDialog] = useState<DialogMode | null>(null)
  const [notice, setNotice] = useState('')
  const garden = gardens.find((item) => item.id === selectedId) ?? gardens[0]
  const anchor = useMemo(() => Math.max(Date.now(), ...measurements.map((item) => Date.parse(item.date)), ...followUps.map((item) => Date.parse(item.date))), [measurements, followUps])
  const visibleMeasurements = useMemo(() => periodRecords(measurements, period, anchor), [measurements, period, anchor])
  const selectedMeasurements = visibleMeasurements.filter((item) => item.gardenId === garden?.id)
  const selectedFollowUps = periodRecords(followUps, period, anchor).filter((item) => item.gardenId === garden?.id)
  const anchorDate = Number.isFinite(anchor) ? shortDate.format(new Date(anchor)) : 'Sin registros'

  function saveDialog(value: { variable?: MeasurementVariable; reading?: number; observation?: string }) {
    if (!garden) return
    if (dialog === 'measurement' && value.variable && value.reading !== undefined) {
      addMeasurement(garden.id, value.variable, value.reading)
      setNotice(`Lectura simulada de ${value.variable.toLowerCase()} guardada para ${garden.name}.`)
    }
    if (dialog === 'observation' && value.observation) {
      addFollowUp(garden.id, value.observation)
      setNotice(`Observación agregada al seguimiento de ${garden.name}.`)
    }
  }

  function restoreDemo() {
    if (!window.confirm('¿Restablecer la demo? Se eliminarán las lecturas y observaciones agregadas y volverán los datos iniciales.')) return
    resetDemo()
    setNotice('La demo volvió a sus datos iniciales.')
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <a className="dashboard-brand" href="#/">Agronautas<span>JAKARU PORÁ</span></a>
        <div className="sidebar-caption">ESPACIO DE DEMOSTRACIÓN</div>
        <nav className="dashboard-nav" aria-label="Secciones de la demo">
          {navItems.map((item) => <button key={item.id} type="button" className={view === item.id ? 'dashboard-nav-item active' : 'dashboard-nav-item'} aria-current={view === item.id ? 'page' : undefined} onClick={() => setView(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{view === item.id && <i />}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-sim"><span className="sim-dot" />Demostración con<br />datos simulados</div>
          <button type="button" className="reset-button" onClick={restoreDemo}><Icon name="reset" />Restablecer demo</button>
          <a href="#/" className="back-home">← Volver al inicio</a>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div><p className="dashboard-overline">AGRONAUTAS <span>/</span> JAKARU PORÁ</p><h1>{viewInfo[view].title}</h1><p className="dashboard-subtitle">{viewInfo[view].subtitle}</p></div>
          <div className="selected-garden-control"><label htmlFor="selected-garden">HUERTA ACTIVA</label><select id="selected-garden" value={garden?.id ?? ''} onChange={(event) => setSelectedId(event.target.value)}>{gardens.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select><span>{garden?.locality}</span></div>
        </header>

        {storageWarning && <div className="storage-warning" role="status"><span>{storageWarning}</span></div>}
        <div className="dashboard-toolbar">
          <div className="period-control" role="group" aria-label="Período de consulta">
            <span><Icon name="calendar" /> Período</span>
            {[7, 30].map((days) => <button type="button" key={days} className={period === days ? 'selected' : ''} aria-pressed={period === days} onClick={() => setPeriod(days as PeriodDays)}>{days} días</button>)}
            <small>Hasta {anchorDate}</small>
          </div>
          <div className="toolbar-actions"><button type="button" className="button-outline" onClick={() => setDialog('observation')}><Icon name="plus" /> Registrar observación</button><button type="button" className="button-primary button-small" onClick={() => setDialog('measurement')}><Icon name="plus" /> Añadir lectura de ejemplo</button></div>
        </div>

        {notice && <div className="action-notice" role="status" aria-live="polite"><span>{notice}</span><button type="button" aria-label="Cerrar confirmación" onClick={() => setNotice('')}>×</button></div>}
        <div className="mobile-sim-note"><span className="sim-dot" />Demostración con datos simulados</div>

        {garden && view === 'overview' && <OverviewView garden={garden} gardens={gardens} measurements={selectedMeasurements} followUps={selectedFollowUps} period={period} variable={variable} onVariable={setVariable} onDetails={() => setView('gardens')} />}
        {view === 'gardens' && <GardensView gardens={gardens} garden={garden} measurements={selectedMeasurements} followUps={selectedFollowUps} period={period} selectedId={garden?.id ?? ''} onSelect={setSelectedId} />}
        {view === 'study' && <StudyView gardens={gardens} measurements={visibleMeasurements} period={period} />}
      </main>
      {dialog && garden && <DemoDialog mode={dialog} garden={garden} onSave={saveDialog} onDismiss={() => setDialog(null)} />}
    </div>
  )
}
