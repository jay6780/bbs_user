<!-- 找回密码 第一步 -->
<template>
    <!-- 页头 -->
    <Header/>


    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="forgotPasswordModule" >
                <div class="container">
                    <el-tabs v-model="form.type" >
                        <template v-for="accountType in form.allowLoginAccountType">
                            <!--label="账号密码找回"-->
                            <el-tab-pane :label="t('forgotPassword_step1.10')" :name="10" v-if="accountType == 10">
                                <el-form :rules="rules_10" label-position="right" ref="formAccountRef" :model="form" class="iconForm-container" size="large">
                                    <el-form-item :error="error.account" prop="account" >
                                        <!--placeholder="账号"-->
                                        <el-input v-model="form.account" :placeholder="t('forgotPassword_step1.20')" maxlength="25" clearable>
                                            <template #prefix>
                                                <Icon name="user" size="16px"/>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                
                                    <el-form-item :error="error.captchaValue" prop="captchaValue" v-if="form.showCaptcha" class="captcha-item">
                                        <el-row align="middle">
                                            <el-col :span="12" >
                                                <!--placeholder="验证码"-->
                                                <el-input v-model="form.captchaValue" class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                    <template #prefix>
                                                        <Icon name="shield-check-line" size="16px"/>
                                                    </template>
                                                </el-input>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <el-image :src="form.imgUrl" @click="replaceCaptcha"/>
                                            </el-col>
                                            <el-col :span="3" :offset="1">
                                                <!--换一幅-->
                                                <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <!--label="手机号找回" -->
                            <el-tab-pane :label="t('forgotPassword_step1.30')" :name="20" v-if="accountType == 20">
                                <el-form :rules="rules_20" label-position="right" ref="formMobileRef" :model="form" class="iconForm-container" size="large">
                                    <el-form-item :error="error.mobile" prop="mobile">
                                        <!--placeholder="手机号" -->
                                        <el-input v-model="form.mobile" :placeholder="t('forgotPassword_step1.40')" maxlength="14" @input="mobileInputChange" clearable>
                                            <template #prefix>
                                                <Icon name="smartphone-line" size="16px"/>
                                            </template>
                                            <template #prepend v-if="form.isAllowForeignCellPhoneRegistration">
                                                <!--引入国际区号选择组件-->
                                                <Com.CountryCodeSelect @selectedCountryCode="receive_selectedCountryCode" :defaultCountryCode="'86'"/>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                
                                    <el-form-item :error="error.captchaValue" prop="captchaValue" v-if="form.showCaptcha" class="captcha-item">
                                        <el-row align="middle">
                                            <el-col :span="12" >
                                                <!--placeholder="验证码"-->
                                                <el-input v-model="form.captchaValue" class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                    <template #prefix>
                                                        <Icon name="shield-check-line" size="16px"/>
                                                    </template>
                                                </el-input>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <el-image :src="form.imgUrl" @click="replaceCaptcha"/>
                                            </el-col>
                                            <el-col :span="3" :offset="1">
                                                <!--换一幅-->
                                                <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <!--label="邮箱找回" -->
                            <el-tab-pane :label="t('forgotPassword_step1.120')" :name="30" v-if="accountType == 30">
                                <el-form :rules="rules_30" label-position="right" ref="formEmailRef" :model="form" class="iconForm-container" size="large">
                                    <el-form-item :error="error.email" prop="email">
                                        <!--placeholder="邮箱" -->
                                        <el-input v-model="form.email" :placeholder="t('forgotPassword_step1.130')" maxlength="90" clearable>
                                            <template #prefix>
                                                <Icon name="email" size="16px"/>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :error="error.captchaValue" prop="captchaValue" v-if="form.showCaptcha" class="captcha-item">
                                        <el-row align="middle">
                                            <el-col :span="12" >
                                                <!--placeholder="验证码"-->
                                                <el-input v-model="form.captchaValue" class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                    <template #prefix>
                                                        <Icon name="shield-check-line" size="16px"/>
                                                    </template>
                                                </el-input>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <el-image :src="form.imgUrl" @click="replaceCaptcha"/>
                                            </el-col>
                                            <el-col :span="3" :offset="1">
                                                <!--换一幅-->
                                                <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                    <!--提交-->
                    <el-button type="primary" size="large" style="width: 100%;" @mousedown.native="onSubmit"  :disabled="form.allowSubmit" v-if="form.allowLoginAccountType.indexOf(10) >-1 || form.allowLoginAccountType.indexOf(20) >-1 || form.allowLoginAccountType.indexOf(30) >-1">{{t('common.50')}}</el-button>
                    <div v-if="form.isLoadingComplete &&  form.allowLoginAccountType.indexOf(10) <=-1 && form.allowLoginAccountType.indexOf(20) <=-1 && form.allowLoginAccountType.indexOf(30) <=-1">
                        <!-- title="已关闭此功能" -->
                        <el-result icon="warning" :title="t('forgotPassword_step1.140')">
                            <template #extra>
                                
                            </template>
                        </el-result>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 页脚 -->
    <Footer/>
