import {defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons/Projects'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click "Generate" – this becomes becca-worthington.com/projects/…',
      options: {source: 'title', maxLength: 80},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'What kind of project?',
      type: 'string',
      description: 'A short label, e.g. "Original work", "Cast recording", "Short film"',
    }),
    defineField({name: 'coverImage', title: 'Cover image', type: 'photo'}),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences, shown on the project card.',
    }),
    defineField({name: 'body', title: 'Full description (optional)', type: 'blockContent'}),
    defineField({name: 'videoUrl', title: 'YouTube or Vimeo link (optional)', type: 'url'}),
    defineField({name: 'links', title: 'Buttons (optional)', type: 'array', of: [{type: 'linkButton'}]}),
    defineField({
      name: 'featured',
      title: 'Feature on the Home page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order (optional)',
      type: 'number',
      description: 'Lower numbers show first. Leave blank to sort newest-first.',
    }),
  ],
  orderings: [{title: 'Sort order', name: 'sortOrder', by: [{field: 'sortOrder', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'kind', media: 'coverImage'}},
})
