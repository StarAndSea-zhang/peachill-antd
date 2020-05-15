<!--
 * @Description:
 * @Author ZhangYu
 * @Date 2019-12-23 09:41:24
 * @Params {}
 -->

<template>
  <div>
    <a-form ref="form" :form="form" :layout="formLayout">
      <a-row :gutter="gutter">
        <w-col
          v-for="(item, i) in formFilters"
          :key="i"
          :span="item.category.includes('upload') ? 6 : item.span"
        >
          <w-form-item :config="item" :config-key="i"></w-form-item>
        </w-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { WComponentConfig } from '@/components/types/WComponentConfig';
  import WFormItem from '@/components/WFormItem.vue';
  @Component({
    components: { WFormItem },
  })
  export default class WFrom extends Vue {
    @Prop({
      type: String,
      default: 'inline',
    })
    formLayout!: string;
    @Prop({
      type: Object,
      required: true,
    })
    formFilters!: object;

    // @Prop({
    //   type: Object,
    //   required: true,
    // })
    private form: any;
    gutter: number = 24;
    created() {
      this.form = this.$form.createForm(this, {});
      this.form.setFieldsValue();
    }

    get getForm() {
      return this.form;
    }

    resetFields() {
      this.form.resetFields();
      for (const formFiltersKey in this.formFilters) {
        (this.formFilters as any)[formFiltersKey].config.value = '';
        if (
          (this.formFilters as any)[formFiltersKey].category === 'time-picker'
        ) {
          (this.formFilters as any)[formFiltersKey].config.defaultValue = null;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/.ant-form-item-label {
    width: 120px;
  }
  /deep/ .ant-select,
  /deep/.ant-input {
    min-width: 200px;
  }
</style>
