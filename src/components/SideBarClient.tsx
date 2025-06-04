'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

export default function SidebarClient({
  pages,
}: {
  pages: { id: string; title: string }[]
}) {
  const pathname = usePathname()

  return (
    <div className={`${styles.sidebar}`}>
      {pages.map((page) => {
        const isActive = pathname === `/pages/${page.id}`
        return (
          <Link
            key={page.id}
            href={`/pages/${page.id}`}
            className={`${styles.link} rounded ${isActive ? styles.active : ''}`}
          >
            {page.title || 'Untitled'}
          </Link>

        )
      })}
    </div>
  )
}
