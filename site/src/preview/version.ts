// The live preview asks this every couple of seconds: "has any content changed?"
// It returns a fingerprint of every page's latest revision (drafts included).
import type {APIRoute} from 'astro'
import {previewClient} from '../lib/sanity'

export const prerender = false

const query = `*[_type in ["home", "resume", "reelsPage", "settings", "project"]] | order(_id) {_id, _rev}`

export const GET: APIRoute = async ({locals}) => {
  if (!locals.preview || !previewClient) return new Response(null, {status: 403})
  const docs = await previewClient.withConfig({perspective: 'raw', stega: false}).fetch<{_id: string; _rev: string}[]>(query)
  const version = docs.map((d) => `${d._id}:${d._rev}`).join('|')
  return new Response(JSON.stringify({version}), {
    headers: {'content-type': 'application/json', 'cache-control': 'no-store'},
  })
}
