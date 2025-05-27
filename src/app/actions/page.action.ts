'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export async function createPage(content: string, title: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized')

  const page = await prisma.page.create({
    data: {
      userId,
      title: { title },
      content: { content },
    },
  })
  return page
}

export async function getAllPage() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized')
  const pages = await prisma.page.findMany({
    orderBy: {
      createdAt: "desc"
    },
  })
  return pages
}