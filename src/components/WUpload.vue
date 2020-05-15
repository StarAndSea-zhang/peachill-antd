<!--
 * @Description: 
 * @Author ZhangYu
 * @Date 2019-12-30 12:18:33
 * @Params {}
 -->

<template>
  <div>
    <div v-if="config.readonly">
      <ul v-if="config.value && config.value.length > 0" class="file-list">
        <li v-for="(item, index) in config.value" :key="item.uid">
          <div :title="item.name" class="pull-left file-name">
            {{ item.name }}
          </div>
          <div class="pull-right">
            <a-button
              type="link"
              class="pull-right"
              @click="handlePreview(item)"
            >
              [查看]
            </a-button>
            <a-button
              v-if="config.readonly"
              lass="pull-right"
              type="link"
              @click="handleDownload(item)"
            >
              [下载]
            </a-button>
          </div>
        </li>
      </ul>
      <div v-else-if="config.readonly">
        暂无文件
      </div>
    </div>
    <a-upload
      v-else
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :file-list="config.value"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <a-button v-if="config.limit ? config.value.length < config.limit : true">
        <a-icon type="upload" />
        上传附件
      </a-button>
    </a-upload>
    <div
      v-if="!config.readonly && config.limit"
      slot="extra"
      class="w-upload-extension"
    >
      最多上传{{ config.limit }}个文件
    </div>
    <div
      v-if="!config.readonly && extension"
      slot="extra"
      class="w-upload-extension"
    >
      支持扩展名： {{ extension }}
    </div>
    <!--    预览图片对话框-->
    <a-modal
      v-model="imageDialogVisible"
      :title="config.readonly ? '查看图片' : '预览图片'"
      :footer="null"
    >
      <img alt="云图" style="width: 100%" :src="previewImage" />
    </a-modal>
    <!--    预览PDF对话框-->
    <a-modal
      v-model="pdfDialogVisible"
      :title="config.readonly ? '查看PDF' : '预览PDF'"
      :footer="null"
    >
      <iframe
        v-if="fileUrl"
        :src="fileUrl"
        width="100%"
        height="100%"
        style="border-width: 1px"
      >
        您的浏览器暂不支持预览文件，请换浏览器重试
      </iframe>
      <div v-else>
        此文件暂不支持预览
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { MIMETYPE } from '@/components/types/WFile';
  import { WUploadConfig } from '@/components/types/WComponentConfig';
  import WFormComponent from '@/components/WFormComponent.vue';

  @Component
  export default class WUpload extends WFormComponent {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WUploadConfig();
      },
    })
    config!: WUploadConfig;

    /**
     * 对话框显示
     */
    imageDialogVisible: boolean = false;

    /**
     * 预览链接
     */
    previewImage: string = '';

    /**
     * paf对话框
     */
    pdfDialogVisible: boolean = false;
    fileUrl: string | null = null;

    handleChange(info: any) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      this.config.value = fileList;
    }

    get showText() {
      return '';
    }

    getFileType(file: any) {
      if (!file) {
        return false;
      }
      const name = file.name;
      const arr = name.split('.');
      return arr.pop();
    }

    handlePreview(file: any) {
      const extension = this.getFileType(file);
      let folder: string = '';
      const type = MIMETYPE;
      Object.keys(type).forEach((i: string) => {
        const item = type[i];
        if (item.extensions.indexOf(extension) > -1) {
          folder = item.folder;
        }
      });
      const url = `${process.env.VUE_APP_FILE_API}/${folder}${file.url}`;
      switch (folder) {
        case 'image':
          // this.previewImage = url;
          this.previewImage =
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
          this.imageDialogVisible = true;
          break;
        case 'pdf':
          this.fileUrl = url;
          this.pdfDialogVisible = true;
          break;
        case 'doc':
        case 'excel':
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${url}`
          );
          break;
        case 'video':
          window.open(url);
          break;
        default:
          // this.$alert('此文件暂不支持预览');
          // this.dialogVisible = true;
          break;
      }
    }

    handleDownload(file: any) {
      const extension = this.getFileType(file);
      const mime = MIMETYPE;
      let folder = null;
      if (mime.DOC.extensions.indexOf(extension) > -1) {
        folder = mime.DOC.folder;
      } else if (mime.EXCEL.extensions.indexOf(extension) > -1) {
        folder = mime.EXCEL.folder;
      } else if (mime.PDF.extensions.indexOf(extension) > -1) {
        folder = mime.PDF.folder;
      } else if (mime.ZIP.extensions.indexOf(extension) > -1) {
        folder = mime.ZIP.folder;
      } else if (mime.IMAGE.extensions.indexOf(extension) > -1) {
        folder = mime.IMAGE.folder;
      } else if (mime.VIDEO.extensions.indexOf(extension) > -1) {
        folder = mime.VIDEO.folder;
      } else {
        this.$message.error('未知错误');
        return;
      }
      const a = document.createElement('a'); // 创建a标签
      a.setAttribute('download', file.name); // download属性
      a.setAttribute(
        'href',
        `${process.env.VUE_APP_FILE_API}/${folder}${file.url}`
      ); // href链接
      a.setAttribute('target', '_black');
      a.click(); // 自执行点击事件
    }

    beforeUpload(file: any): boolean {
      let isLimit = true;
      // if (this.fileSize) {
      //     isLimit = file.size / 1024 / 1024 < this.config.fileSize;
      //     if (!isLimit) {
      //         let notice = '';
      //         if (this.limit) {
      //             notice += `最多可上传 ${this.config.limit} 个文件,`;
      //         }
      //         this.$message.error(`${notice} 单个文件不能超过 ${this.config.fileSize}MB`);
      //     }
      // }
      if (!this.checkFileType(file)) {
        isLimit = false;
        this.$error({
          title: `当前仅支持上传文件扩展名：${this.extension}`,
          content: '文件上传失败',
        });
      }
      if (this.config.limit) {
        if (
          this.config.value &&
          this.config.value.length + 1 > this.config.limit
        ) {
          isLimit = false;
          this.$error({ title: `最多支持上传 ${this.config.limit} 个文件` });
        }
      }
      return isLimit;
    }
    checkFileType(file: any) {
      const fileType = this.getFileType(file);
      if (fileType) {
        return this.mimeTypes.indexOf(fileType) !== -1;
      }
      return false;
    }

    get mimeTypes() {
      const doc = MIMETYPE.DOC.extensions;
      const excel = MIMETYPE.EXCEL.extensions;
      const pdf = MIMETYPE.PDF.extensions;
      const zip = MIMETYPE.ZIP.extensions;
      const image = MIMETYPE.IMAGE.extensions;
      const extensions = [...doc, ...excel, ...pdf, ...zip, ...image];
      return extensions;
    }

    get extension() {
      let str = null;
      const val = this.mimeTypes;
      if (val && val.length > 0) {
        str = '';
        for (let i = 0; i < val.length; i++) {
          str += ` .${val[i]} `;
          if (i < val.length - 1) {
            str += '|';
          }
        }
      }
      return str;
    }
  }
</script>

<style scoped lang="less">
  .file-list {
    padding: 0;
    margin: 0;
    font-size: 12px;
    line-height: 28px;
    li {
      padding: 0 15px;
      margin: 5px 0;
      background: #e6f7ff;
      overflow: auto;
      .file-name {
        display: inline-block;
        /*width: 30%;*/
        max-width: 400px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>
