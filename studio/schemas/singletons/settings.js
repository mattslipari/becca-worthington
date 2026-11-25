import {defineField, defineType} from 'sanity'

export const THEMES = [
  {title: 'Seafoam – mint to sky blue (like the original site)', value: 'seafoam'},
  {title: 'Sunset – warm peach and rose', value: 'sunset'},
  {title: 'Midnight – dark and dramatic', value: 'midnight'},
  {title: 'Paper – clean cream and black', value: 'paper'},
]

export const settings = defineType({
  name: 'settings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'look', title: 'Look & feel'},
    {name: 'contact', title: 'Contact & agents'},
    {name: 'social', title: 'Social links'},
    {name: 'seo', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'name', title: 'Your name', type: 'string', group: 'basics', validation: (r) => r.required()}),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basics',
      description: 'Shown under your name, e.g. "Indigenous Actor, Singer, & Dancer"',
    }),
    defineField({
      name: 'theme',
      title: 'Color theme',
      type: 'string',
      group: 'look',
      options: {list: THEMES, layout: 'radio'},
      initialValue: 'seafoam',
    }),
    defineField({
      name: 'showSparkles',
      title: 'Show sparkle decorations',
      type: 'boolean',
      group: 'look',
      initialValue: true,
    }),
    defineField({name: 'email', title: 'Your email', type: 'email', group: 'contact'}),
    defineField({
      name: 'representatives',
      title: 'Representation',
      type: 'array',
      group: 'contact',
      of: [{type: 'representative'}],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      group: 'social',
      description: 'Paste the full link to each profile. Leave blank to hide.',
      fields: [
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'tiktok', title: 'TikTok', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'},
        {name: 'imdb', title: 'IMDb', type: 'url'},
        {name: 'backstage', title: 'Backstage', type: 'url'},
        {name: 'actorsAccess', title: 'Actors Access', type: 'url'},
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description for Google',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'One or two sentences. Shows up under your name in Google results.',
      validation: (r) => r.max(170).warning('Google cuts off descriptions longer than ~160 characters'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Sharing image',
      type: 'image',
      group: 'seo',
      description: 'Shown when the site is shared in texts or on social media. A headshot works great.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
