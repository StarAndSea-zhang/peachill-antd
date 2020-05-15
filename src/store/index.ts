import { IState } from '@/store/types';
import { menu } from '@/store/menu/index';
import { Role } from '@/store/menu/types';
// import { setRoleRouter } from '@/router/RoleRouter';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const role = localStorage.getItem('userRole');
let roles: Role[] = [];
if (role) {
  roles = JSON.parse(role);
}

const userSate = Number(localStorage.getItem('userState'));

const store = new Vuex.Store<IState>({
  modules: {
    menu,
  },
  state: {
    userRole: roles,
    userState: userSate,
    name: localStorage.getItem('name'),
    phone: localStorage.getItem('phone'),
  },
  mutations: {
    setUserRole(state, value: Role[]): void {
      state.userRole = value ? [...value] : [];
      window.localStorage.setItem('userRole', JSON.stringify(state.userRole));
      // setRoleRouter(state.userRole);
    },
    setUserState(state, value: number): void {
      state.userState = value;
      if (value !== 2) {
        store.commit('setUserRole', ['visitor']);
      }
      window.localStorage.setItem('userState', JSON.stringify(state.userState));
    },
    setUserName(state, value: { name: string; phone: string }) {
      window.localStorage.setItem('name', value.name);
      window.localStorage.setItem('phone', value.phone);
      state.name = value.name;
      state.phone = value.phone;
    },
  },
});

export default store;
