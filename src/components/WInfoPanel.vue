<!--
 * @Description: 
 * @Author ZhangYu
 * @Date 2019-12-20 15:19:00
 * @Params {}
 -->

<template>
  <div class="block-wrap">
    <div class="block-header-wrap">
      <div class="label">
        {{ label }}
      </div>
      <slot name="btn" />
    </div>
    <div class="base-info-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class WInfoPanel extends Vue {
    @Prop({
      type: String,
      default: '基本信息',
    })
    label?: string;
  }
</script>
<style lang="less" scoped>
  .block-wrap {
    padding: 15px;
    background-color: #fff;
    margin-top: 12px;
    .block-header-wrap {
      margin-bottom: 15px;
    }
    .block-header-wrap .label {
      display: inline-block;
      border-left: 4px solid #155bd4;
      padding: 0 10px;
      margin: 5px 0;
      font-size: 14px;
      color: #323233;

      .base-info-content {
        position: relative;
        padding: 19px 12px 0;
      }
    }
  }
</style>
