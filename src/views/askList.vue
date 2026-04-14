<!--问答列表-->
<template>
    <!-- 页头 -->
    <Header ref="headerComponent" @floatWindow="receive_floatWindow"/>

    <div class="main">
        <div class="main-container wrap main-fullScreen ">
            <div class="askListModule">
                <div class="left-container" >
                    
  
                    <div class="left-navigation" ref="headerNavigation">
                        <el-scrollbar ref="tagScrollbar" :max-height="state.tagScrollbarMaxHeight" wrap-style="transition: max-height 0.3s ease 0s;">
                            <div class="item">
                                <router-link tag="a" to="/askList" class="title" :class="router.currentRoute.value.query.questionTagId == undefined || router.currentRoute.value.query.questionTagId == '' ? 'active' :''">
                                    <div class="svg-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path></svg>
                                    </div>
                                    <!-- 全部 -->
                                    <div class="text">{{t('askList.10')}}</div>
                                </router-link>
                        
                                <div class="childTitle"></div>
                            </div>
                            
                            <div class="item" :ref="'tag_'+tag.id" v-for="tag in state.tagList">
                                <el-tooltip effect="tag-customized" :disabled="tagTooltipDisabled" :content="tag.name" placement="right" transition=" "  :hide-after="10">
                                    <router-link tag="a" v-if="tag.childNodeNumber ==0" @mouseenter="tagTooltip($event,tag.name)" :to="{path: '/askList', query:{ questionTagId : tag.id}}" class="title" :class="{ 'active': router.currentRoute.value.query.questionTagId == tag.id, 'showTagArrow':state.showTagArrow == true && tag.childTag.length >0}">
                                        <div class="image-container" v-if="tag.image != null && tag.image != ''">
                                            <el-image :src="tag.image" style="width: 16px; height: 16px;border-radius:2px" fit="cover" />
                                        </div>
                                        <div v-else class="svg-container">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.78428 14L8.2047 10H4V8H8.41491L8.94043 3H10.9514L10.4259 8H14.4149L14.9404 3H16.9514L16.4259 8H20V10H16.2157L15.7953 14H20V16H15.5851L15.0596 21H13.0486L13.5741 16H9.58509L9.05957 21H7.04855L7.57407 16H4V14H7.78428ZM9.7953 14H13.7843L14.2047 10H10.2157L9.7953 14Z"></path></svg>
                                        </div>
                                        <!-- cell 用js来判断text-overflow是否生效 -->
                                        <div class="text cell">{{tag.name}}</div>
                                    </router-link>
                                
                                    <a v-if="tag.childNodeNumber >0" @mouseenter="tagTooltip($event,tag.name)" @click="onToggleTag(tag.id)" class="title mouse" :class="{ 'showTagArrow':state.showTagArrow == true && tag.childTag.length >0}">
                                        <div class="image-container" v-if="tag.image != null && tag.image != ''">
                                            <el-image :src="tag.image" style="width: 16px; height: 16px;border-radius:2px" fit="cover" />
                                        </div>
                                        <div v-else class="svg-container">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.78428 14L8.2047 10H4V8H8.41491L8.94043 3H10.9514L10.4259 8H14.4149L14.9404 3H16.9514L16.4259 8H20V10H16.2157L15.7953 14H20V16H15.5851L15.0596 21H13.0486L13.5741 16H9.58509L9.05957 21H7.04855L7.57407 16H4V14H7.78428ZM9.7953 14H13.7843L14.2047 10H10.2157L9.7953 14Z"></path></svg>
                                        </div>
                                        <div class="text cell">{{tag.name}}</div>
                                    </a>
                                </el-tooltip>
                                <div class="arrow" :class="state.isExpandTagMap.get(tag.id) == true ? 'expand' :''" @click="onToggleTag(tag.id)" v-if="state.showTagArrow && tag.childTag.length >0"><el-icon><ArrowDown /></el-icon></div>
                                
                                
                                <div :ref="'childTag_'+childQuestionTag.id" class="childTag" :class="state.isExpandTagMap.get(tag.id) == true ? 'expand' :''"  :style="{'max-height': state.isExpandTagMap.get(tag.id) == true ? state.childTagAutoHeightMap.get(tag.id)+'px':0}"   v-for="childQuestionTag in tag.childTag" @mouseenter="tagTooltip($event,childQuestionTag.name)" >
                                    <el-tooltip effect="tag-customized" :disabled="tagTooltipDisabled" :content="childQuestionTag.name" placement="right" transition=" "  :hide-after="10">
                                        <!-- cell 用js来判断text-overflow是否生效 -->
                                        <router-link  :to="{path: '/askList', query: {questionTagId: childQuestionTag.id}}" class="childItem cell" :class="router.currentRoute.value.query.questionTagId == childQuestionTag.id ? 'active' :''" >{{childQuestionTag.name}}</router-link>            
                                    </el-tooltip>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="middle-container">
                    <ul class="nav clearfix">
                        <li :class="(state.filterCondition == '' || state.filterCondition == '10') ? 'active' : ''">
                            <!-- 最新 -->
                            <router-link :to="{path: '/askList'}" >{{t('askList.20')}}</router-link>
                        </li>
                        <li :class="state.filterCondition == '20' ? 'active' : ''">
                            <!-- 未解决 -->
                            <router-link :to="{path: '/askList', query: {filterCondition: 20}}" >{{t('askList.30')}}</router-link>
                        </li>
                        <li :class="state.filterCondition == '30' ? 'active' : ''">
                            <!-- 已解决 -->
                            <router-link :to="{path: '/askList', query: {filterCondition: 30}}" >{{t('askList.40')}}</router-link>
                        </li>
                        <li :class="state.filterCondition == '40' ? 'active' : ''">
                            <!-- 积分悬赏 -->
                            <router-link :to="{path: '/askList', query: {filterCondition: 40}}" >{{t('askList.50')}}</router-link>
                        </li>
                        <li :class="state.filterCondition == '50' ? 'active' : ''">
                            <!-- 现金悬赏 -->
                            <router-link :to="{path: '/askList', query: {filterCondition: 50}}" >{{t('askList.60')}}</router-link>
                        </li>
                        <div class="postQuestionButton">
                            <!-- 提问题 -->
                            <el-button type="primary" @click="router.push({path: '/addQuestion'})" plain style="width: 100%;" ><Icon name="question-answer-line" size="15px" class="icon"/>{{t('askList.70')}}</el-button>  
                        </div>
                    </ul>
                    <div class="question-box" :class="{ 'full-radius': !(state.filterCondition == '' || state.filterCondition == '10') }">
                        <div class="questionList">
                            <div class="questionItem" v-for="question in state.pageView.records" >
                                <div class="avatarBox">
                                    <router-link tag="a" v-if="question.userName != null && question.userName != ''" class="avatarLink" :to="{path:'/user/control/home',query: {userName: question.userName}}" target="_blank">
                                        <img v-if="question.avatarName != null" :src="question.avatarPath+'100x100/'+question.avatarName" class="img">
                                        <img v-if="question.avatarName == null" :src="question.avatar" width="60" height="60" class="img"/>
                                        
                                    </router-link>
                                    <a class="avatarLink" v-if="question.userName == null || question.userName == ''">
                                        <img :src="question.avatar" width="60" height="60" class="img"/>
                                        
                                    </a>
                                </div>
                                
                                <div class="content clearfix">
                                    <ul class="info">
                                        <li>
                                            <router-link tag="a" class="userName" :to="{path:'/user/control/home',query: {userName: question.userName}}" target="_blank">
                                                {{question.nickname != null && question.nickname != '' ?question.nickname : question.account}}
                                            </router-link>
                                            <!-- 已注销 -->
                                            <span v-if="question.account == null || question.account == ''" class='cancelNickname'>{{t('askList.80')}}</span>   
                                            <span class="userRoleName" v-for="roleName in question.userRoleNameList">{{roleName}}</span>
                                            <!-- 官方人员 -->
                                            <span class="staff" v-if="question.isStaff">{{t('askList.90')}}</span>
                                            <!-- 提问时间 -->
                                            <span class="postTime">{{t('askList.100')}}：{{question.postTime}}</span>
                                            <!--
                                            <span class="lastAnswerTime" v-if="question.lastAnswerTime != null">最新回复：{{question.lastAnswerTime}}</span>
                                            -->
                                            <span class="reward" v-if="parseFloat(question.amount) > 0 || Long.fromString(question.point).gt(0)">
                                                <span class="gradientMask"></span>
                                                <span class="rewardInfo" >
                                                    <!--
                                                    悬赏<template v-if="parseFloat(question.amount) >0">金额<span class="symbol">¥</span><span class="amount">{{question.amount}}</span>元 </template>
                                                    <span class="point" v-if="Long.fromString(question.point).gt(0)">{{question.point}}</span>积分-->

                                                    <!-- 仅含有金额 -->
                                                    <template v-if="parseFloat(question.amount) >0 && Long.fromString(question.point).lte(0)">
                                                        <i18n-t keypath="askList.110" scope="global">
                                                            <template #p1>
                                                                <span class="symbol">¥</span><span class="amount">{{question.amount}}</span>
                                                            </template>
                                                        </i18n-t>
                                                    </template>
                                                    <!-- 仅含有积分 -->
                                                    <template v-if="parseFloat(question.amount) <=0 && Long.fromString(question.point).gt(0)">
                                                        <i18n-t keypath="askList.120" scope="global">
                                                            <template #p1>
                                                                <span class="point">{{question.point}}</span>
                                                            </template>
                                                        </i18n-t>
                                                    </template>

                                                    <!-- 含有金额和积分 -->
                                                    <template v-if="parseFloat(question.amount) >0 && Long.fromString(question.point).gt(0)">
                                                        <i18n-t keypath="askList.130" scope="global">
                                                            <template #p1>
                                                                <span class="symbol">¥</span><span class="amount">{{question.amount}}</span>
                                                            </template>
                                                            <template #p2>
                                                                <span class="point">{{question.point}}</span>
                                                            </template>
                                                        </i18n-t>
                                                    </template>
                                                </span>
                                                
                                            </span>
                                            
                                        </li>
                                    </ul>
                                    <h2 class="title clearfix">
                                         <!-- 此用户账号已注销 -->
                                        <span class="cancelAccount" v-if="question.account == null || question.account == ''">{{t('askList.150')}}</span>
                                        <router-link tag="a" :to="{path:'/question',query: {questionId: question.id}}" target="_blank">
                                            {{question.title}}
                                        </router-link>
                                        <span class="questionTag" v-for="questionTag in question.questionTagAssociationList">{{questionTag.questionTagName}}</span>	
                                         <!-- 置顶 -->
                                        <span class="topTag" v-if="question.sort > 0">{{t('askList.200')}}</span>	
                                        <!--alt="投票" title="投票"-->
                                        <span class="vote" v-if="question.voteThemeId != null && question.voteThemeId != ''" :alt="t('askList.210')" :title="t('askList.210')" >
                                            <Icon name="vote" size="24px"/>
                                        </span>
                                    </h2>
                                    <div class="clearfix"></div>
                                    <h2 class="summary">
                                        {{question.summary}}
                                    </h2>
                                </div>
                                
                                <div class="rank clearfix">
                                    <div :class="Long.fromString(question.adoptionAnswerId).gt(0) ? 'answers solve' : 'answers active'">
                                        <template v-if="Long.fromString(question.answerTotal).gte(1000000)">999K+</template> <!--超过1000000显示999k+  -->
                                        <template v-else-if="Long.fromString(question.answerTotal).gte(1000)">{{Math.floor(parseFloat(question.answerTotal)/1000)}}k</template> <!--向下取整 -->
                                        <template v-else>{{question.answerTotal}}</template>
                                        <!-- 解决 -->
                                        <small v-if="Long.fromString(question.adoptionAnswerId).gt(0)">{{t('askList.160')}}</small>
                                        <!-- 回答 -->
                                        <small v-else>{{t('askList.170')}}</small>
                                    </div>
                                    <div class="views">
                                        <template v-if="Long.fromString(question.viewTotal).gte(1000000)">999K+</template>  <!--超过1000000显示999k+  -->
                                        <template v-else-if="Long.fromString(question.viewTotal).gte(1000)">{{Math.floor(parseFloat(question.viewTotal)/1000)}}k</template> <!--向下取整  -->
                                        <template v-else>{{question.viewTotal}}</template>
                                        <!-- 浏览 -->
                                        <small>{{t('askList.180')}}</small>
                                    </div>
                                </div>
                            </div>
                            <el-skeleton :loading="state.loading" style="padding-top: 25px;"></el-skeleton>
                            <div class="page" v-if="state.isShowPage">
                                <el-pagination background @current-change="handlePage" :current-page="state.currentpage"  :page-size="state.maxresult" :total="state.totalrecord" layout="total, prev, pager, next,jumper" />
                            </div>
                        </div>
                    </div>

                </div>
                <!--
                <div class="right-container">


                </div>-->
            </div>
        </div>
    </div>



    <!-- 回到顶部 -->
    <el-backtop :bottom="100" :visibility-height="100">
        <div>
            <Icon name="back-to-top" size="16px" />
        </div>
    </el-backtop>

    <!-- 页脚 -->
    <Footer/>
