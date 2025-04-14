"use client";
import { Button } from "antd";
import { AppstoreAddOutlined, UndoOutlined } from '@ant-design/icons';
import Card from "../components/card";
import { getAppList } from "./request";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { observeIntersection } from './intersectionObserverUtils';
import { fetchAppList } from '@/service/apps';
import type { AppListResponse } from '@/models/app';
import type { App } from '@/types/app';

const AgentApp: React.FC<any> = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(1);

  // 初始加载数据
  useEffect(() => {
    loadMoreItems();
  }, []);

  // 加载更多数据
  const loadMoreItems = useCallback(async () => {
    if (isLoading ||!hasMore) return;
    setIsLoading(true);
    try {
      const response: AppListResponse = await fetchAppList({
        url: 'apps',
        params: { page: pageIndex, limit: 30, name: "", is_created_by_me: false }
      });
      if (response.data.length > 0) {
        setApps([...apps,...response.data]);
      }
      setHasMore(response.has_more);
      setPageIndex(pageIndex + 1); // 在这里更新页码
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);

  // 设置IntersectionObserver
  useEffect(() => {
    if (!loaderRef.current ||!hasMore) return;

    const observer = observeIntersection(loaderRef.current, loadMoreItems, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    return () => {
      observer.disconnect();
    };
  }, [loadMoreItems, hasMore]);

  // 编辑
  const handleEdit = () => {

  }
  // 删除
  const handleDelete = () => {

  }
  // 设计
  const handleDesign = () => {

  }

  // 刷新功能实现
  const handleRefresh = () => {
    setApps([]);
    setPageIndex(0);
    setHasMore(true);
    loadMoreItems();
  }

  return (
    <>
      <div className="top-btn-box">
        <Button className="top-left-btn" icon={<AppstoreAddOutlined />}>创建应用</Button>
        <Button className="top-right-btn" icon={<UndoOutlined />} onClick={handleRefresh}>刷新</Button>
      </div>
      <div ref={loaderRef} className={`bottom-ctx-box ${styles['grid']} ${styles['grid-cols-4']} ${styles['gap-4']}`}>
        {apps.map((item) => {
          return (
            <Card
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDesign={handleDesign}
              data={{
                id: item.id,
                name: item.name,
                mode: item.mode,
                description: item.description,
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
            />
          )
        })}
      </div>
    </>
  );
};

export default AgentApp;