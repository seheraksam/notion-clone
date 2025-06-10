'use client'

import { useEffect, useRef } from 'react'
import styles from './RichEditor.module.css'
import 'trix/dist/trix.css'

// Trix elementini TypeScript'e tanıt
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'trix-toolbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'trix-editor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        input: string;
      };
    }
  }
  interface Window {
    Trix: any;
  }
}

// Trix input elementini genişlet
interface TrixInputElement extends HTMLInputElement {
  editor: {
    loadHTML: (html: string) => void;
  };
}

export default function RichEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (value: string) => void
}) {
  const editorRef = useRef<TrixInputElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      const trixEditor = editorRef.current.editor
      if (trixEditor) {
        trixEditor.loadHTML(content)
      }
    }
  }, [content])

  useEffect(() => {
    const handleChange = (event: any) => {
      onChange(event.target.value)
    }

    const editor = editorRef.current
    if (editor) {
      editor.addEventListener('trix-change', handleChange)
    }

    return () => {
      if (editor) {
        editor.removeEventListener('trix-change', handleChange)
      }
    }
  }, [onChange])

  return (
    <div className={styles.editorWrapper}>
      <div className="form-control border rounded p-4">
        <input
          id="trix-editor"
          type="hidden"
          ref={editorRef}
        />
        <div
          role="textbox"
          contentEditable
          className={styles.trixEditor}
          data-trix-editor
          data-trix-input="trix-editor"
        />
      </div>
    </div>
  )
}