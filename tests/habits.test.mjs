import assert from 'node:assert/strict'
import test from 'node:test'
import { format, parseISO } from 'date-fns'
import { getStreak, isDateKey, parseHabits, toggleCompletion } from '../src/habits.ts'

test('empty and persisted data load without losing dates', () => {
  assert.deepEqual(parseHabits(null), [])
  assert.deepEqual(parseHabits(JSON.stringify([{ id: 'a', name: ' Oku ', completedDates: ['2026-11-18', '2026-11-18'] }])),
    [{ id: 'a', name: 'Oku', completedDates: ['2026-11-18'] }])
})

test('corrupt records are rejected rather than silently overwritten', () => {
  for (const raw of ['{', '{}', 'null', '[null]', '[{"id":"a","name":"Oku"}]',
    '[{"id":"a","name":"Oku","completedDates":["2026-02-30"]}]',
    JSON.stringify([{ id: 'a', name: 'Oku', completedDates: [] }, { id: 'a', name: 'Yürü', completedDates: [] }])]) {
    assert.throws(() => parseHabits(raw))
  }
})

test('date keys validate leap years and preserve the local calendar day', () => {
  assert.equal(isDateKey('2024-02-29'), true)
  for (const date of ['2026-02-29', '2026-13-01', '2026-1-01', 'abc', null]) {
    assert.equal(isDateKey(date), false)
  }
  assert.equal(format(parseISO('2026-11-18'), 'yyyy-MM-dd'), '2026-11-18')
})

test('completion toggles independently, survives serialization, and leaves source intact', () => {
  const original = [{ id: 'a', name: 'Oku', completedDates: [] }, { id: 'b', name: 'Yürü', completedDates: [] }]
  const updated = toggleCompletion(original, 'a', '2026-11-18', '2026-11-18')
  assert.deepEqual(updated[0].completedDates, ['2026-11-18'])
  assert.deepEqual(updated[1].completedDates, [])
  assert.deepEqual(original[0].completedDates, [])
  assert.deepEqual(parseHabits(JSON.stringify(updated)), updated)
  assert.deepEqual(toggleCompletion(updated, 'a', '2026-11-18', '2026-11-18'), original)
})

test('future and invalid completion dates cannot be marked', () => {
  const habits = [{ id: 'a', name: 'Oku', completedDates: [] }]
  assert.deepEqual(toggleCompletion(habits, 'a', '2026-11-19', '2026-11-18'), habits)
  assert.deepEqual(toggleCompletion(habits, 'a', '2026-02-30', '2026-11-18'), habits)
})

test('streak includes yesterday while today is pending, and resets after a missed day', () => {
  assert.equal(getStreak([], '2026-11-18'), 0)
  assert.equal(getStreak(['2026-11-16', '2026-11-17', '2026-11-18'], '2026-11-18'), 3)
  assert.equal(getStreak(['2026-11-16', '2026-11-17'], '2026-11-18'), 2)
  assert.equal(getStreak(['2026-11-16'], '2026-11-18'), 0)
  assert.equal(getStreak(['2026-11-16', '2026-11-18', '2026-11-19'], '2026-11-18'), 1)
})

test('streak crosses year and daylight-saving boundaries', () => {
  assert.equal(getStreak(['2025-12-30', '2025-12-31', '2026-01-01'], '2026-01-01'), 3)
  assert.equal(getStreak(['2026-03-07', '2026-03-08', '2026-03-09'], '2026-03-09'), 3)
})
