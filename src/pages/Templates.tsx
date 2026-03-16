import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FileText } from 'lucide-react'
import { db } from '../db/database'
import { useQuoteStore } from '../store/quoteStore'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import type { QuoteTemplate } from '../types'
import { formatCurrency } from '../utils/formatCurrency'

export function Templates() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<QuoteTemplate[]>([])

  useEffect(() => {
    db.quoteTemplates.orderBy('name').toArray().then(setTemplates)
  }, [])

  const handleCreateFromTemplate = async (template: QuoteTemplate) => {
    const quote = await useQuoteStore.getState().createQuote()
    const lineItems = template.lineItems.map((li, i) => ({
      ...li,
      id: crypto.randomUUID(),
      sortOrder: i,
    }))
    await useQuoteStore.getState().updateQuote(quote.id, {
      jobTitle: template.name,
      lineItems,
    })
    navigate(`/quotes/${quote.id}`)
  }

  const templateTotal = (template: QuoteTemplate) =>
    template.lineItems.reduce((sum, li) => sum + li.quantity * li.unitPrice, 0)

  return (
    <div>
      <PageHeader
        title="Templates"
        subtitle="Reusable quote templates"
      />

      <div className="border-t border-[#DDD8D0]">
        {templates.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-[#6B6560] text-sm">No templates yet</p>
            <p className="text-xs text-[#6B6560]/50 mt-1">
              Templates will appear here once created
            </p>
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center gap-3 px-4 md:px-8 py-3 border-b border-[#DDD8D0] hover:bg-[#EDE9E3] transition-colors duration-100"
            >
              <div className="w-9 h-9 rounded bg-[#EDE9E3] flex items-center justify-center shrink-0">
                <FileText size={16} className="text-[#6B6560]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">{template.name}</p>
                {template.description && (
                  <p className="text-xs text-[#6B6560] truncate">{template.description}</p>
                )}
                <p className="text-[10px] text-[#6B6560]/60 mt-0.5">
                  {template.lineItems.length} items · Base value{' '}
                  <span className="font-mono">{formatCurrency(templateTotal(template))}</span>
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => handleCreateFromTemplate(template)}
                className="shrink-0"
              >
                <Plus size={14} className="mr-1" /> Use
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
