import { IMenuState } from '@/store/menu/types';
import { MutationTree } from 'vuex';

export const menuMutations: MutationTree<IMenuState> = {
  setOpenKeys(state, value: string[]): void {
    state.openKeys = value ? value : [];
  },

  setSelectedKey(state, value: string): void {
    state.selectedKey = value ? value : '';
  },
};
