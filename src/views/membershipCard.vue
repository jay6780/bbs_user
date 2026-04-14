<!-- 会员卡 -->
<template>
    <!-- 页头 -->
    <Header/>

    <template v-if="state.membershipCard != null && Object.keys(state.membershipCard).length>0">
        <div class="main-container wrap backgroundModule">
            <div class="module-head">
                <div class="info">
                    <h3>{{state.membershipCard.name}}</h3>
                </div>
            </div>
        </div>	
        <div class="main">
            <div class="main-container wrap">
                <div class="membershipCardModule">
                        
                        <div class="membershipCard-item" v-for="(specification,index) in state.membershipCard.specificationList">
                            <div class="title">{{specification.specificationName}}</div>
                            <div class="info"> 
                                <div class="sellingPrice" v-if="specification.sellingPrice != null && parseFloat(specification.sellingPrice) > 0">
                                    <!--<b>￥</b><strong>{{specification.sellingPrice}}</strong> 元-->
                                    <i18n-t keypath="membershipCard.10" scope="global">
                                        <template #p1>
                                            <b>￥</b><strong>{{specification.sellingPrice}}</strong>
                                        </template>
                                    </i18n-t>
                                </div>
                                <div class="sellingPrice" v-if="specification.point != null && Long.fromString(specification.point).gt(0)">
                                    <!--<strong>{{specification.point}}</strong> 积分-->
                                    <i18n-t keypath="membershipCard.20" scope="global">
                                        <template #p1>
                                            <strong>{{specification.point}}</strong>
                                        </template>
                                    </i18n-t>
                                    
                                </div>
                                <!-- 原价  元 -->
                                <div class="marketPrice" v-if="specification.marketPrice != null && parseFloat(specification.marketPrice) >0">
                                    <!--原价￥<span>{{specification.marketPrice}}</span> 元-->
                                    <i18n-t keypath="membershipCard.30" scope="global">
                                        <template #p1>
                                            <span>{{specification.marketPrice}}</span>
                                        </template>
                                    </i18n-t>
                                </div>
                                
                                <div class="buy-box">
                                    <!-- 立即购买 -->
                                    <button class="buyButton"  :disabled="state.buttonDisabled[index]"  @click="addMembershipCardOrder(index,specification.id);">{{t('membershipCard.40')}}</button>
						
                                </div>
                            </div>
                        </div>
                        
                        <div class="clearfix"></div>
                        <div class="detail">
                            <p class="title">{{t('membershipCard.50')}}</p>
                            <div class="line-blue"></div>
                            <div class="line-gray"></div>
                            <div class="content">
                                <RenderTemplate :html="state.membershipCard.introduction"></RenderTemplate>
                               
                            </div>
                        </div>
            
                    </div>
            </div>
        </div>
    </template>
    <div class="main-container wrap backgroundModule main-fullScreen" v-if="state.membershipCard == null || Object.keys(state.membershipCard).length ==0">
        <!-- title="没有找到会员卡信息" -->
        <el-result icon="info" :title="t('membershipCard.60')"></el-result>
    </div>

    <!-- 回到顶部 -->
    <el-backtop :bottom="100" :visibility-height="100">
        <div>
            <Icon name="back-to-top" size="16px" />
        </div>
    </el-backtop>

    <!-- 页脚 -->
    <Footer/>
</template>

