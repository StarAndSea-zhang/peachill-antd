<template functional>
  <a-col
    :gutter="props.gutter"
    :xs="24"
    :sm="24"
    :md="props.span > 3 ? 24 : 12"
    :lg="props.span > 3 ? 24 : 12"
    :xl="(props.span * 24) / 6"
    :xxl="(props.span * 24) / 6"
  >
    <slot />
  </a-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { spans, TSpan } from '@/components/types/WCol';

  @Component
  export default class WCol extends Vue {
    @Prop({
      type: Number as () => TSpan,
      default: 2,
      validator(value: any): boolean {
        return spans.includes(value);
      },
    })
    span!: TSpan; // 总分为 6 列，占几列，值只能是 2，3，4，6

    @Prop({
      type: Number,
      default: 20,
    })
    gutter!: number;
  }
</script>

<style lang="less" scoped></style>
