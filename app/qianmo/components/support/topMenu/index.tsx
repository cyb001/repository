'use client'; 

import React, { FC, useEffect, useState } from "react";
import { getMenuList } from "./request";
import styles from "./TopMenu.module.scss";
import Icon from "@/app/qianmo/components/antIcon"
import UserAvatar from "@/app/qianmo/components/userAvatar"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface TopMenuMenu {
  id: string;
  name: string;
  icon: string;
  path: string;
}

const TopMenu: FC<{ showText: boolean }> = ({ showText = true }) => {
  // 使用nextjs路由
  const router = useRouter();
  const pathName = usePathname()

  // 定义响应数据
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [menus, setMenus] = useState<TopMenuMenu[]>([]);

  // 获取数据
  useEffect(() => {
    setCurrentKey(pathName);
    const fetchMenuList = async () => {
      try {
        const menus_ = await getMenuList();
        setMenus(menus_);
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    fetchMenuList();
  }, []);

  // 点击菜单，实现路由跳转 + 菜单高亮
  const handleMenuClick = (menu: TopMenuMenu): void => {
    setCurrentKey(menu.path);
    router.push(menu.path);
  };

  const handleLogoClick = () => {
    window.open("/apps", "_blank")
  }

  return (
    <div className={styles.bar}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src={"/logo/logo.png"} alt="" width="30px" />
      </div>
      <div style={{ height: "calc(100% - 140px)", position: "relative" }}>
        <div className={styles["menu-items-container"]}>
          {menus.map((item) => {
            return (
              <div
                className={`${styles["menu-item"]} ${
                  currentKey === item.path ? styles.selected : ""
                }`}
                key={item.id}
                onClick={() => handleMenuClick(item)}
              >
                <span className={styles["menu-item-icon-container"]}>
                  <Icon name={item.icon}/>
                </span>
                {showText ? (
                  <span className={styles["menu-item-label"]}>{item.name}</span>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.user_info}>
        <UserAvatar/>
      </div>
    </div>
  );
};

export default React.memo(TopMenu);
