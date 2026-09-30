import type { FollowUp, Garden, Measurement } from '../types'

// Nombres, cultivos, observaciones y valores ficticios para la presentación.
export const gardens: Garden[] = [
  { id: 'estudio-norte', name: 'Huerta de estudio Norte', type: 'De estudio', locality: 'Monte Caseros, Corrientes', crops: ['Lechuga', 'Acelga', 'Rúcula'] },
  { id: 'comunitaria-rio', name: 'Huerta comunitaria del Río', type: 'Comunitaria', locality: 'Juan Pujol, Corrientes', crops: ['Tomate', 'Albahaca', 'Perejil'] },
  { id: 'familiar-sur', name: 'Huerta familiar del Sur', type: 'Familiar', locality: 'Mocoretá, Corrientes', crops: ['Zanahoria', 'Cebolla', 'Espinaca'] },
]

// Mantener la secuencia ficticia cerca de la fecha en que se abre la demo.
function sampleDate(original: string) {
  const [todayYear, todayMonth, todayDay] = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).split('-').map(Number)
  const offsets: Record<string, number> = { '02': 27, '10': 12, '17': 5, '23': 3, '29': 1 }
  const day = original.slice(8, 10)
  const date = new Date(Date.UTC(todayYear, todayMonth - 1, todayDay - (offsets[day] ?? 1))).toISOString().slice(0, 10)
  return date + original.slice(10)
}
const sampleMeasurements: Measurement[] = [
  { id: 'e-h-1', gardenId: 'estudio-norte', variable: 'Humedad del suelo', value: 31.2, unit: '%', date: '2026-09-02T09:00:00-03:00' },
  { id: 'e-t-1', gardenId: 'estudio-norte', variable: 'Temperatura ambiente', value: 18.2, unit: '°C', date: '2026-09-02T09:00:00-03:00' },
  { id: 'e-h-2', gardenId: 'estudio-norte', variable: 'Humedad del suelo', value: 33.8, unit: '%', date: '2026-09-10T09:00:00-03:00' },
  { id: 'e-t-2', gardenId: 'estudio-norte', variable: 'Temperatura ambiente', value: 20.1, unit: '°C', date: '2026-09-10T09:00:00-03:00' },
  { id: 'e-h-3', gardenId: 'estudio-norte', variable: 'Humedad del suelo', value: 35.1, unit: '%', date: '2026-09-17T09:00:00-03:00' },
  { id: 'e-t-3', gardenId: 'estudio-norte', variable: 'Temperatura ambiente', value: 22.8, unit: '°C', date: '2026-09-17T09:00:00-03:00' },
  { id: 'e-h-4', gardenId: 'estudio-norte', variable: 'Humedad del suelo', value: 34.2, unit: '%', date: '2026-09-23T09:00:00-03:00' },
  { id: 'e-t-4', gardenId: 'estudio-norte', variable: 'Temperatura ambiente', value: 20.4, unit: '°C', date: '2026-09-23T09:00:00-03:00' },
  { id: 'e-h-5', gardenId: 'estudio-norte', variable: 'Humedad del suelo', value: 36.5, unit: '%', date: '2026-09-29T09:00:00-03:00' },
  { id: 'e-t-5', gardenId: 'estudio-norte', variable: 'Temperatura ambiente', value: 21.7, unit: '°C', date: '2026-09-29T09:00:00-03:00' },
  { id: 'c-h-1', gardenId: 'comunitaria-rio', variable: 'Humedad del suelo', value: 40.2, unit: '%', date: '2026-09-02T10:00:00-03:00' },
  { id: 'c-t-1', gardenId: 'comunitaria-rio', variable: 'Temperatura ambiente', value: 19.2, unit: '°C', date: '2026-09-02T10:00:00-03:00' },
  { id: 'c-h-2', gardenId: 'comunitaria-rio', variable: 'Humedad del suelo', value: 42.1, unit: '%', date: '2026-09-10T10:00:00-03:00' },
  { id: 'c-t-2', gardenId: 'comunitaria-rio', variable: 'Temperatura ambiente', value: 22, unit: '°C', date: '2026-09-10T10:00:00-03:00' },
  { id: 'c-h-3', gardenId: 'comunitaria-rio', variable: 'Humedad del suelo', value: 41.6, unit: '%', date: '2026-09-17T10:00:00-03:00' },
  { id: 'c-t-3', gardenId: 'comunitaria-rio', variable: 'Temperatura ambiente', value: 24.2, unit: '°C', date: '2026-09-17T10:00:00-03:00' },
  { id: 'c-h-4', gardenId: 'comunitaria-rio', variable: 'Humedad del suelo', value: 41.3, unit: '%', date: '2026-09-23T10:00:00-03:00' },
  { id: 'c-t-4', gardenId: 'comunitaria-rio', variable: 'Temperatura ambiente', value: 19.9, unit: '°C', date: '2026-09-23T10:00:00-03:00' },
  { id: 'c-h-5', gardenId: 'comunitaria-rio', variable: 'Humedad del suelo', value: 43.1, unit: '%', date: '2026-09-29T10:00:00-03:00' },
  { id: 'c-t-5', gardenId: 'comunitaria-rio', variable: 'Temperatura ambiente', value: 22.8, unit: '°C', date: '2026-09-29T10:00:00-03:00' },
  { id: 'f-h-1', gardenId: 'familiar-sur', variable: 'Humedad del suelo', value: 27.4, unit: '%', date: '2026-09-02T08:30:00-03:00' },
  { id: 'f-t-1', gardenId: 'familiar-sur', variable: 'Temperatura ambiente', value: 17.7, unit: '°C', date: '2026-09-02T08:30:00-03:00' },
  { id: 'f-h-2', gardenId: 'familiar-sur', variable: 'Humedad del suelo', value: 29.7, unit: '%', date: '2026-09-10T08:30:00-03:00' },
  { id: 'f-t-2', gardenId: 'familiar-sur', variable: 'Temperatura ambiente', value: 20.1, unit: '°C', date: '2026-09-10T08:30:00-03:00' },
  { id: 'f-h-3', gardenId: 'familiar-sur', variable: 'Humedad del suelo', value: 31.2, unit: '%', date: '2026-09-17T08:30:00-03:00' },
  { id: 'f-t-3', gardenId: 'familiar-sur', variable: 'Temperatura ambiente', value: 23.1, unit: '°C', date: '2026-09-17T08:30:00-03:00' },
  { id: 'f-h-4', gardenId: 'familiar-sur', variable: 'Humedad del suelo', value: 29.4, unit: '%', date: '2026-09-23T08:30:00-03:00' },
  { id: 'f-t-4', gardenId: 'familiar-sur', variable: 'Temperatura ambiente', value: 18.7, unit: '°C', date: '2026-09-23T08:30:00-03:00' },
  { id: 'f-h-5', gardenId: 'familiar-sur', variable: 'Humedad del suelo', value: 31.8, unit: '%', date: '2026-09-29T08:30:00-03:00' },
  { id: 'f-t-5', gardenId: 'familiar-sur', variable: 'Temperatura ambiente', value: 20.9, unit: '°C', date: '2026-09-29T08:30:00-03:00' },
]

