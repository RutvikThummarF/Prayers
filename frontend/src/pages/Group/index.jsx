import React from 'react';

import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import GroupForm from '@/forms/GroupForm';
export default function Group() {
  const translate = useLanguage();
  const entity = 'group';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const dataTableColumns = [
    {
      title: translate('group name'),
      dataIndex: 'name',
    },
  ];

  const readColumns = [
    {
      title: translate('group name'),
      dataIndex: 'name',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('group'),
    DATATABLE_TITLE: translate('group_list'),
    ADD_NEW_ENTITY: translate('add_new_group'),
    ENTITY_NAME: translate('group'),
    CREATE_ENTITY: translate('save'),
    UPDATE_ENTITY: translate('update'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<GroupForm />}
      updateForm={<GroupForm isUpdateForm={true} />}
      config={config}
    />
  );
}
