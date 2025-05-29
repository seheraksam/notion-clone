'use client'

import { toast } from 'react-hot-toast'

export default function CopyShareLinkButton({ pageId }: { pageId: string }) {
  const handleCopy = async () => {
    const url = `${window.location.origin}/share/${pageId}`
    await navigator.clipboard.writeText(url)
    toast.success('Link panoya kopyalandı!')
  }

  return (
    <button
      onClick={handleCopy}
      className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
      title="Linki kopyala"
    >
      Copy
    </button>
  )
}
