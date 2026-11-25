// GROQ queries – the "questions" the site asks the editor's database at build time.
const photo = `{..., asset->{_id, url}}`
const sections = `sections[]{..., photos[]${photo}, events[]{..., image${photo}}}`

export const settingsQuery = `*[_id == "settings"][0]{..., shareImage${photo}}`
export const homeQuery = `*[_id == "home"][0]{heroPhotos[]${photo}, bio, ${sections}}`
export const resumeQuery = `*[_id == "resume"][0]{intro, "resumePdfUrl": resumePdf.asset->url, headshots[]${photo}, creditGroups, skills, ${sections}}`
export const reelsQuery = `*[_id == "reelsPage"][0]{intro, reels, ${sections}}`
export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(coalesce(sortOrder, 9999) asc, _createdAt desc){
  title, "slug": slug.current, kind, coverImage${photo}, summary, body, videoUrl, links, featured
}`
