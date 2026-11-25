// Turns a normal YouTube/Vimeo link into an embeddable player URL + thumbnail.
export function parseVideo(url?: string) {
  if (!url) return null
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/)
  if (yt) {
    const id = yt[1]
    return {
      provider: 'youtube' as const,
      id,
      embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) {
    const id = vimeo[1]
    return {provider: 'vimeo' as const, id, embed: `https://player.vimeo.com/video/${id}?dnt=1`, thumbnail: null}
  }
  return null
}
