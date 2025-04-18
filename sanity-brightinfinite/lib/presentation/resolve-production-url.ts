import {defineLocations} from 'sanity/presentation'

export default defineLocations({
  select: {
    title: 'title',
    slug: 'slug.current',
    _type: '_type',
  },
  resolve: (doc) => {
    console.log('Resolving document:', doc)

    if (!doc?.slug?.current) {
      return {locations: []}
    }

    // For album documents, return both the album page and albums index
    if (doc._type === 'album') {
      const albumPath = `/album/${doc.slug.current}`
      console.log('Resolving album path:', albumPath)

      return {
        locations: [
          {
            title: doc.title || 'Untitled',
            href: albumPath,
          },
          {
            title: 'All Albums',
            href: '/albums',
          },
        ],
      }
    }

    return {locations: []}
  },
})
