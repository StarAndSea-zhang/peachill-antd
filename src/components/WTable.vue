<!--
 * @Description: 基础表格
 * @Author ZhangYu
 * @Date 2019-12-16 12:26:59
 * @Params {}
 -->
<template>
  <div>
    <slot v-if="$slots.filter" name="filter" />
    <a-card class="w-table">
      <a-table
        bordered
        :loading="loading"
        :data-source="dataSource"
        :columns="columns"
        :custom-row="customRow"
        :pagination="noPagination ? false : pagination"
        :row-selection="rowSelection"
        :row-key="rowKey"
        :size="size"
        :scroll="scrollData"
        @change="pageChange"
      >
        <template v-if="$slots.title" slot="title">
          <slot name="title" />
        </template>
        <template v-if="$slots.footer" slot="footer">
          <slot name="footer" />
        </template>
        <template
          v-for="(item, i) in config"
          :slot="item.scopedSlots.customRender"
          slot-scope="text, record, index"
        >
          <slot
            v-if="$scopedSlots[item.scopedSlots.customRender]"
            :name="item.scopedSlots.customRender"
            :text="text"
            :record="record"
            :index="index"
          >
            <!--columns 这个显示的列 已经从父组件传过来的， 这一段要改成从父组件里面传进来？ 如何传-->
          </slot>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
  import {
    Columns,
    RowSelection,
    Scroll,
    TablePagination,
  } from '@/components/types/ATable';
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import ConstantField from '@/utils/ConstantFiled';

  @Component
  export default class WTable extends Vue {
    @Prop({
      type: Array as () => Columns,
      default: () => {
        return [{}];
      },
    })
    columns!: Columns;

    @Prop({
      type: [String, Function],
      default: 'id',
    })
    rowKey!: string | Function;

    @Prop({
      type: [Array, Function],
      required: true,
    })
    getTable!: Array<Object> | Function;

    @Prop({
      type: Object as () => Scroll,
    })
    scroll!: Scroll;

    @Prop({
      type: Object as () => RowSelection,
    })
    rowSelection!: RowSelection;

    @Prop({
      type: String,
    })
    size?: string;

    @Prop({
      type: Boolean,
      default: false,
    })
    noPagination?: boolean;

    @Prop({
      type: Function,
      default: () => {},
    })
    customRow?: Function;

    @Prop({
      type: Number,
      default: 10,
    })
    defaultPageSize!: number;
    @Watch('defaultPageSize', { immediate: true })
    onDefaultPageSizeChange() {
      this.pagination.pageSize = this.defaultPageSize;
      // this.fetchTableData();
    }

    scrollData: Scroll | null = null;
    dataSource: Array<any> = [];
    loading: boolean = false;
    pagination: TablePagination = {
      total: 0,
      defaultPageSize: this.defaultPageSize,
      pageSizeOptions: ['10', '20', '30', '40'],
      showTotal: (total: number) => `共${total}条`,
      showQuickJumper: true,
      showSizeChanger: true,
      current: 1,
      pageSize: 10,
    };

    @Watch('scroll', { immediate: true, deep: true })
    onScrollChange() {
      this.scrollData = this.scroll;
    }

    @Watch('getTable', { immediate: true, deep: true })
    onTableDataChange() {
      if (Array.isArray(this.getTable)) {
        this.dataSource = this.getTable;
      }
    }

    @Watch('columns', { immediate: true, deep: true })
    onColumnsChange() {
      if (!this.scroll) {
        const minWidth = 80;
        let total = 0;
        this.columns.forEach(item => {
          if (item.width && !Number.isNaN(Number(item.width))) {
            total += Number(item.width);
          } else {
            total += minWidth;
          }
        });
        if (this.rowSelection) {
          if (
            this.rowSelection.columnWidth &&
            !Number.isNaN(Number(this.rowSelection.columnWidth))
          ) {
            total += Number(this.rowSelection.columnWidth);
          } else {
            total += minWidth;
          }
        }
        total *= 1.1;
        this.scrollData = {
          x: total,
        };
      }
    }

    async fetchTableData(
      pageNo: number = this.pagination.current ? this.pagination.current : 1,
      pageSize: number = this.pagination.pageSize
        ? this.pagination.pageSize
        : this.defaultPageSize
    ) {
      if (typeof this.getTable === 'function') {
        this.loading = true;
        const res = await this.getTable({
          pageNo,
          pageSize,
        });
        this.loading = false;
        if (res.code !== ConstantField.RQ_SUCCESS) {
          //TODO
          return this.$message.error(res.msg);
        }
        this.dataSource = res.data.list;
        this.pagination.total = res.data.total;
      } else {
        this.dataSource = this.getTable;
        this.pagination.total = this.dataSource.length;
      }
    }

    pageChange(pagination: TablePagination, filters: any, sorter: any) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.fetchTableData(pagination.current, pagination.pageSize);
    }

    /**
     * 更新
     */
    updateTableData() {
      this.fetchTableData();
    }

    created() {
      this.fetchTableData();
    }

    get config() {
      return this.columns!.filter((item: any) => item.scopedSlots);
    }
  }
</script>

<style scoped lang="less">
  .w-table {
    border: none;

    /deep/ .ant-card-body {
      padding: 0;

      th {
        white-space: nowrap;
      }

      td {
        word-break: break-all;
      }

      .ant-table-body {
        overflow: auto !important;

        .ant-table-fixed {
          /*table-layout: fixed;*/

          col {
            /*width: 80px;*/
          }
        }
      }

      .ant-table-title {
        padding: @padding-md;
        top: 0;
        border-bottom: 0;
      }

      .ant-pagination {
        margin-right: @padding-md;
      }
    }
  }
</style>
