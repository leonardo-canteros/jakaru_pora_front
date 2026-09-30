import { followUps, gardens, measurements } from '../data/demoData'
import type { FollowUp, Garden, Measurement } from '../types'

// Una futura API puede mantener estas firmas asíncronas.
export function getGardens(): Promise<Garden[]> {
  return Promise.resolve(gardens)
}

export function getGardenById(id: string): Promise<Garden | undefined> {
  return Promise.resolve(gardens.find((garden) => garden.id === id))
}

export function getMeasurementsForGarden(gardenId: string): Promise<Measurement[]> {
  return Promise.resolve(
    measurements.filter((item) => item.gardenId === gardenId)
      .sort((a, b) => b.date.localeCompare(a.date)),
  )
}

export function getFollowUpsForGarden(gardenId: string): Promise<FollowUp[]> {
  return Promise.resolve(
    followUps.filter((item) => item.gardenId === gardenId)
      .sort((a, b) => b.date.localeCompare(a.date)),
  )
}
