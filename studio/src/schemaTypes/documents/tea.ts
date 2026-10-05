import {defineField, defineType} from 'sanity'  

export const tea = defineType({
  name: 'tea',
  title: 'Tea',
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
        name: 'oxidationLevel',
        title: 'Oxidation Level',
        type: 'string',
    }),
    defineField({
        name: 'teaType',
        title: 'Tea Type',
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