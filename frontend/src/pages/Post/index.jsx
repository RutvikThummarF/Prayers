import React from 'react';
import useLanguage from '@/locale/useLanguage';
import PostDataTableModule from '@/modules/PostModule/PostDataTableModule';

export default function AdvancedSettings() {
  const translate = useLanguage();
  const entity = 'post';
  const searchConfig = {
    displayLabels: ['title'],
    searchFields: 'title',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['title'];

  const readColumns = [
    {
      title: translate('Title'),
      dataIndex: 'title',
    },
    {
      title: translate('post content'),
      dataIndex: 'body',
    },
  ];
  const dataTableColumns = [
    {
      title: translate('Is Reported?'),
      dataIndex: 'isrepoted',
      key: 'isrepoted',
    },
    {
      title: translate('Title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: translate('post content'),
      dataIndex: 'body',
      key: 'body',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Title'),
    DATATABLE_TITLE: translate('post_list'),
    ADD_NEW_ENTITY: translate('add_new_post'),
    ENTITY_NAME: translate('post'),
    CREATE_ENTITY: translate('save'),
    UPDATE_ENTITY: translate('update'),
  };

  const configPage = {
    entity,
    create: false,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <PostDataTableModule config={config} />;
}
