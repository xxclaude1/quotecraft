import { create } from 'zustand'
import { db } from '../db/database'
import type { Client } from '../types'
import { v4 as uuid } from 'uuid'

interface ClientStore {
  clients: Client[]
  loading: boolean

  loadClients: () => Promise<void>
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => Promise<Client>
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>
  deleteClient: (id: string) => Promise<void>
  getClient: (id: string) => Client | undefined
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  loading: false,

  loadClients: async () => {
    set({ loading: true })
    const clients = await db.clients.orderBy('name').toArray()
    set({ clients, loading: false })
  },

  addClient: async (data) => {
    const client: Client = {
      ...data,
      id: uuid(),
      createdAt: new Date(),
    }
    await db.clients.add(client)
    set((state) => ({ clients: [...state.clients, client].sort((a, b) => a.name.localeCompare(b.name)) }))
    return client
  },

  updateClient: async (id, updates) => {
    await db.clients.update(id, updates)
    set((state) => ({
      clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }))
  },

  deleteClient: async (id) => {
    await db.clients.delete(id)
    set((state) => ({ clients: state.clients.filter((c) => c.id !== id) }))
  },

  getClient: (id) => get().clients.find((c) => c.id === id),
}))