</template>

<script lang="ts" setup>
    import { onMounted, ref ,nextTick, getCurrentInstance, ComponentInternalInstance, reactive, computed, watchEffect, } from 'vue'
    import { appStore } from "@/store";
    import { useMeta} from 'vue-meta'
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import { PageView,Question,QuestionTag,} from "@/types/index";
    import { AxiosResponse } from 'axios';
    import { letterAvatar } from '@/utils/letterAvatar';
    import Long from "long";
    import * as extension from "@/utils/extension";
    import { isEllipsis } from '@/utils/tool';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();

    const extensionFunction = extension;

    //页头组件
    const headerComponent = ref();
    //标签导航
    const headerNavigation = ref();

    //标签提示是否禁用
    const tagTooltipDisabled = ref(true)
    //标签滚动条
    const tagScrollbar = ref()


   
    const state = reactive({
        showTagArrow: true,//显示标签箭头
        defaultExpandTag: true,//默认展开标签
        isExpandTagMap : new Map<string,boolean>(),//是否展开标签 key:标签Id value: 是否展开
        childTagAutoHeightMap : new Map<string,number>(),//子标签高度 key:标签Id value: 高度
        tagList:[] as Array<QuestionTag>,//标签 
        pageView: {} as PageView<Question>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数  
        questionTagId :'',//标签Id
		questionTagName :'',//标签名称
		filterCondition:'' as string,//过滤条件
        loading:true,//是否显示骨架屏
        isShowPage:false,//是否显示分页

        tagScrollbarMaxHeight:"calc(100vh - 186px)",

        head_title:'' as string,
        head_keywords:'' as string,
        head_description:'' as string,
    });




    //接收子组件消息
    const receive_floatWindow = (floatWindow:boolean) => {
        if(floatWindow){//窗口浮动
            headerNavigation.value.setAttribute('style', '');
        //    headerNavigation.value.querySelector('.el-scrollbar__wrap').setAttribute('style', 'transition: max-height 0.3s ease 0s;');
            state.tagScrollbarMaxHeight = "calc(100vh - 186px)";
            tagScrollbar.value.update();
        }else{
          //  headerNavigation.value.setAttribute('style', 'top: 10px;max-height: calc(100% - 110px);');
            headerNavigation.value.setAttribute('style', 'top: 10px');
            state.tagScrollbarMaxHeight = "calc(100vh - 126px)";
         //   headerNavigation.value.querySelector('.el-scrollbar__wrap').setAttribute('style', 'transition: max-height 0.3s ease 0s;');

            tagScrollbar.value.update();
        }
    }
   
    //鼠标经过显示标签提示
    const tagTooltip = (event: MouseEvent,tagName:string) => {

        let flag = isEllipsis(event);
        if(flag){
            tagTooltipDisabled.value = false;
        }else{
            tagTooltipDisabled.value = true;
        }
        
    }


    
    //展开收缩标签
    const onToggleTag = (tagId:string) => {
        
        let isExpand = state.isExpandTagMap.get(tagId);
        if(isExpand){
            state.isExpandTagMap.set(tagId,false);
        }else{
            state.isExpandTagMap.set(tagId,true);
        }
    }

    //滚动到选中标签位置
    const scrollToSelectedTag = () => {
        if(state.questionTagId != ''){
            //滚动条高度
            let offsetHeight = tagScrollbar.value.$el.querySelector(".el-scrollbar__view").offsetHeight;
            //可视高度
            let clientHeight = tagScrollbar.value.$el.clientHeight;
            //标签距顶部高度
            let offsetTop = 0;


           
            A:for(let i:number=0; i<state.tagList.length; i++){
                let tag = state.tagList[i];

                if(tag.id == state.questionTagId){//选择的标签为一级标签
                    let offsetTopRefValue =  (proxy?.$refs['tag_'+state.questionTagId] as any);
                    
                    if(offsetTopRefValue != undefined && offsetTopRefValue[0]){
                        offsetTop =offsetTopRefValue[0].offsetTop;
                    }
                    break A;
                }
                for(let j:number=0; j<tag.childTag.length; j++){//选择的标签为二级标签
                    let childTag = tag.childTag[j];
                    if(childTag.id == state.questionTagId){
                        let offsetTopRefValue =  (proxy?.$refs['tag_'+tag.id] as any);
                    
                        if(offsetTopRefValue != undefined && offsetTopRefValue[0]){
                            offsetTop =offsetTopRefValue[0].offsetTop;//一级标签距顶部高度
                        }

                        let childTagRefValue =  (proxy?.$refs['childTag_'+childTag.id] as any);
                        if(childTagRefValue != undefined && childTagRefValue[0]){
                            offsetTop += childTagRefValue[0].offsetTop;//二级标签距顶部高度
                        }


                        break A;
                    }
                }
            }

            if(offsetTop > clientHeight){
                //tagScrollbar.value.setScrollTop(offsetTop);
                tagScrollbar.value.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }


    //查询所有问题标签
    const queryTagList = () => {
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
           

            if (data != null && data.length > 0) {
                for (let i= 0; i < data.length; i++) {
                    let questionTag = data[i];
                    if(state.questionTagId == questionTag.id){
                        state.questionTagName = questionTag.name;
                        break;
                    }
                    if (questionTag.childTag != null && questionTag.childTag.length > 0) {
                        for (let j = 0; j < questionTag.childTag.length; j++) {
                            let childQuestionTag = questionTag.childTag[j];
                            if(state.questionTagId == childQuestionTag.id){
                                state.questionTagName = childQuestionTag.name;
                                break;
                            }
                        }
                        
                    }
                }
            }

            state.tagList = data;


            let flag = false;//是否选中一级标签
            if(data != null && data.length >0){
                for(let i:number=0; i<data.length; i++){
                    let tag = data[i];
                    
                    //先展开计算好高度，再按实际设置是否需要收缩
                    state.isExpandTagMap.set(tag.id,true);
                    

                    nextTick(()=>{
                        state.isExpandTagMap.set(tag.id,state.defaultExpandTag);
                        let childTagRefValue =  (proxy?.$refs['tag_'+tag.id] as any);
                        if(childTagRefValue != undefined && childTagRefValue[0]){
                            state.childTagAutoHeightMap.set(tag.id,childTagRefValue[0].scrollHeight);
                        }
                    })

                    if(state.questionTagId != '' && tag.id == state.questionTagId){
                         flag = true;
                    }
                }

                //如果选中的是子标签
                if(!flag){
                    A:for(let i:number=0; i<data.length; i++){
                        let tag = data[i];
                        for(let j:number=0; j<tag.childTag.length; j++){
                            let childTag = tag.childTag[j];
                            if(childTag.id == state.questionTagId){
                                nextTick(()=>{
                                    state.isExpandTagMap.set(tag.id,true);//展开标签
                                })
                                break A;
                            }
                        }
                    }
                }

                //滚动到选中标签位置
                nextTick(()=>{
                    setTimeout(function(){
                        scrollToSelectedTag();
                    }, 400);
                })

                
                
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //查询问题列表
    const queryQuestionList = (questionTagId:string,filterCondition:string,page: number) => {
        let param = {} as any
        if(questionTagId){
			param.questionTagId = questionTagId
		}
        if(filterCondition){
			param.filterCondition = filterCondition
		}
        if(page){
            param.page = page
        }
        
        proxy?.$axios({
            url: '/queryQuestionPage',
            method: 'get',
            params:  param,
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            return response?.data
        })
        .then((data: PageView<Question>) => {

            state.loading = false;//关闭骨架屏
            if(data.records != null && data.records.length >0){
                for(let i:number=0; i<data.records.length; i++){
                    let question = data.records[i];
                    if(question.nickname != null && question.nickname !=''){
                        question.avatar = letterAvatar(question.nickname, 60);
                    }else{
                        question.avatar = letterAvatar(question.account, 60);
                    }
                }
            }


            state.pageView = data;
            state.totalrecord = parseInt(state.pageView.totalrecord);//服务器返回的long类型已转为String类型
            state.currentpage = state.pageView.currentpage;
            state.totalpage = parseInt(state.pageView.totalpage);//服务器返回的long类型已转为String类型
            state.maxresult = state.pageView.maxresult;


            state.isShowPage = true;//显示分页栏
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //分页
    const handlePage = (page: number) => {
        let questionTagId:string = router.currentRoute.value.query.questionTagId != undefined ?router.currentRoute.value.query.questionTagId as string :'';
        let filterCondition:string | number = router.currentRoute.value.query.filterCondition != undefined ?router.currentRoute.value.query.filterCondition as string :'';
        let param = {} as any
        if(questionTagId){
			param.questionTagId = questionTagId
		}
        if(filterCondition){
			param.filterCondition = filterCondition
		}
        if(page){
            param.page = page
        }

		router.push({
            path: '/askList', 
            query:param
		});

        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
            if(headerComponent.value){
                headerComponent.value.forceAffix()//强制显示顶部Affix(固钉)内的栏目
            }
        });
	}


     //导航守卫
     onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'askList'){
            let page:number = 1;
            let questionTagId:string = '';
            let filterCondition:string = '';
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            if(to.query.questionTagId != undefined){
                questionTagId = to.query.questionTagId as string
            }
            if(to.query.filterCondition != undefined){
                filterCondition = to.query.filterCondition as string
            }
            state.filterCondition = filterCondition;
            //queryTagList();
            router.afterEach(() => {
                window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
                if(headerComponent.value){
                    headerComponent.value.forceAffix()//强制显示顶部Affix(固钉)内的栏目
                }
            });
            queryQuestionList(questionTagId,filterCondition,page)
        }
        
        next();
    });


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title: state.head_title,
            meta: [
                {
                    name: 'keywords',
                    content: state.head_keywords
                },{
                    name: "description",
                    content: state.head_description
                }
            ]
        })
    ))


    //html页元信息
    watchEffect(() => {
        let tagId = router.currentRoute.value.query.questionTagId;
        let tagList = state.tagList;
        let titleValue = store.state.title//监听网站标题
        
        if(tagId == undefined || tagId == ''){
            state.head_title = t('askList.190')+' - '+titleValue;//问答
            state.head_keywords = t('askList.190')+' - '+store.state.keywords//问答
            state.head_description = t('askList.190')+' - '+store.state.description//问答
        }else{
            if(tagList != null && tagList.length >0){
                for (let i= 0; i < tagList.length; i++) {
                    let questionTag = tagList[i];
                    if(tagId == questionTag.id){
                        state.head_title = questionTag.name;
                        state.head_keywords = questionTag.name;
                        state.head_description = questionTag.name;
                        break;
                    }
                    if (questionTag.childTag != null && questionTag.childTag.length > 0) {
                        for (let j = 0; j < questionTag.childTag.length; j++) {
                            let childQuestionTag = questionTag.childTag[j];
                            if(tagId == childQuestionTag.id){
                                state.head_title = childQuestionTag.name;
                                state.head_keywords = childQuestionTag.name;
                                state.head_description = childQuestionTag.name;
                                break;
                            }
                        }
                        
                    }
                }
            }
        }
    }, {
        flush: 'post'//在组件更新后触发，第一次运行需要组件渲染完成才执行
    })

    onMounted(() => {
        
        let page:number = (router.currentRoute.value.query.page != undefined && router.currentRoute.value.query.page != '') ? parseInt(router.currentRoute.value.query.page as string) :1;

        let questionTagId:string = router.currentRoute.value.query.questionTagId != undefined ?router.currentRoute.value.query.questionTagId as string :'';
        state.questionTagId = questionTagId;
        let filterCondition:string = router.currentRoute.value.query.filterCondition != undefined ?router.currentRoute.value.query.filterCondition as string :'';
        state.filterCondition = filterCondition;
        queryTagList();
        queryQuestionList(questionTagId,filterCondition,page)
    }) 
