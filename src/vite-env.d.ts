/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZRAEL_URL: string
  readonly ALCHEMY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
