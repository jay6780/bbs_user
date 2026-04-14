<!-- 发红包 -->
<template>
    <!-- 页头 -->
    <Header/>
    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">

            <div class="giveRedEnvelopeListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center" width="120">
                        <!-- 类型 -->
                        <template #header>
                            {{t('giveRedEnvelopeList.10')}}
                        </template>
                        <template #default="scope">
                            <!-- 个人定向红包 -->
                            <span v-if="scope.row.type == 10">{{t('giveRedEnvelopeList.20')}}</span>
                            <!-- 公共随机红包 -->
                            <span v-if="scope.row.type == 20">{{t('giveRedEnvelopeList.30')}}</span>
                            <!-- 公共定额红包 -->
                            <span v-if="scope.row.type == 30">{{t('giveRedEnvelopeList.40')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="200">
                        <!-- 总金额 -->
                        <template #header>
                            {{t('giveRedEnvelopeList.50')}}
                        </template>
                        <!-- 中止领取红包后返还金额￥{{scope.row.refundAmount}} -->
                        <template #default="scope">
                            {{scope.row.totalAmount}}
                            <span v-if="scope.row.refundAmount >0" class="refundAmount">{{t('giveRedEnvelopeList.60',{'p1': scope.row.refundAmount})}}</span>
                        </template>
                    </el-table-column>
                    <!-- label="发放数量" -->
                    <el-table-column prop="giveQuantity" :label="t('giveRedEnvelopeList.70')" width="100" align="center"/>
                    <el-table-column align="center" width="150">
                        <!-- 已领取数量 -->
                        <template #header>
                            {{t('giveRedEnvelopeList.80')}}
                        </template>
                        <template #default="scope">
                            {{scope.row.giveQuantity - scope.row.remainingQuantity}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center">
                        <!-- 话题 -->
                        <template #header>
                            {{t('giveRedEnvelopeList.90')}}
                        </template>
                        <template #default="scope">
                            <router-link tag="div" class="link" :to="{path: '/thread', query:{ topicId : scope.row.bindTopicId}}">
                                {{scope.row.bindTopicTitle}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <!-- label="时间" -->
                    <el-table-column prop="giveTime" :label="t('giveRedEnvelopeList.100')"  width="170" align="center"/>
                    <el-table-column width="200" align="center">
                        <!-- 操作 -->
                        <template #header>
                            {{t('giveRedEnvelopeList.110')}}
                        </template>
                        <template #default="scope">
                            <el-button-group>
                                <!-- 查看金额分配 -->
                                <el-button type="primary" @click="router.push({path: '/user/control/redEnvelopeAmountDistributionList', query:{ giveRedEnvelopeId : scope.row.id}})" >{{t('giveRedEnvelopeList.120')}}</el-button>

                            </el-button-group>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('giveRedEnvelopeList.130')}}</div>
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
    import { PageView,GiveRedEnvelope } from "@/types/index";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('giveRedEnvelopeList.140')+' - ' + store.state.title,//发红包列表
            meta: [
                {
                    name: 'keywords',
                    content: t('giveRedEnvelopeList.140')+' - ' + store.state.title//发红包列表
                },{
                    name: "description",
                    content: t('giveRedEnvelopeList.140')+' - ' + store.state.title//发红包列表
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<GiveRedEnvelope>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //查询发红包列表
    const queryGiveRedEnvelopeList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/giveRedEnvelopeList',
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
        .then((data: PageView<GiveRedEnvelope>) => {
            state.loading = false;//关闭骨架屏
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
            path: '/user/control/giveRedEnvelopeList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}


    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'giveRedEnvelopeList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryGiveRedEnvelopeList(page);
        }
        
        next();
    });
    onMounted(() => {
        let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryGiveRedEnvelopeList(page);

    }) 
    

</script>

<style scoped lang="scss">
    .giveRedEnvelopeListModule{
        padding-right:8px;
        padding-left:8px;
        padding-top:8px;
        padding-bottom: 30px;
        .link{
            color: $color-blue-60;
        }
        .refundAmount{
            color: #F56C6C;
        }
        .page{
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
        }
    }

</style>
