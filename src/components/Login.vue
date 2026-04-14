<!-- 登录 -->
<template>

    <div class="login-container" >
        <div class="localLogin">
            <el-tabs v-model="loginForm.type" >
                <template v-for="accountType in loginForm.allowLoginAccountType">
                    <!--label="账号密码登录"-->
                    <el-tab-pane :label="t('login.20')" :name="10" v-if="accountType == 10">
                        <el-form :rules="rules_10" label-position="right" ref="formAccountRef" :model="loginForm" class="iconForm-container" size="large" @keyup.enter.native="onSubmit">
                            <el-form-item :error="error.account" prop="account" >
                                <!--placeholder="账号"-->
                                <el-input v-model="loginForm.account" :placeholder="t('login.30')" maxlength="25" clearable>
                                    <template #prefix>
                                        <Icon name="user" size="16px"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :error="error.password" prop="password">
                                <!--placeholder="密码"-->
                                <el-input v-model="loginForm.password" :placeholder="t('login.40')" maxlength="20" type="password" clearable>
                                    <template #prefix>
                                        <Icon name="lock-2" size="16px"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :error="error.captchaValue" prop="captchaValue" v-if="loginForm.showCaptcha" class="captcha-item">
                                <el-row align="middle">
                                    <el-col :span="12" >
                                        <!--placeholder="验证码"-->
                                        <el-input v-model="loginForm.captchaValue" class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                            <template #prefix>
                                                <Icon name="shield-check-line" size="16px"/>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="7" :offset="1">
                                        <el-image :src="loginForm.imgUrl" @click="replaceCaptcha"/>
                                    </el-col>
                                    <el-col :span="3" :offset="1">
                                        <!--换一幅-->
                                        <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>


                    </el-tab-pane>
                    <!--label="手机号登录"-->
                    <el-tab-pane :label="t('login.50')" :name="20" v-if="accountType == 20">
                        <el-form :rules="rules_20" label-position="right" ref="formMobileRef" :model="loginForm" class="iconForm-container" size="large" @keyup.enter.native="onSubmit">
                            <el-form-item :error="error.mobile" prop="mobile">
                                <!--placeholder="手机号"-->
                                <el-input v-model="loginForm.mobile" :placeholder="t('login.60')" maxlength="14" @input="mobileInputChange" clearable>
                                    <template #prefix>
                                        <Icon name="smartphone-line" size="16px"/>
                                    </template>
                                    <template #prepend v-if="loginForm.isAllowForeignCellPhoneRegistration">
                                        <!--引入国际区号选择组件-->
                                        <Com.CountryCodeSelect @selectedCountryCode="receive_selectedCountryCode" :defaultCountryCode="'86'"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :error="error.password" prop="password">
                                <!--placeholder="密码"-->
                                <el-input v-model="loginForm.password" :placeholder="t('login.40')" maxlength="20" type="password" clearable>
                                    <template #prefix>
                                        <Icon name="lock-2" size="16px"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :error="error.captchaValue" prop="captchaValue" v-if="loginForm.showCaptcha" class="captcha-item">
                                <el-row align="middle">
                                    <el-col :span="12" >
                                        <!--placeholder="验证码"-->
                                        <el-input v-model="loginForm.captchaValue" class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                            <template #prefix>
                                                <Icon name="shield-check-line" size="16px"/>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="7" :offset="1">
                                        <el-image :src="loginForm.imgUrl" @click="replaceCaptcha"/>
                                    </el-col>
                                    <el-col :span="3" :offset="1">
                                        <!--换一幅-->
                                        <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <!-- label="邮箱登录" -->
                    <el-tab-pane :label="t('login.150')" :name="30" v-if="accountType == 30">
                        <el-form :rules="rules_30" label-position="right" ref="formEmailRef" :model="loginForm" class="iconForm-container" size="large" @keyup.enter.native="onSubmit">
                            <el-form-item :error="error.email" prop="email">
                                <!-- placeholder="邮箱" -->
                                <el-input v-model="loginForm.email" :placeholder="t('login.170')" maxlength="90" clearable>
                                    <template #prefix>
                                        <Icon name="email" size="16px"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :error="error.password" prop="password">
                                <!-- placeholder="密码" -->
                                <el-input v-model="loginForm.password" :placeholder="t('login.40')" maxlength="20" type="password" clearable>
                                    <template #prefix>
                                        <Icon name="lock-2" size="16px"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :error="error.captchaValue" prop="captchaValue" v-if="loginForm.showCaptcha" class="captcha-item">
                                <el-row align="middle">
                                    <el-col :span="12" >
                                        <!--placeholder="验证码"-->
                                        <el-input v-model="loginForm.captchaValue" class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                            <template #prefix>
                                                <Icon name="shield-check-line" size="16px"/>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="7" :offset="1">
                                        <el-image :src="loginForm.imgUrl" @click="replaceCaptcha"/>
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

            <div v-if="loginForm.isLoadingComplete && loginForm.allowLoginAccountType.indexOf(10) <=-1 && loginForm.allowLoginAccountType.indexOf(20) <=-1 && loginForm.allowLoginAccountType.indexOf(30) <=-1">
                <!-- title="已关闭登录" -->
                <el-result icon="warning" :title="t('login.200')">
                    <template #extra>
                        
                    </template>
                </el-result>
            </div>

            <div class="otherInfo" v-if="loginForm.allowLoginAccountType.indexOf(10) >-1 || loginForm.allowLoginAccountType.indexOf(20) >-1 || loginForm.allowLoginAccountType.indexOf(30) >-1">
                <!--找回密码？-->
                <a href="forgotPassword/step1">{{t('login.70')}}</a>
            </div>
            <!--登录-->
            <el-button type="primary" size="large" style="width: 100%;" @mousedown.native="onSubmit"  :disabled="loginForm.allowSubmit" v-if="loginForm.allowLoginAccountType.indexOf(10) >-1 || loginForm.allowLoginAccountType.indexOf(20) >-1 || loginForm.allowLoginAccountType.indexOf(30) >-1">{{t('login.10')}}</el-button>
            
        </div>

        <div class="otherLogin" v-if="loginForm.supportLoginInterfaceList != null && loginForm.supportLoginInterfaceList.length >0">
            <!--其他登录方式-->
            <el-divider class="line">
                <h4 class="title">{{t('login.80')}}</h4>
            </el-divider>
            
            <p class="link">
                <span v-for="supportLoginInterface in loginForm.supportLoginInterfaceList">
                    <a @click="jumpLogin(supportLoginInterface.interfaceProduct)" :class="'icon-'+supportLoginInterface.interfaceProduct" :title="supportLoginInterface.name"></a>             
                </span>
            </p>



        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { ref,getCurrentInstance, ComponentInternalInstance,reactive, onMounted} from 'vue'
    import { appStore } from "@/store";
    import { useRouter } from 'vue-router'
    import { FormInstance, ElForm } from 'element-plus'
    import { AxiosResponse } from 'axios'
    import { SHA256} from 'crypto-js';
    import { processErrorInfo} from '@/utils/tool';
    import { jumpDataFormat} from '@/utils/jumpProcess';
    import { SupportLoginInterface } from "@/types/index";
    import * as Com from "@/components";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();



    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();

    //传递消息给父组件
    const emit_closeDialog = defineEmits(['closeDialog'])
   
    //接收父组件消息
    const props = defineProps({
        pop_up_window: {//是否为弹出窗口登录
            type: Boolean,
            default: false
        }
    })  
    

    //登录表单
    const loginForm = reactive({
        type:10,//用户类型
        account: '',//账号
        countryCode:'',//区号
        mobile: '',//手机号
        email: '',//邮箱
        password: '',//密码
        showCaptcha:false,//是否显示验证码
        captchaKey: '',//验证码key
        captchaValue: '',//验证码值
        imgUrl: '',//验证码图片
        allowSubmit:false,//提交按钮disabled状态
        isLoadingComplete : false,//是否加载完成

        allowLoginAccountType: [] as Array<number>,//允许登录账号类型
        isAllowForeignCellPhoneRegistration:false,//是否允许国外手机号注册
        supportLoginInterfaceList: [] as SupportLoginInterface[],//支持登录接口集合
    })

    //登录错误
    const error = reactive({
        account: '',//账号
        mobile: '',//手机号
        email: '',//邮箱
        password: '',//密码
        captchaValue: '',//验证码
    })

    //接收子组件消息
    const receive_selectedCountryCode = (countryCode:string) => {
        loginForm.countryCode = countryCode;
    }

    //加载登录页
    const queryLogin = () => {
        proxy?.$axios({
            url: '/login',
            method: 'get',
            params:  {
            }
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                loginForm.isLoadingComplete = true;
                let formCaptcha = result.formCaptcha;
                if(result.allowLoginAccountType){
                    loginForm.allowLoginAccountType = result.allowLoginAccountType;//允许登录账号类型
                    if(result.allowLoginAccountType && result.allowLoginAccountType.length >0){
                        for(let i=0; i<result.allowLoginAccountType.length; i++){
                            let type = result.allowLoginAccountType[i];
                            if(type <= 30){
                                loginForm.type = type;
                                break;
                            }
                        }
                    }
                }
                loginForm.isAllowForeignCellPhoneRegistration = result.isAllowForeignCellPhoneRegistration;//是否允许国外手机号注册
                if (formCaptcha.showCaptcha == true) {
                    loginForm.showCaptcha = true;
                    loginForm.captchaKey = formCaptcha.captchaKey;
                    replaceCaptcha();//刷新验证码
				}
            }
        }).catch((error: any) =>{
            console.log(error);
        });

    }

	//加载第三方登录页
    const queryThirdPartyLogin = () => {
        proxy?.$axios({
            url: '/queryThirdPartyLogin',
            method: 'get',
            params:  {  
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                if(result != null){
                    loginForm.supportLoginInterfaceList = result;
                }
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }	
    //跳转登录
    const jumpLogin = (interfaceProduct:number) => {
        proxy?.$axios({
            url: '/thirdParty/loginLink',
            method: 'get',
            params:  {  
                interfaceProduct:interfaceProduct,
                jumpUrl:(router.currentRoute.value.query.jumpUrl != undefined ? router.currentRoute.value.query.jumpUrl :'')
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                if(result.redirectUrl != undefined){
                    window.location.href = result.redirectUrl;

                }
            }
        }).catch((error: any) =>{
            console.log(error);
        });

    }
    
	
    
    //刷新验证码
    const replaceCaptcha = () => {
        loginForm.imgUrl = store.state.baseURL+"captcha/" + loginForm.captchaKey + ".jpg?" + Math.random();

    }

    //手机号输入限制
    const mobileInputChange = (val:any) => {
         loginForm.mobile = loginForm.mobile.replace(/[^0-9.]/g, '')
    }



    
    //校验验证码
    const checkCaptchaValue = (rule: any, value: any, callback: any) => {
        if(loginForm.captchaKey != null && loginForm.captchaKey != ''){
            if (value === '') {
                return callback(new Error(t('common.10')));//验证码不能为空
            }else{
                if (value.trim().length < 4) {
                    callback(new Error(t('common.20')))//验证码长度为4个字符
                } else {   
                    if(loginForm.allowSubmit){//按下提交按钮则不再请求校验验证码
                        callback();
                        return;
                    }
                    proxy?.$axios({
                        url: '/checkCaptcha',
                        method: 'post',
                        params:  {
                            captchaKey:loginForm.captchaKey,
                            captchaValue:loginForm.captchaValue
                        }
                    })
                    .then((response: AxiosResponse) => {
                        if(loginForm.allowSubmit){//按下提交按钮则不再处理校验验证码
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


    //用户类型--账号密码用户 校验规则
    const rules_10 = reactive({
        //message: '账号不能为空'   message: '账号在 3 至 25个字符之间'
        account: [{ required: true, message: t('login.90'), trigger: 'blur'},{ min: 3, max: 25, message: t('login.100'), trigger: 'blur'}],
        //message: '密码不能为空'  message: '密码长度不能小于7个字符'
        password: [{ required: true, message: t('login.110'), trigger: 'blur'},{ min: 7, message: t('login.120'), trigger: 'blur'}],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })

    //用户类型--手机号用户 校验规则
    const rules_20 = reactive({
        //message: '手机号不能为空'  message: '手机号码长度不正确'
        mobile: [{ required: true, message: t('login.130'), trigger: 'blur'},{ min: 7, max: 14, message: t('login.140'), trigger: 'blur'}],
        //message: '密码不能为空'   message: '密码长度不能小于7个字符'
        password: [{ required: true, message: t('login.110'), trigger: 'blur'},{ min: 7, message: t('login.120'), trigger: 'blur'}],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })
    //用户类型--邮箱用户 校验规则
    const rules_30 = reactive({
        //message: '邮箱不能为空'  message: '邮箱长度不正确'
        email: [{ required: true, message: t('login.180'), trigger: 'blur'},{ min: 5, max: 90, message: t('login.190'), trigger: 'blur'}],
        // message: '密码不能为空'  message: '密码长度不能小于7个字符'
        password: [{ required: true, message: t('login.110'), trigger: 'blur'},{ min: 7, message: t('login.120'), trigger: 'blur'}],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })


    //提交数据
    const onSubmit = () => {
        loginForm.allowSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            if(loginForm.type == 10){//账号密码用户
                (proxy?.$refs['formAccountRef'] as any)[0]?.validate((valid: boolean) => {
                    if (valid) {
                        resolve();
                    }else{
                        loginForm.allowSubmit = false;//提交按钮disabled状态
                    }
                })
            }else{
                resolve();
            }
            
        });

        const p2 = new Promise<void>((resolve, reject) => {
            if(loginForm.type == 20){//手机号用户
                (proxy?.$refs['formMobileRef'] as any)[0]?.validate((valid: boolean) => {
                    if (valid) {
                        resolve();
                    }else{
                        loginForm.allowSubmit = false;//提交按钮disabled状态
                    }
                })
            }else{
                resolve();
            }
        });
        const p3 = new Promise<void>((resolve, reject) => {
            if(loginForm.type == 30){//邮箱用户
                (proxy?.$refs['formEmailRef'] as any)[0]?.validate((valid: boolean) => {
                    if (valid) {
                        resolve();
                    }else{
                        loginForm.allowSubmit = false;//提交按钮disabled状态
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
                if(loginForm.type == 10){//10:本地账号密码用户
                    formData.append('type', String(loginForm.type));
                    //账号
                    if(loginForm.account != ''){
                        formData.append('account', loginForm.account);
                    }
                }else if(loginForm.type == 20){//20: 手机用户
                    formData.append('type', String(loginForm.type));
                    
                    //手机号
                    if(loginForm.mobile != ''){
                        formData.append('mobile', loginForm.mobile);
                    }

                    //区号
                    formData.append('countryCode', loginForm.countryCode);
                }else if(loginForm.type == 30){//30: 邮箱用户
                    formData.append('type', String(loginForm.type));
                    
                    //手机号
                    if(loginForm.email != ''){
                        formData.append('email', loginForm.email);
                    }
                }
                
                //密码需SHA256加密
                if(loginForm.password){
                    let SHA256Value = SHA256(loginForm.password).toString();
                    formData.append('password', SHA256Value);
                }


                //url跳转参数
                let jumpUrl:string = router.currentRoute.value.query.jumpUrl != undefined ? router.currentRoute.value.query.jumpUrl as string : '';
                if (jumpUrl != null && jumpUrl != '') {
                    formData.append('jumpUrl', jumpUrl);
                }


                //验证码Key
                formData.append('captchaKey', loginForm.captchaKey);
                //验证码值
                if(loginForm.captchaValue != ''){
                    formData.append('captchaValue', loginForm.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/login',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                        if(result.success){//登录成功
                            let jumpUrl = result.jumpUrl;
                            let systemUser = result.systemUser;
                            let accessToken = result.accessToken;
                            let refreshToken = result.refreshToken;

                            //访问令牌和刷新令牌存储到localStorage
                            window.localStorage.setItem("bbsToken", JSON.stringify({accessToken : accessToken, refreshToken : refreshToken}));

                            store.commit('setSystemUser', systemUser);

                            if (jumpUrl != null && jumpUrl != '' && jumpUrl != 'index') {

                                let decryptObject = jumpDataFormat(jumpUrl);
                                if(decryptObject.path == "/login"){
                                    router.push("/");
                                }else{
                                    router.push({
                                        path : decryptObject.path,
                                        query: decryptObject.query
                                    });
                                }
                                

                            } else {
                                if(props.pop_up_window){//如果为弹出窗口登录
                                    router.go(0)//刷新当前页

                                }else{
                                    router.push("/");
                                }
                            }

                            
                            //传递消息给父组件
                            emit_closeDialog('closeDialog',false);


                        }else{
                            //处理错误信息
                            processErrorInfo(result.error as Map<string,string> , error,()=>{});
                            

                            loginForm.allowSubmit = false;//提交按钮disabled状态

                            if(result.captchaKey != null){
                                loginForm.showCaptcha = true;
                                loginForm.captchaKey = result.captchaKey;
                                replaceCaptcha();
                            }else{
                                loginForm.showCaptcha = false;
                            }


                        }
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    loginForm.allowSubmit = false;//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });

    }
    
    
   


    onMounted(() => {

        //加载登录页
        queryLogin();

        //加载第三方登录页
        queryThirdPartyLogin();

    }) 
</script>

<style scoped lang="scss">


.login-container{
    .localLogin{
        padding-bottom: 30px;
        /** 标签分隔线 */
        :deep(.el-tabs__nav-wrap::after){
            background-color: #fff;
        }
        :deep(.el-tabs__item){
            font-size: 16px;
        }

        //图标表单
        .iconForm-container{
            margin-top: 25px;

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
            :deep(.el-form-item__content) {
                line-height: normal;
            }
        }

        
        .otherInfo{
            height:40px;
            line-height:40px;
            overflow:hidden;
            font-size: 14px;
            a{
                float:right; 
                color: #1890ff;
            }
        }
    }
    

    .otherLogin {
        width:400px;
        margin:0 auto;
        font-size: 14px;
        margin-top: -30px;
        .line{
            margin-top: 30px;
            border-top: 1px solid $color-black-30;
        }
        .title{
            color: $color-black-40;
            font-weight:normal;
        }
        .link{
            text-align: center;
            margin: 10px 0 0px;
            a{
                display: inline-block;
                width: 48px;
                color: $color-black-30;
                margin: 0 10px;
                background-size: 100% auto;
                background-repeat: no-repeat;
            }
            .icon-10{
               // background-image:url('../images/weixin.svg');
                background-image:url('@/assets/images/weixin.svg');
                width: 30px;
                height: 30px;
            }
            .icon-50{
                background-image:url('@/assets/images/other-login.svg');
                width: 30px;
                height: 30px;
            }
        }

    }
}
</style>
