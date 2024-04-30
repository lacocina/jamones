import { ref } from 'vue'
import type { InvoiceCreate } from '@/types/Invoice.ts'

function promiseResolver<Response>() {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  let resolve = (result: Response) => {}
  let reject = (result: any) => {}
  const promise = new Promise<Response>((resolveParam, rejectParam) => {
    resolve = resolveParam
    reject = rejectParam
  })
  return {
    promise,
    resolve: (result: unknown) => resolve(result as Response),
    reject,
  }
}

const visible = ref(false)
const component = ref<any>(null)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let resolve = (_: any) => {}
let reject = (_: any) => {}

export function useOverlay<ResponseParent = {}>() {
  const open = async <Response = ResponseParent>(overlayComponent: any): Promise<Response> => {
    component.value = overlayComponent
    visible.value = true
    document.body.style.overflow = 'hidden'
    const { promise, resolve: resolver, reject: rejecter } = promiseResolver<Response>()
    resolve = resolver
    reject = rejecter
    return promise
  }

  const close = (result: any) => {
    document.body.style.overflow = 'visible'
    visible.value = false
    component.value = null
    resolve(result)
  }

  const rejectMethod = (result: any) => {
    document.body.style.overflow = 'visible'
    visible.value = false
    component.value = null
    reject(result)
  }

  return {
    visible,
    component,
    open,
    close,
    resolve: (param: Response) => resolve(param),
    reject: rejectMethod,
  }
}
