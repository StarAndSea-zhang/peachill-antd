<!--
  type menu: {
    title: string, 菜单显示的名字
    iconType: string, 菜单显示的 ant-design 图标类型
    children: [ menu ]
  }
-->

<template functional>
  <a-sub-menu :key="props.menuInfo.key ? props.menuInfo.key : props.menuKey">
    <template slot="title">
      <a-icon v-if="props.menuInfo.iconType" :type="props.menuInfo.iconType" />
      <span>{{ props.menuInfo.title }}</span>
    </template>
    <template v-for="(item, index) in props.menuInfo.children">
      <template v-if="!item.hide">
        <a-menu-item
          v-if="!item.children || item.hideChildren"
          :key="item.key ? item.key : props.menuKey + '-' + index"
        >
          <a-icon v-if="item.iconType" :type="item.iconType" />
          {{ item.title }}
        </a-menu-item>
        <w-sub-menu
          v-else
          :key="item.key ? item.key : props.menuKey + '-' + index"
          :menu-key="item.key ? item.key : props.menuKey + '-' + index"
          :menu-info="item"
        />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class WSubMenu extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    menuInfo!: object;

    @Prop({
      type: [String, Number],
      required: false,
    })
    menuKey?: string | number;
  }
</script>
