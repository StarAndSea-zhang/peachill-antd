/**
 * 判断值是否为空
 * @param param
 * @returns {boolean}
 */
export function isNull(param: any) {
  if (param === null || param === undefined || param === '') {
    return true;
  } else if (Array.isArray(param) && param.length === 0) {
    return true;
  } else if (typeof param === 'object' && Object.keys(param).length === 0) {
    return true;
  }
  return false;
}

export function parseImageUrl(url?: string) {
  if (url) {
    return new RegExp('^(http|https)://').test(url)
      ? url
      : `${process.env.VUE_APP_IMAGE_API}${url}`;
  }
  return '';
}

/**
 * 资源树递归算法
 * @param parent
 * @param data
 */
export function parseTreeChildren(parent: any, data: any) {
  data.forEach((item: any) => {
    if (item.parentId === parent.id) {
      const i = {
        id: item.id,
        label: item.name,
        children: [],
      };
      parent.children.push(i);
      parseTreeChildren(i, data);
    }
  });
}

/**
 * 将金额数值转为大写的过滤器
 * @param 金额 {number}
 */
export function changeMoneyToChinese(money: number | string) {
  const cnNums = new Array(
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖'
  ); //汉字的数字
  const cnIntRadice = new Array('', '拾', '佰', '仟'); //基本单位
  const cnIntUnits = new Array('', '万', '亿', '兆'); //对应整数部分扩展单位
  const cnDecUnits = new Array('角', '分', '毫', '厘'); //对应小数部分单位
  //var cnInteger = "整"; //整数金额时后面跟的字符
  const cnIntLast = '元'; //整型完以后的单位
  const maxNum = 999999999999999.9999; //最大处理的数字

  let IntegerNum; //金额整数部分
  let DecimalNum; //金额小数部分
  let ChineseStr = ''; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  if (money === '') {
    return '';
  }
  if (typeof money === 'string') {
    money = parseFloat(money);
  }
  if (money >= maxNum) {
    //提示
    return '';
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast;
    return ChineseStr;
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    //获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum !== '') {
    //小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr === '') {
    ChineseStr += cnNums[0] + cnIntLast;
  }
  return ChineseStr;
}
