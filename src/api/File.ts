// import { Response } from '@/api/types/Response';
// import Request from '@/utils/Request';
//
// /**
//  * 下载图片
//  * @param data
//  */
// export async function uploadImage(data: {
//   file: File;
//   ruleCode: 'game';
// }): Promise<Response<string>> {
//   const form = new FormData();
//   form.append('file', data.file);
//   form.append('ruleCode', data.ruleCode);
//   return (await new Request().createAPI('/plat/file/uploadimg', 'POST', form))
//     .data;
// }
//
// /**
//  * 下载文件
//  * @param data
//  */
// export async function uploadFile(data: {
//   file: File;
//   url?: string;
// }): Promise<Response<string>> {
//   const form = new FormData();
//   form.append('file', data.file);
//   let url = data.url;
//   if (!url) {
//     url = '/plat/file/uploadimg';
//   }
//   return (await new Request().createAPI(url, 'POST', form)).data;
// }
