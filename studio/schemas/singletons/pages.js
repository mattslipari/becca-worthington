import {defineField, defineType} from 'sanity'
import {sectionsField} from '../objects/sections'

export const home = defineType({
  name: 'home',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroPhotos',
      title: 'Headshots at the top',
      type: 'array',
      of: [{type: 'photo'}],
      options: {layout: 'grid'},
      description: 'Add one or more. If there are several, they rotate as a slideshow. Drag to reorder.',
      validation: (r) => r.min(1).error('Add at least one photo'),
    }),
    defineField({name: 'bioHeading', title: 'Bio heading', type: 'string', initialValue: 'About me'}),
    defineField({name: 'bio', title: 'Bio', type: 'blockContent'}),
    sectionsField('Everything below the bio. Add, remove and drag to reorder.'),
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})

export const resume = defineType({
  name: 'resume',
  title: 'Resume & headshots',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro (optional)', type: 'text', rows: 2}),
    defineField({
      name: 'resumePdf',
      title: 'Resume PDF',
      type: 'file',
      options: {accept: 'application/pdf'},
      description: 'Upload your latest resume. Visitors get a "Download resume" button.',
    }),
    defineField({
      name: 'headshots',
      title: 'Headshots',
      type: 'array',
      of: [{type: 'photo'}],
      options: {layout: 'grid'},
      description: 'Visitors can view and download these in full quality.',
    }),
    defineField({
      name: 'creditGroups',
      title: 'Credits',
      type: 'array',
      of: [{type: 'creditGroup'}],
      description: 'Your credits, shown on the page as a resume. Group them however you like (Theatre, Film & TV…).',
    }),
    defineField({
      name: 'skills',
      title: 'Special skills (optional)',
      type: 'text',
      rows: 3,
    }),
    sectionsField('Optional extra sections at the bottom of the page.'),
  ],
  preview: {prepare: () => ({title: 'Resume & headshots'})},
})

export const reelsPage = defineType({
  name: 'reelsPage',
  title: 'Reels & videos',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro (optional)', type: 'text', rows: 2}),
    defineField({
      name: 'reels',
      title: 'Videos',
      type: 'array',
      of: [{type: 'reel'}],
      description: 'The first video is shown largest. Drag to reorder.',
    }),
    sectionsField('Optional extra sections at the bottom of the page.'),
  ],
  preview: {prepare: () => ({title: 'Reels & videos'})},
})
