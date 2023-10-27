<template>
  <div class="content">
    <canvas
      type="webgl"
      id="webgl"
      style="width: 100%; height: 400px"
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
        // mainCanvas.style.fillStyle = "rgba(255, 255, 255, 0)";
        // console.log(res[0].node, "生成的canvas");
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
        camera.position.set(0, 0, 2000);
        function createS() {
          // 将文字放在画布中间
          function makeTextCanvas(text, width, height) {
            var canvas = uni.createCanvasContext(
              new Date().getTime() + "",
              this
            );
            // start
            // console.log(canvas, "canvas");
            // var c = null;
            // var backgroundImage = canvas._context.createImageData(30, 30);
            // backgroundImage.src =
            //   "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.qifeiye.com%2Fqfy-content%2Fuploads%2F2017%2F12%2F57d4413677e0bdb4d10cf2d15648472c.jpg&refer=http%3A%2F%2Fwww.qifeiye.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616827399&t=93f63af7b0ace376d428d148dbc5e588";
            // console.log(backgroundImage, "backgroundImage");
            // backgroundImage.onload = function () {
            //   canvas.width = width;
            //   canvas.height = height;
            //   c = canvas._context;
            //   c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            //   // 文字
            //   c.beginPath();
            //   c.translate(width / 2, height / 2);
            //   c.fillStyle = "#65db79"; //文本填充颜色
            //   c.font = "140px Arial"; //字体样式设置
            //   c.textBaseline = "middle"; //文本与fillText定义的纵坐标
            //   c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
            //   c.fillText(text, 0, 0);
            // };
            // end
            canvas.width = width;
            canvas.height = height;
            var c = canvas._context;
            // 清空画布
            c.clearRect(0, 0, width, height);
            // canvas背景方便调试
            // c.beginPath();
            // c.rect(0, 0, width, height);
            // c.fillStyle = "#000";
            // c.fill();
            // c.beginPath();
            // 平移
            c.translate(width / 2, 40);
            c.fillStyle = "#65db79"; //文本填充颜色
            c.font = "40px Arial"; //字体样式设置
            c.textBaseline = "middle"; //文本与fillText定义的纵坐标
            c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
            c.fillText(text, 0, 0);
            // 画一个空心的红色的圆
            c.beginPath();
            c.arc(0, 60, 20, 0, Math.PI * 2, true);
            c.fillStyle = "red";
            c.fill();
            c.beginPath();
            c.arc(0, 60, 10, 0, Math.PI * 2, true);
            c.fillStyle = "#fff";
            c.fill();
            return c.canvas;
          }
          var textCanvas = makeTextCanvas("hellomnbv", 300, 160);
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
          sprite.scale.set(300, 160, 1);
          // 间距
          sprite.position.setFromSphericalCoords(600, phi, theta);
          group.add(sprite);
        }
        scene.add(group);
        var renderer = new THREE.WebGLRenderer({
          antialias: true,
          // 背景透明
          alpha: true,
        });
        // renderer.setSize(300, 500); //设置渲染区域尺寸
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(uni.getSystemInfoSync().pixelRatio);
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

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
