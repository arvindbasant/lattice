import { WidgetCategory } from '../store/flow/flow-types';

export const FLOW_SOURCE_TYPES = [
    {
      category: WidgetCategory.Import,
      name: 'file',
      icon: 'file'
    },
    {
      category: WidgetCategory.Import,
      name: 'json api',
      icon: 'global'
    },
    {
      category: WidgetCategory.Import,
      name: 'sql',
      icon: 'database'
    },
    {
      category: WidgetCategory.Import,
      name: 'salesforce',
      icon: 'cloud'
    },
    {
      category: WidgetCategory.Import,
      name: 'dropbox',
      icon: 'dropbox'
    },
    {
      category: WidgetCategory.Transform,
      name: 'filter',
      icon: 'filter'
    },
    {
      category: WidgetCategory.Transform,
      name: 'reorder',
      icon: 'swap'
    },
    {
      category: WidgetCategory.Transform,
      name: 'manage',
      icon: 'bars'
    },
    {
      category: WidgetCategory.Transform,
      name: 'merge',
      icon: 'shrink'
    },
    {
      category: WidgetCategory.Persist,
      name: 'download',
      icon: 'download'
    },
    {
      category: WidgetCategory.Persist,
      name: 'sql',
      icon: 'database'
    },
    {
      category: WidgetCategory.Persist,
      name: 'salesforce',
      icon: 'cloud'
    },
    {
      category: WidgetCategory.Persist,
      name: 'dropbox',
      icon: 'dropbox'
    },
    {
      category: WidgetCategory.Persist,
      name: 'live',
      icon: 'play-circle'
    }
  ];
