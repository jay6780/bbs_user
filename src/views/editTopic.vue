<!-- 修改话题页 -->
<template>
    <!-- 页头 :sticky="false"关闭浮动置顶功能 -->
    <Header :sticky="false"/>

   
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="editTopicModule" >
                <el-form label-position="right" :rules="rules" ref="formMobileRef" :model="form" class="iconForm-container" size="large" v-if="form.allowTopic">
                    
                    <el-form-item :error="error.title" >
                        <!--placeholder="标题"-->
                        <el-input v-model.trim="form.title" :placeholder="t('editTopic.10')" maxlength="90" clearable></el-input>
                    </el-form-item>

                    <!--发起投票-->
                    <el-form-item :label="t('editTopic.120')" v-if="form.isVoteView">
                        <el-switch v-model="form.isVote" ></el-switch>
                    </el-form-item>
                    <!--投票标题-->
                    <el-form-item :label="t('editTopic.140')" v-if="form.isVote" :required="true" :error="error.voteTitle" >
                        <el-input v-model.trim="form.voteTitle" maxlength="150" :clearable="true" show-word-limit></el-input>
                    </el-form-item>
                    <!--投票类型-->
                    <el-form-item :label="t('editTopic.150')" v-if="form.isVote" :required="true">
                        <el-radio-group v-model="form.voteMaxChoice">
                            <el-radio :label="1">{{t('editTopic.160')}}</el-radio><!--单选-->
                            <el-radio :label="-1">{{t('editTopic.170')}}</el-radio><!--多选-->
                        </el-radio-group>
                    </el-form-item>
                    <!--投票截止时间-->
                    <el-form-item :label="t('editTopic.180')" v-if="form.isVote" :error="error.voteEndDate">
                        <span class="form-text">
                            <!--选择时间-->
                            <el-date-picker v-model="form.voteEndDate_format" type="datetime" format="YYYY-MM-DD HH:mm:ss" :placeholder="t('editTopic.190')"></el-date-picker>
                        
                        </span>
                        <!--空值表示没有截止时间-->
                        <div class="help-text" >{{t('editTopic.200')}}</div>
                    </el-form-item>
                    <!--投票选项-->
                    <el-form-item v-for="(voteOption, index) in form.voteOptions" v-if="form.isVote"  :label="t('editTopic.210')" :required="true" >
                        
                        <el-col :span="16">
                            <el-input v-model="voteOption.text" maxlength="50" :clearable="true" show-word-limit></el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <!--上移-->
                            <el-button size="large" :icon="Top" circle @click.prevent="moveUp(voteOption)" :title="t('editTopic.220')"></el-button>
                            <!--下移-->
                            <el-button size="large" :icon="Bottom" circle @click.prevent="moveDown(voteOption)" :title="t('editTopic.230')"></el-button>
                            <!--删除-->
                            <el-button size="large" :icon="Delete" circle @click.prevent="removeItem(voteOption)" :title="t('editTopic.240')"></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="form.isVote" :error="error.voteOption">
                        <!--增加投票选项-->
                        <div class="item-button"><el-button size="large" :icon="Plus" @click="addItem">{{t('editTopic.250')}}</el-button></div>
                    </el-form-item>
                    
                    <el-form-item :error="error.content">
                        <div v-show="!form.isMarkdown" style="width: 100%;">
                            <textarea ref="contentRef" style="width:100%;height:400px;visibility:hidden;"></textarea>
                        </div>
                        <div v-if="form.isMarkdown" style="width: 100%;">
                            <!--placeholder="请输入内容..."-->
                            <Editor  :editorId="'editTopic'" :value="form.markdownContent" :plugins="form.editTopicEditorPlugin" :locale="setMarkdownLanguage()" :editorConfig="markdownEditorConfig" :sanitize="editTopicSanitize" :placeholder="t('editTopic.20')" @change="handleMarkdownChange"/>
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
                    <el-form-item>
                        <!--提交-->
                        <el-button type="primary" size="large" style="width: 130px;" @mousedown.native="onSubmit"  :disabled="form.allowSubmit">{{t('common.50')}}</el-button>
                        <!--取消-->
                        <el-button type="primary" size="large" style="width: 130px;" @mousedown.native="cancelEditTopic" plain>{{t('common.60')}}</el-button>
                    
                    </el-form-item>
                </el-form>

                <!-- 选择提及用户 -->
                <div class="selectMentionUserModule">
                    <!-- title="选择用户" -->
                    <el-dialog :title="t('editTopic.30')" :z-index="900000" v-model="form.popup_mentionUser" @close="closeMentionUser" :draggable="true" top="40vh" width="500">
                        <div class="search">
                            <el-form :inline="true" label-width="auto" @keyup.enter.native="searchMentionUser">
                                <el-form-item :error="error.keyword">
                                    <!-- placeholder="用户账号或呢称" -->
                                    <el-input v-model.trim="form.keyword" maxlength="30" :clearable="true" :placeholder="t('editTopic.40')"></el-input>
                                </el-form-item>
                                
                                <el-form-item >
                                    <!-- 搜索 -->
                                    <el-button type="primary" size="large" class="submitButton" @click="searchMentionUser" >{{t('editTopic.50')}}</el-button>
                                </el-form-item>
                                
                            </el-form>
                        </div>
                        <div class="mentionUserItem" v-for="mentionUser in form.mentionUserList" @click="selectMentionUser(mentionUser)">
                            <div class="left-layout">
                                <div class="avatarBox">
                                   
                                    <img v-if="mentionUser.avatarName != null" :src="mentionUser.avatarPath+'100x100/'+mentionUser.avatarName" class="img">
                                    <img v-if="mentionUser.avatarName == null" :src="mentionUser.avatar" width="48" height="48" class="img"/>
                                     
                                </div>
                            </div>
                            <div class="right-layout">
                                <span class="userInfo">{{mentionUser.nickname != null && mentionUser.nickname != '' ?mentionUser.nickname : mentionUser.account}}</span>
                            </div>
                        </div>
                    </el-dialog>
                </div>

                <!-- title="不允许修改话题" -->   
                <el-result v-if="!form.allowTopic" icon="warning" :title="t('editTopic.60')">
                    <template #extra>
                        <!-- 返回 -->   
                        <el-button type="primary" @click="router.push({path:'/thread',query: {topicId: router.currentRoute.value.query.topicId}})">{{t('editTopic.70')}}</el-button>
                    </template>
                </el-result>
            </div>
        </div>

    </div>
    <!-- 页脚 -->
    <Footer/>
