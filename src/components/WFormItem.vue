<!--
 * @Description:
 * @Author ZhangYu
 * @Date 2019-12-23 09:41:11
 * @Params {}
 -->

<template>
  <a-form-item
    :name="config.name"
    :colon="config.colon"
    :extra="config.extra"
    :label="config.label"
    :label-col="config.labelCol"
    :self-update="config.selfUpdate"
    :wrapper-col="config.wrapperCol"
    :help="config.help"
    :has-feedback="config.hasFeedback"
    :validate-status="config.validateStatus"
    :required="required"
  >
    <w-input
      v-if="config.category === 'input' || config.category === undefined"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
      :label="config.label"
    ></w-input>
    <w-select
      v-if="config.category === 'select'"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
      :label="config.label"
    ></w-select>
    <w-radio
      v-if="config.category === 'radio'"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
    ></w-radio>
    <w-time-picker
      v-if="config.category === 'time-picker'"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
      :label="config.label"
    ></w-time-picker>

    <w-upload
      v-if="config.category === 'upload'"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
      :label="config.label"
    ></w-upload>

    <w-upload-image
      v-if="config.category === 'upload-image'"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
      :label="config.label"
    ></w-upload-image>

    <w-cascader
      v-if="config.category === 'cascader'"
      v-decorator="decorator(config.config.type)"
      :config="config.config"
      :label="config.label"
    ></w-cascader>
  </a-form-item>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Regexp } from '@/utils/Regexp';
  import WCascader from '@/components/WCascader.vue';
  import WInput from '@/components/WInput.vue';
  import WRadio from '@/components/WRadio.vue';
  import WSelect from '@/components/WSelect.vue';
  import WTimePicker from '@/components/WTimePicker.vue';
  import WUpload from '@/components/WUpload.vue';
  import WUploadImage from '@/components/WUploadImage.vue';
  interface WFormItemConfig {
    colon?: boolean;
    extra?: string;
    label: string;
    labelCol?: Object;
    selfUpdate: boolean;
    wrapperCol?: Object;
    help?: string;
    hasFeedback?: boolean;
    validateStatus?: string;
    category: string; // 'input','select'...
    config: any; // 输入框配置
    name: string;
    required: boolean;
    decorator?: Array<any>;
  }

  const EmailDecorator = {
    type: 'email',
    message: '您的输入不符合e-mail的格式',
  };

  const IntegerDecorator = {
    validator: (rule: any, value: string, callback: Function) => {
      if (value === undefined || Regexp.INTEGER_POSITIVE.test(value)) {
        callback();
        return;
      }
      callback('请输入整数');
    },
  };

  const FloatDecorator = {
    validator: (rule: any, value: string, callback: Function) => {
      if (value === undefined || Regexp.FLOAT_2.test(value)) {
        callback();
        return;
      }
      callback('保留两位小数');
    },
  };

  const RequireDecorator = { required: true, message: '请输入内容' };
  const RequireDecoratorSelect = { required: true, message: '请选择' };

  @Component({
    components: {
      WCascader,
      WUploadImage,
      WUpload,
      WInput,
      WSelect,
      WRadio,
      WTimePicker,
    },
  })
  export default class WFormItem extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    config!: WFormItemConfig;

    @Prop({
      type: String,
      required: true,
    })
    configKey!: string;

    decorator(type: string) {
      const decorator: { rules: any[] } = { rules: [] };
      if (this.config.required) {
        if (this.config.category === 'select') {
          decorator.rules.push(RequireDecoratorSelect);
        } else {
          decorator.rules.push(RequireDecorator);
        }
      }
      switch (type) {
        case 'email':
          decorator.rules.push(EmailDecorator);
          break;
        case 'integer':
          decorator.rules.push(IntegerDecorator);
          break;
        case 'float':
          decorator.rules.push(FloatDecorator);
          break;
        default:
          break;
      }
      return this.config.decorator
        ? this.config.decorator
        : [this.configKey, decorator];
    }

    get required() {
      if (this.config.config.readonly) {
        return !this.config.config.readonly;
      }
      return this.config.required;
    }
  }
</script>

<style lang="less" scoped>
  .ant-form-inline .ant-form-item {
    margin-bottom: 12px;
  }
  &-with-help {
    margin-bottom: 12px;
  }
  .ant-form-explain {
    .font-size-hint;
    position: absolute;
    top: 36px;
  }
</style>
