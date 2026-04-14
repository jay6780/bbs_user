<!--关注-->
<template>
    <!-- 页头 -->
    <Header/>

    <!-- 服务导航 -->
    <ServiceNav/>
    <div class="main">
        <div class="main-container wrap backgroundModule main-fullScreen">
            

            <div class="followListModule" >
                <el-table :data="state.pageView.records" stripe class="dataTable">
                    <el-table-column align="center">
                        <!-- 用户 -->
                        <template #header>
                            {{t('followList.10')}}
                        </template>
                        <template #default="scope">
                            <div class="userInfo">
                                <!-- 此用户账号已注销 -->
                                <div v-if="scope.row.friendAccount == null || scope.row.friendAccount == ''" class="cancelAccount">{{t('followList.20')}}</div>
                                <div v-if="scope.row.friendAccount != null && scope.row.friendAccount != ''" >
                                    <router-link tag="a" :to="{path:'/user/control/home',query: {userName: scope.row.friendUserName}}" target="_blank">
                                        <span class="avatarImg">
                                            <img v-if="scope.row.friendAvatarName != null" :src="scope.row.friendAvatarPath+'100x100/'+scope.row.friendAvatarName" class="img">
                                        
                                            <img v-if="scope.row.friendAvatarName == null" :src="scope.row.avatar" width="40" height="40" class="img"/>
                                        </span>
                                        <span v-if="scope.row.friendNickname == null || scope.row.friendNickname == ''" class="account">{{scope.row.friendAccount}}</span>
                                        <span v-if="scope.row.friendNickname != null && scope.row.friendNickname != ''" class="account">{{scope.row.friendNickname}}</span>
                                    </router-link>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 关注时间 -->
                    <el-table-column prop="addtime" :label="t('followList.30')"  width="200" align="center"/>
                    <el-table-column width="120" align="center">
                        <!-- 操作 -->
                        <template #header>
                            {{t('followList.40')}}
                        </template>
                        <template #default="scope">
                            <el-button-group>
                                <el-button type="primary" @click="handleDeleteFollow(scope.$index, scope.row)" >{{t('followList.50')}}</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <!-- 暂无数据 -->
                        <div v-if="!state.loading">{{t('followList.60')}}</div>
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
    import { PageView,Follow } from "@/types/index";
    import {letterAvatar} from '@/utils/letterAvatar'
    import { ElMessage } from 'element-plus';
    import { processErrorInfo } from '@/utils/tool';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();


    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('followList.70')+' - ' + store.state.title,//关注
            meta: [
                {
                    name: 'keywords',
                    content: t('followList.70')+' - ' + store.state.title//关注
                },{
                    name: "description",
                    content: t('followList.70')+' - ' + store.state.title//关注
                }
            ]
        }))
    )


    const state = reactive({
        pageView: {} as PageView<Follow>,//分页
        totalrecord : 0, //总记录数
		currentpage : 1, //当前页码
        totalpage : 1, //总页数
        maxresult: 12, //每页显示记录数     

        loading:true,//是否显示骨架屏
        isShowPage:false//是否显示分页
    });

    //错误
    const error = reactive({})

    //查询关注列表
    const queryFollowList = (page: number) => {
        proxy?.$axios({
            url: '/user/control/followList',
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
        .then((data: PageView<Follow>) => {
            state.loading = false;//关闭骨架屏

            if(data.records != null && data.records.length >0){
                for(let i:number=0; i<data.records.length; i++){
                    let follow = data.records[i];
                    if(follow.friendNickname != null && follow.friendNickname !=''){
                        follow.avatar = letterAvatar(follow.friendNickname, 40);
                    }else{
                        follow.avatar = letterAvatar(follow.friendAccount, 40);
                    }

                }
            }


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
            path: '/user/control/followList', 
            query:{
                page : page
            }
		});
        router.afterEach(() => {
            window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
        });
	}

    //处理删除
    const handleDeleteFollow = (index: number, row: Follow) => {
        proxy?.$axios({
            url: '/user/control/deleteFollow',
            method: 'post',
            params:  { 
                followId: row.id
            },
        })
        .then((response: AxiosResponse) => {
            if(response){
                const result: any = response.data;
                    
                if(result.success){//成功
                    ElMessage({
                        showClose: true,
                        message: t('followList.80'),//删除成功
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
        if(to.name == 'followList'){
            let page:number = 1;
            if(to.query.page != undefined){
                page = parseInt(to.query.page as string);
            }
            queryFollowList(page);
        }
        
        next();
    });
    
    onMounted(() => {
        init();

    }) 
    
     //初始化
    const init = () => {
		let page:number = router.currentRoute.value.query.page != undefined ? parseInt(router.currentRoute.value.query.page as string) :1;
        queryFollowList(page);
	}

</script>

<style scoped lang="scss">
    .followListModule{
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
