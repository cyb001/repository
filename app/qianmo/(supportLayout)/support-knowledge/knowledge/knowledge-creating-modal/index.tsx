import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface ModalProps {
  visible: boolean;
  onOk: (name: string) => void;
  onCancel: () => void;
}

export default function KnowledgeCreatingModal({ visible, onOk, onCancel }: ModalProps) {
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleOk = () => {
    form.validateFields().then(values => {
      onOk(values.name);
    });
  };

  // 监听表单值变化，更新按钮的可点击状态
  const handleFormChange = () => {
    const name = form.getFieldValue('name');
    setIsButtonDisabled(!name?.trim());
  };

  // 监听 visible 变化，重置表单
  useEffect(() => {
    if (visible) {
      form.resetFields(); // 重置表单
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: '' }}  // 默认值为空
        className="knowledge-modal-form"
        onValuesChange={handleFormChange}  // 监听表单值变化
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
