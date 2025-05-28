'use client'

import { updatePage, updatePageVisibility } from "@/app/actions/page.action"
import { useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"

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
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                rows={10}
            />
        </div>
    )
}
