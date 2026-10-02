import {defineField, defineType} from 'sanity'  

export const coffee = defineType({
  name: 'coffee',
  title: 'Coffee',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'string',
    }),
    defineField({
        name: 'roastLevel',
        title: 'Roast Level',
        type: 'string',
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
    }),
    defineField({
        name: 'available',
        title: 'Available',
        type: 'boolean',
    })
  ]
});