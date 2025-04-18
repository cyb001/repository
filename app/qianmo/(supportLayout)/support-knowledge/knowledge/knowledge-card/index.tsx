import './index.scss';
import { Card, Badge, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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
        <Card
            className={'card'} // 对应原有 .card 样式
            bordered={false} // 移除 Ant 默认边框，保持原有视觉
            hoverable // 保留原有悬停效果（需 CSS 配合）
        >
            <Badge.Ribbon
                text={item.nickname}
                color={isOwner ? '#1677ff' : '#ff6b6b'}
                className={'ribbon'}
                placement="end"
            >
                <div className={'cardContent'}>
                    <div className={'header'}>
                        <div
                            className={'avatar'}
                        >
                            {item.avatar}
                        </div>
                        {isOwner && (
                            <Button
                                onClick={onDelete}
                                type="link"
                                icon={<DeleteOutlined className={'deleteIcon'} />}
                                className={'deleteBtn'}
                                size="small"
                            />
                        )}
                    </div>
                    <h3 className={'title'}>{item.name}</h3>
                    <p className={'description'}>{item.description}</p>
                    <div className={'footer'}>
                        <span className={'tag'}>
                            📄 {item.doc_num} 篇文档
                        </span>
                        <span className={'tag'}>
                            更新于 {item.update_time}
                        </span>
                    </div>
                </div>
            </Badge.Ribbon>
        </Card>
    );
}