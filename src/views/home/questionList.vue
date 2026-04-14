<!--我的问题-->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="questionListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center">
                        <!-- 标题 -->
                        <template #header>
                            {{t('questionList.10')}}
                        </template>
                        <template #default="scope">
                            <router-link tag="div" class="link" :to="{path: '/question', query:{ questionId : scope.row.id}}">
                                {{scope.row.title}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column width="270" align="center">
                        <!-- 标签 -->
                        <template #header>
                            {{t('questionList.20')}}
                        </template>
                        <template #default="scope">
                            <span v-for="questionTagAssociation in scope.row.questionTagAssociationList">
                                {{questionTagAssociation.questionTagName}}&nbsp;
                            </span>
                        </template>
                    </el-table-column>
                    <!-- label="发表时间" -->
                    <el-table-column prop="postTime" :label="t('questionList.30')"  width="200" align="center"/>
                    <el-table-column width="140" align="center">
                        <!-- 操作 -->
                        <template #header>
                            {{t('questionList.40')}}
                        </template>
                        <template #default="scope">
                            <el-button-group>
                                <el-button type="primary" @click="router.push({path: '/user/control/questionFavoriteList', query:{ questionId : scope.row.id,questionPage:state.currentpage}})"  >{{t('questionList.50')}}</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('questionList.60')}}</div>
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
    import { PageView,Question } from "@/types/index";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('questionList.70')+' - ' + store.state.title,//我的问题
            meta: [
                {
                    name: 'keywords',
                    content: t('questionList.70')+' - ' + store.state.title//我的问题
                },{
                    name: "description",
                    content: t('questionList.70')+' - ' + store.state.title//我的问题
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Question>,//分页
        totalrecord : 0, //总记录数
		    currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //查询问题列表
    const queryQuestionList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/questionList',
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
        .then((data: PageView<Question>) => {
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
            path: '/user/control/questionList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}

   

    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'questionList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryQuestionList(page);
        }
        
        next();
    });
    onMounted(() => {
        let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryQuestionList(page);

    }) 
    

</script>

<style scoped lang="scss">
    .questionListModule{
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
