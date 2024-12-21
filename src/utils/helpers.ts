type Function = (...args: any[]) => any

export function debounce<T extends Function>(fn: T, wait: number): ReturnType<T> {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(fn.bind(this, ...args), wait)
  }
}
