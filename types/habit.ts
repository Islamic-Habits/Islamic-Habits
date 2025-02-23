export const HabitTypes = ["quraan", "dhikr", "nafl salaah", "sadaqah"] as const
export type HabitType = typeof HabitTypes[number]

export const HabitPeriods = ["daily", "weekly", "monthly"] as const
export type HabitPeriod = typeof HabitPeriods[number]

export interface Habit {
  id: number,
  title: string
  type: HabitType,
  goal: undefined
  period: HabitPeriod,
  users: string[],
  completed: boolean
}
