/**
 * 接口返回数据格式定义
 */
export interface Response<T = any> {
  code: string;
  data: T;
  msg: string;
}

export const ResponseError = {
  code: 500,
  msg: 'ERROR',
};

/**
 * 列表返回的 data 数据格式
 */
export interface ListResponse<T> {
  list: Array<T>;
  total: number;
  current?: number;
  pageSize?: number;
}

/**
 * 列表请求需要的页面参数
 */
export interface ListRequire {
  pageNo?: number; // 当前页数，1表示第一页
  pageSize?: number;
}
