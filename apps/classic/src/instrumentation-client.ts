// =============================================================================
// CLIENT-SIDE LOGGING SETUP
// =============================================================================
// Next.js runs `instrumentation-client.ts` in the browser before your app code.
// It must be SYNCHRONOUS, so we use `configureSync()` (the browser console sink
// needs no async setup). This file is bundled for the browser, so it may ONLY
// reference browser-safe sinks — never node:fs / node:stream.
//
// Note we import the SAME `LOGGER_CONFIGS` as the server (instrumentation.ts).
// Identical categories + levels, but the string "console" is bound to a
// browser-appropriate sink here. That's the whole "same provider, two runtimes"
// trick: shared identity, runtime-specific destinations.

import { configureSync, getConsoleSink } from '@logtape/logtape';
import { LOGGER_CONFIGS } from './logging/config';

configureSync({
  sinks: {
    // Browser destination → devtools console.
    console: getConsoleSink(),
  },
  loggers: LOGGER_CONFIGS,
  reset: true,
});
