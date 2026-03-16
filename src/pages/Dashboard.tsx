import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useQuoteStore } from '../store/quoteStore'
import { useClientStore } from '../store/clientStore'
import { PageHeader } from '../components/layout/PageHeader'
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
    <div>
      {/* Mobile header */}
      <div className="px-4 pt-6 pb-2 md:hidden">
        <h1 className="font-mono text-lg font-bold text-[#1A1A1A] tracking-tight">
          QuoteCraft
        </h1>
      </div>

      {/* New Quote button — the most important action */}
      <div className="px-4 py-3 md:px-8 md:py-4">
        <button
          onClick={handleNewQuote}
          className="w-full flex items-center justify-center gap-2 bg-[#E8580C] text-white font-mono font-bold text-base py-4 rounded hover:bg-[#d04f0b] active:bg-[#b8450a] transition-colors duration-100"
        >
          <Plus size={20} strokeWidth={2.5} />
          NEW QUOTE
        </button>
      </div>

      <StatsStrip quotes={quotes} />

      {/* Active Quotes */}
      {activeQuotes.length > 0 && (
        <div className="mt-6">
          <div className="px-4 md:px-8 mb-2">
            <h3 className="text-xs font-light text-[#6B6560] uppercase tracking-wider">
              Active — Awaiting Response ({activeQuotes.length})
            </h3>
          </div>
          <div className="border-t border-[#DDD8D0]">
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
      <div className="mt-6">
        <PageHeader
          title="Recent Quotes"
          subtitle={`${quotes.length} total`}
        />
        <div className="border-t border-[#DDD8D0]">
          {recentQuotes.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-[#6B6560] text-sm">No quotes yet</p>
              <p className="text-[#6B6560]/60 text-xs mt-1">
                Tap "New Quote" to create your first one
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
