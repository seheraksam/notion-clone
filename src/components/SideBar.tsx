// components/Sidebar.tsx
import { getAllPage } from '@/app/actions/page.action'
import NewPageButton from './NewPageButton'
import SidebarClient from './SideBarClient'
import styles from './Sidebar.module.css'
import Link from 'next/link'

export default async function Sidebar() {
  const pages = await getAllPage()

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logoWrapper}>
        <span className={styles.logo}>Pages</span>
      </Link>
      <NewPageButton />
      {pages ? (
        <SidebarClient pages={pages} />
      ) : (
        <div className="text-muted">Giriş yapmanız gerekiyor</div>
      )}
    </aside>
  )
}
