import { useState, type FormEvent } from 'react'
import './AddClock.css'

type AddClockProps = {
  onAdd: (title: string, offset: number) => void
}

function AddClock({ onAdd }: AddClockProps) {
  const [title, setTitle] = useState('')
  const [offset, setOffset] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (title.trim() === '' || offset === '') return

    onAdd(title.trim(), Number(offset))
    setTitle('')
    setOffset('')
  }

  return (
    <form className="add-clock" onSubmit={handleSubmit}>
      <label>
        Название
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        Смещение в часах
        <input
          type="number"
          step="any"
          required
          value={offset}
          onChange={(event) => setOffset(event.target.value)}
          placeholder="Например, 3 или -2"
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  )
}

export default AddClock
