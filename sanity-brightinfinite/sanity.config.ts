import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {DocumentActionComponent, DocumentActionProps} from 'sanity'
import resolveProductionUrl from './lib/presentation/resolve-production-url'

interface AlbumDocument {
  slug?: {
    current?: string
  }
}

// Log the environment variable to verify it's being loaded
console.log('Preview secret:', process.env.SANITY_PREVIEW_SECRET ? 'Present' : 'Missing')

export default defineConfig({
  name: 'default',
  title: 'NextJS BrightInfinite',

  projectId: 'atrmw6v8',
  dataset: 'production',
  apiVersion: '2023-05-03',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve: {
        locations: {
          album: resolveProductionUrl,
          artist: resolveProductionUrl,
          track: resolveProductionUrl,
          instrument: resolveProductionUrl,
        },
      },
      previewUrl: {
        origin: 'http://localhost:3000',
        previewMode: {
          enable: '/api/preview',
          disable: '/api/preview/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev: DocumentActionComponent[], {schemaType}) => {
      if (schemaType === 'album') {
        const viewOnSiteAction: DocumentActionComponent = (props: DocumentActionProps) => {
          const {published} = props
          const slug = (published as AlbumDocument)?.slug?.current

          if (!slug) return null

          return {
            label: 'View on site',
            onHandle: () => {
              window.open(`http://localhost:3000/album/${slug}`, '_blank')
            },
          }
        }

        return [...prev, viewOnSiteAction]
      }
      return prev
    },
  },
})
