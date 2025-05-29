'use client'

import { deletePage, updatePage, updatePageVisibility } from "@/app/actions/page.action"
import { useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"
import RichEditor from "@/components/RichEditor"
import CopyShareLinkButton from "@/components/CopySharedLinkButton"
import { Button } from "react-bootstrap"


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

    const handleDelete = () => {
        startTransition(() => {
            deletePage(pageData.id)
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
            <Button variant="danger" size="sm" onClick={() => handleDelete()}>
                <i className="bi bi-trash"></i>
            </Button>
            <div>
            </div>
            {isPublic && (
                <div className="mt-3">
                    <label className="form-label">{isPublic ? '🔓 public' : '🔒 private'}</label>
                    <CopyShareLinkButton pageId={pageData.id} />
                </div>
            )}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control mb-3"
            />

            <RichEditor content={content} onChange={setContent} />
        </div>
    )
}
