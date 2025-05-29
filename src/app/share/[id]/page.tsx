// src/app/public/[id]/page.tsx
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function PublicPage({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({
    where: { id: params.id },
  })

  if (!page || !page.isPublic) return notFound()

  return (
    <div className="container py-5">
      <h1 className="mb-3">{page.title || 'Untitled'}</h1>
      <div
        className="p-3 bg-body border rounded"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  )
}
