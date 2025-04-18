import './index.scss';
import { Card, Badge, Button, Dropdown, Menu, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';

interface KnowledgeCardProps {
  item: { id: string; nickname: string; avatar: string; name: string; description: string; doc_num: number; update_time: string; };
  onDelete: (id: string) => void;
  isOwner: boolean;
}

export default function KnowledgeCard({ item, onDelete, isOwner }: KnowledgeCardProps) {

  const handleDelete = () => {
    if (!isOwner) return;
    onDelete(item.id);
  };

  const renderDropdown = isOwner ? (
    <Dropdown
      menu={{
        items: [
          {
            key: 'delete',
            label: (
              <Popconfirm
                title="确认删除？"
                description={`将永久删除「${item.name}」知识库`}
                onConfirm={handleDelete}
                okText="删除"
                cancelText="取消"
              >
                <div>
                  <DeleteOutlined twoToneColor="#ff4d4f" />
                  <span className="menu-text">删除</span>
                </div>
              </Popconfirm>
            ),
          },
        ],
      }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Button type="text" icon={<EllipsisOutlined />} className="more-btn" onClick={(e) => e.stopPropagation()} />
    </Dropdown>
  ) : null;

  return (
    <Card className="card" hoverable>
      <Badge.Ribbon
        text={item.nickname}
        color={isOwner ? '#1677ff' : '#ff6b6b'}
        className="ribbon"
        placement="end"
      >
        <div className="cardContent">
          <div className="header">
            <div className="avatar">{item.avatar}</div>
          </div>
          <h3 className="title">{item.name}</h3>
          <p className="description">{item.description}</p>
          <div className="footer flex items-center justify-between gap-4 px-2 py-1 border-t border-gray-200 dark:border-gray-700">
            <div className="tags items-center gap-4">
              <span className="tag">📄 {item.doc_num} 篇文档</span>
              <br/>
              <span className="tag">📅 更新于 {item.update_time}</span>
            </div>
            <div className="dropdown md:order-2">
              {renderDropdown}
            </div>
          </div>
        </div>
      </Badge.Ribbon>
    </Card>
  );
}