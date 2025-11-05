export {};

declare global {
  interface CloudflareEnv {
    NEXTJS_ENV: string;
    POST_LOGGER_ENDPOINT?: string;
  }
}