<script lang="ts" setup>
    import { onMounted, getCurrentInstance, ComponentInternalInstance, reactive, computed,} from 'vue'
    import { appStore } from "@/store";
    import { useMeta} from 'vue-meta'
    import { onBeforeRouteUpdate, useRouter } from 'vue-router'
    import { MembershipCard,} from "@/types/index";
    import { AxiosResponse } from 'axios';

    import Long from "long";
    import { getLanguageClassName, processErrorInfo } from '@/utils/tool';
    import { escapeVueHtml } from '@/utils/escape';
    import { ElImage, ElMessage, ElMessageBox } from 'element-plus';
    import { useI18n } from 'vue-i18n';
    let { t } = useI18n();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = appStore();
    const router = useRouter();

    
    //html页元信息
    const { meta } = useMeta(
        computed(() => ({ 
            title:  t('membershipCard.70')+' - ' + store.state.title,//会员卡
            meta: [
                {
                    name: 'keywords',
                    content: t('membershipCard.70')+' - ' + store.state.title//会员卡
                },{
                    name: "description",
                    content: t('membershipCard.70')+' - ' + store.state.title//会员卡
                }
            ]
        }))
    )

    
    const state = reactive({
        membershipCardId :'',//会员卡Id
        membershipCard :{} as MembershipCard,//会员卡
        loading:true,//是否显示骨架屏
        buttonDisabled:[] as Array<boolean>,//提交按钮是否允许点击
    });
    //错误
    const error = reactive({
    })

  
    //查询会员卡
    const queryMembershipCard = (membershipCardId:string) => {
        proxy?.$axios({
            url: '/queryMembershipCardDetail',
            method: 'get',
            params:  {
                membershipCardId:membershipCardId
            },
            //showLoading: false,//是否显示加载图标
            //loadingMask:false,// 是否显示遮罩层
        })
        .then((response: AxiosResponse) => {
            return response?.data
        })
        .then((data: MembershipCard) => {
            state.loading = false;//关闭骨架屏
            if(data){
                for (let i = 0; i < data.specificationList.length; i++) {
                    let specification = data.specificationList[i];
                    if(Long.fromString(specification.stock).gte(0)){
                        state.buttonDisabled.push(false); 
                    }else{
                        state.buttonDisabled.push(true);
                    }
                }

                //处理自定义标签
                let contentNode = document.createElement("div");
                contentNode.innerHTML = data.introduction;
                bindNode(contentNode);
                
                data.introduction = escapeVueHtml(contentNode.innerHTML);


                state.membershipCard = data;
            }
        })
        .catch((error: any) =>{
            console.log(error);
        });
    }

    //递归绑定节点参数
    const bindNode = (node:any) => {
        
        
        //先找到子节点
        let nodeList = node.childNodes;
        for(let i = 0;i < nodeList.length;i++){
            //childNode获取到到的节点包含了各种类型的节点
            //但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
            let childNode = nodeList[i];
            let random = Math.random().toString().slice(2);
            //判断是否是元素节点。如果节点是元素(Element)节点，则 nodeType 属性将返回 1。如果节点是属性(Attr)节点，则 nodeType 属性将返回 2。
            if(childNode.nodeType == 1){
                //处理图片
                if(childNode.nodeName.toLowerCase() == "img" ){
                    let src = childNode.getAttribute("src");
                    
                    childNode.removeAttribute("src");//将原节点src属性删除，防止多请求一次
                
                    let html = '';
                    let style = '';
                    if(childNode.getAttribute("width") != null){//如果是表情，表情图不放大
                        style = 'style="width: '+childNode.getAttribute("width")+'; height: '+childNode.getAttribute("height")+'"';
                        html = '<el-image src="'+src+'" '+style+' loading="lazy" ></el-image>';
                    }else{
                    
                        html = '<el-image src="'+src+'" '+style+' :preview-src-list=["'+src+'"] lazy hide-on-click-modal ></el-image>';
                    }
                    //创建要替换的元素
                //	let html = '<el-image src="'+src+'" '+style+' lazy></el-image>';
                //	let html = '<el-image src="'+src+'" '+style+' :preview-src-list=["http://127.0.0.1:8080/cms/common/tttttt/templates.jpg"] lazy hide-on-click-modal ></el-image>';
                    
                
                
                //	let html = '<el-image src="backstage/images/null.gif" lazy></el-image>';
                    let placeholder = document.createElement('div');
                    placeholder.innerHTML = html;
                    let node = placeholder.childNodes[0];
                //	node.setAttribute("src",src);
                    childNode.parentNode.replaceChild(node,childNode);//替换节点	 
                }
                
                //处理表格 (解决Chrome内核浏览器DPI缩放比例高于100%时部分边框变粗问题，需要CSS配合)
                if(childNode.nodeName.toLowerCase() == "table" ){
                    childNode.removeAttribute("border");
                    childNode.removeAttribute("bordercolor");
                }

                
                //处理代码标签
                if(childNode.nodeName.toLowerCase() == "pre" ){
                    let pre_html = childNode.innerHTML;
                    let class_val = childNode.className;
                    let lan_class = "";
                    
                    let class_arr = new Array();
                    class_arr = class_val.split(' ');
                    
                    for(let k=0; k<class_arr.length; k++){
                        let className = class_arr[k].trim();
                        
                        if(className != null && className != ""){
                            if (className.lastIndexOf('lang-', 0) === 0) {
                                lan_class = className;
                                break;
                            }
                        }
                    }
                    
                    childNode.className = "line-numbers "+getLanguageClassName(lan_class);
                    childNode.setAttribute("data-prismjs-copy",t('membershipCard.80'));//复制
                    childNode.setAttribute("data-prismjs-copy-error",t('membershipCard.90'));//按Ctrl+C复制
                    childNode.setAttribute("data-prismjs-copy-success",t('membershipCard.100'));//复制成功


                    let nodeHtml = "";

                    //删除code节点
                    let preChildNodeList = childNode.childNodes;
                    for(let p = 0;p < preChildNodeList.length;p++){
                        let preChildNode = preChildNodeList[p];
                        if(preChildNode.nodeName.toLowerCase() == "code" ){
                            nodeHtml += preChildNode.innerHTML;
                            preChildNode.parentNode.removeChild(preChildNode);
                        }
                        
                    }
                    
                    let dom = document.createElement('code');
                    dom.className = "line-numbers "+getLanguageClassName(lan_class);
                    dom.innerHTML=nodeHtml;
                    
                   
                    childNode.appendChild(dom);
                
                }
                
                bindNode(childNode);

                
            }
        }
    }

    //购买会员卡
    const addMembershipCardOrder = (index:number,specificationId:string) => {
        state.buttonDisabled.splice(index,1,true);//修改为不允许点击按钮

        ElMessageBox.confirm(t('membershipCard.110'),{//确定购买?
            // type: 'warning',
            cancelButtonText: t('common.60'),//取消
            confirmButtonText: t('common.90')//确定
        })
        .then(() => {
            let formData = new FormData();
            formData.append('specificationId', specificationId);

            proxy?.$axios({
                url: '/user/control/membershipCard/add',
                method: 'post',
                data: formData
            })
            .then((response: AxiosResponse) => {
                if(response){

                    const result: any = response.data;
                
                    if(result.success){
                        ElMessage({
                            showClose: true,
                            message: t('membershipCard.120'),//购买会员卡成功
                            type: 'success',
                            onClose:()=>{
                                
                            }
                        })
                    }else{
                        //处理错误信息
                        processErrorInfo(result.error as Map<string,string> ,  error,()=>{});
                        
                    }
                }
            })
            .catch((error: any) =>{
                console.log(error);
            });
        })
        .catch(() => {
            //取消
            state.buttonDisabled.splice(index,1,false);//修改为允许点击按钮
        })
    }
    

    //导航守卫
    onBeforeRouteUpdate((to, from, next) => {
        if(to.name == 'membershipCard'){
            let membershipCardId:string = '';
            if(to.query.membershipCardId != undefined){
                membershipCardId = to.query.membershipCardId as string
            }
            queryMembershipCard(membershipCardId)
        }
        
        next();
    });

    onMounted(() => {
        let membershipCardId:string = router.currentRoute.value.query.membershipCardId != undefined ?router.currentRoute.value.query.membershipCardId as string :'';
        
        queryMembershipCard(membershipCardId)
    }) 

