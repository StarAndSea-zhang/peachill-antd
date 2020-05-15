export interface IDescriptionItem {
  span?: number; // 总分为 6 列，占几列，值只能是 2，3，4，6
  label?: string;
  content?: any;
  slots?: {
    content?: boolean;
  };
  [propName: string]: any;
}

export type TData = IDescriptionItem[];
