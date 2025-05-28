'use client'

import { createPage } from '@/app/actions/page.action'
import { useRouter } from 'next/navigation'

export default function NewPageButton() {
  const router = useRouter()

  const handleClick = async () => {
    const page = await createPage("Yeni Sayfa", "")
    router.push(`/pages/${page.id}`)
  }

  return (
    <button className="btn btn-outline-primary w-100" onClick={handleClick}>
      + New Page
    </button>
  )
}
