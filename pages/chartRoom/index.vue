<template>
  <view>
    <u-navbar
      title="个人中心"
      @rightClick="rightClick"
      @leftClick="leftClick"
      bgColor="#21a2f1"
      :autoBack="true"
    >
    </u-navbar>
    <div class="main-content">
      <u-button
        type="primary"
        text="login"
        @click="$u.debounce(goIndex, 500)"
      ></u-button>
      <u-button
        type="primary"
        text="地球"
        @click="$u.debounce(goEarth, 500)"
      ></u-button>
    </div>
    <span class="iconfont icon-home"></span>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    rightClick() {
      console.log("点击右侧");
    },
    leftClick() {
      console.log("点击左侧");
    },
    goIndex() {
      console.log("点击跳转");
      // 跳转主页
      uni.navigateTo({
        url: "/pages/login/index",
        animationType: "pop-in",
        animationDuration: 200,
        complete: function (res) {
          console.log("跳转结果", res);
        },
      });
    },
    goEarth() {
      uni.navigateTo({
        url: "/pages/earth/index",
        animationType: "pop-in",
        animationDuration: 200,
        complete: function (res) {
          console.log("跳转结果", res);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  widows: 100%;
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
