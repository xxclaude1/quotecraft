import { create } from 'zustand'
import { db, getOrCreateBusiness } from '../db/database'
import type { Business } from '../types'

interface SettingsStore {
  business: Business | null
  loading: boolean

  loadSettings: () => Promise<void>
  updateSettings: (updates: Partial<Business>) => Promise<void>
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  business: null,
  loading: false,

  loadSettings: async () => {
    set({ loading: true })
    const business = await getOrCreateBusiness()
    set({ business, loading: false })
  },

  updateSettings: async (updates) => {
    await db.business.update('default', updates)
    set((state) => ({
      business: state.business ? { ...state.business, ...updates } : null,
    }))
  },
}))
