/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_WEB_APP_PORT: number
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }