'use server'

import { auth } from "@clerk/nextjs/server"

export async function createPage() {
  const session = await auth()
  const userId = session.userId
  if (!userId) throw new Error('Unauthorized')

  const page = await prisma.page.create({
    data: {
      userId,
      title: 'Untitled',
      content: '',
    },
  })

  return page
}
