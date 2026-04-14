/**
 * root层state类型定义
 */
export interface TypeRootState {
    apiUrl: string;//后端地址
    baseURL: string;//系统路径
  //  commonPath: string;//后端资源路径
    contextPath: string;//后端系统虚拟目录
  //  templateDir: string;//后端模板目录名称
    title: string;//站点名称
    keywords: string;//站点关键词
    description: string;//站点描述
    systemUser: SystemUser;//登录用户
    baseURI: string;//系统资源标识符
    fileStorageSystem: number;//文件存储系统 0.本地系统 10.SeaweedFS 20.MinIO 30.阿里云OSS
    supportAccessDevice: number,//支持访问设备 1.自动识别终端 2.电脑端 3.移动端
    weixin_oa_appid: string;//微信公众号appid

    transparentImage: string;//透明1像素图片

    topicDetailPermission:boolean,//是否有话题内容页的访问权限

    aiAssistantParameter :any,//AI助手参数

    defaultLanguage:string,//默认语言（当用户不主动切换语言时指定的默认语言。空值表示选择用户操作系统浏览器的语言为默认语言；"zh_CN"; "en_US"）
    currentLanguage:string,//当前语言
    languageSwitching: Map<string,string>,//多语言切换

    userInfoVersion: number //用户信息版本  App.vue监听本参数，当数值变化时执行刷新登录用户信息
    
}

/**
 * 登录用户
 */
export interface SystemUser {
    userId: string;//ID
    userName: string;//会员用户名
    account: string;//账号
    nickname: string;//呢称
    avatarPath: string;//头像路径
    avatarName: string;//头像名称
    openId: string;//第三方用户的唯一标识 例如微信的openid
    loginInterface: number;//登录接口 0.本地 10.微信 50.其他开放平台
}