</template>


<script lang="ts" setup>
    import { getCurrentInstance, ComponentInternalInstance, reactive, onMounted, ref, computed} from 'vue'
    import { useMeta} from 'vue-meta'
    import { appStore } from "@/store";
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import Header from '@/components/Header.vue'
    import { AxiosResponse } from 'axios'
    import { getUri, getUrlParam, processErrorInfo} from '@/utils/tool';
    import { FormInstance } from 'element-plus';
    import * as Com from "@/components";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();

    
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('forgotPassword_step1.50')+' - ' + store.state.title,//找回密码 
            meta: [
                {
                    name: 'keywords',
                    content: t('forgotPassword_step1.50')+' - ' + store.state.title//找回密码 
                },{
                    name: "description",
                    content: t('forgotPassword_step1.50')+' - ' + store.state.title//找回密码 
                }
            ]
        }))
    )



    const form = reactive({
        type:10,//类型 10.账号密码找回 20.手机号找回 30.邮箱找回
        account:'',//账号
        countryCode:'',//区号
        mobile:'',//手机号
        email:'',//邮箱
        isLoadingComplete : false,//是否加载完成
        allowLoginAccountType: [] as Array<number>,//允许登录账号类型
        isAllowForeignCellPhoneRegistration:false,//是否允许国外手机号注册
        showCaptcha:true,//是否显示验证码
        captchaKey: '',//验证码key
        captchaValue: '',//验证码值
        imgUrl: '',//验证码图片
        allowSubmit:false,//提交按钮disabled状态
    });
    

    //错误
    const error = reactive({
        account:'',//账号
        mobile:'',//手机号
        email:'',//邮箱
        captchaValue:'',//验证码
    })

    //接收子组件消息
    const receive_selectedCountryCode = (countryCode:string) => {
        form.countryCode = countryCode;
    }

    //查询找回密码第一步
    const queryForgotPassword_step1 = () => {
        proxy?.$axios({
            url: '/forgotPassword/step1',
            method: 'get',
            params:  { 
               
            },
            //showLoading: false,//是否显示加载图标
            //loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                form.isLoadingComplete = true;
                if(result.allowLoginAccountType){
                    form.allowLoginAccountType = result.allowLoginAccountType;//允许登录账号类型
                    if(result.allowLoginAccountType && result.allowLoginAccountType.length >0){
                        for(let i=0; i<result.allowLoginAccountType.length; i++){
                            let type = result.allowLoginAccountType[i];
                            if(type <= 30){
                                form.type = type;
                                break;
                            }
                        }
                    }
                }
                form.isAllowForeignCellPhoneRegistration = result.isAllowForeignCellPhoneRegistration;//是否允许国外手机号注册
                form.captchaKey = result.captchaKey;
                replaceCaptcha();
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    

    //刷新验证码
    const replaceCaptcha = () => {
        form.imgUrl = store.state.apiUrl+"captcha/" + form.captchaKey + ".jpg?" + Math.random();

    }
    //手机号输入限制
    const mobileInputChange = (val:any) => {
         form.mobile = form.mobile.replace(/[^0-9.]/g, '')
    }


    //校验验证码
    const checkCaptchaValue = (rule: any, value: any, callback: any) => {
        if(form.captchaKey != null && form.captchaKey != ''){
            if (value === '') {
                return callback(new Error(t('common.10')));//验证码不能为空
            }else{
                if (value.trim().length < 4) {
                    callback(new Error(t('common.20')))//验证码长度为4个字符
                } else {   
                    if(form.allowSubmit){//按下提交按钮则不再请求校验验证码
                        callback();
                        return;
                    }
                    proxy?.$axios({
                        url: '/checkCaptcha',
                        method: 'post',
                        params:  {
                            captchaKey:form.captchaKey,
                            captchaValue:form.captchaValue
                        }
                    })
                    .then((response: AxiosResponse) => {
                        if(form.allowSubmit){//按下提交按钮则不再处理校验验证码
                            callback();
                            return;
                        }
                        if(response){
                            const result: any = response.data;
                            if(!result.success){
                                callback(new Error(t('common.30')))//验证码错误
                            }else{
                                callback();
                            }
                        }
                    }).catch((error: any) =>{
                        console.log(error);
                    });
                }

            }
        }
    }

    //校验短信验证码
    const checkSmsCode = (rule: any, value: any, callback: any) => {
        if (value === '') {
            return callback(new Error(t('forgotPassword_step1.60')));//短信验证码不能为空
        }else{
            if (value.trim().length < 6) {
                callback(new Error(t('forgotPassword_step1.70')))//验证码长度为6个字符
            } else {   
                callback();
            }

        }
    }



    //用户类型--账号密码用户 校验规则
    const rules_10 = reactive({
        //message: '账号不能为空'  message: '账号在 3 至 25个字符之间'
        account: [{ required: true, message: t('forgotPassword_step1.80'), trigger: 'blur'},{ min: 3, max: 25, message: t('forgotPassword_step1.90'), trigger: 'blur'}],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })

    //用户类型--手机号用户 校验规则
    const rules_20 = reactive({
        // message: '手机号不能为空'  message: '手机号码长度不正确'
        mobile: [{ required: true, message: t('forgotPassword_step1.100'), trigger: 'blur'},{ min: 7, max: 14, message: t('forgotPassword_step1.110'), trigger: 'blur'}],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],
    })
    //用户类型--邮箱用户 校验规则
    const rules_30 = reactive({
        //message: '邮箱不能为空'  message: '邮箱在 5 至 90个字符之间'
        account: [{ required: true, message: t('forgotPassword_step1.150'), trigger: 'blur'},{ min: 5, max: 90, message: t('forgotPassword_step1.160'), trigger: 'blur'}],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })

    //提交数据
    const onSubmit = () => {
        form.allowSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            if(form.type == 10){//账号密码用户
                (proxy?.$refs['formAccountRef'] as any)[0]?.validate((valid: boolean) => {
                    if (valid) {
                        resolve();
                    }else{
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                })
            }else{
                resolve();
            }
            
        });

        const p2 = new Promise<void>((resolve, reject) => {
            if(form.type == 20){//手机号用户
                (proxy?.$refs['formMobileRef'] as any)[0]?.validate((valid: boolean) => {
                    if (valid) {
                        resolve();
                    }else{
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                })
            }else{
                resolve();
            }
        });
        const p3 = new Promise<void>((resolve, reject) => {
            if(form.type == 30){//邮箱用户
                (proxy?.$refs['formEmailRef'] as any)[0]?.validate((valid: boolean) => {
                    if (valid) {
                        resolve();
                    }else{
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                })
            }else{
                resolve();
            }
        });
        Promise.all([p1,p2,p3])
            .then(() => {
                //清空error的属性值
                Object.keys(error).map(key => {
                    Object.assign(error, {[key] : ''});
                })
            

                let formData = new FormData();
                if(form.type == 10){//10:本地账号密码用户
                    formData.append('type', String(form.type));
                    //账号
                    if(form.account != ''){
                        formData.append('account', form.account);
                    }
                }else if(form.type == 20){//20: 手机用户
                    formData.append('type', String(form.type));
                    //手机号
                    if(form.mobile != ''){
                        formData.append('mobile', form.mobile);
                    }
                    //区号
                    formData.append('countryCode', form.countryCode);
                }else if(form.type == 30){//30: 邮箱用户
                    formData.append('type', String(form.type));
                    //邮箱
                    if(form.email != ''){
                        formData.append('email', form.email);
                    }
                }
                //验证码Key
                formData.append('captchaKey', form.captchaKey);
                //验证码值
                if(form.captchaValue != ''){
                    formData.append('captchaValue', form.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/forgotPassword/step1',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                        let jumpUrl = result.jumpUrl;
                        if(result.success){

                            let uri = getUri(jumpUrl);
                            let userName = getUrlParam(jumpUrl,'userName');
                            let countryCode = getUrlParam(jumpUrl,'countryCode');
                            let mobile = getUrlParam(jumpUrl,'mobile');
                            let email = getUrlParam(jumpUrl,'email');

                            router.push({
                                path : '/'+uri,
                                query:{
                                    userName: userName,
                                    countryCode: countryCode,
                                    mobile:mobile,
                                    email:email
                                }
                            });
                        }else{
                            //处理错误信息
                            processErrorInfo(result.error as Map<string,string> , error,()=>{});
                            

                            form.allowSubmit = false;//提交按钮disabled状态

                            if(result.captchaKey != null){
                                form.showCaptcha = true;
                                form.captchaKey = result.captchaKey;
                                replaceCaptcha();
                            }

                        }
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    form.allowSubmit = false;//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });

    }
    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'forgotPassword_step1'){
            queryForgotPassword_step1();
        }
        
        next();
    });
    onMounted(() => {
        init();
        
    }) 

    //初始化
    const init = () => {
		queryForgotPassword_step1();
        
	}
    

</script>

<style scoped lang="scss">
    .forgotPasswordModule{
        padding-right:8px;
        padding-left:8px;
        padding-top:8px;
        padding-bottom: 30px;
        .container {
            width: 430px;
            padding-top: 20px;
            overflow: hidden;
            margin: 0 auto;
            /** 标签分隔线 */
            :deep(.el-tabs__nav-wrap::after){
                background-color: #fff;
            }
            :deep(.el-tabs__item){
                font-size: 16px;
            }
         }
         //图标表单
        .iconForm-container{
            margin-top: 20px;
            //复合型输入框
            :deep(.el-input-group__prepend) {
                background-color: transparent;
                box-shadow: 1px 0 0 0 transparent inset, 0 1px 0 0 transparent inset, 0 -1px 0 0 transparent inset;
            }
            :deep(.el-input-group__prepend div.el-select .el-input__wrapper) {
                background-color: #f7f8fa;
            }
            :deep(.countryCodeSelect){
                margin-right: -12px;
            }
            :deep(.el-form-item__content) {
                line-height: normal;
            }
            :deep(.el-form-item__error) {
                width: 100%;
            }
            :deep(.el-form-item__content) {
                line-height: normal;
            }
            .replaceCaptchaText{
                position: relative;
                top: -1px;
                user-select:none;
                :deep(.el-link__inner){
                    white-space:nowrap;
                }
            }
            
            .captcha-item{
                .captchaInput{
                    width: 160px;
                }
                :deep(.el-form-item__error){
                    width: 100%;
                }
            }
            
        }
         
    }

</style>
