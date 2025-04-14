/**
 * 格式化时间戳
 * @param timestamp 时间戳
 * @param format    格式，默认yyyy-MM-ddd HH:mm:ss
 * @returns 
 */
export const formatTimestamp = (
  timestamp: number,
  format: string = "yyyy-MM-ddd HH:mm:ss"
): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return format
    .replace("yyyy", String(year))
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};
