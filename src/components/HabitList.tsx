import { addDays, eachDayOfInterval, format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from './Button'
import { Icon } from './Icon'
import { getStreak, type Habit } from '../habits'

type HabitListProps = {
  habits: Habit[]
  weekStart: Date
  today: string
  onDelete: (id: string) => void
  onToggle: (id: string, date: string) => void
}

export function HabitList({ habits, weekStart, today, onDelete, onToggle }: HabitListProps) {
  if (!habits.length) return <section className="empty-state">
    <span className="empty-mark"><Icon name="spark" width="28" height="28" /></span>
    <h2 className="font-semibold">İlk adımını bugün at</h2>
    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-400">Henüz alışkanlık eklemedin. Yukarıdan bir hedef ekleyerek başla.</p>
    <span className="mt-6 inline-block text-xs text-zinc-500">Bir bardak su. Birkaç sayfa. Kısa bir yürüyüş.</span>
  </section>

  const dates = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) })
  return <section aria-label="Alışkanlıklar" className="flex flex-col gap-4">
    <div className="mb-1 flex items-center justify-between">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Alışkanlıkların <span className="ml-1 text-zinc-600">/ {habits.length.toString().padStart(2, '0')}</span></h2>
      <span className="text-[11px] text-zinc-500">Her işaret bir adım.</span>
    </div>
    {habits.map(habit => {
      const streak = getStreak(habit.completedDates, today)
      const weekCount = dates.filter(date => habit.completedDates.includes(format(date, 'yyyy-MM-dd'))).length
      return <article key={habit.id} className="habit-card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="break-words text-[15px] font-semibold tracking-tight">{habit.name}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="text-zinc-500">Bu hafta <span className="text-zinc-300">{weekCount} / 7 gün</span></span>
              {streak > 0 && <span className="streak-badge"><Icon name="flame" width="13" height="13" />{streak} günlük seri</span>}
            </div>
          </div>
          <Button variant="destructive" className="min-h-8 shrink-0 px-2" onClick={() => onDelete(habit.id)} aria-label={habit.name + ' alışkanlığını sil'} title="Alışkanlığı sil"><Icon name="trash" width="16" height="16" /></Button>
        </div>
        <div className="grid grid-cols-7 gap-1.5 border-t border-white/5 pt-4 sm:gap-2.5">
          {dates.map(date => {
            const key = format(date, 'yyyy-MM-dd')
            const checked = habit.completedDates.includes(key)
            return <Button key={key} variant={checked ? 'primary' : 'secondary'} disabled={key > today}
              aria-pressed={checked} aria-current={key === today ? 'date' : undefined}
              aria-label={habit.name + ', ' + format(date, 'd MMMM yyyy', { locale: tr }) + ', ' + (checked ? 'tamamlandı' : 'tamamlanmadı')}
              onClick={() => onToggle(habit.id, key)}
              data-checked={checked} data-today={key === today}
              className="day-button min-h-24 min-w-0 flex-col gap-1.5 rounded-xl px-0 py-2 text-[10px] sm:text-xs">
              <span className="day-label">{format(date, 'EEE', { locale: tr })}</span>
              <span className="text-sm font-medium tabular-nums">{format(date, 'd')}</span>
              <span aria-hidden="true" className="day-check">{checked && <Icon name="check" width="13" height="13" />}</span>
            </Button>
          })}
        </div>
      </article>
    })}
  </section>
}
