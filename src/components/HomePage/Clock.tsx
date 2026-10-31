import { useEffect, useState, type CSSProperties } from 'react'
import './Clock.css'

type ClockProps = {
  title: string
  offset: number
  onRemove: () => void
}

function Clock({ title, offset, onRemove }: ClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Сдвигаем местное время на заданное количество часов.
  const shiftedTime = new Date(time.getTime() + offset * 60 * 60 * 1000)
  const seconds = shiftedTime.getSeconds()
  const minutes = shiftedTime.getMinutes()
  const hours = shiftedTime.getHours() % 12

  const clockStyle = {
    '--hour-angle': `${hours * 30 + minutes / 2}deg`,
    '--minute-angle': `${minutes * 6}deg`,
    '--second-angle': `${seconds * 6}deg`,
  } as CSSProperties

  return (
    <div className="clock-item">
      <button
        className="clock-item__remove"
        type="button"
        aria-label={`Удалить часы «${title}»`}
        onClick={onRemove}
      >
        ×
      </button>
      <p className="clock-item__title">{title}</p>
      <div className="clock" style={clockStyle} aria-label={`Часы: ${title}`}>
        <span className="clock__hand clock__hand--hour" />
        <span className="clock__hand clock__hand--minute" />
        <span className="clock__hand clock__hand--second" />
        <span className="clock__pin" />
      </div>
    </div>
  )
}

export default Clock
