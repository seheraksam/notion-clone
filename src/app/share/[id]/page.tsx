import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SharedPage({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({
    where: { id: params.id },
  });

  if (!page || !page.isPublic) return notFound();

  return (
    <div className="container py-4">
      <h1 className="mb-3">{page.title || "Başlıksız Sayfa"}</h1>
      <div className="border p-3 bg-light rounded">
        <pre style={{ whiteSpace: 'pre-wrap' }}>{page.content}</pre>
      </div>
    </div>
  );
}
