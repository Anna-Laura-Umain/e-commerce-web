import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  icon: PackageIcon,
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'roastLevel',
      title: 'Roast Level',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'flavorNotes',
      title: 'Flavor Notes',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),

    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'origin',
      media: 'image',
    },
  },
})
