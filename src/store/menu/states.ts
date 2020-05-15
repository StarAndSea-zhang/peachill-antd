import { IMenu, IMenuState } from '@/store/menu/types';

const list: IMenu[] = [
  {
    title: '首页',
    name: 'home',
  },
  {
    title: '承办商管理',
    children: [
      { title: '我的下级承办商', name: 'contractors' },
      { title: '承办商详情', name: 'contractorDetail', hide: true },
      { title: '下级承办商列表', name: 'subContractors', hide: true },
      { title: '邀请承办商', name: 'inviteContractor' },
      { title: '创建承办商', name: 'contractorCreate' },
      { title: '承办商初筛汇总页', name: 'contractorFilter' },
    ],
  },
  {
    title: '分成规则',
    name: 'bonusRule',
  },
  {
    title: '红包兑换券',
    children: [
      { title: '兑换券批次管理', name: 'redPacketManage' },
      { title: '兑换券管理', name: 'redPacketInfo' },
      { title: '红包额度配置', name: 'redPacketLimitConfig' },
    ],
  },
  {
    title: '提现管理',
    name: '',
    children: [
      { title: '提现审批', name: 'cashApprove' },
      { title: '提现记录', name: 'cash' },
      { title: '分成流水', name: 'benefitRecord' },
    ],
  },
  {
    title: '流程管理',
    name: '',
    children: [
      { title: '全部流程', name: 'allProcedure' },
      { title: '我的待办', name: 'toDos' },
      { title: '我的已办', name: 'completed' },
      { title: '我的申请', name: 'apply' },
      // { title: '全部流程', name: 'allProcess' },
      { title: '承办商新建审核流程', name: 'contractorAudit', hide: true },
      { title: '承办商资格取消流程', name: 'contractorCancel', hide: true },
      { title: '承办商升降级流程', name: 'contractorLevel', hide: true },
    ],
  },
  {
    title: '用户管理',
    name: 'user',
  },
  {
    title: '跨区管理',
    children: [
      // { title: '跨区用户列表', name: 'userRegions' },
      // { title: '市级区域保护设置', name: 'municipalSetting' },
    ],
  },
  {
    title: '权限管理',
    children: [
      { title: '平台管理员配置', name: 'managers' },
      { title: '服务商账号管理', name: 'services' },
    ],
  },
];

list.forEach((item, index) => f(item, index));

function f(item: IMenu, index: number, parent?: IMenu) {
  const key: string = String(index + 1);
  const itemKey = parent ? `${parent.key}-${key}` : key;
  if (parent) {
    if (!item.parentKeys) {
      if (parent && parent.parentKeys) {
        item.parentKeys = [...parent.parentKeys];
      } else {
        item.parentKeys = [];
      }
    }
    if (parent.key) {
      item.parentKeys.push(parent.key);
    }
  }
  item.key = itemKey;
  if (item.children) {
    item.children.forEach((i, inx) => {
      f(i, inx, item);
    });
  }
}

export const menuState: IMenuState = {
  list: list,
  openKeys: [], // 展开菜单的 key 数组
  selectedKey: '', // 选中菜单的 key 数组
  defaultOpenKeys: [], // 默认展菜单的 key 数组
  defaultSelectedKey: '', // 默认选中菜单的 key 数组
};
