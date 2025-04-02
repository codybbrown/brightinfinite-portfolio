// sanity/schemas/music.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'album',
      title: 'Album',
      type: 'reference',
      to: [{type: 'album'}],
      description: 'The album this track belongs to',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: {hotspot: true},
      description: 'If left empty, album cover will be used',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Composition', value: 'composition'},
          {title: 'Performance', value: 'performance'},
          {title: 'Production', value: 'production'},
          {title: 'Recording', value: 'recording'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      description: 'Upload MP3 or other audio file directly',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Optional: Embed code from SoundCloud, Spotify, etc.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'instruments',
      title: 'Instruments',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of instruments used in this track',
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'role', type: 'string', title: 'Role'},
          ],
        },
      ],
    }),
    defineField({
      name: 'trackNumber',
      title: 'Track Number',
      type: 'number',
      description: 'Position in the album',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this work prominently in the portfolio',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'album.title',
      media: 'coverArt',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `Album: ${subtitle}` : '',
        media,
      }
    },
  },
})
