export type GardenType = 'De estudio' | 'Comunitaria' | 'Familiar'

export interface Garden {
  id: string
  name: string
  type: GardenType
  locality: string
  crops: string[]
}

export type MeasurementVariable = 'Humedad del suelo' | 'Temperatura ambiente'

export interface Measurement {
  id: string
  gardenId: string
  variable: MeasurementVariable
  value: number
  unit: string
  date: string
}

export interface FollowUp {
  id: string
  gardenId: string
  date: string
  observation: string
}
