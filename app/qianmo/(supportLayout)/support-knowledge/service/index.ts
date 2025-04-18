import axios from './axiosInstance';
import { KbListResponse } from '../common/type';

const prefix = '/ragflow/api';

export function getKbList(
  page: number = 1,
  pageSize: number = 100,
  keywords: string = ''
) {
  return axios.get<KbListResponse>(`${prefix}/v1/kb/list`, {
    params: {
      page,
      page_size: pageSize,
      ...(keywords.trim() ? { keywords: keywords.trim() } : {}) // 非空才传递
    }
  });
}