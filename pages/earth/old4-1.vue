<template>
  <view id="page">
    <canvas
      id="canvas_webgl"
      type="webgl"
      @touchstart="webgl_touch"
      @touchmove="webgl_touch"
      @touchend="webgl_touch"
      @touchcancel="webgl_touch"
    ></canvas>
  </view>
</template>

<script>
import {
  document,
  window,
  Event,
  requestAnimationFrame,
  cancelAnimationFrame,
} from "dhtml-uniapp";
import * as THREE from "../../three/Three.js";

import { OrbitControls } from "../jsm/controls/OrbitControls.js";
var requestId;

export default {
  data() {
    return {
      setting: {
        color: "#00ff00",
        width: 1,
        height: 2,
        depth: 3,
      },
    };
  },
  onUnload() {
    cancelAnimationFrame(requestId, this.canvas);
    this.worker && this.worker.terminate();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null;
  },
  onLoad() {
    console.log("执行1", requestAnimationFrame);
    document
      .createElementAsync("canvas", "webgl")
      .then((canvas) => this.run(canvas).then());
  },

  methods: {
    webgl_touch(e) {
      const web_e = Event.fix(e);
      this.canvas.dispatchEvent(web_e);
    },
    createMesh() {
      if (this.mesh) {
        this.scene.remove(this.mesh);
      }
      var material = new THREE.MeshLambertMaterial({
        color: this.setting.color,
      });
      var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(
          this.setting.width,
          this.setting.height,
          this.setting.depth
        ),
        material
      );

      this.scene.add(mesh);
      this.mesh = mesh;
    },
    async run(canvas) {
      var that = this;
      this.canvas = canvas;
      var renderer = (this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
      }));
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;

      var scene = (this.scene = new THREE.Scene());
      scene.background = "#888888";
      var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      camera.position.set(10, 5, 10);
      camera.lookAt(scene.position);
      //
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = true;
      controls.enableZoom = true;
      controls.update();
      /////////////////////////////////////////
      const light0 = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(light0);
      //
      const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
      light1.position.set(-5, 10, 5);
      scene.add(light1);
      //////////////////////////////////
      that.createMesh();

      ////////////////////////////////
      function animate() {
        requestAnimationFrame(() => {
          animate();
        });
        renderer.render(scene, camera);
      }
      animate();
    },
  },
};
</script>
<style>
page {
  width: 100%;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
