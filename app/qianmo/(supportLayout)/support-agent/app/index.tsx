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
import { useRouter } from 'next/navigation'
import { getRedirection } from '../../../tools/app-redirection'

const AgentApp: React.FC<any> = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { push } = useRouter()

  // 初始加载数据
  useEffect(() => {
    const fetchTagbarList = async () => {
      const response: AppListResponse = await fetchAppList({
        url: 'apps',
        params: { page: 1, limit: 100, name: "", is_created_by_me: false }
      });
      if (response.data.length > 0) {
        setApps(response.data);
      }
    }

    fetchTagbarList()
  }, [refresh]);

  // 编辑
  const handleEdit = () => {

  }
  // 删除
  const handleDelete = () => {

  }
  // 设计
  const handleDesign = (app: App) => {
    getRedirection(true, app, (path: string) => {
      window.open(path, "_blank")
    })
  }

  // 刷新
  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <div className="top-btn-box">
        <Button className="top-left-btn" icon={<AppstoreAddOutlined />}>创建应用</Button>
        <Button className="top-right-btn" icon={<UndoOutlined />} onClick={handleRefresh}>刷新</Button>
      </div>
      <div className={`bottom-ctx-box ${styles['grid']} ${styles['grid-cols-4']} ${styles['gap-4']}`}>
        {apps.map((item) => {
          return (
            <Card
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDesign={handleDesign}
              data={item}
            />
          )
        })}
      </div>
    </>
  );
};

export default AgentApp;