import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HomeIcon} from '@sanity/icons/Home'
import {PlayIcon} from '@sanity/icons/Play'
import {blockContent} from './objects/blockContent'
import {credit, creditGroup, event, linkButton, photo, quote, reel, representative} from './objects/simple'
import {sectionTypes} from './objects/sections'
import {settings} from './singletons/settings'
import {home, reelsPage, resume} from './singletons/pages'
import {project} from './documents/project'

// Pages that exist exactly once. Order here = order in the editor's menu.
export const SINGLETONS = [
  {id: 'home', title: 'Home page', icon: HomeIcon},
  {id: 'resume', title: 'Resume & headshots', icon: DocumentTextIcon},
  {id: 'reelsPage', title: 'Reels & videos', icon: PlayIcon},
  {id: 'settings', title: 'Site settings', icon: CogIcon},
]

export const schemaTypes = [
  // pages
  home,
  resume,
  reelsPage,
  settings,
  project,
  // building blocks
  blockContent,
  photo,
  linkButton,
  reel,
  credit,
  creditGroup,
  representative,
  quote,
  event,
  ...sectionTypes,
]
