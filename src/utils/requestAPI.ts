import { AxiosResponse } from "axios";
import store from "@/store";
import { User } from "@/types";
import axiosInstance from '@/utils/http'

/**
 * 查询基本信息
 */
 export function queryBaseInfo (){
    axiosInstance({
        url: '/baseInfo',
        method: 'get',
        params:  {
        },
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
    })
    .then((response: AxiosResponse) => {
        const result: any = response.data;
        if(result){
            store.commit('setBaseURL', result.baseURL);
            store.commit('setContextPath', result.contextPath);
            store.commit('setTitle', result.title);
            store.commit('setKeywords', result.keywords);
            store.commit('setDescription', result.description);
            if(result.systemUser != null){
                store.commit('setSystemUser', result.systemUser);
            }
            store.commit('setBaseURI', result.baseURI);
            store.commit('setFileStorageSystem', result.fileStorageSystem);
            store.commit('setSupportAccessDevice', result.supportAccessDevice);
            store.commit('setWeixin_oa_appid', result.weixin_oa_appid);
            
            let languageSwitchingMap = new Map<string,string>();
            for (let code in result.languageSwitching) {
                languageSwitchingMap.set(code,result.languageSwitching[code])
            }
            store.commit('setLanguageSwitching', languageSwitchingMap);
           
            
        }

    }).catch((error: any) =>{
        console.log(error);
    });

}


let queryData = (keyword:string) =>{
   /**
    const [res] = await Promise.all([axiosInstance({
        url: '/user/control/queryUser',
        method: 'get',
        params:  {keyword:keyword},
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
        })])

        console.log("查询提及用户",res);

    return res**/

    /** 
    return axiosInstance({ 
        url: '/user/control/queryUser',
        method: 'get',
        params:  {keyword:keyword},
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
    })**/
    return new Promise((resolve, reject) => {
        axiosInstance({ 
            url: '/user/control/queryUser',
            method: 'get',
            params:  {keyword:keyword},
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        }).then((result) => {
            resolve(result);
        })
    }); 
};


/**
 * 查询提及用户
 * @param keyword 关键字
 * @param callback 回调
 */
export function queryMentionUser(keyword:string,callback: { (mentionUser: User): void; (arg0: User | undefined): void; }){
    axiosInstance({
        url: '/user/control/queryUser',
        method: 'get',
        params:  {keyword:keyword},
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
    }).then((response: AxiosResponse) => {
        const result: any = response.data;
        if(result){
            callback(result);
            return;   
        }
        callback(undefined);
    }).catch((error: any) =>{
        console.log(error);
    });
}
