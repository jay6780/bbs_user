<!-- 举报列表 -->
<template>
    <!-- 页头 -->
    <Header/>

     <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            <div class="reportListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <!-- label="理由" -->
                    <el-table-column prop="reason" :label="t('reportList.10')" align="center" ></el-table-column>
                    <!-- label="分类" -->
                    <el-table-column prop="reportTypeName" :label="t('reportList.20')" align="center" ></el-table-column>
                    <!-- label="图片" -->
                    <el-table-column :label="t('reportList.30')" align="center">
                        <template #default="scope">
                            <span v-for="imageInfo in scope.row.imageInfoList" class="image-preview">
                                <!-- 本地存储 -->
                                <el-image v-if="$store.state.fileStorageSystem == 0" preview-teleported style="width: 60px; height: 60px" fit="cover" :src="imageInfo.path+imageInfo.name" :preview-src-list="[imageInfo.path+imageInfo.name]" hide-on-click-modal ></el-image>
                                <!-- SeaweedFS存储 使用nginx image_filter的缩略图处理功能 -->
                                <el-image v-if="$store.state.fileStorageSystem == 10" preview-teleported style="width: 60px; height: 60px" fit="cover" :src="imageInfo.path+imageInfo.name+'?width=60'" :preview-src-list="[imageInfo.path+imageInfo.name]" hide-on-click-modal ></el-image>
                                <!--  MinIO存储 使用nginx image_filter的缩略图处理功能 -->
                                <el-image v-if="$store.state.fileStorageSystem == 20" preview-teleported style="width: 60px; height: 60px" fit="cover" :src="imageInfo.path+imageInfo.name+'?width=60'" :preview-src-list="[imageInfo.path+imageInfo.name]" hide-on-click-modal ></el-image>
                                <!-- 阿里云OSS存储 -->
                                <el-image v-if="$store.state.fileStorageSystem == 30" preview-teleported style="width: 60px; height: 60px" fit="cover" :src="imageInfo.path+imageInfo.name+'?x-oss-process=image/resize,w_60'" :preview-src-list="[imageInfo.path+imageInfo.name]" hide-on-click-modal ></el-image>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="120">
                        <!-- 被举报内容 -->
                        <template #header>
                            {{t('reportList.40')}}
                        </template>
                        <template #default="scope">
                            <!-- 查看话题 -->
                            <router-link v-if="scope.row.module == 10" tag="div" class="link" :to="{path: '/thread', query:{ topicId : scope.row.parameterId, reportModule:scope.row.module}}">{{t('reportList.50')}}</router-link>
                            <!-- 查看评论 -->
                            <router-link v-if="scope.row.module == 20" tag="div" class="link" :to="{path: '/thread', query:{ topicId : scope.row.extraParameterId,commentId:scope.row.parameterId, reportModule:scope.row.module}}">{{t('reportList.60')}}</router-link>
                            <!-- 查看评论回复 -->
                            <router-link v-if="scope.row.module == 30" tag="div" class="link" :to="{path: '/thread', query:{ topicId : scope.row.extraParameterId.split('-')[0], commentId:scope.row.extraParameterId.split('-')[1], replyId:scope.row.parameterId, reportModule:scope.row.module}}">{{t('reportList.70')}}</router-link>
                            <!-- 查看问题 -->
                            <router-link v-if="scope.row.module == 40" tag="div" class="link" :to="{path: '/question', query:{ questionId : scope.row.parameterId, reportModule:scope.row.module}}">{{t('reportList.80')}}</router-link>
                            <!-- 查看答案 -->
                            <router-link v-if="scope.row.module == 50" tag="div" class="link" :to="{path: '/question', query:{ questionId : scope.row.extraParameterId,answerId:scope.row.parameterId, reportModule:scope.row.module}}">{{t('reportList.90')}}</router-link>
                            <!-- 查看答案回复 -->
                            <router-link v-if="scope.row.module == 60" tag="div" class="link" :to="{path: '/question', query:{ questionId : scope.row.extraParameterId.split('-')[0], answerId:scope.row.extraParameterId.split('-')[1], replyId:scope.row.parameterId, reportModule:scope.row.module}}">{{t('reportList.100')}}</router-link>
                        </template>
                    </el-table-column>
                    <!-- 状态 -->
                    <el-table-column :label="t('reportList.110')" align="center" width="160">
                        <template #default="scope">
                            <!-- 待处理 -->
                            <el-tag effect="dark"  v-if="scope.row.status==10" class="tag-wrapper">{{t('reportList.120')}}</el-tag>
                            <!-- 投诉失败 -->
                            <el-tag effect="dark"  v-if="scope.row.status==40" type="warning" class="tag-wrapper"> {{t('reportList.130')}}</el-tag>
                            <!-- 投诉成功 -->
                            <el-tag effect="dark"  v-if="scope.row.status==50" type="success" class="tag-wrapper">{{t('reportList.140')}}</el-tag>
                            <!-- 待处理【用户删除】 -->
                            <el-tag effect="dark"  v-if="scope.row.status==1010" type="danger" class="tag-wrapper">{{t('reportList.150')}}</el-tag>
                            <!-- 投诉失败【用户删除】 -->
                            <el-tag effect="dark"  v-if="scope.row.status==1040" type="danger" class="tag-wrapper">{{t('reportList.160')}}</el-tag>
                            <!-- 投诉成功【用户删除】 -->
                            <el-tag effect="dark"  v-if="scope.row.status==1050" type="danger" class="tag-wrapper">{{t('reportList.170')}}</el-tag>
                            <!-- 待处理【员工删除】 -->
                            <el-tag effect="dark"  v-if="scope.row.status==100010" type="danger" class="tag-wrapper">{{t('reportList.180')}}</el-tag>
                            <!-- 投诉失败【员工删除】 -->
                            <el-tag effect="dark"  v-if="scope.row.status==100040" type="danger" class="tag-wrapper">{{t('reportList.190')}}</el-tag>
                            <!-- 投诉成功【员工删除】 -->
                            <el-tag effect="dark"  v-if="scope.row.status==100050" type="danger" class="tag-wrapper">{{t('reportList.200')}}</el-tag>
                        </template>
                    </el-table-column>
                    <!-- label="处理结果" -->
                    <el-table-column :label="t('reportList.210')" align="center" width="180">
                        <template #default="scope">
                            <div>{{scope.row.processResult}}</div>
                        </template>
                    </el-table-column>
                    <!-- label="举报时间 / 处理完成时间" -->
                    <el-table-column :label="t('reportList.220')" align="center" width="200">
                        <template #default="scope">
                            <div>{{scope.row.postTime}}</div>
                            <div v-if="scope.row.processCompleteTime" class="processCompleteTime">{{scope.row.processCompleteTime}}</div>
                            
                        </template>
                    </el-table-column>
                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('reportList.230')}}</div>
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
    import { PageView,Report } from "@/types/index";
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('reportList.240')+' - ' + store.state.title,//举报列表
            meta: [
                {
                    name: 'keywords',
                    content: t('reportList.240')+' - ' + store.state.title//举报列表
                },{
                    name: "description",
                    content: t('reportList.240')+' - ' + store.state.title//举报列表
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Report>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //查询举报列表
    const queryReportList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/reportList',
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
        .then((data: PageView<Report>) => {
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
            path: '/user/control/reportList', 
            query:{page : page}
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}



    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'reportList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryReportList(page);
        }
        
        next();
    });
    
    onMounted(() => {
        let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryReportList(page);

    }) 
    

</script>

<style scoped lang="scss">
    .reportListModule{
        padding-right:8px;
        padding-left:8px;
        padding-top:8px;
        padding-bottom: 30px;
        .image-preview{
            margin-left: 5px;
            margin-bottom: 5px;
        }
        .processCompleteTime{
            color: #67C23A;
        }
        .link{
            color: $color-blue-60;
        }
        .page{
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
        }
        :deep(.tag-wrapper) {
            /* 禁用所有过渡动画 */
            transition: none !important;
            animation: none !important;
            
            /* 针对 Element Plus 的内置动画类进行拦截 */
            &.el-zoom-in-center-enter-active,
            &.el-zoom-in-center-leave-active {
                transition: none !important;
                display: none !important; // 离场时不占位，进场时不抖动
            }
        }
    }

</style>
