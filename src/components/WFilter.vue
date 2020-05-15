<template>
  <a-card class="w-filter">
    <template v-if="$slots.title" slot="title">
      <slot name="title" />
    </template>
    <a-input-search
      v-else
      slot="title"
      v-model.trim="searchValue"
      :placeholder="placeholder"
      :allow-clear="true"
      @change="e => handleChange(searchKey, e)"
      @search="changeEvent(searchKey, searchValue)"
    ></a-input-search>
    <a-button v-if="showCollapse" slot="extra" type="link" @click="collapse">
      <template v-if="show">
        收起筛选
        <a-icon type="down" />
      </template>
      <template v-else>
        展开筛选
        <a-icon type="right" />
      </template>
    </a-button>
    <a-form v-show="show" layout="horizontal" class="search-filter-expand">
      <a-row>
        <w-col v-for="(item, key) in params" :key="key" :span="item.span">
          <a-form-item :label="item.label">
            <template v-if="!item.type || item.type === 'input'">
              <a-input-search
                v-model.trim="item.value"
                :placeholder="
                  item.placeholder ? item.placeholder : `请输入${item.label}`
                "
                :allow-clear="true"
                @change="e => handleChange(key, e)"
                @search="changeEvent(key, item.value)"
              ></a-input-search>
            </template>
            <template v-else-if="item.type === 'radio'">
              <a-button
                v-for="(itemData, index) in item.options"
                :key="index"
                :disabled="itemData.disabled"
                :type="itemData.active ? 'primary' : ''"
                @click="handleRadioButtonClick(itemData, item, key)"
              >
                {{ itemData.name }}
              </a-button>
            </template>
            <template v-else-if="item.type === 'select'">
              <a-select
                v-model.trim="item.value"
                label-in-value
                :mode="item.mode"
                allow-clear
                @change="changeEvent(key, item.value)"
              >
                <a-select-option
                  v-for="(itemData, itemIndex) in item.options"
                  :key="itemIndex"
                  :value="itemData.value"
                >
                  {{ itemData.label }}
                </a-select-option>
              </a-select>
            </template>
            <template v-else-if="item.type === 'cascader'">
              <a-cascader
                v-model.trim="item.value"
                :options="item.options"
                allow-clear
                :placeholder="
                  item.placeholder ? item.placeholder : `请输入${item.label}`
                "
                @change="changeEvent(key, item.value)"
              />
            </template>
            <template v-else-if="item.type === 'date-picker'">
              <a-date-picker
                v-model="item.value"
                :format="item.format"
                allow-clear
                :placeholder="
                  item.placeholder ? item.placeholder : `请输入${item.label}`
                "
                @change="
                  changeDatePickerEvent(
                    key,
                    item.value,
                    item.format || 'YYYY-MM-DD'
                  )
                "
              />
            </template>
          </a-form-item>
        </w-col>
        <w-col v-if="timer" :span="6">
          <w-filter-timer
            :label="timer.label"
            :format="timer.format"
            :start-time-label="timer.startTimeLabel"
            :end-time-label="timer.endTimeLabel"
            @change="handleTimerChange"
          ></w-filter-timer>
        </w-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import {
    FilterConfig,
    FilterConfigSelect,
    RadioOption,
    SelectOption,
    TimerConfig,
    TimerData,
  } from '@/components/types/WFilter';
  import moment, { Moment } from 'moment';
  import WFilterTimer from '@/components/WFilterTimer.vue';

  @Component({
    components: { WFilterTimer },
  })
  export default class WFilter extends Vue {
    searchValue: string = '';
    filterData: { [key: string]: any } = {};
    show: boolean = false;
    span: number = 24;

    @Prop({
      type: String,
      default: '请输入名称搜索',
    })
    placeholder!: string;

    @Prop({
      type: Boolean,
      default: true,
    })
    showCollapse!: boolean;

    @Prop({
      type: String,
      default: 'search',
    })
    searchKey!: string;

    @Prop({
      type: Object as () => FilterConfig,
    })
    params!: FilterConfig;

    @Prop({
      type: [Boolean, Object as () => TimerConfig],
      default: () => {},
    })
    timer!: boolean | TimerConfig;

    @Emit()
    collapse() {
      this.show = !this.show;
    }

    @Emit()
    search(filters: object) {}

    changeEvent(
      key: string,
      value: string | SelectOption | Array<SelectOption> | Array<string>
    ) {
      if (!value) {
        value = '';
      }
      this.filterData[key] = value;
      this.search(this.filterData);
    }

    handleChange(key: string, e: { target: { value: any } }) {
      if (!e.target.value) {
        this.changeEvent(key, e.target.value);
      }
    }

    changeDatePickerEvent(
      key: string,
      value:
        | string
        | SelectOption
        | Array<SelectOption>
        | Array<string>
        | Moment,
      format: string
    ) {
      if (!value) {
        value = '';
        this.filterData[key] = value;
      } else if (typeof value === 'object') {
        this.filterData[key] = (value as Moment).format(format);
      }
      this.search(this.filterData);
    }

    /**
     *
     * @param item
     * @param parent
     * @param key
     */
    handleRadioButtonClick(
      item: RadioOption,
      parent: FilterConfigSelect,
      key: string
    ) {
      //重置按钮状态
      const arr = parent.options as Array<RadioOption>;
      arr.forEach(i => {
        this.$set(i, 'active', false);
      });
      this.$set(item, 'active', true);
      this.changeEvent(key, item.value);
    }

    handleTimerChange(data: TimerData) {
      this.filterData.startTime = data.startTime;
      this.filterData.endTime = data.endTime;
      this.search(this.filterData);
    }
  }
</script>

<style scoped lang="less">
  .w-filter {
    /deep/ .ant-card-body {
      padding-top: 0;
      padding-bottom: 0;

      .ant-form {
        padding: 20px 0;
      }

      .ant-form-item {
        margin-bottom: @padding-xs;
        /*padding-top: 10px;*/
        /*border-top: 1px dashed #e8e8e8;*/

        /*&:last-of-type {
          margin-bottom: 20px;
        }*/
      }
      .ant-form-item-label {
        width: 120px;
        float: left;
      }
      .ant-form-item-control-wrapper {
        width: calc(100% - 120px);
        float: left;
      }
      .ant-calendar-picker {
        width: 100%;
        max-width: 300px;
      }
    }
  }

  .search-filter {
    padding-bottom: 20px;
    .search-filter-button {
      font-size: 12px;
      cursor: pointer;
      color: #409eff;
      line-height: 28px;
    }
  }
  .search-filter-expand {
    /deep/ .ant-btn {
      margin: 0 @padding-xs @padding-xs 0;
      font-size: 13px;
    }
    /deep/.ant-cascader-picker {
      width: auto;
    }
  }
  .filter-timer {
    /deep/.ant-calendar-picker {
      width: initial !important;
    }
  }
</style>
