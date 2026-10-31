import { useState, type FormEvent } from 'react'
import './AddNote.css'

type AddNoteProps = {
  onAdd: (content: string) => Promise<boolean>
  isSaving: boolean
}

function AddNote({ onAdd, isSaving }: AddNoteProps) {
  const [content, setContent] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedContent = content.trim()
    if (!trimmedContent || isSaving) return

    if (await onAdd(trimmedContent)) {
      setContent('')
    }
  }

  return (
    <form className="add-note" onSubmit={(event) => void handleSubmit(event)}>
      <label className="add-note__label" htmlFor="new-note-content">Новая заметка</label>
      <div className="add-note__field">
        <textarea
          id="new-note-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          aria-label="Текст новой заметки"
          disabled={isSaving}
        />
        <button
          className="add-note__submit"
          type="submit"
          aria-label="Добавить заметку"
          disabled={isSaving || !content.trim()}
        >
          <span aria-hidden="true">➤</span>
        </button>
      </div>
    </form>
  )
}

export default AddNote
