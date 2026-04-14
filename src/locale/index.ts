import { createI18n } from "vue-i18n";
import en from './lang/en'
import zh from "./lang/zh";

//由App.vue动态切换语言
const i18n = createI18n({
    //locale:'zh',
    fallbackLocale: 'en', // 替补语言
    globalInjection:true,//全局配置
    legacy:false,//用于区分是否使用组合式api，vue3要设为false
    messages:{en,zh}//所有语言

})

export default i18n