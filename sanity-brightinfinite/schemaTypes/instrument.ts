import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'instrument',
  title: 'Instruments',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'String', value: 'string'},
          {title: 'Wind', value: 'wind'},
          {title: 'Percussion', value: 'percussion'},
          {title: 'Keyboard', value: 'keyboard'},
          {title: 'Electronic', value: 'electronic'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
})
