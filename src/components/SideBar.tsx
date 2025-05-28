import Link from 'next/link'
import { getAllPage } from '@/app/actions/page.action'
import NewPageButton from './NewPageButton';


export default async function Sidebar() {
  const pages = await getAllPage()

  return (
    <aside className="p-3 border-end min-vh-100 bg-body">
      <h5 className="mb-3">Sayfalarım</h5>
      <NewPageButton />
      <div className="d-flex flex-column gap-2 mt-3">
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
