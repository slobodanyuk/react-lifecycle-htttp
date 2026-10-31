import type { Note } from '../../types/Note'
import './NoteCard.css'

type NoteCardProps = {
  note: Note
  onDelete: () => void
  isDeleting: boolean
}

function NoteCard({ note, onDelete, isDeleting }: NoteCardProps) {
  return (
    <article className="note-card">
      <p className="note-card__content">{note.content}</p>
      <button
        className="note-card__delete"
        type="button"
        aria-label="Удалить заметку"
        onClick={onDelete}
        disabled={isDeleting}
      >
        ×
      </button>
    </article>
  )
}

export default NoteCard
