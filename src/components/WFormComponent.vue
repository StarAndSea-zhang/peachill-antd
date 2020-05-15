<!--
 * @Description:
 * @Author ZhangYu
 * @Date 2019-12-27 14:34:52
 * @Params {}
 -->

<template>
  <div />
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { isNull } from '@/utils/Filter';
  import { WComponentConfig } from '@/components/types/WComponentConfig';

  @Component
  export default class WFormComponent extends Vue {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WComponentConfig();
      },
    })
    config!: WComponentConfig;
    /**
     * 利用label匹配各输入框中的placeholder
     */
    @Prop({
      type: String,
      default: '内容',
    })
    label!: String;
    /**
     * 判断empty的显示
     */
    get valueIsNull() {
      return isNull(this.config.value);
    }

    /**
     * 对于select 和radio 传值可能value时,友好处理显示
     */
    get showText() {
      try {
        const findArr = this.config.options.filter(item => {
          if (item[this.config.valueKey || 'value'] === this.config.value) {
            return item[this.config.labelKey || 'label'];
          }
        });
        return findArr.length > 0
          ? findArr[0][this.config.labelKey || 'label']
          : this.config.value;
      } catch {
        return '';
      }
    }

    @Watch('config.value', {
      immediate: true,
    })
    onDataChange() {
      this.config.value !== '' ? this.$emit('change', this.config.value) : '';
    }
  }
</script>

<style scoped></style>
