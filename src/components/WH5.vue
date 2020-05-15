<template>
  <router-view class="wrapper" />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class WH5 extends Vue {
    created() {
      this.$message.config({
        top: '40%',
      });
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    background: @background-color-base;
    width: 100vw;
    min-height: 100vh;
    /deep/ .ant-input,
    /deep/ .ant-select,
    /deep/ .ant-input-search,
    /deep/ textarea.ant-input,
    /deep/ .ant-input-group-wrapper,
    /deep/ .ant-input-affix-wrapper {
      max-width: initial !important;
    }
  }
  .ant-message {
    top: 50%;
    transform: translate(0, -50%);
    .ant-message-notice-content {
      background: rgba(0, 0, 0, 0.75);
      padding: 20px;
    }
    .ant-message-custom-content {
      color: @white;
    }
    .anticon {
      display: block;
      margin: 0 0 @padding-xs 0;
      color: @white;
      font-size: 24px;
    }
  }
</style>
