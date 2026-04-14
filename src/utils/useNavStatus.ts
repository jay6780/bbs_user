import { computed, Ref } from 'vue';
import { useRouter } from 'vue-router';

//判断ServiceNav.vue里的state.serviceNavList的第一项是否为当前URI
export function useNavStatus(serviceNavRef: Ref<any>) {
    const router = useRouter();

    const isFirstNavActive = computed(() => {
        //获取子组件暴露的 state
        const navList = serviceNavRef.value?.state?.serviceNavList;
        
        if (!navList || navList.length === 0) {
            return false;
        }

        // 拿到第一个导航项的路径列表
        const firstNavPaths = navList[0].currentItemPathList || [];
        console.log(firstNavPaths.includes(router.currentRoute.value.path)+"-----",firstNavPaths);
        // 判断当前路由 path 是否命中了第一个导航的路径
        return firstNavPaths.includes(router.currentRoute.value.path);
    });

    return {
        isFirstNavActive
    };
}