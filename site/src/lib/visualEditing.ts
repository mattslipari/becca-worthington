// Helpers for the editor's live preview: tags page elements so Becca can tap them to edit,
// and drag sections/videos to reorder. Outside the preview these return undefined (no-ops).
import {createDataAttribute} from '@sanity/visual-editing/create-data-attribute'
import {stegaClean} from '@sanity/client/stega'
import {dataset, projectId, studioUrl} from './sanity'

type Ctx = {locals: App.Locals}

export type DocRef = {id: string; type: string}

export const DOCS = {
  home: {id: 'home', type: 'home'},
  resume: {id: 'resume', type: 'resume'},
  reelsPage: {id: 'reelsPage', type: 'reelsPage'},
  settings: {id: 'settings', type: 'settings'},
} satisfies Record<string, DocRef>

/** e.g. sanityAttr(Astro, DOCS.home, `sections[_key=="abc"]`) */
export function sanityAttr(ctx: Ctx, doc: DocRef | undefined, path: string) {
  if (!ctx.locals.preview || !doc || !projectId) return undefined
  return createDataAttribute({id: doc.id, type: doc.type, path, baseUrl: studioUrl, projectId, dataset}).toString()
}

/** Removes invisible click-to-edit markers – use for anything that isn't visible text (titles, attributes, logic). */
export const clean = <T>(value: T): T => stegaClean(value) as T
