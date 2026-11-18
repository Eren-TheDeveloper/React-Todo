import { useState, type FormEvent } from 'react'
import { Button } from './Button'

type HabitFormProps = { addHabit: (name: string) => string | null }

export function HabitForm({ addHabit }: HabitFormProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = addHabit(name)
    setError(message)
    if (!message) setName('')
  }

  return <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
    <label htmlFor="habit-name" className="text-sm font-medium text-zinc-300">Yeni bir alışkanlık ekle</label>
    <div className="flex flex-col gap-2 sm:flex-row">
      <input id="habit-name" name="habit" value={name} maxLength={80} required
        onChange={event => { setName(event.target.value); setError(null) }}
        aria-invalid={Boolean(error)} aria-describedby={error ? 'habit-error' : undefined}
        className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        placeholder="Örn. 20 dakika kitap oku" />
      <Button type="submit" disabled={!name.trim()} className="px-5 py-3">Ekle</Button>
    </div>
    {error && <p id="habit-error" role="alert" className="text-sm text-red-300">{error}</p>}
  </form>
}
