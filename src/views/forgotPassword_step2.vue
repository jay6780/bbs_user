<!-- 找回密码 第二步 -->
<template>
    <!-- 页头 -->
    <Header/>

    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="forgotPasswordModule" >
                <div class="container">
                     <el-tabs v-model="form.type" >
                        <!--label="校验密码提示答案"-->
                        <el-tab-pane :label="t('forgotPassword_step2.10')" :name="10" v-if="form.type == 10">
                            <el-form :rules="rules_10" label-position="right" ref="formAccountRef" :model="form" class="textForm-container" size="large">
                                <el-form-item :error="error.userName" prop="userName">
                                    <div class="view-field">
                                        <!--账号-->
                                        <div class="input-name">{{t('forgotPassword_step2.20')}}</div>
                                        <div class="textInput-content">{{form.user.account}}</div>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div class="view-field">
                                        <!--密码提示问题-->
                                        <div class="input-name">{{t('forgotPassword_step2.30')}}</div>
                                        <div class="textInput-content">{{form.user.issue}}</div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.answer" prop="answer" >
                                    <div class="view-field">
                                        <!--密码提示答案-->
                                        <div class="input-name">{{t('forgotPassword_step2.40')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码提示答案"-->
                                            <el-input v-model="form.answer" :placeholder="t('forgotPassword_step2.80')" maxlength="25" clearable></el-input>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.password" prop="password">
                                    <div class="view-field">
                                        <!--新密码-->
                                        <div class="input-name">{{t('forgotPassword_step2.50')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码" -->
                                            <el-input v-model="form.password" :placeholder="t('forgotPassword_step2.60')" maxlength="20" type="password" clearable></el-input>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.confirmPassword" prop="confirmPassword">
                                    <div class="view-field">
                                        <!--确认密码 -->
                                        <div class="input-name">{{t('forgotPassword_step2.70')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码" -->
                                            <el-input v-model="form.confirmPassword" :placeholder="t('forgotPassword_step2.60')" maxlength="20" type="password" clearable></el-input>
                                        </div>
                                    </div>
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
                                            <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <!--label="校验手机号码" -->
                        <el-tab-pane :label="t('forgotPassword_step2.90')" :name="20" v-if="form.type == 20">
                            <el-form :rules="rules_20" label-position="right" ref="formMobileRef" :model="form" class="textForm-container" size="large">
                                <el-form-item :error="error.mobile" prop="mobile">
                                    <div class="view-field">
                                        <!--手机号 -->
                                        <div class="input-name">{{t('forgotPassword_step2.100')}}</div>
                                        <div class="textInput-content">{{form.countryCode}} {{form.mobile}}</div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.password" prop="password">
                                    <div class="view-field">
                                        <!--新密码-->
                                        <div class="input-name">{{t('forgotPassword_step2.50')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码"-->
                                            <el-input v-model="form.password" :placeholder="t('forgotPassword_step2.60')" maxlength="20" type="password" clearable></el-input>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.confirmPassword" prop="confirmPassword">
                                    <div class="view-field">
                                        <!--确认密码-->
                                        <div class="input-name">{{t('forgotPassword_step2.70')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码"-->
                                            <el-input v-model="form.confirmPassword" :placeholder="t('forgotPassword_step2.60')" maxlength="20" type="password" clearable></el-input>
                                        </div>
                                    </div>
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
                                            <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item :error="error.smsCode" prop="smsCode" class="smsCode-item">
                                     <!--placeholder="短信验证码"-->
                                    <el-input v-model="form.smsCode" maxlength="6" :placeholder="t('forgotPassword_step2.110')" clearable >
                                        <template #prefix>
                                            <Icon name="email" size="16px"/>
                                        </template>
                                        <template #append>
                                            <div class="smsCode">
                                                <div v-if="form.counter <=0" class="button">
                                                    <!--获取验证码-->
                                                    <el-button link @mousedown="getSmsCode">{{t('forgotPassword_step2.120')}}</el-button>
                                                </div>
                                                <div v-if="form.counter >0" class="text">{{form.countdownText}}</div>
                                            </div>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <div class="successInfo">{{form.successInfo}}</div>
                                
                            </el-form>
                        </el-tab-pane>  
                        <!--label="校验邮箱" -->
                        <el-tab-pane :label="t('forgotPassword_step2.280')" :name="30" v-if="form.type == 30">
                            <el-form :rules="rules_30" label-position="right" ref="formEmailRef" :model="form" class="textForm-container" size="large">
                                <el-form-item :error="error.email" prop="email">
                                    <div class="view-field">
                                        <!--邮箱-->
                                        <div class="input-name">{{t('forgotPassword_step2.290')}}</div>
                                        <div class="textInput-content">{{form.email}}</div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.password" prop="password">
                                    <div class="view-field">
                                        <!--新密码-->
                                        <div class="input-name">{{t('forgotPassword_step2.50')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码"-->
                                            <el-input v-model="form.password" :placeholder="t('forgotPassword_step2.60')" maxlength="20" type="password" clearable></el-input>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item :error="error.confirmPassword" prop="confirmPassword">
                                    <div class="view-field">
                                        <!--确认密码-->
                                        <div class="input-name">{{t('forgotPassword_step2.70')}}</div>
                                        <div class="formInput-content">
                                            <!--placeholder="请输入密码"-->
                                            <el-input v-model="form.confirmPassword" :placeholder="t('forgotPassword_step2.60')" maxlength="20" type="password" clearable></el-input>
                                        </div>
                                    </div>
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
                                            <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
    
                                <el-form-item :error="error.emailCode" prop="emailCode"  class="smsCode-item">
                                    <!-- placeholder="邮箱验证码" -->
                                    <el-input v-model="form.emailCode" maxlength="6" :placeholder="t('forgotPassword_step2.300')" clearable >
                                        <template #prefix>
                                            <Icon name="email" size="16px"/>
                                        </template>
                                        <template #append>
                                            <div class="smsCode">
                                                <div v-if="form.emailCounter <=0" class="button">
                                                    <!-- 获取邮箱验证码 -->
                                                    <el-button link @mousedown="getEmailCode">{{t('forgotPassword_step2.340')}}</el-button>
                                                </div>
                                                <div v-if="form.emailCounter >0" class="text">{{form.emailCountdownText}}</div>
                                            </div>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <div class="successInfo">{{form.emailSuccessInfo}}</div>


                                
                            </el-form>
                        </el-tab-pane>  
                    </el-tabs>
                    <!--提交-->
                    <el-button type="primary" style="width: 100%;" @mousedown.native="onSubmit"  :disabled="form.allowSubmit" size="large">{{t('common.50')}}</el-button>
                       
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
    import { User } from "@/types/index";
    import { processErrorInfo} from '@/utils/tool';
    import { ElMessage, FormInstance } from 'element-plus';
    import { SHA256} from 'crypto-js';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();


    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();
   
    const formAccountRef = ref<FormInstance>();
    const formMobileRef = ref<FormInstance>();
    const formEmailRef = ref<FormInstance>();

    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('forgotPassword_step2.130')+' - ' + store.state.title,//找回密码 第二步
            meta: [
                {
                    name: 'keywords',
                    content: t('forgotPassword_step2.130')+' - ' + store.state.title//找回密码 第二步
                },{
                    name: "description",
                    content: t('forgotPassword_step2.130')+' - ' + store.state.title//找回密码 第二步
                }
            ]
        }))
    )



    const form = reactive({
        type:10,//类型 10.账号密码找回 20.手机号找回
        user:{} as User,//用户
        userName:'',//用户名
        answer:'',//密码提示答案
        countryCode:'',//区号
        mobile:'',//手机号
        email:'',//邮箱
        password:'',//新密码
        confirmPassword:'',//确认密码
        
        smsCode:'',//短信验证码
        showCaptcha:true,//是否显示验证码
        captchaKey: '',//验证码key
        captchaValue: '',//验证码值
        imgUrl: '',//验证码图片
        allowSubmit:false,//提交按钮disabled状态
        allowSmsCodeSubmit:false,//提交按钮disabled状态
        successInfo: '',

        timer: '' as any,//计时器对象
        countdownText: '',//倒计时文本
        counter: 0,//计数器

        allowEmailCodeSubmit:false,//提交按钮disabled状态
        emailSuccessInfo: '',//邮箱验证码成功信息
        emailCode:'',//邮箱验证码
        emailTimer: '' as any,//邮箱计时器对象
        emailCountdownText: '',//邮箱倒计时文本
        emailCounter: 0,//邮箱计数器
    });
    

    //错误
    const error = reactive({
        userName:'',//用户名
        answer:'',//密码提示答案
        password:'',//新密码
        confirmPassword:'',//确认密码
        mobile:'',//手机号
        email:'',//邮箱
        smsCode:'',//短信验证码
        emailCode:'',//邮箱验证码
        captchaValue:'',//验证码
    })

    //查询找回密码第二步
    const queryForgotPassword_step2 = () => {
        proxy?.$axios({
            url: '/forgotPassword/step2',
            method: 'get',
            params:  { 
                userName: form.userName,
            },
            //showLoading: false,//是否显示加载图标
            //loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                if(result.success){
                form.user = result.user;
                form.type = form.user.type;
                }else{
                    //处理错误信息
                    processErrorInfo(result.error as Map<string,string> , error,()=>{});
                    
                    if(result.captchaKey != null){
                        form.captchaKey = result.captchaKey;
                        replaceCaptcha();
                    }
                }

                form.captchaKey = result.captchaKey;
                replaceCaptcha();
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    


    //获取短信验证码
    const getSmsCode = () => {
        form.allowSmsCodeSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            formMobileRef.value?.validateField('mobile', (valid: boolean) => {
                if (valid) {
                    resolve();
                } else {
                    form.allowSmsCodeSubmit = false;//提交按钮disabled状态
                }
            });
           formMobileRef.value?.validateField('captchaValue', (valid: boolean) => {
                if (valid) {
                    resolve();
                } else {
                    form.allowSmsCodeSubmit = false;//提交按钮disabled状态
                }
            });
        });

        Promise.all([p1])
            .then(() => {
                //清空error的属性值
                Object.keys(error).map(key => {
                    Object.assign(error, {[key] : ''});
                })
                form.successInfo = "";
                //设置按钮禁用状态
                form.allowSmsCodeSubmit = true;//提交按钮disabled状态

                let formData = new FormData();
                if(form.mobile != null && form.mobile.trim() != ''){
                    formData.append('mobile', form.mobile);
                }
                //区号
                formData.append('countryCode', form.countryCode);
                formData.append('module', '300');

                //验证码Key
                formData.append('captchaKey', form.captchaKey);
                //验证码值
                if(form.captchaValue != ''){
                    formData.append('captchaValue', form.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/smsCode',
                    method: 'post',
                    data: formData,
                    //showLoading: false,//是否显示加载图标
                    //loadingMask:false,// 是否显示遮罩层
                })
                .then((response: AxiosResponse) => {
                    const result: any = response.data;
      
                    if(result.success){
                        form.successInfo = t('forgotPassword_step2.140');//短信验证码已发送
                        countdown();
                    }else{
                        //处理错误信息
                        processErrorInfo(result.error as Map<string,string> , error,()=>{});
                        
                        if(result.captchaKey != null){
                            form.captchaKey = result.captchaKey;
                            replaceCaptcha();
                        }

                    }
                    form.allowSmsCodeSubmit = false;//提交按钮disabled状态
                    form.showCaptcha = true;
                })
                .catch((error: any) =>{
                    console.log(error);
                });
            })
    }

    //倒计时
    const countdown = () => {
        form.counter = 60;//60秒
        form.countdownText = t('forgotPassword_step2.150',{'p1': form.counter});//{p1}秒没收到后可重新获取

        form.timer = setInterval(() => {
          //替换文本
          form.countdownText = t('forgotPassword_step2.150',{'p1': form.counter});//{p1}秒没收到后可重新获取
          form.counter--;
          if (form.counter < 0) {
            // 当计时小于零时，取消该计时器
            clearInterval(form.timer)
          }
        }, 1000)
    }

    //获取短信验证码
    const getEmailCode = () => {
        form.allowEmailCodeSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            formEmailRef.value?.validateField('email', (valid: boolean) => {
                if (valid) {
                    resolve();
                } else {
                    form.allowEmailCodeSubmit = false;//提交按钮disabled状态
                }
            });
           formEmailRef.value?.validateField('captchaValue', (valid: boolean) => {
                if (valid) {
                    resolve();
                } else {
                    form.allowEmailCodeSubmit = false;//提交按钮disabled状态
                }
            });
        });

        Promise.all([p1])
            .then(() => {
                //清空error的属性值
                Object.keys(error).map(key => {
                    Object.assign(error, {[key] : ''});
                })
                form.emailSuccessInfo = "";
                //设置按钮禁用状态
                form.allowEmailCodeSubmit = true;//提交按钮disabled状态

                let formData = new FormData();
                if(form.email != null && form.email.trim() != ''){
                    formData.append('email', form.email);
                }
                formData.append('module', '300');

                //验证码Key
                formData.append('captchaKey', form.captchaKey);
                //验证码值
                if(form.captchaValue != ''){
                    formData.append('captchaValue', form.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/emailCode',
                    method: 'post',
                    data: formData,
                    //showLoading: false,//是否显示加载图标
                    //loadingMask:false,// 是否显示遮罩层
                })
                .then((response: AxiosResponse) => {
                    const result: any = response.data;
      
                    if(result.success){
                        form.emailSuccessInfo = t('forgotPassword_step2.310');//邮箱验证码已发送
                        emailCountdown();
                    }else{
                        //处理错误信息
                        processErrorInfo(result.error as Map<string,string> , error,()=>{});
                        
                        if(result.captchaKey != null){
                            form.captchaKey = result.captchaKey;
                            replaceCaptcha();
                        }

                    }
                    form.allowEmailCodeSubmit = false;//提交按钮disabled状态
                    form.showCaptcha = true;
                })
                .catch((error: any) =>{
                    console.log(error);
                });
            })
    }

    //倒计时
    const emailCountdown = () => {
        form.emailCounter = 60;//60秒
        form.emailCountdownText = t('forgotPassword_step2.150',{'p1': form.emailCounter});//form.counter+"秒没收到后可重新获取"

        form.emailTimer = setInterval(() => {
          //替换文本
          form.emailCountdownText = t('forgotPassword_step2.150',{'p1': form.emailCounter});//form.counter+"秒没收到后可重新获取"
          form.emailCounter--;
          if (form.emailCounter < 0) {
            // 当计时小于零时，取消该计时器
            clearInterval(form.emailTimer)
          }
        }, 1000)
    }

    //刷新验证码
    const replaceCaptcha = () => {
        form.imgUrl = store.state.apiUrl+"captcha/" + form.captchaKey + ".jpg?" + Math.random();

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
                    if(form.allowSmsCodeSubmit || form.allowEmailCodeSubmit || form.allowSubmit){//按下提交按钮则不再请求校验验证码
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
                        if(form.allowSmsCodeSubmit || form.allowEmailCodeSubmit || form.allowSubmit){//按下提交按钮则不再处理校验验证码
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
            return callback(new Error(t('forgotPassword_step2.160')));//短信验证码不能为空
        }else{
            if (value.trim().length < 6) {
                callback(new Error(t('forgotPassword_step2.170')))//验证码长度为6个字符
            } else {   
                callback();
            }

        }
    }
    //校验确认密码
    const checkConfirmPassword = (rule: any, value: any, callback: any) => {
        if (value === '') {
            return callback(new Error(t('forgotPassword_step2.180')));//密码不能为空
        }else{
            if (value.trim().length < 7) {
                callback(new Error(t('forgotPassword_step2.190')))//密码长度不能小于7个字符
            } else {   
                if(form.password != form.confirmPassword){
                    callback(new Error(t('forgotPassword_step2.200')))//两次输入密码不相等
                }else{
                    callback();
                }
            }
        }
    }
    //校验邮箱验证码
    const checkEmailCode = (rule: any, value: any, callback: any) => {
        if (value === '') {
            return callback(new Error(t('forgotPassword_step2.330')));//邮箱验证码不能为空
        }else{
            if (value.trim().length < 6) {
                callback(new Error(t('forgotPassword_step2.170')))//验证码长度为6个字符
            } else {   
                callback();
            }

        }
    }

    //用户类型--账号密码用户 校验规则
    const rules_10 = reactive({
        //message: '用户名不能为空'
        userName: [{ required: true, message: t('forgotPassword_step2.210'), trigger: 'blur'}],
        //message: '密码提示答案不能为空'  message: '密码提示答案不能小于7个字符'
        answer: [{ required: true, message: t('forgotPassword_step2.220'), trigger: 'blur'},{ min: 7, message: t('forgotPassword_step2.230'), trigger: 'blur'}],
        // message: '密码不能为空'   message: '密码长度不能小于7个字符'
        password: [{ required: true, message: t('forgotPassword_step2.180'), trigger: 'blur'},{ min: 7, message: t('forgotPassword_step2.190'), trigger: 'blur'}],
        confirmPassword:[{ validator: checkConfirmPassword, trigger: 'blur' }],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })

    //用户类型--手机号用户 校验规则
    const rules_20 = reactive({
        // message: '手机号不能为空'
        mobile: [{ required: true, message: t('forgotPassword_step2.260'), trigger: 'blur'}],
        //message: '密码不能为空'  message: '密码长度不能小于7个字符'
        password: [{ required: true, message: t('forgotPassword_step2.180'), trigger: 'blur'},{ min: 7, message: t('forgotPassword_step2.190'), trigger: 'blur'}],
        confirmPassword:[{ validator: checkConfirmPassword, trigger: 'blur' }],
        smsCode: [{ validator: checkSmsCode, trigger: 'blur' }],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })

    //用户类型--邮箱用户 校验规则
    const rules_30 = reactive({
        //message: '邮箱不能为空'
        email: [{ required: true, message: t('forgotPassword_step2.320'), trigger: 'blur'}],
        //message: '密码不能为空'  message: '密码长度不能小于7个字符'
        password: [{ required: true, message: t('forgotPassword_step2.180'), trigger: 'blur'},{ min: 7, message: t('forgotPassword_step2.190'), trigger: 'blur'}],
        confirmPassword:[{ validator: checkConfirmPassword, trigger: 'blur' }],
        emailCode: [{ validator: checkEmailCode, trigger: 'blur' }],
        captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],

    })

    //提交数据
    const onSubmit = () => {
        form.allowSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            if(form.type == 10){//账号密码用户
                formAccountRef.value?.validate((valid: boolean) => {
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
                formMobileRef.value?.validateField('mobile', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });
                formMobileRef.value?.validateField('password', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });
                formMobileRef.value?.validateField('confirmPassword', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });
                formMobileRef.value?.validateField('smsCode', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });

            }else{
                resolve();
            }
            
        });

        const p3 = new Promise<void>((resolve, reject) => {
            if(form.type == 30){//邮箱用户
                formEmailRef.value?.validateField('email', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });
                formEmailRef.value?.validateField('password', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });
                formEmailRef.value?.validateField('confirmPassword', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });
                formEmailRef.value?.validateField('emailCode', (valid: boolean) => {
                    if (valid) {
                        resolve();
                    } else {
                        form.allowSubmit = false;//提交按钮disabled状态
                    }
                });

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
                //用户名
                if(form.userName != ''){
                    formData.append('userName', form.userName);
                }
                if(form.type == 10){//10:本地账号密码用户
                    formData.append('type', String(form.type));
                    
                    if(form.answer != null && form.answer.trim() != ''){
                        formData.append('answer', SHA256(form.answer.trim()).toString());
                    }
                    
                }else if(form.type == 20){//20: 手机用户
                    formData.append('type', String(form.type));
                    
                    //手机号
                    if(form.mobile != null && form.mobile != ''){
                        formData.append('mobile', form.mobile);
                    }
                    formData.append('smsCode', form.smsCode);
                }else if(form.type == 30){//30: 邮箱
                    formData.append('type', String(form.type));
                    
                    //手机号
                    if(form.email != null && form.email != ''){
                        formData.append('email', form.email);
                    }
                    formData.append('emailCode', form.emailCode);
                }
                
                //密码需SHA256加密
                if(form.password){
                    let SHA256Value = SHA256(form.password).toString();
                    formData.append('password', SHA256Value);
                }
                //验证码Key
                formData.append('captchaKey', form.captchaKey);
                //验证码值
                if(form.captchaValue != ''){
                    formData.append('captchaValue', form.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/forgotPassword/step2',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('forgotPassword_step2.270'),//提交成功，3秒后自动跳转到登录页
                                type: 'success',
                                onClose: ()=>{
                                     router.push({
                                        path : '/login'
                                    });
                                }
                            })
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
        if(to.name == 'forgotPassword_step2'){
            queryForgotPassword_step2();
        }
        
        next();
    });
    onMounted(() => {

        init();
        
    }) 

    //初始化
    const init = () => {
        form.userName = router.currentRoute.value.query.userName != undefined ? router.currentRoute.value.query.userName as string :'';
        form.countryCode = router.currentRoute.value.query.countryCode != undefined ? router.currentRoute.value.query.countryCode as string : '';
        form.mobile = router.currentRoute.value.query.mobile != undefined ? router.currentRoute.value.query.mobile as string : '';
        form.email = router.currentRoute.value.query.email != undefined ? router.currentRoute.value.query.email as string : '';
		queryForgotPassword_step2();
        
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
            padding-top: 10px;
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
         
         
    }

</style>
