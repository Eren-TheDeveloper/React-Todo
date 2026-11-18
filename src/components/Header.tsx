import { addDays, format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from './Button'

type HeaderProps = {
  completed: number
  total: number
  weekStart: Date
  isCurrentWeek: boolean
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function Header({ completed, total, weekStart, isCurrentWeek, onPrevious, onNext, onToday }: HeaderProps) {
  const end = addDays(weekStart, 6)
  return <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6">
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">Küçük adımlar, kalıcı değişim</p>
      <h1 className="text-3xl font-bold tracking-tight">Alışkanlık Takibi</h1>
      <p className="mt-2 text-sm text-zinc-400" role="status">Bugün {completed} / {total} alışkanlık tamamlandı</p>
      <progress className="mt-3 h-2 w-full overflow-hidden rounded-full" value={completed} max={total || 1} aria-label="Bugünkü ilerleme" />
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-zinc-300">{format(weekStart, 'd MMM yyyy', { locale: tr })} – {format(end, 'd MMM yyyy', { locale: tr })}</p>
      <nav className="flex gap-2" aria-label="Hafta seçimi">
        <Button variant="secondary" onClick={onPrevious} aria-label="Önceki hafta">←</Button>
        <Button variant="secondary" onClick={onToday} disabled={isCurrentWeek}>Bu hafta</Button>
        <Button variant="secondary" onClick={onNext} disabled={isCurrentWeek} aria-label="Sonraki hafta">→</Button>
      </nav>
    </div>
  </header>
}
