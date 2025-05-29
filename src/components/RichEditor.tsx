'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function RichEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor) editor.commands.setContent(content)
  }, [content])

  if (!editor) return null

  return (
    <div>
      <div className="mb-2 d-flex flex-wrap gap-2">
        <button className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </button>
        <button className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          Title
        </button>
      </div>

      <div className="border rounded p-3 bg-body">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}