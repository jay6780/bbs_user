//英文
export default {
    common: {
        10: "CAPTCHA cannot be empty",//验证码不能为空
        20: "Captcha length is 4 characters",//验证码长度为4个字符
        30: "CAPTCHA error",//验证码错误
        40: "Error submitting data",//提交数据错误
        50: "Submit",//提交
        60: "Cancel",//取消
        70: "Captcha",//验证码
        80: "Change it",//换一幅
        90: "Confirm",//确定
        100: "Error",//错误
    },
    http: {
      10: "Invalid request (400)",//请求无效（400）
      20: "Error requesting a refresh token, please log in again",//请求刷新令牌出错，请重新登录
      30: "Insufficient privileges (you don't have operating privileges for the current function)",//权限不足（您没有当前功能的操作权限）
      40: "The page you tried to load could not be found (404)",//找不到您尝试加载的网页（404）
      50: "Server error (500)",//服务器错误（500）
      60: "Request error ({p1})",//请求错误
      70: "Notification",//通知
      80: "The current request is not responding, please wait for a period of time to visit again",//当前请求没有响应，请等待一段时间后再访问
    },
    markdownPlugin: {
        plugin_ai: {
            10:  "AI assistant",//AI助手
        },
        plugin_emoji: {
            10:  "Emoji",//表情
        },
        plugin_file_upload: {
            10:  "File upload",//文件上传
        },
        plugin_image_upload: {
            10:  "Image upload",//图片上传
        },
        plugin_mention: {
            10:  "Mention",//提及
        },
        plugin_toggle_editor: {
            10:  "Switch editor",//切换编辑器
        },
        plugin_video_upload: {
            10:  "Video upload",//视频上传
        },
        plugin_hide_content: {
            10:  "Enter your password to be visible",//输入密码可见
            20:  "Please fill in the password",//请填写密码
            30:  "Fill in the hidden content here, there must be a blank line inside and outside the 'hide' tag",//此处填写隐藏内容, hide标签内外必须空一行
            40:  "Reply topic visible",//回复话题可见
            50:  "Visible when you reach the level",//达到等级可见
            60:  "(Please fill in the level points)",//(请填写等级积分)
            70:  "(Please fill in the grade name)",//(请填写等级名称)
            80:  "Points Purchase Visible",//积分购买可见
            90:  "(Please fill in the points)",//(请填写积分)
            100:  "Balance Purchase Visible",//余额购买可见
            110:  "(Please fill in the price)",//请填写价格
            120:  "Hide content",//隐藏内容
        },
        plugin_help: {
            10:  "Expanded Tabs",//扩展标签
            20:  "Hidden content -- enter your password to see it",//隐藏内容 -- 输入密码可见
            30:  "Password",//密码
            40:  "Hidden content - visible by replying to the topic",//隐藏内容 -- 回复话题可见
            50:  "Hidden content - visible at level",//隐藏内容 -- 达到等级可见
            60:  "Grade Points",//等级积分
            70:  "Grade Name",//等级名称
            80:  "Optional Grades",//可选等级
            90:  "Hidden Content -- Visible with Points Purchase",//隐藏内容 -- 积分购买可见
            100:  "Points",//积分
            110:  "Hidden content - visible for balance purchases",//隐藏内容 -- 余额购买可见
            120:  "Prices",//价格
            130:  "Video Upload",//视频上传
            140:  "Embedded video",//嵌入视频
            150:  "Video address",//视频地址
            160:  "File Upload",//文件上传
            170:  "Mention",//提及
            180:  "User account or nickname",//@用户账号或呢称
            190:  "Text Color",//文字颜色
            200:  "Green",//绿色
            210:  "Line Break",//换行
        },
    },
    markdownEditor:{
        10:  "Notifications",//通知
        20:  "Uploading",//上传中
    },
    app:{
        10:  "Computer browsing portal is closed",//电脑端浏览入口已关闭
        20:  "Please try using your mobile browser to access this site",//请尝试使用手机端浏览器访问本站
        30:  "Visit the mobile site",//访问手机端网站
    },
    aiChatImageView:{
        10: "Zoom",//放大
        20: "Copy",//复制
        30: "Insert",//插入
        40: "Copy successfully",//复制成功
        50: "Unable to write to clipboard",//无法写入剪贴板
    },
    footer:{
        10:  "All rights reserved",//版权所有
        20:  "Contact Us",//联系我们
    },
    header:{
        10: "Sign up",//注册
        20: "Sign in",//登录
        30: "Search",//搜索
        40: "Private Message",//私信
        50: "Remind",//提醒
        60: "System notification",//系统通知
        70: "User center",//用户中心
        80: "Change Avatar",//更换头像
        90: "Log out",//退出
    },
    aiAssistantDialog:{
        10: "AI assistant",//AI助手
        20: "What I want to ask is...",//我想提问的内容...
        30: "Ask questions",//提问
        40: "You do not have permission to use this feature",//您没有本功能的使用权限
        50: "Question content cannot be empty",//提问内容不能为空
        60: "Status code",//状态码
        70: "Error code",//错误码
        80: "Error message",//错误信息
        90: "Error",//错误
        100: "Copy",//复制
        110: "Press Ctrl+C to copy",//按Ctrl+C复制
        120: "Copy successfully",//复制成功
        130: "Insert",//插入
        140: "Insert Error",//插入错误
        150: "Inserted!",//已插入!
    },
    pagination:{
        10: "Total {p1}",//共 {p1} 条
        20: "Go to",//前往
        30: "",
    },
    serviceNav:{
        10: "Dynamic",//动态
        20: "Topic",//话题
        30: "Comment",//评论
        40: "Reply to comment",//评论回复
        50: "Question",//问题
        60: "Answer",//答案
        70: "Answer reply",//答案回复
        80: "Favorites",//收藏夹
        90: "Like",//点赞
        100: "Follow",//关注
        110: "Follower",//粉丝
        120: "Private Message",//私信
        130: "Remind",//提醒
        140: "System Notifications",//系统通知
        150: "Membership card order",//会员卡订单
        160: "Balance",//余额
        170: "Send red envelopes",//发红包
        180: "Receive red envelopes",//收红包
        190: "Modify personal information",//修改个人资料
        200: "Real-name authentication",//实名认证
        210: "Report",//举报
        220: "Points Log",//积分日志
        230: "Login Log",//登录日志
        240: "More",//更多
    },
    updateAvatar:{
        10: "Original image",//原图
        20: "Select Image",//选择图片
        30: "Upload",//上传
        40: "Please select image",//请选择图片
        50: "Uploaded avatar successfully",//上传头像成功
    },
    addQuestion:{
        10:  "Title",//标题
        20:  "Selected quantity / Selectable quantity",//已选择数量 / 可选择数量
        30:  "Reward amount",//悬赏金额
        40:  "The bounty amount cannot be less than {p1} RMB;",//悬赏金额不能少于 {p1} 元；
        50:  "The bounty amount cannot be more than {p1} RMB;",//悬赏金额不能超过 {p1} 元；
        60:  "The total amount of users is {p1} RMB",//用户共有金额 {p1} 元
        70:  "reward point",//悬赏积分
        80:  "Reward points cannot be less than {p1};",//悬赏积分不能少于 {p1}；
        90:  "Reward points cannot exceed {p1};",//悬赏积分不能超过 {p1}；
        100:  "Total user points {p1}",//用户共有积分 {p1}
        110:  "Please enter content...",//请输入内容...
        150:  "Ask a question function has been closed",//提问题功能已关闭
        160:  "Select Tag",//选择标签
        170:  "Select User",//选择用户
        180:  "User account or nickname",//用户账号或呢称
        190:  "Search",//搜索
        200:  "Raise a question",//提问题
        210:  "Add Tags",//添加标签
        220:  "Please enter your user ID or nickname",//请输入用户账号或呢称
        230:  "The current user does not exist",//当前用户不存在
        240:  "The maximum number of tags allowed to be selected has been exceeded",//已超过允许选择的最大标签数量
        250:  "Please select a tag",//请选择标签
        260:  "Title cannot be empty",//标题不能为空
        270:  "Account number between 1 and 90 characters",//账号在 1 至 90个字符之间
        280:  "Submit successfully, automatically jump to the Q&A page after 3 seconds",//提交成功，3秒后自动跳转到问答页
    },
    addTopic:{
        10:  "No tags yet",//还没有标签
        20:  "Select Tags",//选择标签
        30:  "Title",//标题
        40:  "Red envelope",//红包
        50:  "Random amount red envelope",//随机金额红包
        60:  "Fixed amount red envelope",//固定金额红包
        70:  "The total amount of red envelopes is {p1} RMB",//红包总金额{p1}元
        80:  "Enter amount",//输入金额
        90:  "The total amount cannot be less than {p1} RMB;",//合计总金额不能少于 {p1} 元；
        100:  "The total amount cannot exceed {p1} RMB;",//合计总金额不能超过 {p1} 元；
        110:  "The total amount of users is {p1} RMB",//用户共有金额 {p1} 元
        120:  "Single red envelope amount of {p1} RMB",//单个红包金额 {p1} 元
        160:  "The topic posting function is closed",//发表话题功能已关闭
        170:  "Input quantity",//输入数量
        180:  "{p1} red envelopes",//{p1} 个红包
        190:  "Total amount",//合计总金额
        200:  "Please enter content...",//请输入内容...
        210:  "Select User",//选择用户
        220:  "User account or nickname",//用户账号或呢称
        230:  "Search",//搜索
        240:  "Post Topic",//发表话题
        250:  "Please enter your user ID or nickname",//请输入用户账号或呢称
        260:  "The current user does not exist",//当前用户不存在
        270:  "Submit successfully, automatically jump to the homepage after 3 seconds",//提交成功，3秒后自动跳转到首页
        280:  "Initiate a vote",//发起投票
        290:  "The voting option cannot exceed the {p1} item",//投票选项不能超过 {p1} 项
        300:  "Voting title",//投票标题
        310:  "Voting type",//投票类型
        320:  "Single choice",//单选
        330:  "Multiple choices",//多选
        340:  "Voting deadline",//投票截止时间
        350:  "Select a time",//选择时间
        360:  "Null value means no deadline",//空值表示没有截止时间
        370:  "Voting options",//投票选项
        380:  "Move up",//上移
        390:  "Move down",//下移
        400:  "Delete",//删除
        410:  "Add voting options",//增加投票选项
    },
    askList:{
        10:  "All",//全部
        20:  "Latest",//最新
        30:  "Unresolved",//未解决
        40:  "Resolved",//已解决
        50:  "Points Reward",//积分悬赏
        60:  "Cash Reward",//现金悬赏
        70:  "Ask a question",//提问题
        80:  "Deregistered",//已注销
        90:  "Official personnel",//官方人员
        100:  "Question Time",//提问时间
        110:  "Reward amount {p1} RMB",//悬赏金额{p1}元
        120:  "Reward {p1}Points",//悬赏 {p1}积分
        130:  "Reward Amount {p1} RMB {p2} Points",//悬赏金额{p1}元 {p2}积分
        140:  "",
        150:  "This user account has been canceled",//此用户账号已注销
        160:  "Solve",//解决
        170:  "Answer",//回答
        180:  "Browse",//浏览
        190:  "Question and answer",//问答
        200: "Pinned",//置顶
        210: "Vote",//投票
    },
    editTopic:{
        10:  "Title",//标题
        20:  "Please enter content...",//请输入内容...
        30:  "Select User",//选择用户
        40:  "user account or nickname",//用户账号或呢称
        50:  "Search",//搜索
        60:  "Modifying topics is not allowed",//不允许修改话题
        70:  "Return",//返回
        80:  "Modify Topic",//修改话题
        90:  "Please enter your user account or nickname",//请输入用户账号或呢称
        100:  "The current user does not exist",//当前用户不存在
        110:  "Submit successfully, automatically jump to the topic content page after 3 seconds",//提交成功，3秒后自动跳转到话题内容页
        120:  "Initiate a vote",//发起投票
        130:  "The voting option cannot exceed the {p1} item",//投票选项不能超过 {p1} 项
        140:  "Voting title",//投票标题
        150:  "Voting type",//投票类型
        160:  "Single choice",//单选
        170:  "Multiple choices",//多选
        180:  "Voting deadline",//投票截止时间
        190:  "Select a time",//选择时间
        200:  "Null value means no deadline",//空值表示没有截止时间
        210:  "Voting options",//投票选项
        220:  "Move up",//上移
        230:  "Move down",//下移
        240:  "Delete",//删除
        250:  "Add voting options",//增加投票选项
    }, 
    feedback:{
        10:  "Online Message",//在线留言
        20:  "Name",//称呼
        30:  "Please enter a name",//请输入称呼
        40:  "Contact Details",//联系方式
        50:  "Please enter your contact details",//请输入联系方式
        60:  "Content",//内容
        70:  "Online message function is closed",//在线留言功能已关闭
        90:  "The name cannot be empty",//称呼不能为空
        100:  "The name is between 1 and 30 characters",//称呼在 1 至 30个字符之间
        110:  "Contact details cannot be empty",//联系方式不能为空
        120:  "Content cannot be empty",//内容不能为空
        130:  "The name is between 1 and 1000 characters",//称呼在 1 至 1000个字符之间
        140:  "Leave a message successfully and automatically jump to the homepage after 3 seconds.",//留言成功，3秒后自动跳转到首页
    },
    forgotPassword_step1:{
        10:  "Account Password Recovery",//账号密码找回
        20:  "Account",//账号
        30:  "Cell Phone Number Recovery",//手机号找回
        40:  "Phone number",//手机号
        50:  "Recover your password",//找回密码
        60:  "SMS verification code cannot be empty",//短信验证码不能为空
        70:  "Captcha length is 6 characters",//验证码长度为6个字符
        80:  "The account number cannot be empty",//账号不能为空
        90:  "Account number between 3 and 25 characters",//账号在 3 至 25个字符之间
        100:  "Cell phone number cannot be empty",//手机号不能为空
        110:  "Incorrect length of cell phone number",//手机号码长度不正确
        120:  "Email Retrieval",//邮箱找回
        130:  "Email",//邮箱
        140:  "Disable this function",//已关闭此功能
        150:  "Email address cannot be empty",//邮箱不能为空
        160:  "Email address between 5 and 90 characters",//邮箱在 5 至 90个字符之间
    },
    forgotPassword_step2:{
        10:  "Verify password prompt answer",//校验密码提示答案
        20:  "Account",//账号
        30:  "Password reminder question",//密码提示问题
        40:  "Password hint answer",//密码提示答案
        50:  "New Password",//新密码
        60:  "Please enter your password",//请输入密码
        70:  "Confirm Password",//确认密码
        80:  "Please enter the answer to the password",//请输入密码提示答案
        90:  "Verify cell phone numbers",//校验手机号码
        100:  "Cell phone number",//手机号
        110:  "SMS verification code",//短信验证码
        120:  "Get verification code",//获取验证码
        130:  "Retrieve password Step 2",//找回密码 第二步
        140:  "SMS verification code has been sent",//短信验证码已发送
        150:  "Retrievable after {p1} seconds",//{p1} 秒没收到后可重新获取
        160:  "SMS verification code cannot be empty",//短信验证码不能为空
        170:  "Captcha length is 6 characters",//验证码长度为6个字符
        180:  "Password cannot be empty",//密码不能为空
        190:  "Password length cannot be less than 7 characters",//密码长度不能小于7个字符
        200:  "Two passwords are not equal",//两次输入密码不相等
        210:  "User name cannot be empty",//用户名不能为空
        220:  "Password hint answer cannot be empty",//密码提示答案不能为空
        230:  "The answer to the password hint cannot be less than 7 characters",//密码提示答案不能小于7个字符
        260:  "Cell phone number cannot be empty",//手机号不能为空
        270:  "Submit successfully, automatically jump to the login page after 3 seconds",//提交成功，3秒后自动跳转到登录页
        280:  "Verify email",//校验邮箱
        290:  "Email",//邮箱
        300:  "Email verification code",//邮箱验证码
        310:  "Email verification code has been sent",//邮箱验证码已发送
        320:  "Email address cannot be empty",//邮箱不能为空
        330:  "Email verification code cannot be empty",//邮箱验证码不能为空
        340:  "Get email verification code",//获取邮箱验证码
    },
    help:{
        10: "Help Center",//帮助中心
    },
    helpDetail:{
        10: "No relevant records found",//没有找到相关记录
        20:  "Copy",//复制
        30:  "Press Ctrl+C to copy",//按Ctrl+C复制
        40:  "Copy successfully",//复制成功
        50:  "The video is being processed. Please refresh it later.",//视频处理中，请稍后再刷新
    },
    index:{
        10: "All",//全部
        20: "Deregistered",//已注销
        30: "Official personnel",//官方人员
        40: "This user account has been canceled",//此用户账号已注销
        50: "Enter password to be visible",//输入密码可见
        60: "Comment topic visible",//评论话题可见
        70: "Visible when reaching the level",//达到等级可见
        80: "Points Purchase Visible",//积分购买可见
        90: "Balance Purchase Visible",//余额购买可见
        100: "Essence",//精华
        110: "Pinned",//置顶
        120: "Red envelope",//红包
        130: "Post a topic",//发话题
        140: "Hot Topics",//热门话题
        150: "Browse",//浏览
        160: "Comment",//评论
        170: "Friendly Link",//友情链接
        180: "The video is being processed. Please refresh it later.",//视频处理中，请稍后再刷新
        190: "New",//最新
        200: "Vote",//投票
    },
    login:{
        10: "Sign in",//登录
        20: "Account Password Login",//账号密码登录
        30: "Account",//账号
        40: "Password",//密码
        50: "Cell phone number login",//手机号登录
        60: "Phone number",//手机号
        70: "Retrieve password？",//找回密码？
        80: "Other Login Methods",//其他登录方式
        90: "The account number cannot be empty",//账号不能为空
        100: "Account number between 3 and 25 characters",//账号在 3 至 25个字符之间
        110: "Password cannot be empty",//密码不能为空
        120: "Password length cannot be less than 7 characters",//密码长度不能小于7个字符
        130: "Cell phone number cannot be empty",//手机号不能为空
        140: "Incorrect length of cell phone number",//手机号码长度不正确
        150: "Email Login",//邮箱登录
        160: "Email",//邮箱
        170: "Please enter your email address",//请输入邮箱
        180: "Email address cannot be empty",//邮箱不能为空
        190: "Incorrect email length",//邮箱长度不正确
        200: "Login is closed",//已关闭登录
    },
    loginRedirect:{
        10: "Third-party redirection login",//第三方重定向登录
        20: "Redirecting...",//正在跳转...
        30: "The content of the 'userAuthorization' attribute is empty",//userAuthorization属性内容为空
    },
    membershipCard:{
        10: "{p1} RMB",//{p1} 元
        20: "{p1} Point",//{p1} 积分
        30: "Original price {p1} RMB",//原价 ￥{p1} 元
        40: "Buy Now",//立即购买
        50: "Details",//详情
        60: "No membership card information found",//没有找到会员卡信息
        70: "Membership card",//会员卡
        80: "Copy",//复制
        90: "Press Ctrl+C to copy",//按Ctrl+C复制
        100: "Copy successfully",//复制成功
        110: "Sure you want to buy?",//确定购买?
        120: "Purchase of Membership Card Successful",//购买会员卡成功
    },
    membershipCardList:{
        10: "Membership packages for you to choose",//会员套餐任你选
        20: "from {p1} RMB",//{p1} 元起
        30: "{p1} Points up",//{p1} 积分起
        40: "View Details",//查看详情
        50: "Membership Card List",//会员卡列表
    },
    paymentCompleted:{
        10: "Payment completed",//支付完成
        20: "For detailed information, please go to the Balance module in the User Center.",//明细信息请到用户中心的余额模块查看
    },
    question:{
        10: "Report",//举报
        20: "Additional questions",//追加提问
        30: "Please enter content",//请输入内容...
        40: "{p1} Times read",//{p1} 次阅读
        50: "{p1} Answers",//{p1} 个回答
        60: "Reward amount {p1} RMB",//悬赏金额{p1}元
        70: "Reward {p1}points",//悬赏 {p1}积分
        80: "Reward Amount {p1} RMB {p2} Points",//悬赏金额{p1}元{p2}积分
        90: "This user account has been canceled",//此用户账号已注销
        100: "Article {p1} Postscript",//第{p1}条附言
        110: "Bookmarked",//已收藏
        120: "Favorite",//收藏
        130: "Liked",//已赞
        140: "Like",//赞
        160: "Let me say a few words and share my answer",//我来说两句，分享我的答案
        170: "Answers are closed",//回答已关闭
        180: "Please {p1} to answer. Don't have an account? {p2} for one.",//请{p1}后回答。没有帐号？{p2}一个。          (p1自动填充‘登录’；p2自动填充‘注册’)
        190: "log in",//登录
        200: "Register",//注册
        210: "Answers to this question are closed",//本问题回答已关闭
        220: "Deregistered",//已注销
        230: "Official personnel",//官方人员
        240: "Author",//作者
        250: "Best",//最佳(最佳答案)
        260: "Reply",//回复
        270: "Edit",//编辑
        280: "Delete",//删除
        290: "Adoption",//采纳
        300: "Please fill in the reason for reporting",//请填写举报理由
        310: "Select User",//选择用户
        320: "user account or nickname",//用户账号或呢称
        330: "Search",//搜索
        340: "Answer",//回答
        350: "Follower",//粉丝
        360: "Follow",//关注
        370: "Direct Message",//发私信
        380: "Related Questions",//相关问题
        390: "Directory",//目录
        400: "Please enter your user ID or nickname",//请输入用户账号或呢称
        410: "The current user does not exist",//当前用户不存在
        420: "Copy",//复制
        430: "Press Ctrl+C to copy",//按Ctrl+C复制
        440: "Copy successfully",//复制成功
        445: "Please log in before adding to favorites",//请先登录再加入收藏
        450: "Add to Favorites Successfully",//加入收藏成功
        460: "Cancel Favorites Successfully",//取消收藏成功
        470: "Please log in before liking",//请先登录再点赞
        480: "Like successfully",//点赞成功
        490: "Delete like successfully",//删除点赞成功
        500: "No additional questions allowed",//不允许追加提问
        510: "Submitted successfully",//提交成功
        520: "Are you sure you want to adopt the answer?",//确定采纳答案?
        530: "Adoption of current answer successful",//采纳当前答案成功
        540: "No modification of answers allowed",//不允许修改答案
        550: "Sure you want to delete the answer?",//确定删除答案?
        560: "Deleted successfully",//删除成功
        570: "Maximum number of images allowed to be uploaded has been reached",//已达到最大图片允许上传数量
        580: "The report category is not open.",//举报分类没开启
        590: "The reporting function has been disabled",//举报功能已关闭
        600: "Not allowed to add replies",//不允许添加回复
        610: "Not allowed to modify reply",//不允许修改回复
        620: "Are you sure you want to delete this reply?",//确定删除回复?
        630: "Already followed",//已关注
        640: "Click to shrink",//点击收缩
        650: "{p1} remaining",//剩余{p1}条
        660: "Answer",//答案
        670: "Like",//点赞
        680: "Pinned",//置顶
        690: "Voting successfully",//投票成功
        700:  "{p1} ticket",//{p1} 票
        710:  "Single choice",//单选
        720:  "Multiple choices",//多选
        730:  "Voting has not started",//投票未开始
        740:  "{p1} Voting ends",//{p1} 截止投票
        750:  "Voting in progress",//投票进行中
        760:  "Voting ended",//投票已结束
        770:  "Total {p1} tickets",//共 {p1} 票
    },
    register:{
        10: "Account Password Registration",//账号密码注册
        20: "Account",//账号
        30: "Please enter your account number",//请输入账号
        40: "Password",//密码
        50: "Please enter your password",//请输入密码
        60: "Confirm Password",//确认密码
        70: "Password reminder question",//密码提示问题
        80: "Please enter the password prompt question",//请输入密码提示问题
        90: "Password hint answer",//密码提示答案
        100: "Please enter the password hint answer",//请输入密码提示答案
        110: "Email",//邮箱
        120: "You can leave it blank if you don't have it.",//没有可以不填写
        130: "Please select",//请选择
        140: "terms of service",//服务条款
        150: "I have read the 《{p1}》 and accept the terms thereof",//我已阅读《{p1}》并接受其中条款
        160: "User Service Agreement",//用户服务协议
        170: "Cell phone number registration",//手机号注册
        180: "Cell phone number",//手机号
        190: "Please enter your cell phone number",//请输入手机号
        200: "SMS verification code",//短信验证码
        210: "Get verification code",//获取验证码
        220: "Closed Registration",//已关闭注册
        230: "Sign up",//注册
        240: "SMS verification code has been sent",//短信验证码已发送
        250: "Retrievable after {p1} seconds",//{p1} 秒没收到后可重新获取
        260: "SMS verification code cannot be empty",//短信验证码不能为空
        270: "Captcha length is 6 characters",//验证码长度为6个字符
        280: "Password cannot be empty",//密码不能为空
        290: "Password length cannot be less than 7 characters",//密码长度不能小于7个字符
        300: "Two passwords are not equal",//两次输入密码不相等
        310: "Agree to the Terms of Service to register",//同意服务条款才能注册
        320: "The account number cannot be empty",//账号不能为空
        330: "Account number between 3 and 25 characters",//账号在 3 至 25个字符之间
        340: "Password reminder question can't be empty",//密码提示问题不能为空
        350: "Password reminder questions can't be smaller than 7 characters",//密码提示问题不能小于7个字符
        360: "The answer to the password prompt cannot be empty",//密码提示答案不能为空
        370: "The answer to the password hint cannot be less than 7 characters",//密码提示答案不能小于7个字符
        380: "Cell phone number cannot be empty",//手机号不能为空
        390: "Incorrect length of cell phone number",//手机号码长度不正确
        400: "Yes",//是
        410: "No",//否
        420: "Email registration",//邮箱注册
        430: "Please enter your email address",//请输入邮箱
        450: "Email verification code",//邮箱验证码
        460: "Email verification code has been sent",//邮箱验证码已发送
        470: "Email address cannot be empty",//邮箱不能为空
        480: "Incorrect email length",//邮箱长度不正确
        490: "Get email verification code",//获取邮箱验证码
    },
    search:{
        10: "Topic",//话题
        20: "Deregistered",//已注销
        30: "Official personnel",//官方人员
        40: "Post time",//发表时间
        50: "Latest reply",//最新回复
        60: "Essence",//精华
        70: "Pinned",//置顶
        80: "Question",//问题
        90: "No relevant records found",//没有找到相关记录
        100: "Suggest trying other keywords",//建议尝试其他关键字
        110: "Search",//搜索
    },
    termsService:{
        10: "Terms of service",//服务条款
        20: "Copy",//复制
        30: "Press Ctrl+C to copy",//按Ctrl+C复制
        40: "Copy successfully",//复制成功
    },
    thread:{
        10: "You do not have access to this topic",//您没有本话题的访问权限
        20: "Report",//举报
        40: "Essence",//精华
        50: "Pinned",//置顶
        60: "{p1} Times read",//{p1} 次阅读
        70: "{p1} Comments",//{p1} 个评论
        80: "Last modified time",//最后修改时间
        90: "This user account has been canceled",//此用户账号已注销
        100: "Bookmarked",//已收藏
        110: "Favorite",//收藏
        120: "Liked",//已赞
        130: "Like",//赞
        140: "Deregistered",//已注销
        150: "Official personnel",//官方人员
        160: "Author",//作者
        170: "Reply",//回复
        180: "Edit",//编辑
        190: "Delete",//删除
        200: "Please enter content...",//请输入内容...
        210: "Quote",//引用
        220: "Let me say a few words and post my comments",//我来说两句，发表我的评论
        230: "Comments are closed",//评论已关闭
        240: "Please {p1} to answer. Don't have an account? {p2} for one.",//请{p1}后回答。没有帐号？{p2}一个。          (p1自动填充‘登录’；p2自动填充‘注册’)
        250: "log in",//登录
        260: "Register",//注册
        270: "Comments are closed for this topic",//本话题评论已关闭
        280: "Please fill in the reason for reporting",//请填写举报理由
        290: "Select User",//选择用户
        300: "User account or nickname",//用户账号或呢称
        310: "Search",//搜索
        320: "Answer",//回答
        330: "Follower",//粉丝
        340: "Follow",//关注
        350: "Direct Message",//发私信
        360: "Give everyone a red packet",//给大家发个红包
        370: "Demolished",//已拆
        380: "Open",//开
        400: "You're too late, the red packets have been snatched up",//您来晚了，红包已被抢光
        410: "Get {p1} RMB",//获得 {p1} 元
        420: "More",//更多
        430: "Related topics",//相关话题
        440: "Directory",//目录
        450: "Please enter your user account or nickname",//请输入用户账号或呢称
        460: "The current user does not exist",//当前用户不存在
        470: "Password cannot be empty",//密码不能为空
        480: "Sure it's unlocked?",//确定解锁?
        490: "Topic unlocked successfully",//话题解锁成功
        500: "Commentary by {p1}：",//{p1} 的评论
        510: "The video is being processed. Please refresh it later.",//视频处理中，请稍后再刷新
        520: "This content is hidden, enter your password to see it",//此处内容已被隐藏，输入密码可见
        530: "Password",//密码
        540: "This content is hidden and visible in the comment thread",//此处内容已被隐藏，评论话题可见
        550: "This content has been hidden and is visible at level ‘{p1}’",//此处内容已被隐藏，等级达到‘{p1}’可见
        560: "This content has been hidden, pay {p1} points to see it",//此处内容已被隐藏，支付{p1}积分可见
        570: "Buy Now",//立即购买
        580: "The content here has been hidden, pay {p1} RMB to see it",//此处内容已被隐藏，支付 ￥{p1} 元可见
        590: "Copy",//复制
        600: "Press Ctrl+C to copy",//按Ctrl+C复制
        610: "Copy successfully",//复制成功
        620: "Please log in before adding to favorites",//请先登录再加入收藏
        630: "Add to Favorites Successfully",//加入收藏成功
        640: "Cancel Favorites Successfully",//取消收藏成功
        650: "Please log in before liking",//请先登录再点赞
        660: "Like Successfully",//点赞成功
        670: "Cancel Likes Successfully",//取消点赞成功
        680: "Submitted successfully",//提交成功
        690: "Modification of comments is not allowed",//不允许修改评论
        700: "Quoting comments is not allowed",//不允许引用评论
        710: "Sure about deleting comments?",//确定删除评论?
        720: "Deleted successfully",//删除成功
        730: "Maximum number of images allowed to be uploaded has been reached",//已达到最大图片允许上传数量
        740: "The report category is not open.",//举报分类没开启
        750: "The report function is disabled",//举报功能已关闭
        760: "Add replies is not allowed",//不允许添加回复
        770: "Moderation of replies is not allowed",//不允许修改回复
        780: "Are you sure you want to delete the reply?",//确定删除回复?
        790: "Followed",//已关注
        800: "Get {p1} RMB red envelope",//抢到 {p1} 元红包
        810: "Click to shrink",//点击收缩
        820: "{p1} remaining",//剩余{p1}条
        830: "Comment",//评论
        840: "Like",//点赞
        850: "Voting successfully",//投票成功
        860:  "{p1} ticket",//{p1} 票
        870:  "Single choice",//单选
        880:  "Multiple choices",//多选
        890:  "Voting has not started",//投票未开始
        900:  "{p1} Voting ends",//{p1} 截止投票
        910:  "Voting in progress",//投票进行中
        920:  "Voting ended",//投票已结束
        930:  "Total {p1} tickets",//共 {p1} 票
    },
    answerList:{
        10: "Answer",//答案
        20: "Questions answered",//回答的问题
        30: "No data available",//暂无数据
        40: "My answer",//我的答案
        50: "Post time",//发表时间
    },
    answerReplyList:{
        10: "Reply",//回复
        20: "Reply to question",//回复的问题
        30: "Post time",//发表时间
        40: "No data available",//暂无数据
        50: "My Answer Response",//我的答案回复
    },
    balance:{
        10: "Balance",//余额
        20: "Recharge",//充值
        30: "Payment serial number",//支付流水号
        40: "Amount",//金额
        50: "Module",//模块
        60: "Membership Card Order Payment",//会员卡订单支付
        70: "Balance Purchase Topic Hidden Content",//余额购买话题隐藏内容
        80: "Unlock topic hidden content split",//解锁话题隐藏内容分成
        90: "Reward amount",//悬赏金额
        100: "Accept the answer",//采纳答案
        110: "Adjust the bounty",//调整赏金
        120: "Topic to send red envelopes",//话题发红包
        130: "Topic to receive red envelopes",//话题收红包
        140: "Topic to return red envelopes",//话题返还红包
        150: "Time",//时间
        160: "Remark",//备注
        170: "No data available",//暂无数据
    },
    commentList:{
        10: "Comment",//评论
        20: "Topics for comment",//评论的话题
        30: "Post time",//发表时间
        40: "No data available",//暂无数据
        50: "My Comments",//我的评论
    },
    editUser:{
        10: "Change Avatar",//更换头像
        20: "Account",//账号
        30: "Nickname",//呢称
        40: "Leave it blank if you don't want to set it",//不设置请留空
        50: "Role",//角色
        60: "{p1} expiration",//{p1} 到期
        70: "Old password",//旧密码
        80: "Please enter the old password",//请输入旧密码
        90: "Leave it blank if you don't want to change it",//不修改请留空
        100: "New password",//新密码
        110: "Please enter a new password",//请输入新密码
        120: "Confirm new password",//确认新密码
        130: "Allow display of user dynamics",//允许显示用户动态
        140: "Show",//显示
        150: "Close",//关闭
        160: "Modify personal information",//修改个人资料
        170: "Password cannot be empty",//密码不能为空
        180: "Password length cannot be less than 7 characters",//密码长度不能小于7个字符
        190: "Old password cannot be empty",//旧密码不能为空
        200: "Two passwords are not equal",//两次输入密码不相等
        210: "Submitted successfully",//提交成功
        220: "Please select",//请选择
    },
    favoriteList:{
        10: "Title",//标题
        20: "Module",//模块
        30: "Topic",//话题
        40: "Question",//问题
        50: "Favorite time",//收藏时间
        60: "Operator",//操作
        70: "Delete",//删除
        80: "No data available",//暂无数据
        90: "Favorites",//收藏夹
        100: "Deleted successfully",//删除成功
    },
    followerList:{
        10: "User",//用户
        20: "This user account has been canceled",//此用户账号已注销
        30: "Focus on time",//关注时间
        40: "No data available",//暂无数据
        50: "Follower",//粉丝
    },
    followList:{
        10: "User",//用户
        20: "This user account has been canceled",//此用户账号已注销
        30: "Follow time",//关注时间
        40: "Operate",//操作
        50: "Delete",//删除
        60: "No data available",//暂无数据
        70: "Follow",//关注
        80: "Deleted successfully",//删除成功
    },
    giveRedEnvelopeList:{
        10: "Type",//类型
        20: "Personal targeted red envelope",//个人定向红包
        30: "Public random red envelope",//公共随机红包
        40: "Public fixed amount red envelope",//公共定额红包
        50: "Total amount",//总金额
        60: "After stopping receiving the red envelope, the amount will be returned {p1} RMB",//中止领取红包后返还金额￥{p1}
        70: "Issue quantity",//发放数量
        80: "Received quantity",//已领取数量
        90: "Topic",//话题
        100: "Time",//时间
        110: "Operate",//操作
        120: "View Amount Distribution",//查看金额分配
        130: "No data available",//暂无数据
        140: "Red envelope list",//发红包列表
    },
    home:{
        10: "User information does not exist or has been hidden",//用户信息不存在或已隐藏
        20: "Point",//积分
        30: "Follower",//粉丝
        40: "Nickname",//呢称
        50: "Official personnel",//官方人员
        60: "Direct Message",//发私信
        70: "My Dynamics",//我的动态
        80: "My topic",//我的话题
        90: "My Comments",//我的评论
        100: "My reply",//我的回复
        110: "My question",//我的问题
        120: "My answer",//我的答案
        130: "My answer reply",//我的答案回复
        140: "Favorites",//收藏夹
        150: "Like",//点赞
        160: "Follow",//关注
        180: "Private Message",//私信
        190: "Remind",//提醒
        200: "System Notifications",//系统通知
        210: "Membership Card Orders",//会员卡订单
        220: "Balance",//余额
        230: "Send red envelopes",//发红包
        240: "Receive red envelopes",//收红包
        250: "Modify personal information",//修改个人资料
        260: "Real-name authentication",//实名认证
        270: "Report",//举报
        280: "Points Log",//积分日志
        290: "Login Log",//登录日志
        300: "Posted a topic",//发表了话题
        310: "Commented on the topic",//评论了话题
        320: "Quoted Comment",//引用了评论
        330: "Replied to the topic",//回复了话题
        340: "Submitted a question",//提交了问题
        350: "Answered the question",//回答了问题
        360: "Replied to the question",//回复了问题
        370: "Read More",//展开阅读
        380: "Close",//收起
        390: "View Original Article",//查看原文
        400: "{p1} Times read",//{p1} 次阅读
        410: "{p1} Comments",//{p1} 个评论
        420: "{p1} Favorites",//{p1}人收藏
        430: "{p1} Likes",//{p1}人赞
        440: "User Center",//用户中心
        460: "Already followed",//已关注
        470:  "Password cannot be empty",//密码不能为空
        480: "Are you sure you want to unlock?",//确定解锁?
        490: "Topic unlocked successfully",//话题解锁成功
        500: "The content here has been hidden, enter the password to see it",//此处内容已被隐藏，输入密码可见
        510: "Password",//密码
        520: "Submit",//提交
        530: "This content is hidden and visible in the comment thread",//此处内容已被隐藏，评论话题可见
        540: "This content has been hidden and is visible at level ‘{p1}’",//此处内容已被隐藏，等级达到‘{p1}’可见
        550: "This content has been hidden, pay {p1} points to see it",//此处内容已被隐藏，支付{p1}积分可见
        560: "The content here has been hidden, pay {p1} RMB to see it",//此处内容已被隐藏，支付 ￥{p1} 元可见
        570: "Buy Now",//立即购买
        580: "Copy",//复制
        590: "Press Ctrl+C to copy",//按Ctrl+C复制
        600: "Copy successfully",//复制成功
        610: "The video is being processed. Please refresh it later.",//视频处理中，请稍后再刷新
        620: "{p1} answers",//{p1}个答案
    },
    likeList:{
        10: "Title",//标题
        20: "Summary",//摘要
        30: "Modules",//模块
        40: "Topic",//话题
        50: "Comment",//评论
        60: "Reply to comment",//评论回复
        70: "Question",//问题
        80: "Answer",//答案
        90: "Reply to the answer",//答案回复
        100: "Operation",//操作
        110: "Delete",//删除
        120: "No data available",//暂无数据
        130: "Like",//点赞
        140: "Deleted successfully",//删除成功
        150: "Like time",//点赞时间
    },
    membershipCardOrderList:{
        10: "Order Number",//订单号
        20: "Creation time",//创建时间
        30: "Amount paid",//已支付金额
        40: "Points Paid",//已支付积分
        50: "Role Name",//角色名称
        60: "Specification name",//规格名称
        70: "Quantity",//数量
        80: "Duration",//时长
        90: "Hour",//小时
        100: "Day",//日
        110: "Moon",//月
        120: "Year",//年
        130: "No data available",//暂无数据
        140: "Membership card order",//会员卡订单
    },
    payment:{
        10: "All Payment Methods",//全部支付方式
        20: "Recharge",//充值
        30: "Please fill in the amount to be recharged",//请填写要充值的金额
        40: "Payment",//付款
        50: "The recharge amount cannot be empty",//充值金额不能为空
        60: "Cannot exceed 12 digits",//不能超过12位数字
    },
    phoneBinding:{
        10: "Cell phone binding",//手机绑定
        20: "Please fill in your cell phone number",//请填写手机号
        30: "SMS verification code",//短信验证码
        40: "Get verification code",//获取验证码
        50: "SMS verification code has been sent",//短信验证码已发送
        60: "Retrievable after {p1} seconds",//{p1} 秒没收到后可重新获取
        70: "SMS verification code cannot be empty",//短信验证码不能为空
        80: "Captcha length is 6 characters",//验证码长度为6个字符
        90: "Cell phone number cannot be empty",//手机号不能为空
        100: "Incorrect length of cell phone number",//手机号码长度不正确
        110: "Submit successfully, automatically jump to the real name authentication page after 3 seconds",//提交成功，3秒后自动跳转到实名认证页
    },
    point:{
        10: "Bonus points for posting topics",//发表话题奖励积分
        20: "Bonus points for posting comments",//发表评论奖励积分
        30: "Bonus points for posting a reply",//发表回复奖励积分
        40: "Bonus points for submitting questions",//提交问题奖励积分
        50: "Bonus points for submitting answers",//提交答案奖励积分
        60: "Bonus points for submitting an answer to a reply",//提交答案回复奖励积分
        70: "Module",//模块
        80: "Post a topic",//发表话题
        90: "Post a comment",//发表评论
        100: "Leave a Reply",//发表回复
        110: "Points unlock topic hidden content",//积分解锁话题隐藏内容
        120: "Membership Card Order Payment",//会员卡订单支付
        130: "Recharge",//充值
        140: "Question",//问题
        150: "Answer",//答案
        160: "Reply to the answer",//答案回复
        170: "Reward point",//悬赏积分
        180: "Accept the answer",//采纳答案
        190: "Adjust the bounty",//调整赏金
        200: "Income/Expenses",//收入/支出
        210: "Time",//时间
        220: "Remark",//备注
        230: "No data available",//暂无数据
        240: "Points List",//积分列表
    },
    privateMessageChatList:{
        10: "Return to private message list",//返回私信列表
        20: "A Conversation with {p1}",//与 {p1} 的对话
        30: "This user account has been canceled",//此用户账号已注销
        40: "Recent Dialog Users",//最近对话用户
        50: "What I'm trying to say...",//我想说的话...
        60: "Private message conversation",//私信对话
        70: "Private message content cannot be empty",//私信内容不能为空
        80: "Submitted successfully",//提交成功
    },
    privateMessageList:{
        10: "All Private Messages",//全部私信
        20: "This user account has been canceled",//此用户账号已注销
        30: "Unread",//未读
        40: "Read",//已读
        50: "Dialogues",//对话
        60: "Delete",//删除
        70: "Private Message List",//私信列表
        80: "Deleted successfully",//删除成功
    },
    questionFavoriteList:{
        10: "Question Favorite Users",//问题收藏用户
        20: "User",//用户
        30: "This user account has been canceled",//此用户账号已注销
        40: "Favorites Time",//收藏时间
        50: "No data available",//暂无数据
    },
    questionList:{
        10: "Title",//标题
        20: "Tag",//标签
        30: "Post time",//发表时间
        40: "Operate",//操作
        50: "Favorite User",//收藏用户
        60: "No data available",//暂无数据
        70: "My question",//我的问题
    },
    realNameAuthentication:{
        10: "Your bonded cell phone number",//您绑定的手机号
        20: "You haven't bound a cell phone",//您还没绑定手机
        30: "Modify",//修改
        40: "Bind Now",//立即绑定
        50: "Real-name authentication",//实名认证
    },
    receiveRedEnvelopeList:{
        10: "Red envelope users",//发红包用户
        20: "This user account has been canceled",//此用户账号已注销
        30: "Amount",//金额
        40: "Collection time",//收取时间
        50: "No data available",//暂无数据
        60: "Red envelope list",//收红包列表
    },
    redEnvelopeAmountDistributionList:{
        10: "Type",//类型
        20: "Personal targeted red envelope",//个人定向红包
        30: "Public random red envelope",//公共随机红包
        40: "Public fixed amount red envelope",//公共定额红包
        50: "Amount returned after stopping receiving the red envelope {p1} RMB",//中止领取红包后返还金额￥{p1}
        60: "Issue quantity",//发放数量
        70: "Received quantity",//已领取数量
        80: "Time",//时间
        90: "Red envelope recipients",//收红包用户
        100: "This user account has been canceled",//此用户账号已注销
        110: "Amount",//金额
        120: "Collection time",//收取时间
        130: "No data available",//暂无数据
        140: "Red envelope amount distribution list",//发红包金额分配列表
        150: "Total amount",//总金额
    },
    remindList:{
        10: "All reminders",//全部提醒
        20: "Mark all as read",//全部标记已读
        30: "Unread",//未读
        40: "Read",//已读
        50: "Delete",//删除
        60: "This user account has been canceled",//此用户账号已注销
        70: "{p1} commented on my topic in {p2}",//{p1} 在 {p2} 评论了我的话题
        80: "{p1} replied to my topic in {p2}",//{p1} 在 {p2} 回复了我的话题
        90: "{p1} quoted me in {p2}",//{p1} 在 {p2} 引用了我的评论
        100: "{p1} replied to my comment at {p2}",//{p1} 在 {p2} 回复了我的评论
        110: "{p1} at {p2} replied to a comment I replied to",//{p1} 在 {p2} 回复了我回复过的评论
        120: "{p1} at {p2} replied to my comment response",//{p1} 在 {p2} 回复了我的评论回复
        130: "{p1} unlocked my topic in {p2}",//{p1} 在 {p2} 解锁了我的话题
        140: "{p1} liked my topic in {p2}",//{p1} 在 {p2} 赞了我的话题
        145: "{p1} followed me",//{p1} 关注了我
        150: "I follow {p1} posted the topic {p2}",//我关注的 {p1} 发表了话题 {p2}
        160: "I follow {p1} posted a comment {p2}",//我关注的 {p1} 发表了评论 {p2}
        170: "I follow {p1} posted a comment in reply to {p2}",//我关注的 {p1} 发表了评论回复 {p2}
        180: "{p1} answered my question at {p2}",//{p1} 在 {p2} 回答了我的问题
        190: "{p1} replied to my question at {p2}",//{p1} 在 {p2} 回复了我的问题
        200: "{p1} replied to my answer at {p2}",//{p1} 在 {p2} 回复了我的答案
        210: "{p1} at {p2} replied to the answer I replied to",//{p1} 在 {p2} 回复了我回复过的答案
        220: "{p1} at {p2} replied to my answer response",//{p1} 在 {p2} 回复了我的答案回复
        230: "I follow {p1} asked the question {p2}",//我关注的 {p1} 提了问题 {p2}
        240: "I follow {p1} answered the question {p2}",//我关注的 {p1} 回答了问题 {p2}
        250: "I follow {p1} posted an answer in reply to {p2}",//我关注的 {p1} 发表了答案回复 {p2}
        260: "{p1} mentioned me in topic {p2}",//{p1} 在话题 {p2} 提到我
        270: "{p1} mentioned me in comment {p2}",//{p1} 在评论 {p2} 提到我
        280: "{p1} mentioned me in a comment reply to {p2}",//{p1} 在评论回复 {p2} 提到我
        290: "{p1} mentioned me in question {p2}",//{p1} 在问题 {p2} 提到我
        300: "{p1} mentioned me in answer to {p2}",//{p1} 在答案 {p2} 提到我
        310: "{p1} mentioned me in the answer reply {p2}",//{p1} 在答案回复 {p2} 提到我
        320: "{p1} liked my comment at {p2}",//{p1} 在 {p2} 赞了我的评论
        330: "{p1} liked my comment reply in {p2}",//{p1} 在 {p2} 赞了我的评论回复
        340: "{p1} liked my question in {p2}",//{p1} 在 {p2} 赞了我的问题
        350: "{p1} liked my answer in {p2}",//{p1} 在 {p2} 赞了我的答案
        360: "{p1} liked my answer reply in {p2}",//{p1} 在 {p2} 赞了我的答案回复
        370: "Reminder List",//提醒列表
        380: "Mark all alerts read successfully",//标记全部提醒已读成功
        390: "Deleted successfully",//删除成功
    },
    replyList:{
        10: "Reply",//回复
        20: "Replied on topic",//回复的话题
        30: "Post time",//发表时间
        40: "No data available",//暂无数据
        50: "My reply",//我的回复
    },
    reportList:{
        10: "Reason",//理由
        20: "Type",//分类
        30: "Image",//图片
        40: "Reported content",//被举报内容
        50: "View topic",//查看话题
        60: "View Comments",//查看评论
        70: "View Comment Reply",//查看评论回复
        80: "View Question",//查看问题
        90: "View Answer",//查看答案
        100: "View Answer Reply",//查看答案回复
        110: "State",//状态
        120: "Awaiting processing",//待处理
        130: "Failed complaints",//投诉失败
        140: "Complaints Successful",//投诉成功
        150: "Pending 【deleted by user】",//待处理【用户删除】
        160: "Complaint failed 【user deleted】",//投诉失败【用户删除】
        170: "Complaint successful 【user deleted】",//投诉成功【用户删除】
        180: "Pending 【employee deletion】",//待处理【员工删除】
        190: "Complaint Failed 【Employee Deleted】",//投诉失败【员工删除】
        200: "Complaint Successful 【Employee Deleted】",//投诉成功【员工删除】
        210: "Disposal results",//处理结果
        220: "Reporting Time / Processing Completion Time",//举报时间 / 处理完成时间
        230: "No data available",//暂无数据
        240: "Report List",//举报列表
    },
    systemNotifyList:{
        10: "All system notifications",//全部系统通知
        20: "Mark all as read",//全部标记已读
        30: "Unread",//未读
        40: "Read",//已读
        50: "Delete",//删除
        60: "System Notification List",//系统通知列表
        70: "Mark all system notifications as read successfully",//标记全部系统通知已读成功
        80: "Deleted successfully",//删除成功
    },
    topicFavoriteList:{
        10: "Topic Favorite Users",//话题收藏用户
        20: "User",//用户
        30: "This user account has been canceled",//此用户账号已注销
        40: "Favorites time",//收藏时间
        50: "No data available",//暂无数据
    },
    topicLikeList:{
        10: "Topic Liked Users",//话题点赞用户
        20: "User",//用户
        30: "This user account has been canceled",//此用户账号已注销
        40: "Like time",//点赞时间
        50: "No data available",//暂无数据
    },
    topicList:{
        10: "Title",//标题
        20: "Tag",//标签
        30: "Post time",//发表时间
        40: "Operation",//操作
        50: "Unlock hidden tab users",//解锁隐藏标签用户
        60: "Favorite User",//收藏用户
        70: "Like User",//点赞用户
        80: "Edit",//编辑
        90: "No data available",//暂无数据
        100: "My topic",//我的话题
    },
    topicUnhideList:{
        10: "Unlock hidden tab users",//解锁隐藏标签用户
        20: "User",//用户
        30: "This user account has been canceled",//此用户账号已注销
        40: "Time",//时间
        50: "Hide Tag Type",//隐藏标签类型
        60: "Enter a password",//输入密码
        70: "Points Purchase",//积分购买
        80: "Balance purchase",//余额购买
        90: "No data available",//暂无数据
        100: "Topic Unlock Hidden Label Users",//话题解锁隐藏标签用户
    },
    updatePhoneBinding_step1:{
        10: "Modify Cell Phone Binding -- Verify Old Cell Phone Number",//修改手机绑定 -- 验证旧手机号
        20: "Bound cell phone number",//已绑定手机号
        30: "SMS verification code",//短信验证码
        40: "Get verification code",//获取验证码
        50: "The first step in changing your bundled cell phone",//更换绑定手机第一步
        60: "SMS verification code has been sent",//短信验证码已发送
        70: "{p1} Seconds can be reacquired after they're not received.",//{p1} 秒没收到后可重新获取
        80: "SMS verification code cannot be empty",//短信验证码不能为空
        90: "Captcha length is 6 characters",//验证码长度为6个字符
        100: "Successful verification, after 3 seconds, automatically jump to the second step of replacing the bound cell phone",//验证成功，3秒后自动跳转到更换绑定手机第二步
    },
    updatePhoneBinding_step2:{
        10: "Modify cell phone binding -- bind new cell phone number",//修改手机绑定 -- 绑定新手机号
        20: "Please fill in the new cell phone number",//请填写新手机号
        30: "SMS verification code",//短信验证码
        40: "Get verification code",//获取验证码
        50: "Change the bound mobile phone step 2",//更换绑定手机第二步
        60: "SMS verification code has been sent",//短信验证码已发送
        70: "Retrievable after {p1} seconds",//{p1} 秒没收到后可重新获取
        80: "SMS verification code cannot be empty",//短信验证码不能为空
        90: "Captcha length is 6 characters",//验证码长度为6个字符
        100:  "Cell phone number cannot be empty",//手机号不能为空
        110:  "Incorrect length of cell phone number",//手机号码长度不正确
        120: "Submit successfully, and automatically jump to the real-name authentication page after 3 seconds",//提交成功，3秒后自动跳转到实名认证页
    },
    userDynamicList:{
        10: "Posted a topic",//发表了话题
        20: "Commented on the topic",//评论了话题
        30: "Quoted Comment",//引用了评论
        40: "Replied to the topic",//回复了话题
        50: "Submitted a question",//提交了问题
        60: "Answered the question",//回答了问题
        70: "Replied to the question",//回复了问题
        80: "Read More",//展开阅读
        90: "Close",//收起
        100: "View Original Article",//查看原文
        110: "Edit",//编辑
        120: "{p1} Times read",//{p1} 次阅读
        130: "{p1} Comments",//{p1} 个评论
        140: "{p1} Favorites",//{p1}人收藏
        150: "{p1} Likes",//{p1}人赞
        160: "User dynamics",//用户动态
        170: "Password cannot be empty",//密码不能为空
        180: "Are you sure you want to unlock?",//确定解锁?
        190: "Topic unlocked successfully",//话题解锁成功
        200: "The content here has been hidden, enter the password to see it",//此处内容已被隐藏，输入密码可见
        210: "Password",//密码
        220: "Submit",//提交
        230: "This content is hidden and visible in the comment thread",//此处内容已被隐藏，评论话题可见
        240: "This content has been hidden and is visible at level ‘{p1}’",//此处内容已被隐藏，等级达到‘{p1}’可见
        250: "This content has been hidden, pay {p1} points to see it",//此处内容已被隐藏，支付‘{p1}’积分可见
        260: "This content has been hidden, pay {p1} RMB to see it",//此处内容已被隐藏，支付 ￥{p1} 元可见
        270: "Buy Now",//立即购买
        280: "Copy",//复制
        290: "Press Ctrl+C to copy",//按Ctrl+C复制
        300: "Copy successfully",//复制成功
        310: "The video is being processed. Please refresh it later",//视频处理中，请稍后再刷新
        320: "{p1} answers",//{p1}个答案
    },
    userLoginLogList:{
        10: "Login IP",//登录IP
        20: "IP Location",//IP归属地
        30: "Type",//类型
        40: "Log in",//登录
        50: "Renewal",//续期
        60: "Login time",//登录时间
        70: "No data available",//暂无数据
        80: "Login Log List",//登录日志列表
    }
}