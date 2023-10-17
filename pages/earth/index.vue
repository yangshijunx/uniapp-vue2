<template>
  <div style="background-color: aqua">
    <!-- <cuihaiXingqiu
      :texts="[
        1, 2, 3, 3, 4, 4, 5, 5, 5, 5, 55, 5, 5, 5, 5, 5, 5, 5, 55, 5, 5, 5,
      ]"
    /> -->
    <xingqiu-tag></xingqiu-tag>
  </div>
</template>

<script>
// dom问题
import cuihaiXingqiu from "../../components/cuihai-xingqiu/cuihai-xingqiu.vue";
// 不够好
import xingqiuTag from "../../components/scroll-earth/components/xingqiu-tag/xingqiu-tag.vue";
export default {
  components: {
    cuihaiXingqiu,
    xingqiuTag,
  },
  data() {
    return {
      title: "Hello",
    };
  },
};
</script>

<style lang="scss" scoped></style>
