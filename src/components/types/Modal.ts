export interface Modal<T = any> {
  title?: string;
  visible: boolean;
  confirmLoading?: boolean;
  form?: any;
  data?: T;
  imageList?: any[];
  [propName: string]: any;
}
