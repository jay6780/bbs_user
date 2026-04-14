<!-- 登录页 -->
<template>
    <!-- 页头 -->
    <Header/>

    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="loginModule" >
                <!--引入登录组件-->
                <Com.Login/>
            </div>
        </div>
    </div>


    <!-- 页脚 -->
    <Footer/>
</template>

<script setup lang="ts">
    import * as Com from "@/components";
    import { useMeta} from 'vue-meta';
    import { appStore } from "@/store";
    import { computed } from "vue";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const store = appStore();

    
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('login.10')+' - ' + store.state.title,//登录
            meta: [
                {
                    name: 'keywords',
                    content: t('login.10')+' - ' + store.state.title//登录
                },{
                    name: "description",
                    content: t('login.10')+' - ' + store.state.title//登录
                }
            ]
        }))
    )

</script>



<style scoped lang="scss">
.loginModule{
    padding:40px 40px 40px 40px;
    width:440px;
    margin:0px auto;
}

</style>