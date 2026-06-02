// =============================================================================
// The single import surface used by app code (client OR server).
// =============================================================================
// `getLogger` is universal — it doesn't open files or touch the network, it just
// looks up a logger in the registry that the local runtime configured. So this
// helper is safe to import from a Server Component, a Server Action, or a
// 'use client' component alike. The logs route to whatever sink the current
// runtime registered (see config.ts for why sinks must stay runtime-specific).

import { getLogger } from '@logtape/logtape';
import { CATEGORY } from './config';

export const appLog = getLogger(CATEGORY.app);
export const actionsLog = getLogger(CATEGORY.actions);
export const uiLog = getLogger(CATEGORY.ui);
