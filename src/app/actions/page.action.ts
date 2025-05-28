'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export async function updatePage(id: string, data: { title?: string, content?: string }) {
  const userId = await getDbUserId()
  if (!userId) throw new Error("Unauthorized")

  const page = await prisma.page.updateMany({
    where: {
      id,
      userId,
    },
    data,
  })

  return page
}


// Clerk kullanıcısına karşılık gelen kendi DB'deki kullanıcı ID'sini getirir
export async function getDbUserId() {
  const { userId: clerkId } = await auth()
  if (!clerkId) return null

  // DB'de varsa al, yoksa oluştur
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId }, // sadece clerkId girmen yeterli
  })

  return user.id
}

// Not: Eğer sadece aramak istiyorsan bu fonksiyon hâlâ kullanılabilir
export async function getUserbyClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
  })
}

export async function updatePageVisibility(pageId: string, isPublic: boolean) {
  const userId = await getDbUserId()
  if (!userId) throw new Error('Unauthorized')

  await prisma.page.update({
    where: {
      id: pageId,
      userId: userId, // sadece sahibiyse değiştirebilsin
    },
    data: {
      isPublic,
    },
  })
}


// Sayfa oluşturma
export async function createPage(title: string, content: string) {
  const userId = await getDbUserId()
  if (!userId) throw new Error('Unauthorized')

  const page = await prisma.page.create({
    data: {
      userId,
      title,
      content,
      isPublic:false,
    },
  })

  return page
}

// Sayfaları getirme
export async function getAllPage() {
  const userId = await getDbUserId()
  if (!userId) throw new Error('Unauthorized')

  const pages = await prisma.page.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return pages
}
