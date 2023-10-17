# scroll-refresh-floor 防淘宝下拉进入二楼效果

## 一、使用

### 安装插件

在uni-app插件市场右上角选择uni_modules版本下的使用HBuilderX导入插件，导入到对应的项目中即可。

- 如果您的项目是由HBuilder X创建的，相信已经安装scss插件，如果没有，请在HX菜单的 工具->插件安装中找到"scss/sass编译"插件进行安装， 如不生效，重启HX即可
- 如果您的项目是由vue-cli创建的，请通过以下命令安装对sass(scss)的支持，如果已安装，请略过。

```
    // 安装sass
    npm i sass -D

    // 安装sass-loader
    npm i sass-loader -D
```

### 使用

组件支持 easycom 规范，你无需`import`，直接使用即可；

```
<template>
    <scroll-refresh-floor>
        <view>下拉进入二楼</view>
    </scroll-refresh-floor>
</template>
```

## 二、组件属性

| 属性                         | 类型      | 默认值    | 说明                     |
| -------------------------- | ------- | ------ | ---------------------- |
| safeTop                    | Number  | 0      | 顶部距离 单位px（导航栏高度内部已做处理） |
| safeBottom                 | Number  | 0      | 底部距离 单位px              |
| refreshBackgroundColor     | String  | #000   | 下拉区域背景色                |
| refreshBackgroundImage     | String  | -      | 下拉区域背景图                |
| refreshBackgroundImageBlur | Boolean | false  | 开启下拉区域背景图模糊            |
| refreshTextColor           | String  | #fff   | 下拉文字颜色                 |
| refreshText                | String  | 继续下拉   | 下拉提示文字                 |
| refreshingText             | String  | 释放进入二楼 | 同上                     |
| refreshedText              | String  | 点击返回一楼 | 同上                     |
| refresherEnabled           | Boolean | true   | 启用下拉 支持动态修改            |



## 三、组件事件

| 事件名   | 说明         |
| ----- | ---------- |
| open  | 二楼打开时      |
| close | 二楼关闭时（回一楼） |

## 联系我

QQ：2261255218
微信：meme__tea