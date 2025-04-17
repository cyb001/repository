import styles from './index.less';
import { Badge } from 'antd'; // 仅保留样式，无功能依赖

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
  return (
    <div className={styles.card}>
      <Badge.Ribbon
        text={item.nickname}
        color={isOwner ? '#1677ff' : '#ff6b6b'}
        className={styles.ribbon}
      >
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <img src={item.avatar} alt="头像" className={styles.avatar} />
            {isOwner && (
              <button onClick={onDelete} className={styles.deleteBtn}>
                ×
              </button>
            )}
          </div>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>
              📄 {item.doc_num} 篇文档
            </span>
            <span className={styles.tag}>
              更新于 {item.update_time}
            </span>
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
}