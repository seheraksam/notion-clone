// components/Sidebar.tsx
import { getAllPage } from '@/app/actions/page.action'
import NewPageButton from './NewPageButton'
import SidebarClient from './SideBarClient'

export default async function Sidebar() {
  const pages = await getAllPage()

  return (
    <aside className="p-3 border-end min-vh-100 bg-body">
      <h5 className="mb-3">Pages</h5>
      <NewPageButton />
      {pages ? (
        <SidebarClient pages={pages} />
      ) : (
        <div className="text-muted">Giriş yapmanız gerekiyor</div>
      )}
    </aside>
  )
}
