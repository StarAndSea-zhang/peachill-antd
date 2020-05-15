<!--
 * @Description: 
 * @Author ZhangYu
 * @Date 2019-12-31 14:10:33
 * @Params {}
 -->

<template>
  <div class="clearfix">
    <div v-if="config.readonly">
      <div v-if="config.value && config.value.length > 0">
        <div
          v-for="(item, index) of config.value"
          :key="index"
          class="image-uploader"
          style="margin-right: 10px; display: inline-block"
        >
          <div class="image-preview">
            <img style="width: 100px; height: 100px" :src="item" />
          </div>
        </div>
      </div>
      <div v-else class="form-item-text form-item-no-text">
        暂无图片
      </div>
    </div>
    <div v-else>
      <a-upload
        :action="BASE_IMAGE_URL"
        :headers="headers"
        list-type="picture-card"
        :file-list="config.value"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="config.limit ? config.value.length < config.limit : true">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            添加图片
          </div>
        </div>
      </a-upload>
      <div
        v-if="config.readonly || config.placeholder"
        class="w-upload-extension"
      >
        建议尺寸：800*800像素,支持格式 .jpg | .jpeg | .png | .gif
      </div>
      <div v-else class="w-upload-extension">
        {{ config.placeholder }}支持格式 .jpg | .jpeg | .png | .gif
      </div>
      <div v-if="!config.readonly && config.limit" class="w-upload-extension">
        最多上传{{ config.limit }}张
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WUploadConfig } from '@/components/types/WComponentConfig';
  import WFormComponent from '@/components/WFormComponent.vue';
  @Component
  export default class WUploadImage extends WFormComponent {
    @Prop({
      type: Object,
      required: true,
      default: () => {
        return new WUploadConfig();
      },
    })
    config!: WUploadConfig;

    headers: object = {
      sessionId: window.localStorage.getItem('sessionId'),
    };
    previewImage: string = '';
    loading: boolean = false;
    previewVisible: boolean = false;
    BASE_IMAGE_URL: string = process.env.VUE_APP_IMAGE_API;
    beforeUpload(file: any) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('请上传支持的图片格式(png|jpg|jpeg|gif)!');
      }
      let isLt2M = true;
      if (this.config.fileSize) {
        isLt2M = file.size / 1024 / 1024 < this.config.fileSize;
        if (!isLt2M) {
          this.$message.error(`图片必须小于 ${this.config.fileSize}MB!`);
        }
      }
      return isJPG && isLt2M;
    }

    handlePreview(file: any) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    }
    handleChange(info: any) {
      console.log('传图', info.file);
      this.config.value = [...info.fileList];
    }

    handleCancel() {
      this.previewVisible = false;
    }
  }
</script>

<style scoped></style>
