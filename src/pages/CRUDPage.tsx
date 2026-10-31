import { useCallback, useEffect, useState } from 'react'
import AddNote from '../components/CRUDPage/AddNote'
import NoteCard from '../components/CRUDPage/NoteCard'
import { createNote, deleteNote, getNotes } from '../api/notes'
import type { Note } from '../types/Note'
import './CRUDPage.css'

function CRUDPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingIds, setDeletingIds] = useState<number[]>([])
  const [error, setError] = useState('')

  const refreshNotes = useCallback(async () => {
    setIsLoading(true)

    try {
      const loadedNotes = await getNotes()
      setError('')
      setNotes(loadedNotes)
    } catch {
      setError('Не удалось загрузить заметки. Проверьте, запущен ли сервер.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isActive = true

    void getNotes()
      .then((loadedNotes) => {
        if (isActive) {
          setNotes(loadedNotes)
          setError('')
        }
      })
      .catch(() => {
        if (isActive) {
          setError('Не удалось загрузить заметки. Проверьте, запущен ли сервер.')
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  async function handleAdd(content: string) {
    setIsSaving(true)
    setError('')

    try {
      await createNote(content)
      await refreshNotes()
      return true
    } catch {
      setError('Не удалось добавить заметку. Попробуйте ещё раз.')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    setDeletingIds((currentIds) => [...currentIds, id])
    setError('')

    try {
      await deleteNote(id)
      await refreshNotes()
    } catch {
      setError('Не удалось удалить заметку. Попробуйте ещё раз.')
    } finally {
      setDeletingIds((currentIds) => currentIds.filter((currentId) => currentId !== id))
    }
  }

  return (
    <main className="crud-page">
      <div className="crud-page__heading">
        <h1>Заметки</h1>
        <button
          className="crud-page__refresh"
          type="button"
          aria-label="Обновить заметки"
          onClick={() => void refreshNotes()}
          disabled={isLoading}
        >
          <span aria-hidden="true">⟳</span>
        </button>
      </div>

      {error && <p className="crud-page__error" role="alert">{error}</p>}

      {isLoading ? (
        <p className="crud-page__message" role="status">Загрузка заметок…</p>
      ) : notes.length === 0 ? (
        <p className="crud-page__message">Пока нет заметок. Добавьте первую ниже.</p>
      ) : (
        <section className="note-list" aria-label="Список заметок">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={() => void handleDelete(note.id)}
              isDeleting={deletingIds.includes(note.id)}
            />
          ))}
        </section>
      )}

      <AddNote onAdd={handleAdd} isSaving={isSaving} />
    </main>
  )
}

export default CRUDPage
