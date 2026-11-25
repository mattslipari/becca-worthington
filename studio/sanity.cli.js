import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5w8bw6qn',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // The editor will live at https://<studioHost>.sanity.studio
  studioHost: 'becca-worthington',
  deployment: {appId: 'vpww0rwugz8x8ur6lz03ekjk', autoUpdates: true},
})
