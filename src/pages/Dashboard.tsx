import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Zap } from 'lucide-react'
import { useQuoteStore } from '../store/quoteStore'
import { useClientStore } from '../store/clientStore'
import { StatsStrip } from '../components/dashboard/StatsStrip'
import { QuoteRow } from '../components/dashboard/QuoteRow'

export function Dashboard() {
  const navigate = useNavigate()
  const { quotes, loadQuotes } = useQuoteStore()
  const { clients, loadClients } = useClientStore()

  useEffect(() => {
    loadQuotes()
    loadClients()
  }, [loadQuotes, loadClients])

  const activeQuotes = quotes.filter((q) => q.status === 'sent')
  const recentQuotes = quotes.slice(0, 15)

  const handleNewQuote = async () => {
    const quote = await useQuoteStore.getState().createQuote()
    navigate(`/quotes/${quote.id}`)
  }

  const getClientName = (clientId?: string) => {
    if (!clientId) return undefined
    return clients.find((c) => c.id === clientId)?.name
  }

  return (
    <div className="pb-8">
      {/* Mobile header */}
      <div className="px-5 pt-8 pb-2 md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
            <span className="font-mono text-sm font-bold text-white">Q</span>
          </div>
          <div>
            <h1 className="font-mono text-[15px] font-medium text-stone-900 tracking-tight leading-none">
              QuoteCraft
            </h1>
            <p className="text-[10px] text-stone-500 font-mono uppercase tracking-[0.15em] mt-0.5">
              Trade Quotes
            </p>
          </div>
        </div>
      </div>

      {/* New Quote CTA */}
      <div className="px-5 py-4 md:px-8 md:pt-10 md:py-5">
        <button
          onClick={handleNewQuote}
          className="group w-full relative overflow-hidden flex items-center justify-center gap-2.5 bg-stone-900 text-white font-mono font-medium text-[15px] tracking-tight py-4 rounded-xl hover:bg-stone-800 active:bg-stone-700 transition-all duration-100 shadow-lg shadow-stone-900/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Plus size={18} strokeWidth={2.5} className="relative" />
          <span className="relative">NEW QUOTE</span>
          <Zap size={13} className="relative text-accent ml-1" strokeWidth={2.5} fill="currentColor" />
        </button>
      </div>

      {/* Stats */}
      <StatsStrip quotes={quotes} />

      {/* Active Quotes */}
      {activeQuotes.length > 0 && (
        <div className="mt-8">
          <div className="px-5 md:px-8 mb-1">
            <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
              Awaiting Response
            </h3>
          </div>
          <div className="mt-2 divide-y divide-stone-200/60">
            {activeQuotes.map((quote) => (
              <QuoteRow
                key={quote.id}
                quote={quote}
                clientName={getClientName(quote.clientId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Quotes */}
      <div className="mt-8">
        <div className="flex items-end justify-between px-5 md:px-8 mb-1">
          <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Recent Quotes
          </h3>
          <span className="text-[11px] text-stone-400 font-mono">{quotes.length} total</span>
        </div>

        <div className="mt-2 divide-y divide-stone-200/60">
          {recentQuotes.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="w-12 h-12 bg-stone-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Plus size={20} className="text-stone-400" />
              </div>
              <p className="text-[14px] text-stone-600 font-medium">No quotes yet</p>
              <p className="text-[12px] text-stone-400 mt-1">
                Create your first quote to get started
              </p>
            </div>
          ) : (
            recentQuotes.map((quote) => (
              <QuoteRow
                key={quote.id}
                quote={quote}
                clientName={getClientName(quote.clientId)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
