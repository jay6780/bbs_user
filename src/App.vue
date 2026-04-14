<template>
    <el-config-provider :locale="localLanguage">
        <!--html页元信息-->
        <metainfo>
            <template v-slot:title="{ content }">{{ content }}</template>
        </metainfo>
        <router-view v-if="$store.state.supportAccessDevice == 1 || $store.state.supportAccessDevice == 2"></router-view>

        <div class="main backgroundModule" v-if="$store.state.supportAccessDevice != 1 && $store.state.supportAccessDevice != 2">
            <!-- title:电脑端浏览入口已关闭  sub-title:请尝试使用手机端浏览器访问本站-->
            <el-result icon="error" :title="i18n.t('app.10')" :sub-title="i18n.t('app.20')" >
                <template #extra>
                    <!-- 访问手机端网站-->
                    <el-button type="primary" @click="setAccessMobile">{{i18n.t('app.30')}}</el-button>
                </template>
            </el-result>
        </div>
       
    </el-config-provider>
</template>
<script setup lang="ts">
    import { onMounted, getCurrentInstance, ComponentInternalInstance, watch, reactive, computed,} from 'vue'
    import { AxiosResponse } from 'axios'
    import { appStore } from "@/store";
    import { ElConfigProvider } from 'element-plus'

    //国际化
    import language_zh_cn from 'element-plus/es/locale/lang/zh-cn'//中文
    import language_en from 'element-plus/es/locale/lang/en'//英文
    import { queryBaseInfo } from '@/utils/requestAPI';
    import { useI18n } from 'vue-i18n';


    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    let i18n = useI18n();


    // 获取浏览器默认语言
    const getBrowserLang = () => {
        let language = navigator.language;//访问浏览器的首选语言
        if(language == "zh" || language.startsWith("zh-")){
            return "zh";
        }

        
        return "en";
    };

  
    const localLanguage = computed(() => {

        let languageCode = window.localStorage.getItem("language");
        if(languageCode == null){//如果用户未设置语言
            //如果前端设置了默认语言
            if(store.state.defaultLanguage != null && store.state.defaultLanguage != ''){
                if(store.state.defaultLanguage.startsWith("zh_")){
                    store.state.currentLanguage = "zh";
                    i18n.locale.value =  "zh";
                    document.getElementsByTagName("html")[0].lang = 'zh';
                    return language_zh_cn;
                }
                if(store.state.defaultLanguage.startsWith("en_")){
                    store.state.currentLanguage = "en";
                    i18n.locale.value =  "en";
                    document.getElementsByTagName("html")[0].lang = 'en';
                    return language_en;
                }
            }else{
                if(getBrowserLang() == "zh"){
                    store.state.currentLanguage = "zh";
                    i18n.locale.value =  "zh";
                    document.getElementsByTagName("html")[0].lang = 'zh';
                    return language_zh_cn;
                }
                if(getBrowserLang() == "en"){
                    store.state.currentLanguage = "en";
                    i18n.locale.value =  "en";
                    document.getElementsByTagName("html")[0].lang = 'en';
                    return language_en;
                }
            }
        }else{
            if(languageCode.startsWith("zh_")){
                store.state.currentLanguage = "zh";
                i18n.locale.value =  "zh";
                document.getElementsByTagName("html")[0].lang = 'zh';
                return language_zh_cn;
            }
        }
        
        store.state.currentLanguage = "en";
        i18n.locale.value =  "en";
        document.getElementsByTagName("html")[0].lang = 'en';
        return language_en;
    });

    /**
     * 查询基本信息
    
    const queryBaseInfo = () => {
        proxy?.$axios({
            url: '/baseInfo',
            method: 'get',
            params:  {
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            const result: any = response.data;
            if(result){
                setTimeout(function () {
                let resultData = JSON.parse(result);
                store.commit('setBaseURL', resultData.baseURL);
                store.commit('setCommonPath', resultData.commonPath);
                store.commit('setContextPath', resultData.contextPath);
                store.commit('setTemplateDir', resultData.templateDir);
                store.commit('setTitle', resultData.title);
                store.commit('setKeywords', resultData.keywords);
                store.commit('setDescription', resultData.description);
                if(resultData.systemUser != null){
                    store.commit('setSystemUser', resultData.systemUser);
                }
                store.commit('setBaseURI', resultData.baseURI);
                store.commit('setFileStorageSystem', resultData.fileStorageSystem);
                store.commit('setSupportAccessDevice', resultData.supportAccessDevice);
                store.commit('setWeixin_oa_appid', resultData.weixin_oa_appid);
                }, 3000);
                
  
               
                

            }

        }).catch((error: any) =>{
            console.log(error);
        });

    }**/

    //设置访问手机端(需要配合Nginx使用，Nginx配置文件加入判断Cookie值是否为mobile)
    const setAccessMobile = () => {
        //accessModule: pc 或 mobile
        document.cookie = "accessModule=mobile;path=/";
        window.location.reload();
    }


    //监听到用户信息版本号变化时执行刷新登录用户信息
    watch(() => store.state.userInfoVersion, (val, old) => {
        //查询基本信息(基本信息包含登录用户信息)
        
        queryBaseInfo();
   
    })
    onMounted(() => {
        queryBaseInfo();
        
    }) 

</script>

