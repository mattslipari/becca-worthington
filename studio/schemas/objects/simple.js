import {defineField, defineType} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Describe the photo',
      type: 'string',
      description: 'A short description for people using screen readers, e.g. "Becca smiling in a red top".',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
    }),
  ],
})

export const linkButton = defineType({
  name: 'linkButton',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Button text', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'url',
      title: 'Where it goes',
      type: 'url',
      description: 'A full web address (https://…) or an email (mailto:you@example.com).',
      validation: (r) => r.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
    }),
  ],
})

export const reel = defineType({
  name: 'reel',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'url',
      title: 'YouTube or Vimeo link',
      type: 'url',
      description: 'In the YouTube app: Share → Copy link, then paste it here.',
      validation: (r) =>
        r.required().custom((url) =>
          !url || /youtu\.?be|vimeo\.com/.test(url) ? true : 'Please paste a YouTube or Vimeo link',
        ),
    }),
    defineField({
      name: 'category',
      title: 'Type of video',
      type: 'string',
      options: {
        list: ['Acting', 'Comedy', 'Singing', 'Dance', 'Performance', 'Other'],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({name: 'note', title: 'Short description (optional)', type: 'string'}),
    defineField({
      name: 'featured',
      title: 'Show on the Home page?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'category'}},
})

export const credit = defineType({
  name: 'credit',
  title: 'Credit',
  type: 'object',
  fields: [
    defineField({name: 'production', title: 'Show / film', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'company', title: 'Theatre / company / director', type: 'string'}),
    defineField({name: 'year', title: 'Year (optional)', type: 'string'}),
  ],
  preview: {
    select: {title: 'production', role: 'role', company: 'company'},
    prepare: ({title, role, company}) => ({title, subtitle: [role, company].filter(Boolean).join(' · ')}),
  },
})

export const creditGroup = defineType({
  name: 'creditGroup',
  title: 'Credits section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      description: 'e.g. Theatre, Film & TV, Concerts, Training',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [{type: 'credit'}],
      description: 'Drag the handle to reorder.',
    }),
  ],
  preview: {
    select: {title: 'heading', credits: 'credits'},
    prepare: ({title, credits}) => ({title, subtitle: `${credits?.length || 0} credits`}),
  },
})

export const representative = defineType({
  name: 'representative',
  title: 'Agent / manager',
  type: 'object',
  fields: [
    defineField({name: 'agency', title: 'Agency name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'region', title: 'Region / type', type: 'string', description: 'e.g. "Los Angeles", "NYC & Atlanta – Commercial"'}),
    defineField({name: 'contactName', title: 'Agent name (optional)', type: 'string'}),
    defineField({name: 'email', title: 'Email (optional)', type: 'email'}),
    defineField({name: 'phone', title: 'Phone (optional)', type: 'string'}),
    defineField({name: 'website', title: 'Website (optional)', type: 'url'}),
  ],
  preview: {select: {title: 'agency', subtitle: 'region'}},
})

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({name: 'text', title: 'Quote', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'source', title: 'Who said it / publication', type: 'string'}),
    defineField({name: 'link', title: 'Link to article (optional)', type: 'url'}),
  ],
  preview: {select: {title: 'text', subtitle: 'source'}},
})

export const event = defineType({
  name: 'event',
  title: 'Show / event',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Show / event', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role (optional)', type: 'string'}),
    defineField({name: 'where', title: 'Where', type: 'string', description: 'Theatre and city'}),
    defineField({name: 'when', title: 'When', type: 'string', description: 'Written however you like, e.g. "March 3 – 22, 2027"'}),
    defineField({name: 'link', title: 'Tickets / info link (optional)', type: 'url'}),
    defineField({name: 'image', title: 'Image (optional)', type: 'photo'}),
  ],
  preview: {select: {title: 'title', subtitle: 'when', media: 'image'}},
})
