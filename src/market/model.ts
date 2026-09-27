import type { Catalog, Product, Vendor } from '../domain/catalog'
export type Category = 'all' | 'office' | 'print' | 'board'
export type Listing = Product & { vendor: Vendor; category: Category; key: string }
export type QuoteLine = { key: string; quantity: number }
export const normalize = (text: string) => text.toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200c\u200f]/g, ' ').trim()
export function categoryOf(name: string): Category {
  return /مقوا|کارتن|کرافت/.test(name) ? 'board' : /A4|A3|کپی|رنگی/i.test(name) ? 'office' : 'print'
}
export function listings(catalog: Catalog): Listing[] {
  return catalog.vendors.flatMap(vendor => vendor.products.map(product => ({ ...product, vendor, category: categoryOf(product.name), key: `${vendor.id}/${product.id}` })))
}
export function filterListings(items: Listing[], query: string, category: Category, vendor: string, sort: string) {
  const filtered = items.filter(p => (category === 'all' || p.category === category) && (!vendor || vendor === p.vendor.id) && normalize(`${p.name} ${p.vendor.name}`).includes(normalize(query)))
  return sort === 'name' ? filtered.sort((a,b) => a.name.localeCompare(b.name, 'fa')) : sort === 'price' ? filtered.sort((a,b) => (a.numericPrice ?? Infinity) - (b.numericPrice ?? Infinity)) : filtered
}
export function restoreQuote(value: unknown, items: Listing[]): QuoteLine[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  return value.filter((line): line is QuoteLine => {
    if (!line || typeof line.key !== 'string' || !items.some(p => p.key === line.key) || seen.has(line.key) || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 9999) return false
    seen.add(line.key); return true
  }).map(({key, quantity}) => ({key, quantity}))
}
export function quoteText(quote: QuoteLine[], items: Listing[], note: string) {
  return ['درخواست استعلام — بازار کاغذ', 'لطفاً قیمت نهایی، واحد فروش، موجودی و زمان تحویل را تأیید کنید.', ...quote.flatMap(line => {const p = items.find(p => p.key === line.key); return p ? [`${p.vendor.name} | ${p.name} | تعداد درخواستی: ${line.quantity} | واحد نیازمند تأیید: ${p.unit}`] : []}), note && `توضیحات: ${note}`, 'این پیش‌نویس ارسال نشده و سفارش قطعی نیست.'].filter(Boolean).join('\n')
}
