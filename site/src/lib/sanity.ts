import {createClient, type SanityClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'
import type {Photo} from './types'

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined
export const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) || 'production'
export const studioUrl = (import.meta.env.PUBLIC_SANITY_STUDIO_URL as string | undefined) || 'https://becca-worthington.sanity.studio'

/** True on the deployment that powers the editor's live preview. */
export const PREVIEW_SITE = import.meta.env.SANITY_PREVIEW_SITE === 'true'
export const PREVIEW_COOKIE = 'sanity-preview'

/** True when no Sanity project is connected yet – the site then uses sample content. */
export const SAMPLE_MODE = !projectId

const apiVersion = '2026-11-01'

/** Published content only – what the public sees. */
export const client: SanityClient | null = projectId
  ? createClient({projectId, dataset, apiVersion, useCdn: false, perspective: 'published'})
  : null

// Only these fields get invisible "click-to-edit" markers in the live preview.
// They're all plain visible text; links, emails, colors etc. must stay untouched.
const EDITABLE_TEXT = new Set([
  'name', 'tagline', 'text', 'heading', 'bioHeading', 'intro', 'title', 'role', 'where', 'when', 'production',
  'company', 'year', 'source', 'summary', 'label', 'caption', 'note', 'kind', 'agency', 'region',
  'contactName', 'skills', 'phone',
])

/** Drafts + click-to-edit markers – only used inside the editor's live preview. */
export const previewClient: SanityClient | null =
  projectId && PREVIEW_SITE
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: import.meta.env.SANITY_API_READ_TOKEN,
        perspective: 'drafts',
        stega: {
          enabled: true,
          studioUrl,
          filter: (props) => {
            const last = props.sourcePath.at(-1)
            return typeof last === 'string' && EDITABLE_TEXT.has(last) && props.filterDefault(props)
          },
        },
      })
    : null

const builder = projectId ? createImageUrlBuilder({projectId, dataset}) : null

/** Returns a resized image URL for a photo from the editor (or the sample URL). */
export function imageUrl(photo: Photo | undefined, width: number, height?: number) {
  if (!photo) return undefined
  if (photo.src) return photo.src
  if (!builder || !photo.asset) return undefined
  let b = builder.image(photo as any).width(width).auto('format').quality(80)
  if (height) b = b.height(height).fit('crop')
  return b.url()
}

/** Full-quality original, for "download headshot" links. */
export function originalUrl(photo: Photo | undefined) {
  if (!photo) return undefined
  if (photo.src) return photo.src
  if (!builder || !photo.asset) return undefined
  return builder.image(photo as any).url() + '?dl='
}
