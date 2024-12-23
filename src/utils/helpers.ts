import { FunctionType } from '@/types/common'

export function debounce<T extends FunctionType<any>>(fn: T, wait: number = 300): ReturnType<T> {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(fn.bind(this, ...args), wait)
  }
}
