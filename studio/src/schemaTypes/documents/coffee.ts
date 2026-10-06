import {defineField, defineType} from 'sanity'  
import { sharedProductFields } from './sharedProductFields';

export const coffee = defineType({
  name: 'coffee',
  title: 'Coffee',
  type: 'document',
  fields: [
    ...sharedProductFields,

    defineField({
        name: 'roastLevel',
        title: 'Roast Level',
        type: 'string',
    }),

  ]
});