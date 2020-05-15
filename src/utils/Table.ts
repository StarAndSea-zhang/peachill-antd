import moment from 'moment';

export const Table = {
  // 自定义渲染显示浮点数，保留两位小数
  customRenderPrice: (value: number | string, row: object, index: number) => {
    if (Number.isNaN(Number(value))) {
      return '-';
    }
    return Number(value).toFixed(2);
  },

  customRenderPercent: (value: number | string, row: object, index: number) => {
    if (Number.isNaN(Number(value))) {
      return '-';
    }
    return `${(Number(value) * 100).toFixed(1)}%`;
  },

  customRenderTime: (
    value: string | number | null,
    row: object,
    index: number
  ) => {
    if (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
    return '-';
  },

  customRenderDate: (
    value: string | number | null,
    row: object,
    index: number
  ) => {
    if (value) {
      return moment(value).format('YYYY-MM-DD');
    }
    return '-';
  },
};
