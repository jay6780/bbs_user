<!-- 国际区号选择 -->
<template>

    <el-select v-model="state.countryCode" style="width: 100px" class="countryCodeSelect" @change="handleSelect">
        <el-option-group v-for="(group, key) of state.firstNameData" :key="key" :label="key">
            <el-option v-for="countryCodeData of group" :key="countryCodeData.phone_code" :label="'+'+countryCodeData.phone_code" :value="countryCodeData.phone_code">
                <div>{{store.state.currentLanguage == 'zh'? countryCodeData.chinese_name+' (+'+countryCodeData.phone_code+')' : countryCodeData.english_name+' (+'+countryCodeData.phone_code+')'}}</div>
            </el-option>
        </el-option-group>
    </el-select>
</template>
              

<script setup lang="ts">
    import { onMounted, reactive,} from "vue";
    import countryCodeAndPhoneCode from '@/components/countryCode/countryCodeAndPhoneCode.json';
    import pinyin from 'js-pinyin' 

    import { appStore } from "@/store";
    
    pinyin.setOptions({checkPolyphone:false,charCase:0})

    const store = appStore();


    //传递消息给父组件
    const emit = defineEmits(['selectedCountryCode'])

    //接收父组件消息
    const props = defineProps({
        defaultCountryCode: {//默认区号
            type: String,
            default: ''
        }
    })  


    const state = reactive({
        countryCode:'',//区号

        firstNameData :{} as any,
        firstPin: ["A", "B", "C", "D", "E", "F", "G", "H","I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        
    });


    //处理选择
    const handleSelect = (value: string) => {
        //传递消息给父组件
        emit('selectedCountryCode',value);
    };
    

    const init = () => {
        state.firstPin.forEach((item)=>{
            state.firstNameData[item] = [];
            countryCodeAndPhoneCode.forEach((el)=>{
                let first = ""

                //语言
                if(store.state.currentLanguage == 'zh'){//语言 zh,en
                    first = pinyin.getFullChars(el.chinese_name).substring(0,1);
                }else{
                    first = el.english_name.substring(0,1);
                }

                if( first == item ){
                    state.firstNameData[item].push(el)
                }       
            })
        }) 

        //删除空数组
        for (const key in state.firstNameData) {
            if(state.firstNameData[key].length ==0){
                delete state.firstNameData[key];
                state.firstPin = state.firstPin.filter(item => item !== key);
            }
        }
    }


    onMounted(() => {
        init();

        state.countryCode = props.defaultCountryCode;

        //传递消息给父组件
        emit('selectedCountryCode',state.countryCode);
    }) 

</script>
<style scoped lang="scss">
//隐藏选择器分组分割线
.el-select-group__wrap:not(:last-of-type) {
     padding-bottom: 0px;
}
.el-select-group__wrap:not(:last-of-type)::after {
    height: 0px;
}


</style>