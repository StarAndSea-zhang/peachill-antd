import { Role } from '@/store/menu/types';

export interface IState {
  userRole: Role[];
  userState: number; // 0是待完善 1是待审核 2 是审核通过 3不通过 4 锁定 5禁用
  name: string | null; // 用户昵称
  phone: string | null; // 用户账号
}
