'use client'

import { deletePage, updatePage, updatePageVisibility } from "@/app/actions/page.action"
import { useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"
import RichEditor from "@/components/RichEditor"
import CopyShareLinkButton from "@/components/CopySharedLinkButton"
import { Button, Toast } from "react-bootstrap"
import toast from 'react-hot-toast';
import { Grid, Trash } from "lucide-react"
import { revalidatePath } from "next/cache"


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
        try {
            if (confirm("Press a button!") === true) {
                startTransition(() => {
                    deletePage(pageData.id)
                })
                toast.success("notes Deleted succesfully")
            } else {
                toast.error("notes not deleted")
            }
        } catch (error) {
            toast.error("notes not deleted")
        }
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            updatePage(pageData.id, { title, content })
        }, 500)

        return () => clearTimeout(timeout)
    }, [title, content, pageData.id])

    return (
        <div className="p-4 flex gap-2">
            <div className="d-flex gap-2">
                <Button className="btn" variant="danger" size="sm" onClick={() => handleDelete()}>
                    <Trash />
                </Button>

                <Button onClick={handleToggle} className="btn">
                    <label className="form-label">{isPublic ? '🔓 public' : '🔒 private'}</label>
                </Button>
                {isPublic && (
                <CopyShareLinkButton pageId={pageData.id} />
            )}
            </div>
            <div className="py-3">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control mb-3 "
            />

            <RichEditor content={content} onChange={setContent} />
            </div>
        </div>
    )
}
