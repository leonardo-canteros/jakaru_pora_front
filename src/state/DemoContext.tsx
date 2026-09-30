import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { followUps as initialFollowUps, gardens, measurements as initialMeasurements } from '../data/demoData'
import type { FollowUp, Garden, Measurement, MeasurementVariable } from '../types'

const STORAGE_KEY = 'agronautas-demo-v1'
type DemoState = { measurements: Measurement[]; followUps: FollowUp[] }
type DemoContextValue = DemoState & {
  gardens: Garden[]
  storageWarning: string | null
  addMeasurement: (gardenId: string, variable: MeasurementVariable, value: number) => void
  addFollowUp: (gardenId: string, observation: string) => void
  resetDemo: () => void
}
const DemoContext = createContext<DemoContextValue | null>(null)

function initialState(): DemoState {
  return { measurements: [...initialMeasurements], followUps: [...initialFollowUps] }
}
function isMeasurement(value: unknown): value is Measurement {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<Measurement>
  return typeof item.id === 'string' &&
    gardens.some((garden) => garden.id === item.gardenId) &&
    (item.variable === 'Humedad del suelo' || item.variable === 'Temperatura ambiente') &&
    typeof item.value === 'number' && Number.isFinite(item.value) &&
    typeof item.unit === 'string' && typeof item.date === 'string' && Number.isFinite(Date.parse(item.date))
}
function isFollowUp(value: unknown): value is FollowUp {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<FollowUp>
  return typeof item.id === 'string' &&
    gardens.some((garden) => garden.id === item.gardenId) &&
    typeof item.observation === 'string' &&
    typeof item.date === 'string' && Number.isFinite(Date.parse(item.date))
}
function readSavedState(): { state: DemoState; warning: string | null } {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return { state: initialState(), warning: null }
    const parsed: unknown = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') throw new Error('Formato')
    const record = parsed as { measurements?: unknown; followUps?: unknown }
    if (!Array.isArray(record.measurements) || !record.measurements.every(isMeasurement) ||
        !Array.isArray(record.followUps) || !record.followUps.every(isFollowUp)) throw new Error('Datos')
    return {
      state: {
        measurements: record.measurements.map((item: Measurement) => initialMeasurements.find((sample) => sample.id === item.id) ?? item),
        followUps: record.followUps.map((item: FollowUp) => initialFollowUps.find((sample) => sample.id === item.id) ?? item),
      },
      warning: null,
    }
  } catch {
    return {
      state: initialState(),
      warning: 'No se pudieron leer los cambios guardados. La demo cargó sus datos iniciales; al guardar, se intentará reemplazar el contenido local inválido.',
    }
  }
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [loaded] = useState(readSavedState)
  const [measurements, setMeasurements] = useState(loaded.state.measurements)
  const [followUps, setFollowUps] = useState(loaded.state.followUps)
  const [storageWarning, setStorageWarning] = useState<string | null>(loaded.warning)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ measurements, followUps }))
    } catch {
      setStorageWarning('El navegador no permitió guardar los cambios. Podés continuar la demo, pero se perderán al cerrar o recargar esta página.')
    }
  }, [measurements, followUps])

  function addMeasurement(gardenId: string, variable: MeasurementVariable, value: number) {
    const unit = variable === 'Humedad del suelo' ? '%' : '°C'
    const item: Measurement = {
      id: `lectura-${Date.now()}-${measurements.length}`,
      gardenId, variable, value, unit, date: new Date().toISOString(),
    }
    setMeasurements((current) => [...current, item])
  }
  function addFollowUp(gardenId: string, observation: string) {
    const item: FollowUp = {
      id: `observacion-${Date.now()}-${followUps.length}`,
      gardenId, observation: observation.trim(), date: new Date().toISOString(),
    }
    setFollowUps((current) => [...current, item])
  }
  function resetDemo() {
    setMeasurements(initialState().measurements)
    setFollowUps(initialState().followUps)
    setStorageWarning(null)
  }

  const value = useMemo(() => ({
    gardens, measurements, followUps, storageWarning,
    addMeasurement, addFollowUp, resetDemo,
  }), [measurements, followUps, storageWarning])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) throw new Error('useDemo debe usarse dentro de DemoProvider')
  return context
}
