<template functional>
  <a-popover
    overlay-class-name="w-popover"
    v-bind="data.attrs"
    :visible="data.model.value"
    :title="$slots.title ? undefined : props.title"
    :trigger="props.trigger"
    :placement="props.placement"
    :get-popup-container="trigger => trigger.parentNode"
    v-on="listeners"
  >
    <template v-if="$slots.title" slot="title">
      <div class="w-popover--header">
        <slot name="title" />
      </div>
    </template>
    <template v-if="$slots.content" slot="content">
      <div class="w-popover--content">
        <slot name="content" />
      </div>
      <div v-if="props.buttons" class="w-popover--footer">
        <slot name="footer">
          <a-button type="link" size="small" @click="listeners.cancel">
            {{ props.cancelText }}
          </a-button>
          <a-button type="primary" size="small" @click="listeners.ok">
            {{ props.okText }}
          </a-button>
        </slot>
      </div>
    </template>
    <slot />
  </a-popover>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Placement, Placements } from '@/components/types/WPopover';

  @Component({
    model: {
      prop: 'visible',
      event: 'visibleChange',
    },
  })
  export default class WPopover extends Vue {
    @Prop({
      type: String,
      default: undefined,
    })
    title!: string;

    @Prop({
      type: String,
      default: 'click',
    })
    trigger!: string;

    @Prop({
      type: String as () => Placement,
      default: 'bottomLeft',
      validator(value: any): boolean {
        return Placements.includes(value);
      },
    })
    placement!: Placement;

    @Prop({
      type: Boolean,
      default: true,
    })
    buttons!: boolean;

    @Prop({
      type: String,
      default: '取消',
    })
    cancelText!: string;

    @Prop({
      type: String,
      default: '确认',
    })
    okText!: string;
  }
</script>

<style lang="less" scoped></style>
