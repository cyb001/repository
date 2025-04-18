import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface ModalProps {
  visible: boolean;
  onOk: (name: string) => void;
  onCancel: () => void;
}

export default function KnowledgeCreatingModal({ visible, onOk, onCancel }: ModalProps) {
  const [form] = Form.useForm<{ name: string }>(); // 指定泛型类型
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleOk = () => {
    form.validateFields().then(values => {
      onOk(values.name);
    });
  };

  const handleFormChange = () => {
    const name = form.getFieldValue('name');
    setIsButtonDisabled(!(name?.trim() || false)); // 增加空字符串判断
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ name: '' }); 
    }
  }, [visible, form]);

  return (
    <Modal
      title="创建知识库"
      onOk={handleOk}
      onCancel={onCancel}
      okText="创建" 
      cancelText="取消"
      okButtonProps={{ 
        disabled: isButtonDisabled,
        className: 'create-btn'
      }}
      cancelButtonProps={{ className: 'cancel-btn' }}
    >
      {/* 增加key保证表单实例唯一性 */}
      <Form
        key="knowledge-create-form" 
        form={form}  // 确保form属性正确传递
        layout="vertical"
        initialValues={{ name: '' }}
        className="knowledge-modal-form"
        onValuesChange={handleFormChange}
      >
        <Form.Item
          name="name"
          label="知识库名称"
          rules={[{ required: true, message: '请输入知识库名称' }]}
        >
          <Input
            placeholder="请输入知识库名称（必填，最多50字）"
            allowClear
            maxLength={50}
            autoComplete="off"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}