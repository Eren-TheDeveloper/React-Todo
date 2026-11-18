import { addDays, format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from './Button'
import { Icon } from './Icon'

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
  const percentage = total ? Math.round(completed / total * 100) : 0
  return <header className="flex flex-col gap-7">
    <div className="brand-row">
      <span className="brand-mark"><Icon name="spark" /></span>
      <span className="text-sm font-semibold tracking-widest">ritim<span className="text-violet-400">.</span></span>
      <span className="ml-auto text-xs text-zinc-500">Her gün, biraz daha iyi.</span>
    </div>
    <div className="pt-3 sm:pt-6">
      <p className="eyebrow">Küçük adımlar, kalıcı değişim</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-[2.75rem] sm:leading-tight">Alışkanlık Takibi<span className="text-violet-400">.</span></h1>
      <p className="mt-3 text-sm leading-6 text-zinc-400">Kendine ayırdığın küçük anlar, yarınını şekillendirir.</p>
    </div>
    <div className="progress-panel">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" fill="none">
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" className="text-white/5" />
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" pathLength="100"
            strokeDasharray={percentage + ' 100'} strokeLinecap="round" className="progress-ring" />
        </svg>
        <span className="text-lg font-semibold tabular-nums">%{percentage}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{total > 0 && completed === total ? 'Bugünün hedefleri tamam!' : 'Bugünkü ilerlemen'}</p>
        <p className="mt-1 text-xs leading-5 text-zinc-400" role="status">Bugün {completed} / {total} alışkanlık tamamlandı</p>
        <progress className="mt-3 block h-1.5 w-full overflow-hidden rounded-full" value={completed} max={total || 1} aria-label="Bugünkü ilerleme" />
      </div>
      <Icon name="spark" className="hidden text-violet-300/40 sm:block" width="28" height="28" />
    </div>
    <div className="week-toolbar">
      <div className="flex items-center gap-3">
        <span className="hidden text-zinc-500 sm:block"><Icon name="calendar" /></span>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{isCurrentWeek ? 'Bu haftanın ritmi' : 'Geçmiş haftalar'}</p>
          <p className="text-xs font-medium text-zinc-300 sm:text-sm">{format(weekStart, 'd MMM yyyy', { locale: tr })} – {format(end, 'd MMM yyyy', { locale: tr })}</p>
        </div>
      </div>
      <nav className="flex items-center gap-1 rounded-xl border border-white/5 bg-black/15 p-1" aria-label="Hafta seçimi">
        <Button variant="secondary" className="min-h-8 px-2" onClick={onPrevious} aria-label="Önceki hafta"><Icon name="left" width="16" height="16" /></Button>
        <Button variant="secondary" className="min-h-8 px-2 text-xs" onClick={onToday} disabled={isCurrentWeek}>Bu hafta</Button>
        <Button variant="secondary" className="min-h-8 px-2" onClick={onNext} disabled={isCurrentWeek} aria-label="Sonraki hafta"><Icon name="right" width="16" height="16" /></Button>
      </nav>
    </div>
  </header>
}