</template>

<script setup lang="ts">
    import { onMounted, ref , getCurrentInstance, ComponentInternalInstance, reactive, onUnmounted, computed, watch, nextTick,} from 'vue'
    import { dayjs, ElMessage, FormInstance} from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useMeta} from 'vue-meta';
    import { appStore } from "@/store";
    import { AxiosResponse } from 'axios';
    import { onBeforeRouteUpdate } from 'vue-router';
    import { processErrorInfo } from '@/utils/tool';
    import { createEditor } from '@/utils/editor';
    import { markdownPlugins,markdownEditorConfig,sanitize, markdownToHtml, setMarkdownLanguage } from '@/utils/markdownEditor';
    import { toggleEditor } from '@/utils/markdownPlugin/plugin-toggle-editor';
    import { help } from '@/utils/markdownPlugin/plugin-help';
    import { emoji } from '@/utils/markdownPlugin/plugin-emoji';
    import { imageUpload } from '@/utils/markdownPlugin/plugin-image-upload';
    import { pasteImageUpload } from '@/utils/markdownPlugin/plugin-paste-image';
    import { fileUpload } from '@/utils/markdownPlugin/plugin-file-upload';
    import { videoUpload } from '@/utils/markdownPlugin/plugin-video-upload';
    import { hideContent } from '@/utils/markdownPlugin/plugin-hide-content';
    import type { BytemdPlugin,BytemdEditorContext } from 'bytemd'
    import { Editor } from '@bytemd/vue-next'
    import { User } from '@/types';
    import { letterAvatar } from '@/utils/letterAvatar';
    import { mention } from '@/utils/markdownPlugin/plugin-mention';
    import { ai } from '@/utils/markdownPlugin/plugin-ai';
    import { aiPopUp } from '@/components/aiAssistant/aiAssistantTool';
    import { Top, Bottom,Delete,Plus} from '@element-plus/icons-vue'
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();


    const store = appStore();
    const router = useRouter();
    const { proxy,appContext} = getCurrentInstance() as ComponentInternalInstance;

    const formMobileRef = ref<FormInstance>();
    const contentRef = ref()


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('editTopic.80')+' - ' + store.state.title,//修改话题
            meta: [
                {
                    name: 'keywords',
                    content: t('editTopic.80')+' - ' + store.state.title//修改话题
                },{
                    name: "description",
                    content: t('editTopic.80')+' - ' + store.state.title//修改话题
                }
            ]
        }))
    )

    interface VoteOptionItem {
        id: string;
        text: string;
    }

    const form = reactive({
        allowTopic:true,//是否允许提交话题
        userGradeList:[],//用户等级
        availableTag:[] as Array<string>,//话题编辑器允许使用标签
        fileSystem:0,//文件存储系统
        supportEditor:10,//支持编辑器

        title:'',//标题
        content:'',//内容
        markdownContent:'',//markdown内容
        isMarkdown:false,//是否使用markdown编辑器

        popup_mentionUser :false,//是否弹出选择提及用户表单
        keyword :'',//关键词
        mentionUserList:[] as Array<User>,//提及用户集合
        mentionUserEditorId:'',//提及用户编辑器Id
        currentMarkdownEditor:{} as BytemdEditorContext | undefined,//Markdown编辑器打开‘@提及’弹窗的编辑器对象

        maxVoteOptions :0,//发起投票选项数量
        isVoteView:false,//是否显示发起投票
        isVote:false,//是否发起投票
        voteTitle :'',
        voteMaxChoice :1,
        voteEndDate_format:'',
        voteEndDate :'',//截止时间
        voteOptions: [] as Array<VoteOptionItem>,//投票选项列表

        showCaptcha:false,//是否显示验证码
        captchaKey: '',//验证码key
        captchaValue: '',//验证码值
        imgUrl: '',//验证码图片
        allowSubmit:false,//提交按钮disabled状态

        editTopicEditor :{} as any,//修改话题编辑器
		editTopicEditorCreateParameObject :{} as any,//修改话题编辑器的创建参数

        editTopicEditorPlugin:[] as BytemdPlugin[],//添加话题Markdown编辑器插件
    });

    //错误
    const error = reactive({
        title:'',//标题
        content:'',//内容
        captchaValue:'',//验证码

        keyword :'',
        voteOption :'',
        voteTitle :'',
        voteMaxChoice :'',
        voteEndDate :'',
    })

    //处理Markdown
    const handleMarkdownChange = (value: string) => {
        form.markdownContent = value;
    }

    //白名单
    const editTopicSanitize = (schema: any) => {
        schema = sanitize(schema);
        
        if(form.availableTag?.indexOf('embedVideo') != -1){//嵌入视频
            schema.tagNames.push('iframe');
        }

        return schema;
    }

    //处理切换到富文本编辑器
    const handleToggleRichtextEditor = (editorId: string) => {
        form.isMarkdown = false;
        nextTick(()=>{
            if (Object.keys(form.editTopicEditorCreateParameObject).length != 0) {//不等于空
                //创建富文本编辑器
                form.editTopicEditor = createEditor(
                    form.editTopicEditorCreateParameObject.ref, 
                    form.editTopicEditorCreateParameObject.availableTag, 
                    form.editTopicEditorCreateParameObject.uploadPath, 
                    form.editTopicEditorCreateParameObject.userGradeList,
                    form.fileSystem,
                    (editorId: string)=>{
                        handleToggleMarkdownEditor(editorId);
                    },
                    ()=>{
                        //提及弹窗
                        mentionPopUp(editorId,undefined)
                    },
                    (editorId: string)=>{
                        //AI弹窗
                        aiPopUp(proxy,appContext,editorId,form.editTopicEditorCreateParameObject.uploadPath,'file',form.fileSystem,form.isMarkdown,form.editTopicEditor,undefined)
                    }
                );
            }
        })
        
        
    }

    //处理切换到Markdown编辑器
    const handleToggleMarkdownEditor = (editorId: string) => {
        
        if (Object.keys(form.editTopicEditor).length != 0) {//不等于空
			form.editTopicEditor.remove();
            form.editTopicEditor = {};
		}
        form.isMarkdown = true;
    }


    //查询修改话题页
    const queryEditTopic = (topicId:string) => {
        //清空error的属性值
        Object.keys(error).map(key => {
            Object.assign(error, {[key] : ''});
        })
        //重置表单
        formMobileRef.value?.resetFields();

        proxy?.$axios({
            url: '/user/getEditTopicForm',
            method: 'get',
            params:  {
                topicId:topicId
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                let topic = data.topic;
                if(topic){
                    form.title = topic.title;
                    contentRef.value.value = topic.content;
                    if(topic.isMarkdown != null && topic.isMarkdown == true){
                        form.isMarkdown = true;
                        form.markdownContent = topic.markdownContent;
                    }
                }

                form.allowTopic = data.allowTopic;//是否允许提交话题
                form.maxVoteOptions = data.maxVoteOptions;
                if(data.maxVoteOptions != null){
                    if(data.maxVoteOptions >0){//发起投票选项数量
                        form.isVoteView = true;//是否显示发起投票
                    }
                }else{
                    form.isVoteView = true;//是否显示发起投票
                }
                if(topic.voteThemeId != null && topic.voteThemeId != ''){
                    form.isVoteView = true;//是否显示发起投票
                    form.isVote = true;//是否发起投票
                }

                if(data.voteTheme != null && Object.keys(data.voteTheme).length > 0){
			    				
                    form.voteTitle = data.voteTheme.title;
                    form.voteMaxChoice = data.voteTheme.maxChoice;
                    form.voteEndDate_format = data.voteTheme.endDate;//截止时间
                    if(form.voteEndDate_format != null && form.voteEndDate_format != ''){
                        form.voteEndDate = dayjs(form.voteEndDate_format).format('YYYY-MM-DD HH:mm:ss');
                    }

                    for (let i =0; i<data.voteTheme.voteOptionList.length; i++) {  
                        let voteOption = data.voteTheme.voteOptionList[i];
                        let item = {
                            id: voteOption.id,
                            text: voteOption.text,
                        }
                    
                        form.voteOptions.push(item);
                    }
			    }

                if(data.userGradeList != null && data.userGradeList != ''){
                    form.userGradeList = JSON.parse(data.userGradeList);//JSON转为对象
                }
                if(data.availableTag != null && data.availableTag != ''){
                    let availableTagObject = JSON.parse(data.availableTag);//JSON转为对象

                    let flag = false;
                    if(availableTagObject != null && availableTagObject.length >0){
                        for(let i=0; i< availableTagObject.length; i++){
                            let availableTag = availableTagObject[i];
                            if(availableTag == "hidePassword" || availableTag == "hideComment" ||
                            availableTag == "hideGrade" || availableTag == "hidePoint" || availableTag == "hideAmount"){
                                availableTagObject.splice(i, 0, 'hide');//在指定索引处插入元素
                                break;
                            }
                        }
                        for(var i=0; i< availableTagObject.length; i++){
                            let availableTag = availableTagObject[i];
                            if(availableTag == "image"){//增加批量插入图片按钮
                                availableTagObject.splice(i+1, 0, 'multiimage');//在指定索引处插入元素
                                break;
                            }
                        }
                    }

                    form.availableTag = availableTagObject;//话题编辑器允许使用标签
                }
                
                form.fileSystem = data.fileSystem;//文件存储系统

                let uploadPath = "user/control/topic/upload?method=upload";

                if(form.editTopicEditorPlugin != null && form.editTopicEditorPlugin.length ==0){
                    //添加插件
                    form.editTopicEditorPlugin.push(...markdownPlugins);

                    form.editTopicEditorPlugin.push(emoji());

                    if(form.availableTag?.indexOf('mention') != -1){
                        form.editTopicEditorPlugin.push(
                            mention((editorId: string,ctx:BytemdEditorContext)=>{mentionPopUp(editorId,ctx)})
                        );
                    }
                    if(form.availableTag?.indexOf('ai') != -1){
                        form.editTopicEditorPlugin.push(
                            
                            ai((editorId: string,ctx:BytemdEditorContext)=>{aiPopUp(proxy,appContext,editorId,uploadPath,'file',form.fileSystem,true,undefined,ctx)})
                        );
                    }
                    if(form.supportEditor == 30 || form.supportEditor == 40){//10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                        form.editTopicEditorPlugin.push(
                            toggleEditor((editorId: string)=>{handleToggleRichtextEditor(editorId)})
                        );
                    }
                    form.editTopicEditorPlugin.push(
                        help(form.availableTag,form.userGradeList)
                    );

                    if(form.availableTag?.indexOf('insertfile') != -1){
                        form.editTopicEditorPlugin.push(
                            fileUpload("user/control/topic/upload?method=upload",'file',form.fileSystem)
                        );
                    }
                    if(form.availableTag?.indexOf('image') != -1){
                        form.editTopicEditorPlugin.push(
                            imageUpload("user/control/topic/upload?method=upload",'file',form.fileSystem)
                        );
                        form.editTopicEditorPlugin.push(
                            pasteImageUpload("user/control/topic/upload?method=upload",'file',form.fileSystem)
                        );
                    }  

                    if(form.availableTag?.indexOf('uploadVideo') != -1){
                        form.editTopicEditorPlugin.push(
                            videoUpload("user/control/topic/upload?method=upload","file",form.fileSystem)
                        );
                    }
                    if(form.availableTag?.indexOf('hidePassword') != -1 
                        || form.availableTag?.indexOf('hideComment') != -1
                        || form.availableTag?.indexOf('hideGrade') != -1 
                        || form.availableTag?.indexOf('hidePoint') != -1 
                        || form.availableTag?.indexOf('hideAmount') != -1
                        ){
                        form.editTopicEditorPlugin.push(
                            hideContent(form.availableTag,form.userGradeList)
                        );
                    }
                }

                if (data.captchaKey != undefined && data.captchaKey != '') {
                    form.showCaptcha = true;
                    form.captchaKey = data.captchaKey;
                    replaceCaptcha();//刷新验证码
                }

                if(data.allowTopic && Object.keys(form.editTopicEditorCreateParameObject).length === 0) {//等于空){
                    
                    if(!form.isMarkdown){
                        //创建富文本编辑器
                        form.editTopicEditor = createEditor(contentRef.value, form.availableTag, uploadPath, form.userGradeList,form.fileSystem,(editorId: string)=>{
                            handleToggleMarkdownEditor(editorId);
                        },
                        (editorId: string)=>{
                            //提及弹窗
                            mentionPopUp(editorId,undefined)
                        },
                        (editorId: string)=>{
                            //AI弹窗
                            aiPopUp(proxy,appContext,editorId,uploadPath,'file',form.fileSystem,form.isMarkdown,form.editTopicEditor,undefined)
                        });
                }
                    form.editTopicEditorCreateParameObject = {
                        ref:contentRef.value,
                        availableTag:form.availableTag,
                        uploadPath:uploadPath,
                        userGradeList:form.userGradeList
                    }
                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });

    }


    //显示、隐藏提及弹窗
    const mentionPopUp = (editorId: string,ctx:BytemdEditorContext| undefined) => {
       // console.log("显示、隐藏提及弹窗",editorId);
      
        form.popup_mentionUser = true;
        form.mentionUserEditorId = editorId;
        form.keyword = "";
        form.mentionUserList.length = 0;
        form.currentMarkdownEditor = ctx;
        error.keyword = "";
    }

    //关闭提及用户弹出框
    const closeMentionUser = () => {
        form.popup_mentionUser = false;
        form.currentMarkdownEditor = undefined;
    }

    //选择提及用户
    const selectMentionUser = (mentionUser:User) => {
        let url = "user/control/home?userName="+mentionUser.userName;
        let title = mentionUser.nickname != null && mentionUser.nickname != '' ? '@'+mentionUser.nickname : '@'+mentionUser.account;

        if(form.isMarkdown){
           form.currentMarkdownEditor?.editor.replaceSelection(`${title}`);
        }else{
            form.editTopicEditor.insertMention(url,title);
        }
        
        closeMentionUser();
    }


    //搜索提及用户
    const searchMentionUser = () => {
        form.mentionUserList.length = 0
        error.keyword = "";
        if(form.keyword == null || form.keyword.trim() == ''){
            error.keyword = t('editTopic.90');//请输入用户账号或呢称
            return;
        }
        proxy?.$axios({
            url: '/user/control/queryUser',//暂时使用查询提及用户API
            method: 'get',
            params:  {keyword:form.keyword},
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                if(result != null){
                    let userList = new Array();
                    if(result.nickname != null && result.nickname !=''){
                        result.avatar = letterAvatar(result.nickname, 48);
                    }else{
                        result.avatar = letterAvatar(result.account, 48);
                    }
                    userList.push(result);
                    
                    form.mentionUserList = userList;
                    
                }else{
                    error.keyword = t('editTopic.100');//当前用户不存在
                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });

    }


    //处理投票按钮状态
    const handleVote = (val: boolean | string | number) => {
        if(val == true && form.voteOptions.length ==0){
            addItem();
        }
    }
    //投票 添加项
    const addItem = () => {
        if(form.voteOptions.length >= form.maxVoteOptions){
            ElMessage({
                showClose: true,
                message: t('editTopic.130',{'p1': form.maxVoteOptions}),//投票选项不能超过 {p1} 项
                type: 'warning',
            })
            return;
        }
        form.voteOptions.push({
            id: '',
            text: ''
        });
    }
    //投票 删除项
    const removeItem = (voteOption:any) => {
        let index = form.voteOptions.indexOf(voteOption);
        if (index !== -1) {
            form.voteOptions.splice(index, 1);
        }
    }
    //投票 上移
    const moveUp = (voteOption:any) => {
        let index = form.voteOptions.indexOf(voteOption);
        if (index >0) {
            let upData = form.voteOptions[index - 1];
            form.voteOptions.splice(index - 1, 1);
            form.voteOptions.splice(index, 0, upData);
        }
    }
    //投票 下移
    const moveDown = (voteOption:any) => {
        let index = form.voteOptions.indexOf(voteOption);
        if ((index + 1) < form.voteOptions.length) {
            let downData = form.voteOptions[index + 1];
            form.voteOptions.splice(index + 1, 1);
            form.voteOptions.splice(index, 0, downData);
        }
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

    //校验规则
    const rules = reactive({
       captchaValue: [{ validator: checkCaptchaValue, trigger: 'blur' }],
    })

    //提交数据
    const onSubmit = () => {
        form.allowSubmit = true;//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            formMobileRef.value?.validate((valid: boolean) => {
                if (valid) {
                    resolve();
                }else{
                    form.allowSubmit = false;//提交按钮disabled状态
                }
            })
            
        });

        Promise.all([p1])
            .then(() => {
                //清空error的属性值
                Object.keys(error).map(key => {
                    Object.assign(error, {[key] : ''});
                })
            

                let formData = new FormData();

                let topicId:string = router.currentRoute.value.query.topicId != undefined ?router.currentRoute.value.query.topicId as string :'';
                formData.append('topicId', topicId);

                if(form.title != null && form.title != ''){
                    formData.append('title', form.title);
                }

                if(form.isMarkdown){
                    formData.append('isMarkdown', form.isMarkdown.toString());
                    formData.append('markdownContent', form.markdownContent);
                }else{
                    if(contentRef.value.value != null && contentRef.value.value !=''){
                        formData.append('content', contentRef.value.value);
                    }
                }

                formData.append('isVote', form.isVote.toString());
                if(form.voteTitle != null && form.voteTitle != ''){
                    formData.append('voteTitle', form.voteTitle);
                }
                formData.append('voteMaxChoice', String(form.voteMaxChoice));
                if(form.voteEndDate_format != null && form.voteEndDate_format != ''){
                    form.voteEndDate = dayjs(form.voteEndDate_format).format('YYYY-MM-DD HH:mm:ss');
                }else{
                    form.voteEndDate = '';
                }
                formData.append('voteEndDate', form.voteEndDate);
                if(form.voteOptions != null && form.voteOptions.length >0){
                    for(let i=0; i<form.voteOptions.length; i++){
                        let voteOption = form.voteOptions[i];
                        formData.append('voteOptionIdList', voteOption.id);
                        formData.append('voteOptionTextList', voteOption.text);
                        
                    }
                }
                
                //验证码Key
                formData.append('captchaKey', form.captchaKey);
                //验证码值
                if(form.captchaValue != ''){
                    formData.append('captchaValue', form.captchaValue.trim());
                }

                proxy?.$axios({
                    url: '/user/control/topic/edit',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                      
                            ElMessage({
                                showClose: true,
                                message: t('editTopic.110'),//提交成功，3秒后自动跳转到话题内容页
                                type: 'success',
                                onClose: ()=>{
                                    router.push({
                                        path : '/thread',
                                        query: {topicId: topicId}
                                    });
                                }
                            })


                        }else{
                            //处理错误信息
                            processErrorInfo(result.error as Map<string,string> , error,()=>{});
                            

                            if(result.captchaKey != null){
                                form.showCaptcha = true;
                                form.captchaKey = result.captchaKey;
                                replaceCaptcha();
                            }else{
                                form.showCaptcha = false;
                            }

                            form.allowSubmit = false;//提交按钮disabled状态
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

    //取消修改话题
    const cancelEditTopic = () => {
        let topicId:string = router.currentRoute.value.query.topicId != undefined ?router.currentRoute.value.query.topicId as string :'';
        
        router.push({
            path : '/thread',
            query: {topicId: topicId}
        });
    }
   


    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'editTopic'){
            let topicId:string = '';
            if(to.query.topicId != undefined){
                topicId = to.query.topicId as string
            }
            queryEditTopic(topicId);
        }
        
        next();
    });
    

    onMounted(() => {
        let topicId:string = router.currentRoute.value.query.topicId != undefined ?router.currentRoute.value.query.topicId as string :'';
           
        queryEditTopic(topicId);
    }) 

    //卸载组件实例后调用
    onUnmounted (()=>{
        if (Object.keys(form.editTopicEditor).length != 0) {//不等于空
            form.editTopicEditor.remove();
            form.editTopicEditor = {};
        }
    })
</script>



<style scoped lang="scss">
.editTopicModule{
    padding:25px 40px 40px 40px;
    margin:0px auto;

    :deep(.bytemd){
        height: calc(100vh - 100px);
        
    }
    :deep(.CodeMirror-scroll){//让外层滚动条不滚动
        overscroll-behavior:  contain;
    }
    :deep(.bytemd-preview){//让外层滚动条不滚动
        overscroll-behavior:  contain;
    }
    .form-text{
        margin-right: 15px;
    }
    .help-text{
        font-size: 13px;
        color: $color-black-50;
        line-height: 38px;
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

    /** 选择提及用户 **/
    .selectMentionUserModule {
        background: #fff;
        :deep(.search){
            
            .el-form--inline .el-form-item{
                margin-right: 10px;
            }

            .el-form-item__content {
                line-height: 40px;
            }
            .el-radio-button__inner{
                padding: 12px 20px 12px 20px;
            }
            .el-input {
                --el-input-height: 40px;
                width: 178px;
            }
            .el-form-item__error{
                font-size: 13px; padding-top: 8px;
            }
            .form-help{
                color: #909399; 
                line-height: 20px;
                margin-top: 8px;
            }
        }
        .mentionUserItem{
            margin-top: 15px;
            padding: 8px;
            margin-left: -8px;
            margin-right: -8px;
            cursor: pointer;
            display: flex;
            &:hover{
                background: $color-black-10;
                border-radius:3px;
            }
            .left-layout{
                margin-right: 10px;
                width: 48px;
                .avatarBox {
                  
                    img {
                        float: none;
                        display: block;
                        width: 48px;
                        height: 48px;
                        float: left;
                        margin-right: 10px;
                        border-radius:48px;
                        position:relative;
                    }
                    
                }
            }
            .right-layout{
                flex: 1;
                
                .userInfo{
                    line-height: 48px;
                }
            }
        }
    }
}

</style>