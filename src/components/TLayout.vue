<!--主面板布局-->
<template>
  <a-layout class="w-layout">
    <!-- collapsedWidth="0" -->
    <a-layout-sider
      v-model="menuCollapsed"
      class="w-layout__sidebar"
      :trigger="null"
      :collapsed-width="0"
      breakpoint="lg"
      collapsible
    >
      <div class="w-layout__logo" />
      <t-menu></t-menu>
    </a-layout-sider>
    <a-layout class="w-layout__container">
      <a-layout-header class="w-layout__header">
        <a-icon
          class="w-layout__trigger"
          :type="menuCollapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (menuCollapsed = !menuCollapsed)"
        />
        <a-breadcrumb class="w-layout__breadcrumb">
          <template v-if="$route.name !== 'home'">
            <a-breadcrumb-item key="home">
              <router-link :to="{ name: 'home' }">
                首页
              </router-link>
            </a-breadcrumb-item>
          </template>
          <template v-for="({ title, name }, index) in selectedMenus">
            <a-breadcrumb-item :key="index">
              <span v-if="!name || index === selectedMenus.length - 1">
                {{ title }}
              </span>
              <router-link v-else :to="{ name }">
                {{ title }}
              </router-link>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <a-dropdown class="w-layout__dropdown">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="modifyPwd">
              <a-icon type="key" />
              修改密码
            </a-menu-item>
            <a-menu-item key="0">
              <a-icon type="logout" />
              退出登录
            </a-menu-item>
            <!--<a-menu-item key="1">
              <a-icon type="user" />
              个人中心
            </a-menu-item>-->
          </a-menu>
          <a-button type="link">
            {{ name + ' ' + phone }}
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content ref="layoutContent" class="w-layout__content">
        <a-back-top class="w-layout__back" :target="backTopTarget" />
        <router-view
          v-if="isRouterAlive"
          :key="$route.fullPath"
          class="w-layout__view"
        />
      </a-layout-content>
    </a-layout>
    <a-modal
      :visible="modifyPwdVisible"
      :mask-closable="false"
      title="修改密码"
      @ok="handleSubmitResetPwd"
      @cancel="modifyPwdVisible = false"
    >
      <password-modify ref="passwordModify" :is-modal="true" />
    </a-modal>
  </a-layout>
</template>

<script lang="ts">
  import { Component, Provide, Ref, Vue } from 'vue-property-decorator';
  import { IMenu } from '@/store/menu/types';
  import { namespace, State } from 'vuex-class';
  import ConstantField from '@/utils/ConstantFiled';
//  import PasswordModify from '@/views/components/PasswordModify.vue';
  import TMenu from '@/components/TMenu.vue';

  const menuModule = namespace('menu');
  enum TMenuItem {
    Logout = '0',
    PersonSetting = '1',
  }
  @Component({
    components: {
//        PasswordModify,
        TMenu },
  })
  export default class TLayout extends Vue {
    @State('name') name!: string;
    @State('phone') phone!: string;
    @menuModule.Getter('selectedMenus') selectedMenus!: IMenu[];
    @Ref() readonly layoutContent!: any;
    @Ref() readonly passwordModify!: any;

    isRouterAlive: boolean = true;
    modifyPwdVisible: boolean = false;
    menuCollapsed: boolean = false; // 菜单折叠
    backTopTarget: any = () => window; // 返回顶部按钮的 target

    handleSubmitResetPwd() {
      this.passwordModify.validateFields((result: any) => {
        this.modifyPwdVisible = false;
      });
    }

    async handleMenuClick(e: any) {
      switch (e.key) {
        case TMenuItem.Logout:
//          const res = await logout();
//          if (res.code !== ConstantField.RQ_SUCCESS) {
//            //TODO
//          }
//          localStorage.clear();
//        this.$router.push('/login');
          break;

        case 'modifyPwd':
          this.modifyPwdVisible = true;
          break;

        case TMenuItem.PersonSetting:
          break;
      }
    }

    /**
     * 刷新子路由当前页面
     * 用法：
     * @Inject('reload') readonly reload!: Function; // 需要刷新的页面中注入reload方法
     * this.reload(); // 调用reload方法，刷新页面
     */
    @Provide('reload')
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }

    async mounted() {
      const layoutContent: any = this.$refs.layoutContent;
      this.backTopTarget = () => layoutContent.$el;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .w-layout {
    display: flex;
    flex: auto;
    flex-direction: row;
    height: calc(100vh - 1px);

    &__sidebar {
      height: 100vh;
      overflow: auto;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }

    &__logo {
      height: 32px;
      background: url('~@/assets/logo.png') center center no-repeat;
      margin: @padding-md;
    }

    &__container {
      /*display: block; // 顶部不固定*/
    }

    &__header {
      background: @white;
      padding: 0;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      z-index: 21;
    }

    &__trigger {
      padding: @padding-md;
      font-size: 20px;
      &:hover {
        color: @primary-color;
      }
    }

    &__breadcrumb {
      margin: @padding-md 0 0;
      display: inline-block;
    }

    &__content {
      margin: 0;
      padding: 0 @padding-md;
      background: transparent;
      overflow: auto;
    }

    &__view {
      margin: @padding-md 0 @padding-lg;

      &.ant-card,
      /deep/ .ant-card {
        border: none;
        margin-bottom: @padding-md;
      }
    }

    &__back {
      box-shadow: @box-shadow;
      border-radius: 50%;
      z-index: 30;
    }

    &__dropdown {
      float: right;
      height: 100%;
      margin-right: 20px;
    }
  }
</style>
