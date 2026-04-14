<!-- 点赞 -->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="likeListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center">
                        <!-- 标题 -->
                        <template #header>
                            {{t('likeList.10')}}
                        </template>
                        <template #default="scope">
                            <router-link tag="div" class="link" v-if="scope.row.module == 10 || scope.row.module == 20 || scope.row.module == 30" :to="{path: '/thread', query:{ topicId : scope.row.topicId}}">
                                {{scope.row.topicTitle}}
                            </router-link>
                            <router-link tag="div" class="link" v-if="scope.row.module == 40 || scope.row.module == 50 || scope.row.module == 60" :to="{path: '/question', query:{ questionId : scope.row.questionId}}">
                                {{scope.row.questionTitle}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column align="center">
                        <!-- 摘要 -->
                        <template #header>
                            {{t('likeList.20')}}
                        </template>
                        <template #default="scope">
                            <div v-if="scope.row.module == 10">{{scope.row.summary}}</div>
                            <!--reportModule为前端借用‘举报’功能标记模块提示项的参数   10:话题  20:评论  30:评论回复  40:问题  50:答案   60:答案回复-->
                            <router-link tag="div" class="link" v-if="scope.row.module == 20" :to="{path: '/thread', query:{ topicId : scope.row.topicId,commentId:scope.row.commentId,reportModule:20}}">
                                {{scope.row.summary}}
                            </router-link>
                            <router-link tag="div" class="link" v-if="scope.row.module == 30" :to="{path: '/thread', query:{ topicId : scope.row.topicId,commentId:scope.row.commentId,replyId:scope.row.commentReplyId,reportModule:30}}">
                                {{scope.row.summary}}
                            </router-link>
                            <div v-if="scope.row.module == 40">{{scope.row.summary}}</div>
                            <router-link tag="div" class="link" v-if="scope.row.module == 50" :to="{path: '/question', query:{ questionId : scope.row.questionId,answerId:scope.row.answerId,reportModule:50}}">
                                {{scope.row.summary}}
                            </router-link>
                            <router-link tag="div" class="link" v-if="scope.row.module == 60" :to="{path: '/question', query:{ questionId : scope.row.questionId,answerId:scope.row.answerId,replyId:scope.row.answerReplyId,reportModule:60}}">
                                {{scope.row.summary}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column  width="120" align="center">
                        <!-- 模块 -->
                        <template #header>
                            {{t('likeList.30')}}
                        </template>
                        <template #default="scope">
                            <!-- 话题 -->
                            <span v-if="scope.row.module == 10">{{t('likeList.40')}}</span>
                            <!-- 评论 -->
                            <span v-if="scope.row.module == 20">{{t('likeList.50')}}</span>
                            <!-- 评论回复 -->
                            <span v-if="scope.row.module == 30">{{t('likeList.60')}}</span>
                            <!-- 问题 -->
                            <span v-if="scope.row.module == 40">{{t('likeList.70')}}</span>
                            <!-- 答案 -->
                            <span v-if="scope.row.module == 50">{{t('likeList.80')}}</span>
                            <!-- 答案回复 -->
                            <span v-if="scope.row.module == 60">{{t('likeList.90')}}</span>
                        </template>
                    </el-table-column>
                    <!-- 点赞时间-->
                    <el-table-column prop="addtime" :label="t('likeList.150')"  width="200" align="center"/>
                    <el-table-column width="120" align="center">
                        <!-- 操作-->
                        <template #header>
                            {{t('likeList.100')}}
                        </template>
                        <template #default="scope">
                            <el-button-group>
                                <!-- 删除-->
                                <el-button type="primary" @click="handleDeleteLike(scope.$index, scope.row)" >{{t('likeList.110')}}</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <!-- 暂无数据-->
                        <div v-if="!state.loading">{{t('likeList.120')}}</div>
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
    import { PageView,Like } from "@/types/index";
    import { processErrorInfo} from '@/utils/tool';
    import { ElMessage } from 'element-plus';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('likeList.130')+' - ' + store.state.title,//点赞
            meta: [
                {
                    name: 'keywords',
                    content: t('likeList.130')+' - ' + store.state.title//点赞
                },{
                    name: "description",
                    content: t('likeList.130')+' - ' + store.state.title//点赞
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Like>,//分页
        totalrecord : 0, //总记录数
		    currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //错误
    const error = reactive({})

    //查询点赞列表
    const queryLikeList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/likeList',
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
        .then((data: PageView<Like>) => {
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
            path: '/user/control/likeList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}

    //处理删除
    const handleDeleteLike = (index: number, row: Like) => {
        proxy?.$axios({
            url: '/user/control/deleteLike',
            method: 'post',
            params:  { 
                likeId: row.id
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                    
                if(result.success){//成功
                    ElMessage({
                        showClose: true,
                        message: t('likeList.140'),//删除成功
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
        if(to.name == 'likeList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryLikeList(page);
        }
        
        next();
    });
    onMounted(() => {
        init();

    }) 

    //初始化
    const init = () => {
		let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryLikeList(page);
	}
    

</script>

<style scoped lang="scss">
    .likeListModule{
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
