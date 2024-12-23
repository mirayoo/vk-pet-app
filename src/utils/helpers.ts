export function debounce(fn, wait: number = 300) {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(fn.bind(this as any, ...args), wait)
  }
}
