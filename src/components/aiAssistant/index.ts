import { AiChatInsertData } from "@/types";
import { AppContext, h, render } from "vue";


let dialogVisible:any = null;


/**
 * 函数式弹窗
 * 本函数需要在main.ts中挂载，并且在shims-component.d.ts中全局声明
 * 全局只弹出一个窗口
 * @param component 组件
 * @param options 组件参数
 * @param appContext 应用的上下文 appContext获取的即为main.ts里创建的的 vue 对象
 * @param callback 回调
 * @returns
 **/
function createAiAssistantDialog(component: any, options: any,appContext: AppContext,callback: (d: AiChatInsertData) => void) {
    //prismjs工具栏显示按钮
    document.body.setAttribute('data-toolbar-order','copy-to-clipboard,insert-to-editor')
    if(dialogVisible != null){
        dialogVisible.value = true;
        return;
    }

    // 创建一个div节点
    const mountNode = document.createElement("div");
    // 将div节点拼接到Dom的body节点下
    document.body.appendChild(mountNode);
    // 使用h函数创建节点
    const vNode = h(component, {
        ...options,
        // 注意: vue子组件emit回调事件名称必须以on开头
        onInsert: (data:AiChatInsertData) => {
            callback(data);
        },
        onClose: (data:AiChatInsertData) => {
            // 移除节点
            // document.body.removeChild(mountNode);
        },
        onDialogRef: (ref:any) => {
            dialogVisible = ref;
        }
    });

    //将vue组件关联到当前应用下管理，如果这个appContext是单独创建，那么原来app相关的资源将不能用，如：router，全局组件等等，都需要重新创建。
    vNode.appContext =  appContext;
    
    // 渲染Dialog
    render(vNode, mountNode);//将组件挂载到mountNode下。
}

export default createAiAssistantDialog;
