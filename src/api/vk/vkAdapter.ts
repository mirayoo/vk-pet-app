import { VERSION } from '@/constants/vk'
import { FRIENDS, WALL } from '@/constants/vk/permissions';

export default class VKAdapter {
  static init() {
    const apiId = Number(import.meta.env.VITE_VK_APP_ID)

    VK.init({ apiId })
  }

  static async auth() {
    const permissions: number = FRIENDS + WALL

    return sendRequest<vk.OpenAPI.Auth.LoginStatus>((cb) => VK.Auth.login(cb, permissions))
  }

  static async getLoginStatus() {
    return sendRequest<vk.OpenAPI.Auth.LoginStatus>(VK.Auth.getLoginStatus)
      .then(response => response.status)
  }

  static async fetch<T>(endpoint: string, params: unknown): Promise<T> {
    return sendRequest<T>((cb) => VK.Api.call(
      endpoint,
      {
      ...params,
      v: VERSION
    }, cb))
      .then(data => {
        if (data.response) return data.response
      }).catch(error => {
        throw new Error(error)
      })
  }
}

async function sendRequest<T>(fn: any): Promise<T> {
  return new Promise((resolve)  => {
    fn(resolve)
  }).then(response => {
    return response
  })
}
