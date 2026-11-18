import { useState, type FormEvent } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'

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

  return <form className="habit-form" onSubmit={handleSubmit}>
    <label htmlFor="habit-name" className="mb-3 block text-xs font-medium text-zinc-400">Yeni bir alışkanlık ekle</label>
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
      <div className="relative flex min-w-0 flex-1 items-center">
      <Icon name="plus" className="pointer-events-none absolute left-3 text-zinc-500" width="18" height="18" />
      <input id="habit-name" name="habit" value={name} maxLength={80} required
        onChange={event => { setName(event.target.value); setError(null) }}
        aria-invalid={Boolean(error)} aria-describedby={error ? 'habit-error' : undefined}
        className="habit-input min-w-0 w-full rounded-xl py-3 pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        placeholder="Örn. 20 dakika kitap oku" />
      </div>
      <Button type="submit" disabled={!name.trim()} className="px-5 py-3"><Icon name="plus" width="16" height="16" /> Ekle</Button>
    </div>
    {error && <p id="habit-error" role="alert" className="mt-2 text-sm text-red-300">{error}</p>}
  </form>
}
