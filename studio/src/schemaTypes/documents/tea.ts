import {defineField, defineType} from 'sanity'  
import { sharedProductFields } from './sharedProductFields'

export const tea = defineType({
  name: 'tea',
  title: 'Tea',
  type: 'document',
  fields: [
    ...sharedProductFields,
    
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
    
  ]
});