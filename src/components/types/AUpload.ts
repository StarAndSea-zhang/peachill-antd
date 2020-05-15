export interface AFile extends File {
  uid: string; // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name: string; // 文件名
  type: string;
  status: 'uploading' | 'done' | 'error' | 'removed'; // 状态有：uploading done error removed
  size: number;
  response: object; // 服务端响应内容
  linkProps: string; // 下载链接额外的 HTML 属性
  originFileObj: File;
  lastModified: number;
  lastModifiedDate: Date;
  thumbUrl: string; // 显示的图片url，带域名
  url: string; // 往后台数据传的值，不带域名
}

export interface AUploadChange {
  file: AFile;
  fileList: AFile[];
}

export interface AUploadRequest {
  action: string | Function;
  filename: string;
  file: File;
  data: any;
  headers: any;
  withCredentials: boolean;
  onProgress: Function;
  onSuccess: Function;
  onError: Function;
}
