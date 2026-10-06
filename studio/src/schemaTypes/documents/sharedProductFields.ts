export const sharedProductFields = [
  {
    name: 'image',
    title: 'Image',
    type: 'image',
  },
  {
    name: 'name',
    title: 'Name',
    type: 'string',
  },
  {
    name: 'origin',
    title: 'Origin',
    type: 'string',
  },
  {
    name: 'flavorNotes',
    title: 'Flavor Notes',
    type: 'array',
    of: [{type: 'string'}],
  },
    {
        name: 'price',  
        title: 'Price',
        type: 'number',
    },
    {
        name: 'available',
        title: 'Available',
        type: 'boolean',
    },
    {
        name: 'description',
        title: 'Description',
        type: 'text',   
    },
    {
        name: 'processingMethod',
        title: 'Processing Method',
        type: 'string',
    },
    {
        name: 'brewingInstructions',
        title: 'Brewing Instructions',
        type: 'text',
    }

];