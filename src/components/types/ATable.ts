import { Pagination } from '@/components/types/APagination';
import { ScopedSlot } from 'vue/types/vnode';
import { VNode } from 'vue';

type SortOrder = 'ascend' | 'descend';

export interface ColumnFilterItem {
  text?: string;
  value?: string;
  children?: any;
}

export type Columns = Column[];

export interface Column {
  // 设置列内容的对齐方式 'left' | 'right' | 'center' 'left'
  align?: 'left' | 'right' | 'center';

  // 表头列合并,设置为 0 时，不渲染 number
  colSpan?: number;

  // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法 string -
  dataIndex?: string;

  // 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 VNode | slot-scope -
  filterDropdown?: VNode | ScopedSlot;

  // 用于控制自定义筛选菜单是否可见 boolean -
  filterDropdownVisible?: boolean;

  // 标识数据是否经过过滤，筛选图标会高亮 boolean false
  filtered?: boolean;

  // 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 string[] -
  filteredValue?: string[];

  // 自定义 filter 图标。 VNode | (filtered: boolean, column: Column) => vNode |slot |slot-scope false
  filterIcon?: VNode | ScopedSlot;

  // 是否多选 boolean true
  filterMultiple?: boolean;

  // 表头的筛选菜单项 object[] -
  filters?: ColumnFilterItem[];

  // 列是否固定，可选 true(等效于 left) 'left' 'right' boolean|string false
  fixed?: boolean | 'left' | 'right';

  // Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 string -
  key?: string;

  // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并,可参考 demo 表格行/列合并 Function(text, record, index) {}|slot-scope -
  customRender?: Function | ScopedSlot;

  // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true Function|boolean -
  sorter?: boolean | Function;

  // 排序的受控属性，外界可用此控制列的排序，可设置为 'ascend' 'descend' false boolean|string -
  sortOrder?: boolean | SortOrder;

  // 列头显示文字 string|slot -
  title?: any;

  // 列宽度 string|number -
  width?: string | number;

  // 设置单元格属性 Function(record, rowIndex) -
  customCell?: (
    record: any,
    rowIndex: number
  ) => {
    props: object;
    attrs: object;
    on: object;
    class: object;
    style: object;
    nativeOn: object;
  };

  // 设置头部单元格属性 Function(column) -
  customHeaderCell?: (
    column: any
  ) => {
    props: object;
    attrs: object;
    on: object;
    class: object;
    style: object;
    nativeOn: object;
  };

  // 本地模式下，确定筛选的运行函数, 使用 template 或 jsx 时作为filter事件使用 Function -
  onFilter?: Function;

  // 自定义筛选菜单可见变化时调用，使用 template 或 jsx 时作为filterDropdownVisibleChange事件使用 function(visible) {} -
  onFilterDropdownVisibleChange?: (visible: boolean) => void;

  // 使用 columns 时，可以通过该属性配置支持 slot 的属性，如 slots: { filterIcon: 'XXX'} object -
  slots?: object;

  // 使用 columns 时，可以通过该属性配置支持 slot-scope 的属性，如 scopedSlots: { customRender: 'XXX'} object -
  scopedSlots?: object;
}

export interface TablePagination extends Pagination {
  position?: 'top' | 'bottom' | 'both';
}

export interface ColumnGroup {
  /**
   * Title of the column group
   * @type any
   */
  title: any;

  /**
   * When using columns, you can use this property to configure the properties that support the slot,
   * such as slots: { title: 'XXX'}
   * @type object
   */
  slots: object;
}

export interface Selection {
  /**
   * Key
   * @description Unique key of this selection
   * @default undefined
   * @type string
   */
  key?: string;

  /**
   * Text
   * @description Display text of this selection
   * @default undefined
   * @type string | VNode
   */
  text?: string | VNode;

  /**
   * On Select
   * @description Callback executed when this selection is clicked
   * @default undefined
   * @type Function
   */
  onSelect?: (changeableRowKeys?: any) => any;
}

export interface RowSelection<T = any> {
  /**
   * checkbox or radio
   * @default 'checkbox'
   * @type string
   */
  type?: 'checkbox' | 'radio';

  /**
   * Controlled selected row keys
   * @type string[]
   */
  selectedRowKeys?: string[];

  /**
   * Get Checkbox or Radio props
   * @type Function
   */
  getCheckboxProps?: (record: any) => any;

  /**
   * Custom selection config, only displays default selections when set to true
   * @type boolean | object[]
   */
  selections?: boolean | Selection[];

  /**
   * Remove the default Select All and Select Invert selections
   * @default false
   * @type boolean
   */
  hideDefaultSelections?: boolean;

  /**
   * Fixed selection column on the left
   * @type boolean
   */
  fixed?: boolean;

  /**
   * Set the width of the selection column
   * @type string | number
   */
  columnWidth?: string | number;

  /**
   * Set the title of the selection column
   * @type string | VNode
   */
  columnTitle?: string | VNode;

  /**
   * Callback executed when selected rows change
   * @type Function
   */
  onChange?: (selectedRowKeys: Array<string>, selectedRows: Array<T>) => any;

  /**
   * Callback executed when select/deselect one row
   * @type Function
   */
  onSelect?: (
    record: any,
    selected: boolean,
    selectedRows: Array<T>,
    nativeEvent: Event
  ) => any;

  /**
   * Callback executed when select/deselect all rows
   * @type Function
   */
  onSelectAll?: (
    selected: boolean,
    selectedRows: Array<T>,
    changeRows: object[]
  ) => any;

  /**
   * Callback executed when row selection is inverted
   * @type Function
   */
  onSelectInvert?: (selectedRows: Object[]) => any;
}

export interface Scroll {
  x?: number | true;
  y?: number;
}
