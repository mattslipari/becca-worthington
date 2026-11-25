import {defineArrayMember, defineType} from 'sanity'

// Simple rich text: paragraphs, a couple of heading sizes, bold/italic and links.
// Deliberately limited so text always looks good on the site.
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullets', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'Web address',
                validation: (r) => r.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
              },
            ],
          },
        ],
      },
    }),
  ],
})
