export interface KbItem {
    avatar: string; // 头像（空字符串）
    chunk_num: number; // 分片数量
    description: null; // 描述（固定null）
    doc_num: number; // 文件数量
    embd_id: string; // 嵌入模型ID
    id: string; // 知识库ID（UUID格式）
    language: string; // 语言（示例中均为"English"）
    name: string; // 知识库名称
    nickname: string; // 租户昵称（固定"hhny"）
    parser_id: string; // 解析器ID（如"naive"、"tag"）
    permission: 'me' | 'team'; // 权限（枚举值）
    tenant_avatar: null; // 租户头像（固定null）
    token_num: number; // 令牌数量
    update_time: number; // 更新时间（时间戳，毫秒级）
}

export interface KbListData {
    kbs: KbItem[]; // 知识库列表
    total: number; // 总数量
}

export interface KbListResponse {
    code: number; // 状态码（0表示成功）
    data: KbListData; // 数据体
    message: string; // 提示信息（如"success"）
}