import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'

export function Shell() {
  return (
    <div className="min-h-screen bg-stone-100 md:flex">
      <Nav />
      <main className="flex-1 pb-20 md:pb-0 md:ml-60">
        <div className="max-w-4xl mx-auto page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
