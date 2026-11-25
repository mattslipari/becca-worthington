// Shapes of the content coming from the editor. Kept loose on purpose:
// any field Becca leaves empty may be missing.
export type Photo = {
  asset?: {_ref?: string; _id?: string; url?: string}
  /** Only used by sample content (a plain image URL). */
  src?: string
  alt?: string
  caption?: string
  hotspot?: unknown
  crop?: unknown
}
export type Block = {_type: string; _key?: string; [k: string]: any}
export type LinkButton = {label: string; url: string}
export type Reel = {title: string; url: string; category?: string; note?: string; featured?: boolean}
export type Credit = {production: string; role?: string; company?: string; year?: string}
export type CreditGroup = {heading: string; credits?: Credit[]}
export type Representative = {agency: string; region?: string; contactName?: string; email?: string; phone?: string; website?: string}
export type Quote = {text: string; source?: string; link?: string}
export type Event = {title: string; role?: string; where?: string; when?: string; link?: string; image?: Photo}

export type Section = {_key: string; _type: string; heading?: string; hidden?: boolean; [k: string]: any}

export type Settings = {
  name: string
  tagline?: string
  theme?: 'seafoam' | 'sunset' | 'midnight' | 'paper'
  showSparkles?: boolean
  email?: string
  representatives?: Representative[]
  social?: Partial<Record<'instagram' | 'tiktok' | 'youtube' | 'imdb' | 'backstage' | 'actorsAccess', string>>
  seoDescription?: string
  shareImage?: Photo
}
export type Home = {heroPhotos?: Photo[]; bio?: Block[]; sections?: Section[]}
export type Resume = {intro?: string; resumePdfUrl?: string; headshots?: Photo[]; creditGroups?: CreditGroup[]; skills?: string; sections?: Section[]}
export type ReelsPage = {intro?: string; reels?: Reel[]; sections?: Section[]}
export type Project = {
  title: string
  slug: string
  kind?: string
  coverImage?: Photo
  summary?: string
  body?: Block[]
  videoUrl?: string
  links?: LinkButton[]
  featured?: boolean
}
