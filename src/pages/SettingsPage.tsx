import { useEffect } from 'react'
import { useSettingsStore } from '../store/settingsStore'
import { PageHeader } from '../components/layout/PageHeader'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'

export function SettingsPage() {
  const { business, loadSettings, updateSettings } = useSettingsStore()

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  if (!business) return null

  return (
    <div className="pb-8">
      <PageHeader title="Settings" subtitle="Business profile & preferences" />

      <div className="px-5 md:px-8 space-y-8">
        {/* Business Info */}
        <section className="bg-white rounded-xl border border-stone-200 p-5 md:p-6 space-y-4">
          <h3 className="font-mono text-[12px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Business Information
          </h3>
          <Input
            label="Business Name"
            value={business.name}
            onChange={(e) => updateSettings({ name: e.target.value })}
          />
          <Input
            label="ABN"
            value={business.abn ?? ''}
            onChange={(e) => updateSettings({ abn: e.target.value })}
            placeholder="XX XXX XXX XXX"
            mono
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone"
              value={business.phone ?? ''}
              onChange={(e) => updateSettings({ phone: e.target.value })}
              type="tel"
              placeholder="04XX XXX XXX"
            />
            <Input
              label="Email"
              value={business.email ?? ''}
              onChange={(e) => updateSettings({ email: e.target.value })}
              type="email"
              placeholder="you@business.com.au"
            />
          </div>
          <Input
            label="Address"
            value={business.address ?? ''}
            onChange={(e) => updateSettings({ address: e.target.value })}
            placeholder="Business address"
          />
        </section>

        {/* Quote Settings */}
        <section className="bg-white rounded-xl border border-stone-200 p-5 md:p-6 space-y-4">
          <h3 className="font-mono text-[12px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Quote Defaults
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Quote Prefix"
              value={business.quotePrefix}
              onChange={(e) => updateSettings({ quotePrefix: e.target.value })}
              mono
            />
            <Input
              label="Next Number"
              type="number"
              value={String(business.nextQuoteNumber)}
              onChange={(e) =>
                updateSettings({ nextQuoteNumber: parseInt(e.target.value) || 1 })
              }
              mono
            />
          </div>
          <Select
            label="Currency"
            value={business.currency}
            onChange={(e) => updateSettings({ currency: e.target.value as 'AUD' | 'NZD' | 'USD' })}
            options={[
              { value: 'AUD', label: 'AUD - Australian Dollar' },
              { value: 'NZD', label: 'NZD - New Zealand Dollar' },
              { value: 'USD', label: 'USD - US Dollar' },
            ]}
          />
          <div className="flex items-center justify-between py-3 border-t border-stone-100 mt-2">
            <div>
              <p className="text-[14px] font-medium text-stone-900">GST Included by Default</p>
              <p className="text-[12px] text-stone-500 mt-0.5">Apply 10% GST to new quotes automatically</p>
            </div>
            <button
              onClick={() => updateSettings({ gstDefault: !business.gstDefault })}
              className={`w-11 h-6 rounded-full transition-colors duration-150 relative shrink-0 ${
                business.gstDefault ? 'bg-success' : 'bg-stone-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${
                  business.gstDefault ? 'translate-x-5.5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Default Terms */}
        <section className="bg-white rounded-xl border border-stone-200 p-5 md:p-6 space-y-4">
          <h3 className="font-mono text-[12px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Default Terms & Conditions
          </h3>
          <p className="text-[12px] text-stone-400 -mt-1">
            These will be appended to every quote automatically
          </p>
          <textarea
            value={business.defaultTerms ?? ''}
            onChange={(e) => updateSettings({ defaultTerms: e.target.value })}
            placeholder="Enter your standard terms and conditions..."
            rows={8}
            className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 rounded-lg text-[14px] text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y transition-all duration-100"
          />
        </section>
      </div>
    </div>
  )
}
