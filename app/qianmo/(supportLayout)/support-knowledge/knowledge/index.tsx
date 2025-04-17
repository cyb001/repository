import { useState, useMemo } from 'react';
import KnowledgeCard from './knowledge-card';
import KnowledgeCreatingModal from './knowledge-creating-modal';
import styles from './index.less';

// 模拟用户信息
const mockUser = { nickname: '张三', avatar: 'https://via.placeholder.com/40' };

// 模拟知识库数据
const initialKnowledgeList = [
  {
    id: '1',
    name: '产品手册',
    description: '包含所有产品功能说明',
    doc_num: 5,
    update_time: '2024-06-01',
    avatar: mockUser.avatar,
    nickname: mockUser.nickname,
    permission: 'private'
  },
  {
    id: '2',
    name: 'API文档',
    description: '系统接口调用说明',
    doc_num: 3,
    update_time: '2024-05-20',
    avatar: 'https://via.placeholder.com/40',
    nickname: '李四',
    permission: 'team'
  }
];

const KnowledgeList = () => {
  const [knowledgeList, setKnowledgeList] = useState(initialKnowledgeList);
  const [searchText, setSearchText] = useState('');
  const [creatingVisible, setCreatingVisible] = useState(false);

  // 搜索过滤（记忆化优化）
  const filteredList = useMemo(() => {
    return knowledgeList.filter(item => 
      item.name.includes(searchText) || 
      item.description.includes(searchText)
    );
  }, [searchText, knowledgeList]);

  // 模拟创建逻辑
  const handleCreate = (name: string) => {
    setKnowledgeList([
      ...knowledgeList,
      {
        id: Date.now().toString(),
        name,
        description: '新创建的知识库',
        doc_num: 0,
        update_time: new Date().toISOString().split('T')[0],
        avatar: mockUser.avatar,
        nickname: mockUser.nickname,
        permission: 'private'
      }
    ]);
    setCreatingVisible(false);
  };

  // 模拟删除逻辑
  const handleDelete = (id: string) => {
    setKnowledgeList(knowledgeList.filter(item => item.id !== id));
  };

  return (
    <div className={styles.knowledge}>
      {/* 头部操作区 */}
      <div className={styles.topWrapper}>
        <div className={styles.userGreeting}>
          <span className={styles.title}>你好，{mockUser.nickname}</span>
          <p className={styles.description}>管理你的知识库</p>
        </div>
        <div className={styles.operationBar}>
          <input
            type="text"
            placeholder="搜索知识库"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchInput}
          />
          <button
            onClick={() => setCreatingVisible(true)}
            className={styles.createButton}
          >
            创建知识库 +
          </button>
        </div>
      </div>

      {/* 卡片列表 */}
      <div className={styles.cardGrid}>
        {filteredList.length ? (
          filteredList.map(item => (
            <KnowledgeCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              isOwner={item.nickname === mockUser.nickname}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            暂无知识库，点击 + 创建你的第一个知识库
          </div>
        )}
      </div>

      {/* 创建模态框 */}
      <KnowledgeCreatingModal
        visible={creatingVisible}
        onCancel={() => setCreatingVisible(false)}
        onOk={handleCreate}
      />
    </div>
  );
};

export default KnowledgeList;