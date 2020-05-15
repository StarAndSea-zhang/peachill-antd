<template>
  <div
    class="w-image"
    :class="{ 'w-image__error': error || !src }"
    @click="handlePreview"
  >
    <template v-if="!src">
      暂无图片
    </template>
    <template v-else-if="error">
      加载失败
    </template>
    <template v-else>
      <img
        v-bind="$attrs"
        :src="src"
        :alt="alt"
        :style="styles"
        @error="error = true"
      />
      <a-modal v-model="visible" class="w-image__modal" :footer="null">
        <img
          :src="src"
          :alt="alt"
          :style="styles"
          style="max-width: 100%; max-height: 100%;"
        />
      </a-modal>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  type Fit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  const fits: Fit[] = ['fill', 'contain', 'cover', 'none', 'scale-down'];

  @Component
  export default class WImage extends Vue {
    @Prop(String) src!: string;

    @Prop(String) alt!: string;

    @Prop({
      type: String as () => Fit,
      validator(value: any): boolean {
        return fits.includes(value);
      },
    })
    fit!: Fit;

    error: boolean = false;
    visible: boolean = false;

    get styles(): object {
      if (this.fit) {
        return {
          objectFit: this.fit,
        };
      }
      return {};
    }

    handlePreview() {
      if (this.error) {
        this.$error({
          title: '失败',
          content: '图片加载失败，请刷新重试',
        });
      } else {
        this.visible = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @image-size: 80px;

  .w-image {
    width: @image-size;
    height: @image-size;
    line-height: @image-size;
    text-align: center;
    cursor: pointer;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    &__error {
      cursor: auto;
      background: rgba(@black, 0.15);
      padding: 0 5px;
      font-size: 13px;
    }
  }
</style>
