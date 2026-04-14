<script lang="ts" >
import { compile, defineComponent, h, VNode } from 'vue'

//渲染模板
//setup语法糖不可以使用render
export default defineComponent({
    props: {
        html: { 
            type: String, 
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        },
    }, 

    
    data () {
        return {
            
        }
    },
    computed: {
        template(): string {
            return this.html
        }
    },
    render(): VNode {
        //return h(compile(this.template), { ...this.$attrs })
        return h(compile(this.template,{
            //isCustomElement: (tag) => ['player','hide'].includes(tag),//运行时支持原生自定义元素   player为引入的播放器使用标签
        }), { 
            //图片加载完成
            imageLoad_renderTemplate: (src:string) => {
                this.$emit("load-onImageLoad", '');
            },

            //插入图片(父类@insert-image="handleInsert_renderTemplate"接收)
            onHandleInsert_renderTemplate: (type:number, src: string) => {
                this.$emit("click-onInsertImage", type,src);
            },
            

            onInput: ($event:any) => {
                this.$emit('update:modelValue', $event.target.value)
            },
            ...this.$attrs 
        })
    }
})
</script>