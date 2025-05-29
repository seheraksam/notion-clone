'use client'

import { createPage } from '@/app/actions/page.action'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/nextjs'

export default function NewPageButton() {
  const router = useRouter()
  const { isSignedIn } = useUser()

  const handleClick = async () => {
    if (!isSignedIn) {
      toast.error("You must sign in!")
      return
    }

    const page = await createPage("Yeni Sayfa", "")
    if (page instanceof Error) {
      console.error("Sayfa oluşturulurken hata oluştu:", page)
      return
    }

    router.push(`/pages/${page.id}`)
  }

  return (
    <button className="btn btn-outline-primary w-100" onClick={handleClick}>
      + New Page
    </button>
  )
}
