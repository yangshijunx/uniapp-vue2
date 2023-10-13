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
    <view class="main-content">这是主体内容 </view>
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
