<template>
  <div class="content">
    <canvas
      type="webgl"
      id="webgl"
      style="width: 100%; height: 500px"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    ></canvas>
  </div>
</template>

<script>
import * as THREE from "@/common/threejs/three.weapp.js";
import { OrbitControls } from "@/common/controls/OrbitControls.js";
export default {
  onLoad: function () {
    uni
      .createSelectorQuery()
      .in(this)
      .select("#webgl")
      .node()
      .exec((res) => {
        let canvasId = res[0].node._canvasId;
        const mainCanvas = THREE.global.registerCanvas(canvasId, res[0].node);
        console.log(res[0].node, "生成的canvas");
        var scene = new THREE.Scene();
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300);
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        var width = 100; //窗口宽度
        var height = 300; //窗口高度
        var camera = new THREE.PerspectiveCamera(
          40,
          mainCanvas.width / mainCanvas.height,
          1,
          10000
        );
        camera.position.set(0, 0, 3000);
        function createS() {
          // 将文字放在画布中间
          function makeTextCanvas(text, width, height) {
            var canvas = uni.createCanvasContext(
              new Date().getTime() + "",
              this
            );
            canvas.width = width;
            canvas.height = height;
            var c = canvas._context;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            // 文字
            c.beginPath();
            c.translate(width / 2, height / 2);
            c.fillStyle = "#ffffff"; //文本填充颜色
            c.font = "140px Arial"; //字体样式设置
            c.textBaseline = "middle"; //文本与fillText定义的纵坐标
            c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
            c.fillText(text, 0, 0);
            return c.canvas;
          }
          var textCanvas = makeTextCanvas("hello", 300, 190);
          var texture = new THREE.CanvasTexture(textCanvas);
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          let pinMaterial = new THREE.SpriteMaterial({
            map: texture,
          });
          let mesh = new THREE.Sprite(pinMaterial);
          // console.log("mesh", mesh);
          return mesh;
        }
        let group = new THREE.Group();
        for (var i = 0, l = 60; i < l; i++) {
          var phi = Math.acos(-1 + (2 * i) / l);
          var theta = Math.sqrt(l * Math.PI) * phi;
          var sprite = createS();
          // 宽，高，
          sprite.scale.set(80, 40, 1);
          // 尺寸
          sprite.position.setFromSphericalCoords(800, phi, theta);
          group.add(sprite);
        }
        scene.add(group);
        var renderer = new THREE.WebGLRenderer({
          antialias: true,
        });
        renderer.setSize(300, 500); //设置渲染区域尺寸
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(uni.getSystemInfoSync().pixelRatio);
        // var bodyNode = uni.createSelectorQuery().select(".content");
        // console.log(bodyNode, "获取到的body");
        // bodyNode.appendChild(renderer.domElement);
        renderer.render(scene, camera);
        var controls = new OrbitControls(camera, renderer.domElement);
        function render() {
          renderer.render(scene, camera); //执行渲染操作
          group.rotateY(-0.001); //每次绕y轴旋转0.01弧度
          group.rotateX(0.001);
          controls.update();
          mainCanvas.requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        render();
      });
  },
  methods: {
    touchStart(e) {
      THREE.global.touchEventHandlerFactory("canvas", "touchstart")(e);
    },
    touchMove(e) {
      THREE.global.touchEventHandlerFactory("canvas", "touchmove")(e);
    },
    touchEnd(e) {
      THREE.global.touchEventHandlerFactory("canvas", "touchend")(e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
