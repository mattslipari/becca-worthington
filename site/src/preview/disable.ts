import type {APIRoute} from 'astro'
import {PREVIEW_COOKIE} from '../lib/sanity'

export const prerender = false

export const GET: APIRoute = ({cookies, redirect, url}) => {
  cookies.delete(PREVIEW_COOKIE, {path: '/', sameSite: 'none', secure: true})
  return redirect(url.searchParams.get('redirect') || '/', 307)
}
