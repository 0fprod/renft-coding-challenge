/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZRAEL_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
