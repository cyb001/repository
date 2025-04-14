import React from 'react';
import { Dropdown, Menu, Divider } from 'antd';
import { MoreOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './Card.module.css';
import { formatTimestamp } from "@/app/qianmo/tools/func"
import { TagOutlined } from "@ant-design/icons"

import type { App } from '@/types/app';
import type { Tag } from '@/app/components/base/tag-management/constant'
interface Props {
  data: App;
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
  onDesign?: (data: any) => void;
}

let mode: { [key: string]: any } = {
  "chat": "聊天助手",
  "agent-chat": "Agent",
  "completion": "文本生成应用",
  "advanced-chat": "ChatFlow",
  "workflow": "工作流"
};

const formatTags = (tags: Tag[]) => {
  if(!tags || tags.length === 0) {
    return '无标签'
  }
  return tags.map(item => item.name).join("、")
}

const CardComponent: React.FC<Props> = ({ data, onEdit, onDelete, onDesign }) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'edit':
        onEdit?.(data);
        break;
      case 'delete':
        onDelete?.(data);
        break;
      case 'design':
        onDesign?.(data);
        break;
      default:
        break;
    }
  };

  const renderMoreMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" style={{ color: '#606266' }}>编辑</Menu.Item>
      <Divider style={{ margin: 0 }} />
      <Menu.Item key="delete" style={{ color: '#E53241' }}>删除</Menu.Item>
    </Menu>
  );

  const renderConfigMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="design" style={{ color: '#606266' }}>设计</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 
          onClick={() => onEdit?.(data)} 
          className={styles.heading} 
          title={data.name}
        >
          {data.name}
        </h2>
        <p className={styles.description} title={data.description || data.mode}>
          {data.description || data.mode}
        </p>
        <div className={styles.userInfo}>
          <button className={styles.agentBtn}>
            {mode[data.mode]}
          </button>
          <span 
            className={styles.time} 
            title={formatTags(data.tags)}
          >
            <TagOutlined /> {formatTags(data.tags)}
          </span>
        </div>
      </div>
      <div className={styles.icon}>
        <img
          src={`/images/icon/workflow.png`}
          alt="图标"
          className={styles.iconImage}
        />
        
          <Dropdown overlay={renderMoreMenu} trigger={['click']}>
          <div className={styles.actionBtn}>
            <MoreOutlined 
              className={styles.iconBtn} 
              title="更多" 
            />
            </div>
          </Dropdown>
        
        <div className={styles.actionBtn} style={{ marginRight: 10 }}>
          <Dropdown overlay={renderConfigMenu} trigger={['click']}>
            <SettingOutlined 
              className={styles.iconBtn} 
              title="设计" 
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;