<!-- 服务导航 -->
<template>
    <div class="main-container wrap">
        <ul class="serviceNav">

            <li :ref="el => {if(el) navRefs['nav_'+index] = el}" class="title" :class="{ 'active': serviceNav.selected}" v-for="(serviceNav,index) in state.serviceNavList" :key="index">
                <router-link tag="a" :to="serviceNav.toPath">{{serviceNav.name}}</router-link>
            </li>
            
            <el-dropdown ref="moreRef" v-if="state.moreServiceNavList.length >0">
                <li class="title more hide" >
                    <!--更多-->
                    <span>{{t('serviceNav.240')}}</span><Icon name="angle-down" size="16px" class="icom"/>
                </li>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="router.push({path: serviceNav.toPath})" v-for="(serviceNav,index) in state.moreServiceNavList"> {{serviceNav.name}} </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import { ComponentInternalInstance, getCurrentInstance, nextTick, onMounted,reactive, ref } from 'vue';
    import { ServiceNav } from '@/types';
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    
    let { t } = useI18n();
    const router = useRouter();

    const navRefs = ref({}) as any;
    const moreRef = ref();

    const state = reactive({
        serviceNavList: [] as Array<ServiceNav>,//服务导航
        serviceNavQuantity: 0,//未折叠的导航项数量
        moreServiceNavList: [] as Array<ServiceNav>,//’更多‘服务导航
    });

    //初始化
    const init = () => {
        let serviceNav_1 = new Object() as ServiceNav;
        serviceNav_1.name = t('serviceNav.10')//动态
        serviceNav_1.currentItemPathList = [];
        serviceNav_1.currentItemPathList.push('/user/control/userDynamicList');
        serviceNav_1.toPath = '/user/control/userDynamicList';
        serviceNav_1.selected = false;
        state.serviceNavList.push(serviceNav_1);

       
        let serviceNav_2 = new Object() as ServiceNav;
        serviceNav_2.name = t('serviceNav.20')//话题
        serviceNav_2.currentItemPathList = [];
        serviceNav_2.currentItemPathList.push('/user/control/topicList');
        serviceNav_2.currentItemPathList.push('/user/control/topicUnhideList');
        serviceNav_2.currentItemPathList.push('/user/control/topicFavoriteList');
        serviceNav_2.currentItemPathList.push('/user/control/topicLikeList');
        serviceNav_2.toPath = '/user/control/topicList';
        serviceNav_2.selected = false;
        state.serviceNavList.push(serviceNav_2);

        let serviceNav_3 = new Object() as ServiceNav;
        serviceNav_3.name = t('serviceNav.30')//评论
        serviceNav_3.currentItemPathList = [];
        serviceNav_3.currentItemPathList.push('/user/control/commentList');
        serviceNav_3.toPath = '/user/control/commentList';
        serviceNav_3.selected = false;
        state.serviceNavList.push(serviceNav_3);


        let serviceNav_4 = new Object() as ServiceNav;
        serviceNav_4.name = t('serviceNav.40')//评论回复
        serviceNav_4.currentItemPathList = [];
        serviceNav_4.currentItemPathList.push('/user/control/replyList');
        serviceNav_4.toPath = '/user/control/replyList';
        serviceNav_4.selected = false;
        state.serviceNavList.push(serviceNav_4);

        let serviceNav_5 = new Object() as ServiceNav;
        serviceNav_5.name = t('serviceNav.50')//问题
        serviceNav_5.currentItemPathList = [];
        serviceNav_5.currentItemPathList.push('/user/control/questionList');
        serviceNav_5.currentItemPathList.push('/user/control/questionFavoriteList');
        serviceNav_5.toPath = '/user/control/questionList';
        serviceNav_5.selected = false;
        state.serviceNavList.push(serviceNav_5);

        let serviceNav_6 = new Object() as ServiceNav;
        serviceNav_6.name = t('serviceNav.60')//答案
        serviceNav_6.currentItemPathList = [];
        serviceNav_6.currentItemPathList.push('/user/control/answerList');
        serviceNav_6.toPath = '/user/control/answerList';
        serviceNav_6.selected = false;
        state.serviceNavList.push(serviceNav_6);

        let serviceNav_7 = new Object() as ServiceNav;
        serviceNav_7.name = t('serviceNav.70')//答案回复
        serviceNav_7.currentItemPathList = [];
        serviceNav_7.currentItemPathList.push('/user/control/answerReplyList');
        serviceNav_7.toPath = '/user/control/answerReplyList';
        serviceNav_7.selected = false;
        state.serviceNavList.push(serviceNav_7);

        let serviceNav_8 = new Object() as ServiceNav;
        serviceNav_8.name = t('serviceNav.80')//收藏夹
        serviceNav_8.currentItemPathList = [];
        serviceNav_8.currentItemPathList.push('/user/control/favoriteList');
        serviceNav_8.toPath = '/user/control/favoriteList';
        serviceNav_8.selected = false;
        state.serviceNavList.push(serviceNav_8);
       
        let serviceNav_9 = new Object() as ServiceNav;
        serviceNav_9.name = t('serviceNav.90')//点赞
        serviceNav_9.currentItemPathList = [];
        serviceNav_9.currentItemPathList.push('/user/control/likeList');
        serviceNav_9.toPath = '/user/control/likeList';
        serviceNav_9.selected = false;
        state.serviceNavList.push(serviceNav_9);

        let serviceNav_10 = new Object() as ServiceNav;
        serviceNav_10.name = t('serviceNav.100')//关注
        serviceNav_10.currentItemPathList = [];
        serviceNav_10.currentItemPathList.push('/user/control/followList');
        serviceNav_10.toPath = '/user/control/followList';
        serviceNav_10.selected = false;
        state.serviceNavList.push(serviceNav_10);

        let serviceNav_11 = new Object() as ServiceNav;
        serviceNav_11.name = t('serviceNav.110')//粉丝
        serviceNav_11.currentItemPathList = [];
        serviceNav_11.currentItemPathList.push('/user/control/followerList');
        serviceNav_11.toPath = '/user/control/followerList';
        serviceNav_11.selected = false;
        state.serviceNavList.push(serviceNav_11);
       
        let serviceNav_12 = new Object() as ServiceNav;
        serviceNav_12.name = t('serviceNav.120')//私信
        serviceNav_12.currentItemPathList = [];
        serviceNav_12.currentItemPathList.push('/user/control/privateMessageList');
        serviceNav_12.currentItemPathList.push('/user/control/privateMessageChatList');
        serviceNav_12.toPath = '/user/control/privateMessageList';
        serviceNav_12.selected = false;
        state.serviceNavList.push(serviceNav_12);

        let serviceNav_13 = new Object() as ServiceNav;
        serviceNav_13.name = t('serviceNav.130')//提醒
        serviceNav_13.currentItemPathList = [];
        serviceNav_13.currentItemPathList.push('/user/control/remindList');
        serviceNav_13.toPath = '/user/control/remindList';
        serviceNav_13.selected = false;
        state.serviceNavList.push(serviceNav_13);

        let serviceNav_14 = new Object() as ServiceNav;
        serviceNav_14.name = t('serviceNav.140')//系统通知
        serviceNav_14.currentItemPathList = [];
        serviceNav_14.currentItemPathList.push('/user/control/systemNotifyList');
        serviceNav_14.toPath = '/user/control/systemNotifyList';
        serviceNav_14.selected = false;
        state.serviceNavList.push(serviceNav_14);

        let serviceNav_15 = new Object() as ServiceNav;
        serviceNav_15.name = t('serviceNav.150')//会员卡订单
        serviceNav_15.currentItemPathList = [];
        serviceNav_15.currentItemPathList.push('/user/control/membershipCardOrderList');
        serviceNav_15.toPath = '/user/control/membershipCardOrderList';
        serviceNav_15.selected = false;
        state.serviceNavList.push(serviceNav_15);


        let serviceNav_16 = new Object() as ServiceNav;
        serviceNav_16.name = t('serviceNav.160')//余额
        serviceNav_16.currentItemPathList = [];
        serviceNav_16.currentItemPathList.push('/user/control/balance');
        serviceNav_16.toPath = '/user/control/balance';
        serviceNav_16.selected = false;
        state.serviceNavList.push(serviceNav_16);

        let serviceNav_17 = new Object() as ServiceNav;
        serviceNav_17.name = t('serviceNav.170')//发红包
        serviceNav_17.currentItemPathList = [];
        serviceNav_17.currentItemPathList.push('/user/control/giveRedEnvelopeList');
        serviceNav_17.toPath = '/user/control/giveRedEnvelopeList';
        serviceNav_17.selected = false;
        state.serviceNavList.push(serviceNav_17);

        let serviceNav_18 = new Object() as ServiceNav;
        serviceNav_18.name = t('serviceNav.180')//收红包
        serviceNav_18.currentItemPathList = [];
        serviceNav_18.currentItemPathList.push('/user/control/receiveRedEnvelopeList');
        serviceNav_18.toPath = '/user/control/receiveRedEnvelopeList';
        serviceNav_18.selected = false;
        state.serviceNavList.push(serviceNav_18);

        let serviceNav_19 = new Object() as ServiceNav;
        serviceNav_19.name = t('serviceNav.190')//修改个人资料
        serviceNav_19.currentItemPathList = [];
        serviceNav_19.currentItemPathList.push('/user/control/editUser');
        serviceNav_19.toPath = '/user/control/editUser';
        serviceNav_19.selected = false;
        state.serviceNavList.push(serviceNav_19);

        let serviceNav_20 = new Object() as ServiceNav;
        serviceNav_20.name = t('serviceNav.200')//实名认证
        serviceNav_20.currentItemPathList = [];
        serviceNav_20.currentItemPathList.push('/user/control/realNameAuthentication');
        serviceNav_20.toPath = '/user/control/realNameAuthentication';
        serviceNav_20.selected = false;
        state.serviceNavList.push(serviceNav_20);

        let serviceNav_21 = new Object() as ServiceNav;
        serviceNav_21.name = t('serviceNav.210')//举报
        serviceNav_21.currentItemPathList = [];
        serviceNav_21.currentItemPathList.push('/user/control/reportList');
        serviceNav_21.toPath = '/user/control/reportList';
        serviceNav_21.selected = false;
        state.serviceNavList.push(serviceNav_21);

        let serviceNav_22 = new Object() as ServiceNav;
        serviceNav_22.name = t('serviceNav.220')//积分日志
        serviceNav_22.currentItemPathList = [];
        serviceNav_22.currentItemPathList.push('/user/control/point');
        serviceNav_22.toPath = '/user/control/point';
        serviceNav_22.selected = false;
        state.serviceNavList.push(serviceNav_22);

        let serviceNav_23 = new Object() as ServiceNav;
        serviceNav_23.name = t('serviceNav.230')//登录日志
        serviceNav_23.currentItemPathList = [];
        serviceNav_23.currentItemPathList.push('/user/control/userLoginLogList');
        serviceNav_23.toPath = '/user/control/userLoginLogList';
        serviceNav_23.selected = false;
        state.serviceNavList.push(serviceNav_23);
        
        //选中项
        for(let i = 0; i< state.serviceNavList.length; i++){
            let serviceNav = state.serviceNavList[i];
            if(serviceNav.currentItemPathList.includes(router.currentRoute.value.path)){
                serviceNav.selected = true;
                break;
            }
        }
    }

    //渲染‘更多‘组件
    const renderMore = () => {
        let beforeOffsetTop = 0; //前一项的offsetTop
        for(let i = 0; i< state.serviceNavList.length; i++){
            let serviceNav = state.serviceNavList[i];
            let refValue = navRefs.value['nav_'+i]
            if(refValue != undefined){
                if(beforeOffsetTop == 0){//第一次
                    beforeOffsetTop = refValue.offsetTop;
                    continue;
                }
                if(refValue.offsetTop > beforeOffsetTop){//隐藏的行
                    state.serviceNavQuantity = i;
                    break;
                }
                
            }
            
        }

        if (state.serviceNavQuantity>0) {
            //将隐藏的行添加到’更多‘服务导航
            for(let i = state.serviceNavQuantity; i< state.serviceNavList.length; i++){
                let serviceNav = state.serviceNavList[i];
                state.moreServiceNavList.push(serviceNav);

            }

            //删除隐藏的行
            for (let i = state.serviceNavList.length - 1; i >= 0; i--) {
                if (i > state.serviceNavQuantity-1) {
                    state.serviceNavList.splice(i, 1);
                }
            }
        }
        

        for (let i = state.serviceNavList.length - 1; i >= 0; i--) {
            let serviceNav = state.serviceNavList[i];
            //'更多'栏是否被推到第二行
            nextTick(()=>{
                setTimeout(function () {
                    if(moreRef.value != undefined && moreRef.value.$el.offsetTop > beforeOffsetTop){//如果被推到第二行
                        state.moreServiceNavList.unshift(serviceNav);
                        state.serviceNavList.splice(i, 1);
                    }
                }, 0);
                
            });
        }
    }

    onMounted(() => {
        init();
        nextTick(()=>{
            renderMore();
        });
    }) 

    // 显式暴露 state 给父组件访问
    defineExpose({
        state
    });
</script>

<style scoped lang="scss">
.serviceNav {
    overflow:hidden;
	margin-top:-9px;
	height: 46px;
	background-color: $color-black-10;
	font-size: 15px;
    &:after{
        height: 30px;
        width: 100%;
        position: absolute;
        top: 0px;
    }
    .title {
        float: left;
        padding: 0 15px;
        height: 46px;
        line-height: 46px;
        cursor: pointer;
        position: relative;
        a {
            color: $color-black-60;
            &:hover {
                color: $color-blue-60;
            }
        }
    }
    .active {
        background-color: #fff;
        cursor: default;
        box-shadow:4px 0 3px -4px rgba(0,0,0,.06),-4px 0 3px -4px rgba(0,0,0,.06);
        border-radius: 8px 8px 0px 0px;
        a{
            color: $color-black-70;
        }
    }
    .more{
        color: $color-black-60;
        .icom{
            margin-left: 5px;
            position: relative;
            top: 3px;
        }
    }
}

</style>