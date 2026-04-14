<!-- 提问题页 -->
<template>
    <!-- 页头 :sticky="false"关闭浮动置顶功能 -->
    <Header :sticky="false"/>

    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="addQuestionModule" >
                <el-form label-position="right" :rules="rules" ref="formMobileRef" :model="form" class="iconForm-container" size="large" v-if="form.allowQuestion">
                    <el-row>
                        <el-col :span="18" >
                            <el-form-item prop="title" :error="error.title">
                                <!--标题-->
                                <el-input v-model.trim="form.title" :placeholder="t('addQuestion.10')" maxlength="90" width="100" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" ></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="18" >
                            <el-form-item prop="tagIdGroup" :error="error.tagIdGroup">
                                <el-select ref="questionTagRef"  v-model="form.tagIdGroup" @remove-tag="processRemoveTag"  @click="loadQuestionTag" multiple :placeholder="form.select_placeholder" >
                                    <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <!--已选择数量 / 可选择数量-->
                            <el-tooltip :content="t('addQuestion.20')" placement="top" effect="light">
                                <div class="selectCount">
                                    <div class="count">
                                        <el-breadcrumb separator="/">
                                            <el-breadcrumb-item>{{form.tagIdGroup.length}}</el-breadcrumb-item>
                                            <el-breadcrumb-item>{{form.maxQuestionTagQuantity}}</el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </div>
                                </div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-form-item :error="error.amount" v-if="form.questionRewardAmountMax == null || (form.questionRewardAmountMax != null && parseFloat(form.questionRewardAmountMax) >0)">
                        <!--悬赏金额-->
                        <el-input v-model.trim="form.amount" :placeholder="t('addQuestion.30')" maxlength="10" clearable style="width: 150px;margin-right:10px;"></el-input>
                        <span class="help-text">
                            <!--悬赏金额不能少于 {p1} 元；-->
                            <span v-if="parseFloat(form.questionRewardAmountMin) >0">{{t('addQuestion.40',{'p1': form.questionRewardAmountMin})}}</span>	
                            <!--悬赏金额不能超过 {p1} 元；-->
                            <span v-if="form.questionRewardAmountMax != null && parseFloat(form.questionRewardAmountMax) >0">{{t('addQuestion.50',{'p1': form.questionRewardAmountMax})}}</span>	
                            <!--用户共有金额 {p1} 元-->
                            <span>{{t('addQuestion.60',{'p1': form.maxDeposit})}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item :error="error.point" v-if="form.questionRewardPointMax == null || (form.questionRewardPointMax != null && parseInt(form.questionRewardPointMax) >0)">
                        <!--悬赏积分-->
                        <el-input v-model.trim="form.point" :placeholder="t('addQuestion.70')" maxlength="9" clearable style="width: 150px;margin-right:10px;"></el-input>
                        <span class="help-text">
                            <!--悬赏积分不能少于 {p1}；-->
                            <span v-if="parseInt(form.questionRewardPointMin) >0">{{t('addQuestion.80',{'p1': form.questionRewardPointMin})}}</span>	
                            <!--悬赏积分不能超过 {p1}；-->
                            <span v-if="form.questionRewardPointMax != null && parseInt(form.questionRewardPointMax) >0">{{t('addQuestion.90',{'p1': form.questionRewardPointMax})}}</span>	
                            <!--用户共有积分 {p1}-->
                            <span>{{t('addQuestion.100',{'p1': form.maxPoint})}}</span>
                        </span>
                    </el-form-item>

                     <!--发起投票-->
                    <el-form-item :label="t('addTopic.280')" v-if="form.isVoteView">
                        <el-switch v-model="form.isVote" ></el-switch>
                    </el-form-item>
                    <!--投票标题-->
                    <el-form-item :label="t('addTopic.300')" v-if="form.isVote" :required="true" :error="error.voteTitle" >
                        
                        <el-input v-model.trim="form.voteTitle" maxlength="150" :clearable="true" show-word-limit style="width: 850px;"></el-input>
                            
                    </el-form-item>
                    <!--投票类型-->
                    <el-form-item :label="t('addTopic.310')" v-if="form.isVote" :required="true">
                        <el-radio-group v-model="form.voteMaxChoice">
                            <el-radio :label="1">{{t('addTopic.320')}}</el-radio><!--单选-->
                            <el-radio :label="-1">{{t('addTopic.330')}}</el-radio><!--多选-->
                        </el-radio-group>
                    </el-form-item>
                    <!--投票截止时间-->
                    <el-form-item :label="t('addTopic.340')" v-if="form.isVote" :error="error.voteEndDate">
                         <span class="form-text">
                            <!--选择时间-->
                            <el-date-picker v-model="form.voteEndDate_format" type="datetime" format="YYYY-MM-DD HH:mm:ss" :placeholder="t('addTopic.350')"></el-date-picker>
                        </span>
                        <!--空值表示没有截止时间-->
                        <div class="help-text" >{{t('addTopic.360')}}</div>
                    </el-form-item>
                    <!--投票选项-->
                    <el-form-item v-for="(voteOption, index) in form.voteOptions" v-if="form.isVote"  :label="t('addTopic.370')" :required="true" >
                        
                        <el-col :span="16">
                            <el-input v-model="voteOption.text" maxlength="50" :clearable="true" show-word-limit></el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <!--上移-->
                            <el-button size="large" :icon="Top" circle @click.prevent="moveUp(voteOption)" :title="t('addTopic.380')"></el-button>
                            <!--下移-->
                            <el-button size="large" :icon="Bottom" circle @click.prevent="moveDown(voteOption)" :title="t('addTopic.390')"></el-button>
                            <!--删除-->
                            <el-button size="large" :icon="Delete" circle @click.prevent="removeItem(voteOption)" :title="t('addTopic.400')"></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="form.isVote" :error="error.voteOption">
                        <!--增加投票选项-->
                        <div class="item-button"><el-button size="large" :icon="Plus" @click="addItem">{{t('addTopic.410')}}</el-button></div>
                    </el-form-item>
                    
                    <el-form-item :error="error.content">
                        <div v-show="!form.isMarkdown" style="width: 100%;">
                            <textarea :editorId="'addQuestion'" ref="contentRef" style="width:100%;height:400px;visibility:hidden;"></textarea>
                        </div>
                        <div v-if="form.isMarkdown" style="width: 100%;">
                             <!--placeholder=请输入内容...-->
                            <Editor  :editorId="'addQuestion'" :value="form.markdownContent" :plugins="form.addQuestionEditorPlugin" :locale="setMarkdownLanguage()" :editorConfig="markdownEditorConfig" :sanitize="addQuestionSanitize" :placeholder="t('addQuestion.110')" @change="handleMarkdownChange"/>
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
                    </el-form-item>
                </el-form>
                <!--title="提问题功能已关闭"-->
                <el-result v-if="!form.allowQuestion" icon="warning" :title="t('addQuestion.150')"></el-result>

                <div class="selectQuestionTagModule">
                    <!--title="选择标签"-->
                    <el-dialog :title="t('addQuestion.160')" v-model="form.popup_tag" @close="closeQuestionTag" :draggable="true" top="40vh">
                        <div class="questionTagNavigation">
                            <ul class="nav">
                                <li class="nav-item" v-for="questionTag in form.allTagList" >
                                    <span class="nav-link" :class="form.selectedTagClass.get(questionTag.id)"  @click="selectChildTag(questionTag.id)" >{{questionTag.name}}</span>
                                </li>
                            </ul>
                            <!-- 二级标签 -->
                            <div class="tab-content">
                                <div class="tab-pane">
                                    <span class="child-tag" :class="form.selectedChildTagClass.get(childQuestionTag.id)" @click="selectedQuestionTag(childQuestionTag)"  v-for="childQuestionTag in form.childTagList" >{{childQuestionTag.name}}</span>
                                </div>
                            </div>
                        </div>
                    </el-dialog>
                </div>
                <!-- 选择提及用户 -->
                <div class="selectMentionUserModule">
                    <!--title="选择用户"-->
                    <el-dialog :title="t('addQuestion.170')" :z-index="900000" v-model="form.popup_mentionUser" @close="closeMentionUser" :draggable="true" top="40vh" width="500">
                        <div class="search">
                            <el-form :inline="true" label-width="auto" @keyup.enter.native="searchMentionUser">
                                <el-form-item :error="error.keyword">
                                    <!--用户账号或呢称-->
                                    <el-input v-model.trim="form.keyword" maxlength="30" :clearable="true" :placeholder="t('addQuestion.180')"></el-input>
                                </el-form-item>
                                
                                <el-form-item >
                                    <!--搜索-->
                                    <el-button type="primary" size="large" class="submitButton" @click="searchMentionUser" >{{t('addQuestion.190')}}</el-button>
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
            </div>
        </div>
    </div>
    <!-- 页脚 -->
    <Footer/>
</template>

<script setup lang="ts">
    import { onMounted, ref, getCurrentInstance, ComponentInternalInstance, reactive, onUnmounted, computed, watch, nextTick,} from 'vue'
    import { dayjs, ElMessage, FormInstance} from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useMeta} from 'vue-meta';
    import { appStore } from "@/store";
    import { AxiosResponse } from 'axios';
    import { QuestionTag, Tag, User } from '@/types';
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
    import { letterAvatar } from '@/utils/letterAvatar';
    import { mention } from '@/utils/markdownPlugin/plugin-mention';
    import { aiPopUp } from '@/components/aiAssistant/aiAssistantTool';
    import { ai } from '@/utils/markdownPlugin/plugin-ai';
    import { useI18n } from 'vue-i18n';
    import { Top, Bottom,Delete,Plus} from '@element-plus/icons-vue'

    let { t } = useI18n();

    const store = appStore();
    const router = useRouter();
    const { proxy,appContext } = getCurrentInstance() as ComponentInternalInstance;

    const formMobileRef = ref<FormInstance>();
    const questionTagRef = ref()
    const contentRef = ref()

    
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('addQuestion.200')+' - ' + store.state.title,//提问题
            meta: [
                {
                    name: 'keywords',
                    content: t('addQuestion.200')+' - ' + store.state.title//提问题
                },{
                    name: "description",
                    content: t('addQuestion.200')+' - ' + store.state.title//提问题
                }
            ]
        }))
    )

    //Select 选择器选项
    interface OptionsItem {
        value: string;
        label: string;
    }
    interface VoteOptionItem {
        id: string;
        text: string;
    }

    const form = reactive({
        tagList:[] as Array<Tag>,//标签
        allowQuestion:true,//是否允许提问题
        userGradeList:[],//用户等级
        availableTag:[] as Array<string>,//问题编辑器允许使用标签
        fileSystem:0,//文件存储系统
        supportEditor:10,//支持编辑器

        maxDeposit: '',//用户共有预存款
        maxPoint: '',//用户共有积分
        questionRewardPointMin: '',//问题悬赏积分下限
        questionRewardPointMax: '',//问题悬赏积分上限
        questionRewardAmountMin: '',//问题悬赏金额下限
        questionRewardAmountMax: '',//问题悬赏金额上限
        maxQuestionTagQuantity:0,//标签最多可选数量

        popup_mentionUser :false,//是否弹出选择提及用户表单
        keyword :'',//关键词
        mentionUserList:[] as Array<User>,//提及用户集合
        mentionUserEditorId:'',//提及用户编辑器Id
        currentMarkdownEditor:{} as BytemdEditorContext | undefined,//Markdown编辑器打开‘@提及’弹窗的编辑器对象

        amount: '',//悬赏金额
        point: '',//悬赏积分

        selectedTagClass:new Map<string,string>(),//选中‘标签‘样式
        selectedChildTagClass:new Map<string,string>(),//选中‘子标签‘样式
        tagIdGroup :[] as Array<string>,//标签Id组
        options: [] as Array<OptionsItem>,//Select 选择器标签数据
        popup_tag :false,//是否弹出问题标签表单
        allTagList: [] as Array<QuestionTag>,//标签,//全部标签
        selectedFirstTagId: '',//选中的一级标签Id
        childTagList: [] as Array<QuestionTag>,//选中一级标签的子标签集合
        select_placeholder: t('addQuestion.210'),//添加标签

        maxVoteOptions :0,//发起投票选项数量
        isVoteView:false,//是否显示发起投票
        isVote:false,//是否发起投票
        voteTitle :'',
        voteMaxChoice :1,
        voteEndDate_format:'',
        voteEndDate :'',//截止时间
        voteOptions: [{
            id: '',
            text: ''
        }] as Array<VoteOptionItem>,

        tagId:'',//标签Id
        title:'',//标题
        content:'',//内容
        markdownContent:'',//markdown内容
        isMarkdown:false,//是否使用markdown编辑器

        showCaptcha:false,//是否显示验证码
        captchaKey: '',//验证码key
        captchaValue: '',//验证码值
        imgUrl: '',//验证码图片
        allowSubmit:false,//提交按钮disabled状态

        addQuestionEditor :{} as any,//添加问题编辑器
		addQuestionEditorCreateParameObject :{} as any,//添加问题编辑器的创建参数

        addQuestionEditorPlugin:[] as BytemdPlugin[],//添加问题Markdown编辑器插件
    });
    



    //错误
    const error = reactive({
        tagId:'',//标签Id
        tagIdGroup:'',//标签Id
        title:'',//标题
        content:'',//内容
        amount: '',//悬赏金额
        point: '',//悬赏积分
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
    const addQuestionSanitize = (schema: any) => {
        schema = sanitize(schema);

        return schema;
    }

     //处理切换到富文本编辑器
     const handleToggleRichtextEditor = (editorId: string) => {
        form.isMarkdown = false;
        nextTick(()=>{
            if (Object.keys(form.addQuestionEditorCreateParameObject).length != 0) {//不等于空
                //创建富文本编辑器
                form.addQuestionEditor = createEditor(
                    form.addQuestionEditorCreateParameObject.ref, 
                    form.addQuestionEditorCreateParameObject.availableTag, 
                    form.addQuestionEditorCreateParameObject.uploadPath, 
                    form.addQuestionEditorCreateParameObject.userGradeList,
                    form.fileSystem,
                    ()=>{
                        handleToggleMarkdownEditor(editorId);
                    },
                    ()=>{
                        //提及弹窗
                        mentionPopUp(editorId,undefined)
                    },
                    (editorId: string)=>{
                        //AI弹窗
                        aiPopUp(proxy,appContext,editorId,form.addQuestionEditorCreateParameObject.uploadPath,'file',form.fileSystem,form.isMarkdown,form.addQuestionEditor,undefined)
                    }
                );
            }
        })
        
        
    }

    //处理切换到Markdown编辑器
    const handleToggleMarkdownEditor = (editorId: string) => {
        
        if (Object.keys(form.addQuestionEditor).length != 0) {//不等于空
			form.addQuestionEditor.remove();
            form.addQuestionEditor = {};
		}
        form.isMarkdown = true;
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
            form.addQuestionEditor.insertMention(url,title);
        }
        
        closeMentionUser();
    }


    //搜索提及用户
    const searchMentionUser = () => {
        form.mentionUserList.length = 0
        error.keyword = "";
        if(form.keyword == null || form.keyword.trim() == ''){
            error.keyword = t('addQuestion.220');//请输入用户账号或呢称
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
                if(result){
                    let userList = new Array();
                    if(result.nickname != null && result.nickname !=''){
                        result.avatar = letterAvatar(result.nickname, 48);
                    }else{
                        result.avatar = letterAvatar(result.account, 48);
                    }
                    userList.push(result);
                    
                    form.mentionUserList = userList;
                   
                }else{
                    error.keyword = t('addQuestion.230');//当前用户不存在
                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });

    }

    //投票 添加项
    const addItem = () => {
        if(form.voteOptions.length >= form.maxVoteOptions){
            ElMessage({
                showClose: true,
                message: t('addTopic.290',{'p1': form.maxVoteOptions}),//投票选项不能超过 {p1} 项
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


    //查询问题标签
    const loadQuestionTag = () => {
        questionTagRef.value.blur();//使Select选择器失去焦点，并隐藏下拉框

        form.popup_tag = true;
        
        if(form.tagIdGroup.length ==0){
            form.options.length = 0;//清空	
        }
            
        queryQuestionTagList();
    }
    //关闭问题标签弹出框
    const closeQuestionTag = () => {
        form.popup_tag = false;
    }
		
    //处理删除标签
    const processRemoveTag = (val:any) => {
        if(form.tagIdGroup.length ==0){
            form.select_placeholder = t('addQuestion.210');//添加标签
        }
    }
    //查询所有标签
    const queryQuestionTagList = () => {
        proxy?.$axios({
            url: '/queryAllQuestionTag',
            method: 'get',
            params:  {},
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            return response?.data
        })
        .then((data: Array<QuestionTag>) => {
            form.allTagList = data;
            if(data != null && data.length >0){
                for(let i=0; i<data.length; i++){
                    let questionTag = data[i];

                    //第一次选中第一个标签
                    if(form.selectedFirstTagId == ''){
                        form.childTagList = questionTag.childTag;
                        form.selectedFirstTagId = questionTag.id;
                        break;
                    }else{
                        if(form.selectedFirstTagId == questionTag.id){
                            form.childTagList = questionTag.childTag;
                            break;
                        }
                    }
                }
            }
            nextTick(()=> {
                setTagClass();
            });
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    //选择子标签
    const selectChildTag = (questionTagId :string) => {
        form.selectedFirstTagId = questionTagId;
        setTagClass();
        if(form.allTagList != null && form.allTagList.length >0){
            for (let i= 0; i < form.allTagList.length; i++) {
                let questionTag = form.allTagList[i];
                
                if(questionTagId == questionTag.id){
                    form.childTagList = questionTag.childTag;
                    
                    //如果只有一个节点，则允许选择本标签
                    if(questionTag.childNodeNumber == 0){
                        selectedQuestionTag(questionTag);
                    }

                    break;
                }
                
            }
            
        }

    }
    //选中标签
    const selectedQuestionTag = (childQuestionTag :QuestionTag) => {
        //判断是否重复选择,如果重复则取消选择
        if(form.options != null && form.options.length >0){
            for(let i=0; i<form.options.length; i++){
                let selectedTag = form.options[i];
                if(selectedTag.value == childQuestionTag.id){
                    //删除标签
                    deleteTag(selectedTag.value);
                    setTagClass();
                    return;
                }
            }
            
        }

        //如果超过最大允许选择数量
        if(form.tagIdGroup.length >= form.maxQuestionTagQuantity){
            ElMessage({
                showClose: true,
                message: t('addQuestion.240'),//已超过允许选择的最大标签数量
                type: 'error',
            })
            return;
        }


        let o = {} as OptionsItem;
        o.value = childQuestionTag.id;
        o.label = childQuestionTag.name;

        form.options.push(o);
        
        
        form.tagIdGroup.push(childQuestionTag.id);
        
        form.select_placeholder = "";
        setTagClass();
    }

    //删除标签
    const deleteTag = (questionTagId :string) => {
        if(form.options != null && form.options.length >0){
            for(let i=0; i<form.options.length; i++){
                let selectedTag = form.options[i];
                if(selectedTag.value == questionTagId){
                    form.options.splice(i, 1);
                    for(let j=0; j<form.tagIdGroup.length; j++){
                        if(form.tagIdGroup[j] == questionTagId){
                            form.tagIdGroup.splice(j, 1);
                            break;
                        }
                        
                    }
                    
                    if(form.tagIdGroup.length ==0){
                        form.select_placeholder = t('addQuestion.210')//添加标签
                    } 
                    return;
                }
            }
            
		}
    }
    //设置一级标签样式
    const setTagClass = () => {
        form.selectedTagClass.clear();
        if(form.selectedFirstTagId != ''){
            form.selectedTagClass.set(form.selectedFirstTagId,"active");
            if(form.tagIdGroup != null && form.tagIdGroup.length >0){
                for(let i = 0; i <form.tagIdGroup.length; i++){
                    let tagId = form.tagIdGroup[i];
                    form.selectedTagClass.set(tagId,"selected");
                    if(form.selectedFirstTagId == tagId){
                        form.selectedTagClass.set(tagId,"active selected");
                    }
                }
            }
        }
        setChildTagClass();
    } 
    

    //设置子标签样式
    const setChildTagClass = () => {
        form.selectedChildTagClass.clear();
        if(form.tagIdGroup != null && form.tagIdGroup.length >0){
            for(let i = 0; i <form.tagIdGroup.length; i++){
                let tagId = form.tagIdGroup[i];
                form.selectedChildTagClass.set(tagId,"selected");
            }
        }
    }


    //查询提问题页
    const queryAddQuestion = () => {
        //清空error的属性值
        Object.keys(error).map(key => {
            Object.assign(error, {[key] : ''});
        })
        //重置表单
        formMobileRef.value?.resetFields();

        proxy?.$axios({
            url: '/user/getQuestionForm',
            method: 'get',
            params:  {},
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;

                form.allowQuestion = data.allowQuestion;//是否允许提问题

                if(data.allowQuestion){
                    if(data.maxDeposit){
                        form.maxDeposit = data.maxDeposit;
                    }
                    if(data.maxPoint){
                        form.maxPoint = data.maxPoint;
                    }
                    form.questionRewardPointMin = data.questionRewardPointMin;
                    form.questionRewardPointMax = data.questionRewardPointMax;
                    form.questionRewardAmountMin = data.questionRewardAmountMin;
                    form.questionRewardAmountMax = data.questionRewardAmountMax;
                    form.maxQuestionTagQuantity = data.maxQuestionTagQuantity;
                    


                    if(data.userGradeList != null && data.userGradeList != ''){
                        form.userGradeList = JSON.parse(data.userGradeList);//JSON转为对象
                    }
                    if(data.availableTag != null && data.availableTag != ''){
                        let availableTagObject = JSON.parse(data.availableTag);//JSON转为对象

                        let flag = false;
                        if(availableTagObject != null && availableTagObject.length >0){
                            for(let i=0; i< availableTagObject.length; i++){
                                let availableTag = availableTagObject[i];
                                if(availableTag == "image"){//增加批量插入图片按钮
                                    availableTagObject.splice(i+1, 0, 'multiimage');//在指定索引处插入元素
                                    break;
                                }
                            }
                        }
                        if(data.supportEditor == 30 || data.supportEditor == 40){
                            availableTagObject.push("toggleEditor");
                        }
                        form.availableTag = availableTagObject;//问题编辑器允许使用标签
                    }
                    
                    form.fileSystem = data.fileSystem;//文件存储系统
                    form.supportEditor = data.supportEditor;//支持编辑器 10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                
                    form.maxVoteOptions = data.maxVoteOptions;
                    if(data.maxVoteOptions != null){
                        if(data.maxVoteOptions >0){//发起投票选项数量
                            form.isVoteView = true;//是否显示发起投票
                        }
                    }else{
                        form.isVoteView = true;//是否显示发起投票
                    }

                    if(form.supportEditor == 20 || form.supportEditor == 40){
                        form.isMarkdown = true;
                    }
                    let uploadPath = "user/control/question/upload?method=upload";
                    if(form.addQuestionEditorPlugin != null && form.addQuestionEditorPlugin.length ==0){
                        //添加插件
                        form.addQuestionEditorPlugin.push(...markdownPlugins);

                        form.addQuestionEditorPlugin.push(emoji());
                        if(form.availableTag?.indexOf('mention') != -1){
                            form.addQuestionEditorPlugin.push(
                                mention((editorId: string,ctx:BytemdEditorContext)=>{mentionPopUp(editorId,ctx)})
                            );
                        }
                        if(form.availableTag?.indexOf('ai') != -1){
                            form.addQuestionEditorPlugin.push(
                                
                                ai((editorId: string,ctx:BytemdEditorContext)=>{aiPopUp(proxy,appContext,editorId,uploadPath,'file',form.fileSystem,form.isMarkdown,undefined,ctx)})
                            );
                        }
                        if(form.supportEditor == 30 || form.supportEditor == 40){//10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                            form.addQuestionEditorPlugin.push(
                                toggleEditor((editorId: string)=>{handleToggleRichtextEditor(editorId)})
                            );
                        }
                        form.addQuestionEditorPlugin.push(
                            help(form.availableTag,form.userGradeList)
                        );

                        if(form.availableTag?.indexOf('image') != -1){
                            form.addQuestionEditorPlugin.push(
                                imageUpload("user/control/question/upload?method=upload",'file',form.fileSystem)
                            );
                            form.addQuestionEditorPlugin.push(
                                pasteImageUpload("user/control/question/upload?method=upload",'file',form.fileSystem)
                            );
                        }  
                    }


                    if (data.captchaKey != undefined && data.captchaKey != '') {
                        form.showCaptcha = true;
                        form.captchaKey = data.captchaKey;
                        replaceCaptcha();//刷新验证码
                    }

                    if (Object.keys(form.addQuestionEditorCreateParameObject).length === 0) {//等于空
                        
                        if(!form.isMarkdown){
                            //创建富文本编辑器
                            form.addQuestionEditor = createEditor(contentRef.value, form.availableTag, uploadPath, form.userGradeList,form.fileSystem,(editorId: string)=>{
                                handleToggleMarkdownEditor(editorId);
                            },
                            (editorId: string)=>{
                                //提及弹窗
                                mentionPopUp(editorId,undefined)
                            },
                            (editorId: string)=>{
                                //AI弹窗
                                aiPopUp(proxy,appContext,editorId,uploadPath,'file',form.fileSystem,form.isMarkdown,form.addQuestionEditor,undefined)
                            });
                        }
                        form.addQuestionEditorCreateParameObject = {
                                ref:contentRef.value,
                                availableTag:form.availableTag,
                                uploadPath:uploadPath,
                                userGradeList:form.userGradeList
                        }
                    }
                    
                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });

    }

    //选中标签
    const selectedTag = (val:string) => {
        form.tagId = val;
    }

     
    
    //校验标签组
    const checkTagIdGroup = (rule: any, value: any, callback: any) => {
        if(form.tagIdGroup.length == 0){
            callback(new Error(t('addQuestion.250')))//请选择标签
        }else{
            callback()
        }
        callback()
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


    //控制只能输入小数点后2位
    const clearNoNum = (val:string) => {
        val = val.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
        val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
        if (val.indexOf(".") < 0 && val != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
            val = parseFloat(val).toString();
        }
        return val;
    }

   

    //校验规则
    const rules = reactive({
        //标题不能为空    账号在 1 至 90个字符之间
        title: [{ required: true, message: t('addQuestion.260'), trigger: 'blur'},{ min: 1, max: 90, message: t('addQuestion.270'), trigger: 'blur'}],
        
       // tagIdGroup: [{required: true, validator: checkTagIdGroup, trigger: 'blur' }],
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
                if(form.tagIdGroup != null && form.tagIdGroup.length >0){
                    for(let i = 0; i <form.tagIdGroup.length; i++){
                        let tagId = form.tagIdGroup[i];
                        formData.append('tagId', tagId); 
                    }
                }
                

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

                
                if(form.amount != null && form.amount != ''){
                    formData.append('amount', form.amount);
                }
                if(form.point != null && form.point != ''){
                    formData.append('point', form.point);
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
                    url: '/user/control/question/add',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                        if(result.success){//登录成功
                            
                            ElMessage({
                                showClose: true,
                                message: t('addQuestion.280'),//提交成功，3秒后自动跳转到问答页
                                type: 'success',
                                onClose: ()=>{
                                        router.push({
                                        path : '/askList'
                                    });
                                }
                            })


                        }else{
                           
                            //修改返回属性
                            for (const [key, value] of Object.entries(result.error as Map<string,string>) as [string, string][]){
                                if(key == "tagId"){
                                    result.error.tagIdGroup = value;
                                }
                            }

                            //处理错误信息
                            processErrorInfo(result.error as Map<string,string>, error,()=>{});
                            

                            

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
                console.log("提交数据错误");//提交数据错误
            });
        

    }

    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'addQuestion'){
            queryAddQuestion();
        }
        
        next();
    });

    onMounted(() => {
        queryAddQuestion();
    }) 

    //卸载组件实例后调用
    onUnmounted (()=>{
        if (Object.keys(form.addQuestionEditor).length != 0) {//不等于空
            form.addQuestionEditor.remove();
            form.addQuestionEditor = {};
        }
    })
</script>



<style scoped lang="scss">
.addQuestionModule{
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
    

    .selectCount{
        width: 200px;
        height: 40px;
        background: $color-black-10;
        border-radius:3px;
        margin-left: 10px;
        .count{
            position: relative; top: 14px;
            display: flex;
            justify-content: center;
        }
    }

    .form-text{
        margin-right: 15px;
    }
    .help-text{
        font-size: 13px;
        color: $color-black-50;
        margin-left: 15px;
    }
    .totalAmountView{
        margin-left: 10px;
        font-size: 18px;
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
        :deep(.el-tag) {
            background-color: $color-black-30;
        }
        :deep(.el-select__wrapper){
            background-color: #f7f8fa;
            box-shadow: 0 0 0 1px #f7f8fa inset;
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

/** 选择问题标签 **/
.selectQuestionTagModule {
    background: #fff;
    .questionTagNavigation{
        font-size: 14px;
        .nav {
            background: #f6f6f6;
            padding-left: 8px;
            padding-top: 8px;
            padding-right: 8px;
            .nav-item{
                margin-right: 8px!important;
                margin-bottom: 8px!important;
                display: inline-block;
                cursor:pointer;
                .nav-link {
                    border-radius: 3px;
                    border: 1px solid #42a5f5;
                    color: #42a5f5;
                    background-color: #fff;
                    height:28px;
                    line-height:28px;
                    padding-left:8px;
                    padding-right:8px;
                    display: inline-block;
                }
                .active{
                    color: #42a5f5;
                    background-color: $color-blue-10;
                }
                .selected{
                    position: relative;
                    transition: all 0.5s ease;
                    &:after {
                        content: '✔';
                        height: 0px;
                        width: 0px;
                        position: absolute;
                        bottom: -4px;
                        right: -4px;
                        color:#fff;
                        line-height: 6px;
                        border: 10px solid;
                        border-color: transparent #42a5f5 #42a5f5 transparent;
                        /**对号大小,设置小于12px的文字*/
                        display: inline-block;
                        font-size: 12px;
                        text-size-adjust:none;
                        transform : scale(0.6,0.6);/*缩放指定dom，但必须是block级*/
                        
                    }
                }
            }
            a {
                color: #6c757d;
            }
        }
        .tab-content{
            margin: 8px;
            cursor:pointer;
        }
        .child-tag {
            display: inline-block;
            font-size: 14px;
            padding: 0px 8px;
            height: 30px;
            line-height: 30px;
            border-radius: 3px;
            background-color: $color-blue-10;
            color:#359ff5;
            margin-right: 8px;
            margin-bottom: 8px;
        }
        .selected{
            position: relative;
            transition: all 0.5s ease;
            &:after {
                content: '✔';
                height: 0px;
                width: 0px;
                position: absolute;
                bottom: -3px;
                right: -3px;
                color: #42a5f5;
                line-height: 6px;
                border: 10px solid;
                border-color: transparent transparent transparent transparent;
                /**对号大小,设置小于12px的文字*/
                display: inline-block;
                font-size: 12px;
                text-size-adjust:none;
                transform : scale(0.6,0.6);/*缩放指定dom，但必须是block级*/
                
            }
        }
    }
}



</style>