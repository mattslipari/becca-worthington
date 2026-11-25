// Converts the site's sample content (site/src/lib/sample.ts) into a file Sanity can import.
// Run from the studio folder:  node scripts/make-sample-content.ts
// Then:                        npm run import-sample
import {writeFileSync} from 'node:fs'
import * as sample from '../../site/src/lib/sample.ts'

let n = 0
const key = () => `k${(n++).toString(36)}`
const typed = (type: string, items: any[] = []) => items.map((item) => ({_type: type, _key: key(), ...item}))
const realPhotos = (photos: any[] = []) => photos.filter((p) => p.asset)

const {settings, home, resume, reelsPage, projects} = sample

const docs: any[] = [
  {
    _id: 'settings',
    _type: 'settings',
    ...settings,
    representatives: typed('representative', settings.representatives),
  },
  {
    _id: 'home',
    _type: 'home',
    heroPhotos: realPhotos(home.heroPhotos),
    bio: home.bio,
    sections: home.sections?.map((s: any) => ({
      ...s,
      events: s.events && typed('event', s.events),
      quotes: s.quotes && typed('quote', s.quotes),
    })),
  },
  {
    _id: 'resume',
    _type: 'resume',
    intro: resume.intro,
    creditGroups: resume.creditGroups?.map((g) => ({_type: 'creditGroup', _key: key(), heading: g.heading, credits: typed('credit', g.credits)})),
    skills: resume.skills,
  },
  {_id: 'reelsPage', _type: 'reelsPage', reels: typed('reel', reelsPage.reels)},
  ...projects.map((p) => ({
    _id: `project-${p.slug}`,
    _type: 'project',
    title: p.title,
    slug: {_type: 'slug', current: p.slug},
    kind: p.kind,
    summary: p.summary,
    body: p.body,
    links: p.links && typed('linkButton', p.links),
    featured: p.featured,
  })),
]

// Strip undefined values so the import is clean
const clean = (doc: any) => JSON.parse(JSON.stringify(doc))
writeFileSync(new URL('../sample-content.ndjson', import.meta.url), docs.map((d) => JSON.stringify(clean(d))).join('\n') + '\n')
console.log(`Wrote ${docs.length} documents to sample-content.ndjson`)
