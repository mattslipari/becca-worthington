// The editor opens the live preview through this URL with a one-time secret.
// If the secret is valid we set a cookie that switches this browser into preview mode.
import type {APIRoute} from 'astro'
import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {PREVIEW_COOKIE, previewClient} from '../lib/sanity'

export const prerender = false

export const GET: APIRoute = async ({request, cookies, redirect}) => {
  if (!previewClient) return new Response('Preview is not configured', {status: 500})
  const {isValid, redirectTo = '/'} = await validatePreviewUrl(previewClient.withConfig({stega: false}), request.url)
  if (!isValid) return new Response('This preview link has expired. Open the preview from the editor again.', {status: 401})
  cookies.set(PREVIEW_COOKIE, '1', {
    path: '/',
    httpOnly: true,
    // The preview is shown inside the editor (a different website), so the cookie must allow that.
    sameSite: 'none',
    secure: true,
    maxAge: 60 * 60 * 12,
  })
  return redirect(redirectTo, 307)
}
