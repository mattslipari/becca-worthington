/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    /** True when the page is being shown inside the editor's live preview (drafts + click-to-edit). */
    preview: boolean
  }
}
