import {SINGLETONS} from './schemas'

// Controls the left-hand menu Becca sees in the editor.
export const structure = (S) =>
  S.list()
    .title('My website')
    .items([
      ...SINGLETONS.map(({id, title, icon}) =>
        S.listItem()
          .title(title)
          .id(id)
          .icon(icon)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
    ])
