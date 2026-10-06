import {defineField, defineType} from 'sanity'

const buttonFields = [
  defineField({
    name: 'label',
    title: 'Text',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'href',
    title: 'Link',
    type: 'string',
    description: 'A page on the site, for example /shop/tea',
    validation: (rule) =>
      rule
        .required()
        .custom((value) =>
          !value || value.startsWith('/') ? true : 'Start the link with /, for example /shop/tea',
        ),
  }),
]

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Small text above heading',
          type: 'string',
          description: 'For example: Small-batch tea & coffee',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'primaryButton',
          title: 'Main button (dark)',
          type: 'object',
          fields: buttonFields,
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Second button (outlined)',
          type: 'object',
          fields: buttonFields,
        }),
        defineField({
          name: 'image',
          title: 'Background image',
          type: 'image',
          description: 'Leave empty to use the default image.',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home page'}),
  },
})