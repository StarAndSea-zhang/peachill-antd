<!--
 * @Description: 
 * @Author ZhangYu
 * @Date 2019-12-27 14:27:28
 * @Params {}
 -->

<template>
  <div>
    <!--    只读状态-->
    <div v-if="config.readonly">
      <div v-if="valueIsNull">
        暂无数据
      </div>
      <div v-else>
        {{ showText }}
      </div>
    </div>
    <a-radio-group
      v-else
      :disabled="config.disabled"
      :value="config.value"
      :button-style="config.buttonStyle"
      @change="handleChange"
    >
      <a-radio
        v-for="(item, i) in config.options"
        :key="i"
        :value="item[config.valueKey || 'value']"
      >
        {{ item[config.labelKey || 'label'] }}
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WRadioConfig } from '@/components/types/WComponentConfig';
  import WFormComponent from '@/components/WFormComponent.vue';

  @Component
  export default class WRadio extends WFormComponent {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WRadioConfig();
      },
    })
    config!: WRadioConfig;

    handleChange(e: any) {
      this.config.value = e.target.value;
    }
  }
</script>

<style scoped></style>
