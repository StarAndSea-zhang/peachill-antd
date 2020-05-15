<!--
 * @Description: 
 * @Author ZhangYu
 * @Date 2020-01-02 09:54:45
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
    <a-cascader
      v-else
      :options="config.options"
      :placeholder="config.placeholder ? config.placeholder : '请输入' + label"
      :size="config.size"
      :value="config.value"
      @change="handleValueChange"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WComponentConfig } from './types/WComponentConfig';
  import WFormComponent from '@/components/WFormComponent.vue';
  @Component
  export default class WCascader extends WFormComponent {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WComponentConfig();
      },
    })
    config!: WComponentConfig;

    handleValueChange(e: any) {
      this.config.value = e;
    }

    get showText() {
      let str = '';
      str = this.getLeafNode(this.config.options, 0, str);
      return str;
    }

    /**
     * 递归获取级联选择器每一层的叶节点
     * @param options 每一层的选项
     * @param i 选中后值的下标
     * @param result 展示文字的结果
     */
    getLeafNode(options: Array<any>, i: number, result: string): string {
      if (i >= this.config.value.length) {
        return result;
      }
      options.forEach((option: any) => {
        if (option.value === this.config.value[i]) {
          result += option.label;
          i++;
          if (option.children) {
            result = this.getLeafNode(option.children, i, result);
          } else {
            console.log(result);
            return result;
          }
        }
      });
      return result;
    }
  }
</script>

<style scoped></style>
