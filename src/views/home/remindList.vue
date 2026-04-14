<!-- 提醒列表 -->
<template>
    <!-- 页头 -->
    <Header ref="headerComponent"/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            

            <div class="remindListModule" >
                <div class="remindTitle">
                    <!-- 全部提醒 -->
                    <h2>{{t('remindList.10')}}</h2>
                    <div class="markAsReadButton">
                        <!-- 全部标记已读 -->
                        <el-button type="primary" @click="markAllRemindersAsRead()" plain >{{t('remindList.20')}}</el-button>
                    </div>
                </div>
                
		
                <div class="remindInfo" v-if="state.pageView.records != null && state.pageView.records.length >0">
                    <ol class="remindList">
                        <div class="remind" v-for="remind in state.pageView.records">
                            
                            <div class="author">
                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                    <img v-if="remind.senderAvatarName != null" :src="remind.senderAvatarPath+'100x100/'+remind.senderAvatarName" width="64" height="64" class="img">
                                        
                                    <img v-if="remind.senderAvatarName == null" :src="remind.senderAvatar" width="64" height="64" class="img"/>
                                </router-link>


                                <div class="tipBottom">
                                    <span class="a-toolbar">
                                        <!-- 未读 -->
                                        <span v-if="remind.status == 10" class="status">{{t('remindList.30')}}</span>
                                        <!-- 已读 -->
                                        <span v-if="remind.status == 20" class="status alreadyRead">{{t('remindList.40')}}</span>
                                        <!-- 删除 -->
                                        <a @click="deleteRemind(remind.id)"><Icon name="trash" size="16px" class="icon"/>{{t('remindList.50')}}</a>
                                    </span>
                                </div>
                            </div>
                            
                            <div class="time">{{remind.sendTime}}</div>
                            <div class="content">
                                <!--reportModule为前端借用‘举报’功能标记模块提示项的参数   10:话题  20:评论  30:评论回复  40:问题  50:答案   60:答案回复-->
                                <div v-if="remind.typeCode == 10">
                                    <!--<cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    评论了我的话题-->
                                    <i18n-t keypath="remindList.70" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 20">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我的话题 -->
                                    <i18n-t keypath="remindList.80" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 30">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    引用了我的评论 -->
                                    <i18n-t keypath="remindList.90" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 40">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.topicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我的评论 -->
                                    <i18n-t keypath="remindList.100" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.topicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 50">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我回复过的评论 -->
                                    <i18n-t keypath="remindList.110" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 55">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我的评论回复 -->
                                    <i18n-t keypath="remindList.120" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 60">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    解锁了我的话题 -->
                                    <i18n-t keypath="remindList.130" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 70">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    赞了我的话题 -->
                                    <i18n-t keypath="remindList.140" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 80">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    关注了我 -->
                                    <i18n-t keypath="remindList.145" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                </div>
                                <div v-if="remind.typeCode == 90">
                                    <!-- 我关注的
                                    <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    发表了话题
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> -->

                                    <i18n-t keypath="remindList.150" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 100">
                                    <!-- 我关注的
                                    <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    发表了评论 -->
                                    <i18n-t keypath="remindList.160" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 110">
                                    <!-- 我关注的
                                    <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    发表了评论回复 -->
                                    <i18n-t keypath="remindList.170" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 120">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,reportModule:50}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    回答了我的问题 -->
                                    <i18n-t keypath="remindList.180" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,reportModule:50}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 130">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我的问题 -->

                                    <i18n-t keypath="remindList.190" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 140">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.questionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我的答案 -->
                                    <i18n-t keypath="remindList.200" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.questionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 150">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我回复过的答案 -->
                                    <i18n-t keypath="remindList.210" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 160">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    回复了我的答案回复 -->
                                    <i18n-t keypath="remindList.220" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 170">
                                    <!-- 我关注的
                                    <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    提了问题
                                    <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> -->
                                    <i18n-t keypath="remindList.230" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 180">
                                    <!-- 我关注的
                                    <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,reportModule:50}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    回答了问题 -->
                                    <i18n-t keypath="remindList.240" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,reportModule:50}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 190">
                                    <!-- 我关注的
                                    <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    发表了答案回复 -->
                                    <i18n-t keypath="remindList.250" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 200">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在话题
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    提到我 -->
                                    <i18n-t keypath="remindList.260" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 210">
                                    <!--<cite>
                                         此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在评论
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    提到我 -->
                                    <i18n-t keypath="remindList.270" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,reportModule:20}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 220">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在评论回复
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    提到我 -->
                                    <i18n-t keypath="remindList.280" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.friendTopicCommentId,replyId:remind.friendTopicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 230">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在问题
                                    <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite>
                                    提到我 -->
                                    <i18n-t keypath="remindList.290" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 240">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在答案
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,reportModule:50}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    提到我 -->
                                    <i18n-t keypath="remindList.300" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,reportModule:50}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 250">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在答案回复
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    提到我 -->
                                    <i18n-t keypath="remindList.310" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.friendQuestionAnswerId,replyId:remind.friendQuestionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 260">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.topicCommentId,reportModule:20}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    赞了我的评论 -->
                                    <i18n-t keypath="remindList.320" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.topicCommentId,reportModule:20}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 270">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.topicCommentId,replyId:remind.topicReplyId,reportModule:30}}">
                                            {{remind.topicTitle}}
                                        </router-link>
                                    </cite> 
                                    赞了我的评论回复 -->
                                    <i18n-t keypath="remindList.330" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/thread',query:{topicId:remind.topicId,commentId:remind.topicCommentId,replyId:remind.topicReplyId,reportModule:30}}">
                                                    {{remind.topicTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 280">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    赞了我的问题 -->
                                    <i18n-t keypath="remindList.340" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 290">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                     <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.questionAnswerId,reportModule:50}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    赞了我的答案 -->
                                    <i18n-t keypath="remindList.350" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.questionAnswerId,reportModule:50}}">
                                                {{remind.questionTitle}}
                                            </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                                <div v-if="remind.typeCode == 300">
                                    <!-- <cite>
                                        此用户账号已注销
                                        <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                        <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                            {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                        </router-link>
                                    </cite> 
                                    在
                                    <cite>
                                        <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.questionAnswerId,replyId:remind.questionReplyId,reportModule:60}}">
                                            {{remind.questionTitle}}
                                        </router-link>
                                    </cite> 
                                    赞了我的答案回复 -->
                                    <i18n-t keypath="remindList.360" scope="global">
                                        <template #p1>
                                            <cite>
                                                <!-- 此用户账号已注销 -->
                                                <span class="cancelAccount" v-if="remind.senderAccount == null || remind.senderAccount == ''">{{t('remindList.60')}}</span>
                                                <router-link tag="a" :to="{path:'/user/control/home',query:{userName:remind.senderUserName}}">
                                                    {{remind.senderNickname != null && remind.senderNickname != '' ? remind.senderNickname : remind.senderAccount}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                        <template #p2>
                                            <cite>
                                                <router-link tag="a" :to="{path:'/question',query:{questionId:remind.questionId,answerId:remind.questionAnswerId,replyId:remind.questionReplyId,reportModule:60}}">
                                                    {{remind.questionTitle}}
                                                </router-link>
                                            </cite> 
                                        </template>
                                    </i18n-t>
                                    <div class="summary">
                                        {{remind.summary}}
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </ol>
                </div>


                <el-skeleton :loading="state.loading"></el-skeleton>
                <div class="page" v-if="state.isShowPage">
					<el-pagination background @current-change="handlePage" :current-page="state.currentpage"  :page-size="state.maxresult" :total="state.totalrecord" layout="total, prev, pager, next,jumper" />
				</div>
                
            </div>
        </div>
    </div>
    <!-- 页脚 -->
    <Footer/>
</template>


<script lang="ts" setup>
    import { getCurrentInstance, ComponentInternalInstance, reactive, onMounted, computed, ref} from 'vue'
    import { useMeta} from 'vue-meta'
    import { appStore } from "@/store";
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import Header from '@/components/Header.vue'
    import { AxiosResponse } from 'axios'
    import { PageView,Remind} from "@/types/index";
    import { letterAvatar } from '@/utils/letterAvatar';
    import { ElMessage } from 'element-plus';
    import { processErrorInfo } from '@/utils/tool';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();

    //页头组件
    const headerComponent = ref();

    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('remindList.370')+' - ' + store.state.title,//提醒列表
            meta: [
                {
                    name: 'keywords',
                    content: t('remindList.370')+' - ' + store.state.title//提醒列表
                },{
                    name: "description",
                    content: t('remindList.370')+' - ' + store.state.title//提醒列表
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Remind>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //错误
    const error = reactive({})


    //查询提醒列表
    const queryRemindList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/remindList',
            method: 'get',
            params:  { 
                page: page
            },
            //showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            return response?.data
        })
        .then((data: PageView<Remind>) => {
            state.loading = false;//关闭骨架屏


            if(data.records != null && data.records.length >0){
                for(let i:number=0; i<data.records.length; i++){
                    let remind = data.records[i];
                    if(remind.senderNickname != null && remind.senderNickname !=''){
                        remind.senderAvatar = letterAvatar(remind.senderNickname, 64);
                    }else{
                        remind.senderAvatar = letterAvatar(remind.senderAccount, 64);
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
		router.push({
            path: '/user/control/remindList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}

    //全部提醒状态标记为已读
    const markAllRemindersAsRead = () => {
        proxy?.$axios({
            url: '/user/control/markAllRemindersAsRead',
            method: 'post',
            params:  { 
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                    
                if(result.success){//成功
                    ElMessage({
                        showClose: true,
                        message: t('remindList.380'),//标记全部提醒已读成功
                        type: 'success',
                    })
                    headerComponent.value.queryUnreadMessage()//刷新未读消息
                    init();

                }else{
                    //处理错误信息
                    processErrorInfo(result.error as Map<string,string> , error,()=>{});
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }


    //删除提醒
    const deleteRemind = (remindId: string) => {
        proxy?.$axios({
            url: '/user/control/deleteRemind',
            method: 'post',
            params:  { 
                remindId: remindId
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                    
                if(result.success){//成功
                    ElMessage({
                        showClose: true,
                        message: t('remindList.390'),//删除成功
                        type: 'success',
                    })

                    init();

                }else{
                    //处理错误信息
                    processErrorInfo(result.error as Map<string,string> , error,()=>{});
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'remindList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryRemindList(page);
        }
        
        next();
    });
    
    onMounted(() => {
        init();
    }) 

     //初始化
    const init = () => {
		let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryRemindList(page);
	}
    

</script>

<style scoped lang="scss">
.remindListModule{
    padding-right:8px;
    padding-left:8px;
    padding-top:8px;
    padding-bottom: 30px;
    .remindTitle{
        margin-left:2px;
	    margin-right:2px;
        padding-bottom: 4px;
        position: relative;
        border-bottom:1px dotted $color-black-30;
        h2{
            line-height:36px;
            font-size: 15px;
            font-weight: 700;
            margin-left: 10px;
            color: $color-black-70;
        }  
        .markAsReadButton{
            position: absolute;
            right: 0px;
            top: 1px;
        }
    }
    
    .remindInfo{
        padding: 0px 2px 10px 2px;
        position: relative;
        padding-bottom:80px;
        .remindList{
            list-style:none;
            .cancelAccount{
                display: inline-block;
                vertical-align: middle;
                padding: 8px 6px 6px 6px;
                font-size: 14px;
                line-height: 14px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                border-radius: 2px;
                color: $color-black-50;
                background-color: $color-black-10;
            }
            .remind{
                padding:10px 10px 14px 86px;
                border-bottom:1px solid $color-black-20;
                .content{
                    padding:0px;
                    word-wrap : break-word;word-break : break-all;
                    color:$color-black-70;
                    line-height: 24px;
                    font-size: 15px;
                    margin-right: 120px;
                    margin-top: 10px;
                    a{
                        color: $color-blue-60;
                        &:hover{
                            color: $color-blue-50;
                        }
                    }
                    .summary{
                        margin-top: 10px;
                        word-break: break-all;
                        color: $color-black-50;
                    }
                }
            }
            .author{
                position:relative;
                img{
                    position:absolute;
                    left:-76px;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    border-radius:50%;
                    display:block;
                }
            }
            cite{
                font-style:normal;
                font-size: 15px;
                a{
                    color:$color-black-60;
                }
            }
           .time{
                margin-bottom:5px;
                margin-top:6px; 
                color:$color-black-40;
                line-height: 20px;
            }
            .tipBottom {
                font-size: 14px;
                margin-top: 5px;
                float:right;
                .status{
                    margin-right: 14px;
                }
                .alreadyRead{
                    color: #009A29;
                }
                a{
                    margin-right: 10px;
                    :hover {
                        color: $color-blue-60
                    }
                }
                .a-toolbar {
                    display: block;
                    width: 100%;
                    .icon {
                        font-size: 15px;
                        margin-right: 2px;
                        position: relative;
                        top: 2px;
                    }
                }
            }
        }
   }
    .page{
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }
}

   
</style>