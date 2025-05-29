'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarClient({
  pages,
}: {
  pages: { id: string; title: string }[]
}) {
  const pathname = usePathname()

  return (
    <div className="d-flex flex-column gap-2 mt-3">
   

      {pages.map((page) => {
        const isActive = pathname === `/pages/${page.id}`
        return (
          <Link
            key={page.id}
            href={`/pages/${page.id}`}
            className={`text-decoration-none p-2 rounded ${
              isActive ? 'bg-primary text-white' : 'text-body'
            }`}
          >
            {page.title || 'Untitled'}
          </Link>
        )
      })}
    </div>
  )
}
