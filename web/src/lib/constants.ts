// ─── Application status display config ──────────────────────────────────────

export const APPLICATION_STATUS_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  Draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  Received: { label: 'Received', color: 'bg-blue-100 text-blue-800' },
  InReview: { label: 'In Review', color: 'bg-yellow-100 text-yellow-800' },
  NeedsDocs: { label: 'Documents Needed', color: 'bg-orange-100 text-orange-800' },
  Submitted: { label: 'Submitted to Lender', color: 'bg-purple-100 text-purple-800' },
  Closed: { label: 'Closed', color: 'bg-green-100 text-green-800' },
  Denied: { label: 'Denied', color: 'bg-red-100 text-red-800' },
}

// ─── Responsible party display labels ───────────────────────────────────────

export const RESPONSIBLE_PARTY_LABELS: Record<string, string> = {
  Borrower: 'You',
  Broker: 'Broker',
  TitleCompany: 'Title Company',
  Appraiser: 'Appraiser',
}

// ─── Gold button gradient classes ───────────────────────────────────────────

export const GOLD_BUTTON_CLASSES =
  'bg-gradient-to-br from-[#D4B85C] via-[#C9A84C] to-[#B89530] text-white hover:from-[#C9A84C] hover:via-[#B89530] hover:to-[#A8893D] transition-all'

export const GOLD_PILL_CLASSES =
  `${GOLD_BUTTON_CLASSES} px-8 py-3 rounded-full font-semibold text-sm tracking-widest uppercase`
