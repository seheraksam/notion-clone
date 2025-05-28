// app/pages/[id]/page.tsx

import { notFound } from "next/navigation"
import  prisma  from "@/lib/prisma"
import { getDbUserId } from "@/app/actions/page.action"
import PageDetailClient from "./client"

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const userId = await getDbUserId()
  if (!userId) return notFound()

  const page = await prisma.page.findUnique({
    where: {
      id: params.id,
      userId: userId,
    },
  })

  if (!page) return notFound()

  return <PageDetailClient pageData={page} />
}
