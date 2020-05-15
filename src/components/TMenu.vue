<!--首页左侧菜单-->
<template>
  <a-menu
    mode="inline"
    theme="dark"
    :default-selected-keys="[defaultSelectedKey]"
    :default-open-keys="defaultOpenKeys"
    :open-keys="openKeys"
    :selected-keys="[selectedKey]"
    @openChange="onOpenChange"
    @select="onSelect"
  >
    <template v-for="(item, index) in menuList">
      <template v-if="!item.hide">
        <a-menu-item
          v-if="!item.children || item.hideChildren"
          :key="item.key ? item.key : index + ''"
        >
          <a-icon v-if="item.iconType" :type="item.iconType" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <w-sub-menu
          v-else
          :key="item.key ? item.key : index + ''"
          :menu-key="item.key ? item.key : index + ''"
          :menu-info="item"
        />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { IMenu } from '@/store/menu/types';
  import { namespace } from 'vuex-class';
  import WSubMenu from '@/components/WSubMenu.vue';

  const menuModule = namespace('menu');

  @Component({
    components: { WSubMenu },
  })
  export default class TMenu extends Vue {
    @menuModule.State('openKeys') openKeys!: string[];
    @menuModule.State('selectedKey') selectedKey!: string;
    @menuModule.State('defaultOpenKeys') defaultOpenKeys!: string[];
    @menuModule.State('defaultSelectedKey') defaultSelectedKey!: string;

    @menuModule.Getter('roleMenus') menuList!: IMenu[];
    @menuModule.Getter('menus') menus!: IMenu[];
    @menuModule.Getter('rootMenuKeys') rootMenuKeys!: string[];

    @menuModule.Mutation('setOpenKeys') setOpenKeys!: Function;
    @menuModule.Mutation('setSelectedKey') setSelectedKey!: Function;

//    @Watch('$route', {
//      immediate: true,
//    })
    onRouteChange() {
      const name = 'this.$route.name';
      const menu: IMenu | undefined = this.menus.find(
        item => item.name && item.name === name
      );
      if (menu) {
        this.setSelectedKey(menu.key);
        this.setOpenKeys(menu.parentKeys);
      }
    }

    // 菜单展开事件
    onOpenChange(openKeys: string[]) {
      const latestOpenKey: string | undefined = openKeys.find(
        key => !this.openKeys.includes(key)
      );
      let data: string[] = [];
      if (latestOpenKey) {
        if (!this.rootMenuKeys.includes(latestOpenKey)) {
          data = openKeys;
        } else {
          data = [latestOpenKey];
        }
      }
      this.setOpenKeys(data);
    }

    // 菜单选中事件
    onSelect({ key = '' } = {}) {
      const menu: IMenu | undefined = this.menus.find(
        item => item.key && item.key === key
      );
//      if (menu && menu.name && this.$route.name !== menu.name) {
//    this.$router.push({ name: menu.name });
//      }
    }
  }
</script>

<style lang="less" scoped></style>
