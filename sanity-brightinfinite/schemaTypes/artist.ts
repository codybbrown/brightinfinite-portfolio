import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artists',
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
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'instruments',
      title: 'Instruments',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'instrument'}],
        },
      ],
    }),
    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'genre'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    },
  },
})
