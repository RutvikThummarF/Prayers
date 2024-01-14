import React from 'react';
import { Form, Input, Select } from 'antd';
import SelectAsync from '@/components/SelectAsync';
import useLanguage from '@/locale/useLanguage';

export default function GroupForm() {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        name="name"
        label={translate('group name')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label={translate('assign users')}
        name="assignusers"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SelectAsync
          entity={'admin'}
          displayLabels={['name', 'surname']}
          loadDefault={true}
          withRedirect={false}
        ></SelectAsync>
      </Form.Item> */}
    </>
  );
}
