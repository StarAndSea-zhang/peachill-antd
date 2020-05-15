<!--
 * @Description:
 * @Author ZhangYu
 * @Date 2019-12-23 09:25:58
 * @Params {}
 -->

<template>
  <div>
    <!--    只读状态-->
    <div v-if="config.readonly" @click="handleClick">
      <div v-if="valueIsNull">
        暂无数据
      </div>
      <div v-else>
        {{ config.value }}
      </div>
    </div>
    <!--    可编辑状态-->
    <div v-else>
      <a-input
        v-model="config.value"
        :addon-after="config.addonAfter"
        :addon-before="config.addonBefore"
        :default-value="config.defaultValue"
        :disabled="config.disabled"
        :prefix="config.prefix"
        :suffix="config.suffix"
        :type="config.type"
        :allow-clear="config.allowClear"
        :placeholder="
          config.placeholder ? config.placeholder : '请输入' + label
        "
        :size="config.size"
        @change="handleValueChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WInputConfig } from '@/components/types/WComponentConfig';
  import WFormComponent from '@/components/WFormComponent.vue';

  @Component
  export default class WInput extends WFormComponent {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WInputConfig();
      },
    })
    config!: WInputConfig;

    value: string = '';

    handleValueChange(e: any) {
      //截取value 向上传递
      this.$emit('change', e.target.value);
    }

    handleFocus() {
      if (this.config.handleFocus) {
        this.config.handleFocus();
      }
    }

    handleBlur() {
      if (this.config.handleBlur) {
        this.config.handleBlur();
      }
    }

    handleClick() {
      if (this.config.handleClick) {
        this.config.handleClick();
      }
    }
  }
</script>

<style scoped></style>
