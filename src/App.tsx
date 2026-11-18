import { useEffect, useState } from 'react'
import { addWeeks, format, startOfWeek } from 'date-fns'
import { Header } from './components/Header'
import { HabitForm } from './components/HabitForm'
import { HabitList } from './components/HabitList'
import { Button } from './components/Button'
import { parseHabits, toggleCompletion, type Habit } from './habits'

const STORAGE_KEY = 'habit-tracker:v1'

function loadHabits() {
  try {
    return { habits: parseHabits(localStorage.getItem(STORAGE_KEY)), error: '' }
  } catch {
    return { habits: [] as Habit[], error: 'Kayıtlı veriler okunamadı. Mevcut kaydı korumak için otomatik kayıt durduruldu.' }
  }
}

export default function App() {
  const [initial] = useState(loadHabits)
  const [habits, setHabits] = useState(initial.habits)
  const [storageBlocked, setStorageBlocked] = useState(Boolean(initial.error))
  const [storageError, setStorageError] = useState(initial.error)
  const [today, setToday] = useState(() => format(new Date(), 'yyyy-MM-dd'))
  const [weekOffset, setWeekOffset] = useState(0)
  const [deletedHabit, setDeletedHabit] = useState<Habit | null>(null)
  const currentWeek = startOfWeek(new Date(today + 'T12:00:00'), { weekStartsOn: 1 })
  const weekStart = addWeeks(currentWeek, weekOffset)

  useEffect(() => {
    const updateDate = () => setToday(format(new Date(), 'yyyy-MM-dd'))
    const timer = window.setInterval(updateDate, 30_000)
    window.addEventListener('focus', updateDate)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', updateDate)
    }
  }, [])

  function persistHabits(next: Habit[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setStorageError('')
    } catch {
      setStorageError('Değişiklikler tarayıcıya kaydedilemedi. Sayfa kapanırsa son değişiklikler kaybolabilir.')
    }
  }

  function updateHabits(next: Habit[]) {
    setHabits(next)
    if (!storageBlocked) persistHabits(next)
  }

  function addHabit(name: string) {
    const cleaned = name.trim()
    if (!cleaned || cleaned.length > 80) return 'Alışkanlık adı 1–80 karakter olmalı.'
    if (habits.some(habit => habit.name.toLocaleLowerCase('tr') === cleaned.toLocaleLowerCase('tr'))) {
      return 'Bu alışkanlık zaten listede.'
    }
    updateHabits([...habits, { id: crypto.randomUUID(), name: cleaned, completedDates: [] }])
    if (deletedHabit?.name.toLocaleLowerCase('tr') === cleaned.toLocaleLowerCase('tr')) setDeletedHabit(null)
    return null
  }

  function deleteHabit(id: string) {
    setDeletedHabit(habits.find(habit => habit.id === id) ?? null)
    updateHabits(habits.filter(habit => habit.id !== id))
  }

  const doneToday = habits.filter(habit => habit.completedDates.includes(today)).length

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:py-12">
      <Header completed={doneToday} total={habits.length} weekStart={weekStart}
        isCurrentWeek={weekOffset === 0} onPrevious={() => setWeekOffset(value => value - 1)}
        onNext={() => setWeekOffset(value => Math.min(0, value + 1))} onToday={() => setWeekOffset(0)} />
      <HabitForm addHabit={addHabit} />
      {storageError && <div role="alert" className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
        <p>{storageError}</p>
        {storageBlocked && <Button variant="secondary" className="mt-2" onClick={() => {
          setStorageBlocked(false)
          persistHabits(habits)
        }}>Mevcut listeyi yeni kayıt olarak kaydet</Button>}
      </div>}
      {deletedHabit && <div role="status" className="flex items-center justify-between gap-3 rounded-lg bg-zinc-800 p-3 text-sm">
        <span className="min-w-0 break-words">“{deletedHabit.name}” silindi.</span>
        <Button variant="secondary" className="shrink-0" onClick={() => {
          updateHabits([...habits, deletedHabit])
          setDeletedHabit(null)
        }}>Geri al</Button>
      </div>}
      <HabitList habits={habits} weekStart={weekStart} today={today} onDelete={deleteHabit}
        onToggle={(id, date) => updateHabits(toggleCompletion(habits, id, date, today))} />
      <p className="text-center text-xs leading-5 text-zinc-400">Veriler bu tarayıcıda saklanır. Tamamladığın günleri işaretleyerek ilerlemeni takip et.</p>
    </main>
  )
}
