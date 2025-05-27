import { getAllPage } from '@/app/actions/page.action'
import Link from 'next/link'

export default async function Sidebar() {
  const pages = await getAllPage()

  return (
    <aside className="p-3 border-end min-vh-100 bg-body">
      <h5 className="mb-3">Sayfalarım</h5>
      <div className="d-flex flex-column gap-2">
        {pages.map((page: { id: string; title: string }) => (
          <Link
            key={page.id}
            href={`/pages/${page.id}`}
            className="text-decoration-none text-body"
          >
            {page.title || 'Untitled'}
          </Link>
        ))}
      </div>
    </aside>
  )
}
