import {defineField, defineType} from 'sanity'

// One filter group: which product field to filter by, and how to label it
const filterGroup = {
  type: 'object',
  name: 'filterGroup',
  fields: [
    defineField({
      name: 'field',
      title: 'Filter by',
      type: 'string',
      options: {
        list: [
          {title: 'Origin', value: 'origin'},
          {title: 'Roast / oxidation level', value: 'level'},
          {title: 'In stock', value: 'inStock'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label on the page',
      type: 'string',
      description: 'For example: Origin, Country, Roast level',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'field'},
  },
}

// The same filter can't be added twice on one page
const noDuplicates = (groups?: {field?: string}[]) => {
  const fields = (groups ?? []).map((group) => group.field)
  return new Set(fields).size === fields.length ? true : 'Each filter can only be added once'
}

export const shopFilters = defineType({
  name: 'shopFilters',
  title: 'Shop filters',
  type: 'document',
  fields: [
    defineField({
      name: 'coffee',
      title: 'Coffee page',
      description: 'Drag to change the order. Options come from the products.',
      type: 'array',
      of: [filterGroup],
      validation: (rule) => rule.custom(noDuplicates),
    }),
    defineField({
      name: 'tea',
      title: 'Tea page',
      description: 'Drag to change the order. Options come from the products.',
      type: 'array',
      of: [filterGroup],
      validation: (rule) => rule.custom(noDuplicates),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Shop filters'}),
  },
})