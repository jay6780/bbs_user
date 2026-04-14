<!-- 更换绑定手机第一步 -->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="updatePhoneBindingModule" >
                <div class="container">
                    <!-- 修改手机绑定 -- 验证旧手机号 -->
                    <div class="title">{{t('updatePhoneBinding_step1.10')}}</div>
                    <el-form :model="form" ref="formRef" :rules="rules" class="iconForm-container" size="large" >
                        <el-form-item :error="error.mobile" prop="mobile">
                            <div class="view-field">
                                <!-- 已绑定手机号 -->
                                <div class="input-name">{{t('updatePhoneBinding_step1.20')}}</div>
                                <div class="textInput-content">{{form.countryCode}} {{form.mobile}}</div>
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
                                    <!--换一幅-->
                                    <el-link type="primary" @click="replaceCaptcha" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item :error="error.smsCode" prop="smsCode" class="smsCode-item">
                            <!-- placeholder="短信验证码" -->
                            <el-input v-model="form.smsCode" maxlength="6" :placeholder="t('updatePhoneBinding_step1.30')" clearable >
                                <template #prefix>
                                    <Icon name="email" size="16px"/>
                                </template>
                                <template #append>
                                    <div class="smsCode">
                                        <div v-if="form.counter <=0" class="button">
                                            <!-- 获取验证码 -->
                                            <el-button link @mousedown="getSmsCode">{{t('updatePhoneBinding_step1.40')}}</el-button>
                                        </div>
                                        <div v-if="form.counter >0" class="text">{{form.countdownText}}</div>
                                    </div>
                                </template>
                            </el-input>
                        </el-form-item>
                        <div class="successInfo">{{form.successInfo}}</div>
                        
                        <el-form-item>
                            <!--提交-->
                            <el-button type="primary" style="width: 100%;" @mousedown.native="onSubmit"  :disabled="form.allowSubmit">{{t('common.50')}}</el-button>
                        </el-form-item>
                    </el-form>
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
    import { processErrorInfo} from '@/utils/tool';
    import { ElMessage, FormInstance } from 'element-plus';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();
    const formRef = ref<FormInstance>();

    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('updatePhoneBinding_step1.50')+' - ' + store.state.title,//更换绑定手机第一步
            meta: [
                {
                    name: 'keywords',
                    content: t('updatePhoneBinding_step1.50')+' - ' + store.state.title//更换绑定手机第一步
                },{
                    name: "description",
                    content: t('updatePhoneBinding_step1.50')+' - ' + store.state.title//更换绑定手机第一步
                }
            ]
        }))
    )



    const form = reactive({
        countryCode:'',//区号
        mobile:'',//手机号
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

    });
    

    //错误
    const error = reactive({
        mobile:'',//手机号
        smsCode:'',//短信验证码
        captchaValue:'',//验证码
    })

    //查询更换绑定手机第一步
    const queryUpdatePhoneBinding_step1 = () => {
        proxy?.$axios({
            url: '/user/control/updatePhoneBinding/step1',
            method: 'get',
            params:  { 
               
            },
            //showLoading: false,//是否显示加载图标
            //loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                form.captchaKey = result.captchaKey;
                form.countryCode = result.countryCode;
                form.mobile = result.mobile;
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
            formRef.value?.validateField('mobile', (valid: boolean) => {
                if (valid) {
                    resolve();
                } else {
                    form.allowSmsCodeSubmit = false;//提交按钮disabled状态
                }
            });
           formRef.value?.validateField('captchaValue', (valid: boolean) => {
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
                formData.append('module', '2');

                //验证码Key
                formData.append('captchaKey', form.captchaKey);
                //验证码值
                if(form.captchaValue != ''){
                    formData.append('captchaValue', form.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/user/control/getSmsCode',
                    method: 'post',
                    data: formData,
                    //showLoading: false,//是否显示加载图标
                    //loadingMask:false,// 是否显示遮罩层
                })
                .then((response: AxiosResponse) => {
                    if(response){
                        const result: any = response.data;
                        if(result.success){
                            form.successInfo = t('updatePhoneBinding_step1.60');//短信验证码已发送
                            countdown();

                        }else{
                            //处理错误信息
                            processErrorInfo(result.error as Map<string,string> , error,()=>{});
                            
                            if(result.captchaKey != null){
                                form.captchaKey = result.captchaKey;
                                replaceCaptcha();
                            }

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
        form.countdownText = t('updatePhoneBinding_step1.70',{'p1': form.counter});//form.counter+"秒没收到后可重新获取"

        form.timer = setInterval(() => {
          //替换文本
          form.countdownText = t('updatePhoneBinding_step1.70',{'p1': form.counter});//form.counter+"秒没收到后可重新获取"
          form.counter--;
          if (form.counter < 0) {
            // 当计时小于零时，取消该计时器
            clearInterval(form.timer)
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
            return callback(new Error(t('updatePhoneBinding_step1.80')));//短信验证码不能为空
        }else{
            if (value.trim().length < 6) {
                callback(new Error(t('updatePhoneBinding_step1.90')))//验证码长度为6个字符
            } else {   
                callback();
            }

        }
    }


    //校验规则
    const rules = reactive({
         smsCode: [{ validator: checkSmsCode, trigger: 'blur' }],
         captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],
    })


    //提交数据
    const onSubmit = () => {
        form.allowSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
           formRef.value?.validateField('smsCode', (valid: boolean) => {
                if (valid) {
                    resolve();
                } else {
                    form.allowSubmit = false;//提交按钮disabled状态
                }
            });
        });

        Promise.all([p1])
            .then(() => {
                //清空error的属性值
                Object.keys(error).map(key => {
                    Object.assign(error, {[key] : ''});
                })
            

                 let formData = new FormData();
                formData.append('smsCode', form.smsCode);

                proxy?.$axios({
                    url: '/user/control/updatePhoneBinding/step1',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                        let jumpUrl = result.jumpUrl;
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('updatePhoneBinding_step1.100'),//验证成功，3秒后自动跳转到更换绑定手机第二步
                                type: 'success',
                                onClose: ()=>{
                                     router.push({
                                        path : '/'+jumpUrl
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
        if(to.name == 'updatePhoneBinding_step1'){
            queryUpdatePhoneBinding_step1();
        }
        
        next();
    });
    onMounted(() => {
        init();
        
    }) 

    //初始化
    const init = () => {
		queryUpdatePhoneBinding_step1();
        
	}
    

</script>

<style scoped lang="scss">
    .updatePhoneBindingModule{
        padding-right:8px;
        padding-left:8px;
        padding-top:8px;
        padding-bottom: 30px;
        .container {
            width: 430px;
            padding-top: 10px;
            overflow: hidden;
            margin: 0 auto;
            .title{
                margin-top: 25px;
                font-size: 16px;
            }
         }
         //图标表单
        .iconForm-container{
            margin-top: 15px;
            :deep(.el-form-item__content) {
                line-height: normal;
            }
            :deep(.el-form-item__error) {
                width: 100%;
            }
            .view-field{
                background: $color-black-10;
                width: 100%;
                padding: 10px;
                .input-name{
                    font-size: 13px;
                    margin-left: 5px;
                    margin-right: 5px;
                    color: $color-black-50;
                }
                .textInput-content{
                    margin-top: 8px;
                    line-height: 26px;
                    margin-left: 5px;
                    margin-right: 5px;
                }
            }
            .smsCode-item{
                :deep(.el-input-group__append){
                    white-space: normal;
                }
                .smsCode{
                    width: 200px;
                    text-align: right;
                    .button{
                        color: $color-blue-60;
                        margin-right: 16px;
                        &:hover{
                            color: $color-blue-50;
                        }
                    }
                    .countdown{
                        color: $color-blue-60;
                    }
                }
            }
            .successInfo{
                margin-bottom: 18px;
                font-size: 14px;
                color: green;
                line-height: 20px
            }
            
            
            .captcha-item{
                .captchaInput{
                    width: 160px;
                }
                :deep(.el-form-item__error){
                    width: 100%;
                }
                .replaceCaptchaText{
                    position: relative;
                    top: -1px;
                    user-select:none;
                    :deep(.el-link__inner){
                        white-space:nowrap;
                    }
                }
            }
            
  

        }
         
    }

</style>
