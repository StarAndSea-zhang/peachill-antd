<!--
 * @Description:
 * @Author ZhangYu
 * @Date 2019-12-27 15:28:07
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
    <div v-else>
      <!--      <a-month-picker @change="handleChange" :placeholder="'请选择' + label" v-if="type==='month'">-->
      <!--      </a-month-picker>-->
      <a-date-picker
        v-if="!config.type"
        v-model="config.defaultValue"
        allow-clear
        :disabled-date="config.disabledDate"
        :disabled-time="config.disabledTime"
        :format="config.format"
        :show-today="config.showToday"
        show-time
        @change="handleTimeChange"
      />
      <a-month-picker
        v-else-if="config.type === 'month'"
        allow-clear
        :default-value="config.defaultValue"
        :default-picker-value="config.defaultPickerValue"
        :disabled-time="config.disabledTime"
        :format="config.format"
        :placeholder="'请选择' + label"
        @change="handleTimeChange"
      ></a-month-picker>
      <a-range-picker
        v-else-if="config.type === 'range'"
        allow-clear
        :default-value="config.defaultValue"
        :default-picker-value="config.defaultPickerValue"
        :disabled-time="config.disabledTime"
        :format="config.format"
        @change="handleRangeChange"
      ></a-range-picker>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WTimePickerConfig } from '@/components/types/WComponentConfig';
  import moment, { Moment } from 'moment';
  import WFormComponent from '@/components/WFormComponent.vue';

  @Component
  export default class WTimePicker extends WFormComponent {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WTimePickerConfig();
      },
    })
    config!: WTimePickerConfig;

    handleTimeChange(moment: Moment, dateStr: string) {
      this.config.value = dateStr;
      this.config.defaultValue = moment;
      this.$emit('change', this.config.value);
    }

    handleRangeChange(moment: Moment[], date: []) {
      this.config.defaultValue = moment;
      this.config.value = moment.length > 0 ? date : [];
      this.$emit('change', this.config.value);
    }
    get showText() {
      if (this.config.type === 'range') {
        return `${this.config.value[0]} 至 ${this.config.value[1]}`;
      }
      return this.config.value;
    }

    @Watch('config.value', {
      immediate: true,
      deep: true,
    })
    onDataChange() {
      this.config.value !== '' ? this.$emit('change', this.config.value) : '';
    }
  }
</script>

<style scoped></style>
