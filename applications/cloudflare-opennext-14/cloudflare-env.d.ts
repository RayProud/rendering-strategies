export {};

declare global {
  interface CloudflareEnv {
    POST_LOGGER_ENDPOINT?: string;
  }
}
