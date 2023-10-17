<template>
  <view id="content" :class="'wrap ' + (active ? 'active' : '')">
    <view class="slot-header" id="header">
      <slot name="header"></slot>
    </view>
    <scroll-view
      scroll-y
      class="scroll flex"
      :enable-passive="true"
      :enhanced="true"
      :fast-deceleration="true"
      :enable-back-to-top="true"
      :enable-flex="enableFlex"
      :refresher-enabled="type ? true : false"
      :refresher-threshold="refreshConfig.height ? refreshConfig.height : 50"
      :lower-threshold="100"
      :refresher-default-style="
        type == 'default' ? refreshConfig.style : 'none'
      "
      :refresher-background="refreshConfig.background.color"
      :refresher-triggered="triggered"
      @refresherrefresh="onDefaultRefresh"
      @refresherpulling="onPulling"
      @refresherrestore="onRestore"
      @scrolltolower="onLoadmore"
      @scroll="scroll"
      @touchend="dragend"
      :scroll-top="topClone"
      :scroll-with-animation="animation"
      :scroll-into-view="toView"
      :style="'height:' + contentHeight + 'px;'"
    >
      <view slot="refresher" v-if="type != 'default'" class="refresh-container">
        <slot name="refresh"></slot>
      </view>
      <view class="inner" :style="'min-height:' + contentHeight + 'px;'">
        <slot></slot>
        <view
          :style="'height:' + contentHeight + 'px'"
          v-if="isEmpty"
          class="slot-empty"
        >
          <slot name="empty"></slot>
        </view>
        <view class="slot-loadmore" v-if="!isEmpty">
          <slot name="loadmore"></slot>
        </view>
      </view>
    </scroll-view>
    <view
      class="backToTop"
      v-if="isBackToTopShow && isBackBtn"
      @tap="backToTop"
    ></view>
  </view>
</template>

<script>
export default {
  unicomGroup: ["nav-pannel"],
  data() {
    return {
      active: false,
      contentHeight: 0,
      triggered: false,
      isLoading: false,
      timeout: null,
      isBackToTopShow: false,
      threshold: 0,

      refreshConfig: {
        shake: false,
        height: 50,
        style: "black",

        background: {
          color: "",
        },
      },

      type: "",
      topClone: 0,
    };
  },
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  relations: {
    "../scroll-page/index": {
      type: "child",
      linked: function (target) {},
    },
    "../nav/index": {
      type: "child",
      linked: function (target) {},
    },
    "../empty/index": {
      type: "child",
      linked: function (target) {},
    },
    "../refresh/index": {
      type: "child",
      linked: function (target) {
        this.setData({
          type: target.data.type,
          refreshConfig: target.data.config,
        });
      },
    },
    "../nav-pannel/index": {
      type: "parent",
      linked: function (target) {
        // console.log(target)
      },
    },
  },
  props: {
    isEmpty: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "#f2f2f2",
    },
    isBackBtn: {
      type: Boolean,
      default: false,
    },
    enableFlex: {
      type: Boolean,
      default: false,
    },
    toView: {
      type: String,
      default: "",
    },
    top: {
      type: Number,
      default: 0,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
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
      this.setWapHeight();
      // this.refreshNodes = this.getRelationNodes("refresh");
      this.refreshNode = this.refreshNodes[0] ? this.refreshNodes[0] : null;
    },

    setWapHeight() {
      const that = this;
      const query = uni.createSelectorQuery().in(that).in(this);
      query
        .select("#content")
        .boundingClientRect(function (res) {
          if (res) {
            that.setData({
              contentHeight: res.height,
            });
            that.$emit("contentHeight", {
              detail: res.height,
            });
          }
        })
        .select("#header")
        .boundingClientRect(function (headerRes) {
          if (headerRes) {
            that.setData({
              contentHeight: that.contentHeight - headerRes.height,
            });
            that.$emit("contentHeight", {
              detail: that.contentHeight - headerRes.height,
            });
          }
        })
        .exec();
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

    onLoadmore() {
      const that = this;
      that.debounce(() => {
        that.$emit("loadmore");
        if (that.refreshConfig.shake) {
          uni.vibrateShort();
        }
      }, 500)();
    },

    onDefaultRefresh() {
      const that = this;
      if (that.type == "default") {
        that.$emit("refresh");
        that.debounce(() => {
          that.settriggered(false);
        }, 1000)();
      }
    },

    onRefresh() {
      const that = this;
      if (that.refreshConfig.shake) {
        uni.vibrateShort();
      }
      if (this.isLoading) {
        console.log("refresh");
        uni.showNavigationBarLoading();
        if ("isAutoTriggered" in that.refreshConfig) {
          if (that.refreshConfig.isAutoTriggered) {
            that.$emit("refresh");
            that.debounce(() => {
              that.settriggered(false);
              setTimeout(() => {
                that.onRestore();
              }, 300);
            }, 1000)();
          } else {
            if (that.triggered) {
              that.$emit("refresh");
            }
          }
        } else {
          that.$emit("refresh");
          that.debounce(() => {
            that.settriggered(false);
            setTimeout(() => {
              that.onRestore();
            }, 300);
          }, 1000)();
        }
      }
    },

    onPulling(evt) {
      console.log("pull");
      const that = this;
      that.settriggered(true).then(() => {
        // console.log(evt.detail.dy, that.data.refreshConfig.height);
        let p = Math.min(evt.detail.dy / (that.refreshConfig.height + 20), 1);
        that.p = p ? p : 0;
        that.setThreshold(that.p);
      });
    },

    settriggered(flag) {
      const that = this;
      return new Promise((resolve) => {
        if (flag != that.triggered) {
          if (that.refreshNode) {
            that.refreshNode.setData({
              triggered: flag,
            });
          }
          that.setData(
            {
              triggered: flag,
            },
            () => {
              resolve();
            }
          );
        } else {
          resolve();
        }
      });
    },

    setThreshold(p) {
      const that = this;
      return new Promise((resolve) => {
        if (that.refreshNode) {
          that.refreshNode
            .changeThreshold({
              threshold: p,
            })
            .then(() => {
              resolve();
            });
        }
      });
    },

    onRestore() {
      const that = this;
      if (that.isLoading) {
        console.log("restore");
        uni.hideNavigationBarLoading();
        that.$emit("restore");
        that.debounce(() => {
          that.setThreshold(0).then(() => {
            that.p = 0;
            that.refreshNode.setLoading({
              isloading: false,
            });
            that.setData({
              isLoading: false,
              triggered: false,
            });
          });
        }, 100)();
      }
    },

    scroll(e) {
      if (e.detail.scrollTop > 100 && this.isBackToTopShow == false) {
        this.setData({
          isBackToTopShow: true,
        });
      } else if (e.detail.scrollTop <= 100 && this.isBackToTopShow == true) {
        this.setData({
          isBackToTopShow: false,
        });
      }
    },

    dragend() {
      if (this.type != "default") {
        if (this.p > 0.6 && this.isLoading == false) {
          this.setData(
            {
              isLoading: true,
            },
            () => {
              this.refreshNode
                .setLoading({
                  isloading: true,
                })
                .then(() => {
                  this.onRefresh();
                });
            }
          );
        } else {
          this.settriggered(false);
        }
      }
    },

    backToTop() {
      // this.triggerEvent("refresh");
      this.setData({
        topClone: 0,
      });
    },
  },
  created: function () {},
  watch: {
    top: {
      handler: function (newVal, oldVal) {
        this.topClone = newVal;
      },

      immediate: true,
    },
  },
};
</script>
<style>
:host {
  display: block;
  width: 100%;
  height: 100%;
}

