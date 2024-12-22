import { onMounted, onUnmounted } from 'vue'
import { FunctionType } from '@/types/common'

export default function useFireWindowEvent(
  eventName: keyof WindowEventMap,
  restrictedClassList: string[],
  cb: FunctionType<any>,
) {
  function fireWindowEvent(event, ...args: any[]) {
    const targetClassNames = typeof event.target.className === 'string' ? event.target.className.split(' ') : []
    const shouldHandleClickEvent = restrictedClassList.find((className) => targetClassNames.includes(className))

    if (!shouldHandleClickEvent) {
      cb.apply(this, args)
    }
  }

  onMounted(() => {
    window.addEventListener(eventName, fireWindowEvent)
  })

  onUnmounted(() => {
    window.removeEventListener(eventName, fireWindowEvent)
  })
}
