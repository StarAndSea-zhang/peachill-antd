import { GetterTree } from 'vuex';
// import { hasRouterRole } from '@/router/RoleRouter';
import { IMenu, IMenuState } from '@/store/menu/types';
import { IState } from '@/store/types';

export const menuGetters: GetterTree<IMenuState, IState> = {
  // 获取第一级菜单的 key 数组
  rootMenuKeys(state): string[] {
    const arr: string[] = [];
    state.list.forEach(item => {
      if (item.key) {
        arr.push(item.key);
      }
    });
    return arr;
  },

  // 根据角色返回菜单列表
  roleMenus(state, getter, rootState, rootGetter): IMenu[] {
    let arr: IMenu[] = [];
    const roles = rootState.userRole;
    state.list.forEach(item => f(item, arr));
    arr = arr.filter(value => {
      if (!value.name) {
        if (!value.children || value.children.length === 0) {
          return false;
        }
      }
      return true;
    });
    return arr;

    function f(menu: IMenu, parent?: IMenu[] | null) {
      if (!parent) {
        return;
      }
      const item = { ...menu };
      if (item.name) {
        // if (hasRouterRole(roles, item.name)) {
        //   parent.push(item);
        // }
      } else {
        parent.push(item);
      }
      if (menu.children) {
        item.children = [];
        menu.children.forEach(ite => f(ite, item.children));
      }
    }
  },

  // 菜单列表，全部子菜单展开列表
  menus(state): IMenu[] {
    const arr: IMenu[] = [];
    state.list.forEach(item => f(item));
    return arr;

    function f(item: IMenu) {
      arr.push(item);
      if (item.children) {
        item.children.forEach(item => f(item));
      }
    }
  },

  // 获取当前选中的子菜单和其父菜单的列表
  selectedMenus(state, getter): IMenu[] {
    const arr: IMenu[] = [];
    const menus: IMenu[] = getter.menus;
    let keys = [state.selectedKey];
    const menu = menus.find(item => item.key && item.key === keys[0]);
    if (menu && menu.parentKeys) {
      keys = [...menu.parentKeys, ...keys];
    }
    keys.forEach(key => {
      const menu = menus.find(item => item.key && item.key === key);
      if (menu) {
        arr.push(menu);
      }
    });
    return arr;
  },
};
