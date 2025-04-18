import { useState, useMemo, useEffect } from 'react';
import { Input, Button } from 'antd';
import KnowledgeCard from './knowledge-card';
import KnowledgeCreatingModal from './knowledge-creating-modal';
import { getKbList } from '../service/index';
import {
  AppstoreAddOutlined,
  UndoOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import './index.scss';

// 模拟用户信息
const mockUser = { nickname: 'hhny', avatar: '👤' };

const KnowledgeList = () => {
  const [knowledgeList, setKnowledgeList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [creatingVisible, setCreatingVisible] = useState(false);

  // 初始化获取远端数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKbList();
        const formattedList = response.data.kbs.map((item: any) => ({
          ...item,
          // 时间戳转换
          avatar: item.avatar || mockUser.avatar,
          update_time: new Date(item.update_time).toISOString().split('T')[0],
          description: item.description || '暂无描述',
          permission: item.permission || 'private'
        }));
        setKnowledgeList(formattedList);
      } catch (error) {
        console.error('获取知识库列表失败', error);
      }
    };

    fetchData();
  }, []);

  // 搜索过滤
  const filteredList = useMemo(() => {
    return knowledgeList.filter(item =>
      item.name.includes(searchText) ||
      (item.description || '').includes(searchText)
    );
  }, [searchText, knowledgeList]);

  // 创建和删除逻辑
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

  const handleDelete = (id: string) => {
    setKnowledgeList(knowledgeList.filter(item => item.id !== id));
  };

  return (
    <div className={'knowledge'}>
      {/* 头部操作区 */}
      <div className={'topWrapper'}>
        <div className={'userGreeting'}>
          <span className={'title'}>欢迎回来，{mockUser.nickname}</span>
          <p className={'description'}>管理你的知识库</p>
        </div>
        <div className={'operationBar'}>
          <Input
            placeholder="搜索知识库"
            value={searchText}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            className={'searchInput'}
          />
          <Button
            icon={<AppstoreAddOutlined />}
            onClick={() => setCreatingVisible(true)}
            className={'createButton'}
          >
            创建知识库
          </Button>
        </div>
      </div>

      {/* 卡片列表 */}
      <div className={'cardGrid'}>
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
          <div className={'emptyState'}
            onClick={() => setCreatingVisible(true)}>
            暂无知识库，点击 + 创建你的第一个知识库
          </div>
        )}
      </div>

      <KnowledgeCreatingModal
        visible={creatingVisible}
        onCancel={() => setCreatingVisible(false)}
        onOk={handleCreate}
      />
    </div>
  );
};

export default KnowledgeList;