.refresh-container {
  width: 100%;
}

.wrap {
  display: block;
  height: 100%;
  position: relative;
}

.slot-header {
  position: relative;
  z-index: 5;
}

.slot-empty {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.wrp {
  height: 200px;
}

.backToTop {
  background-color: rgba(0, 0, 0, 0.6);
  background-image: url("data:image/png;base64,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UrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYCZJCqa0aCVKxHxKkIuygqSRIEMiUGAmSQqmtGglSsR8SpCLsoKkkSBDIlBgJkkKprRoJUrEfEqQi7KCpJEgQyJQYM1sF4JCU2kVqbgGwFslbM8drWAYBCZIBLXeImR0EYHXm+E+RXJE5VsMyCUiQTHA5w8xsGwCX5owFcCzJ4zLHalgmAQmSCS53mJmdBWBlz/FXk9ys5xiVBxCQIAEQ+0aY2U0A1u4xbn2SN/SoV2kQAQkSBLJvjJmdDWDfZcZdA2AFyRv75qs+hoAEieGYlWJm+wM4DMAmCwJ+DeA8kkdmBWtQGAEJEoYyP8jMNgDwRADrAric5JX5aRoZSUCCRNJU1ugISJDRtVQHFElAgkTSVNboCEiQ0bVUBxRJQIJE0lTW6AhIkNG1VAcUSUCCRNJU1ugISJDRtVQHFElAgkTSVNboCEiQ0bVUBxRJQIJE0lTW6AhIkNG1VAcUSUCCRNJU1ugISJDRtVQHFElAgkTSVNboCEiQ0bVUBxRJQIJE0lTW6Aj8F0gHDBR9WI6mAAAAAElFTkSuQmCC");
  background-size: 45rpx;
  background-repeat: no-repeat;
  background-position: center;
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  bottom: 40rpx;
  right: 30rpx;
  border-radius: 100%;
  z-index: 5;
  opacity: 0.6;
}
</style>
