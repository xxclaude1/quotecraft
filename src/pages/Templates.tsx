import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'
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
    <div className="pb-8">
      <PageHeader
        title="Templates"
        subtitle="Reusable quote starting points"
      />

      <div className="px-5 md:px-8 space-y-3">
        {templates.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 bg-stone-200 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText size={20} className="text-stone-400" />
            </div>
            <p className="text-[14px] text-stone-600 font-medium">No templates yet</p>
            <p className="text-[12px] text-stone-400 mt-1">Templates will appear here once created</p>
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all duration-100"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-accent/8 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-medium text-stone-900">{template.name}</h4>
                  {template.description && (
                    <p className="text-[12px] text-stone-500 mt-0.5">{template.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-stone-400 font-mono">
                      {template.lineItems.length} items
                    </span>
                    <span className="text-[11px] text-stone-300">|</span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Base: {formatCurrency(templateTotal(template))}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCreateFromTemplate(template)}
                  className="shrink-0"
                >
                  Use Template
                  <ArrowRight size={13} className="ml-1" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
