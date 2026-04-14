<!--我的评论-->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main serviceNav-placeholder">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="commentListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center">
                        <!-- 评论 -->
                        <template #header>
                            {{t('commentList.10')}}
                        </template>
                        <template #default="scope">
                            <div v-if="scope.row.status == 10">{{scope.row.content}}</div>
                            <!--reportModule为前端借用‘举报’功能标记模块提示项的参数   10:话题  20:评论  30:评论回复  40:问题  50:答案   60:答案回复-->
                            <router-link tag="div" class="link" v-if="scope.row.status == 20" :to="{path: '/thread', query:{ topicId : scope.row.topicId,commentId:scope.row.id,reportModule:20}}">
                                {{scope.row.content}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="300">
                        <!-- 评论的话题 -->
                        <template #header>
                            {{t('commentList.20')}}
                        </template>
                        <template #default="scope">
                            <router-link tag="div" class="link" :to="{path: '/thread', query:{ topicId : scope.row.topicId}}">
                                {{scope.row.topicTitle}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <!-- label="发表时间" -->
                    <el-table-column prop="postTime" :label="t('commentList.30')"  width="200" align="center"/>

                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('commentList.40')}}</div>
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
    import { PageView,Comment } from "@/types/index";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('commentList.50')+' - ' + store.state.title,//我的评论
            meta: [
                {
                    name: 'keywords',
                    content: t('commentList.50')+' - ' + store.state.title//我的评论
                },{
                    name: "description",
                    content: t('commentList.50')+' - ' + store.state.title//我的评论
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Comment>,//分页
        totalrecord : 0, //总记录数
		    currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //查询评论列表
    const queryCommentList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/commentList',
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
        .then((data: PageView<Comment>) => {
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
            path: '/user/control/commentList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}

   

    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'commentList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryCommentList(page);
        }
        
        next();
    });
    
    onMounted(() => {
        let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryCommentList(page);

    }) 
    

</script>

<style scoped lang="scss">
    .commentListModule{
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
