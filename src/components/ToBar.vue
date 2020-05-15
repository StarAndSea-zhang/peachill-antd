<template>
<div>的时间爱打架哈萨克都看见爱上的即可拉伸的卡拉 </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    @Component
    export default class ToBar extends Vue {
        @Prop({
            type:String,
            required:true
        })
        sourceCodeLink:string = '';

            openMyGithub() {
                const a = document.createElement('a')
                a.target = '_blank'
                a.href = 'https://github.com/ssthouse'
                a.click()
            }

            toMainPage() {
                this.$emit('to-main-page')
            }
    }
</script>

<style scoped>
    .top-bar-tooltip {
        font-size: 18px;
    }

    a {
        color: black;
    }
</style>
