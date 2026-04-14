<!--话题内容-->
<template>
    <!-- 页头 -->
    <Header :shrink="shrinkRef" ref="headerComponent"/>

    <div class="main">
        
        <div class="main-container wrap backgroundModule main-fullScreen" v-if="$store.state.topicDetailPermission == false">
            <!-- description="您没有本话题的访问权限" -->
            <el-empty :description="t('thread.10')" class="topicDetailPermission"/>
        </div>

        <div class="main-container wrap" v-if="$store.state.topicDetailPermission == true">
            <!-- 左边浮动面板 -->
            <el-affix position="top" :offset="140">
                <div class="leftFloatPanel">
                    <el-badge :value="(Long.fromString(state.likeCount).gt(99999) ? '99999+' : state.likeCount)" :class="state.alreadyLiked == true ? 'active':''">
                        <!-- content="点赞" -->
                        <el-tooltip effect="tag-customized" :content="t('thread.840')" placement="right-end" transition=" " :hide-after="10">
                            <div class="circle" @click="()=>{state.alreadyLiked == true ? deleteLike(state.topic.id,10) : addLike(state.topic.id,10)}">
                                <Icon name="thumb-up-fill" size="26px" class="icon"/>
                            </div>
                        </el-tooltip>
                    </el-badge>

                    <el-badge :value="(Long.fromString(state.favoriteCount).gt(99999) ? '99999+' : state.favoriteCount)" :class="state.isFavorited == true ? 'active':''">
                        <!-- content="收藏" -->
                        <el-tooltip effect="tag-customized" :content="t('thread.110')" placement="right-end" transition=" " :hide-after="10">
                            <div class="circle" @click="()=>{state.isFavorited == true ? deleteFavorite(state.topic.id):addFavorite(state.topic.id)}">
                                <Icon name="star-fill" size="26px" class="icon"/>
                            </div>
                        </el-tooltip>
                    </el-badge>

                    <el-badge :value="state.totalrecord" :max="99999" class="item">
                        <!-- content="评论" -->
                        <el-tooltip effect="tag-customized" :content="t('thread.830')" placement="right-end" transition=" " :hide-after="10">
                            <div class="circle" @click="onScrollToCommentWindow">
                                <Icon name="message-3-fill" size="26px" class="icon"/>
                            </div>
                        </el-tooltip>
                    </el-badge>
                </div>
            </el-affix>

            <div class="topicContentModule">
                <div class="left" v-if="state.topic == undefined || state.topic == null  || Object.keys(state.topic).length==0" >
                    <div class="topic-wrap" style="padding: 20px 20px;">
                        <el-skeleton :loading="state.topic_loading"></el-skeleton>
                    </div>
                </div>

            

                <div class="left" v-if="state.topic != undefined && state.topic != null && Object.keys(state.topic).length>0">
                    <div class="topic-wrap" >
                        <div class="topicTag">
                            <router-link tag="a" class="tag" :to="{path:'/',query: {tagId: state.topic.tagId}}">
                                {{state.topic.tagName}}
                            </router-link>
                        </div>
                        <div class="rightInfo">
                            <div class="report" v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0" @click="addReportUI(state.topic.id,10)">
                                <!--举报-->
                                <span><Icon name="error-warning-line" size="16px" class="icon"/>{{t('thread.20')}}</span>
                            </div>
                            <div class="editTopic" v-if="state.topic.userName == $store.state.systemUser.userName">
                                <router-link tag="a" :to="{path:'/user/editTopic',query: {topicId: state.topic.id}}">
                                    <!--编辑-->
                                    <Icon name="pencil-alt" size="16px" class="icon"/>{{t('thread.180')}}
                                </router-link>
                            </div>
                            <div class="ipAddress" v-if="state.topic.ipAddress != null && state.topic.ipAddress != ''">
                                <span><Icon name="map-pin-line" size="15px" class="icon"/>{{state.topic.ipAddress}}</span>
                            </div>
                        </div>
                        <div class="topicBox">
                            <div class="title">
                                <h1>{{state.topic.title}}</h1>
                                <!--精华
                                <span class="essence" v-if="state.topic.essence == true">{{t('thread.40')}}</span>-->
                                <!--置顶
                                <span class="top" v-if="state.topic.sort > 0">{{t('thread.50')}}</span>-->
                            </div>
                            <div class="topicInfo clearfix" >
                                <div class="postTime">{{state.topic.postTime}}</div>
                                <div class="viewTotal-icon"><Icon name="view" size="16px"/></div>
                                 <!--{{state.topic.viewTotal}}次阅读-->
                                <div class="viewTotal">{{t('thread.60',{'p1': state.topic.viewTotal})}}</div>
                                <div class="comment-icon"><Icon name="commentCount" size="16px"/></div>
                                <!--{{state.topic.commentTotal}}个评论-->
                                <div class="comment">{{t('thread.70',{'p1': state.topic.commentTotal})}}</div>

                               
                                <template v-if="state.topic.essence && state.topic.sort >0">
                                    <div class="ribbon-container">
                                        <div class="arrow">{{t('thread.50')}}</div><!-- 置顶 -->
                                        <div class="fold">{{t('thread.40')}}</div><!-- 精华 -->
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ribbon-container">
                                        <div class="fold essence" v-if="state.topic.essence">{{t('thread.40')}}</div><!-- 精华 -->
                                        <div class="fold pinned" v-if="state.topic.sort >0">{{t('thread.50')}}</div><!-- 置顶 -->
                                    </div>
                                </template>
                                
                            </div>


                                 
                            <div :class="[state.topic.isMarkdown != null && state.topic.isMarkdown == true ? 'markdown-body-custom topicMarkdownContent' : 'topicContent', router.currentRoute.value.query.reportModule !=undefined && parseInt(router.currentRoute.value.query.reportModule as string) == 10 ? 'reportMark' : '']">
                                <!--最后修改时间-->
                                <div class="lastUpdateTime" v-if="state.topic.lastUpdateTime != null">{{t('thread.80')}}：{{state.topic.lastUpdateTime}}</div>
                               
                                <!--此用户账号已注销-->
                                <div class="cancelAccount" v-if="state.topic.account == null || state.topic.account == ''">{{t('thread.90')}}</div>
                                  
                                <div :ref="el => {if(el) topicRefs['topic_'+state.topic.id] = el}">
                                   <RenderTemplate @click-onTopicUnhide="onTopicUnhide" @click-onDownload="onDownload" :html="state.topic.content"></RenderTemplate>
                                </div>
                            </div>



                            <div class="favorite-formModule" v-if="state.topic.userName != null && state.topic.userName != ''">
                                <!--点赞-->
                                <el-tooltip effect="tag-customized" :content="t('thread.840')" placement="top" transition=" " :hide-after="10">
                                    <div class="btn-item" :class="state.alreadyLiked == true ? 'active' : ''">
                                        <div class="circle" @click="()=>{state.alreadyLiked == true ? deleteLike(state.topic.id,10) : addLike(state.topic.id,10)}">
                                            <Icon name="thumb-up-fill" size="26px" class="icon"/>
                                        </div>
                                        <!--赞-->
                                        <div class="text">{{state.likeCount}} {{t('thread.130')}}</div>
                                    </div>
                                </el-tooltip>
                                <!--收藏-->
                                <el-tooltip effect="tag-customized" :content="t('thread.110')" placement="top" transition=" " :hide-after="10">
                                    <div class="btn-item" :class="state.isFavorited == true ? 'active' : ''">
                                        <div class="circle" @click="()=>{state.isFavorited == true ? deleteFavorite(state.topic.id):addFavorite(state.topic.id)}">
                                            <Icon name="star-fill" size="26px" class="icon"/>
                                        </div>
                                        <!--收藏-->
                                        <div class="text" >{{state.favoriteCount}} {{ t('thread.110') }}</div>
                                    </div>
                                </el-tooltip>
                            </div>


                        </div>
                    </div>

                    <!-- 投票 -->
					<div class="voteModule" v-if="state.topic != undefined && state.topic != null  && Object.keys(state.topic).length >0 && state.voteTheme != undefined && state.voteTheme != null && Object.keys(state.voteTheme).length >0">
                        <div class="voteTitle">{{state.voteTheme.title}}</div>
                        <div class="voteOption">
                            <div v-for="voteOption in state.voteTheme.voteOptionList">
                                <div class="voteItem" @click="addVoteRecord(voteOption)">{{voteOption.text}}</div>
                                <el-progress :text-inside="true" :stroke-width="24" :percentage="state.votePercentage.get(voteOption.id)" :color="voteOption.selected ==true ? '#8cc4ff' :'#c9cdd4'" class="progress" :class="{'active': voteOption.selected}" @click="addVoteRecord(voteOption)">
                                    <template #default="{ percentage }">
                                        <!-- {{voteOption.totalVotes}}票 -->
                                        <span class="percentage-label">{{t('thread.860',{'p1': voteOption.totalVotes})}}</span>
                                        <span class="percentage-value">{{ percentage }}%</span>
                                    </template>
                                </el-progress>
                            </div>
                        </div>
                        <div class="voteInfo">
                            <!-- '单选' : '多选' -->
                            <div class="options">{{state.voteTheme.maxChoice == 1 ? t('thread.870') : t('thread.880')}}</div>
                            <div class="status">
                                <!--投票未开始-->
                                <span v-if="state.voteTheme.status == 10">{{t('thread.890')}}</span>
                                <!--{{state.voteTheme.endDate}}截止投票-->
                                <span v-if="state.voteTheme.status == 20 && (state.voteTheme.endDate != null && state.voteTheme.endDate != '')">{{t('thread.900',{'p1': state.voteTheme.endDate})}}</span>
                                <!--投票进行中-->
                                <span v-if="state.voteTheme.status == 20 && (state.voteTheme.endDate == null || state.voteTheme.endDate == '')">{{t('thread.910')}}</span>
                                <!--投票已结束-->
                                <span v-if="state.voteTheme.status == 30">{{t('thread.920')}}</span>
                            </div>
                            <!--共{{ state.voterCount}}票-->
                            <div class="quantity">{{t('thread.930',{'p1': state.voterCount})}}</div>
                        </div>
                    </div>

                    
					<!-- 评论列表 -->
					<div class="commentModule" v-if="state.commentList != null && Object.keys(state.commentList).length>0 && state.commentList.length >0">
                        <ol class="commentList">
                            <!-- 延迟加载点赞 -->
                            <div class="commentInfo" :class="router.currentRoute.value.query.reportModule !=undefined && parseInt(router.currentRoute.value.query.reportModule as string) == 20 && comment.id == router.currentRoute.value.query.commentId ? 'reportMark' : ''" v-for="(comment,index) in state.commentList" :key="comment.id"  :ref="'comment_'+comment.id" v-lazy-tag="()=>{onQueryLike(comment.id,20)}">
                                
                                <div class="comment-author">
                                    <router-link tag="a" v-if="comment.userName != null && comment.userName != ''" :to="{path:'/user/control/home',query: {userName: comment.userName}}">
                                        <img v-if="comment.avatarName != null" :src="comment.avatarPath+'100x100/'+comment.avatarName" class="img">
                                        <img v-if="comment.avatarName == null" :src="comment.avatar" width="62" height="62" class="img"/>
                                        
                                    </router-link>
                                    <img v-if="comment.userName == null && comment.avatarName == null" :src="comment.avatar" width="62" height="62" class="img"/>    
                                    
                                    <div class="info-container">
                                        <router-link tag="a" class="userName" :to="{path:'/user/control/home',query: {userName: comment.userName}}">
                                           <span v-if="comment.nickname != null && comment.nickname != ''">{{comment.nickname}}</span>
                                           <span v-if="comment.nickname == null || comment.nickname == ''">{{comment.account}}</span>
                                           <template v-if="comment.account == null || comment.account == ''">&nbsp;</template>
                                        </router-link>
                                        <!-- 已注销 -->
                                        <span v-if="comment.account == null || comment.account == ''" class='cancelNickname'>{{t('thread.140')}}</span>   

                                        <span class="userRoleName" v-for="roleName in comment.userRoleNameList">{{roleName}}</span>
                                        <!-- 官方人员 -->
                                        <span class="staff" v-if="comment.isStaff">{{t('thread.150')}}</span>
                                        <!-- 作者 -->
                                        <span class="master" v-if="comment.userName == state.topic.userName && comment.isStaff == state.topic.isStaff">{{t('thread.160')}}</span>
                                    </div> 
                                </div>
                                <div class="commentTime">{{comment.postTime}}</div>
                                
                                <div class="quote" v-if="comment.quoteList != null && comment.quoteList.length >0">
                                    <RenderTemplate :html="state.quoteData.get(comment.id)"></RenderTemplate>
                                    
                                </div>
                                
                                <div :class="[comment.isMarkdown != null && comment.isMarkdown == true ? 'markdown-body-custom commentMarkdownContent' : 'commentContent']">
                                    <!-- 此用户账号已注销 -->
                                    <div class="cancelAccount" v-if="comment.account == null || comment.account == ''">{{t('thread.90')}}</div>
                                   

                                    <div :ref="'commentContent_'+comment.id">
                                        <RenderTemplate :html="comment.content"></RenderTemplate>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                
                                <div class="replyList" :class="'affix-container_reply_'+comment.id" v-if="comment.replyList != null && comment.replyList.length >0">
                                    
                                    <ul class="timeline box">
                                        <!-- 延迟加载点赞 -->
                                        <li class="timeline-item replyItem-container" v-for="(reply,index2) in comment.replyList" :key="reply.id"  :replyId="reply.id" :ref="el => handleReplyNode(el, reply.id)"   >
                                            <!--v-if="state.replyExpandOrShrink.get(comment.id) || (state.replyExpandOrShrink.get(comment.id) == false && index2 <state.viewNumber)"-->
                                            <div v-lazy-tag="()=>{onQueryLike(reply.id,30)}" v-if="getReplyVisibility(comment.id, index2).value" >
                                            <div class="tail" v-if="state.line.get(reply.id)"></div>
                                            <div class="node node--normal" v-if="state.dot.get(reply.id)"></div>
                                            <div class="replyItem">
                                                <div :class="router.currentRoute.value.query.reportModule !=undefined && parseInt(router.currentRoute.value.query.reportModule as string) == 30 && reply.id == router.currentRoute.value.query.replyId ? 'reply-reportMark' : ''">
                                                    <div class="reply-top" >
                                                        <div class="reply-author">
                                                            <router-link tag="a" v-if="reply.userName!= null && reply.userName != ''" class="avatarBox" :to="{path:'/user/control/home',query: {userName: reply.userName}}">
                                                                <img v-if="reply.avatarName != null" :src="reply.avatarPath+'100x100/'+reply.avatarName" class="img">
                                                                <img v-if="reply.avatarName == null" :src="reply.avatar" width="40" height="40" class="img"/>
                                                                
                                                            </router-link>

                                                            <span v-if="reply.userName == null && reply.avatarName == null"  class="avatarBox">
                                                                <img :src="reply.avatar" width="40" height="40" class="img"/>
                                                            </span>
                                                            <!-- 已注销 -->
                                                            <span v-if="reply.account == null || reply.account == ''" class='cancelNickname'>{{t('thread.140')}}</span>   


                                                            <router-link tag="a" v-if="reply.account != null && reply.account != ''" class="userName" :to="{path:'/user/control/home',query: {userName: reply.userName}}">
                                                                <span v-if="reply.nickname != null && reply.nickname != ''">{{reply.nickname}}</span>
                                                                <span v-if="reply.nickname == null || reply.nickname == ''">{{reply.account}}</span>
                                                                <template v-if=" reply.account == null || reply.account == ''">&nbsp;</template>
                                                            </router-link>

                                                            <span class="userRoleName" v-for="roleName in reply.userRoleNameList">{{roleName}}</span>
                                                            <!-- 官方人员 -->
                                                            <span class="staff" v-if="reply.isStaff">{{t('thread.150')}}</span>
                                                            <!-- 作者 -->
                                                            <span class="master" v-if="reply.userName == state.topic.userName && reply.isStaff == state.topic.isStaff">{{t('thread.160')}}</span>
                                                            <div class="time"> {{reply.postTime}}</div>
                                                        </div>
                                                        <div class="friendInfo" v-if="reply.friendUserName != null && reply.friendUserName != ''">
                                                            <span class="arrow"><icon name="caret-right" size="14px"/></span>
                                                            <router-link tag="a" v-if="reply.friendUserName!= null && reply.friendUserName != ''" class="friendAvatarBox" :to="{path:'/user/control/home',query: {userName: reply.friendUserName}}">
                                                                <img v-if="reply.friendAvatarName != null" :src="reply.friendAvatarPath+'100x100/'+reply.friendAvatarName" class="img">
                                                                <img v-if="reply.friendAvatarName == null" :src="reply.friendAvatar" width="20" height="20" class="img"/>
                                                                
                                                            </router-link>
                                                            
                                                            <h2 class="nameInfo" >
                                                                <!-- 已注销 -->
                                                                <span v-if="reply.friendAccount == null || reply.friendAccount == ''" class="cancelNickname">{{t('thread.140')}}</span>  
                                                                
                                                                <router-link tag="a" v-if="reply.friendAccount != null && reply.friendAccount != ''" class="userName" :to="{path:'/user/control/home',query: {userName: reply.friendUserName}}">
                                                                    <span v-if="reply.friendNickname != null && reply.friendNickname != ''">{{reply.friendNickname}}</span>
                                                                    <span v-if="reply.friendNickname == null || reply.friendNickname == ''">{{reply.friendAccount}}</span>
                                                                    <template v-if=" reply.friendAccount == null || reply.friendAccount == ''">&nbsp;</template>
                                                                </router-link>
                                                                <!-- 作者 -->
                                                                <span class="master" v-if="reply.friendAccount != null && reply.friendAccount != '' && reply.friendUserName == state.topic.userName && reply.isFriendStaff == state.topic.isStaff">{{t('thread.160')}}</span>
                                                            
                                                            </h2>
                                                        </div>
                                                        <span class="ipAddress">
                                                            <template v-if="reply.ipAddress != null && reply.ipAddress != ''">
                                                                <icon name="map-pin-line" size="14px"/>
                                                                <span class="ipAddress-text">{{reply.ipAddress}}</span>
                                                            </template>

                                                            <a v-if="state.alreadyLikedCommentReply.get(reply.id) != undefined && state.alreadyLikedCommentReply.get(reply.id) == true" @click="deleteLike(reply.id,30)">
                                                                <!-- 赞 -->
                                                                <Icon name="heart-fill" size="15px" class="like-icon"/><span class="like-quantity">{{state.commentReplyLikeCount.get(reply.id) != undefined  && Long.fromString(String(state.commentReplyLikeCount.get(reply.id))).gt(0) ? state.commentReplyLikeCount.get(reply.id) : ''}}</span><span class="like-text">{{t('thread.130')}}</span>
                                                            </a>
                                                            <a v-else @click="addLike(reply.id,30)">
                                                                <!-- 赞 -->
                                                                <Icon name="heart" size="15px" class="like-icon"/><span class="like-quantity">{{state.commentReplyLikeCount.get(reply.id) != undefined  && Long.fromString(String(state.commentReplyLikeCount.get(reply.id))).gt(0) ? state.commentReplyLikeCount.get(reply.id) : ''}}</span><span class="like-text">{{t('thread.130')}}</span>
                                                            </a>

                                                            
                                                            <el-dropdown :persistent="false">
                                                                <div class="more">
                                                                    <i class="icon" ><icon name="ellipsis-v-solid" size="14px"/></i>
                                                                </div>
                                                            
                                                                <template #dropdown>
                                                                    <el-dropdown-menu>
                                                                        <!-- 回复 -->
                                                                        <el-dropdown-item v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0"  @click="addReplyFriendUI(comment.id,reply.id)"><i class="dropdown-menu-icon" ><icon name="reply" size="15px"/></i> {{t('thread.170')}} </el-dropdown-item>
                                                                        <!-- 举报 -->
                                                                        <el-dropdown-item v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0" @click="addReportUI(reply.id,30)"><i class="dropdown-menu-icon" ><icon name="error-warning-line" size="15px"/></i> {{t('thread.20')}} </el-dropdown-item>
                                                                        <!-- 编辑 -->
                                                                        <el-dropdown-item v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0 && reply.userName ==  $store.state.systemUser.userName" @click="editReplyUI(reply)"><i class="dropdown-menu-icon" ><icon name="pencil-alt" size="15px"/></i> {{t('thread.180')}} </el-dropdown-item>
                                                                        <!-- 删除 -->
                                                                        <el-dropdown-item v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0 && reply.userName ==  $store.state.systemUser.userName" @click="onDeleteReply(comment.id,reply.id)"><i class="dropdown-menu-icon" ><icon name="trash" size="15px"/></i> {{t('thread.190')}} </el-dropdown-item>
                                                                    </el-dropdown-menu>
                                                                </template>
                                                            </el-dropdown>
                                                             
                                                        </span>
                                                        
                                                    </div>
                                                    <div style="clear:both; height: 0; line-height: 0; font-size: 0;"></div>
                                                    <div class="replyContent" @click="clickReplyLevel(comment.id,reply.id)">
                                                        <!-- 此用户账号已注销 -->
                                                        <div v-if="reply.account == null || reply.account == ''" class="cancelAccount">{{t('thread.90')}}</div>
                                                        <RenderTemplate :html="reply.content"></RenderTemplate>
                                                    </div>
                                                    <!-- 修改回复 -->
                                                    <div class="editCommentReply-formModule" v-if="state.editReplyFormView.get(reply.id)">
                                                        <div class="editReply-wrap">
                                                            <el-form label-position="right" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                                                <el-form-item :error="error.replyContent.get('editReply-'+reply.id)">
                                                                    <div style="width: 100%;">
                                                                        <textarea :ref="el => handleEditReplyNode(el, reply.id)" :editorId="'editReply_'+reply.id" :replyId="reply.id" style="width:100%;height:230px;visibility:hidden;"></textarea>
                                                                    </div>
                                                                </el-form-item>
                                                                <el-form-item :error="error.captchaValue.get('editReply-'+reply.id)" v-if="state.showCaptcha.get('editReply-'+reply.id)" class="captcha-item">
                                                                    <el-row align="middle">
                                                                        <el-col :span="12" >
                                                                            <!--placeholder="验证码"-->
                                                                            <el-input  v-model="state.captchaValue['editReply-'+reply.id]" @change.native="checkCaptchaValueRules('editReply-'+reply.id)"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                                                <template #prefix>
                                                                                    <Icon name="shield-check-line" size="16px"/>
                                                                                </template>
                                                                            </el-input>
                                                                        </el-col>
                                                                        <el-col :span="7" :offset="1">
                                                                            <el-image :src="state.imgUrl.get('editReply-'+reply.id)" @click="replaceCaptcha('editReply-'+reply.id)"/>
                                                                        </el-col>
                                                                        <el-col :span="3" :offset="1">
                                                                            <!--换一幅-->
                                                                            <el-link type="primary" @click="replaceCaptcha('editReply-'+reply.id)" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                                                        </el-col>
                                                                    </el-row>
                                                                </el-form-item>
                                                                <el-form-item :error="error.reply.get('editReply-'+reply.id)">
                                                                    <!--提交-->
                                                                    <el-button class="submitButton" type="primary" @mousedown.native="onEditReply(reply.id)" :disabled="state.allowSubmit.get('editReply-'+reply.id)">{{t('common.50')}}</el-button>
                                                                    <!--取消-->
                                                                    <el-button class="submitButton" type="primary" @mousedown.native="onCancelEditReply(reply.id);" plain >{{t('common.60')}}</el-button>
                                                                </el-form-item>
                                                            </el-form>
                                                        </div>
                                                    </div>
                                                    <!-- 回复对方 -->
                                                    <div class="addCommentReplyFriend-formModule" v-if="state.addReplyFriendFormView.get(reply.id)">
                                                        <div class="addReplyFriend-wrap">
                                                            <el-form label-position="right" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                                                <el-form-item :error="error.replyContent.get('addReplyFriend-'+reply.id)">
                                                                    <div style="width: 100%;">
                                                                        <textarea :ref="el => handleAddReplyFriendNode(el, reply.id)" :editorId="'addReplyFriend_'+reply.id" :replyId="reply.id" style="width:100%;height:230px;visibility:hidden;"></textarea>
                                                                    </div>
                                                                </el-form-item>
                                                                <el-form-item :error="error.captchaValue.get('addReplyFriend-'+reply.id)" v-if="state.showCaptcha.get('addReplyFriend-'+reply.id)" class="captcha-item">
                                                                    <el-row align="middle">
                                                                        <el-col :span="12" >
                                                                            <!--placeholder="验证码"-->
                                                                            <el-input  v-model="state.captchaValue['addReplyFriend-'+reply.id]" @change.native="checkCaptchaValueRules('addReplyFriend-'+reply.id)"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                                                <template #prefix>
                                                                                    <Icon name="shield-check-line" size="16px"/>
                                                                                </template>
                                                                            </el-input>
                                                                        </el-col>
                                                                        <el-col :span="7" :offset="1">
                                                                            <el-image :src="state.imgUrl.get('addReplyFriend-'+reply.id)" @click="replaceCaptcha('addReplyFriend-'+reply.id)"/>
                                                                        </el-col>
                                                                        <el-col :span="3" :offset="1">
                                                                            <!--换一幅-->
                                                                            <el-link type="primary" @click="replaceCaptcha('addReplyFriend-'+reply.id)" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                                                        </el-col>
                                                                    </el-row>
                                                                </el-form-item>
                                                                <el-form-item :error="error.reply.get('addReplyFriend-'+reply.id)">
                                                                    <!--提交-->
                                                                    <el-button class="submitButton" type="primary" @mousedown.native="onAddReplyFriend(comment.id,reply.id)" :disabled="state.allowSubmit.get('addReplyFriend-'+reply.id)">{{t('common.50')}}</el-button>
                                                                    <!--取消-->
                                                                    <el-button class="submitButton" type="primary" @mousedown.native="onCancelAddReplyFriend(reply.id);" plain >{{t('common.60')}}</el-button>
                                                                </el-form-item>
                                                            </el-form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </li>
                                    </ul>
                                   
                                    <div class="link" v-if="comment.replyList.length >state.viewNumber">
                                        <el-affix :target="'.affix-container_reply_'+comment.id" position="bottom" :offset="10" v-if="state.replyExpandOrShrink.get(comment.id)">
                                            <!-- 点击收缩 -->
                                            <span @click="telescopicReply(comment.id);" >{{t('thread.810')}}</span>
                                        </el-affix>
                                        <!-- 剩余{{comment.replyList.length-state.viewNumber}}条 -->
                                        <span @click="telescopicReply(comment.id);" v-if="!state.replyExpandOrShrink.get(comment.id)">{{t('thread.820',{'p1': comment.replyList.length-state.viewNumber})}}</span>
                                    </div>   
                                    
                                </div> 

                                <!-- 添加回复 -->
                                <div class="commentReply-formModule" v-if="state.addReplyFormView.get(comment.id)">
                                    <div class="addReply-wrap">
                                        <div class="head"><Icon name="reply" size="52px" class="icon"/></div>
                                        <el-form label-position="right" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                            <el-form-item :error="error.replyContent.get('addReply-'+comment.id)">
                                                <div style="width: 100%;">
                                                    <textarea :ref="el => handleAddReplyNode(el, comment.id)" :editorId="'addReply_'+comment.id" :commentId="comment.id" style="width:100%;height:230px;visibility:hidden;"></textarea>
                                                </div>
                                            </el-form-item>
                                            <el-form-item :error="error.captchaValue.get('addReply-'+comment.id)" v-if="state.showCaptcha.get('addReply-'+comment.id)" class="captcha-item">
                                                <el-row align="middle">
                                                    <el-col :span="12" >
                                                        <!--placeholder="验证码"-->
                                                        <el-input  v-model="state.captchaValue['addReply-'+comment.id]" @change.native="checkCaptchaValueRules('addReply-'+comment.id)"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                            <template #prefix>
                                                                <Icon name="shield-check-line" size="16px"/>
                                                            </template>
                                                        </el-input>
                                                    </el-col>
                                                    <el-col :span="7" :offset="1">
                                                        <el-image :src="state.imgUrl.get('addReply-'+comment.id)" @click="replaceCaptcha('addReply-'+comment.id)"/>
                                                    </el-col>
                                                    <el-col :span="3" :offset="1">
                                                        <!--换一幅-->
                                                        <el-link type="primary" @click="replaceCaptcha('addReply-'+comment.id)" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item :error="error.reply.get('addReply-'+comment.id)">
                                                <!--提交-->
                                                <el-button class="submitButton" type="primary" @mousedown.native="onAddReply(comment.id)" :disabled="state.allowSubmit.get('addReply-'+comment.id)">{{t('common.50')}}</el-button>
                                                <!--取消-->
                                                <el-button class="submitButton" type="primary" @mousedown.native="onCancelAddReply(comment.id);" plain >{{t('common.60')}}</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                               
                                <div class="quote-formModule" v-if="state.quoteFormView.get(comment.id)">
                                    <div class="addQuote-wrap">
                                        <div class="head"><Icon name="quote-left-solid" size="52px" class="icon"/></div>
                                        <el-form label-position="right" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                            <el-form-item :error="error.content.get('addQuoteComment-'+comment.id)">
                                                
                                                
                                                <div v-if="!state.isQuoteCommentMarkdownMap.get(comment.id)" style="width: 100%;">
                                                    <textarea :ref="el => handleQuoteNode(el, comment.id)" :editorId="'quoteComment_'+comment.id" :commentId="comment.id" style="width:100%;height:230px;visibility:hidden;"></textarea>
                                                </div>
                                                <div v-if="state.isQuoteCommentMarkdownMap.get(comment.id)" style="width: 100%;">
                                                    <!--placeholder="请输入内容..."-->
                                                    <Editor mode="split" :editorId="'quoteComment_'+comment.id" :value="(state.quoteCommentMarkdownContent[comment.id] as string)" :plugins="state.quoteCommentEditorPlugin" :locale="setMarkdownLanguage()" :sanitize="commentSanitize" :placeholder="t('thread.200')" @change="handleQuoteCommentMarkdownChange($event,comment.id)"/>
                                                </div>
                                            </el-form-item>
                                            <el-form-item :error="error.captchaValue.get('addQuoteComment-'+comment.id)" v-if="state.showCaptcha.get('addQuoteComment-'+comment.id)" class="captcha-item">
                                                <el-row align="middle">
                                                    <el-col :span="12" >
                                                        <!--placeholder="验证码"-->
                                                        <el-input  v-model="state.captchaValue['addQuoteComment-'+comment.id]" @change.native="checkCaptchaValueRules('addQuoteComment-'+comment.id)"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                            <template #prefix>
                                                                <Icon name="shield-check-line" size="16px"/>
                                                            </template>
                                                        </el-input>
                                                    </el-col>
                                                    <el-col :span="7" :offset="1">
                                                        <el-image :src="state.imgUrl.get('addQuoteComment-'+comment.id)" @click="replaceCaptcha('addQuoteComment-'+comment.id)"/>
                                                    </el-col>
                                                    <el-col :span="3" :offset="1">
                                                        <!--换一幅-->
                                                        <el-link type="primary" @click="replaceCaptcha('addQuoteComment-'+comment.id)" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item :error="error.comment.get('addQuoteComment-'+comment.id)" class="form-action">
                                                <!--提交-->
                                                <el-button class="submitButton" type="primary"  @mousedown.native="onQuoteCommentFormSubmit(comment.id)" :disabled="state.allowSubmit.get('addQuoteComment-'+comment.id)">{{t('common.50')}}</el-button>
                                                <!--取消-->
                                                <el-button class="submitButton" type="primary"  @mousedown.native="onCancelQuoteComment(comment.id)" plain>{{t('common.60')}}</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                               
                                
                                <!-- 修改评论表单 -->
                                <div class="editComment-formModule" v-if="state.editCommentFormView.get(comment.id)">
                                    <div class="editComment-wrap">
                                        <div class="head"><Icon name="pencil-alt" size="50px" class="icon"/></div>
                                        <el-form label-position="right" :ref="'formEditCommentRef-'+comment.id" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                            <el-form-item :error="error.content.get('editComment-'+comment.id)">
                                                <div v-if="!state.isEditCommentMarkdownMap.get(comment.id)" style="width: 100%;">
                                                    <textarea :ref="el => handleEditCommentNode(el, comment.id)" :editorId="'editComment_'+comment.id" :commentId="comment.id" style="width:100%;height:230px;visibility:hidden;"></textarea>
                                                </div>
                                                <div v-if="state.isEditCommentMarkdownMap.get(comment.id)" style="width: 100%;">
                                                    <!--placeholder="请输入内容..."-->
                                                    <Editor mode="split" :editorId="'editComment_'+comment.id" :value="(state.editCommentMarkdownContent[comment.id] as string)" :plugins="state.editCommentEditorPlugin" :locale="setMarkdownLanguage()" :sanitize="commentSanitize" :placeholder="t('thread.200')" @change="handleEditCommentMarkdownChange($event,comment.id)"/>
                                                </div>
                                            </el-form-item>
                                            <el-form-item :error="error.captchaValue.get('editComment-'+comment.id)" v-if="state.showCaptcha.get('editComment-'+comment.id)" class="captcha-item">
                                                <el-row align="middle">
                                                    <el-col :span="12" >
                                                        <!--placeholder="验证码"-->
                                                        <el-input  v-model="state.captchaValue['editComment-'+comment.id]" @change.native="checkCaptchaValueRules('editComment-'+comment.id)"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                            <template #prefix>
                                                                <Icon name="shield-check-line" size="16px"/>
                                                            </template>
                                                        </el-input>
                                                    </el-col>
                                                    <el-col :span="7" :offset="1">
                                                        <el-image :src="state.imgUrl.get('editComment-'+comment.id)" @click="replaceCaptcha('editComment-'+comment.id)"/>
                                                    </el-col>
                                                    <el-col :span="3" :offset="1">
                                                        <!--换一幅-->
                                                        <el-link type="primary" @click="replaceCaptcha('editComment-'+comment.id)" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item :error="error.comment.get('editComment-'+comment.id)" class="form-action">
                                                <!--提交-->
                                                <el-button class="submitButton" type="primary"  @mousedown.native="onEditCommentFormSubmit(comment.id)" :disabled="state.allowSubmit.get('editComment-'+comment.id)">{{t('common.50')}}</el-button>
                                                <!--取消-->
                                                <el-button class="submitButton" type="primary"  @mousedown.native="onCancelEditComment(comment.id)" plain>{{t('common.60')}}</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                                
                                <div class="tipBottom">
                                    <span class="a-toolbar">
                                        <span class="ipAddress-text" v-if="comment.ipAddress != null && comment.ipAddress != ''">
                                            <Icon name="map-pin-line" size="15px" class="icon"/>{{comment.ipAddress}}
                                        </span>
                                        <a v-if="state.alreadyLikedComment.get(comment.id) != undefined && state.alreadyLikedComment.get(comment.id) == true" @click="deleteLike(comment.id,20)">
                                            <!--赞-->
                                            <Icon name="heart-fill" size="15px" class="icon"/>{{state.commentLikeCount.get(comment.id) != undefined  && Long.fromString(String(state.commentLikeCount.get(comment.id))).gt(0) ? state.commentLikeCount.get(comment.id) : ''}}{{t('thread.130')}}
                                        </a>
                                        <a v-else @click="addLike(comment.id,20)">
                                            <!--赞-->
                                            <Icon name="heart" size="15px" class="icon"/>{{state.commentLikeCount.get(comment.id) != undefined  && Long.fromString(String(state.commentLikeCount.get(comment.id))).gt(0) ? state.commentLikeCount.get(comment.id) : ''}}{{t('thread.130')}}
                                        </a>

                                        <a v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0" @click="addReplyUI(comment.id)" >
                                            <!--回复-->
                                            <Icon name="reply" size="15px" class="icon"/>{{t('thread.170')}}
                                        </a>

                                        <a v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0" @click="quoteCommentUI(comment)">
                                            <!--引用-->
                                            <Icon name="quote" size="15px" class="icon"/>{{t('thread.210')}}
                                        </a>
                                        <span class="report" v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0" @click="addReportUI(comment.id,20)">
                                            <!--举报-->
                                            <span><Icon name="error-warning-line" size="15px" class="icon"/>{{t('thread.20')}}</span>
                                        </span>
                                       
                                        <a v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0 && comment.userName ==  $store.state.systemUser.userName" @click="editCommentUI(comment)">
                                            <!--编辑-->
                                            <Icon name="pencil-alt" size="15px" class="icon"/>{{t('thread.180')}}
                                        </a>
                                        
                                        <a v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0 && comment.userName ==  $store.state.systemUser.userName" @click="onDeleteComment(comment.id)">
                                            <!--删除-->
                                            <Icon name="trash" size="15px" class="icon"/>{{t('thread.190')}}
                                        </a>
                                        
                                    </span>
                                </div>
                            </div>
                        </ol>
                        <el-skeleton :loading="state.comment_loading" style="padding-top: 25px;"></el-skeleton>
                        <div class="page" v-if="state.isShowPage">
                            <el-pagination background @current-change="handlePage" :current-page="state.currentpage"  :page-size="state.maxresult" :total="state.totalrecord" layout="total, prev, pager, next,jumper" />
                        </div>
                    </div>

                    <!-- 话题允许评论 -->
                    <div v-if="state.topic.allow">
                        <!-- 已登录 -->
                        <div v-if="$store.state.systemUser != null && Object.keys($store.state.systemUser).length>0">
                            <!-- 显示评论表单 -->
                            <div class="comment-formModule" v-if="state.allowComment">
                                <div class="addComment-wrap">
                                    <el-form label-position="right" :ref="'formAddCommentRef'" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                        <el-form-item :error="error.content.get('addComment-'+state.topicId)">
                                            <div v-show="!state.isAddCommentMarkdown" style="width: 100%;">
                                                <textarea :editorId="'addComment'" ref="formAddCommentContentRef" style="width:100%;height:230px;visibility:hidden;"></textarea>
                                            </div>
                                            <div v-if="state.isAddCommentMarkdown" style="width: 100%;">
                                                <!-- placeholder="请输入内容..." -->
                                                <Editor :editorId="'addComment'" :value="state.addCommentMarkdownContent" :plugins="state.addCommentEditorPlugin" :locale="setMarkdownLanguage()" :sanitize="commentSanitize" :placeholder="t('thread.200')" @change="handleAddCommentMarkdownChange"/>
                                           
                                            </div>
                                        </el-form-item>

                                        <el-form-item :error="error.captchaValue.get('addComment-'+state.topicId)" v-if="state.showCaptcha.get('addComment-'+state.topicId)" class="captcha-item">
                                            <el-row align="middle">
                                                <el-col :span="12" >
                                                    <!--placeholder="验证码"-->
                                                    <el-input  v-model="state.captchaValue['addComment-'+state.topicId]" @change.native="checkCaptchaValueRules('addComment-'+state.topicId)"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                        <template #prefix>
                                                            <Icon name="shield-check-line" size="16px"/>
                                                        </template>
                                                    </el-input>
                                                </el-col>
                                                <el-col :span="7" :offset="1">
                                                    <el-image :src="state.imgUrl.get('addComment-'+state.topicId)" @click="replaceCaptcha('addComment-'+state.topicId)"/>
                                                </el-col>
                                                <el-col :span="3" :offset="1">
                                                    <!--换一幅-->
                                                    <el-link type="primary" @click="replaceCaptcha('addComment-'+state.topicId)" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item :error="error.comment.get('addComment-'+state.topicId)" class="form-action">
                                            <!--提交-->
                                            <el-button class="submitButton" type="primary"  @mousedown.native="onAddCommentFormSubmit" :disabled="state.allowSubmit.get('addComment-'+state.topicId)">{{t('common.50')}}</el-button>
                                            <div class="promptInfo">
                                                <!--我来说两句，发表我的评论-->
                                                <h2>{{t('thread.220')}}</h2>
                                            </div>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- 不显示评论表单 -->       
                            <div class="addCommentModule" v-if="state.isLoadingComplete && !state.allowComment">
                                <div class="addComment-wrap">
                                    <div class="respond">
                                        <!--评论已关闭-->
                                        <p>
                                            {{t('thread.230')}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
		
                        <!-- 未登录 -->
                        <div class="addCommentModule" v-if="$store.state.systemUser == null || Object.keys($store.state.systemUser).length==0">
                            <div class="addComment-wrap">
                                <div class="respond">
                                    <p >
                                        <!-- 请登录后回答。没有帐号？注册一个。-->
                                        <i18n-t keypath="thread.240" scope="global">
                                            <template #p1>

                                                <router-link tag="a" :to="{path: '/login',query:{jumpUrl :createJumpAttribute()}}"> {{t('thread.250')}}</router-link>
                                            </template>
                                            <template #p2>
                                                <router-link tag="a" :to="'/register'">{{t('thread.260')}}</router-link>
                                            </template>
                                        </i18n-t>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 话题不允许评论 -->
					<div class="addCommentModule" v-if="!state.topic.allow">
                        <div class="addComment-wrap">
                            <div class="respond">
                                <!-- 本话题评论已关闭 -->
                                <p>
                                    {{t('thread.270')}}
                                </p>
                            </div>
                        </div>
					</div>

                    <!-- 添加举报 --><!-- title="举报" -->
                    <el-dialog :title="t('thread.20')" v-model="state.addReportFormView" width="612px" :draggable="true" :close-on-click-modal="false">
                        <div class="addReport-formModule" >
                            <div class="addReport-wrap">
                                <el-form label-position="right" size="large" :model="state" class="iconForm-container" @submit.native.prevent>
                                    <el-form-item :error="error.reportTypeId">
                                        <div class="reportType-container">
                                            
                                                <div class="reportType-group" v-for="reportType in state.reportTypeList">
                                                    
                                                    <!--  仅有一级分类 -->
                                                    <div v-if="reportType.childType.length ==0">
                                                        <ul class="reportType-list">
                                                            <li class="reportType-item">
                                                                <el-radio-group v-model="state.reportTypeId" @change="selectReportType(state.reportTypeList)">
                                                                <el-radio :label="reportType.id" size="large">{{reportType.name}}</el-radio>
                                                            </el-radio-group>
                                                            </li>
                                                        </ul>
                                                        
                                                    </div>
                                                    <div v-else><!-- 含有多级分类 -->
                                                        <p class="reportType-name">{{reportType.name}}</p>
                                                        <ul class="reportType-list">
                                                            <el-radio-group v-model="state.reportTypeId" @change="selectReportType(state.reportTypeList)">
                                                            <li class="reportType-item" v-for="childReportType in reportType.childType">
                                                                <el-radio :label="childReportType.id" size="large">{{childReportType.name}}</el-radio>
                                                            </li>
                                                        </el-radio-group>
                                                        </ul>
                                                    </div>
                                                </div>
                                            
                                        </div>
                                    </el-form-item>
                                    <el-form-item v-if="state.show_giveReason" :error="error.reason">
                                        <!--  placeholder="请填写举报理由" -->
                                        <el-input type="textarea" :autosize="{minRows: 5}" :placeholder="t('thread.280')" v-model="state.reason"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="state.show_giveReason && state.reportMaxImageUpload >0" :error="error.imageFile">
                                        <el-upload ref="selectImage" v-model:file-list="state.fileList" action="#" :auto-upload="false" list-type="picture-card" :on-preview="openImagePreview" :on-exceed="onImageExceed" :accept="'.jpg,.jpeg,.gif,.png,.bmp'" :limit="state.reportMaxImageUpload">
                                            <el-icon><Plus /></el-icon>
                                        </el-upload>
                                        <!-- 图片预览 -->
                                        <el-image-viewer v-if="state.isImageViewer" @close="closeImagePreview" :url-list="[state.localImageUrl]" />

                                    </el-form-item>
                                    <el-form-item :error="error.captchaValue.get('report')" v-if="state.showCaptcha.get('report')" class="captcha-item">
                                        <el-row align="middle">
                                            <el-col :span="12" >
                                                <!--placeholder="验证码"-->
                                                <el-input  v-model="state.captchaValue['report']" @change.native="checkCaptchaValueRules('report')"  class="captchaInput" maxlength="4" :placeholder="t('common.70')" clearable >
                                                    <template #prefix>
                                                        <Icon name="shield-check-line" size="16px"/>
                                                    </template>
                                                </el-input>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <el-image :src="state.imgUrl.get('report')" @click="replaceCaptcha('report')"/>
                                            </el-col>
                                            <el-col :span="3" :offset="1">
                                                <!--换一幅-->
                                                <el-link type="primary" @click="replaceCaptcha('report')" :underline="false" class="replaceCaptchaText">{{t('common.80')}}</el-link>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item :error="error.report">
                                        <!--提交-->
                                        <el-button class="submitButton" type="primary" @mousedown.native="onAddReportFormSubmit" :disabled="state.allowSubmit.get('report')">{{t('common.50')}}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        
                    </el-dialog>

                    <!-- 选择提及用户 -->
                    <div class="selectMentionUserModule">
                        <!-- title="选择用户"  -->
                        <el-dialog :title="t('thread.290')" :z-index="900000" v-model="state.popup_mentionUser" @close="closeMentionUser" :draggable="true" top="40vh" width="500">
                            <div class="search">
                                <el-form :inline="true" label-width="auto" @keyup.enter.native="searchMentionUser">
                                    <el-form-item :error="error.keyword">
                                        <!--  placeholder="用户账号或呢称" -->
                                        <el-input v-model.trim="state.keyword" maxlength="30" :clearable="true" :placeholder="t('thread.300')"></el-input>
                                    </el-form-item>
                                    
                                    <el-form-item >
                                        <!--  搜索 -->
                                        <el-button type="primary" size="large" class="submitButton" @click="searchMentionUser" >{{t('thread.310')}}</el-button>
                                    </el-form-item>
                                    
                                </el-form>
                            </div>
                            <div class="mentionUserItem" v-for="mentionUser in state.mentionUserList" @click="selectMentionUser(mentionUser)">
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
                
                <div class="right">
                    <div class="affix-container">
                        <el-affix target=".affix-container" :offset="state.affix_offset" z-index="1" @scroll="onRightScroll">
                            <div class="right-container" ref="right_ref">
                                <div class="userInfo-wrap clearfix" v-if="state.topic == undefined || state.topic == null  || Object.keys(state.topic).length==0" >
                                    <div class="userInf" style="padding: 20px 20px;">
                                        <el-skeleton :loading="state.topic_loading"></el-skeleton>
                                    </div>
                                </div>
                                <!-- 话题用户信息 -->
                                <div class="userInfo-wrap clearfix" v-if="state.topic != undefined && state.topic != null && Object.keys(state.topic).length>0">
                                    <div class="userInfo">
                                        <div class="author">
                                            <router-link v-if="state.topic.userName != null && state.topic.userName != ''" tag="a" :to="{path:'/user/control/home',query: {userName: state.topic.userName}}" target="_blank">
                                                <img v-if="state.topic.avatarName != null" :src="state.topic.avatarPath+'100x100/'+state.topic.avatarName" class="img">
                                                <img v-if="state.topic.avatarName == null" :src="state.topic.avatar" width="70" height="70" class="img"/>
                                                
                                            </router-link>
                                            <a v-if="state.topic.userName == null || state.topic.userName == ''">
                                                <img v-if="state.topic.avatarName != null" :src="state.topic.avatarPath+'100x100/'+state.topic.avatarName" class="img">
                                                <img v-if="state.topic.avatarName == null" :src="state.topic.avatar" width="70" height="70" class="img"/>
                                                
                                            </a>
                                        </div>
                                        <p class="name">
                                            <router-link tag="a" :to="{path:'/user/control/home',query: {userName: state.topic.userName}}" target="_blank">
                                                {{state.topic.nickname != null && state.topic.nickname != '' ?state.topic.nickname : state.topic.account}}
                                            </router-link>
                                        </p>
                                        <div class="role" v-if="state.topic.userRoleNameList != null && state.topic.userRoleNameList.length >0">
                                            <i class="userRoleName" v-for="roleName in state.topic.userRoleNameList">{{roleName}}</i>
                                        </div>
                                        
                                        <div class="role" v-if="state.topic.isStaff">
                                            <!-- 官方人员 -->
                                            <i class="staff">{{t('thread.150')}}</i>	
                                        </div>
                                        <ul>
                                            <li>
                                                <span v-if="Long.fromString(state.answerCount).gt(999999)">{{state.answerCount}}+</span>
                                                <span v-if="Long.fromString(state.answerCount).lte(999999)">{{state.answerCount}}</span>
                                                <!-- 回答 -->
                                                <span>{{t('thread.320')}}</span>
                                            </li>
                                            <li>
                                                <span v-if="Long.fromString(state.followerCount).gt(999999)">{{state.followerCount}}+</span>
                                                <span v-if="Long.fromString(state.followerCount).lte(999999)">{{state.followerCount}}</span>
                                                <!-- 粉丝 -->
                                                <span>{{t('thread.330')}}</span>
                                            </li>
                                            <li>
                                                <span v-if="Long.fromString(state.followCount).gt(999999)">{{state.followCount}}+</span>
                                                <span v-if="Long.fromString(state.followCount).lte(999999)">{{state.followCount}}</span>
                                                <!-- 关注 -->
                                                <span>{{t('thread.340')}}</span>
                                            </li>
                                        </ul>
                                        <div class="action-button" v-if="!state.topic.isStaff && state.topic.userName != null && state.topic.userName != ''">
                                            <!-- 关注用户 -->
                                            <span class="action-followBox" >
                                                <!-- 已关注 -->
                                                <el-button type="primary" @click="addFollow(state.topic.userName)"><el-icon v-if="state.followText != t('thread.790')" class="plusSign"><Plus /></el-icon>{{state.followText}}</el-button>
                                            </span>
                                            <span class="privateMessageBox" >
                                                <!-- 发私信 -->
                                                <el-button type="primary" plain @click="toPrivateMessage(state.topic.userName)">{{t('thread.350')}}</el-button>
                                            </span>
                                        </div>




                                        
                                    </div>
                                </div>

                                <!-- 红包 -->
                                <div class="redEnvelopeModule clearfix" v-if="state.topic != undefined && state.topic != null  && Object.keys(state.topic).length >0 && state.giveRedEnvelope != undefined && state.giveRedEnvelope != null && Object.keys(state.giveRedEnvelope).length >0">
                                    <!-- 还有未被领取的红包 -->
                                    <div class="redEnvelope" v-if="state.giveRedEnvelope.remainingQuantity >0">
                                        <div class="box">
                                            <div class="head-bg">
                                                <div class="head"></div>
                                            </div>
                                            <div class="body">
                                                <div class="content">
                                                    <span class="avatarBox" >
                                                        <img v-if="state.giveRedEnvelope.avatarName != null" :src="state.giveRedEnvelope.avatarPath+'100x100/'+state.giveRedEnvelope.avatarName" >
                                                        <img v-if="state.giveRedEnvelope.avatarName == null" :src="state.giveRedEnvelope.avatar" width="48" height="48"/>
                                                    </span>
                                                    <!-- 给大家发个红包 -->
                                                    <span>{{t('thread.360')}}</span>
                                                </div>
                                            </div>
                                            <!-- 已拆 -->
                                            <div id="open" class="open-btn" v-if="state.giveRedEnvelope.accessUserUnwrap">已拆</div>
                                        
                                            <template v-if="!state.giveRedEnvelope.accessUserUnwrap">
                                                <!-- 开 -->
                                                <div id="notOpen" class="btn"  @click="grabRedEnvelope(state.giveRedEnvelope.id)">开</div>
                                                <!-- 已拆 -->
                                                <div id="open" class="open-btn" style="display: none;">已拆</div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="noRedEnvelope" v-if="state.giveRedEnvelope.remainingQuantity ==0">
                                        <div class="box">
                                            <!-- 您来晚了，红包已被抢光 -->
                                            <div class="content">{{t('thread.400')}}</div>
                                        </div>
                                    </div>
                                
                            
                                
                                    <!-- 已领取红包用户 -->
                                    <div class="receiveRedEnvelopeUser" v-if="state.receiveRedEnvelopeList != undefined && state.receiveRedEnvelopeList != null && state.receiveRedEnvelopeList.length >0">
                                        
                                        <div class="box">
                                            <el-tooltip popper-class="popper-transparent"  effect="dark" :hide-after="0" :show-after="100" placement="top-start" v-for="(receiveRedEnvelope,index) in state.receiveRedEnvelopeList" >
                                                <template #content>
                                                    <template v-if="receiveRedEnvelope.receiveAccount != null && receiveRedEnvelope.receiveAccount !=''">
                                                        <span v-if="receiveRedEnvelope.receiveNickname != null && receiveRedEnvelope.receiveNickname !=''">{{receiveRedEnvelope.receiveNickname}}</span>
                                                        <span v-if="receiveRedEnvelope.receiveNickname == null || receiveRedEnvelope.receiveNickname ==''">{{receiveRedEnvelope.receiveAccount}}</span>
                                                        <!-- 获得 {{receiveRedEnvelope.amount}} 元 -->
                                                        <span>{{t('thread.410',{'p1': receiveRedEnvelope.amount})}}</span>
                                                    </template> 
                                                    <!-- 此用户账号已注销 获得 {{receiveRedEnvelope.amount}} 元 -->
                                                    <span v-if="(receiveRedEnvelope.receiveAvatarName == null || receiveRedEnvelope.receiveAvatarName=='') && (receiveRedEnvelope.receiveAccount == null || receiveRedEnvelope.receiveAccount =='')">{{t('thread.90')}} {{t('thread.410',{'p1': receiveRedEnvelope.amount})}} </span>

                                                </template>
                                                <img v-if="receiveRedEnvelope.receiveAvatarName != null && receiveRedEnvelope.receiveAvatarName != ''" class='avatar'  :src="receiveRedEnvelope.receiveAvatarPath+'100x100/'+receiveRedEnvelope.receiveAvatarName"/>
                                                <img v-if="(receiveRedEnvelope.receiveAvatarName == null || receiveRedEnvelope.receiveAvatarName=='') && (receiveRedEnvelope.receiveAccount != null && receiveRedEnvelope.receiveAccount !='')" class='avatar' :src="receiveRedEnvelope.receiveAvatar"/>

                                                <img v-if="(receiveRedEnvelope.receiveAvatarName == null || receiveRedEnvelope.receiveAvatarName=='') && (receiveRedEnvelope.receiveAccount == null || receiveRedEnvelope.receiveAccount =='')" class='avatar' :src="receiveRedEnvelope.receiveAvatar"/>
                                            </el-tooltip>
                                        </div>
                                        <div class="more" v-if="state.receiveRedEnvelope_more">
                                            <!-- title="更多" -->
                                            <Icon name="angle-down" size="15px" class="icon" :title="t('thread.420')" @click="queryReceivedRedEnvelope(state.giveRedEnvelope.id,state.receiveRedEnvelopeCurrentPage+1)"/>
                                        </div>
                                    </div>
                                </div>
                                
                                <!--  相似话题 集合 -->
                                <div class="similarTopicModule clearfix" v-if="state.similarTopicList != null && state.similarTopicList.length >0">
                                    <div class="similarTopic">
                                        <!-- 相关话题-->
                                        <div class="title">{{t('thread.430')}}</div>
                                        <ul class="topicList">
                                            <li class="topic-title " v-for="similarTopic in state.similarTopicList">
                                                <router-link tag="a" :to="{path: '/thread', query:{ topicId : similarTopic.id}}">
                                                    {{similarTopic.title}}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!--  Markdown目录 -->
                                <div class="markdownTocModule clearfix" v-show="state.isMarkdownToc && state.markdownTocNodeInfoList != null && state.markdownTocNodeInfoList.length >0">
                                    <div class="toc">
                                        <!-- 目录-->
                                        <div class="title">{{t('thread.440')}}</div>
                                        <el-scrollbar ref="markdownTocScrollbarRef" max-height="300px" always class="scrollbar">
                                            <ul class="tocList" ref="markdownTocInnerRef">
                                                <li class="toc-txt" v-for="markdownTocNodeInfo in state.markdownTocNodeInfoList">
                                                    <span  :ref="el => {if(el) markdownTocInnerRefs[markdownTocNodeInfo.tocId] = el}" :title="markdownTocNodeInfo.txt" :style="tocStyle(markdownTocNodeInfo.tag)" :class="{'active-item': state.markdownTocActiveItemId === markdownTocNodeInfo.tocId}" @click="scrollToTocItem(markdownTocNodeInfo.tocId)">
                                                        {{markdownTocNodeInfo.txt}}
                                                    </span>
                                                </li>
                                            </ul>
                                        </el-scrollbar>
                                    </div>
                                </div>
                            </div>
                        </el-affix>
                    </div>
                </div>
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
    import { onMounted, ref ,nextTick, getCurrentInstance, ComponentInternalInstance, reactive, onUnmounted, computed,onUpdated, watch, watchEffect, onBeforeUpdate,} from 'vue'
    import { ElImage, ElMessage, ElMessageBox, ElScrollbar, UploadFile, UploadProps, UploadRawFile, UploadUserFile} from 'element-plus'
    import { appStore } from "@/store";
    import { useActiveMeta, useMeta} from 'vue-meta'
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import { PageView,Topic,Comment, Reply, GiveRedEnvelope, ReceiveRedEnvelope, ReportType, TocNodeInfo, User, VoteTheme, VoteOption } from "@/types/index";
    import { AxiosResponse } from 'axios';
    import { letterAvatar } from '@/utils/letterAvatar';
    import Icon from "@/components/icon/Icon.vue";
    import Long from "long";
    import Hls from 'hls.js';
    import DPlayer from 'dplayer';
    import { escapeHtml, escapeVueHtml, unescapeHtml } from '@/utils/escape';
    import { getAllUrlParam, getElementTop, getLanguageClassName, processErrorInfo } from '@/utils/tool';
    import { createEditor } from '@/utils/editor';
    import Prism from "prismjs";
    import {nativeQueryVideoRedirect, nativeRefreshToken } from '@/utils/http';
    import mermaid from "mermaid";
    import katex from 'katex'
    import 'katex/dist/katex.css'   
    import { markdownPlugins,sanitize, setMarkdownLanguage } from '@/utils/markdownEditor';
    import { Plus } from '@element-plus/icons-vue';
    import { toggleEditor } from '@/utils/markdownPlugin/plugin-toggle-editor';
    import { help } from '@/utils/markdownPlugin/plugin-help';
    import { emoji } from '@/utils/markdownPlugin/plugin-emoji';
    import { imageUpload } from '@/utils/markdownPlugin/plugin-image-upload';
    import { pasteImageUpload } from '@/utils/markdownPlugin/plugin-paste-image';
    import { Editor } from '@bytemd/vue-next'
    import type { BytemdPlugin,BytemdEditorContext } from 'bytemd'
    import config from '@/utils/markdownPlugin/plugin-config';
    import { createMarkdownToc,tocStyle,scrollToTocItem} from '@/utils/markdownToc';
    import { mention } from '@/utils/markdownPlugin/plugin-mention';
    import { aiPopUp } from '@/components/aiAssistant/aiAssistantTool';
    import { ai } from '@/utils/markdownPlugin/plugin-ai';
    import { createJumpAttribute } from '@/utils/jumpProcess';
    import { useI18n } from 'vue-i18n';
    import debounce from "lodash/debounce";
    let { t } = useI18n();

    mermaid.mermaidAPI.initialize({ startOnLoad: false });

    const { proxy,appContext } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();

    //强制收缩置顶功能
    const shrinkRef = ref(false);

    //const formAddCommentRef = ref<FormInstance>();
    const formAddCommentContentRef = ref()
    const right_ref = ref()

    //markdown目录滚动条
    const markdownTocScrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
    //markdown目录内层
    const markdownTocInnerRefs =ref({}) as any

    //页头组件
    const headerComponent = ref();

    //话题内容
    const topicRefs = ref({}) as any;
   
    
    //html页元信息
    const computedMeta = computed(() => ({ 
        title: store.state.title,
        meta: [
            {
                name: 'keywords',
                content: store.state.keywords
            },{
                name: "description",
                content: store.state.description
            }
        ]
    }))
    const { meta } = useMeta(
        computedMeta
    )
    //监听网站标题
    watchEffect(() => {
        const titleValue = computedMeta.value.title
        if(titleValue != null && titleValue != '' && state.topic != null && Object.keys(state.topic).length > 0){
            meta.title = (state.topic.title != null ? state.topic.title : '') + ' - ' + computed(() => store.state.title).value;		
            meta.meta[0].content = (state.topic.title != null ? state.topic.title : '') +  ' - ' + computed(() => store.state.title).value;
            meta.meta[1].content = (state.topic.title != null ? state.topic.title : '') +  ' - ' + computed(() => store.state.title).value;
        }
    }, {
        flush: 'post'//在组件更新后触发，第一次运行需要组件渲染完成才执行
    })
    
    const state = reactive({
        topicId:'',
        topic: {} as Topic,
        topic_loading:true,//是否显示话题骨架屏
  
        playerIdList: [] as Array<string>,//视频播放Id列表
		playerObjectList: [] as Array<any>,//视频播放对象集合
        playerHlsList: [] as Array<any>,//视频播放流对象集合
		playerNodeList: [] as Array<any>,//视频节点对象集合

        viewNumber:10,//回复(展开/收缩) 展示数量
        replyExpandOrShrink :new Map(), //回复展开/收缩 map格式 key:评论Id value:是否展开

        isFavorited :false,//用户是否已经收藏话题
        favoriteCount : '0',//话题用户收藏总数
        alreadyLiked:false,//用户是否已经点赞该话题
        likeCount : '0',//话题用户点赞总数
        hidePasswordIndex:0,//隐藏标签密码框索引
        isReplyTopicVisible:false,//是否包含回复话题可见隐藏标签

        alreadyLikedComment: new Map(),//用户是否已经点赞该评论
        commentLikeCount : new Map(),//评论用户点赞总数

        alreadyLikedCommentReply: new Map(),//用户是否已经点赞该评论回复
        commentReplyLikeCount : new Map(),//评论回复用户点赞总数

        commentList:{} as Array<Comment>,
        totalrecord : 0, //总记录数
        currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数
        comment_loading:true,//是否显示评论骨架屏
        isShowPage:false,//是否显示分页 maxresult没返回结果前就显示会导致分页栏显示页码错误
        
        isLoadingComplete : false,//查询‘添加评论表单‘是否加载完成
        allowComment:false,//是否显示评论表单
        availableTag:[] as Array<string>,//评论编辑器允许使用标签
        fileSystem:0,//文件存储系统
        supportEditor:10,//支持编辑器
        addCommentMarkdownContent:'',//markdown评论内容
        isAddCommentMarkdown:false,//是否使用markdown评论编辑器


        popup_mentionUser :false,//是否弹出选择提及用户表单
        keyword :'',//关键词
        mentionUserList:[] as Array<User>,//提及用户集合
        mentionUserEditorId:'',//提及用户编辑器Id
        currentMarkdownEditor:{} as BytemdEditorContext | undefined,//Markdown编辑器打开‘@提及’弹窗的编辑器对象

        addCommentEditor :{} as any,//添加评论编辑器
        addCommentEditorCreateParameObject :{} as any,//添加评论编辑器的创建参数
        
        
        quoteFormView : new Map(),//评论引用表单  key:评论Id value:是否显示
        quoteEditorMap:new Map(),//引用评论富文本编辑器集合 key:评论Id value:富文本编辑器
        quoteEditorCreateParameMap:new Map(),//引用评论编辑器的创建参数 key:评论Id value:编辑器参数对象
        quoteData : new Map(),//引用数据 map格式 key:评论Id value:引用html数据

        
        isQuoteCommentMarkdownMap: new Map(),//引用评论是否使用markdown编辑器  key:评论Id value:是否为markdown编辑器
        quoteCommentMarkdownContent : {} as any,//引用评论markdown编辑内容 key:评论Id value:评论内容
        


        editCommentFormView : new Map(),//修改评论表单  key:评论Id value:是否显示
        editCommentEditorMap:new Map(),//修改评论富文本编辑器集合 key:评论Id value:富文本编辑器
        editCommentEditorCreateParameMap:new Map(),//修改评论编辑器的创建参数 key:评论Id value:编辑器参数对象
       

        isEditCommentMarkdownMap: new Map(),//修改评论是否使用markdown编辑器  key:评论Id value:是否为markdown编辑器
        editCommentMarkdownContent : {} as any,//修改评论markdown编辑内容 key:评论Id value:评论内容

        isPageCall :false,//是否由分页按钮调用


        quoteElementNodes:new Map<string,HTMLTextAreaElement | null>(),//引用评论项Element节点集合
		editCommentElementNodes:new Map<string,HTMLTextAreaElement | null>(),//修改评论项Element节点集合
		replyElementNodes:new Map<string,HTMLTextAreaElement | null>(),//回复列表项Element节点集合
        addReplyElementNodes:new Map<string,HTMLTextAreaElement | null>(),//添加回复Element节点集合
        addReplyFriendElementNodes:new Map<string,HTMLTextAreaElement | null>(),//添加回复对方Element节点集合
        editReplyElementNodes:new Map<string,HTMLTextAreaElement | null>(),//修改回复Element节点集合   key:replyId value:el
        
        addReplyFormView : new Map(),//添加回复表单  key:评论Id value:是否显示
        addReplyEditorMap:new Map(),//添加回复富文本编辑器集合 key:评论Id value:富文本编辑器
        addReplyEditorCreateParameMap:new Map(),//添加回复编辑器的创建参数 key:评论Id value:编辑器参数对象


		addReplyFriendFormView : new Map(),//添加回复对方表单  key:回复Id value:是否显示
        addReplyFriendEditorMap:new Map(),//添加回复对方富文本编辑器集合 key:回复Id value:富文本编辑器
        addReplyFriendEditorCreateParameMap:new Map(),//添加回复对方编辑器的创建参数 key:回复Id value:编辑器参数对象

        editReplyFormView : new Map(),//修改回复表单  key:修改Id value:是否显示
        editReplyEditorMap:new Map(),//修改回复富文本编辑器集合 key:修改Id value:富文本编辑器
        editReplyEditorCreateParameMap:new Map(),//修改回复编辑器的创建参数 key:修改Id value:编辑器参数对象

        showCaptcha:new Map<string,boolean>(),//是否显示验证码  本项及以下几项的key格式为 key:模块+id  例如：添加评论key=addComment-话题Id   修改评论key=editComment-评论Id    添加引用评论key=addQuoteComment-评论Id    添加回复key=addReply-评论Id   修改回复key=editReply-回复Id
        captchaKey: new Map<string,string>(),//验证码key
        captchaValue: {} as any,//验证码值
        imgUrl: new Map<string,string>(),//验证码图片
        allowSubmit:new Map<string,boolean>(),//提交按钮disabled状态

        followerCount:'0',//粉丝总数
        followText: t('thread.340'),//关注文本   关注
        answerCount:'0',//回答总数
        followCount:'0',//关注总数

        giveRedEnvelope :{} as GiveRedEnvelope,//红包
        receiveRedEnvelopeList:[] as Array<ReceiveRedEnvelope>,//领取红包用户集合
		selectedReceiveRedEnvelopeId:'',//选中领取红包用户
		receiveRedEnvelopeCurrentPage:0,//领取红包用户当前页
		receiveRedEnvelope_more:false,//是否显示更多领取红包用户

        voteTheme :{} as VoteTheme,//投票主题
        voterCount :'0',//总票数
        votePercentage : new Map<string,number>(),//投票比例 key:选项Id value:比例
        
        similarTopicList:[] as Array<Topic>, //相似话题集合

        addReportFormView:false,//举报表单
        reportTypeId : ''as string,//举报分类Id
        reason : ''as string,//举报理由
        fileList : [] as UploadUserFile[],//上传表单图片列表
        parameterId : '' as string,//举报参数Id
		module: 0 as number,//举报模块
        reportTypeList:[] as Array<ReportType>,//举报分类列表
        reportMaxImageUpload: 0 as number,//图片允许最大上传数量
        show_giveReason:false,//是否显示说明理由表单   

        localImageUrl: '' as string | undefined,//本地图片地址 例如blob:http://127.0.0.1:8080/cfab3833-cbb0-4072-a576-feaf8fb19e5f
        isImageViewer: false,//是否显示图片查看器

        
        line : new Map(),//楼中楼的线  key:回复Id value:是否显示
        dot : new Map(),//楼中楼的点  key:回复Id value:是否显示
        
        affix_offset:10,//固钉偏移距离


        addCommentEditorPlugin:[] as BytemdPlugin[],//添加评论Markdown编辑器插件
        quoteCommentEditorPlugin:[] as BytemdPlugin[],//引用评论Markdown编辑器插件
        editCommentEditorPlugin:[] as BytemdPlugin[],//修改评论Markdown编辑器插件

        isMarkdownToc:true,//是否显示markdown目录
        markdownTocNodeInfoList: [] as Array<TocNodeInfo>,//markdown目录节点信息
        markdownTocActiveItemId:'' as string,//markdown目录选中项Id
    });

     //错误
     const error = reactive({
        content : new Map<string,string>(),//评论和引用内容错误
        replyContent: new Map<string,string>(),//回复内容错误
        captchaValue : new Map<string,string>(),
        comment: new Map<string,string>(),//评论和引用错误
        reply: new Map<string,string>(),//回复错误
        reportTypeId:'',//举报分类Id
        reason:'',//举报理由
        imageFile:'',//举报图片
        report:'',//举报

        keyword :'',
    })

    //修改评论ref节点处理
    const handleEditCommentNode = (el: any,commentId: string) => {
        if(el != null){
            state.editCommentElementNodes.set(commentId, el);
        }
    }
    //引用评论ref节点处理
    const handleQuoteNode =(el: any,commentId: string) => {
        if(el != null){
            state.quoteElementNodes.set(commentId, el);
        }
    }
    //回复ref节点处理
	const handleReplyNode = (el: any, replyId: string) => {
        if(el != null){
            state.replyElementNodes.set(replyId, el);
        }
	}
    //添加回复ref节点处理
    const handleAddReplyNode = (el: any,commentId: string) => {
        if(el != null){
            state.addReplyElementNodes.set(commentId, el);
        }
    }
    //添加回复对方ref节点处理
    const handleAddReplyFriendNode = (el: any, replyId: string) => {
        if(el != null){
            state.addReplyFriendElementNodes.set(replyId, el);
        }
    }
     //修改回复ref节点处理
    const handleEditReplyNode = (el: any, replyId: string) => {
        if(el != null){
            state.editReplyElementNodes.set(replyId, el);
        }
    }
    

    //处理添加评论Markdown
    const handleAddCommentMarkdownChange = (value: string) => {
        state.addCommentMarkdownContent = value;
    }

    //评论白名单
    const commentSanitize = (schema: any) => {
        schema = sanitize(schema);
        return schema;
    }


     //处理切换到富文本编辑器
     const handleAddCommentToggleRichtextEditor = (editorId: string) => {
        state.isAddCommentMarkdown = false;
        nextTick(()=>{
            if (Object.keys(state.addCommentEditorCreateParameObject).length != 0) {//不等于空
                //创建富文本编辑器
                state.addCommentEditor = createEditor(
                    state.addCommentEditorCreateParameObject.ref, 
                    state.addCommentEditorCreateParameObject.availableTag, 
                    state.addCommentEditorCreateParameObject.uploadPath, 
                    state.addCommentEditorCreateParameObject.userGradeList,
                    state.fileSystem,
                    ()=>{
                        handleAddCommentToggleMarkdownEditor(editorId);
                    },
                    ()=>{
                        //提及弹窗
                        mentionPopUp(editorId,undefined)
                    },
                    ()=>{
                        //AI弹窗
                        aiPopUp(proxy,appContext,editorId, state.addCommentEditorCreateParameObject.uploadPath,'file',state.fileSystem,state.isAddCommentMarkdown,state.addCommentEditor,undefined)
                    }
                );
                state.addCommentEditor.html(state.addCommentEditorCreateParameObject.html);//切换时设置富文本内容
            }
        })
    }

    //处理添加评论切换到Markdown编辑器
    const handleAddCommentToggleMarkdownEditor = (editorId: string) => {
        if (Object.keys(state.addCommentEditor).length != 0) {//不等于空
            state.addCommentEditorCreateParameObject.html = state.addCommentEditor.html();//切换时保存富文本内容
            state.addCommentEditor.remove();
            state.addCommentEditor = {};
        }
        state.isAddCommentMarkdown = true;
    }


    //处理引用评论Markdown
    const handleQuoteCommentMarkdownChange = (value: string, commentId: string) => {
       Object.assign(state.quoteCommentMarkdownContent, {[commentId] : value});
    }


    //处理引用评论切换到富文本编辑器
    const handleQuoteCommentToggleRichtextEditor = (editorId: string) => {
        let commentId = editorId.split("_")[1];
        state.isQuoteCommentMarkdownMap.set(commentId,false);

        nextTick(()=>{
            
            let quoteEditorCreateParameObject = state.quoteEditorCreateParameMap.get(commentId);
          
            if (quoteEditorCreateParameObject !=undefined && Object.keys(quoteEditorCreateParameObject).length != 0) {//不等于空
                
                //创建富文本编辑器
                let quoteCommentEditor = createEditor(
                    quoteEditorCreateParameObject.ref, 
                    quoteEditorCreateParameObject.availableTag, 
                    quoteEditorCreateParameObject.uploadPath, 
                    quoteEditorCreateParameObject.userGradeList,
                    state.fileSystem,
                    ()=>{
                        handleQuoteCommentToggleMarkdownEditor(editorId);
                    },
                    ()=>{
                        //提及弹窗
                        mentionPopUp(editorId,undefined)
                    },
                    ()=>{
                        //AI弹窗
                        aiPopUp(proxy,appContext,editorId, quoteEditorCreateParameObject.uploadPath,'file',state.fileSystem,state.isQuoteCommentMarkdownMap.get(commentId),quoteCommentEditor,undefined)
                    }
                );
                quoteCommentEditor.html(quoteEditorCreateParameObject.html);//切换时设置富文本内容
                state.quoteEditorMap.set(commentId, quoteCommentEditor);
            }
        })
    }

    //处理引用评论切换到Markdown编辑器
    const handleQuoteCommentToggleMarkdownEditor = (editorId: string) => {
        let commentId = editorId.split("_")[1];

        let quoteEditor = state.quoteEditorMap.get(commentId);
        if (quoteEditor !=undefined && Object.keys(quoteEditor).length != 0) {//不等于空
            let quoteEditorCreateParameObject = state.quoteEditorCreateParameMap.get(commentId);
            quoteEditorCreateParameObject.html = quoteEditor.html();//切换时保存富文本内容
            quoteEditor.remove();
            quoteEditor = {};
        }

        state.isQuoteCommentMarkdownMap.set(commentId,true);                
    }


    //处理修改评论Markdown
    const handleEditCommentMarkdownChange = (value: string, commentId: string) => {
       Object.assign(state.editCommentMarkdownContent, {[commentId] : value});
    }

    //显示、隐藏提及弹窗
    const mentionPopUp = (editorId: string,ctx:BytemdEditorContext| undefined) => {
       // console.log("显示、隐藏提及弹窗",editorId);
      
        state.popup_mentionUser = true;
        state.mentionUserEditorId = editorId;
        state.keyword = "";
        state.mentionUserList.length = 0;
        state.currentMarkdownEditor = ctx;
        error.keyword = "";
    }

    //关闭提及用户弹出框
    const closeMentionUser = () => {
        state.popup_mentionUser = false;
        state.currentMarkdownEditor = undefined;
    }

    //选择提及用户
    const selectMentionUser = (mentionUser:User) => {
        let url = "user/control/home?userName="+mentionUser.userName;
        let title = mentionUser.nickname != null && mentionUser.nickname != '' ? '@'+mentionUser.nickname : '@'+mentionUser.account;


        let forum = state.mentionUserEditorId.split("_")[0];//版块
        
        if(forum == 'addComment'){//添加评论
            if(state.isAddCommentMarkdown){//是否使用markdown评论编辑器
                state.currentMarkdownEditor?.editor.replaceSelection(`${title}`);
            }else{
                state.addCommentEditor.insertMention(url,title);
            }
        }else if(forum == 'editComment'){//修改评论
            let commentId:string = state.mentionUserEditorId.split("_")[1];//Id

            if(state.isEditCommentMarkdownMap.get(commentId)!= undefined && state.isEditCommentMarkdownMap.get(commentId) == true){//修改评论是否使用markdown编辑器  key:评论Id value:是否为markdown编辑器
                state.currentMarkdownEditor?.editor.replaceSelection(`${title}`);
            }else{
                let editor = state.editCommentEditorMap.get(commentId);
                editor.insertMention(url,title);
            }
        }else if(forum == 'quoteComment'){//引用评论
            let commentId:string = state.mentionUserEditorId.split("_")[1];//Id


            if(state.isQuoteCommentMarkdownMap.get(commentId)!= undefined && state.isQuoteCommentMarkdownMap.get(commentId)){//引用评论是否使用markdown编辑器  key:评论Id value:是否为markdown编辑器
                state.currentMarkdownEditor?.editor.replaceSelection(`${title}`);

            }else{
                let editor = state.quoteEditorMap.get(commentId);
                editor.insertMention(url,title);
            }
        }else if(forum == 'addReply'){//添加回复
            let commentId:string = state.mentionUserEditorId.split("_")[1];//Id


            let editor = state.addReplyEditorMap.get(commentId);
            editor.insertMention(url,title);
            
        }else if(forum == 'addReplyFriend'){//添加回复对方
            let replyId:string = state.mentionUserEditorId.split("_")[1];//Id


            let editor = state.addReplyFriendEditorMap.get(replyId);
            editor.insertMention(url,title);
            
        }else if(forum == 'editReply'){//修改回复
            let replyId:string = state.mentionUserEditorId.split("_")[1];//Id

            let editor = state.editReplyEditorMap.get(replyId);
            editor.insertMention(url,title);
            
        }

        
        closeMentionUser();
    }


    //搜索提及用户
    const searchMentionUser = () => {
        state.mentionUserList.length = 0
        error.keyword = "";
        if(state.keyword == null || state.keyword.trim() == ''){
            error.keyword = t('thread.450');//请输入用户账号或呢称
            return;
        }
        proxy?.$axios({
            url: '/user/control/queryUser',//暂时使用查询提及用户API
            method: 'get',
            params:  {keyword:state.keyword},
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
                    
                    state.mentionUserList = userList;
                }else{
                    error.keyword = t('thread.460');//当前用户不存在
                }
                
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });

    }


    /**
     * 回复内容显示
     * @param commentId 评论Id
     * @param index 当前回复内容在列表中的索引
     */
    const getReplyVisibility = (commentId: string, index: number) => {
        return computed(() => {
            // 获取当前评论的折叠/展开状态
            const isExpanded = state.replyExpandOrShrink.get(commentId);
            
            // 如果 isExpanded 为 true (显式展开) -> 显示
            if (isExpanded === true) {
                return true;
            }
            
            // 如果 isExpanded 为 false (显式折叠) 并且 index < state.viewNumber (在可视数量内) -> 显示
            if (isExpanded === false && index < state.viewNumber) {
                return true;
            }
            
            //  默认或超出可视数量 -> 隐藏
            return false;
        });
    };

    //展示/隐藏回复
    const telescopicReply = (commentId:string) => {
        let status = state.replyExpandOrShrink.get(commentId);
        if(status){
            state.replyExpandOrShrink.set(commentId, false); //收缩

            if (state.commentList != null && state.commentList.length > 0) {
                for(let i=0;i<state.commentList.length; i++){
                    let comment = state.commentList[i];
                    if(comment.id == commentId){
                        if(comment.replyList != null && comment.replyList.length >=state.viewNumber){
                            //展开前最后一条回复
                            let reply = comment.replyList[state.viewNumber-1];

                            
                            //跳转到展开前回复栏
                            nextTick(()=> {
                                let replyElement = state.replyElementNodes.get(reply.id);
                                if(replyElement){
                                    window.scrollTo({
                                        top: getElementTop(replyElement) +replyElement.offsetHeight - 110,
                                        behavior: 'smooth'
                                    })
                                }
                            });
                        }
                        break;
                    }
                    
                }
            }
            
        }else{
            state.replyExpandOrShrink.set(commentId, true); //伸展
        }

        closeReplyLevel()
    }


    //话题解锁
    const onTopicUnhide = (hideType: number,hidePassword: string) => {
        let formData = new FormData();
        formData.append('topicId', state.topicId);
        formData.append('hideType',  String(hideType));
        if(hideType == 10){
            if(hidePassword != undefined && hidePassword != ""){
                formData.append('password',  hidePassword);
            }else{
                ElMessage({
                    showClose: true,
                    message: t('thread.470'),//密码不能为空
                    type: 'error',
                })
                return;
            }
        }

        ElMessageBox.confirm(t('thread.480'),{//确定解锁?
            // type: 'warning',
            cancelButtonText: t('common.60'),//取消
            confirmButtonText: t('common.90'),//确定
            lockScroll: false,
        })
        .then(() => {
            proxy?.$axios({
                url: '/user/control/topic/unhide',
                method: 'post',
                data: formData
            })
            .then((response: AxiosResponse) => {
                if(response){

                    const result: any = response.data;
                
                    if(result.success){
                        ElMessage({
                            showClose: true,
                            message: t('thread.490'),//话题解锁成功
                            type: 'success',
                            onClose:()=>{
                                
                            }
                        })
                        //查询话题
                        queryTopic(state.topicId,()=>{});//调用父组件方法
                    }else{
                        //处理错误信息
                        processErrorInfo(result.error as Map<string,string> ,  error,()=>{});
                        
                    }
                }
            })
            .catch((error: any) =>{
                console.log(error);
            });
        })
        .catch(() => {
            //取消
        })

        
    }

   
    //查询话题
    const queryTopic = (topicId: string,callback :any) => {
		proxy?.$axios({
            url: '/queryTopicDetail',
            method: 'get',
            params:  { 
                topicId: topicId,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            return response?.data
        })
        .then((data: Topic) => {
            if(data){
                //清空播放器
                clearVideoPlayer();    
                
                state.markdownTocNodeInfoList.length = 0;//清空markdown目录节点信息
                state.markdownTocActiveItemId = '';//清空markdown目录选中项Id

                //处理自定义标签
                let contentNode = document.createElement("div");
                contentNode.innerHTML = data.content;
                bindNode(contentNode);
               
                data.content = escapeVueHtml(contentNode.innerHTML);

                
                state.topic = data;

                if(state.topic.nickname != null && state.topic.nickname !=''){
                    state.topic.avatar = letterAvatar(state.topic.nickname, 70);
                }else{
                    state.topic.avatar = letterAvatar(state.topic.account, 70);
                }


                nextTick(()=>{
                    setTimeout(function() {
                        renderVideoPlayer();//渲染视频播放器
                    }, 30);
                    
                    
                    let topicRefValue = topicRefs.value['topic_'+state.topicId]
                    if(topicRefValue != undefined){
                        //渲染代码
                        renderBindNode(topicRefValue); 
                        if(data.isMarkdown != null && data.isMarkdown == true){
                            //渲染目录
                            state.markdownTocNodeInfoList = createMarkdownToc(topicRefValue);
                            if(state.markdownTocNodeInfoList != null && state.markdownTocNodeInfoList.length >0){
                                //默认选中第一项
                                state.markdownTocActiveItemId = state.markdownTocNodeInfoList[0].tocId;

                                window.addEventListener('scroll', onMarkdownTocScroll, true)
                            }
                        }
                    }


                    
                });


                //回调
                callback();
            }
            state.topic_loading = false;//是否显示话题骨架屏
        })
        .catch((error: any) =>{
            console.log(error);
        });
	}

    
   
    //Markdown目录滚动事件
    const onMarkdownTocScroll = (e:any) => {
        // 当前页面滚动的距离
        let scrollTop = e.target.documentElement?.scrollTop || e.target.body?.scrollTop
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

       

        if(scrollTop){
            //滚动超出话题内容层隐藏

            let topicRefValue = topicRefs.value['topic_'+state.topicId]
            if(topicRefValue != undefined){
                if(scrollTop > topicRefValue.offsetTop + topicRefValue.offsetHeight){
                    state.isMarkdownToc = false;
                    return;
                }else{
                    state.isMarkdownToc = true;
                }
                
            }



            let currentTocId = state.markdownTocNodeInfoList[0].tocId // 默认值第一个标题

            for (let item of state.markdownTocNodeInfoList) {

                let offsetTop = (document.querySelector('#'+item.tocId) as any).offsetTop

                if (scrollTop >= offsetTop-80) {
                    currentTocId = item.tocId
                } else break
            }

            if (currentTocId !== state.markdownTocActiveItemId) {
                state.markdownTocActiveItemId = currentTocId;
                
            }

            // 如果到底部
            if (scrollTop + windowHeight === scrollHeight) {
                state.markdownTocActiveItemId = state.markdownTocNodeInfoList[state.markdownTocNodeInfoList.length - 1].tocId
            }

            //目录展示栏选中项居中
            let tocRefValue = markdownTocInnerRefs.value[state.markdownTocActiveItemId]
            if(tocRefValue != undefined){
                let maxHeight = markdownTocScrollbarRef.value!.wrapRef!.style.getPropertyValue("max-height");

                //删除单位
                let formatMaxHeight = maxHeight.substring(0, maxHeight.length - 2);
                
               //markdownTocScrollbarRef.value!.setScrollTop(tocRefValue.offsetTop - parseInt(formatMaxHeight)/2);
                
             
                //总帧数
                let countFrame = 3;
                //当前的位置
                let currentTop = markdownTocScrollbarRef.value!.wrapRef!.scrollTop;

                //要滚动到的位置
                let top = tocRefValue.offsetTop - parseInt(formatMaxHeight)/2;

                //步进
                let step =(top - currentTop)/countFrame;

                //当前帧
                let frame = 0;
                let rafId = null;
                /**
                 * 回调函数
                 * @param time requestAnimationFrame 调用该函数时，自动传入的一个时间
                 */
                function requestAnimation(time:any) {
                  //  console.log(time);
                    // 动画没有执行完，则递归渲染
                    if (frame < countFrame) {
                        frame++;
                        markdownTocScrollbarRef.value!.setScrollTop(currentTop + step * frame);
                        // 渲染下一帧
                        rafId = window.requestAnimationFrame(requestAnimation);
                    }else{
                        window.cancelAnimationFrame(time);
                    }

                }
                // 渲染第一帧
                window.requestAnimationFrame(requestAnimation);
                


            }
        }
    }
    



     //查询评论列表
     const queryCommentList = (topicId: string,commentId: string, replyId: string, page:number|undefined) => {
        let params = {} as any;
        params.topicId = topicId;
        if(commentId != null && commentId != ''){
            params.commentId = commentId;
        }
        if(page != undefined){
            params.page = page;
        }

        proxy?.$axios({
            url: '/queryCommentPage',
            method: 'get',
            params:  params,
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            
            return response?.data
        })
        .then((data: PageView<Comment>) => {
            if(data){
                 //清空

                state.replyElementNodes.clear();
            
                state.commentList = {} as Array<Comment>;


                if(data.records != null && data.records.length >0){
                    for(let i:number=0; i<data.records.length; i++){
                        let comment = data.records[i];


                        if(!state.replyExpandOrShrink.get(comment.id)){//如果之前是收缩的或不存在的
                            state.replyExpandOrShrink.set(comment.id, false); //是否展开
                        }

                        

                        if(comment.nickname != null && comment.nickname !=''){
                            comment.avatar = letterAvatar(comment.nickname, 60);
                        }else{
                            comment.avatar = letterAvatar(comment.account, 60);
                        }
                       

                        if(comment.replyList != null && comment.replyList.length >0){
                            for(let j:number=0; j<comment.replyList.length; j++){
                                let reply = comment.replyList[j];
                                if(reply.nickname != null && reply.nickname !=''){
                                    reply.avatar = letterAvatar(reply.nickname, 40);
                                }else{
                                    reply.avatar = letterAvatar(reply.account, 40);
                                }

                                if(reply.friendUserName != null && reply.friendUserName != ''){
                                    if(reply.friendNickname != null && reply.friendNickname !=''){
                                        reply.friendAvatar = letterAvatar(reply.friendNickname, 40);
                                    }else{
                                        reply.friendAvatar = letterAvatar(reply.friendAccount, 40);
                                    }
                                }
                                //处理图片放大标签
                                let contentNode = document.createElement("div");
                                contentNode.innerHTML = reply.content;
                                bindNode(contentNode);
                                reply.content = escapeVueHtml(contentNode.innerHTML);
                            }
                        }
                        

                        //组装引用数据
                        if(comment.quoteList != null && comment.quoteList.length >0){
                            let quoteContent = "";
                            for (let j = 0; j <comment.quoteList.length; j++) {
                                let quote = comment.quoteList[j];

                                let avatarHtml = "";
                                if(quote.account != null && quote.account != ''){
                                    avatarHtml += "<router-link class=\"avatarBox\"  tag=\"a\" :to=\"{path: '/user/control/home', query: {userName: '"+quote.userName+"'}}\">";
                                    if(quote.avatarName != undefined && quote.avatarName != null && quote.avatarName != ''){
                                        avatarHtml += "<img src=\""+quote.avatarPath+"100x100/"+quote.avatarName+"\">";			
                                    }		
                                    if(quote.avatarName == undefined || quote.avatarName == null || quote.avatarName == ''){
                                        let char = (quote.nickname != null && quote.nickname != '') ? quote.nickname : quote.account;
                                        let width = 30;//头像宽
                                        avatarHtml += "<img src=\""+letterAvatar(char, width)+"\">";
                                        
                                    }
                                    avatarHtml += "</router-link>";
                                }
                                
                                if(quote.account == null || quote.account == ''){
                                    avatarHtml += "<span class='avatarBox'>";
                                    if(quote.avatarName != undefined && quote.avatarName != null && quote.avatarName != ''){
                                        avatarHtml += "<img src=\""+quote.avatarPath+"100x100/"+quote.avatarName+"\">";			
                                    }		
                                    if(quote.avatarName == undefined || quote.avatarName == null || quote.avatarName == ''){
                                        let char = (quote.nickname != null && quote.nickname != '') ? quote.nickname : quote.account;
                                        let width = 30;//头像宽
                                        avatarHtml += "<img src=\""+letterAvatar(char, width)+"\">";
                                        
                                    }
                                    avatarHtml += "</span>";
                                    //已注销
                                    avatarHtml += "<span class='cancelNickname'>"+t('thread.140')+"</span>";
                                    
                                }

                                let quoteCancelAccountHtml = "";
                                if(quote.account == null || quote.account == ''){
                                    //此用户账号已注销
                                    quoteCancelAccountHtml = "<div class='cancelAccount'>"+t('thread.90')+"</div>";
                                }
                                //的评论
                                //quoteContent = "<div class=\"quoteComment\">"+quoteContent+"<span class=\"userName\">"+avatarHtml+"<router-link tag=\"span\" :to=\"{path: '/user/control/home', query: {userName: '"+quote.userName+"'}}\">"+(quote.nickname != null && quote.nickname != '' ? escapeHtml(quote.nickname) : escapeHtml(quote.account))+"</router-link>&nbsp;的评论：</span><br/><div class=\"quoteContent\">"+quote.content+quoteCancelAccountHtml+"</div></div>";
                                quoteContent = "<div class=\"quoteComment\">"+quoteContent+"<span class=\"userName\"><i18n-t keypath=\"thread.500\" scope=\"global\"> <template #p1> "+avatarHtml+"<router-link tag=\"span\" :to=\"{path: '/user/control/home', query: {userName: '"+quote.userName+"'}}\">"+(quote.nickname != null && quote.nickname != '' ? escapeHtml(quote.nickname) : escapeHtml(quote.account))+"</router-link></template></i18n-t></span><br/><div class=\"quoteContent\">"+quote.content+quoteCancelAccountHtml+"</div></div>";
        

                                
                            }
                            
                            state.quoteData.set(comment.id, escapeVueHtml(quoteContent));
                        }

          
                        //处理图片放大标签
                        let contentNode = document.createElement("div");
                        contentNode.innerHTML = comment.content;
                        bindNode(contentNode);
                        comment.content = escapeVueHtml(contentNode.innerHTML);



                    }
                }



                state.commentList = data.records;
                state.totalrecord = parseInt(data.totalrecord);//服务器返回的long类型已转为String类型
                state.currentpage = data.currentpage;
                state.totalpage = parseInt(data.totalpage);//服务器返回的long类型已转为String类型
                state.maxresult = data.maxresult;

                state.comment_loading = false;//是否显示评论骨架屏
                state.isShowPage = true;//显示分页栏

                nextTick(()=> {
                    //跳转到锚点
                   // window.scrollTo(0,0);

                    //跳转到评论
                    if(commentId != null && commentId != '' && (replyId == null || replyId == '')){
                        let commentRef = (proxy?.$refs['comment_'+commentId] as any);
                        if(commentRef !=undefined){
                            let commentRefValue = commentRef[0];
                            window.scrollTo(0,commentRefValue.getBoundingClientRect().top-10);

                        }
                    }
                    
                    //跳转到回复
                    if(replyId != null && replyId != ''){
                        if (state.commentList != null && state.commentList.length > 0) {
                            for(var i=0;i<state.commentList.length; i++){
                                var comment = state.commentList[i];
                                if(comment.replyList != null && comment.replyList.length > 0){
                                    for(var j=0;j<comment.replyList.length; j++){
                                        var reply = comment.replyList[j];
                                        if(reply.id==replyId && j >=state.viewNumber){//如果在收缩层
                                            telescopicReply(comment.id);//展开
                                        }
                                    }
                                }
                            }
                        }
                        nextTick(()=> {
                            let replyElement = state.replyElementNodes.get(replyId);
                            if(replyElement){
                                window.scrollTo(0,replyElement.getBoundingClientRect().top-20);
                            }
                        });
                    }
                    

                
                    //分页跳转
                    if(state.isPageCall && page != undefined && (commentId == null || commentId == '') && (replyId == null || replyId == '')){
                        let top = (document.querySelector(".commentModule") as any).offsetTop
                        window.scrollTo(0,top-10); //切换路由之后滚动到评论模块
                    }
                    state.isPageCall = false;


                    if(data.records != null && data.records.length > 0){
                        for (let i = 0; i <data.records.length; i++) {
                            let comment = data.records[i];
                            let commentRefValue =  (proxy?.$refs['commentContent_'+comment.id] as any);
                            if(commentRefValue != undefined && commentRefValue[0]){
                                renderBindNode(commentRefValue[0]); 
                            }
                            
                        }
                    }
                });
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //分页
    const handlePage = (page: number) => {
           
        state.editCommentFormView.clear() //修改评论表单
        state.editCommentEditorMap.clear()//修改评论富文本编辑器集合
        state.editCommentEditorCreateParameMap.clear()//修改评论编辑器的创建参数

        state.quoteFormView.clear() //评论引用表单
        state.quoteEditorMap.clear()//引用评论富文本编辑器集合
        state.quoteEditorCreateParameMap.clear()//引用评论编辑器的创建参数

        state.addReplyFormView.clear() //添加回复表单
        state.addReplyEditorMap.clear()//添加回复富文本编辑器集合
        state.addReplyEditorCreateParameMap.clear()//添加回复编辑器的创建参数

        state.addReplyFriendFormView.clear() //添加对方回复表单
        state.addReplyFriendEditorMap.clear()//添加回复对方富文本编辑器集合
        state.addReplyFriendEditorCreateParameMap.clear()//添加回复对方编辑器的创建参数
        
        state.editReplyFormView.clear() //修改回复表单
        state.editReplyEditorMap.clear()//修改回复富文本编辑器集合
        state.editReplyEditorCreateParameMap.clear()//修改回复编辑器的创建参数

        //标记由分页方法调用
        state.isPageCall = true;

		router.push({
            path: '/thread', 
            query:{
                topicId:state.topicId,
                page : page
            }
		});

	}


	//清空播放器
    const clearVideoPlayer = () => {
        for(let i=0; i< state.playerObjectList.length; i++){
            let playerObject = state.playerObjectList[i];
            
            playerObject.destroy();//销毁播放器
        }
        for(let i=0; i< state.playerHlsList.length; i++){
            let hls = state.playerHlsList[i];
            hls.destroy();//销毁视频流
        }
        state.playerObjectList.length = 0;//清空数组
        state.playerHlsList.length = 0;//清空数组
        state.playerIdList.length = 0;//清空数组
        state.playerNodeList.length = 0;//清空数组
    }






    //渲染视频播放器
    const renderVideoPlayer = () => {
        
        for(let i=0; i< state.playerIdList.length; i++){
            let playerId = state.playerIdList[i];
            let url = document.getElementById(playerId)?.getAttribute("url");
            let cover = document.getElementById(playerId)?.getAttribute("cover");//封面
            let thumbnail = document.getElementById(playerId)?.getAttribute("thumbnail");//缩略图
            
            //语言
            let lang = "en";
            if(store.state.currentLanguage == 'zh'){//语言 zh,en
                lang = 'zh-cn';
            }

            let dp = null;
            if(url == ""){//如果视频处理中
                dp = new DPlayer({
                    container: document.getElementById(playerId),//播放器容器元素
                    screenshot: false,//开启截图，如果开启，视频和视频封面需要开启跨域
                    lang:lang,
                    video: {
                        
                    }
                });
                let dom = document.createElement('div');
                //视频处理中，请稍后再刷新
                dom.innerHTML="<div class='dplayer-process'><div class='box'><div class='prompt'>"+t('thread.510')+"</div></div></div>";
                document.getElementById(playerId)?.appendChild(dom);
            }else{

                if(cover != undefined && cover != "" && thumbnail != undefined && thumbnail != ""){//切片视频
                    let hls = null;
                    dp = new DPlayer({
                        container: document.getElementById(playerId),//播放器容器元素
                        screenshot: false,//开启截图，如果开启，视频和视频封面需要开启跨域
                        lang:lang,
                        video: {
                            url: url,
                            pic: cover,//视频封面
                            thumbnails: thumbnail,//视频预览图
                            type: 'customHls',
                            customType: {
                                customHls: function (video:any, player:any) {
                                    hls = new Hls();
                                    hls.loadSource(video.src);
                                    hls.attachMedia(video);
                                    hls.config.xhrSetup = (xhr, url) => {
                                        
                                        if(url.startsWith(store.state.apiUrl+"videoRedirect?")){//如果访问视频重定向页
                                            //如果使用重定向跳转时会自动将标头Authorization发送到seaweedfs，seaweedfs会报501错误 A header you provided implies functionality that is not implemented
                                            //这里发送X-Requested-With标头到后端，让后端返回需要跳转的地址
                                            let videoRedirectDate = {} as any;
                                            nativeQueryVideoRedirect(url,function(date:any){
                                                if(store.state.systemUser != null && Object.keys(store.state.systemUser).length>0 && date.isLogin == false && date.isPermission == false){
                                                    //会话续期
                                                    nativeRefreshToken();
                                                    nativeQueryVideoRedirect(url,function(date:any){
                                                        videoRedirectDate = date;
                                                    });
                                                }else{
                                                    videoRedirectDate = date;
                                                }
                                                
                                            });

                                            if(videoRedirectDate != null && Object.keys(videoRedirectDate).length>0 && videoRedirectDate.redirect != ''){
                                                //告诉hls重新发送ts请求
                                                xhr.open("GET", videoRedirectDate.redirect, true);//用重定向后的地址请求
                                                //xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
                                            }
                                        }else{
                                            // 请求ts的url 添加参数 props.fileid
                                            //url = url + "?t=" + props.fileid;
                                            // 这一步必须 告诉hls重新发送ts请求
                                            xhr.open("GET", url, true);
                                            //xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
                                        }
                                    };
                                },
                            },
                        }
                    });
                    state.playerHlsList.push(hls);
                }else{
                    if(url?.startsWith(store.state.apiUrl+"videoRedirect?")){//如果访问视频重定向页
                        //如果使用重定向跳转时会自动将标头Authorization发送到seaweedfs，seaweedfs会报501错误 A header you provided implies functionality that is not implemented
                        //这里发送X-Requested-With标头到后端，让后端返回需要跳转的地址
                        let videoRedirectDate = {} as any;
                        nativeQueryVideoRedirect(url,function(date:any){
                            if(store.state.systemUser != null && Object.keys(store.state.systemUser).length>0 && date.isLogin == false && date.isPermission == false){
                                //会话续期
                                nativeRefreshToken();
                                nativeQueryVideoRedirect(url!,function(date:any){
                                    videoRedirectDate = date;
                                });
                            }else{
                                videoRedirectDate = date;
                            }
                            
                        });

                        if(videoRedirectDate != null && Object.keys(videoRedirectDate).length>0 && videoRedirectDate.redirect != ''){
                            //xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
                            dp = new DPlayer({
                                container: document.getElementById(playerId),//播放器容器元素
                                screenshot: false,//开启截图，如果开启，视频和视频封面需要开启跨域
                                lang:lang,
                                video: {
                                    url: videoRedirectDate.redirect
                                }
                            });
                        }
                    }else{
                        dp = new DPlayer({
                            container: document.getElementById(playerId),//播放器容器元素
                            screenshot: false,//开启截图，如果开启，视频和视频封面需要开启跨域
                            lang:lang,
                            video: {
                                url: url
                            }
                        });
                    }
                }
                
            }
            state.playerObjectList.push(dp);
        }
        
        
        //添加播放器节点数据
        if(state.playerObjectList.length >0){
            
            for(let i=0; i< state.playerIdList.length; i++){
                let playerId = state.playerIdList[i];
                let node = document.getElementById(playerId);//节点对象
                state.playerNodeList.push(node);
            }
        }
        
    }
    

    //文件下载
    const onDownload = (href: string) => {
        let regx = new RegExp("^"+store.state.apiUrl,"i");//忽略大小写
        let path = href.replace(regx,"")

        proxy?.$axios({
            url: '/'+path,
            method: 'get',
            params:  {
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                if(result.success){
                    location.href = result.redirect;
                }
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }
	
    //递归绑定节点参数
    const bindNode = (node:any) => {
        
        //先找到子节点
        let nodeList = node.childNodes;
        for(let i = 0;i < nodeList.length;i++){
            //childNode获取到到的节点包含了各种类型的节点
            //但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
            let childNode = nodeList[i];
            let random = Math.random().toString().slice(2);
            //判断是否是元素节点。如果节点是元素(Element)节点，则 nodeType 属性将返回 1。如果节点是属性(Attr)节点，则 nodeType 属性将返回 2。
            if(childNode.nodeType == 1){
                //处理隐藏内容
                if(childNode.nodeName.toLowerCase() == "hide" ){
                    if(childNode.getAttribute("hide-type") == "10"){//输入密码可见
                        var nodeHtml = "";
                        nodeHtml += '<div class="hide-box">';
                        nodeHtml += 	'<Icon name="lock-solid-2" size="52px" class="background-image"></Icon>';
                        //此处内容已被隐藏，输入密码可见
                        nodeHtml += 	'<div class="background-prompt">'+t('thread.520')+'</div>';
                        nodeHtml += 	'<div class="input-box">';
                        //密码
                        nodeHtml += 		'<input type="password" v-model.trim="hide_passwordList['+state.hidePasswordIndex+']" class="text" maxlength="30"  placeholder="'+t('thread.530')+'">';
                      //  nodeHtml += 		'<input type="button" value="提交" class="button" @click="topicUnhide(10,'+state.hidePasswordIndex+');">';
                        //提交
                        nodeHtml += 		'<div class="button" @click="onTopicUnhide_renderTemplate(10,'+state.hidePasswordIndex+');">'+t('common.50')+'</div>';
                      
                        nodeHtml += 	'</div>';
                        nodeHtml += '</div>';
                        childNode.innerHTML = nodeHtml;
                        
                        state.hidePasswordIndex++;
                    }
                    else if(childNode.getAttribute("hide-type") == "20"){
                        var nodeHtml = "";
                        nodeHtml += '<div class="hide-box">';
                        nodeHtml += 	'<Icon name="lock-solid-2" size="52px" class="background-image"></Icon>';
                        //此处内容已被隐藏，评论话题可见
                        nodeHtml += 	'<div class="background-prompt">'+t('thread.540')+'</div>';
                        nodeHtml += '</div>';
                        childNode.innerHTML = nodeHtml;
                        state.isReplyTopicVisible = true;
                    }else if(childNode.getAttribute("hide-type") == "30"){
                        var nodeHtml = "";
                        nodeHtml += '<div class="hide-box">';
                        nodeHtml += 	'<Icon name="lock-solid-2" size="52px" class="background-image"></Icon>';
                        //此处内容已被隐藏，等级达到‘'+escapeHtml(childNode.getAttribute("description"))+'’可见
                        nodeHtml += 	'<div class="background-prompt">'+t('thread.550',{'p1': escapeHtml(childNode.getAttribute("description"))})+'</div>';
                        nodeHtml += '</div>';
                        childNode.innerHTML = nodeHtml;
                    }else if(childNode.getAttribute("hide-type") == "40"){
                        var nodeHtml = "";
                        nodeHtml += '<div class="hide-box">';
                        nodeHtml += 	'<Icon name="lock-solid-2" size="52px" class="background-image"></Icon>';
                        //此处内容已被隐藏，支付'+childNode.getAttribute("input-value")+'积分可见
                        nodeHtml += 	'<div class="background-prompt">'+t('thread.560',{'p1': childNode.getAttribute("input-value")})+'</div>';
                        //立即购买
                        nodeHtml += 	'<div class="submit-box" @click="onTopicUnhide_renderTemplate(40);">'+t('thread.570')+'</div>';
                        nodeHtml += '</div>';
                        childNode.innerHTML = nodeHtml;
                    }else if(childNode.getAttribute("hide-type") == "50"){
                        var nodeHtml = "";
                        nodeHtml += '<div class="hide-box">';
                        nodeHtml += 	'<Icon name="lock-solid-2" size="52px" class="background-image"></Icon>';
                        //nodeHtml += 	'<div class="background-prompt">此处内容已被隐藏，支付 ￥<span class="highlight">'+childNode.getAttribute("input-value")+'</span> 元可见</div>';
                        

                        nodeHtml += 	'<div class="background-prompt"><i18n-t keypath="thread.580" scope="global"><template #p1><span class="highlight">'+childNode.getAttribute("input-value")+'</span></template></i18n-t></div>';
                        
                        
                        
                        
                        nodeHtml += 	'<div class="submit-box" @click="onTopicUnhide_renderTemplate(50);">'+t('thread.570')+'</div>';
                        nodeHtml += '</div>';
                        childNode.innerHTML = nodeHtml;
                    }
                }

                //处理图片
                if(childNode.nodeName.toLowerCase() == "img" ){
                    let src = childNode.getAttribute("src");
                    
                    childNode.removeAttribute("src");//将原节点src属性删除，防止多请求一次
                   
                    let html = '';
                    let style = '';
                    if(childNode.getAttribute("width") != null){//如果是表情，表情图不放大
                        
                        style = 'style="width: '+childNode.getAttribute("width")+'; height: '+childNode.getAttribute("height")+'"';
                        html = '<el-image src="'+src+'" '+style+' loading="lazy" ></el-image>';
                    }else{
                       // let pos = src.lastIndexOf('/')  // '/'所在的最后位置
                       // let str = src.substr(pos+1)  //截取文件名称和后缀   输出：test.png
                       // let fileName = str.substring(0, str.lastIndexOf("."))  //截取文件名   输出：test
 
                      //  html = '<el-image src="'+src+'" '+style+' :preview-src-list=["'+src+'"] lazy hide-on-click-modal ></el-image>';
                          html = '<el-image src="'+src+'" '+style+' :preview-src-list=["'+src+'"] lazy hide-on-click-modal ><template #placeholder><div class="image-slot"><Icon name="loader-4-line" class="rotate-loading-icon" size="32px"/></div></template></el-image>';
                     //   html = '<el-image src="'+src+'" '+style+' key="'+fileName+'" :preview-src-list=["'+src+'"] lazy  hide-on-click-modal><template #placeholder><div class="image-slot"><Icon name="loader-4-line" class="rotate-loading-icon" size="32px"/></div></template></el-image>';
                    
                    }
                    //创建要替换的元素
                //	let html = '<el-image src="'+src+'" '+style+' lazy></el-image>';
                //	let html = '<el-image src="'+src+'" '+style+' :preview-src-list=["http://127.0.0.1:8080/cms/common/tttttt/templates.jpg"] lazy hide-on-click-modal ></el-image>';
               
                //	let html = '<el-image src="backstage/images/null.gif" lazy></el-image>';
                    let placeholder = document.createElement('div');
                    placeholder.innerHTML = html;
                    let node = placeholder.childNodes[0];
                //	node.setAttribute("src",src);
                    childNode.parentNode.replaceChild(node,childNode);//替换节点	 
                }
                
                //处理表格 (解决Chrome内核浏览器DPI缩放比例高于100%时部分边框变粗问题，需要CSS配合)
                if(childNode.nodeName.toLowerCase() == "table" ){
                    childNode.removeAttribute("border");
                    childNode.removeAttribute("bordercolor");
                }


                
                //处理视频标签
                if(childNode.nodeName.toLowerCase() == "player" ){
                    
                    let id = "player_"+random+"_"+i;
                    childNode.setAttribute("id",id);//设置Id
                    state.playerIdList.push(id);	
                }

               
                 //处理下载
                 if(childNode.nodeName.toLowerCase() == "a" ){
                    let href = childNode.getAttribute("href")
                    let title = childNode.innerText;
                    let linkType = childNode.getAttribute("linkType")
                    let startUrl = store.state.apiUrl+"filedownload?jump=";
                    if(linkType == "download" && href != ""){
                        let downloadHtml = "";
                        if(href.toLowerCase().startsWith(startUrl.toLowerCase())){
                            downloadHtml ='<span class="download" @click="onDownload_renderTemplate(`'+href+'`);"><Icon name="download-2-line" size="20px" class="link-icon"></Icon>'+escapeHtml(title)+'</span>'; 
                        }else{
                            downloadHtml ='<a class="download" href="'+href+'"><Icon name="download-2-line" size="20px" class="link-icon"></Icon>'+escapeHtml(title)+'</a>'; 
                        }
                        let downloadDom = document.createElement('div');
                        downloadDom.innerHTML=downloadHtml;

                        childNode.replaceWith(downloadDom.firstElementChild);
                    }
                }

                //处理代码标签
                if(childNode.nodeName.toLowerCase() == "pre" ){

                    
                    let firstChildNode = null;//第一个子节点

                    for(let p = 0;p < childNode.childNodes.length;p++){
                        let preChildNode = childNode.childNodes[p];
                        if(preChildNode.nodeName.toLowerCase() == "code" ){
                            firstChildNode = preChildNode;
                            break;
                        }
                    }
                    
                    if(firstChildNode != null && firstChildNode.getAttribute("class")!= null && firstChildNode.getAttribute("class").indexOf("language-") != -1){//Markdown代码
                        
                        let class_val = firstChildNode.className;
                        let lan_class = "";
                        let class_arr = new Array();
                        class_arr = class_val.split(' ');
                        
                        for(let k=0; k<class_arr.length; k++){
                            let className = class_arr[k].trim();
                            
                            if(className != null && className != ""){
                                if (className.lastIndexOf('language-', 0) === 0) {
                                    lan_class = className;
                                    break;
                                }
                            }
                        }
                        if(firstChildNode.getAttribute("class").indexOf("language-mermaid") == -1){
                            childNode.className = "line-numbers "+lan_class;
                            childNode.setAttribute("data-prismjs-copy",t('thread.590'));//复制
                            childNode.setAttribute("data-prismjs-copy-error",t('thread.600'));//按Ctrl+C复制
                            childNode.setAttribute("data-prismjs-copy-success",t('thread.610'));//复制成功


                            let nodeHtml = "";

                            //删除code节点
                            let preChildNodeList = childNode.childNodes;
                            for(let p = 0;p < preChildNodeList.length;p++){
                                let preChildNode = preChildNodeList[p];
                                if(preChildNode.nodeName.toLowerCase() == "code" ){
                                    nodeHtml += preChildNode.innerHTML;
                                    preChildNode.parentNode.removeChild(preChildNode);
                                }
                                
                            }
                            
                            let dom = document.createElement('code');
                            dom.className = "line-numbers "+lan_class;
                            dom.innerHTML=nodeHtml;
                            
                        
                            childNode.appendChild(dom);
                        }
                    }


                    if(childNode.className != null && childNode.className.indexOf("lang-") != -1){//富文本编辑器代码
                       
                        let pre_html = childNode.innerHTML;
                        let class_val = childNode.className;
                        let lan_class = "";
                        
                        let class_arr = new Array();
                        class_arr = class_val.split(' ');
                        
                        for(let k=0; k<class_arr.length; k++){
                            let className = class_arr[k].trim();
                            
                            if(className != null && className != ""){
                                if (className.lastIndexOf('lang-', 0) === 0) {
                                    lan_class = className;
                                    break;
                                }
                            }
                        }
                        
                        childNode.className = "line-numbers "+getLanguageClassName(lan_class);
                        childNode.setAttribute("data-prismjs-copy",t('thread.590'));//复制
                        childNode.setAttribute("data-prismjs-copy-error",t('thread.600'));//按Ctrl+C复制
                        childNode.setAttribute("data-prismjs-copy-success",t('thread.610'));//复制成功


                        let nodeHtml = "";

                        //删除code节点
                        let preChildNodeList = childNode.childNodes;
                        for(let p = 0;p < preChildNodeList.length;p++){
                            let preChildNode = preChildNodeList[p];
                            if(preChildNode.nodeName.toLowerCase() == "code" ){
                                nodeHtml += preChildNode.innerHTML;
                                preChildNode.parentNode.removeChild(preChildNode);
                            }
                            
                        }
                        
                        let dom = document.createElement('code');
                        dom.className = "line-numbers "+getLanguageClassName(lan_class);
                        dom.innerHTML=nodeHtml;
                        
                    
                        childNode.appendChild(dom);
                    }

                    
                    
                   
                }
                
                bindNode(childNode);

                
            }
        }
    }


    //递归渲染绑定节点
    const renderBindNode = async (node:any) => {	
         //先找到子节点
         let nodeList = node.childNodes;
        for(let i = 0;i < nodeList.length;i++){
            //childNode获取到到的节点包含了各种类型的节点
            //但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
            let childNode = nodeList[i];
            let random = Math.random().toString().slice(2);
            //判断是否是元素节点。如果节点是元素(Element)节点，则 nodeType 属性将返回 1。如果节点是属性(Attr)节点，则 nodeType 属性将返回 2。
            if(childNode.nodeType == 1){
                //处理代码标签
                if(childNode.nodeName.toLowerCase() == "pre" ){
                    let firstChildNode:any = null;//第一个子节点
                    for(let p = 0;p < childNode.childNodes.length;p++){
                        let preChildNode = childNode.childNodes[p];
                        if(preChildNode.nodeName.toLowerCase() == "code" ){
                            firstChildNode = preChildNode;
                            break;
                        }
                    }
                   
                    if(firstChildNode != null && firstChildNode.getAttribute("class")!= null){
                        if(firstChildNode.getAttribute("class") != null && firstChildNode.getAttribute("class").indexOf("language-mermaid") != -1){
                           
                            if(firstChildNode.innerHTML){
                                  //  const { svg } = await mermaid.render('mermaid_'+random, unescapeHtml(firstChildNode.innerHTML));

                              //  childNode.innerHTML = svg;

                              const mermaid_container = document.createElement('div')
                                mermaid_container.style.lineHeight = 'initial' //重置行高

                                childNode.replaceWith(mermaid_container);
                                mermaid.render(
                                    'mermaid_'+random,
                                    unescapeHtml(firstChildNode.innerHTML),
                                    // @ts-ignore
                                    mermaid_container
                                ).then((svgCode) => {
                                    // @ts-ignore
                                    mermaid_container.innerHTML = svgCode.svg
                                
                                })
                                .catch((err) => {
                                // console.error(err);
                                })
                            }
                        }else if(firstChildNode.getAttribute("class").indexOf("language-mermaid") != -1){
                            
                        }else{
                            Prism.highlightAllUnder(childNode);
                        }
                    }
                   
                    
                   
                }else if(childNode.nodeName.toLowerCase() == "span"){
                    if(childNode.getAttribute("class") != null && childNode.getAttribute("class").indexOf("math-inline") != -1 && childNode.childNodes.length==1 && childNode.childNodes[0].nodeType ==3){
                        let tex = katex.renderToString(unescapeHtml(childNode.innerHTML), {
                            throwOnError: false,
                            displayMode:false//内联模式
                        });
                        childNode.innerHTML = tex;
                    }
                }else if(childNode.nodeName.toLowerCase() == "div"){
                    if(childNode.getAttribute("class") != null && childNode.getAttribute("class").indexOf("math-display") != -1 && childNode.childNodes.length==1 && childNode.childNodes[0].nodeType ==3){
                        let tex = katex.renderToString(unescapeHtml(childNode.innerHTML), {
                            throwOnError: false,
                            displayMode:true//块模式
                        });
                        childNode.innerHTML = tex;

                    }
                }

               


                renderBindNode(childNode);
            }
        }
    }

    //添加收藏
    const addFavorite = (topicId:string) => {
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            ElMessage({
                showClose: true,
                message: t('thread.620'),//请先登录再加入收藏
                type: 'warning',
            })
            return;
        }
        if(state.isFavorited){
            return;
        }

        let formData = new FormData();
        formData.append('topicId', topicId);

        proxy?.$axios({
            url: '/user/control/favorite/add',
            method: 'post',
            data: formData,
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){

                const result: any = response.data;
            
                if(result.success){
                    ElMessage({
                        showClose: true,
                        message: t('thread.630'),//加入收藏成功
                        type: 'success',
                    })
                    hasUserFavoritedTopic(topicId);
                    queryFavoriteCount(topicId);

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
    //用户是否已经收藏话题
    const hasUserFavoritedTopic = (topicId:string) => {
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        proxy?.$axios({
            url: '/hasUserFavoritedTopic',
            method: 'get',
            params:  { 
                topicId: topicId,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                state.isFavorited = data.isFavorited;
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    //查询话题用户收藏总数
    const queryFavoriteCount = (topicId:string) => {
        proxy?.$axios({
            url: '/queryFavoriteCount',
            method: 'get',
            params:  { 
                topicId: topicId,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                state.favoriteCount = data.favoriteCount;
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    //删除收藏
    const deleteFavorite = (topicId: string) => {
        proxy?.$axios({
            url: '/user/control/deleteFavorite',
            method: 'post',
            params:  { 
                topicId: topicId,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                    
                if(result.success){//成功
                    ElMessage({
                        showClose: true,
                        message: t('thread.640'),//取消收藏成功
                        type: 'success',
                    })
                    hasUserFavoritedTopic(topicId);
                    queryFavoriteCount(topicId);
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


    //回调查询点赞
    const onQueryLike = (itemId:string,module:number) => {
        hasUserLikedTopic(itemId,module);
        queryLikeCount(itemId,module);
    }


    //添加点赞
    const addLike = (itemId:string,module:number) => {
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            ElMessage({
                showClose: true,
                message: t('thread.650'),//请先登录再点赞
                type: 'warning',
            })
            return;
        }

        if(module == 10){
            if(state.alreadyLiked){
                return;
            }
        }else if(module == 20){
            if(state.alreadyLikedComment.get(itemId)){
                return;
            }
        }else if(module == 30){
            if(state.alreadyLikedCommentReply.get(itemId)){
                return;
            }
        }
        

        let formData = new FormData();
        formData.append('itemId', itemId);
        formData.append('module', String(module));

        proxy?.$axios({
            url: '/user/control/like/add',
            method: 'post',
            data: formData,
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){

                const result: any = response.data;
            
                if(result.success){
                    ElMessage({
                        showClose: true,
                        message: t('thread.660'),//点赞成功
                        type: 'success',
                    })


                    hasUserLikedTopic(itemId,module);
                    queryLikeCount(itemId,module);

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
    //用户是否已经点赞该项
    const hasUserLikedTopic = (itemId:string,module:number) => {
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        
        proxy?.$axios({
            url: '/hasUserLikedTopic',
            method: 'get',
            params:  { 
                itemId: itemId,
                module: module,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                if(module == 10){
                    state.alreadyLiked = data.isLiked;
                }else if(module == 20){
                    state.alreadyLikedComment.set(itemId,data.isLiked)
                }else if(module == 30){
                    state.alreadyLikedCommentReply.set(itemId,data.isLiked)
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    //查询话题用户点赞总数
    const queryLikeCount = (itemId:string,module:number) => {
        proxy?.$axios({
            url: '/queryLikeCount',
            method: 'get',
            params:  { 
                itemId: itemId,
                module: module,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                if(module == 10){
                    state.likeCount = data.totalCount;
                }else if(module == 20){
                    state.commentLikeCount.set(itemId,data.totalCount)
                }else if(module == 30){
                    state.commentReplyLikeCount.set(itemId,data.totalCount)
                }
                
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //删除点赞
    const deleteLike = (itemId:string,module:number) => {
        proxy?.$axios({
            url: '/user/control/deleteLike',
            method: 'post',
            params:  { 
                itemId: itemId,
                module: module,
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                    
                if(result.success){//成功
                    ElMessage({
                        showClose: true,
                        message: t('thread.670'),//取消点赞成功
                        type: 'success',
                    })

                    hasUserLikedTopic(itemId,module);
                    queryLikeCount(itemId,module);
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
    
    
    //查询添加评论页
    const queryAddComment = (topicId:string) => {
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
       
        proxy?.$axios({
            url: '/getCommentForm',
            method: 'get',
            params:  {},
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                state.isLoadingComplete =true;//标记加载完成
                state.allowComment = data.allowComment;

                nextTick(()=>{
                    if(state.topic?.allow && data.allowComment){
                        if(data.availableTag != null && data.availableTag != ''){
                            let availableTagObject = JSON.parse(data.availableTag);//JSON转为对象

                            let flag = false;
                            if(availableTagObject != null && availableTagObject.length >0){
                                for(var i=0; i< availableTagObject.length; i++){
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
                            state.availableTag = availableTagObject;//评论编辑器允许使用标签
                        }
                        
                        state.fileSystem = data.fileSystem;//文件存储系统
                        state.supportEditor = data.supportEditor;//支持编辑器 10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                        

                        
                        if(data.supportEditor == 20 || data.supportEditor == 40){
                            state.isAddCommentMarkdown = true;
                        }

                        let uploadPath = "user/control/comment/uploadImage?topicId="+topicId;
                        

                        if(state.addCommentEditorPlugin != null && state.addCommentEditorPlugin.length ==0){
                            //添加插件
                            state.addCommentEditorPlugin.push(...markdownPlugins);
                            state.addCommentEditorPlugin.push(emoji());
                            if(state.availableTag?.indexOf('mention') != -1){
                                state.addCommentEditorPlugin.push(
                                    mention((editorId: string,ctx:BytemdEditorContext)=>{mentionPopUp(editorId,ctx)})
                                );
                            }
                            if(state.availableTag?.indexOf('ai') != -1){
                                state.addCommentEditorPlugin.push(
                                        
                                    ai((editorId: string,ctx:BytemdEditorContext)=>{aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,state.isAddCommentMarkdown,undefined,ctx)})
                                );
                            }

                            state.addCommentEditorPlugin.push(config(false));
                            
                            if(state.supportEditor == 30 || state.supportEditor == 40){//10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                                state.addCommentEditorPlugin.push(
                                    toggleEditor((editorId: string)=>{handleAddCommentToggleRichtextEditor(editorId)})
                                );
                            }
                            state.addCommentEditorPlugin.push(
                                help(state.availableTag,[])
                            );
                            if(state.availableTag?.indexOf('image') != -1){
                                state.addCommentEditorPlugin.push(
                                    imageUpload("user/control/comment/uploadImage?topicId="+state.topicId,'file',state.fileSystem)
                                );
                                state.addCommentEditorPlugin.push(
                                    pasteImageUpload("user/control/comment/uploadImage?topicId="+state.topicId,'file',state.fileSystem)
                                );
                            }    
                            
                        }
                              
                      

                        if (data.captchaKey != undefined && data.captchaKey != '') {
                            
                            state.showCaptcha.set("addComment-"+topicId,true)
                            state.captchaKey.set("addComment-"+topicId,data.captchaKey)
                            Object.assign(state.captchaValue, {['addComment-'+topicId] : ''});
                            replaceCaptcha("addComment-"+topicId);//刷新验证码
                        }
                       
                        if (Object.keys(state.addCommentEditorCreateParameObject).length === 0) {//等于空
                           
                           
                            if(!state.isAddCommentMarkdown){
                                //创建富文本编辑器
                                state.addCommentEditor = createEditor(formAddCommentContentRef.value, state.availableTag, uploadPath, null,state.fileSystem,(editorId: string)=>{
                                    handleAddCommentToggleMarkdownEditor(editorId);
                                },
                                (editorId: string)=>{
                                    //提及弹窗
                                    mentionPopUp(editorId,undefined)
                                },
                                (editorId: string)=>{
                                    //AI弹窗
                                    aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,state.isAddCommentMarkdown,state.addCommentEditor,undefined)
                                });
                            }
                            state.addCommentEditorCreateParameObject = {
                                ref:formAddCommentContentRef.value,
                                availableTag:state.availableTag,
                                uploadPath:uploadPath,
                                userGradeList:null
                            }
                        }
                        
                    }
            
                })
            }
            

        })
        .catch((error: any) =>{
            console.log(error);
        });

    }
    //刷新验证码
    const replaceCaptcha = (key:string) => {
        state.imgUrl.set(key,store.state.baseURL+"captcha/" + state.captchaKey.get(key) + ".jpg?" + Math.random()) 

    }


    //校验验证码
    const checkCaptchaValue = (value: any, callback: any,key:string) => {
        if(state.captchaKey.get(key) != null && state.captchaKey.get(key) != ''){
            if (value === '') {
                return callback(t('common.10'));//验证码不能为空
            }else{
                if (value.trim().length < 4) {
                    callback(t('common.20'))//验证码长度为4个字符
                } else {   
                    if(state.allowSubmit.get(key)){//按下提交按钮则不再请求校验验证码
                        callback();
                        return;
                    }
                    proxy?.$axios({
                        url: '/checkCaptcha',
                        method: 'post',
                        params:  {
                            captchaKey:state.captchaKey.get(key),
                            captchaValue:state.captchaValue[key]
                        }
                    })
                    .then((response: AxiosResponse) => {
                        if(state.allowSubmit.get(key)){//按下提交按钮则不再处理校验验证码
                            callback();
                            return;
                        }
                        if(response){
                            const result: any = response.data;
                            if(!result.success){
                                callback(t('common.30'))//验证码错误
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

    //校验验证码规则
    const checkCaptchaValueRules = (key:string) =>{
        error.captchaValue.set(key,'');
        checkCaptchaValue(state.captchaValue[key].trim(), (err:string)=>{
            if(err != undefined){
                error.captchaValue.set(key,err);
            }
        },key)
    }


    //添加评论 -- 提交数据
    const onAddCommentFormSubmit = () => {
        let _key =  "addComment-"+state.topicId;
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.content.delete(_key);
                error.captchaValue.delete(_key);
                error.comment.delete(_key);

                let formData = new FormData();
                formData.append('topicId', state.topicId);

                
                if(state.isAddCommentMarkdown){
                    formData.append('isMarkdown', state.isAddCommentMarkdown.toString());
                    formData.append('markdownContent', state.addCommentMarkdownContent);
                }else{
                    if(formAddCommentContentRef.value.value != null && formAddCommentContentRef.value.value !=''){
                        formData.append('content', formAddCommentContentRef.value.value);
                    }
                }



               
                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/comment/add',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })

                            state.addCommentMarkdownContent = "";



                            if (Object.keys(state.addCommentEditor).length != 0) {//不等于空
                                //清空字段
                                state.addCommentEditor.html("");
                                //自动展开内容
                                state.addCommentEditor.autoExpandContent();
                                //state.addCommentEditor.remove();
                                //state.addCommentEditorCreateParameObject = {};
                            }

                           

                            //重置表单
                            //formAddCommentRef.value?.resetFields();
                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }

                            let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
                
                            queryCommentList(state.topicId,'','',page);
                            if(state.isReplyTopicVisible){
                                queryTopic(state.topicId,()=>{});
                            }

                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'content'){
                                    error.content.set(_key,value);
                                }else if(key == 'comment'){
                                    error.comment.set(_key,value);
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });


        
    }

    //修改评论表单
    const editCommentUI = (comment: Comment) => {
        let _key =  "editComment-"+comment.id;
        if(state.editCommentFormView.get(comment.id) == true){//如果已打开
            return;
        }
        
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        proxy?.$axios({
            url: '/user/getEditCommentForm',
            method: 'get',
            params:  {
                commentId: comment.id
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            let data =  response.data;

            let _comment = data.comment;

            if(data.allowComment && _comment != undefined){
                Object.assign(state.editCommentMarkdownContent, {[_comment.id] : _comment.markdownContent});
                
                state.editCommentFormView.set(comment.id,true);

                nextTick(()=>{
               

                    let availableTag = []
                    if(data.availableTag != null && data.availableTag != ''){
                        let availableTagObject = JSON.parse(data.availableTag);//JSON转为对象

                        let flag = false;
                        if(availableTagObject != null && availableTagObject.length >0){
                            for(var i=0; i< availableTagObject.length; i++){
                                let availableTag = availableTagObject[i];
                                if(availableTag == "image"){//增加批量插入图片按钮
                                    availableTagObject.splice(i+1, 0, 'multiimage');//在指定索引处插入元素
                                    break;
                                }
                            }
                        }

                        availableTag = availableTagObject;//编辑器允许使用标签
                    }
                    
                    state.fileSystem = data.fileSystem;//文件存储系统
                    let uploadPath = "user/control/comment/uploadImage?topicId="+state.topicId;
                

                    if(state.editCommentEditorPlugin != null && state.editCommentEditorPlugin.length ==0){
                        //添加插件
                        state.editCommentEditorPlugin.push(...markdownPlugins);
                        state.editCommentEditorPlugin.push(emoji());
                        if(availableTag?.indexOf('mention') != -1){
                            state.editCommentEditorPlugin.push(
                                mention((editorId: string,ctx:BytemdEditorContext)=>{mentionPopUp(editorId,ctx)})
                            );
                        }
                        if(availableTag?.indexOf('ai') != -1){
                            state.editCommentEditorPlugin.push(
                                    
                                ai((editorId: string,ctx:BytemdEditorContext)=>{aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem ,true,undefined,ctx)})
                            );
                        }
                        state.editCommentEditorPlugin.push(config(true));
                        state.editCommentEditorPlugin.push(
                            help(availableTag,[])
                        );
                        if(availableTag?.indexOf('image') != -1){
                            state.editCommentEditorPlugin.push(
                                imageUpload("user/control/comment/uploadImage?topicId="+state.topicId,'file',state.fileSystem)
                            );
                            state.editCommentEditorPlugin.push(
                                pasteImageUpload("user/control/comment/uploadImage?topicId="+state.topicId,'file',state.fileSystem)
                            );
                        }   
                        
                    }

                    if (data.captchaKey != undefined && data.captchaKey != '') {
                        
                        state.showCaptcha.set(_key,true)
                        state.captchaKey.set(_key,data.captchaKey)
                        Object.assign(state.captchaValue, {[_key] : ''});
                        replaceCaptcha(_key);//刷新验证码
                    }

                    let editCommentElement = state.editCommentElementNodes.get(comment.id);
                    if(editCommentElement){
                        editCommentElement.value = _comment.content;
                        if(_comment.isMarkdown != null && _comment.isMarkdown == true){
                            state.isEditCommentMarkdownMap.set(comment.id,true);
                        }else{
                            state.isEditCommentMarkdownMap.set(comment.id,false);
                        }
                        if(!state.isEditCommentMarkdownMap.get(comment.id)){
                            //创建富文本编辑器
                            let editor = createEditor(editCommentElement, availableTag, uploadPath, null,state.fileSystem,(editorId: string)=>{},
                            (editorId: string)=>{
                                //提及弹窗
                                mentionPopUp(editorId,undefined)
                            },
                            (editorId: string)=>{
                                //AI弹窗
                                aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,state.isEditCommentMarkdownMap.get(comment.id),editor,undefined)
                            });
                            state.editCommentEditorMap.set(comment.id,editor);
                        }
                        

                        state.editCommentEditorCreateParameMap.set(comment.id, {
                                ref:editCommentElement,
                                availableTag:availableTag,
                                uploadPath:uploadPath,
                                userGradeList:null
                        })
                    }
        
                })

                state.allowSubmit.set(_key,false);;//提交按钮disabled状态
            }else{
                if(!data.allowComment){
                    ElMessage({
                        showClose: true,
                        message: t('thread.690'),//不允许修改评论
                        type: 'info',
                    })
                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    
    //修改评论 -- 提交数据
    const onEditCommentFormSubmit = (commentId:string) => {
        let _key =  "editComment-"+commentId;
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.content.delete(_key);
                error.captchaValue.delete(_key);
                error.comment.delete(_key);

                let formData = new FormData();
                formData.append('commentId', commentId);



                if(state.isEditCommentMarkdownMap.get(commentId)!= undefined && state.isEditCommentMarkdownMap.get(commentId) == true){
                    if(state.editCommentMarkdownContent[commentId] != undefined){
                        formData.append('markdownContent', state.editCommentMarkdownContent[commentId]);
                    }
                }else{
                    let editCommentElement = state.editCommentElementNodes.get(commentId);
                    if(editCommentElement){
                        formData.append('content', editCommentElement.value);
                    }
                }
                
                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/comment/edit',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })
                           

                            let editCommentEditor = state.editCommentEditorMap.get(commentId);
                            if(editCommentEditor != null){
                                editCommentEditor.remove();
                                state.editCommentEditorMap.delete(commentId);
                                state.editCommentEditorCreateParameMap.delete(commentId);
                            }
                            



                            if(state.editCommentMarkdownContent[commentId] != undefined){
                               state.editCommentMarkdownContent[commentId] = ""
                            }
                           
                            
                            nextTick(()=>{//需要延迟才能让state.editCommentMarkdownContent[commentId]的设置生效
                                state.editCommentFormView.set(commentId,false);
                            })




                            //重置表单
                            //formAddCommentRef.value?.resetFields();
                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }

                            let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
                
                            queryCommentList(state.topicId,'','',page);

                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'content'){
                                    error.content.set(_key,value);
                                }else if(key == 'comment'){
                                    error.comment.set(_key,value);
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });
    }
    //取消修改评论
    const onCancelEditComment = (commentId:string) => {
        let editCommentEditor = state.editCommentEditorMap.get(commentId);
        if(editCommentEditor != null){
            editCommentEditor.remove();
            state.editCommentEditorMap.delete(commentId);
            state.editCommentEditorCreateParameMap.delete(commentId);
            state.editCommentElementNodes.delete(commentId);
        }
        state.editCommentFormView.set(commentId,false);
    }

    //引用评论表单
    const quoteCommentUI = (comment: Comment) => {
        let _key =  "addQuoteComment-"+comment.id;
        if(state.quoteFormView.get(comment.id) == true){//如果已打开
            return;
        }
        
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        proxy?.$axios({
            url: '/user/getQuoteCommentForm',
            method: 'get',
            params:  {
                commentId: comment.id
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                let quoteContent = data.quoteContent;


                if(data.allowComment){
                    state.quoteFormView.set(comment.id,true);

                    nextTick(()=>{
                

                        let availableTag = []
                        if(data.availableTag != null && data.availableTag != ''){
                            let availableTagObject = JSON.parse(data.availableTag);//JSON转为对象

                            let flag = false;
                            if(availableTagObject != null && availableTagObject.length >0){
                                for(var i=0; i< availableTagObject.length; i++){
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
                            availableTag = availableTagObject;//编辑器允许使用标签
                        }
                        
                        state.fileSystem = data.fileSystem;//文件存储系统
                        state.supportEditor = data.supportEditor;//支持编辑器 10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                        let uploadPath = "user/control/comment/uploadImage?topicId="+state.topicId;

                        if(state.quoteCommentEditorPlugin != null && state.quoteCommentEditorPlugin.length ==0){
                            //添加插件
                            state.quoteCommentEditorPlugin.push(...markdownPlugins);
                            state.quoteCommentEditorPlugin.push(emoji());
                            if(availableTag?.indexOf('mention') != -1){
                                state.quoteCommentEditorPlugin.push(
                                    mention((editorId: string,ctx:BytemdEditorContext)=>{mentionPopUp(editorId,ctx)})
                                );
                            }
                            if(availableTag?.indexOf('ai') != -1){
                                state.quoteCommentEditorPlugin.push(
                                    ai((editorId: string,ctx:BytemdEditorContext)=>{aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem ,true,undefined,ctx)})
                                );
                            }

                            state.quoteCommentEditorPlugin.push(config(true));  
                            if(state.supportEditor == 30 || state.supportEditor == 40){//10.仅富文本编辑器 20.仅Markdown编辑器  30.富文本编辑器优先 40.Markdown编辑器优先
                                state.quoteCommentEditorPlugin.push(
                                    toggleEditor((editorId: string)=>{handleQuoteCommentToggleRichtextEditor(editorId)})
                                );
                            }
                            state.quoteCommentEditorPlugin.push(
                                help(availableTag,[])
                            );
                            if(availableTag?.indexOf('image') != -1){
                                state.quoteCommentEditorPlugin.push(
                                    imageUpload("user/control/comment/uploadImage?topicId="+state.topicId,'file',state.fileSystem)
                                );
                                state.quoteCommentEditorPlugin.push(
                                    pasteImageUpload("user/control/comment/uploadImage?topicId="+state.topicId,'file',state.fileSystem)
                                );
                            }  
                        }
                              
                        

                        if (data.captchaKey != undefined && data.captchaKey != '') {
                            
                            state.showCaptcha.set(_key,true)
                            state.captchaKey.set(_key,data.captchaKey)
                            Object.assign(state.captchaValue, {[_key] : ''});
                            replaceCaptcha(_key);//刷新验证码
                        }

                        let quoteElement = state.quoteElementNodes.get(comment.id);
                        if(quoteElement){
                            quoteElement.value = "";
                            if(data.supportEditor == 20 || data.supportEditor == 40){
                                state.isQuoteCommentMarkdownMap.set(comment.id,true);
                            }else{
                                state.isQuoteCommentMarkdownMap.set(comment.id,false);
                            }

                            
                            if(!state.isQuoteCommentMarkdownMap.get(comment.id)){
                                //创建富文本编辑器
                                let editor = createEditor(quoteElement, availableTag, uploadPath, null,state.fileSystem,(editorId: string)=>{
                                    handleQuoteCommentToggleMarkdownEditor(editorId);
                                },
                                (editorId: string)=>{
                                    //提及弹窗
                                    mentionPopUp(editorId,undefined)
                                },
                                (editorId: string)=>{
                                    //AI弹窗
                                    aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,state.isQuoteCommentMarkdownMap.get(comment.id),editor,undefined)
                                });
                                state.quoteEditorMap.set(comment.id,editor);
                            }
                            

                            state.quoteEditorCreateParameMap.set(comment.id, {
                                    ref:quoteElement,
                                    availableTag:availableTag,
                                    uploadPath:uploadPath,
                                    userGradeList:null
                            })

                        }
            
                    })

                    state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                }else{
                    ElMessage({
                        showClose: true,
                        message: t('thread.700'),//不允许引用评论
                        type: 'info',
                    })
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    
    //引用评论 -- 提交数据
    const onQuoteCommentFormSubmit = (commentId:string) => {
        let _key =  "addQuoteComment-"+commentId;
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.content.delete(_key);
                error.captchaValue.delete(_key);
                error.comment.delete(_key);

                let formData = new FormData();
                formData.append('commentId', commentId);

                


                if(state.isQuoteCommentMarkdownMap.get(commentId)!= undefined && state.isQuoteCommentMarkdownMap.get(commentId) == true){
                    formData.append('isMarkdown', state.isQuoteCommentMarkdownMap.get(commentId).toString());
                    if(state.quoteCommentMarkdownContent[commentId] != undefined){
                        formData.append('markdownContent', state.quoteCommentMarkdownContent[commentId]);
                    }
                }else{
                     let quoteElement = state.quoteElementNodes.get(commentId);
                    if(quoteElement){
                        formData.append('content', quoteElement.value);
                    }
                }

                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/comment/addQuote',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })
                           

                            let quoteEditor = state.quoteEditorMap.get(commentId);
                            if(quoteEditor != null){
                                quoteEditor.remove();
                                state.quoteEditorMap.delete(commentId);
                                state.quoteEditorCreateParameMap.delete(commentId);
                            }

                            if(state.quoteCommentMarkdownContent[commentId] != undefined){
                               state.quoteCommentMarkdownContent[commentId] = ""
                            }
                           
                            
                            nextTick(()=>{//需要延迟才能让state.quoteCommentMarkdownContent[commentId]的设置生效
                                state.quoteFormView.set(commentId,false);
                            })

                            //重置表单
                            //formAddCommentRef.value?.resetFields();
                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }

                            let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
                
                            queryCommentList(state.topicId,'','',page);

                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'content'){
                                    error.content.set(_key,value);
                                }else if(key == 'comment'){
                                    error.comment.set(_key,value);
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });
    }
    //取消引用评论
    const onCancelQuoteComment = (commentId:string) => {
        let quoteEditor = state.quoteEditorMap.get(commentId);
        if(quoteEditor != null){
            quoteEditor.remove();
            state.quoteEditorMap.delete(commentId);
            state.quoteEditorCreateParameMap.delete(commentId);
            state.quoteElementNodes.delete(commentId);
        }
        state.quoteFormView.set(commentId,false);
    }
    //删除评论
    const onDeleteComment = (commentId:string) => {
        ElMessageBox.confirm(t('thread.710'),{//确定删除评论?
            // type: 'warning',
            cancelButtonText: t('common.60'),//取消
            confirmButtonText: t('common.90')//确定
        })
        .then(() => {

            let formData = new FormData();
            formData.append('commentId', commentId);

        

            proxy?.$axios({
                url: '/user/control/comment/delete',
                method: 'post',
                data: formData
            })
            .then((response: AxiosResponse) => {
                if(response){

                    const result: any = response.data;
                
                    if(result.success){
                        ElMessage({
                            showClose: true,
                            message: t('thread.720'),//删除成功
                            type: 'success',
                            onClose: ()=>{
                                
                            }
                        })
        
                        
                        let editCommentEditor = state.editCommentEditorMap.get(commentId);
                        if(editCommentEditor != null){
                            editCommentEditor.remove();
                            state.editCommentEditorMap.delete(commentId);
                            state.editCommentEditorCreateParameMap.delete(commentId);
                        }
                        state.editCommentFormView.set(commentId,false);

                        let quoteEditor = state.quoteEditorMap.get(commentId);
                        if(quoteEditor != null){
                            quoteEditor.remove();
                            state.quoteEditorMap.delete(commentId);
                            state.quoteEditorCreateParameMap.delete(commentId);
                        }
                        state.quoteFormView.set(commentId,false);

                        let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
            
                        queryCommentList(state.topicId,'','',page);

                    }else{
                        //处理错误信息
                        processErrorInfo(result.error as Map<string,string> , reactive({}),()=>{});


                        
                    }
                }
            })
            .catch((error: any) =>{
                console.log(error);
            });

        })
        .catch(() => {
            //取消
        })
    }

    //选择举报分类
    const selectReportType = (reportTypeList: Array<ReportType>) => {
        nextTick(()=>{
            for(let i =0; i<reportTypeList.length; i++){
                let reportType = reportTypeList[i];
                if(reportType.id == state.reportTypeId && reportType.giveReason){
                    state.show_giveReason = true;
                    return;
                }
                
                for(let j =0; j<reportType.childType.length; j++){
                    let childReportType = reportType.childType[j];
                    if(childReportType.id == state.reportTypeId && childReportType.giveReason){
                        state.show_giveReason = true;
                        return;
                    }
                }
            }
            
            state.show_giveReason = false;   
             
        })
    }

    //打开图片预览
    const openImagePreview = (file: UploadFile) => {
        state.localImageUrl = file.url;
        state.isImageViewer = true;
    }
    //关闭图片预览
    const closeImagePreview= () => {
        state.localImageUrl = '';
        state.isImageViewer = false;
    }

    //当超出限制时
    const onImageExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
        if(state.reportMaxImageUpload >0  && state.fileList.length >= state.reportMaxImageUpload){
            ElMessage({
                showClose: true,
                message: t('thread.730'),//已达到最大图片允许上传数量
                type: 'warning',
            })
        }
    }
   
    
    
    //添加举报
    const addReportUI = (parameterId: string,module: number) => {
        let _key =  "report";
        
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        //清空表单
        state.reportTypeList.length = 0;
        state.reportTypeId = '';//举报分类Id
        state.reason = '';//理由
        state.fileList.length = 0;
        state.reportMaxImageUpload = 0;//图片允许最大上传数量
        state.parameterId = '',//举报参数Id
        state.module = 0,//举报模块
        state.show_giveReason = false,//是否显示说明理由表单
        
        
        state.showCaptcha.delete('report');//是否显示验证码
        state.captchaKey.delete('report');//验证码key
        Object.assign(state.captchaValue, {['report'] : ''});//验证码value

        //清空所有错误
        error.reportTypeId= "";//举报分类Id
        error.reason= "";//理由
        error.imageFile = "";
        error.report= "";
        error.captchaValue.delete('report');


        proxy?.$axios({
            url: '/user/getReportForm',
            method: 'get',
            params:  {
            },
            showLoading: true,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            let data =  response.data;
            if(data.allowReport){
                


                state.parameterId = parameterId;//举报参数Id
				state.module = module;//举报模块

                state.reportTypeList = data.reportTypeList;
                state.reportMaxImageUpload = data.reportMaxImageUpload;

                if(state.reportTypeList != null && state.reportTypeList.length >0){
                    state.addReportFormView = true;
                }else{
                    ElMessage({
                        showClose: true,
                        message: t('thread.740'),//举报分类没开启
                        type: 'info',
                    })
                }

                if (data.captchaKey != undefined && data.captchaKey != '') {
                   
                   state.showCaptcha.set(_key,true)
                   state.captchaKey.set(_key,data.captchaKey)
                   Object.assign(state.captchaValue, {[_key] : ''});
                   replaceCaptcha(_key);//刷新验证码
                }
                state.allowSubmit.set(_key,false);;//提交按钮disabled状态
            }else{
                ElMessage({
                    showClose: true,
                    message: t('thread.750'),//举报功能已关闭
                    type: 'info',
                })
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //添加举报 -- 提交数据
    const onAddReportFormSubmit = () => {
        let _key =  "report";
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.captchaValue.delete(_key);

                error.reportTypeId= "";//举报分类Id
                error.reason= "";//理由
                error.imageFile = "";
                error.report= "";

                let formData = new FormData();
                

                formData.append("parameterId", state.parameterId);
                formData.append("module", String(state.module));
            
                if(state.reportTypeId){
                    formData.append("reportTypeId", state.reportTypeId);
                }
                
                if(state.reason){
                    formData.append("reason", state.reason);
                }

                //图片
                for(var i=0; i<state.fileList.length; i++){
                    var fileData = state.fileList[i];
                    formData.append("imageFile", fileData.raw!);
                }
                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/report/add',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })
                           

                            state.addReportFormView = false;


                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }
                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'reportTypeId'){
                                    error.reportTypeId = value;
                                }else if(key == 'reason'){
                                    error.reason = value;
                                }else if(key == 'imageFile'){
                                    error.imageFile = value;
                                }else if(key == 'report'){
                                    error.report = value;
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });
    }

    //添加回复对方表单
    const addReplyFriendUI = ( commentId:string, replyId:string) => {
        let _key =  "addReplyFriend-"+replyId;
        if(state.addReplyFriendFormView.get(replyId) == true){//如果已打开
			return;
		}
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        state.allowSubmit.set(_key,true);//提交按钮disabled状态
     
        proxy?.$axios({
            url: '/user/getReplyForm',
            method: 'get',
            params:  {
                commentId: commentId
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                if(data.allowReply){
                    state.addReplyFriendFormView.set(replyId,true);

                    nextTick(()=>{
                        let availableTag = [];//编辑器允许使用标签
                        if(data.availableTag != null && data.availableTag != ''){
                            availableTag = JSON.parse(data.availableTag);//JSON转为对象
                            for (let i=0; i<availableTag.length; i++){
                                if(availableTag[i] == 'ai'){//暂不支持AI助手
                                    availableTag.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        
                        state.fileSystem = data.fileSystem;//文件存储系统


                        if (data.captchaKey != undefined && data.captchaKey != '') {
                            
                            state.showCaptcha.set(_key,true)
                            state.captchaKey.set(_key,data.captchaKey)
                            Object.assign(state.captchaValue, {[_key] : ''});
                            replaceCaptcha(_key);//刷新验证码
                        }

                        let addReplyFriendElement = state.addReplyFriendElementNodes.get(replyId);
                        if(addReplyFriendElement){
                            addReplyFriendElement.value = "";
                            let uploadPath = "user/control/comment/uploadImage?topicId="+state.topicId;
                    
                            //创建富文本编辑器
                            let editor = createEditor(addReplyFriendElement, availableTag, uploadPath, null,state.fileSystem,(editorId: string)=>{},
                            (editorId: string)=>{
                                //提及弹窗
                                mentionPopUp(editorId,undefined)
                            },
                            (editorId: string)=>{
                                //AI弹窗
                                aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,false,editor,undefined)
                            });
                            state.addReplyFriendEditorMap.set(replyId,editor);

                            state.addReplyFriendEditorCreateParameMap.set(replyId, {
                                    ref:addReplyFriendElement,
                                    availableTag:availableTag,
                                    uploadPath:uploadPath,
                                    userGradeList:null
                            })
                        }
                    })
                    

                    state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                }else{
                    ElMessage({
                        showClose: true,
                        message: t('thread.760'),//不允许添加回复
                        type: 'info',
                    })
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
 
    }
    //取消添加回复对方
    const onCancelAddReplyFriend = (replyId:string) => {
        let addReplyFriendEditor = state.addReplyFriendEditorMap.get(replyId);
        if(addReplyFriendEditor != null){
            addReplyFriendEditor.remove();
            state.addReplyFriendEditorMap.delete(replyId);
            state.addReplyFriendEditorCreateParameMap.delete(replyId);
            state.addReplyFriendElementNodes.delete(replyId);
        }

        state.addReplyFriendFormView.set(replyId,false);
        
    }

     //添加回复对方
     const onAddReplyFriend = (commentId:string,replyId:string) => {
        let _key =  "addReplyFriend-"+replyId;
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

       

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.replyContent.delete(_key);
                error.captchaValue.delete(_key);
                error.reply.delete(_key);

                let formData = new FormData();
                formData.append('commentId',  commentId); 

                formData.append('friendReplyId',  replyId); 
                
                let addReplyFriendElement = state.addReplyFriendElementNodes.get(replyId)
                if(addReplyFriendElement){
                    formData.append('content', addReplyFriendElement.value);
                }
                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/comment/addReply',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })
                           

                            let addReplyFriendEditor = state.addReplyFriendEditorMap.get(replyId);
                            if(addReplyFriendEditor != null){
                                addReplyFriendEditor.remove();
                                state.addReplyFriendEditorMap.delete(replyId);
                                state.addReplyFriendEditorCreateParameMap.delete(replyId);
                            }
                            
                            
                            nextTick(()=>{
                                state.addReplyFriendFormView.set(replyId,false);
                            })

                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }

                            let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
                
                            queryCommentList(state.topicId,'','',page);

                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'content'){
                                    error.replyContent.set(_key,value);
                                }else if(key == 'friendReplyId'){
                                    error.reply.set(_key,value);
                                }else if(key == 'reply'){
                                    error.reply.set(_key,value);
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });

    }


    //添加回复表单
    const addReplyUI = (commentId:string) => {
        let _key =  "addReply-"+commentId;
        if(state.addReplyFormView.get(commentId) == true){//如果已打开
			return;
		}
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        state.allowSubmit.set(_key,true);//提交按钮disabled状态


        proxy?.$axios({
            url: '/user/getReplyForm',
            method: 'get',
            params:  {
                commentId: commentId
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                if(data.allowReply){
                    state.addReplyFormView.set(commentId,true);
                    nextTick(()=>{
                        let availableTag = [];//编辑器允许使用标签
                        if(data.availableTag != null && data.availableTag != ''){
                            availableTag = JSON.parse(data.availableTag);//JSON转为对象
                        
                            for (let i=0; i<availableTag.length; i++){
                                if(availableTag[i] == 'ai'){//暂不支持AI助手
                                    availableTag.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        
                        state.fileSystem = data.fileSystem;//文件存储系统

                        if (data.captchaKey != undefined && data.captchaKey != '') {
                            
                            state.showCaptcha.set(_key,true)
                            state.captchaKey.set(_key,data.captchaKey)
                            Object.assign(state.captchaValue, {[_key] : ''});
                            replaceCaptcha(_key);//刷新验证码
                        }

                        let addReplyElement = state.addReplyElementNodes.get(commentId);
                        if(addReplyElement){
                            addReplyElement.value = "";
                            let uploadPath = "user/control/comment/uploadImage?topicId="+state.topicId;
                            
                            //创建富文本编辑器
                            let editor = createEditor(addReplyElement, availableTag, uploadPath, null,state.fileSystem,(editorId: string)=>{},
                            (editorId: string)=>{
                                //提及弹窗
                                mentionPopUp(editorId,undefined)
                            },
                            (editorId: string)=>{
                                //AI弹窗
                                aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,false,editor,undefined)
                            });
                            state.addReplyEditorMap.set(commentId,editor);
                            

                            state.addReplyEditorCreateParameMap.set(commentId, {
                                    ref:addReplyElement,
                                    availableTag:availableTag,
                                    uploadPath:uploadPath,
                                    userGradeList:null
                            })
                        }
                    })
                    
                    state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                }else{
                    ElMessage({
                        showClose: true,
                        message: t('thread.760'),//不允许添加回复
                        type: 'info',
                    })
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //添加回复 -- 提交数据
    const onAddReply = (commentId:string) => {
        let _key =  "addReply-"+commentId;
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.replyContent.delete(_key);
                error.captchaValue.delete(_key);
                error.reply.delete(_key);

                let formData = new FormData();
                formData.append('commentId', commentId);

                let addReplyElement = state.addReplyElementNodes.get(commentId);
                if(addReplyElement){
                    formData.append('content', addReplyElement.value);
                }
                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/comment/addReply',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })
                           


                            let addReplyEditor = state.addReplyEditorMap.get(commentId);
                            if(addReplyEditor != null){
                                addReplyEditor.remove();
                                state.addReplyEditorMap.delete(commentId);
                                state.addReplyEditorCreateParameMap.delete(commentId);
                            }
                           
                            
                            nextTick(()=>{
                                state.addReplyFormView.set(commentId,false);
                            })


                            //重置表单
                            //formAddCommentRef.value?.resetFields();
                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }

                            let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
                
                            queryCommentList(state.topicId,'','',page);

                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'content'){
                                    error.replyContent.set(_key,value);
                                }else if(key == 'reply'){
                                    error.reply.set(_key,value);
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });
    }

    //取消回复
    const onCancelAddReply = (commentId:string) => {

        let addReplyEditor = state.addReplyEditorMap.get(commentId);
        if(addReplyEditor != null){
            addReplyEditor.remove();
            state.addReplyEditorMap.delete(commentId);
            state.addReplyEditorCreateParameMap.delete(commentId);
            state.addReplyElementNodes.delete(commentId);
        }
        state.addReplyFormView.set(commentId,false);
    }



    //修改回复表单
    const editReplyUI = (reply:Reply) => {
        let _key =  "editReply-"+reply.id;
        if(state.editReplyFormView.get(reply.id) == true){//如果已打开
			return;
		}
        if(store.state.systemUser == null || Object.keys(store.state.systemUser).length==0){
            return;
        }
        state.allowSubmit.set(_key,true);//提交按钮disabled状态


        proxy?.$axios({
            url: '/user/getEditReplyForm',
            method: 'get',
            params:  {
                replyId: reply.id
            },
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                let data =  response.data;
                let _reply = data.reply;
                if(data.allowReply && _reply != undefined){
                    state.editReplyFormView.set(reply.id,true);
                    nextTick(()=>{
                        let availableTag = []
                        if(data.availableTag != null && data.availableTag != ''){
                            let availableTagObject = JSON.parse(data.availableTag);//JSON转为对象
                            availableTag = availableTagObject;//编辑器允许使用标签

                            for (let i=0; i<availableTag.length; i++){
                                if(availableTag[i] == 'ai'){//暂不支持AI助手
                                    availableTag.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        
                        state.fileSystem = data.fileSystem;//文件存储系统

                        if (data.captchaKey != undefined && data.captchaKey != '') {
                            
                            state.showCaptcha.set(_key,true)
                            state.captchaKey.set(_key,data.captchaKey)
                            Object.assign(state.captchaValue, {[_key] : ''});
                            replaceCaptcha(_key);//刷新验证码
                        }

                        let editReplyElement = state.editReplyElementNodes.get(reply.id);
                        if(editReplyElement){
                            
                            editReplyElement.value = _reply.content;
                            let uploadPath = "user/control/comment/uploadImage?topicId="+state.topicId;
                    
                            //创建富文本编辑器
                            let editor = createEditor(editReplyElement, availableTag, uploadPath, null,state.fileSystem,(editorId: string)=>{},
                            (editorId: string)=>{
                                //提及弹窗
                                mentionPopUp(editorId,undefined)
                            },
                            (editorId: string)=>{
                                //AI弹窗
                                aiPopUp(proxy,appContext,editorId,uploadPath,'file',state.fileSystem,false,editor,undefined)
                            });
                            state.editReplyEditorMap.set(reply.id,editor);

                            state.editReplyEditorCreateParameMap.set(reply.id, {
                                    ref:editReplyElement,
                                    availableTag:availableTag,
                                    uploadPath:uploadPath,
                                    userGradeList:null
                            })
                        }
                    })
                    state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                }else{
                    if(!data.allowReply){
                        ElMessage({
                            showClose: true,
                            message: t('thread.770'),//不允许修改回复
                            type: 'info',
                        })
                    }
                }
            }
            
        })
        .catch((error: any) =>{
            console.log(error);
        });

    }

    //修改回复 -- 提交数据
    const onEditReply = (replyId:string) => {
        let _key =  "editReply-"+replyId;
        state.allowSubmit.set(_key,true);//提交按钮disabled状态

        const p1 = new Promise<void>((resolve, reject) => {
            error.captchaValue.set(_key,'');
            if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){

                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                    checkCaptchaValue(state.captchaValue[_key].trim(), (err:string)=>{
                        if(err != undefined){
                            error.captchaValue.set(_key,err);
                            state.allowSubmit.set(_key,false);//提交按钮disabled状态
                        }else{
                            resolve();
                        }
                    },_key) 
                }else{
                    error.captchaValue.set(_key,t('common.10'));//验证码不能为空
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                }
            }else{
                resolve();
            }
        });

        Promise.all([p1])
            .then(() => {
                //清空所有错误
                error.replyContent.delete(_key);
                error.captchaValue.delete(_key);
                error.reply.delete(_key);

                let formData = new FormData();
                formData.append('replyId', replyId);

                let editReplyElement = state.editReplyElementNodes.get(replyId);
                if(editReplyElement){
                    formData.append('content', editReplyElement.value);
                }
                
                if(state.captchaKey.get(_key) != undefined && state.captchaKey.get(_key) != null){
                    //验证码Key
                    formData.append('captchaKey', state.captchaKey.get(_key) as string);
                }
                
                //验证码值
                if(state.captchaValue[_key] != undefined && state.captchaValue[_key] != null && state.captchaValue[_key] != ''){
                     formData.append('captchaValue', (state.captchaValue[_key] as string).trim());
                }

                proxy?.$axios({
                    url: '/user/control/comment/editReply',
                    method: 'post',
                    data: formData
                })
                .then((response: AxiosResponse) => {
                    if(response){

                        const result: any = response.data;
                    
                        if(result.success){
                            ElMessage({
                                showClose: true,
                                message: t('thread.680'),//提交成功
                                type: 'success',
                                onClose: ()=>{
                                    
                                }
                            })


                            let editReplyEditor = state.editReplyEditorMap.get(replyId);
                            if(editReplyEditor != null){
                                editReplyEditor.remove();
                                state.editReplyEditorMap.delete(replyId);
                                state.editReplyEditorCreateParameMap.delete(replyId);
                            }
                            

                            
                            nextTick(()=>{
                                state.editReplyFormView.set(replyId,false);
                            })

                            //重置表单
                            //formAddCommentRef.value?.resetFields();
                            if(state.showCaptcha.get(_key) == true){
                                Object.assign(state.captchaValue, {[_key] : ''});
                            }

                            let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
                
                            queryCommentList(state.topicId,'','',page);

                        }else{
                            //处理错误信息
                            for (const [key, value] of Object.entries(result.error) as [string, string][]){
                                if(key == 'content'){
                                    error.replyContent.set(_key,value);
                                }else if(key == 'reply'){
                                    error.reply.set(_key,value);
                                }else if(key == 'captchaValue'){
                                    error.captchaValue.set(_key,value);
                                }
                            }

                            if(result.captchaKey != null){
                                state.showCaptcha.set(_key,true);
                                state.captchaKey.set(_key,result.captchaKey);
                                Object.assign(state.captchaValue, {[_key] : ''});
                                replaceCaptcha(_key);
                            }else{
                                state.showCaptcha.set(_key,false);
                            }

                            
                        }
                        state.allowSubmit.set(_key,false);;//提交按钮disabled状态
                    }
                })
                .catch((error: any) =>{
                    console.log(error);
                    state.allowSubmit.set(_key,false);//提交按钮disabled状态
                });
            }).catch(() => {
                console.log("提交数据错误");
            });
    }
    //取消修改回复
    const onCancelEditReply = (replyId:string) => {
        let editReplyEditor = state.editReplyEditorMap.get(replyId);
        if(editReplyEditor != null){
            editReplyEditor.remove();
            state.editReplyEditorMap.delete(replyId);
            state.editReplyEditorCreateParameMap.delete(replyId);
            state.editReplyElementNodes.delete(replyId);
        }
        state.editReplyFormView.set(replyId,false);
    }

    //删除回复
    const onDeleteReply = (commentId:string,replyId:string) => {
        ElMessageBox.confirm(t('thread.780'),{//确定删除回复?
            // type: 'warning',
            cancelButtonText: t('common.60'),//取消
            confirmButtonText: t('common.90')//确定
        })
        .then(() => {
            let _key =  "addReply-"+commentId;
            let _key2 =  "editReply-"+replyId;
            let _key3 =  "addReplyFriend-"+replyId;

            //清空所有错误
            error.replyContent.delete(_key);
            error.captchaValue.delete(_key);
            error.reply.delete(_key);

            error.replyContent.delete(_key2);
            error.captchaValue.delete(_key2);
            error.reply.delete(_key2);

            error.replyContent.delete(_key3);
            error.captchaValue.delete(_key3);
            error.reply.delete(_key3);
            let formData = new FormData();
            formData.append('replyId', replyId);

        

            proxy?.$axios({
                url: '/user/control/comment/deleteReply',
                method: 'post',
                data: formData
            })
            .then((response: AxiosResponse) => {
                if(response){

                    const result: any = response.data;
                
                    if(result.success){
                        ElMessage({
                            showClose: true,
                            message: t('thread.720'),//删除成功
                            type: 'success',
                            onClose: ()=>{
                                
                            }
                        })


                        let addReplyEditor = state.addReplyEditorMap.get(commentId);
                        if(addReplyEditor != null){
                            addReplyEditor.remove();
                            state.addReplyEditorMap.delete(commentId);
                            state.addReplyEditorCreateParameMap.delete(commentId);
                        }
                        state.addReplyFormView.set(commentId,false);


                        let editReplyEditor = state.editReplyEditorMap.get(replyId);
                        if(editReplyEditor != null){
                            editReplyEditor.remove();
                            state.editReplyEditorMap.delete(replyId);
                            state.editReplyEditorCreateParameMap.delete(replyId);
                        }
                        state.editReplyFormView.set(replyId,false);

                        let addReplyFriendEditor = state.addReplyFriendEditorMap.get(replyId);
                        if(addReplyFriendEditor != null){
                            addReplyFriendEditor.remove();
                            state.addReplyFriendEditorMap.delete(replyId);
                            state.addReplyFriendEditorCreateParameMap.delete(replyId);
                        }
                        state.addReplyFriendFormView.set(replyId,false);

                        //重置表单
                        //formAddCommentRef.value?.resetFields();
                        if(state.showCaptcha.get(_key) == true){
                            Object.assign(state.captchaValue, {[_key] : ''});
                        }

                        let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
            
                        queryCommentList(state.topicId,'','',page);

                    }else{
                        //处理错误信息
                        processErrorInfo(result.error as Map<string,string> , reactive({}),()=>{});


                        
                    }
                }
            })
            .catch((error: any) =>{
                console.log(error);
            });

        })
        .catch(() => {
            //取消
        })
    }

    //跳转私信
    const toPrivateMessage = (userName:string) => {
        router.push({path: '/user/control/privateMessageChatList',query:{friendUserName:userName}});
    }
    //查询是否已经关注该用户
    const queryFollowing = (userName:string) => {
        //清空信息
        state.followText = t('thread.340');//关注

        proxy?.$axios({
            url: '/queryFollowing',
            method: 'get',
            params:  {
                userName:userName
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                if(result.isFollowed){
                    state.followText = t('thread.790');//已关注
                }
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }
    //添加关注
    const addFollow = (userName:string) => {
        if(state.followText ==t('thread.340')){//关注
            let formData = new FormData();
            formData.append('userName', userName);
            
            proxy?.$axios({
                url: '/user/control/follow/add',
                method: 'post',
                data: formData
            })
            .then((response: AxiosResponse) => {
                if(response){

                    const result: any = response.data;
                
                    if(result.success){
                        state.followText =t('thread.790')//已关注
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
        
    }
    //查询粉丝总数
    const queryFollowerCount = (userName:string) => {
        //清空信息
        state.followerCount = '0';


        proxy?.$axios({
            url: '/queryFollowerCount',
            method: 'get',
            params:  {
                userName:userName
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                state.followerCount = result.followerCount;
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }
    
    //查询回答总数
    const queryAnswerCount = (userName:string) => {
        //清空信息
        state.answerCount = '0';


        proxy?.$axios({
            url: '/queryAnswerCount',
            method: 'get',
            params:  {
                userName:userName
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                state.answerCount = result.answerCount;
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }

    //查询关注总数
    const queryFollowCount = (userName:string) => {
        //清空信息
        state.followCount = '0';


        proxy?.$axios({
            url: '/queryFollowingCount',
            method: 'get',
            params:  {
                userName:userName
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                state.followCount = result.followingCount;
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }

    //查询发红包明细
    const querySentRedEnvelopeDetail = (giveRedEnvelopeId:string) => {
    		state.receiveRedEnvelopeList.length = 0;
        proxy?.$axios({
            url: '/querySentRedEnvelopeDetail',
            method: 'get',
            params:  {
                giveRedEnvelopeId:giveRedEnvelopeId
            },
        })
        .then((response: AxiosResponse) => {
            return response?.data;
        })
        .then((data: GiveRedEnvelope) => {

            state.giveRedEnvelope = {} as GiveRedEnvelope;

            if(data){
                state.giveRedEnvelope = data;
                if(state.giveRedEnvelope.nickname != null && state.giveRedEnvelope.nickname !=''){
                    state.giveRedEnvelope.avatar = letterAvatar(state.giveRedEnvelope.nickname, 48);
                }else{
                    state.giveRedEnvelope.avatar = letterAvatar(state.giveRedEnvelope.account, 48);
                }
            }
            
        }).catch((error: any) =>{
            console.log(error);
        });
    }
    //查询领取红包用户列表
    const queryReceivedRedEnvelope = (giveRedEnvelopeId:string, page:number) => {
        proxy?.$axios({
            url: '/queryReceivedRedEnvelopePage',
            method: 'get',
            params:  {
                giveRedEnvelopeId:giveRedEnvelopeId,
                page : page
            },
        })
        .then((response: AxiosResponse) => {
            return response?.data;
        })
        .then((data: PageView<ReceiveRedEnvelope>) => {
        		
            if(data && data.records != null && data.records.length >0){
                let receiveRedEnvelopeList = data.records;
                if (receiveRedEnvelopeList != null && receiveRedEnvelopeList.length > 0) {
                    for(var i=0;i<receiveRedEnvelopeList.length; i++){
                        let receiveRedEnvelope = receiveRedEnvelopeList[i] as ReceiveRedEnvelope;
                        if(receiveRedEnvelope.receiveNickname != null && receiveRedEnvelope.receiveNickname !=''){
                            receiveRedEnvelope.receiveAvatar = letterAvatar(receiveRedEnvelope.receiveNickname, 32);
                        }else{
                            receiveRedEnvelope.receiveAvatar = letterAvatar(receiveRedEnvelope.receiveAccount, 32);
                        }
                        state.receiveRedEnvelopeList.push(receiveRedEnvelope);
                    }
                }

                //显示更多
                if(parseInt(data.totalrecord) != state.receiveRedEnvelopeList.length){
                    
                    state.receiveRedEnvelope_more = true;
                }else{
                    state.receiveRedEnvelope_more = false;
                }
                state.receiveRedEnvelopeCurrentPage = data.currentpage;
            }

        }).catch((error: any) =>{
            console.log(error);
        });
    }


    //抢红包
    const grabRedEnvelope = (giveRedEnvelopeId:string) => {
        let formData = new FormData();
        formData.append('giveRedEnvelopeId', giveRedEnvelopeId);
        
        proxy?.$axios({
            url: '/user/control/redEnvelope/addReceiveRedEnvelope',
            method: 'post',
            data: formData
        })
        .then((response: AxiosResponse) => {
            if(response){

                const result: any = response.data;
            
                if(result.success){
                    
                    let receiveRedEnvelopeAmount = result.receiveRedEnvelopeAmount
                    ElMessage({
                        showClose: true,
                        message: t('thread.800',{'p1': receiveRedEnvelopeAmount}),//抢到 "+receiveRedEnvelopeAmount+" 元红包
                        type: 'success',
                    })

                    nextTick(()=>{
                        state.receiveRedEnvelopeList.length = 0;//清空数组
                        querySentRedEnvelopeDetail(giveRedEnvelopeId);
                        queryReceivedRedEnvelope(giveRedEnvelopeId,1);

                    })
                }else{
                    //处理错误信息
                    processErrorInfo(result.error as Map<string,string> , reactive({}),()=>{});

                    

                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }


    //查询投票主题
    const queryVoteTheme = (voteThemeId:string) => {
        
        if(voteThemeId == null || voteThemeId == ''){
            return;
        }
        proxy?.$axios({
            url: '/queryVoteThemeDetail',
            method: 'get',
            params:  {
                voteThemeId:voteThemeId
            },
        })
        .then((response: AxiosResponse) => {
            return response?.data;
        })
        .then((data: VoteTheme) => {

            state.voteTheme = data;
            if(data != null){
                let count = Long.fromString("0");
                if(data.voteOptionList != null && data.voteOptionList.length >0){
                    
                    for(let i =0; i< data.voteOptionList.length; i++){
                        let voteOption = data.voteOptionList[i];

                        let longValue = Long.fromString(voteOption.totalVotes)
                        count = count.add(longValue);
                    }
                }
                state.voterCount = count.toString();

                if(data.voteOptionList != null && data.voteOptionList.length >0){
                    
                    for(let i =0; i< data.voteOptionList.length; i++){
                        let voteOption = data.voteOptionList[i];
                        if(parseInt(voteOption.totalVotes) ===0){
                            state.votePercentage.set(voteOption.id,0);
                        }else{
                            state.votePercentage.set(voteOption.id,Math.round(parseInt(voteOption.totalVotes)/parseInt(state.voterCount) *100));
                        }
                        
                    }
                }

            }
            

        }).catch((error: any) =>{
            console.log(error);
        });
    }

    //参与投票
    const addVoteRecord = (voteOption:VoteOption) => {
        if(voteOption.selected){
            return;
        }

        let formData = new FormData();
        formData.append('voteOptionId', voteOption.id);
        
        proxy?.$axios({
            url: '/user/control/vote/addVoteRecord',
            method: 'post',
            data: formData
        })
        .then((response: AxiosResponse) => {
            if(response){

                const result: any = response.data;
                if(result.success){
                    
                    ElMessage({
                        showClose: true,
                        message: t('thread.850'),//投票成功
                        type: 'success',
                    })

                    nextTick(()=>{
                        queryVoteTheme(state.topic.voteThemeId);
                    })
                }else{
                    //处理错误信息
                    processErrorInfo(result.error as Map<string,string> , reactive({}),()=>{});

                    

                }
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }



    //查询相似话题
    const querySimilarTopics = (topicId:string) => {
        proxy?.$axios({
            url: '/querySimilarTopics',
            method: 'get',
            params:  {
                topicId:topicId
            },
        })
        .then((response: AxiosResponse) => {
            return response?.data;
        })
        .then((data: Array<Topic>) => {
            state.similarTopicList.length =0;

            if(data){
                state.similarTopicList = data;
            }
        }).catch((error: any) =>{
            console.log(error);
        });
    }
    
    //点击回复层级
    const clickReplyLevel = (commentId:string,replyId:string) => {
       
       //是否点击已选中的项
       let isSelectedItem = false;


       if(state.dot.size >0){
           let lastFriendReplyId = [...state.dot][state.dot.size-1];//最后一个元素
           if(lastFriendReplyId[0] == replyId){
               isSelectedItem = true;
           }
       }

       state.dot.clear();
       state.line.clear();
       if(!isSelectedItem){
           showReplyLevel(commentId,replyId);
       }
       
    }

    //关闭回复层级
    const closeReplyLevel = () => {
        state.dot.clear();
        state.line.clear();
    }

    //展示回复层级
    const showReplyLevel = (commentId:string,replyId:string) => {

       let dotArray = new Array();
       let replyList = [] as Array<Reply>;
       if(state.commentList != null && state.commentList.length > 0){
           A:for (let i = 0; i <state.commentList.length; i++) {
               let comment = state.commentList[i];
               
                if(comment.id == commentId){
                   //回复
                   if(comment.replyList != null && comment.replyList.length >0){
                       replyList = comment.replyList;
                       for (let j = 0; j <comment.replyList.length; j++) {
                           let reply = comment.replyList[j];
                           if(reply.id == replyId && reply.friendUserName != null && reply.friendUserName != ''){
                               let friendReplyIdArray = reply.friendReplyIdGroup.split(",");
                               for (let k = 0; k <friendReplyIdArray.length; k++) {
                                   let friendReplyId = friendReplyIdArray[k];
                                   if(friendReplyId != '' && friendReplyId != '0'){
                                       dotArray.push(friendReplyId);
                                   }
                               }
                               break A;
                           }
                       }
                   }
                }                       
               
           }
       }

       //第一个有效层级
       let firstLevel = '';

       A:for (let i = 0; i <dotArray.length; i++) {
           let friendReplyId = dotArray[i];
           for (let j = 0; j <replyList.length; j++) {
               let reply = replyList[j];
               if(reply.id == friendReplyId){
                   firstLevel = friendReplyId;
                   break A;
               }
           }
       }

       //过滤无效的点
       A:for (let i = dotArray.length - 1; i >= 0; i--) {
           let friendReplyId = dotArray[i];
           for (let j = 0; j <replyList.length; j++) {
               let reply = replyList[j];
               if(reply.id == friendReplyId){
                   continue A;
               }
           }
           dotArray.splice(i, 1);
       }

       if(dotArray.length >0){
           for (let i = 0; i <dotArray.length; i++) {
               let friendReplyId = dotArray[i];
               state.dot.set(friendReplyId,true);//楼中楼的点
           }
           for (let i = 0; i <replyList.length; i++) {
               let reply = replyList[i];
               if(reply.id == firstLevel){
                   state.line.set(reply.id,true);//楼中楼的线
                   continue;
               }
               if(reply.id == replyId){
                   break;
               }
               if(state.line.size >0){
                   state.line.set(reply.id,true);//楼中楼的线
               }
           }

           state.dot.set(replyId,true);//楼中楼点击的层
        }
    }

    //右边栏滚动事件
    const onRightScroll = (value: { scrollTop: number, fixed: boolean }) => {
        let clientHeight = document.documentElement.clientHeight;
        let rightOffsetHeight = right_ref.value.offsetHeight;
        if(rightOffsetHeight > clientHeight){
            state.affix_offset = -(rightOffsetHeight - clientHeight + 10);
        }
    }


    //滚动到评论窗口
    const onScrollToCommentWindow = () => {
        (document.querySelector(".addComment-wrap") as any).scrollIntoView({
            behavior: "smooth"
        });
    }



    //清除编辑器
    const clearEditor = () => {
        if (Object.keys(state.addCommentEditor).length != 0) {//不等于空
            //state.addCommentEditor.html("");//清空字段
			state.addCommentEditor.remove();
            state.addCommentEditor = {};
		}
        state.addCommentEditorCreateParameObject = {};
		
		state.quoteEditorMap.forEach(function(value,key){
            //value.html("");//清空字段
			value.remove();
	    });
        state.quoteEditorMap.clear();
		
		state.editCommentEditorMap.forEach(function(value,key){
            //value.html("");//清空字段
			value.remove();
	    });
		state.editCommentEditorMap.clear();

        state.addCommentMarkdownContent='';

        state.isQuoteCommentMarkdownMap.clear();
        state.quoteCommentMarkdownContent = {} as any;//引用评论markdown编辑内容 key:评论Id value:评论内容
        

        state.isEditCommentMarkdownMap.clear();
        state.editCommentMarkdownContent = {} as any;//修改评论markdown编辑内容 key:评论Id value:评论内容
       

        state.addCommentEditorPlugin.length = 0;//插件
        state.quoteCommentEditorPlugin.length = 0;//插件
        state.editCommentEditorPlugin.length = 0;//插件

        state.editCommentFormView.clear() //修改评论表单
        state.editCommentEditorCreateParameMap.clear()//修改评论编辑器的创建参数
        state.editCommentElementNodes.clear();


        state.quoteFormView.clear() //评论引用表单
        state.quoteEditorCreateParameMap.clear()//引用评论编辑器的创建参数
        state.quoteElementNodes.clear();

        state.addReplyEditorMap.forEach(function(value,key){
            //value.html("");//清空字段
			value.remove();
	    });
        state.addReplyEditorMap.clear();
        state.addReplyFormView.clear() //添加回复表单
        state.addReplyEditorCreateParameMap.clear()//添加回复编辑器的创建参数
        state.addReplyElementNodes.clear();

        state.addReplyFriendEditorMap.forEach(function(value,key){
            //value.html("");//清空字段
			value.remove();
	    });
        state.addReplyFriendEditorMap.clear();
        state.addReplyFriendFormView.clear() //添加回复对方表单
        state.addReplyFriendEditorCreateParameMap.clear()//添加回复对方编辑器的创建参数
        state.addReplyFriendElementNodes.clear();

        state.editReplyEditorMap.forEach(function(value,key){
            //value.html("");//清空字段
			value.remove();
	    });
        state.editReplyEditorMap.clear();
        state.editReplyFormView.clear() //修改回复表单
        state.editReplyEditorCreateParameMap.clear()//修改回复编辑器的创建参数
        state.editReplyElementNodes.clear();
    }
  

  
    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'thread'){
            let page:number | undefined = undefined;
            let topicId:string = '';
            let commentId:string = '';
            let replyId:string = '';
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            if(to.query.topicId != undefined){
                topicId = to.query.topicId as string
            }
            if(to.query.commentId != undefined){
                commentId = to.query.commentId as string
            }
            if(to.query.replyId != undefined){
                replyId = to.query.replyId as string
            }
            //清除编辑器
            clearEditor();
            //移除绑定事件
            window.removeEventListener('scroll', onMarkdownTocScroll, true)
            queryTopic(topicId,()=>{
                state.topicId = topicId;
                queryAddComment(topicId);
                queryFollowerCount(state.topic.userName);//查询粉丝总数
                queryFollowing(state.topic.userName);//查询是否已关注该用户
                queryAnswerCount(state.topic.userName);
                queryFollowCount(state.topic.userName);
                querySentRedEnvelopeDetail(state.topic.giveRedEnvelopeId);
                queryReceivedRedEnvelope(state.topic.giveRedEnvelopeId, 1);

                queryVoteTheme(state.topic.voteThemeId);

                window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
                if(headerComponent.value){
                    headerComponent.value.forceAffix()//强制显示顶部Affix(固钉)内的栏目  
                }
            });
            hasUserFavoritedTopic(topicId);
            queryFavoriteCount(topicId);
            hasUserLikedTopic(topicId,10);
            queryLikeCount(topicId,10);
            queryCommentList(topicId,commentId,replyId,page);
            querySimilarTopics(topicId);
            
        }
        
        next();
    });

    //清空
    onBeforeUpdate(() => {
        topicRefs.value = {};
        markdownTocInnerRefs.value = {}
    })




    //监听用户信息
    let watch_systemUser = watch(() => store.state.systemUser, (val, old) => {
        if(store.state.systemUser != null && Object.keys(store.state.systemUser).length >0){
            if(state.topicId && !state.alreadyLiked){
                hasUserLikedTopic(state.topicId,10);
            }
            if(state.topicId && !state.isFavorited){
                hasUserFavoritedTopic(state.topicId);
            }
            
            watch_systemUser();//取消监听
        }
    })


    onMounted(() => {
        let page:number|undefined = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :undefined;
        let topicId:string = router.currentRoute.value.query.topicId != undefined ?router.currentRoute.value.query.topicId as string :'';
        
        let commentId:string = router.currentRoute.value.query.commentId != undefined ?router.currentRoute.value.query.commentId as string :'';
        let replyId:string = router.currentRoute.value.query.replyId != undefined ?router.currentRoute.value.query.replyId as string :'';
        
        state.topicId = topicId;

        queryTopic(topicId,()=>{
            queryAddComment(topicId);
            
            queryFollowerCount(state.topic.userName);//查询粉丝总数
            queryFollowing(state.topic.userName);//查询是否已关注该用户
            queryAnswerCount(state.topic.userName);
            queryFollowCount(state.topic.userName);
            querySentRedEnvelopeDetail(state.topic.giveRedEnvelopeId);
            queryReceivedRedEnvelope(state.topic.giveRedEnvelopeId, 1)


            queryVoteTheme(state.topic.voteThemeId);

        });
        
        hasUserFavoritedTopic(topicId);
        queryFavoriteCount(topicId);
        hasUserLikedTopic(topicId,10);
        queryLikeCount(topicId,10);
        queryCommentList(topicId,commentId,replyId,page);
        querySimilarTopics(topicId);

    }) 

    //卸载组件实例后调用
    onUnmounted (()=>{
        //清除播放器
        clearVideoPlayer();

        clearEditor();
        //移除绑定事件
        window.removeEventListener('scroll', onMarkdownTocScroll, true)
    })

</script>

<style scoped lang="scss">
:deep(.dropdown-menu-icon){
    margin-right: 4px;
    position: relative;
    top: 3px;
}
:deep(.topicDetailPermission){
    .el-empty__description p{
        font-size: 15px;
    }
}
.topicContentModule{
    display: flex;
    .left {
        flex: 1 0 auto;
        width: 900px;
        height: auto;
        .topic-wrap{
            background: #fff;
            box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
            border-radius: 8px;
            position: relative;
            .topicTag{
                padding-top:15px;
                margin-left:15px;
                .tag{
                    display: inline-block;
                    font-size: 14px;
                    line-height: 14px;
                    padding: 6px 8px 6px 8px;
                    margin-right: 5px;
                    border-radius: 3px;
                    color: $color-black-80;
                    background-color: $color-black-20;
                    position:relative;
                    &:hover {
                        background-color: $color-black-30;
                        color: $color-black-80;
                        text-decoration: none;
                    }
                }
            }
            .rightInfo{
                position:absolute; 
                right: 15px;
                top: 20px;
                font-size: 0px;

                .ipAddress{
                    float: right;
                    .icon{
                        margin-right: 3px;
	                    position: relative;
                        top: 2px;
                    }
                    span{
                        font-size: 15px;
                        color:$color-black-50;
                    }
                }
                .editTopic{
                    float: right;
                    .icon{
                        margin-right: 3px;
                        position: relative;
                        top: 3px;
                    }
                    a{
                        font-size: 15px;
                        margin-left: 10px;
                    }
                }
                .report{
                    float: right;
                    &:hover * {
                        color: #1890ff;
                    }
                    .icon{
                        margin-right: 3px;
                        position: relative;
                        top: 3px;
                    }
                    span{
                        font-size: 15px;
                        margin-left: 10px;
                        color:$color-black-50;
                        cursor:pointer;
                    }
                    
                }
            }

            .topicBox{
                height: auto;
                padding:15px 15px 25px 15px;
                .title{
                    color:$color-black-100;
                    font-size:24px;
                    border:none;
                    line-height:34px; 
                    margin:9px 0 18px 0;
                    h1{
                        display: inline;
                        font-weight:normal;
                        margin-right:6px;
                    }
                    .essence{
                        display: inline-block;
                        vertical-align: middle;
                        padding: 3px 4px;
                        margin-right:6px;
                        font-size: 15px;
                        line-height: 15px;
                        -webkit-border-radius: 2px;
                        -moz-border-radius: 2px;
                        border-radius: 2px;
                        color: #fff;
                        background-color: #fb6735;
                        position: relative;
                        top: -1px;
                    }
                    .top{
                        display: inline-block;
                        vertical-align: middle;
                        padding: 3px 4px;
                        margin-right:1px;
                        font-size: 15px;
                        line-height: 15px;
                        -webkit-border-radius: 2px;
                        -moz-border-radius: 2px;
                        border-radius: 2px;
                        color: #fff;
                        background-color: #5aa4ff;
                        position: relative;
                        top: -1px;
                    }
                }
                .topicInfo{
                    color: $color-black-50;font-size: 14px;
                    position: relative;
                    .postTime{
                        float: left;
                    }
                    .viewTotal-icon{
                        float: left;margin-left: 20px;margin-top: 2px;
                    }
                    .viewTotal{
                        float: left;margin-left: 3px;
                    }
                    .comment-icon{
                        float: left;margin-left: 20px;margin-top: 2px;
                    }
                    .comment{
                        float: left;margin-left: 3px;
                    }
                    .ribbon-container{
                        position: absolute;
                        bottom: -27px;
                        right: -21px;
                        display: flex;
                        .fold {
                            --f: 6px; /* 控制折叠部分*/
                            --r: 15px; /* 控制丝带形状 */
                            --t: 10px; /* 上方偏移距离 */

                            // inset: var(--t) calc(-1*var(--f)) auto auto;
                            padding: 0 10px var(--f) calc(10px + var(--r));
                            clip-path:
                                //左上角开始的裁切路径点
                                polygon(0 0/* (1) */,100% 0/* (2) */,100% calc(100% - var(--f))/* (3) */,
                                calc(100% - var(--f)) 100%,/* (4) */
                                calc(100% - var(--f)) calc(100% - var(--f)),/* (5) */
                                0 calc(100% - var(--f)),/* (6) */
                                var(--r) calc(50% - var(--f)/2));/* (7) */
                            background: #fb6735;
                            box-shadow: 0 calc(-1*var(--f)) 0 inset #0005;
                            line-height: 32px;
                            color: #fff;
                        }
                    
                        .arrow{
                            position: relative;
                            right: -35px;
                            --f: 6px; /* 控制折叠部分*/
                            --r: 15px; /* 控制丝带形状 */
                            --t: 10px; /* 上方偏移距离 */

                            // inset: var(--t) calc(-1*var(--f)) auto auto;
                            padding: 0 42px var(--f) calc(10px + var(--r));
                            clip-path:
                                polygon(0 0,100% 0,100% calc(100% - var(--f)),

                                0 calc(100% - var(--f)),
                                var(--r) calc(50% - var(--f)/2));
                            background: #5aa4ff;
                            box-shadow: 0 calc(-1*var(--f)) 0 inset #0005;
                            line-height: 32px;
                            color: #fff;
                        }
                        .essence{
                            background: #fb6735;
                        }
                        .pinned{
                            background: #5aa4ff;
                        }
                    }
                }
                :deep(.topicMarkdownContent){
                    border-top:1px solid $color-black-20;
                    margin-top:5px;
                    padding:20px 0px;
                    color:$color-black-90;
                    font-size:16px; 
                    line-height:1.75; 
                    word-wrap : break-word;word-break : break-all;
                    min-height: 100px;
                    .cancelAccount{
                        display: inline-block;
                        vertical-align: middle;
                        padding: 6px 6px;
                        font-size: 14px;
                        line-height: 14px;
                        -webkit-border-radius: 2px;
                        -moz-border-radius: 2px;
                        border-radius: 2px;
                        color: $color-black-50;
                        background-color: $color-black-10;
                        margin-bottom: 6px;
                    }
                    .lastUpdateTime{
                        text-align: center;padding-top: 20px; padding-bottom: 30px;color: $color-black-60;font-size: 15px;
                    }
                    a{
                        color: #1890ff;
                        font-size:16px;
                    }
                    a[linkType*="mention"] {
                        color: #409eff;
                    }
                    //自动换行
                    pre{
                        white-space:pre-wrap;
                    }
                    
                    ol{
                        list-style: decimal;
                    }
                    ol li{
                        list-style-type:decimal;
                        list-style-position:inside;
                    }
                    ul{
                        list-style: disc;
                    }
                   // ul li{
                     //   list-style-type:disc;
                  //  }
                    .task-list-item {
                        list-style-type:none;
                    }
                    p{
                        font-size:16px;
                        word-wrap : break-word;word-break : break-all;
                    }
                    code[class*="language-"]{
                        padding: 0 0;
                    }
                    img{
                        max-width:100%;height:auto;border:none;background:none;margin:0;padding:0; 
                        cursor: -webkit-zoom-in;
                        cursor: zoom-in;
                        vertical-align: sub;
                    }
                    .el-image[style*="width: 32px; height: 32px;"]{
                        top: 3px;
                    }
                    .download{
                        color: #1890ff;
                        margin: 0 5px 0 5px;
                        cursor: pointer;
                        font-size:16px;
                        .link-icon {
                            position: relative;
                            top: 4px;
                            margin-right: 2px;
                            color:#1890ff;
                        }
                    }
                    table {
                        border-collapse: separate; 
                        border-spacing: 0; 
                        border-top: 1px solid $color-black-30;
                        border-left: 1px solid $color-black-30;
                        th {
                            font-weight: 600
                        }
                        th, td {
                            border-right: 1px solid $color-black-30; 
                            border-bottom: 1px solid $color-black-30;
                            padding: 6px 13px
                        }
                        tr {
                            background-color: #fff;
                            border-top: 1px solid $color-black-30;
                            &:nth-child(2n) {
                                background-color: $color-black-10;
                            }
                        }
                    }
                    iframe{
                        width:100%; height: 550px;padding:10px 0px; 
                    }
                    player{
                        width: 100%;
                        height: 576px;
                        display: block;
                        margin-top: 10px;
                    }
                    .dplayer-process {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 99;
                        .box{
                            position: relative;
                            width: 100%;
                            height: 100%;
                            .prompt{
                                width: 550px;
                                height: 80px;
                                position: absolute;
                                left: 0;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                margin: auto;
                                padding :0px 30px;
                                border-radius :3px;
                                color: #fff;
                                line-height: 80px;
                                font-size: 20px;
                                background-color:rgb(0,0,0);
                                opacity:0.7;
                                filter:alpha(opacity=70);
                                text-align: center;
                            }
                        }
                    }
                    hide{
                        display:block;
                        background: $color-black-10;
                        min-height:100px;
                        margin-left: 10px;
                        margin-right: 10px;
                        margin-top: 17px;
                        margin-bottom: 15px;
                        border: 3px dashed $color-black-30;
                        border-radius: 5px;
                        .hide-box{
                            margin: 20px;position: relative;text-align: center;
                        }
                        .background-image{
                            margin: auto;
                            margin-top:15px;
                            color: $color-black-40;
                        }
                        .background-prompt{
                            margin-top: 5px; color: $color-black-50;font-size: 16px;
                        }
                        .highlight{
                            font-weight:bold;
                        }
                        .input-box{
                            pointer-events: none;
                            margin: auto; 
                            margin-top: 10px;
                            margin-bottom:25px; 
                            border:$color-black-70 solid 2px;
                            width:226px; 
                            height:26px; 
                           // overflow:hidden; 
                            border-radius: 2px;
                            position: relative;
                            &:hover{
                                border:$color-black-80 solid 2px;
                                .button{
                                    border:transparent solid 0px; 
                                    background:$color-black-80;
                                }
                            }
                            .text{ 
                                pointer-events:auto;
                                width:145px; 
                                height:26px; 
                                line-height:26px; 
                                border:0; 
                                float:left; 
                                font-size:14px; 
                                color:$color-black-80; 
                                text-indent: 6px; 
                                vertical-align:middle;
                                outline:none; 
                                background: $color-black-10;
                            }
                            .button{
                                position: absolute;
                                top: -1px;
                                right: -2px;
                                pointer-events:auto; 
                                display: inline-block;
                                white-space:nowrap;
                                width:80px;
                                height:28px; 
                                vertical-align: middle;
                                font-size: 15px;
                                line-height: 28px;
                                -webkit-border-radius: 0px 2px 2px 0px;
                                -moz-border-radius: 0px 2px 2px 0px;
                                border-radius: 0px 2px 2px 0px;
                                color:#fff;
                                background-color:$color-black-70;
                                cursor:pointer;
                                user-select:none;
                                &:hover{
                                    background:$color-black-80;
                                }
                            }
                        }
                        .submit-box{
                            margin-top: 10px;
                            margin-bottom:5px; 
                            display: inline-block;
                            white-space:nowrap;
                            width:80px;
                            height:30px; 
                            vertical-align: middle;
                            font-size: 15px;
                            line-height: 30px;
                            -webkit-border-radius: 2px;
                            -moz-border-radius: 2px;
                            border-radius: 2px;
                            color:#fff;
                            background-color:$color-black-70;
                            cursor:pointer;
                            user-select:none;
                            &:hover{
                                background:$color-black-80;
                            }
                        }
                        .input-box{
                            .text::-webkit-input-placeholder {
                                color: $color-black-70;
                            }
                            .text:-ms-input-placeholder {
                                color: $color-black-70;
                            }
                            .text:-moz-placeholder {
                                color: $color-black-70;
                            }
                            .text::-moz-placeholder {
                                color: $color-black-70;
                            }
                        }
                    }
                }

                :deep(.topicContent){
                    border-top:1px solid $color-black-20;
                    margin-top:5px;
                    padding:20px 0px;
                    color:$color-black-90;
                    font-size:16px; 
                    line-height:1.75; 
                    word-wrap : break-word;word-break : break-all;
                    min-height: 100px;
                    .cancelAccount{
                        display: inline-block;
                        vertical-align: middle;
                        padding: 6px 6px;
                        font-size: 14px;
                        line-height: 14px;
                        -webkit-border-radius: 2px;
                        -moz-border-radius: 2px;
                        border-radius: 2px;
                        color: $color-black-50;
                        background-color: $color-black-10;
                        margin-bottom: 6px;
                    }
                    .lastUpdateTime{
                        text-align: center;padding-top: 20px; padding-bottom: 30px;color: $color-black-60;font-size: 15px;
                    }
                    a{
                        color: #1890ff;
                    }
                    a[linkType*="mention"] {
                        color: #409eff;
                    }
                    p{
                        font-size:16px;
                        word-wrap : break-word;word-break : break-all;
                    }
                    img{
                        max-width:100%;height:auto;border:none;background:none;margin:0;padding:0; 
                        cursor: -webkit-zoom-in;
                        cursor: zoom-in;
                        vertical-align: sub;
                    }
                    .el-image[style*="width: 32px; height: 32px;"]{
                        top: 3px;
                    }
                    
                    .download{
                        color: #1890ff;
                        margin: 0 5px 0 5px;
                        cursor: pointer;
                        font-size:16px;
                        .link-icon {
                            position: relative;
                            top: 4px;
                            margin-right: 2px;
                            color:#1890ff;
                        }
                    }
                    /** 解决Chrome内核浏览器DPI缩放比例高于100%时部分边框变粗问题   本方案需删除table样式 border="1" bordercolor="#000000" */
                    table {
                        border-collapse: separate; 
                        border-spacing: 0; 
                        border-top: 1px solid $color-black-30;
                        border-left: 1px solid $color-black-30;
                        th {
                            font-weight: 600
                        }
                        th, td {
                            border-right: 1px solid $color-black-30; 
                            border-bottom: 1px solid $color-black-30;
                            padding: 6px 13px
                        }
                        tr {
                            background-color: #fff;
                            border-top: 1px solid $color-black-30;
                            &:nth-child(2n) {
                                background-color: $color-black-10;
                            }
                        }
                        /**
                        table {
                            width: 100%;
                            th {
                                font-weight: 600
                            }
                            td,th {
                                border: 1px solid $color-black-30;
                                padding: 6px 13px
                            }
                            tr {
                                background-color: #fff;
                                border-top: 1px solid $color-black-30;
                                &:nth-child(2n) {
                                    background-color: $color-black-10;
                                }
                            }
                        }**/
                    }
                    ol{
                        li{ 
                            list-style-type:decimal;
                            list-style-position:inside;
                        }
                    }
                    ul{
                        li{ 
                            margin-left:20px;
                            list-style-type:disc;
                        }
                    }
                    iframe{
                        width:100%; height: 550px;padding:10px 0px; 
                    }
                    player{
                        width: 100%;
                        height: 576px;
                        display: block;
                        margin-top: 10px;
                    }
                    .dplayer-process {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 99;
                        .box{
                            position: relative;
                            width: 100%;
                            height: 100%;
                            .prompt{
                                width: 550px;
                                height: 80px;
                                position: absolute;
                                left: 0;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                margin: auto;
                                padding :0px 30px;
                                border-radius :3px;
                                color: #fff;
                                line-height: 80px;
                                font-size: 20px;
                                background-color:rgb(0,0,0);
                                opacity:0.7;
                                filter:alpha(opacity=70);
                                text-align: center;
                            }
                        }
                    }
                    hide{
                        display:block;
                        background: $color-black-10;
                        min-height:100px;
                        margin-left: 10px;
                        margin-right: 10px;
                        margin-top: 17px;
                        margin-bottom: 15px;
                        border: 3px dashed $color-black-30;
                        border-radius: 5px;
                        .hide-box{
                            margin: 20px;position: relative;text-align: center;
                        }
                        .background-image{
                            margin: auto;
                            margin-top:15px;
                            color: $color-black-40;
                        }
                        .background-prompt{
                            margin-top: 5px; color: $color-black-50;font-size: 16px;
                        }
                        .highlight{
                            font-weight:bold;
                        }
                        .input-box{
                            pointer-events: none;
                            margin: auto; 
                            margin-top: 10px;
                            margin-bottom:25px; 
                            border:$color-black-70 solid 2px;
                            width:226px; 
                            height:26px; 
                           // overflow:hidden; 
                            border-radius: 2px;
                            position: relative;
                            &:hover{
                                border:$color-black-80 solid 2px;
                                .button{
                                    border:transparent solid 0px; 
                                    background:$color-black-80;
                                }
                            }
                            .text{ 
                                pointer-events:auto;
                                width:145px; 
                                height:26px; 
                                line-height:26px; 
                                border:0; 
                                float:left; 
                                font-size:14px; 
                                color:$color-black-80; 
                                text-indent: 6px; 
                                vertical-align:middle;
                                outline:none; 
                                background: $color-black-10;
                            }
                            .button{
                                position: absolute;
                                top: -1px;
                                right: -2px;
                                pointer-events:auto; 
                                display: inline-block;
                                white-space:nowrap;
                                width:80px;
                                height:28px; 
                                vertical-align: middle;
                                font-size: 15px;
                                line-height: 28px;
                                -webkit-border-radius: 0px 2px 2px 0px;
                                -moz-border-radius: 0px 2px 2px 0px;
                                border-radius: 0px 2px 2px 0px;
                                color:#fff;
                                background-color:$color-black-70;
                                cursor:pointer;
                                user-select:none;
                                &:hover{
                                    background:$color-black-80;
                                }
                            }
                        }
                        .submit-box{
                            margin-top: 10px;
                            margin-bottom:5px; 
                            display: inline-block;
                            white-space:nowrap;
                            width:80px;
                            height:30px; 
                            vertical-align: middle;
                            font-size: 15px;
                            line-height: 30px;
                            -webkit-border-radius: 2px;
                            -moz-border-radius: 2px;
                            border-radius: 2px;
                            color:#fff;
                            background-color:$color-black-70;
                            cursor:pointer;
                            user-select:none;
                            &:hover{
                                background:$color-black-80;
                            }
                        }
                        .input-box{
                            .text::-webkit-input-placeholder {
                                color: $color-black-70;
                            }
                            .text:-ms-input-placeholder {
                                color: $color-black-70;
                            }
                            .text:-moz-placeholder {
                                color: $color-black-70;
                            }
                            .text::-moz-placeholder {
                                color: $color-black-70;
                            }
                        }
                    }
                    //自动换行
                    pre{
                        white-space:pre-wrap;
                    }
                }
                //举报标记
                .reportMark{
                    &:before{
                        content: " ";
                        position: absolute;
                        top: 0px;
                        left: -8px;
                        bottom:0px;
                        border-left: 5px solid #f89898;
                    }
                }
            }
        }
    }
    .right{
        order: 2;
        flex: 0 0 auto;
        width: 300px;
        height: auto;
        margin-left: 10px;
        .affix-container{
            height: 100%;
        }
        .right-container{
            .userInfo-wrap{
                background: #fff;
                box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
                border-radius: 8px;
                .userInfo {
                    padding: 20px 0 20px 0;
                    margin-left:8px;
                    margin-right:8px;
                    height: auto;
                    overflow: hidden;
                    position: relative;
                    .author{
                        text-align: center;
                        img{
                            width: 70px;
                            height: 70px;
                            border-radius: 50%;
                        
                        }
                    }
                    .name{
                        font-size: 18px;
                        text-align: center;
                        margin:14px 0 8px 0;
                        a{
                            color: $color-black-80;
                        }
                    }
                    .role{
                        text-align: center;
                        .userRoleName{
                            display: inline-block;
                            white-space:nowrap;
                            vertical-align: middle;
                            padding: 2px 4px;
                            margin-right:5px;
                            font-size: 13px;
                            line-height: 16px;
                            -webkit-border-radius: 2px;
                            -moz-border-radius: 2px;
                            border-radius: 2px;
                            color:#e2b46e;
                            background-color:#f8e7c4;
                        }
                        .staff{
                            display: inline-block;
                            white-space:nowrap;
                            vertical-align: middle;
                            padding: 2px 4px;
                            font-size: 13px;
                            line-height: 16px;
                            -webkit-border-radius: 2px;
                            -moz-border-radius: 2px;
                            border-radius: 2px;
                            color:#4CD263;
                            background-color:#cafcc7;
                        }
                    }
                    ul{
                        width: 100%;
                        height: auto;
                        overflow: hidden;
                        padding: 15px 0 18px 0;
                        border-top: 1px solid $color-black-20;
                        margin-top: 20px;
                        li{
                            float: left;
                            width: 33%;
                            span{
                                display: block;
                                text-align: center;
                                a{
                                    color: #333;
                                    margin-bottom: 0px;
                                }
                                &:nth-child(1){
                                    font-size: 16px;
                                    color: $color-black-80;
                                }
                                &:nth-child(2){
                                    font-size: 12px;
                                    color: $color-black-60;
                                    a{
                                        color: $color-black-60;
                                    }
                                }
                            }
                        }
                    }
                    .action-button {
                        text-align: center;
                        .action-followBox{
                            margin-right: 10px;
                            .plusSign{
                                margin-right: 2px;
                            }
                        }
                    }
                }
            }
        }
    }

}


/** 收藏夹表单模块 **/
.favorite-formModule {
    display: none;
    align-items: center;
    justify-content: center;
    .btn-item {
        min-width: 100px;
        cursor: pointer;
        margin: 0 15px;
        text-align: center;
        .circle {
            margin:0 auto;
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 20px 40px rgba(0,0,0,.06);
            display: flex;
            align-items: center;
            justify-content: center;
            
            &:hover {
                background: rgba(33,41,60,.08)
            }

            .icon {
                color: #86909c;
                font-size: 30px
            }
        }
        .text {
            padding-top: 16px;
            color: #86909c;
        }
    }
    .active{
        .circle {
            background: rgb(235.9, 245.3, 255);
            width: 72px;
            height: 72px;
            box-shadow: 0 20px 40px rgba(0,0,0,.03);
            &:hover {
                background: rgb(235.9, 245.3, 255);
            }
            .icon {
                color: #409eff;
            }
        }
        .text {
            color: #409eff;
        }
    }
    
}
//右边浮动面板
@media screen and (max-width: 1426px){//在屏幕宽度小于 1426px 时应用该样式
    .favorite-formModule{
        display: flex;
    }
}


/* 投票 */
.voteModule{
	margin-top:10px;
	padding: 10px 15px;
	position: relative;
	background: #fff;
	box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
    border-radius: 8px;
    .voteTitle{
        font-size: 15px;
        line-height: 32px;
    }
    .voteOption{
        
        .voteItem{
            margin-top: 20px;
            line-height: 32px;
            font-size: 14px;
            cursor:pointer;
        }
        .progress{
            margin-top: 4px;
            :deep(.el-progress-bar__outer){
                background-color:#f2f3f5;
                cursor:pointer;
            }
            .percentage-label{
                color: #4e5969;
            }
            .percentage-value{
                color: #4e5969;
                margin-left: 8px;
            }
        }
        
        .active{
            :deep(.el-progress-bar__outer){
                background-color:#e3f1ff;
                cursor:auto;
            }


            .percentage-label{
                color: #337ecc;
            }
            .percentage-value{
                color: #337ecc;
            }
        }
    }
    .voteInfo{
        margin-top: 20px;
        color: #a9aeb8;
        display: flex;
        .status{
            margin-left: 12px;
        }
        .quantity{
            flex: 1;
            text-align: right;
        }
    }
}

/* 评论 */
.commentModule{
	margin-top:10px;
	padding: 0px 10px 50px 10px;
	position: relative;
	padding-bottom:0;
	background: #fff;
	box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
    border-radius: 8px;
    .commentList{
        list-style:none;
        font-size: 15px;
        .commentInfo{
            padding:15px 0 5px 77px;
            border-bottom:1px solid $color-black-20;
            .comment-author{
                position:relative;
                color:$color-black-60;
                img{
                    width:60px;
                    height:60px;
                    position:absolute;
                    left:-72px;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    border-radius:50%;
                    display:block;
                }
                .info-container{
                    font-style:normal;
                    font-size:0;/*父级元素设置font-size:0; 解决 display：inline-block两个元素之间的默认空格 */
                    .userName{
                        display: inline-block;
                        color: $color-black-60;
                        font-size: 14px;
                    }
                }
                .cancelNickname{
                    font-size: 14px;
                    font-weight:normal;
                    margin-right: 3px;
                    color: transparent;
                    text-shadow: 0 0 5px rgba(0,0,0,0.4);
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
                    top: -5px;
                }
                .master{
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
                    color:#fff;
                    background-color:#69c0ff;
                    position: relative;
                    top: -5px;
                }
            }
            .commentTime{
                margin-top:3px;
                margin-bottom:5px;
                color:$color-black-50;
                font-size: 13px;
                a{
                    color:$color-black-50;
                }
            }
            :deep(.commentMarkdownContent){
                padding:0px;
                word-wrap : break-word;word-break : break-all;
                color:$color-black-90;
                font-size:15px; 
                line-height:1.75; 
                margin-top: 20px;
                .cancelAccount{
                    display: inline-block;
                    vertical-align: middle;
                    padding: 6px 6px;
                    font-size: 14px;
                    line-height: 14px;
                    -webkit-border-radius: 2px;
                    -moz-border-radius: 2px;
                    border-radius: 2px;
                    color: $color-black-50;
                    background-color: $color-black-10;
                }
                img {
                    max-width:100%;
                    height:auto;
                    border:none;
                    background:none;
                    margin:0;
                    padding:0;
                    vertical-align: sub;
                }
                .el-image[style*="width: 32px; height: 32px;"]{
                    top: 3px;
                }
                p{
                    font-size:16px;
                    word-wrap : break-word;word-break : break-all;
                }
                code[class*="language-"]{
                    padding: 0 0;
                }
                a[linkType*="mention"] {
                    color: #409eff;
                }
                table {
                    width: 100%;
                    th {
                        font-weight: 600
                    }
                    td,th {
                        border: 1px solid $color-black-30;
                        padding: 6px 13px
                    }
                    tr {
                        background-color: #fff;
                        border-top: 1px solid $color-black-30;
                        &:nth-child(2n) {
                            background-color: $color-black-10;
                        }
                    }
                }
                ol{
                    li{ 
                        list-style-type:decimal;
                        list-style-position:inside;
                    }
                }
                ul{
                    li{ 
                        margin-left:20px;
                        list-style-type:disc;
                    }
                }
                .task-list-item {
                    list-style-type:none;
                }
                iframe{
                    width:100%; height: 550px;padding:10px 0px; 
                }
            }
            :deep(.commentContent){
                padding:0px;
                word-wrap : break-word;word-break : break-all;
                color:$color-black-90;
                font-size:15px; 
                line-height:1.75; 
                margin-top: 20px;
                .cancelAccount{
                    display: inline-block;
                    vertical-align: middle;
                    padding: 6px 6px;
                    font-size: 14px;
                    line-height: 14px;
                    -webkit-border-radius: 2px;
                    -moz-border-radius: 2px;
                    border-radius: 2px;
                    color: $color-black-50;
                    background-color: $color-black-10;
                }
                img {
                    max-width:100%;
                    height:auto;
                    border:none;
                    background:none;
                    margin:0;
                    padding:0;
                    vertical-align: sub;
                }
                .el-image[style*="width: 32px; height: 32px;"]{
                    top: 3px;
                }
                a[linkType*="mention"] {
                    color: #409eff;
                }
                pre{
                    white-space:pre-wrap;
                    code{/*连续字母数字换行*/
                        word-break: break-all;
                    }
                }
                table {
                    width: 100%;
                    th {
                        font-weight: 600
                    }
                    td,th {
                        border: 1px solid $color-black-30;
                        padding: 6px 13px
                    }
                    tr {
                        background-color: #fff;
                        border-top: 1px solid $color-black-30;
                        &:nth-child(2n) {
                            background-color: $color-black-10;
                        }
                    }
                }
                ol{
                    li{ 
                        list-style-type:decimal;
                        list-style-position:inside;
                    }
                }
                ul{
                    li{ 
                        margin-left:20px;
                        list-style-type:disc;
                    }
                }
            }
        }
        :deep(.quote){
            padding:5px 8px;
            border-bottom:none;
            text-align: left;
            margin-top: 20px;
            .cancelNickname{
                font-weight:normal;
                margin-right: 3px;
                color: transparent;
                text-shadow: 0 0 5px rgba(0,0,0,0.4);
                zoom: 1;
                user-select:none;
            }
            .cancelAccount{
                display: inline-block;
                vertical-align: middle;
                padding: 6px 6px;
                font-size: 14px;
                line-height: 14px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                border-radius: 2px;
                color: $color-black-50;
                background-color: $color-black-25;
            }
            .quoteComment{
                background:$color-black-10;
                padding:5px 8px 8px 8px;
                border:1px solid $color-black-30;
                line-height:140%;
                margin-bottom:6px;
                line-height: 28px;
                border-radius: 3px;
                .userName{
                    font-size:14px;
                    height: 30px;
                    position: relative;
                    margin-left: 26px;
                    color:$color-black-60;
                    .avatarBox{
                        position:absolute;
                        display:inline-block;
                        border-radius:100%;
                        left: -26px;
                        top:-4px;
                        img{
                            border-radius:100%;
                            width: 22px;
                        }
                    }
                }
                .quoteContent{
                    margin-top: 8px;
                    margin-bottom: 2px;
                }
            }
        }
        //举报标记
        .reportMark{
            position:relative;
            &:before{
                content: " ";
                position: absolute;
                top: 0px;
                left: -18px;
                bottom:0px;
                border-left: 5px solid #f89898;
            }
        }
        .replyList {
            padding: 10px 0 0px;
            margin-left: 36px;
            margin-right:10px;
            position: relative;
            line-height: 22px;
            margin-top: 20px;
            background: $color-black-10;
            &:before {
                position: absolute;
                display: block;
                width: 16px;
                height: 16px;
                border-top: 1px solid $color-black-10;
                border-left: 1px solid $color-black-10;
                -webkit-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                transform: rotate(45deg);
                content: "";
                background-color: $color-black-10;
                top: -4px;
                left: 60px
            }
            .link{
                height: 32px;
                text-align: right;
                span{
                    color: #1890ff;
                    font-size: 13px;
                    cursor: pointer;
                    margin-right: 12px;
                    background: $color-black-10;
                    mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%),
                                linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);//四周渐变透明
                    mask-composite: intersect;

                    padding: 10px 14px;
                    border-radius:4px;
                    &:hover {
                        color: #1890ff;
                    }
                }
            }
            .box{
                .replyItem-container{
                    position: relative;
                    left: -30px;

                    &:last-child{
                        //border-bottom: 1px solid #fff;
                        .replyItem{
                            border-bottom: 1px solid transparent;
                        }
                    }
                    &:before,
                    &:after {
                        content: "";
                        display: table;
                        font: 0/0 a
                    }
                    &:after {
                        clear: both;
                    }
                    .replyItem {
                        margin-bottom: 10px;
                        border-bottom: 1px solid #EDEEF1;
                        padding-bottom: 5px;
                        margin-left: 40px;
                        margin-right:-20px;
                        //举报标记
                        .reply-reportMark{
                            position: relative;
                            &:before{
                                content: " ";
                                position: absolute;
                                top: -10px;
                                left: -18px;
                                bottom:-5px;
                                border-left: 5px solid #f89898;
                            }
                        }
                        .reply-top{
                            .reply-author{
                                float: left;
                                position:relative;
                                font-size:0;/*父级元素设置font-size:0; 解决 display：inline-block两个元素之间的默认空格 */
                                .avatarBox{
                                    position:absolute;
                                    border-radius:100%;
                                    left: 0px;
                                    img{
                                        border-radius:100%;
                                        width: 40px;
                                        height: 40px;
                                        margin-top: -1px;
                                    }
                                }
                                .time{
                                    margin-left: 50px;
                                    color:$color-black-50;
                                    font-size: 13px;
                                    position: relative;
                                    top: -7px;
                                }
                                .cancelNickname{
                                    font-weight:normal;
                                    margin-right: 3px;
                                    color: transparent;
                                    text-shadow: 0 0 5px rgba(0,0,0,0.4);
                                    zoom: 1;
                                    user-select:none;
                                    font-size: 14px;
                                    display: inline-block;
                                    margin-left: 50px;
                                }
                                .userName {
                                    display: inline-block;color: $color-black-60; margin-left: 50px;
                                    font-size: 14px;
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
                                    top: -5px;
                                }
                                .master{
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
                                    color:#fff;
                                    background-color:#69c0ff;
                                    position: relative;
                                    top: -5px;
                                }
                            }
                            .friendInfo{
                                float: left;
                                margin-left: 80px;
                                position:relative;
                                .arrow{
                                    float: left;
                                    color: $color-black-50;
                                    position: relative;
                                    top: 12px;
                                    left: -45px;
                                }
                                .friendAvatarBox{
                                    position:absolute;
                                    border-radius:100%;
                                    left: 0px;
                                    img{
                                        border-radius:100%;
                                        width: 20px;
                                        height: 20px;
                                        margin-top: 10px;
                                    }
                                }
                                
                                .nameInfo {
                                    color:$color-black-60;
                                    font-size:14px;
                                    float: left;
                                    margin-left: 15px;
                                    font-weight: normal;
                                    .cancelNickname{
                                        font-weight:normal;
                                        margin-right: 3px;
                                        color: transparent;
                                        text-shadow: 0 0 5px rgba(0,0,0,0.4);
                                        zoom: 1;
                                        user-select:none;
                                        font-size: 14px;
                                        display: inline-block;
                                        position: relative;top: 9px;
                                    }
                                    .userName {
                                        display: inline-block;
                                        color: $color-black-60; 
                                        font-size: 14px;
                                        position: relative;
                                        top: 10px;
                                        max-width: 130px;
                                        overflow:hidden; //超出的文本隐藏
                                        text-overflow:ellipsis; //溢出用省略号显示
                                        white-space:nowrap; //溢出不换行
                                    }
                                    .master{
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
                                        color:#fff;
                                        background-color:#69c0ff;
                                        position: relative;
                                        top: 3px;
                                    }
                                }
                            }
                            .ipAddress {
                                float: right;
                                color:$color-black-50;
                                .ipAddress-icon{
                                    color: $color-black-50;
                                }
                                .ipAddress-text{
                                    position: relative;
                                    top: -2px;
                                    margin-left: 2px;
                                    color: $color-black-50;
                                    font-size: 13px;
                                }
                                a{
                                    &:hover * {
                                        color: #1890ff;
                                    }
                                }
                                .like-icon{
                                    position: relative;
                                    top: 1px;
                                    margin-left: 15px;
                                    color: $color-black-50;
                                }
                                .like-quantity{
                                    position: relative;
                                    top: -2px;
                                    margin-left: 2px;
                                    color: $color-black-50;
                                    font-size: 13px;
                                }
                                .like-text{
                                    position: relative;
                                    top: -2px;
                                    margin-left: 2px;
                                    color: $color-black-50;
                                    font-size: 13px;
                                }
                                .more{
                                    margin-left: 7px;
                                    .icon{
                                        position: relative;
                                        top: 3px;
                                        color: $color-black-50;
                                    }
                                }
                            }
                            
                        }
                        :deep(.replyContent){
                            font-size: 15px;
                            line-height:26px;
                            color:$color-black-80;
                            margin-top: 10px;
                            padding-top: 8px;
                            padding-bottom: 8px;

                            img {
                                max-width:100%;
                                height:auto;
                                border:none;
                                background:none;
                                margin:0;
                                padding:0;
                                vertical-align: sub;
                            }
                            .el-image[style*="width: 32px; height: 32px;"]{
                                top: 3px;
                            }
                            a[linkType*="mention"] {
                                color: #409eff;
                            }
                            .cancelAccount{
                                display: inline-block;
                                vertical-align: middle;
                                padding: 6px 6px;
                                font-size: 14px;
                                line-height: 14px;
                                -webkit-border-radius: 2px;
                                -moz-border-radius: 2px;
                                border-radius: 2px;
                                color: $color-black-50;
                                background-color:  $color-black-25;
                            }
                        }
                    }
                }
            }
        }
        .tipBottom {
            font-size: 13px;
            margin: 25px 10px 5px 50px;
            text-align: right;
            .a-toolbar {
                display: block;
                width: 100%;
                a {
                    color: $color-black-50;
                    margin-left: 15px;
                    user-select:none;
                    .icon{
                        margin-right: 3px;
                        position: relative;
                        top: 3px;
                    }
                    &:hover {
                        color: #1890ff;
                    }
                }
                .ipAddress-text {
                    color: $color-black-50;
                    margin-left: 15px;
                    margin-right: 3px;
                    .icon{
                        margin-right: 3px;
                        position: relative;
                        top: 3px;
                    }
                }
                .report{
                    color: $color-black-50;
                    margin-left: 15px;
                    margin-right: 3px;
                    user-select:none;
                    cursor:pointer;
                    .icon{
                        margin-right: 3px;
                        position: relative;
                        top: 3px;
                    }
                    &:hover {
                        color: #1890ff;
                    }
                }
            }
        }


    }
    .page{
        padding-top: 30px;
        padding-bottom: 30px;
        display: flex;
        justify-content: flex-end;
        background: #fff;
    }
}


.addCommentModule{
	margin-top:10px;
    .addComment-wrap{
        background: #fff;
        padding:15px 15px 15px 15px;
        box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
        border-radius: 8px;
    }
    .respond {
        background: $color-black-10;border-radius:4px;line-height: 40px;text-align:center;
        p {
            font-size:15px;
            padding:8px;
            overflow:hidden;
            text-align:center;
            color: $color-black-50;
        }
        a{
            color: #1890ff;
        }
    }
}

/* 评论添加 */
.comment-formModule {
	margin-top:10px;
    .addComment-wrap{
        position: relative;
        background: #fff;
        padding:15px 15px 15px 15px;
        box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
        border-radius: 8px;
        :deep(.bytemd-split){
            height: calc(100vh - 100px);
        }
        :deep(.bytemd-split .CodeMirror-scroll){//让外层滚动条不滚动
            overscroll-behavior:  contain;
        }
        :deep(.bytemd-split .bytemd-preview){//让外层滚动条不滚动
            overscroll-behavior:  contain;
        }
        :deep(.bytemd-editor){
            min-height: 180px; 
        }
        :deep(.CodeMirror-sizer){
            min-height: 175px !important; 
        }
        :deep(.bytemd-preview){
            min-height: 180px; 
        }
        

        .form-action{
            position: relative;
           
            .submitButton{
                width: 130px;
            }
            .promptInfo{
                position: absolute;
                top: 9px;
                right:15px;
                
                h2{
                    font-size: 15px;
                    color: $color-black-40;
                    font-weight: normal;
                }
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
}

/* 评论修改 */
.editComment-formModule {
	margin-top:50px;
	.editComment-wrap{
        position: relative;
        padding:8px 20px 1px 20px;
        background: $color-black-10;
        .head{
            .icon{
                position: absolute;font-size: 50px;top: -38px;left: -42px;color: $color-black-10;
            }
        }
        :deep(.bytemd-split){
            height: calc(100vh - 100px);
        }
        :deep(.bytemd-split .CodeMirror-scroll){//让外层滚动条不滚动
            overscroll-behavior:  contain;
        }
        :deep(.bytemd-split .bytemd-preview){//让外层滚动条不滚动
            overscroll-behavior:  contain;
        }
        :deep(.bytemd-editor){
            min-height: 180px; 
        }
        :deep(.CodeMirror-sizer){
            min-height: 175px !important; 
        }
        :deep(.bytemd-preview){
            min-height: 180px; 
        }
        /** 隐藏‘斜体图标’ **/
        :deep(.bytemd-toolbar-left [bytemd-tippy-path='2']) {
            display: none;
        }
        /** 隐藏‘删除线图标’ **/
        :deep(.bytemd-toolbar-left [bytemd-tippy-path='11']) {
            display: none;
        }
        //编辑器边框
        :deep(.bytemd-editor){
            border-top: 1px solid $color-black-30;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            
            border-radius:0px;
        }
        :deep(.bytemd-status){
            border: 1px solid transparent;
            border-top: 1px solid $color-black-30;
            border-radius:0px;
        }
        :deep(.bytemd-preview){
            border-top: 1px solid $color-black-30;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            border-radius:0px;
        }
        :deep(.bytemd-split .bytemd-editor){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-sidebar){
            border-top-left-radius:0px;
            border-left: 1px solid $color-black-30;
        }
        :deep(.bytemd-editor:has(~ .bytemd-sidebar)){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-editor:has(+ .bytemd-preview:not([style*='display:none']))){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-editor:has(~ .bytemd-hidden)){
            border-right: 1px solid transparent;
        }
        :deep(.bytemd-preview:has(+ .bytemd-sidebar)){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-preview:has(~ .bytemd-hidden)){
            border-right: 1px solid transparent;
        }

        /* 富文本编辑框颜色 */
        :deep(.ke-edit) {
            border: 1px solid transparent;
        }
        .submitButton{
            width: 130px;
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
        .captcha-item{
            .captchaInput{
                width: 160px;
                
            }
            :deep(.el-input__wrapper){
                background: #fff;
            }
            :deep(.el-form-item__error){
                width: 100%;
            }
            :deep(.el-image){
                height: 100%;
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

/* 引用评论 */
.quote-formModule {
	margin-top:50px;
	.addQuote-wrap{
        position: relative;
        padding:23px 20px 2px 20px;
        background: $color-black-10;

        :deep(.bytemd-split){
            height: calc(100vh - 100px);
        }
        :deep(.bytemd-split .CodeMirror-scroll){//让外层滚动条不滚动
            overscroll-behavior:  contain;
        }
        :deep(.bytemd-split .bytemd-preview){//让外层滚动条不滚动
            overscroll-behavior:  contain;
        }
        :deep(.bytemd-editor){
            min-height: 180px; 
        }
        :deep(.CodeMirror-sizer){
            min-height: 175px !important; 
        }
        :deep(.bytemd-preview){
            min-height: 180px; 
        }
        /** 隐藏‘斜体图标’ **/
        :deep(.bytemd-toolbar-left [bytemd-tippy-path='2']) {
            display: none;
        }
        /** 隐藏‘删除线图标’ **/
        :deep(.bytemd-toolbar-left [bytemd-tippy-path='11']) {
            display: none;
        }
        //编辑器边框
        :deep(.bytemd-editor){
            border-top: 1px solid $color-black-30;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            
            border-radius:0px;
        }
        :deep(.bytemd-status){
            border: 1px solid transparent;
            border-top: 1px solid $color-black-30;
            border-radius:0px;
        }
        :deep(.bytemd-preview){
            border-top: 1px solid $color-black-30;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            border-radius:0px;
        }
        :deep(.bytemd-split .bytemd-editor){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-sidebar){
            border-top-left-radius:0px;
            border-left: 1px solid $color-black-30;
        }
        :deep(.bytemd-editor:has(~ .bytemd-sidebar)){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-editor:has(+ .bytemd-preview:not([style*='display:none']))){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-editor:has(~ .bytemd-hidden)){
            border-right: 1px solid transparent;
        }
        :deep(.bytemd-preview:has(+ .bytemd-sidebar)){
            border-right: 1px solid $color-black-30;
        }
        :deep(.bytemd-preview:has(~ .bytemd-hidden)){
            border-right: 1px solid transparent;
        }

        /* 富文本编辑框颜色 */
        :deep(.ke-edit) {
            border: 1px solid transparent;
        }
        .head{
            .icon{
                position: absolute;font-size: 50px;top: -38px;left: -42px;color: $color-black-10;
            }
        }
        .submitButton{
            width: 130px;
        }
    }
    .captcha-item{
        .captchaInput{
            width: 160px;
            
        }
        :deep(.el-input__wrapper){
            background: #fff;
        }
        :deep(.el-form-item__error){
            width: 100%;
        }
        :deep(.el-image){
            height: 100%;
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

/* 添加举报 */
.addReport-formModule {
	.addReport-wrap{
        position: relative;
        padding:0px 10px 10px 10px;
        .reportType-container{
            display: flex;
            flex-direction: column;
            .reportType-group{
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;
                .reportType-name{
                    margin-bottom: 15px;
                    font-size: 14px;
                    text-align: left;
                    color: $color-black-60;
                }
                .reportType-list{
                    display: flex;
                    flex-wrap: wrap;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    white-space: nowrap;
                    .reportType-item{
                        display: flex;
                        flex-wrap: wrap;
                        padding: 0;
                        margin: 0;
                        margin-right:30px;
                        list-style: none;
                        white-space: nowrap;
                    }
                }
            }
        }
        :deep(.el-upload--picture-card) {
            background-color: $color-black-10;
            border: 1px dashed $color-black-10;
        }
        .submitButton{
            width: 130px;
        }
    }
    .captcha-item{
        .captchaInput{
            width: 160px;
            
        }
       
        :deep(.el-form-item__error){
            width: 100%;
        }
        :deep(.el-image){
            height: 100%;
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


/* 添加回复 */
.commentReply-formModule {
	margin-top:50px;
	.addReply-wrap{
        position: relative;
        padding:23px 20px 2px 20px;
        background: $color-black-10;
        /* 富文本编辑框颜色 */
        :deep(.ke-edit) {
            border: 1px solid transparent;
        }
        .head{
            .icon{
                position: absolute;font-size: 50px;top: -38px;left: -42px;color: $color-black-10;
            }
        }
        .submitButton{
            width: 130px;
        }
    }
    .captcha-item{
        .captchaInput{
            width: 160px;
            
        }
        :deep(.el-input__wrapper){
            background: #fff;
        }
        :deep(.el-form-item__error){
            width: 100%;
        }
        :deep(.el-image){
            height: 100%;
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


/* 修改回复 */
.editCommentReply-formModule {
	margin-top:30px;
	margin-left: 10px;
	margin-right:10px;
	margin-bottom:10px;
	.editReply-wrap{
        position: relative;
        /* 富文本编辑框颜色 */
        :deep(.ke-edit) {
            border: 1px solid transparent;
        }
        .head{
            .icon{
                position: absolute;font-size: 50px;top: -38px;left: -42px;color: $color-black-10;
            }
        }
        .submitButton{
            width: 130px;
        }
    }
    .captcha-item{
        .captchaInput{
            width: 160px;
            
        }
        :deep(.el-input__wrapper){
            background: #fff;
        }
        :deep(.el-form-item__error){
            width: 100%;
        }
        :deep(.el-image){
            height: 100%;
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


/* 添加回复对方 */
.addCommentReplyFriend-formModule {
    margin-top:30px;
	margin-left: 10px;
	margin-right:10px;
	margin-bottom:10px;
	.addReplyFriend-wrap{
        position: relative;
        /* 富文本编辑框颜色 */
        :deep(.ke-edit) {
            border: 1px solid transparent;
        }
        .submitButton{
            width: 130px;
        }
    }
    .captcha-item{
        .captchaInput{
            width: 160px;
            
        }
        :deep(.el-input__wrapper){
            background: #fff;
        }
        :deep(.el-form-item__error){
            width: 100%;
        }
        :deep(.el-image){
            height: 100%;
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

/* 红包 */
.redEnvelopeModule{
	margin-top: 10px;
	background: #fff;
	box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
    border-radius: 8px;
    .redEnvelope{
        margin-bottom:10px;
        padding:20px 15px 20px;
        margin:0 auto; 
        width:220px;
        .box {
            border-radius: 16px;
            background-color: #ff483a;
            overflow: hidden;
            position: relative;
            color: #FFFFFF;
            .head {
                border-bottom-right-radius: 100%;
                border-bottom-left-radius: 100%;
                width: 150%;
                border-bottom: 2px solid #e03d19;
                background-image: linear-gradient(-180deg, #ff583f 0%, #ff483a 100%);
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                min-height: 90px;
            }
            .body {
                .content{
                    margin-top:120px;
                    margin-bottom:50px;
                    color:#fed68e;font-size:18px;height: 30px;position: relative;margin-left: 76px;
                    .avatarBox{
                        position:absolute;display:inline-block;border-radius:100%;
                        left: -56px;top:-12px;
                        img{
                            border-radius:100%;
                            width: 48px;
                        }
                    }
                }
            }
            .btn{
                border:none;
                position: absolute;
                top:50px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #fed848;
                width: 70px;
                height: 70px;
                line-height: 70px;
                text-align: center;
                font-size: 40px;
                color:#dc972e;
                border-radius: 100%;
                cursor: pointer;
                transition: transform 0.3s;
                transform-origin:0 50%;
                
                -moz-user-select:none; /*火狐*/
                -webkit-user-select:none; /*webkit浏览器*/
                user-select:none;
                &:hover {
                    transform: scale(1.2) translateX(-50%) ;/* perspective(1px) translate3d(0,0,0) */
                }
            }
            .open-btn{
                border:none;
                position: absolute;
                top:50px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #fed848;
                width: 70px;
                height: 70px;
                line-height: 70px;
                text-align: center;
                font-size: 24px;
                color:#dc972e;
                border-radius: 100%;
                cursor: pointer;
                transition: transform 0.3s;
                transform-origin:0 50%;
            }
        }
    }
    .receiveRedEnvelopeUser{
        margin-left: 25px;padding-bottom: 15px;margin-right: 25px;position: relative;
        .box{
            text-align: center;margin-left: -10px;
        }
        .avatar {
            width: 32px;
            height: 32px;
            line-height: 32px;
            margin-bottom:8px;
            margin-right: -13px !important;
            display: inline-block;
            
            background: #fff no-repeat center/cover;
            position: relative;
            text-align: center;
            color: #fff;
            vertical-align: bottom;

            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border-radius: 50%;
            box-shadow: 0 0 0 1px rgba(0,0,0,.1);
            &:hover {
                margin-right: -4px !important;
                transition-duration:0.3s;
            }
        }
        .more {
            width:20px; height:14px; position: absolute;left: 0; right: 0; bottom: 5px;
            margin: auto;
            .icon {
                font-size: 15px;
                color: $color-black-50;
                &:hover{
                    color: #1890ff;
                }
            }
        }
    }
    .noRedEnvelope{
        margin-bottom:10px;
        padding:20px 15px 20px;
        margin:0 auto;
        width:240px;
        .box {
            border-radius: 16px;
            background-color: #ff483a;
            overflow: hidden;
            position: relative;
            color: #FFFFFF;
            .content{
                color:#fed68e;font-size:16px;line-height:32px; position: relative;text-align: center;margin:15px 5px 15px
            }
        }
    }
}

/* 相关话题 */
.similarTopicModule{
	margin-top: 10px;
	background: #fff;
	box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
    border-radius: 8px;
    .similarTopic{
        margin-bottom:10px;
        padding:0 15px 0;
        .title{
            font-size:18px;
            padding:20px 0 15px;
            color:$color-black-90;
            border-bottom:1px solid $color-black-20;
        }
        .topicList {
            font-size: 15px;
            margin-top: 10px;
            > .topic-title {
                counter-increment: index;
                display: flex;
                flex-direction: row;
                padding-top: 5px;
                padding-bottom: 5px;
                &::before {
                    content: counter(index);
                    display: flex;
                    width: 22px;
                    height: 22px;
                    background-color: $color-black-10;
                    text-align: center;
                    border-radius: 4px;
                    flex: none;
                    align-items: center;
                    justify-content: center;
                    color: $color-black-60;
                }
                .top{
                    &::before {
                        background-color: #1890ff;
                        color: #fff;
                    }
                }
                > a {
                    display: block;
                    word-wrap : break-word;word-break : break-all;
                    flex: auto;
                    margin-left: 8px;
                    color: $color-black-80;
                    &:hover {
                        color: #1890ff;
                    }
                }
            }
        }
    }
}

/* Markdown目录 */
.markdownTocModule{
	margin-top: 10px;
	background: #fff;
	box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
    border-radius: 8px;
    .toc{
        margin-bottom:15px;
        padding:0 15px 0;
        
        
        .title{
            font-size:18px;
            padding:20px 0 15px;
            color:$color-black-90;
            border-bottom:1px solid $color-black-20;
        }
        //隐藏水平滚动条
        :deep(.is-horizontal){
            display: none;
        }
        :deep(.el-scrollbar__wrap){
            overscroll-behavior:  contain;//让外层滚动条不滚动
        }
        .scrollbar{
            padding-top: 10px;
        }
        .tocList {
            font-size: 15px;
            
            > .toc-txt {
                display: flex;
                flex-direction: row;
                padding-top: 5px;
                padding-bottom: 5px;
                > span {
                    display: block;
                    word-wrap : break-word;word-break : break-all;
                    flex: auto;
                    cursor:pointer;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap; 
                    color: $color-black-80;
                    &:hover {
                        color: #1890ff;
                    }
                }
                
                .active-item{
                    color: #1890ff;
                    transition: all 0.25s ease-out;
                }
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
</style>
