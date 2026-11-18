import { addDays, eachDayOfInterval, format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from './Button'
import { getStreak, type Habit } from '../habits'

type HabitListProps = {
  habits: Habit[]
  weekStart: Date
  today: string
  onDelete: (id: string) => void
  onToggle: (id: string, date: string) => void
}

export function HabitList({ habits, weekStart, today, onDelete, onToggle }: HabitListProps) {
  if (!habits.length) return <section className="rounded-xl border border-dashed border-zinc-700 px-5 py-12 text-center">
    <h2 className="font-semibold">İlk adımını bugün at</h2>
    <p className="mt-2 text-sm text-zinc-400">Henüz alışkanlık eklemedin. Yukarıdan bir hedef ekleyerek başla.</p>
  </section>

  const dates = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) })
  return <section aria-label="Alışkanlıklar" className="flex flex-col gap-4">
    {habits.map(habit => {
      const streak = getStreak(habit.completedDates, today)
      const weekCount = dates.filter(date => habit.completedDates.includes(format(date, 'yyyy-MM-dd'))).length
      return <article key={habit.id} className="flex flex-col gap-4 rounded-xl border border-zinc-700/60 bg-zinc-800/70 p-3 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="break-words font-semibold">{habit.name}</h2>
            <p className="mt-1 text-xs text-zinc-400">Bu hafta {weekCount} / 7 gün <span className="ml-2 text-amber-300">{streak} günlük seri</span></p>
          </div>
          <Button variant="destructive" className="shrink-0" onClick={() => onDelete(habit.id)} aria-label={habit.name + ' alışkanlığını sil'}>Sil</Button>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dates.map(date => {
            const key = format(date, 'yyyy-MM-dd')
            const checked = habit.completedDates.includes(key)
            return <Button key={key} variant={checked ? 'primary' : 'secondary'} disabled={key > today}
              aria-pressed={checked} aria-current={key === today ? 'date' : undefined}
              aria-label={habit.name + ', ' + format(date, 'd MMMM yyyy', { locale: tr }) + ', ' + (checked ? 'tamamlandı' : 'tamamlanmadı')}
              onClick={() => onToggle(habit.id, key)}
              className={'flex min-h-20 min-w-0 flex-col items-center justify-center gap-1 px-0 text-xs ' + (key === today ? 'ring-1 ring-violet-300' : '')}>
              <span>{format(date, 'EEE', { locale: tr })}</span>
              <span className="text-sm font-semibold">{format(date, 'd')}</span>
              <span aria-hidden="true" className="h-4">{checked ? '✓' : '·'}</span>
            </Button>
          })}
        </div>
      </article>
    })}
  </section>
}
