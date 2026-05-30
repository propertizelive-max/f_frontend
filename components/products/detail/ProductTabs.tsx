'use client'

import { cn } from '@/lib/utils'
import type { ProductDetail } from '@/types/product'

type TabKey = 'specs' | 'overview' | 'care' | 'warranty'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'specs', label: 'Specifications' },
  { key: 'overview', label: 'Product Overview' },
  { key: 'care', label: 'Care Instructions' },
  { key: 'warranty', label: 'Warranty' },
]

type ProductTabsProps = {
  product: ProductDetail
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

export default function ProductTabs({ product, activeTab, onTabChange }: ProductTabsProps) {
  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-border flex gap-6 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'pb-3 text-[11px] uppercase tracking-[0.15em] shrink-0 transition-colors duration-150',
              activeTab === tab.key
                ? 'border-b-2 border-charcoal text-charcoal font-medium -mb-px'
                : 'text-muted hover:text-charcoal',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-8">
        {activeTab === 'specs' && (
          <SpecificationsTab specs={product.specifications} />
        )}
        {activeTab === 'overview' && (
          <OverviewTab text={product.overview} />
        )}
        {activeTab === 'care' && (
          <CareTab instructions={product.careInstructions} />
        )}
        {activeTab === 'warranty' && (
          <WarrantyTab warranty={product.warranty} />
        )}
      </div>
    </div>
  )
}

function SpecificationsTab({ specs }: { specs: ProductDetail['specifications'] }) {
  const rows: [string, string][] = [
    ['Material', specs.material],
    ['Finish', specs.finish],
    ['Weight', specs.weight],
    ['Width', specs.width],
    ['Height', specs.height],
    ['Length / Depth', specs.length],
  ]

  if (Object.values(specs).every((v) => !v)) {
    return <p className="text-sm text-muted">No specifications available.</p>
  }

  return (
    <table className="w-full max-w-lg text-sm">
      <tbody>
        {rows.map(([attr, val]) => (
          <tr key={attr} className="border-b border-border last:border-0">
            <td className="py-3 pr-8 text-muted text-[11px] uppercase tracking-[0.12em] w-40 shrink-0">
              {attr}
            </td>
            <td className="py-3 text-charcoal">{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function OverviewTab({ text }: { text: string }) {
  return (
    <p className="text-sm text-charcoal leading-relaxed max-w-2xl">{text}</p>
  )
}

function CareTab({ instructions }: { instructions: string[] }) {
  if (instructions.length === 0) {
    return <p className="text-sm text-muted">No care instructions available.</p>
  }
  return (
    <ul className="space-y-2 max-w-2xl">
      {instructions.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-charcoal leading-relaxed">
          <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function WarrantyTab({ warranty }: { warranty: ProductDetail['warranty'] }) {
  return (
    <div className="space-y-6 max-w-lg text-sm text-charcoal">
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted">Warranty Period</p>
        <p className="font-medium">{warranty.period}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted">Coverage</p>
        <p>{warranty.coverage}</p>
      </div>
      {warranty.exclusions.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted">Exclusions</p>
          <ul className="space-y-1">
            {warranty.exclusions.map((ex, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-muted mt-2 shrink-0" />
                {ex}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
