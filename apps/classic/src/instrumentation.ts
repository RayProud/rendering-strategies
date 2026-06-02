// =============================================================================
// SERVER-SIDE LOGGING SETUP
// =============================================================================
// Next.js calls `register()` once when the server process boots (and during the
// build). This is the one place to configure server-side logging. Use the async
// `configure()` here because server sinks can need async setup/flush.
//
// This is also where Node-only sinks belong. Today we use the console sink, but
// THIS is the file that could legitimately do:
//
//     import { getFileSink } from '@logtape/file';        // touches node:fs
//     sinks: { console: getFileSink('/var/log/app.log') }
//
// …because instrumentation.ts only ever runs on the server, so pulling in
// node:fs here is fine. Put that same import in config.ts (shared) and it would
// leak into the browser bundle. The category/level config is imported from the
// shared module so client and server agree on what gets logged.

import { configure, getConsoleSink } from '@logtape/logtape';
import { LOGGER_CONFIGS } from './logging/config';

export async function register() {
  await configure({
    sinks: {
      // Server destination. Swap for a file/stream/OTel sink without touching
      // any app code or the client config.
      console: getConsoleSink(),
    },
    loggers: LOGGER_CONFIGS,
    // Allow re-running in dev (HMR) without throwing "already configured".
    reset: true,
  });
}
