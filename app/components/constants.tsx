
export const FLOW_SOURCE_TYPES: Array<{discriminator: 'IMPORT_WIDGET' | 'TRANSFORM_WIDGET' | 'PERSIST_WIDGET', name: string, icon: string}> = [
    {
      discriminator: 'IMPORT_WIDGET',
      name: 'file',
      icon: 'file'
    },
    {
      discriminator: 'IMPORT_WIDGET',
      name: 'json api',
      icon: 'global'
    },
    {
      discriminator: 'IMPORT_WIDGET',
      name: 'sql',
      icon: 'database'
    },
    {
      discriminator: 'IMPORT_WIDGET',
      name: 'salesforce',
      icon: 'cloud'
    },
    {
      discriminator: 'IMPORT_WIDGET',
      name: 'dropbox',
      icon: 'dropbox'
    },
    {
      discriminator: 'TRANSFORM_WIDGET',
      name: 'filter',
      icon: 'filter'
    },
    {
      discriminator: 'TRANSFORM_WIDGET',
      name: 'reorder',
      icon: 'swap'
    },
    {
      discriminator: 'TRANSFORM_WIDGET',
      name: 'manage',
      icon: 'bars'
    },
    {
      discriminator: 'TRANSFORM_WIDGET',
      name: 'merge',
      icon: 'shrink'
    },
    {
      discriminator: 'PERSIST_WIDGET',
      name: 'download',
      icon: 'download'
    },
    {
      discriminator: 'PERSIST_WIDGET',
      name: 'sql',
      icon: 'database'
    },
    {
      discriminator: 'PERSIST_WIDGET',
      name: 'salesforce',
      icon: 'cloud'
    },
    {
      discriminator: 'PERSIST_WIDGET',
      name: 'dropbox',
      icon: 'dropbox'
    },
    {
      discriminator: 'PERSIST_WIDGET',
      name: 'live',
      icon: 'play-circle'
    }
  ];
