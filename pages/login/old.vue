<template>
  <view style="height: 100%">
    <second-floor
      @refresh="onRefresh"
      @secondShow="onSecondShow"
      @secondBack="onSecondBack"
      :threshold.sync="val"
      :offset="offset ? 100 : 0"
      class="my-second-floor"
      :center="type === 'center'"
      :bottom="type === 'bottom'"
      :top="type === 'top'"
      :scale="scale"
      :tip="tip"
      ref="secondFloor"
    >
      <view slot="second-floor">
        <view class="second-floor" style="background: #d13435">
          <view>我是二楼顶部</view>
          <view>我是二楼中部</view>
          <view>我是二楼底部</view>
        </view>
      </view>
      <second-floor-refresh
        :refreshConfig="refreshConfig"
        slot="second-floor-refresh"
      ></second-floor-refresh>
      <nav-bar slot="nav-bar" :config="navBarConfig">下拉二楼</nav-bar>
      <view class="demopage">
        <view class="pannel-inner">
          <view class="scroller-pannel">
            <view>
              <view class="title">下拉二楼效果</view>
              <view class="des"
                >轻滑下拉松手刷新，滑动到超过一定距离，下拉二楼展开，可写入活动页面等有趣的内容</view
              >
              <view class="des">二楼位置设置:</view>
              <radio-group @change="radioChange">
                <label
                  class="weui-cell weui-check__label"
                  v-for="(item, index) in types"
                  :key="index"
                >
                  <view class="weui-cell__hd">
                    <radio :value="item.value" :checked="item.value === type" />
                  </view>

                  <view class="weui-cell__bd">{{ item.name }}</view>
                </label>
              </radio-group>
              <view class="des">是否开启缩放:</view>
              <switch :checked="scale" @change="scaleChange" />
              <view class="des">是否弹出新页面:</view>
              <switch :checked="newPage" @change="switchChange" />
              <view class="des">是否开启自动下拉提示:</view>
              <switch :checked="tip.show" @change="tipChange" />
              <view class="des">设置offset 100:</view>
              <switch :checked="offset" @change="offsetChange" />
              <view class="downtip">下拉查看效果</view>
              <view class="downicon">
                <view class="line"></view>
                <view class="line"></view>
                <view class="line"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </second-floor>
    <page-container
      :show="show"
      :round="round"
      :overlay="overlay"
      :duration="duration"
      :position="position"
      :close-on-slide-down="false"
      @beforeenter="onBeforeEnter"
      @enter="onEnter"
      @afterenter="onAfterEnter"
      @beforeleave="onBeforeLeave"
      @leave="onLeave"
      @afterleave="onAfterLeave"
      @clickoverlay="onClickOverlay"
      :custom-style="customStyle"
      :overlay-style="overlayStyle"
    >
      <view class="detail-page">
        <button type="primary" @tap="exit">退出</button>
      </view>
    </page-container>
  </view>
</template>

