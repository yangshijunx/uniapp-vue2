<template>
  <!-- pages/second-floor/circle/index.wxml -->
  <!-- <text>{{p}}</text> -->
  <view
    class="nav-bar"
    :style="
      'height:' +
      statusBarHeight +
      'px;background-color:' +
      config.background.color
    "
  >
    <view
      class="nav-bar-inner"
      :style="
        'height:' +
        statusBarHeight +
        'px;padding-top:' +
        StatusBar +
        'px;' +
        (config.background.img
          ? 'background-image:url( + config.background.img+)'
          : '')
      "
    >
      <block v-if="type === 'default'">
        <view class="action" @tap="BackPage" v-if="config.back">
          <view
            class="line"
            :style="'background-color:' + config.text.color"
          ></view>
          <view
            class="line"
            :style="'background-color:' + config.text.color"
          ></view>
        </view>
        <view
          class="content"
          :style="'top:' + StatusBar + 'px; color: ' + config.text.color"
        >
          <slot />
        </view>
      </block>
      <block v-else>
        <slot />
      </block>
    </view>
  </view>
</template>

<script>
// pages/second-floor/circle/index.js
export default {
  unicomGroup: ["second-floor"],
  data() {
    return {
      StatusBar: null,
      statusBarHeight: 0,
      Custom: null,
      target: "",
    };
  },
  externalClasses: ["nav-bar-class"],
  relations: {
    "../second-floor/index": {
      type: "parent",
      linked(target) {
        this.setData({
          target,
        });
      },
    },
  },
  props: {
    type: {
      type: String,
      default: "default",
    },
    config: {
      type: Object,
      default: () => ({
        back: {
          show: true,
        },

        background: {
          color: "#ffffff",
        },

        text: {
          color: "#000000",
          shadow: 0,
        },
      }),
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setData(data) {
      for (const key in data) {
        if (this[key] !== undefined) {
          // this.$set(this.tip, key, data[key]);
          this[key] = data[key];
        }
      }
    },
    ready() {
      const that = this;
      uni.getSystemInfoAsync({
        success: (e) => {
          that.setData({
            StatusBar: e.statusBarHeight,
          });
          let capsule = uni.getMenuButtonBoundingClientRect();
          if (capsule) {
            that.setData({
              Custom: capsule,
              statusBarHeight: capsule.bottom + capsule.top - e.statusBarHeight,
            });
          } else {
            that.setData({
              statusBarHeight: e.statusBarHeight + 50,
            });
          }
        },
      });
    },

    BackPage() {
      if (this.config.back.click) {
        this.config.back.click();
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },
  },
  mounted() {
    // 处理小程序 ready 生命周期
    this.$nextTick(() => this.ready());
  },
  created: function () {
    /** linked处理 */
    this.$refs["second-floor"].map((target) => {
      // this.setData({
      //   target,
      // });
      this.target = target;
    });
  },
};
</script>
<style>
.nav-bar {
  position: relative;
}

.nav-bar .nav-bar-inner {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}

.nav-bar .action {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  margin-left: 24rpx;
}

.nav-bar .action .line {
  width: 24rpx;
  height: 4rpx;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 center;
  margin-top: 0rpx;
  transform: translate(-40%, -50%) rotate(45deg);
}

.nav-bar .action .line + .line {
  margin-top: 0.5rpx;
  transform: translate(-40%, -50%) rotate(-45deg);
}

.nav-bar .content {
  text-align: center;
  width: 100%;
  font-size: 34rpx;
}
</style>
