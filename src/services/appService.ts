import VkOpenApiController from '@/api/vk/vkOpenApiController'

export default class AppService {
  static initVkOpenApi() {
    VkOpenApiController.init()
  }

  static async isUserLoggedIn() {
    const status = await VkOpenApiController.getLoginStatus()

    return status === 'connected'
  }
}
