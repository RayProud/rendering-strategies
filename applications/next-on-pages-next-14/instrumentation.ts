import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

export async function register() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  try {
    await setupDevPlatform();
  } catch (error) {
    console.warn('Failed to set up next-on-pages dev platform', error);
  }
}
