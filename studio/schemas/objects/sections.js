import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImagesIcon} from '@sanity/icons/Images'
import {PlayIcon} from '@sanity/icons/Play'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

// "Sections" are the building blocks Becca can add, remove and reorder on her pages.
// To add a NEW kind of section: create it here, add it to SECTION_TYPES, and add a
// matching component in site/src/components/sections/.

const common = (heading) => [
  defineField({name: 'heading', title: 'Heading', type: 'string', initialValue: heading}),
  defineField({
    name: 'background',
    title: 'Background',
    type: 'string',
    initialValue: 'auto',
    options: {
      layout: 'radio',
      direction: 'horizontal',
      list: [
        {title: 'Automatic', value: 'auto'},
        {title: 'White', value: 'plain'},
        {title: 'Light color', value: 'tint'},
        {title: 'Bold color', value: 'bold'},
      ],
    },
    description: 'Automatic alternates white and light color down the page.',
  }),
  defineField({
    name: 'hidden',
    title: 'Hide this section for now',
    type: 'boolean',
    initialValue: false,
    description: 'Turn on to hide it from the website without deleting it.',
  }),
]

const preview = (fallback) => ({
  select: {heading: 'heading', hidden: 'hidden'},
  prepare: ({heading, hidden}) => ({
    title: heading || fallback,
    subtitle: `${fallback}${hidden ? ' · HIDDEN' : ''}`,
  }),
})

export const upcomingSection = defineType({
  name: 'upcomingSection',
  title: 'Upcoming / now playing',
  type: 'object',
  icon: CalendarIcon,
  fields: [...common('Now Playing'), defineField({name: 'events', title: 'Shows / events', type: 'array', of: [{type: 'event'}]})],
  preview: preview('Upcoming / now playing'),
})

export const reelsSection = defineType({
  name: 'reelsSection',
  title: 'Featured videos',
  type: 'object',
  icon: PlayIcon,
  description: 'Shows the videos marked "Show on the Home page" from the Reels page.',
  fields: [...common('Reels')],
  preview: preview('Featured videos'),
})

export const quotesSection = defineType({
  name: 'quotesSection',
  title: 'Press & quotes',
  type: 'object',
  icon: CommentIcon,
  fields: [...common('Press'), defineField({name: 'quotes', title: 'Quotes', type: 'array', of: [{type: 'quote'}]})],
  preview: preview('Press & quotes'),
})

export const projectsSection = defineType({
  name: 'projectsSection',
  title: 'Featured projects',
  type: 'object',
  icon: ProjectsIcon,
  description: 'Shows the projects marked "Feature on the Home page".',
  fields: [...common('Projects')],
  preview: preview('Featured projects'),
})

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Photo gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    ...common('Gallery'),
    defineField({name: 'photos', title: 'Photos', type: 'array', of: [{type: 'photo'}], options: {layout: 'grid'}}),
  ],
  preview: preview('Photo gallery'),
})

export const textSection = defineType({
  name: 'textSection',
  title: 'Text block',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    ...common(''),
    defineField({name: 'body', title: 'Text', type: 'blockContent'}),
    defineField({name: 'buttons', title: 'Buttons (optional)', type: 'array', of: [{type: 'linkButton'}]}),
  ],
  preview: preview('Text block'),
})

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact & representation',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'Shows your email and agents from Site settings.',
  fields: [...common('Contact'), defineField({name: 'intro', title: 'Short intro (optional)', type: 'text', rows: 2})],
  preview: preview('Contact & representation'),
})

export const sectionTypes = [
  upcomingSection,
  reelsSection,
  quotesSection,
  projectsSection,
  gallerySection,
  textSection,
  contactSection,
]

export const sectionsField = (description) =>
  defineField({
    name: 'sections',
    title: 'Page sections',
    type: 'array',
    description: description || 'Add, remove and drag to reorder the sections on this page.',
    of: sectionTypes.map((t) => ({type: t.name})),
  })
