import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Validator extends Vue {
  /**
   * 校验手机号 11位
   */
  telValidator(rule: any, val: string) {
    return /^\d{11}$/.test(val);
  }

  /**
   * 校验密码 8,16位数字字母特殊字符取其中之一
   */
  validator(rule: any, val: string) {
    return /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}/.test(val);
  }

  /**
   * 验证码规则 6位小数
   */
  smsCodeValidator(rule: any, val: string) {
    return /^\d{6}$/.test(val);
  }

  pwdRules: Array<Rules> = [
    {
      validator: this.validator,
      message:
        '密码长度为8-16位，至少有数字、字母或字符的两种组合，字母区分大小写',
    },
  ];

  telRules: Array<Rules> = [
    { required: true, message: '请填写手机号' },
    { validator: this.telValidator, message: '请填写11位正确的手机号' },
  ];

  smsCodeRules: Array<Rules> = [
    { validator: this.smsCodeValidator, message: '请填写6位正确的验证码' },
  ];
}

interface Rules {
  required?: boolean;
  validator?: any;
  message: string;
}
