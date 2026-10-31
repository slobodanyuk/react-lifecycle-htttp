import { useState } from 'react'
import AddClock from '../components/HomePage/AddClock'
import Clock from '../components/HomePage/Clock'

type ClockData = {
  id: number
  title: string
  offset: number
}

function HomePage() {
  const [clocks, setClocks] = useState<ClockData[]>([
    { id: 0, title: 'Местное время', offset: 0 },
  ])

  function addClock(title: string, offset: number) {
    setClocks((currentClocks) => [
      ...currentClocks,
      { id: Date.now(), title, offset },
    ])
  }

  return (
    <main className="home-page">
      <AddClock onAdd={addClock} />
      <div className="clock-list">
        {clocks.map((clock) => (
          <Clock
            key={clock.id}
            title={clock.title}
            offset={clock.offset}
            onRemove={() =>
              setClocks((currentClocks) =>
                currentClocks.filter((item) => item.id !== clock.id),
              )
            }
          />
        ))}
      </div>
    </main>
  )
}

export default HomePage
