<!--
 * @Description:
 * @Author ZhangYu
 * @Date 2019-12-24 16:05:27
 * @Params {}
 -->

<template>
  <div>
    <!--    只读状态-->
    <div v-if="config.readonly">
      <!--      <div v-if="config.isHtml" v-html="config.value" />-->
      <div v-if="valueIsNull">
        暂无数据
      </div>
      <div v-else>
        {{ showText }}
      </div>
    </div>
    <a-select
      v-else
      allow-clear
      :auto-clear-search-value="config.autoClearSearchValue"
      :default-value="config.defaultValue"
      :dropdown-class-name="config.dropdownClassName"
      :filter-option="config.filterOption"
      :first-active-value="config.firstActiveValue"
      :max-tag-count="config.maxTagCount"
      :max-tag-text-length="config.maxTagTextLength"
      :mode="config.mode"
      :placeholder="config.placeholder ? config.placeholder : '选择' + label"
      :show-search="config.showSearch"
      :size="config.size"
      :value="config.value"
      :default-open="config.defaultOpen"
      dropdown-match-select-width
      @change="handleChange"
    >
      <a-select-option
        v-for="(item, i) in config.options"
        :key="i"
        :value="item[config.valueKey || 'value']"
      >
        {{ item[config.labelKey || 'label'] }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WSelectConfig } from '@/components/types/WComponentConfig';
  import WFormComponent from '@/components/WFormComponent.vue';

  @Component
  export default class WSelect extends WFormComponent {
    // get showText() {
    //   return this.config.options.filter((item: any) => {
    //     if (item.value === this.config.value) {
    //       return item.label;
    //     }
    //   })[0].label;
    // }

    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WSelectConfig();
      },
    })
    config!: WSelectConfig;

    handleChange(value: any) {
      this.config.value = value;
      if (this.config.handleChange) {
        this.config.handleChange();
      }
    }
  }
</script>

<style scoped></style>
