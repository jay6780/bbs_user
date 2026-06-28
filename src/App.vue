<template>
  <el-config-provider :locale="localLanguage">
    <!--html页元信息-->
    <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <!-- Changed condition: If it's authorized or forced to mobile display layout, mount views -->
    <router-view
      v-if="
        $store.state.supportAccessDevice == 1 ||
        $store.state.supportAccessDevice == 2 ||
        isMobileDevice
      "
    ></router-view>

    <div
      class="main backgroundModule"
      v-else-if="
        $store.state.supportAccessDevice != 1 &&
        $store.state.supportAccessDevice != 2 &&
        !isMobileDevice
      "
    >
      <!-- title:电脑端浏览入口已关闭  sub-title:请尝试使用手机端浏览器访问本站-->
      <el-result
        icon="error"
        :title="i18n.t('app.10')"
        :sub-title="i18n.t('app.20')"
      >
        <template #extra>
          <!-- 访问手机端网站-->
          <el-button type="primary" @click="setAccessMobile">
            {{ i18n.t("app.30") }}
          </el-button>
        </template>
      </el-result>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import {
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  watch,
  computed,
  ref,
} from "vue";
import { appStore } from "@/store";
import { ElConfigProvider } from "element-plus";

// 国际化
import language_zh_cn from "element-plus/es/locale/lang/zh-cn"; // 中文
import language_en from "element-plus/es/locale/lang/en"; // 英文
import { queryBaseInfo } from "@/utils/requestAPI";
import { useI18n } from "vue-i18n";

const store = appStore();
let i18n = useI18n();

// Real-time local verification for actual mobile layouts
const isMobileDevice = ref(false);

const checkDeviceType = () => {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileRegex =
    /android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge\ |maemo|midp|mmp|mobile.+firefox|netfront|opera\ m(ob|in)i|palm(\ os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows\ ce|xda|xiino/i;

  // Also checks cookie set by the button action
  const hasMobileCookie = document.cookie
    .split("; ")
    .some((row) => row.startsWith("accessModule=mobile"));

  isMobileDevice.value = isMobileRegex.test(userAgent) || hasMobileCookie;
};

// 获取浏览器默认语言
const getBrowserLang = () => {
  let language = navigator.language;
  if (language == "zh" || language.startsWith("zh-")) {
    return "zh";
  }
  return "en";
};

const localLanguage = computed(() => {
  let languageCode = window.localStorage.getItem("language");

  if (!languageCode) {
    const def = store.state.defaultLanguage || "";
    if (def.startsWith("zh")) {
      languageCode = "zh";
    } else if (def.startsWith("en")) {
      languageCode = "en";
    } else {
      languageCode = getBrowserLang();
    }
  }

  const isZh = languageCode.startsWith("zh");
  const lang = isZh ? "zh" : "en";

  store.state.currentLanguage = lang;
  i18n.locale.value = lang;
  document.getElementsByTagName("html")[0].lang = lang;

  return isZh ? language_zh_cn : language_en;
});

const setAccessMobile = () => {
  document.cookie = "accessModule=mobile; max-age=31536000; path=/";
  isMobileDevice.value = true;
  window.location.reload();
};

watch(
  () => store.state.userInfoVersion,
  () => {
    queryBaseInfo();
  },
);

onMounted(() => {
  checkDeviceType();
  queryBaseInfo();
});
</script>
