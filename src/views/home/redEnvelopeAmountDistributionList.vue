<!-- 发红包金额分配列表 -->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main-container wrap backgroundModule giveRedEnvelopeModule">
        <div class="giveRedEnvelopeInfo">
            <span class="text">
                <!-- 类型 -->
                <span class="name">{{t('redEnvelopeAmountDistributionList.10')}}：</span>
                <span v-if="state.giveRedEnvelope.type == 10">{{t('redEnvelopeAmountDistributionList.20')}}</span><!-- 个人定向红包 -->
                <span v-if="state.giveRedEnvelope.type == 20">{{t('redEnvelopeAmountDistributionList.30')}}</span><!-- 公共随机红包 -->
                <span v-if="state.giveRedEnvelope.type == 30">{{t('redEnvelopeAmountDistributionList.40')}}</span><!-- 公共定额红包 -->
            </span>
            <span class="text">
                <!-- 总金额 -->
                <span class="name">{{t('redEnvelopeAmountDistributionList.150')}}：</span>￥{{state.giveRedEnvelope.totalAmount}}
                <!-- 中止领取红包后返还金额￥{{state.giveRedEnvelope.refundAmount}} -->
                <span v-if="parseFloat(state.giveRedEnvelope.refundAmount) >0" class="refundAmount">{{t('redEnvelopeAmountDistributionList.50',{'p1': state.giveRedEnvelope.refundAmount})}}</span>
            </span>
            <!-- 发放数量 -->
            <span class="text"><span class="name">{{t('redEnvelopeAmountDistributionList.60')}}：</span>{{state.giveRedEnvelope.giveQuantity}}</span>
            
            <span class="text" v-if="state.giveRedEnvelope.remainingQuantity != null">
                <!-- 已领取数量 -->
                <span class="name">{{t('redEnvelopeAmountDistributionList.70')}}：</span>{{state.giveRedEnvelope.giveQuantity - state.giveRedEnvelope.remainingQuantity}}
            </span>
            <!-- 时间 -->
            <span class="text"><span class="name">{{t('redEnvelopeAmountDistributionList.80')}}：</span>{{state.giveRedEnvelope.giveTime}}</span>
            <span class="topic">
                <router-link tag="a" :to="{path:'/thread', query:{topicId : state.giveRedEnvelope.bindTopicId}}" class="link" target="_blank">
                    {{state.giveRedEnvelope.bindTopicTitle}}
                </router-link>
            </span>
        </div>
    </div>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="receiveRedEnvelopeListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center">
                        <!-- 收红包用户 -->
                        <template #header>
                            {{t('redEnvelopeAmountDistributionList.90')}}
                        </template>
                        <template #default="scope">
                            <div class="userInfo">
                                <!-- 此用户账号已注销 -->
                                <div v-if="scope.row.receiveAccount == null || scope.row.receiveAccount == ''" class="cancelAccount">{{t('redEnvelopeAmountDistributionList.100')}}</div>
                                <div v-if="scope.row.receiveAccount != null && scope.row.receiveAccount != ''" >
                                    <router-link tag="a" :to="{path:'/user/control/home',query: {userName: scope.row.receiveUserName}}" target="_blank">
                                        <span class="avatarImg">
                                            <img v-if="scope.row.receiveAvatarPath != null" :src="scope.row.receiveAvatarPath+'100x100/'+scope.row.receiveAvatarName" class="img">
                                        
                                            <img v-if="scope.row.receiveAvatarPath == null" :src="scope.row.receiveAvatar" width="40" height="40" class="img"/>
                                        </span>
                                        <span v-if="scope.row.receiveNickname == null || scope.row.receiveNickname == ''" class="account">{{scope.row.receiveAccount}}</span>
                                        <span v-if="scope.row.receiveNickname != null && scope.row.receiveNickname != ''" class="account">{{scope.row.receiveNickname}}</span>
                                    </router-link>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- label="金额" -->
                    <el-table-column prop="amount" :label="t('redEnvelopeAmountDistributionList.110')"  width="200" align="center"/>
                    <!-- label="收取时间" -->
                    <el-table-column prop="receiveTime" :label="t('redEnvelopeAmountDistributionList.120')"  width="200" align="center"/>
                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('redEnvelopeAmountDistributionList.130')}}</div>
                        <div v-if="state.loading"></div>
                    </template>
                </el-table>

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
    import { getCurrentInstance, ComponentInternalInstance, reactive, onMounted, computed} from 'vue'
    import { useMeta} from 'vue-meta'
    import { appStore } from "@/store";
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import Header from '@/components/Header.vue'
    import { AxiosResponse } from 'axios'
    import { PageView,GiveRedEnvelope,ReceiveRedEnvelope } from "@/types/index";
    import { letterAvatar } from '@/utils/letterAvatar';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


  
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('redEnvelopeAmountDistributionList.140')+' - ' + store.state.title,//发红包金额分配列表
            meta: [
                {
                    name: 'keywords',
                    content: t('redEnvelopeAmountDistributionList.140')+' - ' + store.state.title//发红包金额分配列表
                },{
                    name: "description",
                    content: t('redEnvelopeAmountDistributionList.140')+' - ' + store.state.title//发红包金额分配列表
                }
            ]
        }))
    )


    const state = reactive({
        giveRedEnvelope :{} as GiveRedEnvelope,//发红包
        pageView: {} as PageView<ReceiveRedEnvelope>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //错误
    const error = reactive({})

    //查询发红包金额分配列表
    const queryRedEnvelopeAmountDistributionList = (giveRedEnvelopeId:string,page: number) => {
        proxy?.$axios({
            url: '/user/control/redEnvelopeAmountDistributionList',
            method: 'get',
            params:  { 
                giveRedEnvelopeId:giveRedEnvelopeId,
                page: page
            },
            //showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                state.giveRedEnvelope = result.giveRedEnvelope;
                state.pageView =  result.pageView;

                if(state.pageView.records != null && state.pageView.records.length >0){
                    for(let i:number=0; i<state.pageView.records.length; i++){
                        let receiveRedEnvelope = state.pageView.records[i];
                        if(receiveRedEnvelope.receiveNickname != null && receiveRedEnvelope.receiveNickname !=''){
                            receiveRedEnvelope.receiveAvatar = letterAvatar(receiveRedEnvelope.receiveNickname, 40);
                        }else{
                            receiveRedEnvelope.receiveAvatar = letterAvatar(receiveRedEnvelope.receiveAccount, 40);
                        }

                    }
                }


                

                state.totalrecord = parseInt(state.pageView.totalrecord);//服务器返回的long类型已转为String类型
                state.currentpage = state.pageView.currentpage;
                state.totalpage = parseInt(state.pageView.totalpage);//服务器返回的long类型已转为String类型
                state.maxresult = state.pageView.maxresult;


                state.isShowPage = true;//显示分页栏
            }
            state.loading = false;//关闭骨架屏
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }
    

    //分页
    const handlePage = (page: number) => {
         let giveRedEnvelopeId:string = router.currentRoute.value.query.giveRedEnvelopeId != undefined ? router.currentRoute.value.query.giveRedEnvelopeId as string :'';
       
		router.push({
            path: '/user/control/redEnvelopeAmountDistributionList', 
            query:{
                giveRedEnvelopeId: giveRedEnvelopeId,
                page : page
            }
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}


    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'redEnvelopeAmountDistributionList'){
            let page:number = 1;
            let giveRedEnvelopeId:string = '';
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            if(to.query.giveRedEnvelopeId != undefined){
                giveRedEnvelopeId = to.query.giveRedEnvelopeId as string;
            }
            queryRedEnvelopeAmountDistributionList(giveRedEnvelopeId,page);
        }
        
        next();
    });
    onMounted(() => {
        init();

    }) 

    //初始化
    const init = () => {
		let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        let giveRedEnvelopeId:string = router.currentRoute.value.query.giveRedEnvelopeId != undefined ? router.currentRoute.value.query.giveRedEnvelopeId as string :'';
        queryRedEnvelopeAmountDistributionList(giveRedEnvelopeId,page);
	}
    

</script>

<style scoped lang="scss">
    .giveRedEnvelopeModule{
        padding: 10px 0 10px 0px;
        background: #fff;
        line-height:46px;
        margin-bottom: 10px;
        .giveRedEnvelopeInfo{
            margin-left: 30px;
            margin-right: 30px;
            .text{
                font-size: 15px; 
                white-space:nowrap; 
                margin-right: 40px;
                .name{
                    color: #99a9bf;
                }
            }
            .topic{
                display: block;
                font-size: 15px;
                margin-top: 10px;
            }
            .refundAmount{
                color: #F56C6C;
            }
        }
        
    }

    .receiveRedEnvelopeListModule{
        padding-right:8px;
        padding-left:8px;
        padding-top:8px;
        padding-bottom: 30px;
        .page{
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
        }
    }

</style>
