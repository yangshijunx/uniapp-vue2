<template>
  <div>
    <cuihaiXingqiu
      :texts="[
        1, 2, 3, 3, 4, 4, 5, 5, 5, 5, 55, 5, 5, 5, 5, 5, 5, 5, 55, 5, 5, 5, 1,
        2, 3, 3, 4, 4, 5, 5, 5, 5, 55, 5, 5, 5, 5, 5, 5, 5, 55, 5, 5, 5,
      ]"
    />
    <!-- <xingqiuTag /> -->
  </div>
</template>

<script>
import cuihaiXingqiu from "../../components/cuihai-xingqiu/cuihai-xingqiu.vue";
import xingqiuTag from "../../components/scroll-earth/components/xingqiu-tag/xingqiu-tag.vue";
export default {
  name: "test",
  components: {
    cuihaiXingqiu,
    xingqiuTag,
  },
  mounted() {
    console.log("挂载了没有");
  },
};
</script>

<style lang="scss" scoped></style>
