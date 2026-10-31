import type { Note } from '../types/Note'

const NOTES_URL = 'http://localhost:7070/notes'

async function ensureOk(response: Response) {
  if (!response.ok) {
    throw new Error(`Notes request failed with status ${response.status}`)
  }
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetch(NOTES_URL)
  await ensureOk(response)
  return (await response.json()) as Note[]
}

export async function createNote(content: string): Promise<void> {
  const response = await fetch(NOTES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 0, content }),
  })
  await ensureOk(response)
}

export async function deleteNote(id: number): Promise<void> {
  const response = await fetch(`${NOTES_URL}/${id}`, { method: 'DELETE' })
  await ensureOk(response)
}
