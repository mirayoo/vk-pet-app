export type Paginated<T> = {
  items: T[]
  count: number
}

export type FunctionType<T> = (...args: any[]) => T
