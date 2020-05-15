import { AFile, AUploadChange } from '@/components/types/AUpload';
import { Component, Vue } from 'vue-property-decorator';
import { Response } from '@/api/types/Response';
import ConstantField from '@/utils/ConstantFiled';

@Component
export default class UploadImage extends Vue {
  imageAction: string = `${process.env.VUE_APP_FILE_API}admin/file/upload`; // 图片上传地址

  // 上传图片之前的检测
  beforeUpload(file: File, fileList: AFile[]): boolean | Promise<Response> {
    const imageTypes = [
      'image/png',
      'image/jpeg',
      'image/gif' /*, 'image/svg+xml'*/,
    ];
    const isImage = imageTypes.includes(file.type);
    if (!isImage) {
      this.$error({
        title: '图片上传错误',
        content: '仅支持上传图片的格式：jpg、jpeg、png、gif',
      });
    }
    const isLimit = file.size / 1024 / 1024 < 20;
    if (!isLimit) {
      this.$message.error('上传图片大小不能超过 20MB!');
    }
    return isImage && isLimit;
  }

  // 图片上传 change 事件
  handleChangeImage(info: AUploadChange, imageList: AFile[]) {
    // if (info.file.status === 'uploading' || info.file.status === 'done') {
    //   imageList.push(info.file);
    // }
  }

  handleDeleteImage(file: AFile, imageList: AFile[]) {
    // if (!file || !imageList || imageList.length === 0) {
    //   return false;
    // }
    // const fileItemIndex = imageList.findIndex(item => item.uid === file.uid);
    // imageList.splice(fileItemIndex, 1);
    // return true;
  }

  // 图片上传
  async handleUploadImage(data: any, imageList: AFile[], urlFull?: Boolean) {
    // const res = await uploadImage({
    //   file: data.file,
    //   ruleCode: 'game',
    // });
    // if (res.code !== ConstantField.RQ_SUCCESS) {
    //   this.handleDeleteImage(data.file, imageList);
    //   return this.$error({ title: res.msg });
    // }
    // const fileItem = imageList.find(item => item.uid === data.file.uid);
    // if (fileItem) {
    //   fileItem.uid = `${Number(
    //     Math.random()
    //       .toString()
    //       .substr(3, 12) + Date.now()
    //   ).toString(36)}`;
    //   fileItem.status = 'done';
    //   if (urlFull === true) {
    //     fileItem.url = `${process.env.VUE_APP_IMAGE_API}${res.data}`;
    //   } else {
    //     fileItem.url = res.data;
    //   }
    // }
    // return res;
  }
}
