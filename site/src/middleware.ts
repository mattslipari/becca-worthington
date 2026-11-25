import {defineMiddleware} from 'astro:middleware'
import {PREVIEW_COOKIE, PREVIEW_SITE} from './lib/sanity'

// Decides per request whether to show draft content (only on the preview site,
// and only after the editor has unlocked preview mode via /api/preview/enable).
export const onRequest = defineMiddleware((context, next) => {
  context.locals.preview = PREVIEW_SITE && !context.isPrerendered && context.cookies.get(PREVIEW_COOKIE)?.value === '1'
  return next()
})
