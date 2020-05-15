<!--
 * @Description: 筛选中含时间筛选器的组件，暂时必须和 collapse-filter 组件一起使用
 * @Author XuJun
 * @Date 2019-10-21 11:36:47
 * @Params {}
 -->

<template>
  <a-form-item
    v-if="label"
    :label="label === true ? '时间' : label"
    class="filter-timer"
  >
    <a-button
      v-for="(item, index) in timerData"
      :key="index"
      class="filter-button"
      :type="item.active ? 'primary' : ''"
      @click="handleTimerButtonClick(item, index)"
    >
      {{ item.name }}
    </a-button>
    <div v-if="startTimeLabel" class="filter-timer--label">
      <span style="margin-right: 5px">{{ startTimeLabel }}</span>
      <a-date-picker
        v-model.trim="startTime"
        :show-time="showTime"
        :format="format"
        :placeholder="placeholder"
        @change="handleChangeTime('start')"
      ></a-date-picker>
    </div>
    <div v-if="endTimeLabel" class="filter-timer--label">
      <span style="margin-right: 5px">{{ endTimeLabel }}</span>
      <a-date-picker
        v-model.trim="endTime"
        :show-time="showTime"
        :format="format"
        :placeholder="placeholder"
        @change="handleChangeTime('end')"
      ></a-date-picker>
    </div>
  </a-form-item>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import moment, { Moment } from 'moment';

  interface ITimerButton {
    name: string;
    value: number;
    active?: boolean;
  }
  interface ITimerData {
    startTime: string;
    endTime: string;
  }

  @Component
  export default class WFilterTimer extends Vue {
    @Prop({
      type: [Boolean, String],
      default: false,
    })
    label!: boolean | string; // false 不显示，string 显示（label名为label）

    @Prop({
      type: [Boolean, String],
      default: '开始时间',
    })
    startTimeLabel!: boolean | string; // false 不显示，string 显示（label名为startTimeLabel）

    @Prop({
      type: [Boolean, String],
      default: '结束时间',
    })
    endTimeLabel!: boolean | string; // false 不显示，string 显示（label名为endTimeLabel）

    @Prop({
      type: String,
      default: '选择日期',
    })
    placeholder!: string;

    @Prop({
      type: Boolean,
      default: false,
    })
    showTime!: boolean;

    @Prop({
      type: String,
      default: 'YYYY-MM-DD',
    })
    format!: string;

    timerData: ITimerButton[] = [
      {
        name: '不限',
        value: 0,
        active: true,
      },
      {
        name: '今天',
        value: 1,
      },
      {
        name: '近一周',
        value: 2,
      },
      {
        name: '近一月',
        value: 3,
      },
      {
        name: '近三月',
        value: 4,
      },
      {
        name: '近半年',
        value: 5,
      },
      {
        name: '近一年',
        value: 6,
      },
    ];
    startTime: Moment | null = null;
    endTime: Moment | null = null;

    @Emit()
    change(data: ITimerData) {}

    // 改变事件
    changeEvent() {
      if (!this.startTime && !this.endTime) {
        this.timerData[0].active = true;
      }
      this.change({
        startTime: this.startTime ? this.startTime.format(this.format) : '',
        endTime: this.endTime ? this.endTime.format(this.format) : '',
      });
    }
    // 时间选择器改变事件
    handleChangeTime(type: string) {
      for (const i of this.timerData.values()) {
        this.$set(i, 'active', false);
      }
      if (this.startTime && this.endTime) {
        const validate = this.startTime.valueOf() - this.endTime.valueOf();
        if (type === 'start') {
          if (validate > 0) {
            this.$message.error(
              `${this.startTimeLabel}不能晚于${this.endTimeLabel}`
            );
            this.startTime = null;
          } else {
            this.changeEvent();
          }
        } else {
          if (validate > 0) {
            this.$message.error(
              `${this.endTimeLabel}不能早于${this.startTimeLabel}`
            );
            this.endTime = null;
          } else {
            this.changeEvent();
          }
        }
      }
    }
    // 时间选择按钮的点击事件
    handleTimerButtonClick(item: ITimerButton) {
      for (const i of this.timerData.values()) {
        this.$set(i, 'active', false);
      }
      this.$set(item, 'active', true);
      const now = moment();
      now.hours(23);
      now.minutes(59);
      now.seconds(59);
      const today = moment();
      today.hours(0);
      today.minutes(0);
      today.seconds(0);
      this.endTime = now;
      switch (item.value) {
        case 1:
          // 今天
          this.startTime = today;
          break;
        case 2:
          // 近一周
          this.startTime = this.calculateDate(7);
          break;
        case 3:
          // 近一月
          this.startTime = this.getPreMonthDate(1);
          break;
        case 4:
          // 近三月
          this.startTime = this.getPreMonthDate(3);
          break;
        case 5:
          // 近半年
          this.startTime = this.getPreMonthDate(6);
          break;
        case 6:
          // 近一年
          this.startTime = this.getPreMonthDate(12);
          break;
        default:
          this.startTime = null;
          this.endTime = null;
      }
      this.changeEvent();
    }
    // 获取当前近几天的日期
    calculateDate(day: number): Moment {
      const date = moment();
      date.hours(0);
      date.minutes(0);
      date.seconds(0);
      date.date(date.date() - (day - 1));
      return date;
    }
    // 获取当前近几月的日期
    getPreMonthDate(num: number): Moment | null {
      if (!this.endTime) {
        return null;
      }
      let nowYear = this.endTime.year();
      let nowMonth = this.endTime.month(); // 0 - 11
      const nowDate = this.endTime.date();
      if (nowMonth < num) {
        nowYear -= 1;
        nowMonth = 12 + (nowMonth + 1) - num;
      }
      let pre = moment(`${nowYear} ${nowMonth} ${nowDate + 1}`, this.format);
      const preDate = pre.date();
      if (preDate - 1 !== nowDate) {
        pre = moment(`${nowYear} ${nowMonth + 1} 1`, this.format);
      }
      return pre;
    }
  }
</script>

<style lang="less" scoped>
  .filter-timer {
    margin: 0 !important;

    &--label {
      display: inline-block;
      margin: 0 @padding-xs @padding-xs 0;
      font-size: 13px;
    }

    /deep/ .ant-form-item-label {
      width: 80px;
      float: left;
    }
    /deep/ .ant-form-item-control-wrapper {
      width: calc(100% - 80px);
      float: left;
    }
  }
</style>