</script>

<style scoped lang="scss">


.askListModule{
    display: flex;
    .left-container{
        width: 180px;
        margin-right: 10px;
        .left-navigation{
            width: 180px;
            background: #fff;
         //   padding: 8px;
            padding: 8px 0px 8px 0px;
            box-sizing: border-box;
         //   max-height: calc(100vh - 200px);
            box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
            border-radius: 8px;
           // overflow: auto;
            position: fixed;
            top:70px;
            transition: top 0.3s ease 0s;

           // scrollbar-gutter: stable;
           /**
            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                background: transparent;
                //display: none;
            }

            &::-webkit-scrollbar-thumb {
                background: transparent;
                border-radius: 4px
            }

            &:hover::-webkit-scrollbar-thumb {
                background: hsla(0,0%,60%,.3)
            } */

            
            .item{
                display: block;
                margin-bottom: 2px;
                padding: 0px 8px 0px 8px;
                position: relative;
                .title{
                    padding: 0 12px;
                    color: $color-black-80;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    height: 44px;
                    
                    font-size: 16px;
                    transition: color .3s;
                    .text{
                        overflow:hidden;
                        text-overflow:ellipsis; 
                        white-space:nowrap;
                    }
                    
                    .svg-container{
                        position: relative;
                        top: 3px;
                        svg {
                            fill: $color-black-80;
                            margin-right: 10px;
                            transition: fill .3s;
                            width: 18px;
                            height: 18px;
                        }
                    }
                    .image-container{
                        position: relative;
                        top: 2px;
                        .el-image{
                            margin-right: 10px;
                        }
                    }
                    &:hover {
                        color: #409eff;
                        background: #e8f3ff;
                    }

                    &:hover svg {
                        fill: #409eff;
                    }
                }
                .mouse{
                    cursor:default;
                    &:hover {
                        color: $color-black-80;
                        background: #fff;
                    }

                    &:hover svg {
                        fill: $color-black-80;
                    }
                }
                .title.active{
                    color: #409eff;
                    background: #e8f3ff !important;
                    svg{
                        fill: #409eff;
                    }
                }
                .showTagArrow{
                    padding-right: 22px;
                }
                .arrow{
                    position: absolute;
                    right: 10px;
                    top: 14px;
                    width: 16px;
                    height: 16px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor:pointer;
                    transform: none;
                    transition: transform 0.3s;
                    border-radius: 4px;
                    color: $color-black-60;
                    &:hover {
                        background: $color-black-30;
                    }
                }
                
                .arrow.expand{
                    transition: transform 0.3s;
                    transform: rotateZ(180deg);
                }

            }
            .childTag{
                overflow:hidden;
                transition: max-height 0.3s ease-out;
                .childItem {
                    display: block;
                    cursor: pointer;
                    font-size: 15px;
                    line-height: 44px;
                    color: $color-black-70;
                    padding-left: 38px;
                    transition: color .3s;
                    border-radius: 4px;
                    margin-bottom: 2px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                   // word-break: break-all;
                    &:hover {
                        color: #409eff;
                        background: #e8f3ff;
                    }
                }
                .childItem.active {
                    color: #409eff !important;
                    background: #e8f3ff !important
                }
            }
            .childTag.expand{
                transition: max-height 0.3s ease-in;
            }
        }
    }
    .middle-container{
        flex: 1;
     //  flex-shrink: 0;

        .nav {
            margin-bottom: 0;
            padding-left: 0;
            list-style: none;
            >li {
                position: relative;
                display: block;
                float: left;
                margin-bottom: -1px;
                >a {
                    position: relative;
                    display: block;
                    padding: 10px 15px;
                    margin-right: 2px;
                    line-height: 1.42857143;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    font-size: 15px;
                    color: $color-black-60;
                    margin-bottom: 1px;
                    &:hover {
                        border-color: #EDEEF1 #EDEEF1 transparent;
                        color: #1890ff;
                    }
                    &:focus,&:hover {
                        text-decoration: none;
                        background-color: #EDEEF1;
                    }
                    >img {
                        max-width: none
                    }
                }
            }
            .active{
                a,a:focus,a:hover {
                    color: $color-black-80;
                    background-color: #fff;
                    border: 1px solid #EDEEF1;
                    border-bottom-color: transparent;
                    cursor: default;
                    border-color: #fff;
                    cursor: default; 
                    box-shadow: 4px 0 3px -4px rgba(0,0,0,.06) , /*左边阴影*/
                                /*0 4px 3px -4px #fff, 顶部阴影*/
                                0 -4px 3px -4px rgba(0,0,0,.06) , /*底部阴影*/
                                -4px 0 3px -4px rgba(0,0,0,.06); /*右边阴影*/
                }
            }
            .postQuestionButton{
                float: right;
                .icon{
                    position: relative;
                    top: 0px;
                    right: 5px;
                    margin-left: 5px;
                    font-size: 16px;
                }
            }
        }
        .question-box{
            background:#fff;
            padding:0px 15px 15px 15px;
            box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
            border-radius: 0px 8px 8px;
            &.full-radius {
                border-radius: 8px;
            }
            .questionList {
                .questionItem {
                    margin: 0;
                    border-bottom: 1px solid $color-black-20;
                    padding: 10px 0 11px 0;
                    position: relative;
                    min-height: 90px;
                    .avatarBox {
                        position: relative;
                        margin-left: 0;
                        margin-right:10px;
                        margin-top: 4px;
                        padding: 0;
                        float: left;
                        .avatarLink {
                            display: block;
                            position: relative;
                            float: left;
                            padding-left: 6px;
                            img {
                                float: none;
                                display: block;
                                width: 60px;
                                height: 60px;
                                float: left;
                                margin-right: 10px;
                                border-radius:60px;
                                position:relative;
                            }
                        }
                    }
                    .content {
                        /**
                        overflow: auto;
                        overflow-x: hidden;**/
                        margin-left:90px;
                        margin-right:160px;
                        .info {
                            margin-bottom: 8px;
                            color: $color-black-40;
                            padding-left: 0;
                            list-style: none;
                            min-height: 32px;
                            //background: #cafcc7;
                            display:flex;
                            align-items:center;
                            //margin-left: -5px;
                            font-size:0;/*父级元素设置font-size:0; 解决 display：inline-block两个元素之间的默认空格 */
                            >li{
                                //display: inline-block;
                                //padding-left: 5px;
                                padding-right: 5px
                            }
                            .userName{
                                color: $color-black-60;
                                font-size: 14px;
                                //display: inline-block;
                                margin-right: 4px;
                                line-height: 28px;
                            }
                            .cancelNickname{
                                font-weight:normal;
                                margin-right: 3px;
                                color: transparent;
                                text-shadow: 0 0 5px rgba(0,0,0,0.4);
                                font-size: 14px;
                                zoom: 1;
                                user-select:none;
                            }
                            .userRoleName{
                                display: inline-block;
                                white-space:nowrap;
                                vertical-align: middle;
                                padding: 2px 4px;
                                margin-left:5px;
                                font-size: 12px;
                                line-height: 14px;
                                -webkit-border-radius: 2px;
                                -moz-border-radius: 2px;
                                border-radius: 2px;
                                color:#e2b46e;
                                background-color:#f8e7c4;
                                position: relative;
                                top: -5px;
                            }
                            .staff{
                                display: inline-block;
                                white-space:nowrap;
                                vertical-align: middle;
                                padding: 2px 4px;
                                margin-left:5px;
                                font-size: 12px;
                                line-height: 14px;
                                -webkit-border-radius: 2px;
                                -moz-border-radius: 2px;
                                border-radius: 2px;
                                color:#4CD263;
                                background-color:#cafcc7;
                                position: relative;
                                top: -4px;
                            }
                            .postTime{
                                margin-left: 10px;
                                font-size: 14px;
                                margin-right: 6px;
                            }
                            .lastAnswerTime{
                                margin-left: 10px;
                                font-size: 14px;
                            }
                            .reward{
                                display: inline-block;
                                //vertical-align: middle;
                                background: #fcf3e6;
                                border-radius:2px;
                                padding: 5px 8px;
                                //margin-left: 6px;
                                margin-top: 5px;
                                position: relative;
                                //top: -5px;

                                @keyframes maskBackground {
                                    0% {
                                        background-position: 0px 0;
                                    }
                                    100% {
                                        background-position: 100em 0;
                                    }
                                }
                                .gradientMask{
                                    animation-duration: 15s;
                                    animation-fill-mode: forwards;
                                    animation-iteration-count: infinite;
                                    animation-name: maskBackground;
                                    animation-timing-function: linear;
                                    background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 80%,rgba(255,255,255,0.3) 100%);
                                    transform: skewX(-30deg);
                                    font-size: 14px;
                                    position: absolute;
                                    left:0;
                                    right:0;
                                    top:0;
                                    bottom:0;
                                }
                                .rewardInfo{
                                    color: #e2b46d;font-size: 14px;line-height: 14px;
                                    .symbol{
                                        font-family:Arial;font-weight:normal; margin-left: 5px;color: #cca558;
                                    }
                                    .amount{
                                        margin-left: 1px;color: #cca558; margin-right: 5px;
                                    }
                                    .point{
                                        color: #cca558; margin-right: 5px;
                                    }
                                }
                            }
                        }
                        .title {
                            font-weight:600;
                            margin: 2px 5px 0 0;
                            font-size: 18px;
                            line-height: 28px;
                            font-weight: normal;
                            word-wrap : break-word;word-break : break-all;
                            .cancelAccount{
                                display: inline-block;
                                vertical-align: middle;
                                padding: 4px 6px 4px 6px;
                                font-size: 14px;
                                line-height: 20px;
                                -webkit-border-radius: 2px;
                                -moz-border-radius: 2px;
                                border-radius: 2px;
                                color: $color-black-50;
                                background-color: $color-black-10;
                                position:relative;/** 这两行让标签上移 **/
                                top:-1px;
                            }
                            a{
                                color: $color-black-90;
                                margin-right: 5px;
                                &:hover {
                                    text-decoration: none;
                                    color: #1890ff;
                                }
                            }
                            .questionTag{
                                display: inline-block;
                                font-size: 14px;
                                line-height: 18px;
                                padding: 3px 6px 3px 6px;
                                margin-right: 5px;
                                border-radius: 3px;
                                color: #409eff;
                                background-color: #E8F3FF;
                                position:relative;
                                position:relative;/** 这两行让标签上移 **/
                                top:-1px;
                                &:hover {
                                    background-color: #d8edff;
                                    color: #1890ff;
                                    text-decoration: none;
                                }
                            }
                            .topTag{
                                display: inline-block;
                                font-size: 14px;
                                line-height: 18px;
                                padding: 3px 6px 3px 6px;
                                margin-right: 5px;
                                border-radius: 3px;
                                color: #fff;
                                background-color: #5aa4ff;
                                position:relative;
                                position:relative;/** 这两行让标签上移 **/
                                top:-1px;
                            }
                            .vote{
                                font-size: 24px;
                                position:relative;
                                top:6px;
                                color: #52c41a;
                                margin-left: 3px;
                            }
                        }
                        .summary{
                            margin: 3px 5px 0 0;
                            font-size: 15px;
                            line-height: 28px;
                            font-weight:normal;
                            text-decoration:none;
                            color: $color-black-60;
                            word-wrap : break-word;word-break : break-all;
                        }
                    }
                    .rank {
                        position:absolute;
                        top:30px;
                        right:0px;
                        font-size: 16px;
                        text-align: center;
                        line-height: 16px;
                        small {
                            display: block;
                            font-size: 12px;
                            margin-top: 1px;
                            font-weight: normal;
                        }
                        .answers,.views{
                            display: inline-block;
                            padding-top: 12px;
                            margin-left:12px;
                            width: 60px;
                            height: 42px;
                            -moz-border-radius: 1px;
                            -webkit-border-radius: 1px;
                            border-radius: 3px;
                        }
                        .answers {
                            color: #409eff;
                            background: #E8F3FF;
                            border: none
                        }
                        .views {
                            background-color: $color-black-20;
                            border-color: $color-black-20;
                            color: $color-black-60;
                        }
                        .solve {
                            background: #409eff;
                            border: none;
                            color: #fff;
                        }
                    }

                }
            }
        }
        .page{
            padding-top: 50px;
            margin-bottom: 30px;
            display: flex;
            justify-content: flex-end;
            background: #fff;
        }

    }
    .right-container{
        width: 260px;
        background: #e2b46d
    }
}
</style>