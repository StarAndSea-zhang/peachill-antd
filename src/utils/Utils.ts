/**
 * 复制内容到剪贴板
 * @param val
 */
export function copyToClipboard(value: string) {
  const oInput = document.createElement('input');
  oInput.value = value;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  // 执行浏览器复制命令
  if (document.execCommand('Copy')) {
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    return true;
  }
  return false;
}
