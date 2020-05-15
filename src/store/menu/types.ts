// 菜单 state 接口
export interface IMenuState {
  list: IMenu[];
  openKeys: string[];
  selectedKey: string;
  defaultOpenKeys: string[];
  defaultSelectedKey: string;
}

// 菜单列表接口
export interface IMenu {
  title: string; // 显示菜单名
  key?: string; // 唯一 key 值
  name?: string; // 路由跳转的 name
  iconType?: string; // 显示的 icon，全部图标：https://www.antdv.com/components/icon-cn/
  hide?: boolean; // 是否隐藏当前菜单
  hideChildren?: boolean; // 是否隐藏当前所有子菜单
  children?: null | IMenu[]; // 子菜单
  parentKeys?: string[]; // 父级菜单的所有 key 数组
}

// admin: 平台管理员, service: 服务商, contractor: 承办商（市级承办商，城市联合承办商，区域承办商，区域推广商）, visitor: 未获得承办商资格的承办商,
export type Role =
  | 'admin'
  | 'service'
  | 'contractor'
  | 'visitor'
  | 'contractor-city';
