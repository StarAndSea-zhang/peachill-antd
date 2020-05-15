<template>
  <div>
    <textarea v-if="!readonly" :id="id" />
    <div v-else v-html="editorValue">
      <!--{{ handleDecodeHtml(editorValue) }}-->
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class WEditor extends Vue {
    @Prop({
      type: String,
      required: true,
    })
    data!: string;
    @Prop({
      type: Boolean,
      default: false,
    })
    readonly!: boolean;

    id: string = `editor-${Number(
      Math.random()
        .toString()
        .substr(3, 12) + Date.now()
    ).toString(36)}`;
    editor: any = null;
    editorValue: string = '';

    // 监听传入的data值，实时变更编辑器的value
    @Watch('data', {
      immediate: true,
    })
    onDataChange() {
      this.editorValue = this.handleEncodeScript(this.data);
      this.setContent();
    }

    // 设置编辑器的value值
    setContent(): void {
      if (this.editorValue && this.editor) {
        this.editor.setData(this.editorValue);
      }
    }

    // 编辑器value更改时，改值
    changeContent(): void {
      const value: string = this.editor ? this.editor.getData() : '';
      this.editorValue = this.handleEncodeScript(value);
      this.$emit('change', value);
    }

    // 获取编辑器的value值
    getContent(): string {
      return this.editorValue;
    }

    handleEncodeScript(value: string) {
      let val = value.replace(/<script>/g, '&lt;script&gt;');
      val = val.replace(/<\/script>/g, '&lt;/script&gt;');
      return val;
    }

    handleDecodeHtml(value: string) {
      interface IEntities {
        [key: string]: string;
      }
      const arrEntities: IEntities = {
        lt: '<',
        gt: '>',
        nbsp: ' ',
        amp: '&',
        quot: '"',
      };
      return value.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(
        all: string,
        key: string
      ): string {
        return arrEntities[key] ? arrEntities[key] : '';
      });
    }

    handleEasyImageResponse(res: any) {
      // let data: string | object = '';
      // if (res) {
      //   if (res.code === ConstantField.RQ_SUCCESS && res.data && res.data.url) {
      //     data = {default: ConstantField.IMAGE_API + res.data.url};
      //   } else {
      //     data = res.msg;
      //   }
      // }
      // return data;
    }

    initCKEditor() {
      const editor = document.getElementById(this.id);
      const _this = this;
      if (!editor || this.editor !== null) {
        return;
      }
      try {
        // 渲染编辑器
        const windowObject: any = window;
        _this.editor = windowObject.CKEDITOR.replace(_this.id, {
          // cloudServices_uploadUrl: ConstantField.UPLOAD_FILE_URL,
          // cloudServices_tokenUrl: ConstantField.UPLOAD_FILE_URL,
          language: 'zh-cn',
          height: 400,
          uiColor: '#FAFAFA',
          resize_enabled: false, // 去除底部栏
          toolbarGroups: [
            { name: 'tools', groups: ['tools'] },
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'styles', groups: ['styles'] },
            { name: 'colors', groups: ['colors'] },
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            '/',
            {
              name: 'paragraph',
              groups: [
                'indent',
                'align',
                'blocks',
                'bidi',
                'list',
                'paragraph',
              ],
            },
            { name: 'document', groups: ['mode', 'document', 'doctools'] },
            { name: 'forms', groups: ['forms'] },
            {
              name: 'editing',
              groups: ['find', 'selection', 'spellchecker', 'editing'],
            },
            { name: 'links', groups: ['links'] },
            { name: 'insert', groups: ['insert'] },
            { name: 'others', groups: ['others'] },
            { name: 'about', groups: ['about'] },
          ],
          // extraPlugins: 'image2',
          removePlugins: 'elementspath,image, image2', //,easyimage', // 去掉底部标签显示
          removeButtons:
            'Source,Save,NewPage,Templates,Preview,Print,Find,Replace,SelectAll,Scayt,Styles,Form,Format,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Flash,Smiley,SpecialChar,PageBreak,Iframe,BGColor,ShowBlocks,About,Cut,Copy,Paste,PasteText,PasteFromWord',
          cloudServices_uploadUrl: `/plat/file/uploadimg`,
          // fileTools_responseData: _this.handleUploadFileResponse,
          // fileTools_requestHeaders: JSON.parse(localStorage.getItem('headers')),
          easyimage_responseData: _this.handleEasyImageResponse,
          easyimage_uploaded: _this.changeContent, // 设置图片更改url之后，更新一次编辑器的内容。
          easyimage_uploaded_failed: _this.changeContent, // 图片上传失败，更新一次编辑器内容。
        });

        //  CKEditor 初始化完成加载数据
        _this.editor.on('instanceReady', function() {
          _this.setContent();
          const $this: JQuery = this;
          $this.on('change', function() {
            //  CKEditor 数据改变-监听
            _this.changeContent();
          });
        });
      } catch (e) {
        console.log(e);
      }
    }

    mounted(): void {
      this.initCKEditor();
    }
  }
</script>

<style lang="less" scoped></style>
