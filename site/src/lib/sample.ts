// SAMPLE CONTENT – only used until the site is connected to the Sanity editor.
// Text is taken from Becca's original Wix site. Anything in [square brackets]
// is a placeholder that Becca fills in herself through the editor.
import type {Home, Project, ReelsPage, Resume, Settings} from './types'

const p = (text: string, key: string) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: key + 's', text, marks: []}],
})

export const settings: Settings = {
  name: 'Becca Worthington',
  tagline: 'Indigenous Actor, Singer, & Dancer',
  theme: 'seafoam',
  showSparkles: true,
  email: 'beccaworthingtonactor@gmail.com',
  representatives: [
    {agency: 'NTA Talent', region: 'Los Angeles'},
    {agency: 'Resolute Artists Agency', region: 'New York City & Atlanta'},
    {agency: 'Reel Talent Studio', region: 'Oklahoma'},
  ],
  social: {
    instagram: 'https://www.instagram.com/becca.worthington/',
    youtube: 'https://www.youtube.com/@becca-worthington',
    tiktok: 'https://www.tiktok.com/@bkworthington',
    imdb: 'https://www.imdb.com/name/nm13218988/',
  },
  seoDescription:
    'Becca Worthington is an Indigenous actor, singer, and dancer based in New York City and Oklahoma, and a proud member of the Cherokee Nation.',
}

export const home: Home = {
  heroPhotos: [{alt: 'Headshot of Becca Worthington'}, {alt: 'Second headshot of Becca Worthington'}],
  bio: [
    p(
      'Becca Worthington (she/her) is an actress based in New York City and Oklahoma. She is a proud member of the Cherokee Nation with Choctaw ancestry. From Native Voices in Los Angeles to The Kennedy Center in D.C., Becca has worked coast-to-coast in both theatre and film. With her BFA in Musical Theatre from Texas Tech University and a passion for comedy, Becca brings genuine and energetic consideration to her work both on and off the stage.',
      'bio1',
    ),
    p(
      'Becca is represented by NTA Talent in LA, Resolute Artists Agency in NYC/ATL and Reel Talent Studio in Oklahoma.',
      'bio2',
    ),
  ],
  sections: [
    {
      _key: 'up',
      _type: 'upcomingSection',
      heading: 'Now Playing',
      events: [
        {title: '[Show title]', role: '[Role]', where: '[Theatre, City]', when: '[Dates]', link: 'https://example.com'},
      ],
    },
    {_key: 'reels', _type: 'reelsSection', heading: 'Reels'},
    {
      _key: 'quotes',
      _type: 'quotesSection',
      heading: 'Press',
      quotes: [{text: '[A line from a review goes here.]', source: '[Publication name]'}],
    },
    {_key: 'proj', _type: 'projectsSection', heading: 'Projects'},
    {_key: 'contact', _type: 'contactSection', heading: 'Contact', intro: 'For bookings and inquiries, reach out to my representation or email me directly.'},
  ],
}

export const resume: Resume = {
  intro: 'Download my resume and headshots below.',
  headshots: [{alt: 'Headshot 1', caption: '[Look name]'}, {alt: 'Headshot 2', caption: '[Look name]'}, {alt: 'Headshot 3', caption: '[Look name]'}],
  creditGroups: [
    {
      heading: 'Theatre',
      credits: [
        {production: 'Channeling Our Ancestors', role: 'Co-author & Director', company: 'Tulsa Performing Arts Center'},
        {production: '[Production]', role: '[Role]', company: 'Native Voices at the Autry'},
        {production: '[Production]', role: '[Role]', company: 'The Kennedy Center'},
      ],
    },
    {
      heading: 'Concerts & Recordings',
      credits: [
        {production: 'Love Comes Softly: The Musical', role: 'World premiere soundtrack', company: '[Label / company]'},
        {production: '"Amazing Grace" in Cherokee', role: 'Soloist', company: 'Green Room 42'},
      ],
    },
    {
      heading: 'Film & TV',
      credits: [{production: '[Title]', role: '[Role]', company: '[Director / network]'}],
    },
    {
      heading: 'Training',
      credits: [{production: 'BFA in Musical Theatre', company: 'Texas Tech University'}],
    },
  ],
  skills: '[Special skills – languages, dialects, instruments, sports, etc.]',
}

export const reelsPage: ReelsPage = {
  reels: [
    {title: 'Comedy Demo Reel', url: 'https://www.youtube.com/watch?v=zdaKttDUrpQ', category: 'Comedy', featured: true},
    {
      title: '"Amazing Grace" in Cherokee at Green Room 42',
      url: 'https://www.youtube.com/watch?v=w_PxSr8uGsA',
      category: 'Singing',
      featured: true,
    },
    {title: 'Dance Reel', url: 'https://www.youtube.com/watch?v=hWm3UUhMAHI', category: 'Dance', featured: true},
  ],
}

export const projects: Project[] = [
  {
    title: 'Channeling Our Ancestors',
    slug: 'channeling-our-ancestors',
    kind: 'Original work',
    featured: true,
    summary:
      'An original piece co-authored and directed by Becca for the Tulsa Performing Arts Center – a love letter to contemporary Native life.',
    body: [
      p(
        'Becca co-authored and directed an original piece for the Tulsa Performing Arts Center. Channeling Our Ancestors is a love letter to contemporary Native life. The show explores themes of identity, appropriation, the connection of generations, and bringing heritage and traditions forward into modern life. Through a series of comedic sketches based on popular TV show tropes, audiences will be entertained and educated on what it means to be an Indigenous person in today’s society.',
        'coa1',
      ),
    ],
    links: [
      {
        label: 'Read the News On 6 story',
        url: 'https://www.newson6.com/entertainment/new-tulsa-show-challenges-indigenous-stereotypes-with-all-native-cast',
      },
    ],
  },
  {
    title: 'Love Comes Softly: The Musical',
    slug: 'love-comes-softly',
    kind: 'Cast recording',
    featured: true,
    summary: 'Hear Becca on the soundtrack for the world premiere of Love Comes Softly: The Musical.',
  },
]
