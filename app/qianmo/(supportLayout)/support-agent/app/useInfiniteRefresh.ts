import { useCallback, useEffect, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useDebounceFn } from 'ahooks';
import type { AppListResponse } from '@/models/app';
import { fetchAppList } from '@/service/apps';
import { NEED_REFRESH_APP_LIST_KEY } from '@/config';

// 生成请求参数的函数
const getKey = (
  pageIndex: number,
  previousPageData: AppListResponse,
  activeTab: string,
  isCreatedByMe: boolean,
  tags: string[],
  keywords: string,
) => {
  if (!pageIndex || (previousPageData && previousPageData.has_more)) {
    const params: any = { url: 'apps', params: { page: pageIndex + 1, limit: 30, name: keywords, is_created_by_me: isCreatedByMe } };

    if (activeTab !== 'all')
      params.params.mode = activeTab;
    else
      delete params.params.mode;

    if (tags.length)
      params.params.tag_ids = tags;

    return params;
  }
  return null;
};

// 自定义钩子
const useInfiniteRefresh = (
  activeTab: string,
  isCreatedByMe: boolean,
  tagIDs: string[],
  keywords: string,
  setQuery: (prev: any) => void,
) => {
  const [searchKeywords, setSearchKeywords] = useState(keywords);
  const [tagFilterValue, setTagFilterValue] = useState<string[]>(tagIDs);
  const anchorRef = useRef<HTMLDivElement>(null);

  const setKeywords = useCallback((keywords: string) => {
    setQuery((prev: any) => ({ ...prev, keywords }));
  }, [setQuery]);

  const setTagIDs = useCallback((tagIDs: string[]) => {
    setQuery((prev: any) => ({ ...prev, tagIDs }));
  }, [setQuery]);

  const { data, isLoading, error, setSize, mutate } = useSWRInfinite(
    (pageIndex: number, previousPageData: AppListResponse) => getKey(pageIndex, previousPageData, activeTab, isCreatedByMe, tagIDs, searchKeywords),
    fetchAppList,
    {
      revalidateFirstPage: true,
      shouldRetryOnError: false,
      dedupingInterval: 500,
      errorRetryCount: 3,
    },
  );

  // 处理 localStorage 标志触发的刷新
  useEffect(() => {
    if (localStorage.getItem(NEED_REFRESH_APP_LIST_KEY) === '1') {
      localStorage.removeItem(NEED_REFRESH_APP_LIST_KEY);
      mutate();
    }
  }, [mutate]);

  // 无限滚动加载逻辑
  useEffect(() => {
    const hasMore = data?.at(-1)?.has_more ?? true;
    let observer: IntersectionObserver | undefined;

    if (error) {
      if (observer)
        observer.disconnect();
      return;
    }

    if (anchorRef.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading && !error && hasMore)
          setSize((size: number) => size + 1);
      }, { rootMargin: '100px' });
      observer.observe(anchorRef.current);
    }
    return () => observer?.disconnect();
  }, [isLoading, setSize, anchorRef, mutate, data, error]);

  // 搜索关键词防抖处理
  const { run: handleSearch } = useDebounceFn(() => {
    setSearchKeywords(keywords);
  }, { wait: 500 });

  const handleKeywordsChange = (value: string) => {
    setKeywords(value);
    handleSearch();
  };

  // 标签变化防抖处理
  const { run: handleTagsUpdate } = useDebounceFn(() => {
    setTagIDs(tagFilterValue);
  }, { wait: 500 });

  const handleTagsChange = (value: string[]) => {
    setTagFilterValue(value);
    handleTagsUpdate();
  };

  return {
    data,
    isLoading,
    error,
    mutate,
    handleKeywordsChange,
    handleTagsChange,
    anchorRef,
  };
};

export default useInfiniteRefresh;    