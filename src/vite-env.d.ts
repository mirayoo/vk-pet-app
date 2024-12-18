/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VK_APP_ID: number
  readonly VITE_VK_APP_URL: string
  readonly VITE_VK_APP_SERVICE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
