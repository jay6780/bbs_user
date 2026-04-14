<!-- 余额 -->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main-container wrap backgroundModule balanceModule">
        <!-- 余额 -->
        <span class="deposit"><span class="name">{{t('balance.10')}}：</span>￥{{state.deposit}}</span>

        <span class="buttonBox">
            <!-- 充值 -->
            <el-button type="primary" plain @click="router.push({path: '/user/control/payment', query:{ paymentModule : 5}})">{{t('balance.20')}}</el-button>
        </span>
    </div>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="paymentLogListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <!-- label="支付流水号" -->
                    <el-table-column prop="paymentRunningNumber" :label="t('balance.30')" align="center" width="300"/>
                    <el-table-column align="center" width="150">
                        <!-- 金额 -->
                        <template #header>
                            {{t('balance.40')}}
                        </template>
                        <template #default="scope">
                            <span v-if="scope.row.amountState == 1">+</span>
                            <span v-if="scope.row.amountState == 2">-</span>
                            {{scope.row.amount}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="250">
                        <!-- 模块 -->
                        <template #header>
                            {{t('balance.50')}}
                        </template>
                        <template #default="scope">
                            <!-- 会员卡订单支付 -->
                            <span v-if="scope.row.paymentModule == 1">{{t('balance.60')}}</span>
                            <!-- 充值 -->
                            <span v-if="scope.row.paymentModule == 5">{{t('balance.20')}}</span>
                            <!-- 余额购买话题隐藏内容 -->
                            <span v-if="scope.row.paymentModule == 70">{{t('balance.70')}}</span>
                            <!-- 解锁话题隐藏内容分成 -->
                            <span v-if="scope.row.paymentModule == 80">{{t('balance.80')}}</span>
                            <!-- 悬赏金额 -->
                            <span v-if="scope.row.paymentModule == 90">{{t('balance.90')}}</span>
                            <!-- 采纳答案 -->
                            <span v-if="scope.row.paymentModule == 100">{{t('balance.100')}}</span>
                            <!-- 调整赏金 -->
                            <span v-if="scope.row.paymentModule == 110">{{t('balance.110')}}</span>
                            <!-- 话题发红包 -->
                            <span v-if="scope.row.paymentModule == 120">{{t('balance.120')}}</span>
                            <!-- 话题收红包 -->
                            <span v-if="scope.row.paymentModule == 130">{{t('balance.130')}}</span>
                            <!-- 话题返还红包 -->
                            <span v-if="scope.row.paymentModule == 140">{{t('balance.140')}}</span>
                        </template>
                    </el-table-column>
                     <!-- label="时间" -->
                    <el-table-column prop="times" :label="t('balance.150')"  width="200" align="center"/>
                    <!-- label="备注" -->
                    <el-table-column prop="remark" :label="t('balance.160')"  align="center"/>
                    <template #empty>
                         <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('balance.170')}}</div>
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
    import { PageView,PaymentLog } from "@/types/index";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('balance.10')+' - ' + store.state.title,//余额
            meta: [
                {
                    name: 'keywords',
                    content: t('balance.10')+' - ' + store.state.title//余额
                },{
                    name: "description",
                    content: t('balance.10')+' - ' + store.state.title//余额
                }
            ]
        }))
    )


    const state = reactive({
        deposit :'',//预存款
        pageView: {} as PageView<PaymentLog>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //错误
    const error = reactive({})

    //查询余额
    const queryBalance = (page: number) => {
        proxy?.$axios({
            url: '/user/control/balance',
            method: 'get',
            params:  { 
                page: page
            },
            //showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                state.deposit = result.deposit;
                state.pageView =  result.pageView;

                

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
		router.push({
            path: '/user/control/balance', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}


    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'balance'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryBalance(page);
        }
        
        next();
    });
    onMounted(() => {
        init();

    }) 

    //初始化
    const init = () => {
		let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryBalance(page);
	}
    

</script>

<style scoped lang="scss">
    .balanceModule{
        padding: 30px 0 30px 0px;
        background: #fff;
        line-height:46px;
        margin-bottom: 10px;
        .deposit{
            margin-left: 30px;
            font-size: 16px; 
            .name{
                color: #99a9bf;
            }
        }
        .buttonBox{
            margin-left: 100px;
            margin-top: -26px;
            :deep(.el-button--primary){
                padding: 16px 15px 16px 15px;
            }
        }
    }

    .paymentLogListModule{
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
