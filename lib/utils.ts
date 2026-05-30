export function cn(...classes: (string | undefined | null | false | 0)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}
