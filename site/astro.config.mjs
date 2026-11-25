// @ts-check
import {defineConfig} from 'astro/config'
import {loadEnv} from 'vite'
import netlify from '@astrojs/netlify'

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')

/**
 * The same code is deployed twice:
 *  - the PUBLIC site: fully static HTML, rebuilt whenever Becca publishes (fast, free, nothing to break)
 *  - the PREVIEW site (SANITY_PREVIEW_SITE=true): rendered on demand so the editor's
 *    live preview can show unpublished drafts with click-to-edit.
 */
const isPreviewSite = env.SANITY_PREVIEW_SITE === 'true'

/** Adds the routes only the preview site needs (they can't exist on a fully static site). */
const previewRoutes = {
  name: 'preview-routes',
  hooks: {
    /** @param {{injectRoute: (r: {pattern: string, entrypoint: string}) => void}} opts */
    'astro:config:setup': ({injectRoute}) => {
      injectRoute({pattern: '/api/preview/enable', entrypoint: './src/preview/enable.ts'})
      injectRoute({pattern: '/api/preview/disable', entrypoint: './src/preview/disable.ts'})
      injectRoute({pattern: '/api/preview/version', entrypoint: './src/preview/version.ts'})
    },
  },
}

export default defineConfig({
  site: 'https://www.becca-worthington.com',
  output: isPreviewSite ? 'server' : 'static',
  adapter: isPreviewSite ? netlify() : undefined,
  integrations: isPreviewSite ? [previewRoutes] : [],
  vite: {
    build: {
      rollupOptions: {
        // Hide harmless "use client" notices from the live-preview toolkit
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
          warn(warning)
        },
      },
    },
  },
})