<script>
import secondFloorRefresh from "./coolui-scroller/second-floor-refresh/index";
import secondFloor from "./coolui-scroller/second-floor/index";
import scroller from "./coolui-scroller/scroller/index";
// import item from "./coolui-scroller/item/index";
import navBar from "./coolui-scroller/nav-bar/index";
// const app = getApp();
export default {
  components: {
    secondFloorRefresh,
    secondFloor,
    scroller,
    navBar,
  },
  data() {
    return {
      refreshConfig: {
        downText: "下拉刷新",
        loadingText: "正在加载",
        backText: "返回首页",
        tipText: "松开刷新",
        moreText: "继续下拉有惊喜~",
      },
      navBarConfig: {
        back: {
          show: true,
          click: () => {
            uni.navigateBack({
              delta: 1,
            });
          },
        },
        background: {
          color: "#d13435",
        },
        text: {
          color: "#fff",
        },
      },
      pic: {
        tb: "https://test.wzs.pub/pic/second-floor-bg.jpeg",
        elm: "https://test.wzs.pub/pic/2lou/elm.jpg",
      },
      val: 0,
      type: "bottom",
      types: [
        {
          value: "top",
          name: "top",
        },
        {
          value: "center",
          name: "center",
        },
        {
          value: "bottom",
          name: "bottom",
        },
        // { value: "scale", name: "scale" },
      ],

      newPage: false,
      scale: false,
      show: false,
      duration: 300,
      position: "right",
      round: false,
      overlay: true,
      customStyle: "",
      overlayStyle: "",
      statusBarHeight: 0,
      tip: {
        show: false,
        height: 200,
        times: 1,
        duration: 2000,
      },
      offset: false,
    };
  },
  onLoad: function () {
    const type = uni.getStorageSync("type");
    const that = this;
    if (type) {
      this.type = type;
    }
    const newPage = uni.getStorageSync("newPage");
    if (newPage) {
      this.newPage = newPage;
    }
    const scale = uni.getStorageSync("scale");
    if (scale) {
      this.scale = scale;
    }
    const offset = uni.getStorageSync("offset");
    if (offset) {
      this.offset = offset;
    }
    const tip = uni.getStorageSync("offset");
    if (tip) {
      this.tip = {
        show: tip,
        height: 200,
        times: 1,
        duration: 2000,
      };
    }
    uni.getSystemInfoAsync({
      success: function (res) {
        that.setData({
          statusBarHeight: res.statusBarHeight,
        });
      },
    });
  },
  onShareAppMessage(res) {},
  methods: {
    setData(data) {
      for (const key in data) {
        if (this[key] !== undefined) {
          // this.$set(this.tip, key, data[key]);
          this[key] = data[key];
        }
      }
    },
    onRefresh() {
      // 模拟请求延时
      setTimeout(() => {
        // 设置回弹
        // const secondFloor = this.zpSelectComponent(".my-second-floor");
        const secondFloor = this.$refs.secondFloor;
        secondFloor.settriggered().then(() => {
          uni.showToast({
            title: "执行回弹成功",
            icon: "success",
          });
        });
      }, 2000);
    },

    onSecondShow() {
      console.log("二楼已加载");
      // 如果设置了弹出新页 则控制show
      if (this.newPage) {
        setTimeout(() => {
          // this.setData({
          //   show: true,
          // });
          this.show = true;
        }, 500);
      }
    },

    onSecondBack() {
      console.log("二楼已关闭");
    },

    radioChange(e) {
      // this.setData({
      //   type: e.detail.value,
      // });
      this.type = e.detail.value;
      uni.setStorageSync("type", e.detail.value);
    },

    exit() {
      // const secondFloor = this.zpSelectComponent(".my-second-floor");
      const secondFloor = this.$refs.secondFloor;
      secondFloor.back().then(() => {
        // this.setData({
        //   show: false,
        // });
        this.show = false;
      });
    },

    switchChange(e) {
      // this.setData({
      //   newPage: e.detail.value,
      // });
      this.newPage = e.detail.value;
      uni.setStorageSync("newPage", e.detail.value);
    },

    scaleChange(e) {
      // this.setData({
      //   scale: e.detail.value,
      // });
      this.scale = e.detail.value;
      uni.setStorageSync("scale", e.detail.value);
    },

    offsetChange(e) {
      // this.setData(
      //   {
      //     offset: e.detail.value,
      //   },
      // );
      this.offset = e.detail.value;
      this.$nextTick(() => {
        const secondFloor = this.$refs.secondFloor;
        secondFloor.init();
        uni.setStorageSync("offset", e.detail.value);
      });
    },

    tipChange(e) {
      // this.setData(
      //   {
      //     tip: {
      //       show: e.detail.value,
      //       height: 200,
      //       times: 1,
      //       duration: 2000,
      //     },
      //   },
      //   () => {
      //     // const secondFloor = this.zpSelectComponent(".my-second-floor");
      //     const secondFloor = this.$refs.secondFloor;
      //     secondFloor.init();
      //   }
      // );
      this.tip = {
        show: e.detail.value,
        height: 200,
        times: 1,
        duration: 2000,
      };
      this.$nextTick(() => {
        const secondFloor = this.$refs.secondFloor;
        secondFloor.init();
      });
      uni.setStorageSync("offset", e.detail.value);
    },
    // onBeforeEnter() {
    //   console.log("占位：函数 onBeforeEnter 未声明");
    // },

    // onEnter() {
    //   console.log("占位：函数 onEnter 未声明");
    // },

    // onAfterEnter() {
    //   console.log("占位：函数 onAfterEnter 未声明");
    // },

    // onBeforeLeave() {
    //   console.log("占位：函数 onBeforeLeave 未声明");
    // },

    // onLeave() {
    //   console.log("占位：函数 onLeave 未声明");
    // },

    // onAfterLeave() {
    //   console.log("占位：函数 onAfterLeave 未声明");
    // },

    // onClickOverlay() {
    //   console.log("占位：函数 onClickOverlay 未声明");
    // },
  },
};
</script>
<style>
page {
  background-color: #d13435;
}

.second-floor {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  background-size: cover;
  background-position: center;
  height: 100%;
  position: absolute;
  width: 100%;
}

.second-floor view {
  padding: 80rpx;
}

.weui-cell.weui-check__label {
  display: flex;
  align-items: center;
}

.demopage {
  min-height: 100% !important;
}

.demopage .pannel-inner .scroller-pannel .des {
  text-align: left;
  margin-bottom: 20rpx;
}

radio-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

switch {
  margin-bottom: 20rpx;
}

.detail-page {
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
