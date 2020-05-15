import { IMenuState } from '@/store/menu/types';
import { IState } from '@/store/types';
import { menuActions } from '@/store/menu/actions';
import { menuGetters } from '@/store/menu/getters';
import { menuMutations } from '@/store/menu/mutations';
import { menuState } from '@/store/menu/states';
import { Module } from 'vuex';

const namespaced = true;

export const menu: Module<IMenuState, IState> = {
  namespaced,
  state: menuState,
  getters: menuGetters,
  actions: menuActions,
  mutations: menuMutations,
};
