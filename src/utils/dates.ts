export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function daysAgo(date: Date): number {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  return Math.floor(diff / 86400000)
}

export function daysUntilExpiry(sentAt: Date, validForDays: number): number {
  const expiryDate = new Date(sentAt)
  expiryDate.setDate(expiryDate.getDate() + validForDays)
  const now = new Date()
  return Math.ceil((expiryDate.getTime() - now.getTime()) / 86400000)
}
