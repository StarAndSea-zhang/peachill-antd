export interface RadioOption {
  name: string;
  value: string;
  active?: boolean;
}

export interface SelectOption {
  key?: string;
  label: string;
  value?: string;
}

export interface TimerConfig {
  label?: string | boolean;
  format?: string;
  placeholder?: string;
  showTime?: boolean;
  startTimeLabel?: string | boolean;
  endTimeLabel?: string | boolean;
}

export interface TimerData {
  startTime: string;
  endTime: string;
}

export interface FilterConfigItem {
  /**
   * 筛选标题
   */
  label: string;

  value: string | SelectOption | Array<SelectOption>;
  /**
   * 筛选组件的类型
   * @Default 'input'
   */
  type?: 'input' | 'radio' | 'select' | 'cascader';
  /**
   * 是否支持多选 multiple 代表多选
   */
  mode?: string;
  span?: number;
}

export interface FilterConfigInput extends FilterConfigItem {
  type?: 'input';
}

export interface FilterConfigSelect extends FilterConfigItem {
  type: 'radio' | 'select' | 'cascader';
  /**
   * radio select 的值类型
   */
  options: Array<RadioOption> | Array<SelectOption>;
}

export interface FilterConfig {
  [key: string]: FilterConfigSelect | FilterConfigInput;
}
