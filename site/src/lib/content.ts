// One place that loads every piece of content. Pages and components call these with
// `Astro` so that, inside the editor's live preview, they get drafts instead of published content.
import {client, previewClient, PREVIEW_SITE, SAMPLE_MODE} from './sanity'
import {homeQuery, projectsQuery, reelsQuery, resumeQuery, settingsQuery} from './queries'
import * as sample from './sample'
import type {Home, Project, ReelsPage, Resume, Settings} from './types'

type Ctx = {locals: App.Locals}

const memo = new Map<string, Promise<unknown>>()

async function fetchContent<T>(query: string, fallback: T, preview: boolean): Promise<T> {
  const c = preview ? previewClient : client
  if (SAMPLE_MODE || !c) return fallback
  const result = await c.fetch<T | null>(query)
  return (result ?? fallback) as T
}

function loader<T>(query: string, fallback: T) {
  return (ctx: Ctx): Promise<T> => {
    const preview = Boolean(ctx.locals.preview)
    // Static builds fetch each query once and share it across pages.
    // Local dev and the preview site (a long-running server) always fetch fresh content.
    if (preview || PREVIEW_SITE || import.meta.env.DEV) return fetchContent(query, fallback, preview)
    if (!memo.has(query)) memo.set(query, fetchContent(query, fallback, false))
    return memo.get(query) as Promise<T>
  }
}

export const getSettings = loader<Settings>(settingsQuery, sample.settings)
export const getHome = loader<Home>(homeQuery, sample.home)
export const getResume = loader<Resume>(resumeQuery, sample.resume)
export const getReelsPage = loader<ReelsPage>(reelsQuery, sample.reelsPage)
export const getProjects = loader<Project[]>(projectsQuery, sample.projects)
