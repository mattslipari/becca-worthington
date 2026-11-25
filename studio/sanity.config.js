import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {presentationOptions} from './presentation'
import {schemaTypes, SINGLETONS} from './schemas'
import {structure} from './structure'

// The project ID comes from sanity.io/manage once the Sanity project is created.
// It is not a secret – it is safe to have in the code.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '5w8bw6qn'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const singletonIds = new Set(SINGLETONS.map((s) => s.id))

export default defineConfig({
  name: 'default',
  title: 'Becca Worthington – Website',
  projectId,
  dataset,
  plugins: [
    // "Live preview": the real website with click-to-edit, shown first so it's the default view
    presentationTool(presentationOptions),
    structureTool({structure, title: 'Edit content'}),
    // "Vision" is a developer tool for testing queries. Hidden from the menu unless you are an admin.
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Hide singleton pages from the global "Create new document" menu
    templates: (templates) => templates.filter(({schemaType}) => !singletonIds.has(schemaType)),
  },
  document: {
    // Singletons can't be duplicated or deleted – there's only ever one Home page, etc.
    actions: (input, context) =>
      singletonIds.has(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
