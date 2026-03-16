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
    <div>
      <PageHeader title="Settings" subtitle="Business profile & preferences" />

      <div className="px-4 md:px-8 space-y-6 pb-8">
        {/* Business Info */}
        <section>
          <h3 className="font-mono text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Business Info
          </h3>
          <div className="space-y-3">
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
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Phone"
                value={business.phone ?? ''}
                onChange={(e) => updateSettings({ phone: e.target.value })}
                type="tel"
              />
              <Input
                label="Email"
                value={business.email ?? ''}
                onChange={(e) => updateSettings({ email: e.target.value })}
                type="email"
              />
            </div>
            <Input
              label="Address"
              value={business.address ?? ''}
              onChange={(e) => updateSettings({ address: e.target.value })}
            />
          </div>
        </section>

        <div className="border-t border-[#DDD8D0]" />

        {/* Quote Settings */}
        <section>
          <h3 className="font-mono text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Quote Settings
          </h3>
          <div className="space-y-3">
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
                { value: 'AUD', label: 'AUD — Australian Dollar' },
                { value: 'NZD', label: 'NZD — New Zealand Dollar' },
                { value: 'USD', label: 'USD — US Dollar' },
              ]}
            />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-[#1A1A1A]">GST Included by Default</p>
                <p className="text-xs text-[#6B6560]">Apply 10% GST to new quotes</p>
              </div>
              <button
                onClick={() => updateSettings({ gstDefault: !business.gstDefault })}
                className={`w-10 h-5 rounded-full transition-colors duration-100 relative ${
                  business.gstDefault ? 'bg-[#2A7D6E]' : 'bg-[#DDD8D0]'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-100 ${
                    business.gstDefault ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <div className="border-t border-[#DDD8D0]" />

        {/* Default Terms */}
        <section>
          <h3 className="font-mono text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Default Terms & Conditions
          </h3>
          <textarea
            value={business.defaultTerms ?? ''}
            onChange={(e) => updateSettings({ defaultTerms: e.target.value })}
            placeholder="Enter your standard terms and conditions. These will be appended to every quote."
            rows={6}
            className="w-full px-3 py-2 bg-white border border-[#DDD8D0] rounded text-sm text-[#1A1A1A] placeholder:text-[#6B6560]/40 outline-none focus:border-[#1A1A1A] resize-y"
          />
        </section>
      </div>
    </div>
  )
}
