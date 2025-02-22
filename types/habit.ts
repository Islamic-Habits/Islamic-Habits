import type { User } from "./user"

export enum HabitType {
  Quran = "Quraan",
  Dhikr = "Dhikr",
  NaflSalaah = "Nafl Salaah",
  SunnahActs = "Sunnah Acts",
  Sadaqah = "Sadaah"
}

export interface Habit {
  id: number,
  title: string
  type: HabitType
  users: User[]
}
