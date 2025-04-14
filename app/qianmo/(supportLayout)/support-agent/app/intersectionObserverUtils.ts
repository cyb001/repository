interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

interface RefreshObserver {
  disconnect: () => void;
}

/**
 * 观察DOM元素是否进入视口，进入时执行回调函数
 * @param element 要观察的DOM元素
 * @param callback 进入视口时执行的回调函数
 * @param options IntersectionObserver的配置选项
 * @returns 返回一个对象，包含断开观察的方法
 */
export const observeIntersection = (
  element: Element,
  callback: () => Promise<void> | void,
  options: IntersectionObserverOptions = { threshold: 0 }
): RefreshObserver => {
  let isLoading = false;

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !isLoading) {
          try {
            isLoading = true;
            await callback();
          } finally {
            isLoading = false;
          }
        }
      }
    },
    options
  );

  observer.observe(element);

  return {
    disconnect: () => {
      observer.disconnect();
    },
  };
};