import {defineDocuments, defineLocations} from 'sanity/presentation'

// Where the live preview loads the website from.
//  - while developing: the local site (npm run dev in /site)
//  - in production: the Netlify "preview" deployment (set SANITY_STUDIO_PREVIEW_URL when deploying)
export const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

// Which document to open when Becca navigates to a page in the preview
const mainDocuments = defineDocuments([
  {route: '/', type: 'home'},
  {route: '/resume', type: 'resume'},
  {route: '/reels', type: 'reelsPage'},
  {route: '/projects/:slug', filter: `_type == "project" && slug.current == $slug`},
])

// "Used on these pages" links shown at the top of each document
const page = (title, href) => defineLocations({locations: [{title, href}]})
const locations = {
  home: page('Home page', '/'),
  resume: page('Resume page', '/resume'),
  reelsPage: page('Reels page', '/reels'),
  settings: page('Every page (header, footer, colors)', '/'),
  project: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) =>
      doc?.slug
        ? {locations: [{title: doc.title || 'Project page', href: `/projects/${doc.slug}`}, {title: 'All projects', href: '/projects'}]}
        : null,
  }),
}

export const presentationOptions = {
  name: 'live',
  title: 'Live preview',
  previewUrl: {
    initial: PREVIEW_URL,
    previewMode: {enable: '/api/preview/enable'},
  },
  allowOrigins: [PREVIEW_URL],
  resolve: {mainDocuments, locations},
}
