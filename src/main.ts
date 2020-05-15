import Vue from 'vue'
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
import './assets/less/ant-theme.less';
import './assets/less/global.less';
import './plugins/ant-design';
import TLayout from './components/TLayout.vue'
import TMenu from './components/TMenu.vue'
import WCascader from './components/WCascader.vue'
import WCol from './components/WCol.vue'
import WDescription from './components/WDescription.vue'
import WEditor from './components/WEditor.vue'
import WFilter from './components/WFilter.vue'
import WFilterTimer from './components/WFilterTimer.vue'
import WForm from './components/WForm.vue'
import WFormComponent from './components/WFormComponent.vue'
import WFormItem from './components/WFormItem.vue'
import WH5 from './components/WH5.vue'
import WImage from './components/WImage.vue'
import WInfoPanel from './components/WInfoPanel.vue'
import WInput from './components/WInput.vue'
import WPopover from './components/WPopover.vue'
import WRadio from './components/WRadio.vue'
import WSelect from './components/WSelect.vue'
import WSubMenu from './components/WSubMenu.vue'
import WTable from './components/WTable.vue'
import WTimePicker from './components/WTimePicker.vue'
import WUpload from './components/WUpload.vue'
import WUploadImage from './components/WUploadImage.vue'
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

Object.keys(Components as any).forEach((name :string)=> {
    Vue.component(name, (Components as any)[name])
})

export default Components
