import moment, { Moment } from 'moment';
import WFormComponent from '@/components/WFormComponent.vue';

declare type TIMEMODE = 'time' | 'date' | 'month' | 'year';

declare type MODE = 'default' | 'multiple' | 'tags' | 'combobox';
declare type SIZE = 'small' | 'large' | 'default';
export class WComponentConfig {
  options: Array<any> = [];
  value: any;
  readonly?: boolean = false; // 是否只读
  //select radio 选项value的key值
  valueKey?: string;
  labelKey?: string;
  size?: string = 'default';
}

export class WRadioConfig extends WComponentConfig {
  options: Array<any> = [];
  disabled?: boolean = false; // 禁用
  buttonStyle?: string = 'outline';
  //选项value的key值
  valueKey?: string;
  labelKey?: string;
}

export class WSelectConfig extends WComponentConfig {
  allowClear?: boolean = true; // 是否可清空
  autoClearSearchValue?: boolean = true;
  defaultValue?: string | null = null;
  disabled?: boolean = false; // 禁用
  dropdownClassName?: string | null = null;
  // 是否根据输入项进行筛选
  filterOption?: boolean | Function = true;
  //默认高亮的选项
  firstActiveValue?: string | string[] = '';
  //最多显示五个tag
  maxTagCount?: number = 5;
  //每个tag最高默认显示7个字符
  maxTagTextLength?: number = 7;
  mode?: MODE = 'default';
  placeholder?: string = '';
  showSearch?: boolean = false;
  size?: SIZE = 'default';
  value: string | string[] | number | number[] = '';
  options: Array<{
    value: string | string[] | number | number[];
    label: string;
  }> = [];
  label?: string;
  defaultOpen?: boolean = false;
  open?: boolean = false;
  readonly?: boolean = false; // 是否只读
  handleChange?: Function;
}

export class WInputConfig extends WComponentConfig {
  addonAfter?: string | null = null;
  addonBefore?: string | null = null;
  defaultValue?: string | null = null;
  disabled?: boolean = false; // 禁用
  id?: string | null = null;
  prefix?: string | null = null;
  size?: string = 'default';
  suffix?: string | null = null; // 图标类名
  type?: string = 'text';
  value: string = '';
  allowClear?: boolean = true; // 是否可清空
  label?: string;
  required?: boolean = true;
  rule?: any;
  readonly?: boolean = false; // 是否只读
  maxlength?: string = ''; // 限制字数,默认是空
  // isHtml?: boolean = false;
  handleFocus?: Function;
  handleBlur?: Function;
  handleClick?: Function;
}

export class WTimePickerConfig extends WComponentConfig {
  type?: string;
  defaultValue?: Moment | Moment[] | null = null;
  defaultPickerValue?: Moment | Moment[] | null = null;
  disabledDate?: Function;
  disabledTime?: Function;
  format: string = 'YYYY-MM-DD';
  mode: TIMEMODE = 'date';
  showToday: boolean = true;
  showTime: boolean = false;
}

export class WUploadConfig extends WComponentConfig {
  // 最大允许文件上传个数
  limit?: number = 5;
  // 最大上传大小，单位 M
  fileSize?: number = 200;
  accept?: string;
  action?: string;
  directory?: boolean = false;
  data?: object;
  defaultFileList?: object[];
  disabled?: boolean = false;
  fileList?: object[];
  multiple?: boolean = false;
  withCredentials?: boolean = false;
}
