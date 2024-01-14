import { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Tag } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

const { Paragraph } = Typography;

export default function PostForm({ current = null }) {
  const translate = useLanguage();
  const [body, setBody] = useState(current?.body);

  const displayLabels = (labels = []) => (
    <>
      {labels.map((label, index) => (
        <Tag key={`${index}-${index}`} onClick={() => setBody(body)} color="blue">
          {label}
        </Tag>
      ))}
    </>
  );

  const setBodyValue = (value) => {
    setBody(value);
    current.body = value;
  };

  return (
    <Row>
      <Col className="gutter-row" span={24}>
        <Form.Item label={translate('Title')} name="title">
          <Input />
        </Form.Item>
        <Form.Item label={translate('Post Content')} name="body">
          <ReactQuill theme="snow" value={body} onChange={setBodyValue} />
        </Form.Item>
      </Col>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          {translate('Update')}
        </Button>
      </Form.Item>
    </Row>
  );
}
