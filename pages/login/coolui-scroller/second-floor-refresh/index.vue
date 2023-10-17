<template>
  <!-- pages/second-floor/circle/index.wxml -->
  <!-- <text>{{p}}</text> -->
  <view
    :class="
      'second-floor-refresh second-floor-refresh-class second-floor-refresh-' +
      status
    "
    @tap="back"
    :style="'color: ' + refreshConfigClone.color"
  >
    <view
      :class="'circle ' + (isLoading ? 'loading' : '')"
      v-if="p < scroll_height / 3"
      :style="'border-color: ' + refreshConfigClone.color + ';'"
    >
      <view class="left">
        <view
          class="leftcircle"
          :style="
            'transform: rotate(' +
            (p < 50 ? 45 - p * 3.6 : -135) +
            'deg);border-color: ' +
            refreshConfigClone.color +
            ';'
          "
        ></view>
      </view>
      <view class="right">
        <view
          class="rightcircle"
          :style="
            'transform: rotate(' +
            (p >= 50 && p <= 100 ? 45 - (p - 50) * 3.6 : p > 100 ? -135 : 45) +
            'deg);border-color: ' +
            refreshConfigClone.color +
            ';'
          "
        ></view>
      </view>
      <view
        :class="
          'downicon ' +
          (p < scroll_height / 3 && p > scroll_height / 6 ? 'up' : '')
        "
      >
        <view class="line"></view>
        <view class="line"></view>
        <view class="line"></view>
      </view>
    </view>
    <text :decode="true">{{ text }}</text>
  </view>
</template>

<script>
// pages/second-floor/circle/index.js
export default {
  // unicomGroup: ["second-floor"],
  data() {
    return {
      text: "",
      isLoading: false,
      isFloorShow: false,
      p: 0,
      scroll_height: 0,
      target: null,
      status: "down",

      refreshConfigClone: {
        color: "",
      },
    };
  },
  // externalClasses: ["second-floor-refresh-class", "second-floor-refresh-back"],
  // relations: {
  //   "../second-floor/index": {
  //     type: "parent",
  //     linked(target) {
  //       this.setData({
  //         target,
  //       });
  //     },
  //   },
  // },
  props: {
    refreshConfig: {
      type: Object,
      default: () => ({
        loadingText: "正在加载",
        backText: "返回首页",
        downText: "下拉刷新",
        tipText: "松开刷新,继续下拉有惊喜~",
        moreText: "继续下拉有惊喜~",
        color: "#ffffff",
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
      const defaultConfig = {
        loadingText: "正在加载",
        backText: "返回首页",
        downText: "下拉刷新",
        tipText: "松开刷新,继续下拉有惊喜~",
        moreText: "继续下拉有惊喜~",
        color: "#ffffff",
      };
      // this.setData({
      //   refreshConfigClone: {
      //     ...defaultConfig,
      //     ...this.refreshConfig,
      //   },
      // });
      this.refreshConfigClone = {
        ...defaultConfig,
        ...this.refreshConfig,
      };
    },

    setText(p) {
      if (p > 0 && p <= this.scroll_height / 6) {
        if (this.text !== this.refreshConfig.downText) {
          // this.setData({
          //   text: this.refreshConfig.downText,
          //   status: "down",
          // });
          this.text = this.refreshConfig.downText;
          this.status = "down";
        }
      } else if (p > this.scroll_height / 6 && p <= this.scroll_height / 3) {
        if (this.text !== this.refreshConfig.tipText) {
          // this.setData({
          //   text: this.refreshConfig.tipText,
          //   status: "tip",
          // });
          this.text = this.refreshConfig.tipText;
          this.status = "tip";
        }
      } else {
        if (this.text !== this.refreshConfig.moreText) {
          // this.setData({
          //   text: this.refreshConfig.moreText,
          //   status: "more",
          // });
          this.text = this.refreshConfig.moreText;
          this.status = "more";
        }
      }
      // this.setData({
      //   p,
      // });
      this.p = p;
    },

    setLoading(flag) {
      // this.setData({
      //   isLoading: flag,
      //   status: "loading",
      //   text: this.refreshConfig.loadingText,
      // });
      this.isLoading = flag;
      this.status = "loading";
      this.text = this.refreshConfig.loadingText;
    },

    setDown() {
      // this.setData({
      //   isLoading: false,
      //   text: this.refreshConfig.downText,
      //   p: 0,
      //   status: "down",
      // });
      this.isLoading = false;
      this.text = this.refreshConfig.downText;
      this.p = 0;
      this.status = "down";
    },

    setSecondShow(flag) {
      if (flag) {
        const text = this.refreshConfig.backText;
      } else {
      }
      // this.setData({
      //   isFloorShow: flag,
      //   text,
      //   status: "back",
      // });
      this.isFloorShow = flag;
      this.text = text;
      this.status = "back";
    },

    back() {
      if (this.isFloorShow) {
        this.target.back();
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
  watch: {
    refreshConfig: {
      handler: function (newVal, oldVal) {
        this.refreshConfigClone = newVal;
      },

      immediate: true,
      deep: true,
    },
  },
};
</script>
<style>
/* pages/second-floor/circle/index.wxss */
:host {
  display: block;
  width: 100%;
  font-size: 28rpx;
}

.second-floor-refresh {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;
  line-height: 1em;
}

.second-floor-refresh .circle {
  display: flex;
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
  position: relative;
  border: none;
}

.second-floor-refresh .circle.loading {
  border: 1px dashed;
  border-radius: 100%;
  animation: loading 1s infinite linear;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.left {
  width: 12px;
  height: 24px;
  position: relative;
  overflow: hidden;
}

.leftcircle {
  width: 22px;
  height: 22px;
  border: 1px solid;
  position: absolute;
  border-radius: 50%;
  left: 0rpx;
  top: 0rpx;
  border-bottom: 1px solid transparent !important;
  border-left: 1px solid transparent !important;
  transform: rotate(45deg);
  animation-name: circle_left;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.right {
  width: 12px;
  height: 24px;
  position: relative;
  overflow: hidden;
}

.rightcircle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid;
  position: absolute;
  border-top: 1px solid transparent !important;
  border-right: 1px solid transparent !important;
  right: 0rpx;
  top: 0rpx;
  animation-name: circle_right;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform: rotate(45deg);
}

.circle.loading .leftcircle,
.circle.loading .rightcircle {
  border: none;
}

.second-floor-refresh .downicon {
  width: 12rpx;
  height: 12rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.second-floor-refresh .downicon .line:nth-child(1) {
  display: block;
  width: 1px;
  height: 22rpx;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rpx;
  opacity: 1;
}

.second-floor-refresh .downicon .line:nth-child(2) {
  width: 15rpx;
  height: 1px;
  background-color: #fff;
  display: block;
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: rotate(-45deg);
  transform-origin: 0 50%;
  border-radius: 2rpx;
  opacity: 1;
}

.second-floor-refresh .downicon .line:nth-child(3) {
  width: 15rpx;
  height: 1px;
  background-color: #fff;
  display: block;
  position: absolute;
  bottom: -3px;
  right: 50%;
  transform: rotate(45deg);
  transform-origin: 100% 50%;
  border-radius: 2rpx;
  opacity: 1;
}

.second-floor-refresh .circle.loading .downicon {
  display: none;
}

.second-floor-refresh text {
  display: block;
  text-align: center;
  line-height: 1.5em;
}

/* .second-floor-refresh .downicon.up {
  transform: translate(-50%, -50%) rotate(180deg);
} */
</style>
