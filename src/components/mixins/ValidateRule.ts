import { Component, Vue } from 'vue-property-decorator';
import { Regexp } from '@/utils/Regexp';

@Component
export default class ValidateRule extends Vue {
  validateRule: any = {
    floatPosition2: {
      pattern: Regexp.FLOAT_POSITION_2,
      message: '请输入最多两位小数的正数',
    },
    integerNonnegative: {
      pattern: Regexp.INTEGER_NONNEGATIVE,
      message: '请输入非负整数',
    },
  };

  get validateRules() {
    const obj: any = {};
    for (const key in this.validateRule) {
      const rule = this.validateRule[key];
      obj[key] = [{ required: true, message: rule.message }, rule];
    }
    return obj;
  }
}
