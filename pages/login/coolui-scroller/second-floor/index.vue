<template>
  <view
    class="wx-coolui-scroller-second-floor second-floor-class"
    style=""
    @touchstart="touchStart"
    @touchend="touchEnd"
    @touchmove="touchMove"
  >
    <view
      class="second-floor-wapper"
      :animation="wapperAnimationData"
      ref="secondFloorwapper"
    >
      <view class="second-floor-inner" style="">
        <view style="height: 100vh" :animation="innerAnimationData">
          <slot name="second-floor"></slot>
        </view>
        <div class="second-floor-text">
          <slot name="second-floor-refresh"></slot>
        </div>
      </view>
      <view class="first-floor" style="">
        <view :style="'height: ' + statusBarHeight + 'px'">
          <slot name="nav-bar"></slot>
        </view>
        <view :style="'height: calc(100vh - ' + statusBarHeight + 'px)'">
          <slot></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// miniprogram_npm/coolui-scroller/second-floor/index.js
export default {
  unicomGroup: ["nav-bar"],
  data() {
    return {
      scroll_height: 0,
      touchy: 0,
      isLoading: false,
      isFloorShow: false,
      wapperAnimationData: {},
      innerAnimationData: {},
      statusBarHeight: 0,
      navBar: null,
      timeout: "",
      thresholdClone: 0,
      tipClone: {},
    };
  },
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  externalClasses: ["second-floor-class"],
  relations: {
    "../second-floor-refresh/index": {
      type: "child",
      linked(target) {
        // console.log(target);
      },
    },
    "../nav-bar/index": {
      type: "child",
      linked(target) {
        // console.log(target.data)
        // console.log(target.data.statusBarHeight)
        // this.setData({
        //   navBar: target,
        // })
      },
    },
  },
  props: {
    threshold: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
    center: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: true,
    },
    top: {
      type: Boolean,
      default: false,
    },
    scale: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: Object,
      default: () => ({
        show: false,
        height: 100,
        times: 1,
        duration: 2000,
      }),
    },
  },
  mounted() {
    // 处理小程序 attached 生命周期
    this.attached();
    // 处理小程序 ready 生命周期
    this.$nextTick(() => this.ready());
  },
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
      this.init(() => {
        // this.navNodes = this.getRelationNodes("nav-bar");
        this.navNodes = this.$refs["nav-bar"];
        this.navNode = this.navNodes[0] ? this.navNodes[0] : null;
        this.setData({
          statusBarHeight: this.navNode.data.statusBarHeight,
        });
      });
    },

    attached: function () {
      // 在组件实例进入页面节点树时执行
      // this.init()
      let info = uni.getSystemInfoSync();
      console.log(info);
      this.setData({
        scroll_height: info.windowHeight,
      });
    },

    debounce(fn, wait) {
      const that = this;
      that.setData({
        timeout: null,
      });
      return function () {
        if (that.timeout !== null) {
          clearTimeout(that.timeout);
        }
        const timeout = setTimeout(() => {
          fn();
        }, wait);
        that.setData({
          timeout,
        });
      };
    },

    /**
     * @name: 初始化
     * @description: 根据设置初始化动画，初始化参数，初始化子组件
     * @return {*}
     */
    init(callback = null) {
      let info = uni.getSystemInfoSync();
      //   this.refreshNodes = this.getRelationNodes("second-floor-refresh");
      this.refreshNodes = this.$refs["nav-bar"];
      this.refreshNode = this.refreshNodes[0] ? this.refreshNodes[0] : null;
      this.refreshNode.setData({
        scroll_height: this.scroll_height,
      });
      this.refreshNode.setDown();
      let animation = this.setAnimation(-this.scroll_height + this.offset, 0);
      console.log(this.offset);
      let animationInner = null;
      if (this.scale) {
      } else {
      }
      if (this.top) {
        animationInner = this.setAnimation(
          this.scroll_height,
          0,
          scaleXy,
          scaleXy
        );
      }
      if (this.center) {
        animationInner = this.setAnimation(
          this.scroll_height / 2,
          0,
          scaleXy,
          scaleXy
        );
      }
      if (this.bottom) {
        animationInner = this.setAnimation(0, 0, scaleXy, scaleXy);
      }
      this.setData(
        {
          wapperAnimationData: animation.export(),
          innerAnimationData: animationInner ? animationInner.export() : {},
          thresholdClone: this.threshold,
        },
        () => {
          //   this.wapper = this.zpSelectComponent(".second-floor-wapper");
          this.wapper = this.$refs.secondFloorWapper;
          if (callback) {
            callback();
          }
          if (this.tip.show) {
            this.tipShow();
          }
        }
      );
    },

    tipShow(
      duration = this.tip.duration,
      wait = this.tip.duration,
      times = this.tip.times
    ) {
      const animation = uni.createAnimation();
      let offset = -this.scroll_height + this.offset;
      animation.translateY(offset).step({
        duration,
        timingFunction: "ease-in",
      });
      this.setData(
        {
          wapperAnimationData: animation.export(),
          thresholdClone: 0,
        },
        () => {
          this.refreshNode.setText(this.scroll_height / 2);
          if (this.tip.show) {
            setTimeout(() => {
              animation.translateY(-this.scroll_height + this.tip.height).step({
                duration,
                timingFunction: "ease-out",
              });
              this.setData(
                {
                  wapperAnimationData: animation.export(),
                  thresholdClone: this.tip.height,
                },
                () => {
                  this.refreshNode.setText(this.scroll_height / 2);
                  if (times > 1) {
                    setTimeout(() => {
                      this.tipShow(duration, wait, times - 1);
                    }, wait);
                  } else {
                    setTimeout(() => {
                      this.setData(
                        {
                          tipClone: {
                            show: false,
                            height: this.tip.height,
                            times: this.tip.times,
                          },
                        },
                        () => {
                          this.tipShow(duration, wait, times - 1);
                        }
                      );
                    }, wait);
                  }
                }
              );
            }, duration);
          }
        }
      );
    },

    /**
     * @name: 触摸拖拽开始
     * @description: 记录初始触摸位置
     * @param {*} e
     * @return {*}
     */
    touchStart(e) {
      console.log(this.tip.show);
      // 正在刷新时不操作触摸
      if (this.tip.show) {
        return false;
      }
      if (this.isLoading) {
        return false;
      }
      this.setData({
        touchy: e.changedTouches[0].clientY,
      });
    },

    /**
     * @name: 拖动时执行
     * @description: 修改页面动画，传递触摸动态参数给refresh组件
     * @return {*}
     */
    touchMove(e) {
      if (this.tip.show) {
        return false;
      }
      // 正在刷新时不进行操作, 二楼已加载是不进行操作
      if (!this.isFloorShow && !this.isLoading) {
        const distance = Math.round(e.changedTouches[0].clientY - this.touchy);
        let scaleXy = 1;
        if (this.scale) {
          scaleXy = 0.1 + distance / 200;
          scaleXy = scaleXy >= 1 ? 1 : scaleXy;
        }
        if (distance > 0) {
          let animation = this.setAnimation(
            -this.scroll_height + distance + this.offset,
            0
          );
          let animationInner = null;
          if (this.top) {
            animationInner = this.setAnimation(
              this.scroll_height - distance,
              0,
              scaleXy,
              scaleXy
            );
          }
          if (this.bottom) {
            animationInner = this.setAnimation(0, 0, scaleXy, scaleXy);
          }
          if (this.center) {
            animationInner = this.setAnimation(
              (this.scroll_height - distance) / 2,
              0,
              scaleXy,
              scaleXy
            );
          }
          // console.log(animationInner);
          this.setData({
            wapperAnimationData: animation.export(),
            innerAnimationData: animationInner ? animationInner.export() : null,
            thresholdClone: distance,
          });
          this.refreshNode.setText(distance);
        }
      }
    },

    /**
     * @name: 松手后执行
     * @description: 松手时如果拖拽的距离大于屏幕三分之一，直接执行拉到二楼动画，如果大于六分之一小于三分之一则回到六分之一并开启刷新状态，如果小于六分之一直接回弹
     * @return {*}
     */
    touchEnd() {
      if (this.tip.show) {
        return false;
      }
      // 正在刷新时不进行操作, 二楼已加载是不进行操作，只点屏幕不拖拽时不进行操作
      if (!this.isFloorShow && this.threshold > 0 && !this.isLoading) {
        // 大于3分之1 直接拉到二楼
        if (this.threshold > this.scroll_height / 3) {
          const animation = this.setAnimation(0, 400);
          let animationInner = null;
          if (this.top) {
            animationInner = this.setAnimation(0, 400, 1, 1);
          }
          if (this.bottom) {
            animationInner = this.setAnimation(0, 0, 1, 1);
          }
          if (this.center) {
            animationInner = this.setAnimation(0, 400, 1, 1);
          }
          this.setData(
            {
              wapperAnimationData: animation.export(),
              innerAnimationData: animationInner ? animationInner.export() : {},
            },
            () => {
              setTimeout(() => {
                this.refreshNode.setSecondShow(true);
                this.setData({
                  isFloorShow: true,
                });
                this.$emit("secondShow");
              }, 400);
            }
          );
        } else {
          if (this.threshold > this.scroll_height / 6) {
            // 大于6分之一，小于3分之一，回到 6分之一停顿开始刷新
            const animation = this.setAnimation(
              -this.scroll_height + this.scroll_height / 6,
              400
            );
            let animationInner = null;
            if (this.top) {
              animationInner = this.setAnimation(
                this.scroll_height - this.scroll_height / 6,
                400
              );
            }
            if (this.bottom) {
              animationInner = this.setAnimation(0, 0);
            }
            if (this.center) {
              animationInner = this.setAnimation(
                (this.scroll_height - this.scroll_height / 6) / 2,
                400
              );
            }
            this.setData(
              {
                wapperAnimationData: animation.export(),
                innerAnimationData: animationInner
                  ? animationInner.export()
                  : {},
              },
              () => {
                this.$emit("refresh");
                this.setData({
                  isLoading: true,
                });
                this.refreshNode.setLoading(true);
              }
            );
          } else {
            // 小于6分之一 直接回顶部
            this.back(false);
          }
        }
      }
    },

    /**
     * @name: 回弹及二楼关闭
     * @description: 拖动小于6分之一直接回顶部或外部自定义调用关闭二楼
     * @return {*}
     */
    back(callback = true) {
      return new Promise((resolve) => {
        const animation = this.setAnimation(
          -this.scroll_height + this.offset,
          800
        );
        let animationInner = null;
        if (this.top) {
          animationInner = this.setAnimation(
            this.scroll_height,
            800,
            1,
            this.scale ? 0 : 1
          );
        }
        if (this.bottom) {
          animationInner = this.setAnimation(0, 0, 1, this.scale ? 0 : 1);
        }
        if (this.center) {
          animationInner = this.setAnimation(
            this.scroll_height / 2,
            800,
            1,
            this.scale ? 0 : 1
          );
        }
        this.setData(
          {
            wapperAnimationData: animation.export(),
            innerAnimationData: animationInner ? animationInner.export() : {},
          },
          () => {
            setTimeout(() => {
              // this.refreshNode.setShow(false)
              this.refreshNode.setDown();
              this.setData(
                {
                  isFloorShow: false,
                  thresholdClone: 0,
                },
                () => {
                  if (callback) {
                    this.$emit("secondBack");
                    resolve();
                  }
                }
              );
            }, 800);
          }
        );
      });
    },

    /**
     * @name: 刷新后的回弹
     * @description: 刷新之后回弹方法，再请求完数据之后执行
     * @return {*}
     */
    settriggered() {
      return new Promise((resolve) => {
        const animation = this.setAnimation(
          -this.scroll_height + this.offset,
          800
        );
        let animationInner = null;
        if (this.top) {
          animationInner = this.setAnimation(
            this.scroll_height,
            800,
            1,
            this.scale ? 0 : 1
          );
        }
        if (this.bottom) {
          animationInner = this.setAnimation(0, 0, 1, this.scale ? 0 : 1);
        }
        if (this.center) {
          animationInner = this.setAnimation(
            this.scroll_height / 2,
            800,
            1,
            this.scale ? 0 : 1
          );
        }
        this.setData(
          {
            wapperAnimationData: animation.export(),
            innerAnimationData: animationInner ? animationInner.export() : {},
            isLoading: false,
          },
          () => {
            setTimeout(() => {
              this.refreshNode.setDown();
              this.setData(
                {
                  thresholdClone: 0,
                },
                () => {
                  resolve();
                }
              );
            }, 400);
          }
        );
      });
    },

    setAnimation(
      y,
      duration = 400,
      scale = 1,
      opacity = 1,
      timingFunction = "ease-out"
    ) {
      let transformOrigin = "50% 50% 0";
      if (this.top) {
        transformOrigin = "50% 0 0";
      }
      if (this.bottom) {
        transformOrigin = "50% 100% 0";
      }
      if (this.center) {
        transformOrigin = "50% 50% 0";
      }
      const animation = uni.createAnimation({
        delay: 0,
        duration: duration,
        timingFunction: timingFunction,
        transformOrigin: transformOrigin,
      });
      animation.translateY(y).scale(scale, scale).opacity(opacity);
      animation.step();
      return animation;
    },
  },
  created: function () {
    /** linked处理 */
    this.$refs["nav-bar"].map((target) => {
      console.log(target.data);
      console.log(target.data.statusBarHeight);
      this.setData({
        navBar: target,
      });
    });
    /** linked处理 */
    this.$refs["second-floor-refresh"].map((target) => {
      console.log(target);
    });
  },
  watch: {
    center: {
      handler: function (newVal) {
        this.init();
      },

      immediate: true,
    },

    bottom: {
      handler: function (newVal) {
        this.init();
      },

      immediate: true,
    },

    top: {
      handler: function (newVal) {
        this.init();
      },

      immediate: true,
    },

    scale: {
      handler: function (newVal) {
        this.init();
      },

      immediate: true,
    },

    threshold: {
      handler: function (newVal, oldVal) {
        this.thresholdClone = newVal;
      },

      immediate: true,
    },

    tip: {
      handler: function (newVal, oldVal) {
        this.tipClone = newVal;
      },

      immediate: true,
      deep: true,
    },
  },
};
</script>
<style>
.wx-coolui-scroller-second-floor {
  overflow: hidden;
  height: 100vh !important;
}

.wx-coolui-scroller-second-floor .second-floor-wapper {
  transform: translateY(-50%) scale(1, 1);
  height: 200vh;
}

.wx-coolui-scroller-second-floor .second-floor-wapper .second-floor-inner {
  height: 100vh;
}

.wx-coolui-scroller-second-floor .second-floor-wapper .first-floor {
  height: 100vh;
  overflow: hidden;
}

.wx-coolui-scroller-second-floor
  .second-floor-wapper
  .second-floor-inner
  .second-floor-text {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.wx-coolui-scroller-second-floor .second-floor-inner {
  position: relative;
  overflow: hidden;
}
</style>
