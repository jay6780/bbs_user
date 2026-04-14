<!-- AI对话图片展示 -->
<template>
    <div class="aiChatImageViewModule">
        <el-image ref="aiChatImageView" :src="props.src" lazy fit="contain">
            <template #placeholder><!-- 当图像尚未加载时，自定义的占位符内容 -->
                <div class="image-slot">
                    <div class="el-loading-spinner">
                        <svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg>
                    </div>
                </div>
            </template>
            <template #error><!-- 加载失败 -->
                <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                </div>
            </template>
        </el-image>
        <span class="imageView-actions">
            <!-- 放大 -->
            <span class="imageView__item-preview" @click="openImagePreview(props.src)">
                {{t('aiChatImageView.10')}}
            </span>
            <!-- 复制 -->
            <span class="imageView__item-copy" @click="handleCopyImage()">
                {{t('aiChatImageView.20')}}
            </span>
            <!-- 插入 -->
            <span class="imageView__item-insert" @click="handleInsertImage(props.src)">
                {{t('aiChatImageView.30')}}
            </span>
        </span>
        <!-- 图片预览 -->
        <el-image-viewer v-if="state.isImageViewer" @close="closeImagePreview" :url-list="[state.imageUrl]" />
    </div>
</template>

<script setup lang="ts">
    import { ElMessage } from 'element-plus';
    import { reactive, ref} from 'vue'
    import { useI18n } from 'vue-i18n';
    
    let { t } = useI18n();
    //AI对话图片展示
    const aiChatImageView = ref();

    const emit = defineEmits(['insertImage'])
   
    //接收父组件消息
    const props = defineProps({
        src: {//图片地址
            type: String,
            default: ''
        }
    })  

    const state = reactive({
        imageUrl: '' as string | undefined,//图片地址
        isImageViewer: false,//是否显示图片查看器
    });



    //打开图片预览
    const openImagePreview = (url: string) => {
        state.imageUrl = url;
        state.isImageViewer = true;
    }
    //关闭图片预览
    const closeImagePreview = () => {
        state.imageUrl = '';
        state.isImageViewer = false;
    }
    
    //处理插入图片
    const handleInsertImage = (url: string) => {
        //传递给父组件
        emit('insertImage',30,url);//传递给 @insert-image="..."
    };


    //处理复制图片
    const handleCopyImage = () => {
        const imgElement = aiChatImageView.value.$el.querySelector("img");

        //const response = await fetch(imgElement.src);
        //const blob = await response.blob();

        fetch(imgElement.src)
            .then(response => response.blob())
            .then(async blob => {
                const data = [         
                    new ClipboardItem({// 注意：new ClipboardItem()非https域名下（localhost|127.0.0.1除外）会报错
                        [blob.type]: blob,         
                    }),       
                ];
                // https://w3c.github.io/clipboard-apis/#dom-clipboard-write     
                await navigator.clipboard.write(data)        
                .then(           
                    () => {            
                        ElMessage({
                            showClose: true,
                            message: t('aiChatImageView.40'),//复制成功
                            type: 'success',
                            onClose: ()=>{
                                
                            }
                        })        
                    },           
                    () => {
                        ElMessage({
                            showClose: true,
                            message: t('aiChatImageView.50'),//无法写入剪贴板
                            type: 'error',
                            onClose: ()=>{
                                
                            }
                        })      
                    }        
                );       
            }
        );

        /**
        const canvas:any = document.createElement('canvas');
        const ctx:any = canvas.getContext('2d');
        const img = new Image();
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        img.crossOrigin = "Anonymous";
        img.src = imgElement.src;
        img.onload = () =>{
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(img, 0, 0); // 将canvas转为blob     
            canvas.toBlob(async (blob:any) => {      
                const data = [         
                    new ClipboardItem({// 注意：new ClipboardItem()非https域名下（localhost|127.0.0.1除外）会报错
                        [blob.type]: blob,         
                    }),       
                ];
                // https://w3c.github.io/clipboard-apis/#dom-clipboard-write     
                await navigator.clipboard.write(data)        
                .then(           
                    () => {            
                        ElMessage({
                            showClose: true,
                            message: '复制成功',
                            type: 'success',
                            onClose: ()=>{
                                
                            }
                        })        
                    },           
                    () => {
                        ElMessage({
                            showClose: true,
                            message: '无法写入剪贴板',
                            type: 'error',
                            onClose: ()=>{
                                
                            }
                        })      
                    }        
                );       
            });   
        }**/
    };
    
</script>

<style scoped lang="scss">
.aiChatImageViewModule {
    max-width: 300px;
    max-height: 300px;
    width: 100%;
    height: 300px;
    position: relative;

    .el-image {
        max-width: 300px;
        max-height: 300px;
        width: 100%;
        height: 300px;
    }
    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: #909399;
        font-size: 30px;
        .el-icon {
            font-size: 60px;
        }
    }
    .imageView-actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        opacity: 0;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;

        span {
            display: none;
            cursor: pointer
        }
        span+span {
            margin-left: 20px
        }
        .imageView__item-copy {
            position: static;
            font-size: inherit;
            color: inherit
        }
        &:hover {
            opacity: 1
        }
        &:hover span {
            display: inline-flex
        }
    }
}








</style>
