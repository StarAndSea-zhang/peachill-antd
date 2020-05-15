<template>
  <a-row class="w-description">
    <template v-if="data.length == 0">
      暂无数据
    </template>
    <template v-else>
      <w-col v-for="(item, key) in data" :key="key" :span="item.span">
        <span v-if="item[labelField]" class="w-description--label">
          {{ item[labelField] }}
        </span>
        <span class="w-description--content">
          <slot
            v-if="item.slots && item.slots.content"
            name="content"
            :record="item"
            :index="key"
          />
          <template v-else-if="item[contentField] || item[contentField] === 0">
            {{ item[contentField] }}
          </template>
          <template v-else>暂无数据</template>
        </span>
      </w-col>
    </template>
    <slot />
  </a-row>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { TData } from '@/components/types/WDescription';

  interface IReplaceFields {
    label?: string;
    content?: string;
  }

  @Component
  export default class WDescription extends Vue {
    @Prop({
      type: Array as () => TData,
      default: () => [],
    })
    data!: TData;

    @Prop({
      type: Object as () => IReplaceFields,
    })
    replaceFields!: IReplaceFields;

    get labelField() {
      if (this.replaceFields && this.replaceFields.label) {
        return this.replaceFields.label;
      }
      return 'label';
    }

    get contentField() {
      if (this.replaceFields && this.replaceFields.content) {
        return this.replaceFields.content;
      }
      return 'content';
    }
  }
</script>

<style lang="less" scoped>
  .w-description {
    & > div {
      padding-bottom: @padding-xs;
    }

    &--label,
    &--content {
      display: inline-block;
      line-height: 1.5;
    }

    &--label {
      color: rgba(@black, 0.85);
      &:after {
        content: ':';
        position: relative;
        top: -0.5px;
        margin: 0 8px 0 2px;
      }
    }
    &--content {
      color: rgba(@black, 0.65);
    }
  }
</style>
