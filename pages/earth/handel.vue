<template>
  <div class="content">
    <canvas type="webgl" id="webgl" style="width: 100%; height: 100%"></canvas>
  </div>
</template>

<script>
import * as THREE from "@/common/threejs/three.weapp.js";
import { OrbitControls } from "@/common/controls/OrbitControls.js";
export default {
  name: "threejs",
  data() {
    return {
      camera: null,
      scene: null,
    };
  },
  onLoad: function () {
    uni
      .createSelectorQuery()
      .in(this)
      .select("#webgl")
      .node()
      .exec((res) => {
        let canvasId = res[0].node._canvasId;
        const canvas = THREE.global.registerCanvas(canvasId, res[0].node);
        this.cubes(canvas, THREE);
      });
  },
  methods: {
    cubes(canvas, THREE) {},
  },
};
</script>

<style lang="scss" scoped></style>
