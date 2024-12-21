import VkOpenApiController from '@/api/vk/vkOpenApiController'

export default class AppService {
  static initVkOpenApi() {
    VkOpenApiController.init()
  }
}