export const measurements: Measurement[] = sampleMeasurements.map((item) => ({ ...item, date: sampleDate(item.date) }))

const sampleFollowUps: FollowUp[] = [
  { id: 'e-r-1', gardenId: 'estudio-norte', date: '2026-09-23T11:00:00-03:00', observation: 'Se registró el estado general de los cultivos de ejemplo.' },
  { id: 'e-r-2', gardenId: 'estudio-norte', date: '2026-09-29T11:00:00-03:00', observation: 'Se agregó una observación de seguimiento para comparar fechas.' },
  { id: 'c-r-1', gardenId: 'comunitaria-rio', date: '2026-09-23T12:00:00-03:00', observation: 'Se documentó una revisión de los canteros de ejemplo.' },
  { id: 'c-r-2', gardenId: 'comunitaria-rio', date: '2026-09-29T12:00:00-03:00', observation: 'Se anotó una observación posterior para el historial ficticio.' },
  { id: 'f-r-1', gardenId: 'familiar-sur', date: '2026-09-23T10:30:00-03:00', observation: 'Se cargó una nota inicial de la huerta ficticia.' },
  { id: 'f-r-2', gardenId: 'familiar-sur', date: '2026-09-29T10:30:00-03:00', observation: 'Se registró una segunda nota de ejemplo para mostrar la evolución.' },
]

export const followUps: FollowUp[] = sampleFollowUps.map((item) => ({ ...item, date: sampleDate(item.date) }))
