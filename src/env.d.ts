/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_SENDA_FORM: string;
    // Add other env vars here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }