import { defineField, defineType } from "sanity";

export const homePage = defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', validation: (rule) => rule.required() },
                { name: 'text', type: 'text', rows: 3 },
                {
                    name: 'image',
                    type: 'image',
                    options: { hotspot: true }, // allows to change image "position"
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alt text', validation: (rule) => rule.required() },
                    ],
                },
                { name: 'ctaLabel', type: 'string', title: 'Button text' },
                { name: 'ctaHref', type: 'string', title: 'Button link' },
            ],
        }),
    ]
})