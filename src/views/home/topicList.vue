<!--我的话题-->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav ref="serviceNavRef"/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen" :class="{ 'first-radius': isFirstNavActive }">

            <div class="topicListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center">
                        <!-- 标题 -->
                        <template #header>
                            {{t('topicList.10')}}
                        </template>
                        <template #default="scope">
                            <router-link tag="div" class="link" :to="{path: '/thread', query:{ topicId : scope.row.id}}">
                                {{scope.row.title}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <!-- label="标签" -->
                    <el-table-column prop="tagName" :label="t('topicList.20')" width="170" align="center"/>
                    <!-- label="发表时间" -->
                    <el-table-column prop="postTime" :label="t('topicList.30')"  width="200" align="center"/>
                    <el-table-column width="470" align="center">
                        <!-- 操作 -->
                        <template #header>
                            {{t('topicList.40')}}
                        </template>
                        <template #default="scope">
                            <el-button-group>
                                <!-- 解锁隐藏标签用户 -->
                                <el-button type="primary" @click="router.push({path: '/user/control/topicUnhideList', query:{ topicId : scope.row.id,topicPage:state.currentpage}})" >{{t('topicList.50')}}</el-button>
                                 <!-- 收藏用户 -->
                                <el-button type="primary" @click="router.push({path: '/user/control/topicFavoriteList', query:{ topicId : scope.row.id,topicPage:state.currentpage}})"  >{{t('topicList.60')}}</el-button>
                                 <!-- 点赞用户 -->
                                <el-button type="primary" @click="router.push({path: '/user/control/topicLikeList', query:{ topicId : scope.row.id,topicPage:state.currentpage}})" >{{t('topicList.70')}}</el-button>
                                 <!-- 编辑 -->
                                <el-button type="primary" @click="handleEditTopic(scope.$index, scope.row)" >{{t('topicList.80')}}</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('topicList.90')}}</div>
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
    import { getCurrentInstance, ComponentInternalInstance, reactive, onMounted, computed, ref} from 'vue'
    import { useMeta} from 'vue-meta'
    import { appStore } from "@/store";
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import Header from '@/components/Header.vue'
    import { AxiosResponse } from 'axios'
    import { PageView,Topic } from "@/types/index";
    import { useI18n } from 'vue-i18n';
    import { useNavStatus } from '@/utils/useNavStatus';
    import ServiceNav from '@/components/ServiceNav.vue';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    const serviceNavRef = ref<InstanceType<typeof ServiceNav> | null>(null);
    const { isFirstNavActive } = useNavStatus(serviceNavRef);
 
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('topicList.100')+' - ' + store.state.title,//我的话题
            meta: [
                {
                    name: 'keywords',
                    content: t('topicList.100')+' - ' + store.state.title//我的话题
                },{
                    name: "description",
                    content: t('topicList.100')+' - ' + store.state.title//我的话题
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Topic>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //查询话题列表
    const queryTopicList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/topicList',
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
        .then((data: PageView<Topic>) => {
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
            path: '/user/control/topicList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}

    //处理编辑
    const handleEditTopic = (index: number, row: Topic) => {
        let r = router.resolve({ 
            path: '/user/editTopic', 
            query: {
              'topicId': row.id
            } 
        });
        window.open(r.href, '_blank');
    }
    

    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'topicList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryTopicList(page);
        }
        
        next();
    });
    onMounted(() => {
        let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryTopicList(page);

    }) 
    

</script>

<style scoped lang="scss">
    .topicListModule{
        padding-right:8px;
        padding-left:8px;
        padding-top:8px;
        padding-bottom: 30px;
        .link{
            color: $color-blue-60;
        }
        .page{
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
        }
    }

</style>
