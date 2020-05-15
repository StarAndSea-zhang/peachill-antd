import Vue from 'vue'
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
import './assets/less/ant-theme.less';
import './assets/less/global.less';
import './plugins/ant-design';
import TLayout from './TLayout.vue'
import TMenu from './TMenu.vue'
import WCascader from './WCascader.vue'
import WCol from './WCol.vue'
import WDescription from './WDescription.vue'
import WEditor from './WEditor.vue'
import WFilter from './WFilter.vue'
import WFilterTimer from './WFilterTimer.vue'
import WForm from './WForm.vue'
import WFormComponent from './WFormComponent.vue'
import WFormItem from './WFormItem.vue'
import WH5 from './WH5.vue'
import WImage from './WImage.vue'
import WInfoPanel from './WInfoPanel.vue'
import WInput from './WInput.vue'
import WPopover from './WPopover.vue'
import WRadio from './WRadio.vue'
import WSelect from './WSelect.vue'
import WSubMenu from './WSubMenu.vue'
import WTable from './WTable.vue'
import WTimePicker from './WTimePicker.vue'
import WUpload from './WUpload.vue'
import WUploadImage from './WUploadImage.vue'

const Components:any = {
    TLayout,
    TMenu,
    WCascader,
    WCol,
    WDescription,
    WEditor,
    WFilter,
    WFilterTimer,
    WForm,
    WFormComponent,
    WFormItem,
    WH5,
    WImage,
    WInfoPanel,
    WInput,
    WPopover,
    WRadio,
    WSelect,
    WSubMenu,
    WTable,
    WTimePicker,
    WUpload,
    WUploadImage
}

// const install = function (Vue:any) {
//     Components.map((component:any) => {
//         Vue.use(component);
//     });
// }
//
// install(Vue);

// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue);
// }
    Object.keys(Components).forEach((name:string) => {
        Vue.component(name, Components[name])
    })

export default Components
