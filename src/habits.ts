import { format, isValid, parseISO, subDays } from 'date-fns'

export type Habit = { id: string; name: string; completedDates: string[] }

export function isDateKey(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = parseISO(value)
  return isValid(date) && format(date, 'yyyy-MM-dd') === value
}

export function parseHabits(raw: string | null): Habit[] {
  if (raw === null) return []
  const data: unknown = JSON.parse(raw)
  if (!Array.isArray(data)) throw new Error('Invalid habits')
  const ids = new Set<string>()
  return data.map((item: unknown) => {
    if (!item || typeof item !== 'object' || !('id' in item) || typeof item.id !== 'string' || !item.id.trim()
      || ids.has(item.id) || !('name' in item) || typeof item.name !== 'string' || !item.name.trim() || item.name.trim().length > 80
      || !('completedDates' in item) || !Array.isArray(item.completedDates) || !item.completedDates.every(isDateKey)) {
      throw new Error('Invalid habit')
    }
    ids.add(item.id)
    return { id: item.id, name: item.name.trim(), completedDates: [...new Set<string>(item.completedDates)] }
  })
}

export function toggleCompletion(habits: Habit[], id: string, date: string, today: string): Habit[] {
  if (!isDateKey(date) || date > today) return habits
  return habits.map(habit => habit.id !== id ? habit : {
    ...habit,
    completedDates: habit.completedDates.includes(date)
      ? habit.completedDates.filter(value => value !== date)
      : [...habit.completedDates, date],
  })
}

export function getStreak(completedDates: string[], today: string): number {
  const completed = new Set(completedDates)
  let day = parseISO(today)
  if (!completed.has(today)) day = subDays(day, 1)
  let streak = 0
  while (completed.has(format(day, 'yyyy-MM-dd'))) {
    streak++
    day = subDays(day, 1)
  }
  return streak
}
