import './index.scss';
import { Card, Badge, Button, Dropdown, Menu } from 'antd';
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';

interface KnowledgeCardProps {
  item: {
    nickname: string;
    avatar: string;
    name: string;
    description: string;
    doc_num: number;
    update_time: string;
  };
  onDelete: () => void;
  isOwner: boolean;
}

export default function KnowledgeCard({ item, onDelete, isOwner }: KnowledgeCardProps) {
  const menu = (
    <Menu>
      {isOwner && (
        <Menu.Item 
          key="delete" 
          icon={<DeleteOutlined />}
          onClick={onDelete}
        >
          删除知识卡片
        </Menu.Item>
      )}
    </Menu>
  );

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
          <div className="footer">
            <span className="tag">📄 {item.doc_num} 篇文档</span>
            <span className="tag">📅 更新于 {item.update_time}</span>
            <Dropdown 
              menu={menu} 
              placement="bottomRight"
              trigger={['click']}
            >
              <Button 
                type="text" 
                icon={<EllipsisOutlined />}
                className="more-btn"
              />
            </Dropdown>
          </div>
        </div>
      </Badge.Ribbon>
    </Card>
  );
}