</script>
<style scoped lang="scss">
.module-head{
	padding: 2px 20px 2px 20px;
	box-shadow: 0 0px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
	position: relative;
	height: 48px;
    .info {
        padding: 10px 0;
        display: block;
        text-align: center;
        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden
        }
        h3 {
            color: $color-black-90;
            font-size: 20px;
            line-height: 28px;
            font-weight:normal;
        }
        .extra {
            float: right;
            text-align: right;
            margin-top: 10px;
        }
    }
}

/* 会员卡 */
.membershipCardModule{
    margin: auto;
    overflow: auto;
    text-align: center;
    .membershipCard-item{
        float: left;
        width: 272px;
        text-align: center;
        margin: 30px 15px;
        overflow: hidden;
        background-color: #FFFFFF;
    
        -moz-box-shadow: 0 1px 3px 0 rgba(0,0,0,.03),0 4px 8px 0 rgba(0,0,0,.03);
        -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.03),0 4px 8px 0 rgba(0,0,0,.03);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.03),0 4px 8px 0 rgba(0,0,0,.03);
        border-radius: 8px;
        .title {
            height: 46px;
            line-height: 46px;
            background-color: #409eff;
            color: white;
            font-size: 18px;
        }
        .info{
            position: relative;
            overflow: hidden;
            .sellingPrice{
                font-size: 14px;
                margin-top: 20px;
                b{ 
                    color: #f75d51; 
                    font-size: 24px; 
                    font-weight: normal;
                }
                strong{
                    font-size: 36px;
                    color: #f75d51; 
                    position: relative;
                    top: 2px;
                }
            }
            .marketPrice{
                text-decoration: line-through;
                font-size: 13px;
                color: $color-black-70;
            }
            .buyButton{ 
                color: #fff;
                border-radius:3px; 
                font-size: 16px; 
                border:none;
                display: block; 
                width: 160px; 
                line-height: 38px; 
                text-align: center; 
                background-color: #409eff;
                margin: 15px auto auto auto;
                &:hover{ 
                    background-color: #1890ff;
                }
                &:disabled{
                    border:none;
                    background-color: $color-black-50;
                    cursor: not-allowed;
                    text-decoration: none;
                }
            }
        }
        > .info{
            > * {
                margin-bottom: 10px;
            }
            .buy-box{
                margin-bottom: 20px;
            }
        }

    }
    .detail{
        margin: 0 auto;
        .title {
            padding-top: 24px;
            font-size: 28px;
            color: #409eff;
            line-height: normal
        }
        .line-blue {
            margin: 12px auto 0;
            width: 100px;
            border-bottom: 4px solid #409eff;
        }
        .line-gray {
            margin: 0 auto;
            width: 600px;
            border-bottom: 1px solid $color-black-40;
        }
        :deep(.content){
            margin-top:10px;
            padding:20px 5px;
            color:$color-black-70;
            font-size:16px;
            word-wrap : break-word;word-break : break-all;
            p{
                font-size:16px;
                word-wrap : break-word;word-break : break-all;
            }
            img{
                max-width:100%;
                height:auto;
                border:none;
                background:none;
                margin:0;
                padding:0;
                vertical-align: sub;
            }
            .el-image[style*="width: 32px; height: 32px;"]{
                top: 3px;
            }
            /** 解决Chrome内核浏览器DPI缩放比例高于100%时部分边框变粗问题   本方案需删除table样式 border="1" bordercolor="#000000" */
            table {
                border-collapse: separate; 
                border-spacing: 0; 
                border-top: 1px solid $color-black-30;
                border-left: 1px solid $color-black-30;
                th {
                    font-weight: 600
                }
                th, td {
                    border-right: 1px solid $color-black-30; 
                    border-bottom: 1px solid $color-black-30;
                    padding: 6px 13px
                }
                tr {
                    background-color: #fff;
                    border-top: 1px solid $color-black-30;
                    &:nth-child(2n) {
                        background-color: $color-black-10;
                    }
                }
                /**
                table {
                    width: 100%;
                    th {
                        font-weight: 600
                    }
                    td,th {
                        border: 1px solid $color-black-30;
                        padding: 6px 13px
                    }
                    tr {
                        background-color: #fff;
                        border-top: 1px solid $color-black-30;
                        &:nth-child(2n) {
                            background-color: $color-black-10;
                        }
                    }
                }**/
            }
            ol{
                li{ 
                    list-style-type:decimal;
                    list-style-position:inside;
                }
            }
            ul{
                li{ 
                    margin-left:20px;
                    list-style-type:disc;
                }
            }
        }
    }
}
</style>