import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'genre',
  title: 'Genres',
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
      name: 'parent',
      title: 'Parent Genre',
      type: 'reference',
      to: [{type: 'genre'}],
      description: 'Optional parent genre for sub-genres',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parent.name',
    },
  },
})
