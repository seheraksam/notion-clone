'use client'

import { updatePage, updatePageVisibility } from "@/app/actions/page.action"
import { useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"
import RichEditor from "@/components/RichEditor"


export default function PageDetailClient({ pageData }: {
    pageData: {
        isPublic: boolean; id: string; title: string; content: string
    }
}) {
    const { id } = useParams()
    const [isPending, startTransition] = useTransition()

    const [isPublic, setIsPublic] = useState(pageData.isPublic)
    const [title, setTitle] = useState(pageData.title)
    const [content, setContent] = useState(pageData.content)

    
    const handleToggle = () => {
        setIsPublic(prev => !prev)

        startTransition(() => {
            updatePageVisibility(pageData.id, !isPublic)
        })
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            updatePage(pageData.id, { title, content })
        }, 500)

        return () => clearTimeout(timeout)
    }, [title, content, pageData.id])

    return (
        <div className="p-4">
            {isPublic && (
                <div className="mt-3">
                    <label className="form-label">Paylaşılabilir Bağlantı:</label>
                    <input
                        className="form-control"
                        readOnly
                        value={`${process.env.NEXT_PUBLIC_SITE_URL}/share/${pageData.id}`}
                    />
                </div>
            )}

            <button
                onClick={handleToggle}
                className="btn btn-outline-primary mb-3"
                disabled={isPending}
            >
                {isPublic ? '🔓 public' : '🔒 private'}
            </button>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control mb-3"
            />
            <RichEditor content={content} onChange={setContent} />
        </div>
    )
}
