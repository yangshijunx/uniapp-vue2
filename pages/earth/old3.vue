<template>
  <div style="background-color: aqua">
    <!-- <cuihaiXingqiu
      :texts="[
        1, 2, 3, 3, 4, 4, 5, 5, 5, 5, 55, 5, 5, 5, 5, 5, 5, 5, 55, 5, 5, 5, 1,
        2, 3, 3, 4, 4, 5, 5, 5, 5, 55, 5, 5, 5, 5, 5, 5, 5, 55, 5, 5, 5,
      ]"
    /> -->
    <!-- <xingqiu-tag></xingqiu-tag> -->
    <canvas
      type="2d"
      canvas-id="myCanvas"
      id="myCanvas"
      class="myCanvas"
    ></canvas>
  </div>
</template>

<script>
// dom问题
import cuihaiXingqiu from "../../components/cuihai-xingqiu/cuihai-xingqiu.vue";
// 不够好
import xingqiuTag from "../../components/scroll-earth/components/xingqiu-tag/xingqiu-tag.vue";
import * as THREE from "../../lib/three.weapp.js";
import { OrbitControls } from "../../lib/OrbitControls";
export default {
  components: {
    cuihaiXingqiu,
    xingqiuTag,
  },
  data() {
    return {
      title: "Hello",
      ctx: null,
    };
  },
  mounted() {
    console.log("挂载");
    var scene = new THREE.Scene();
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    //scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 相机设置
     */
    var width;
    var height;
    var c;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth; // 获取屏幕宽度
        height = res.windowHeight; // 获取屏幕高
      },
    });
    var camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
    camera.position.set(0, 0, 3000);
    uni
      .createSelectorQuery()
      .in(this)
      .select("#myCanvas")
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        console.log("获取到的结果", res);
        if (!res[0] || !res[0].node)
          return console.error("lucky-canvas 获取不到 canvas 标签");
        const { node, width, height } = res[0];
        const canvas1 = node;
        const ctx = canvas1.getContext("2d");
        this.ctx = canvas1.getContext("2d");
        console.log("实例", this.ctx);
        function createS() {
          // 将文字放在画布中间
          function makeTextCanvas(text, width, height) {
            // var canvas = document.createElement("canvas");
            var canvas = node;
            console.log("node对不对", canvas);
            canvas.width = width;
            canvas.height = height;
            var c = ctx;
            console.log("c对不对", c);
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            // 文字
            c.beginPath();
            c.translate(width / 2, height / 2);
            c.fillStyle = "#ffffff"; //文本填充颜色
            c.font = "10px Arial"; //字体样式设置
            c.textBaseline = "middle"; //文本与fillText定义的纵坐标
            c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
            c.fillText(text, 0, 0);
            // document.body.appendChild(canvas)
            return c.canvas;
          }
          var textCanvas = makeTextCanvas("hello", 160, 80);
          var texture = new THREE.CanvasTexture(textCanvas);
          console.log("texture对不对", texture);
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          let pinMaterial = new THREE.SpriteMaterial({
            map: texture,
          });
          let mesh = new THREE.Sprite(pinMaterial);
          console.log("mesh对不对", mesh);
          return mesh;
        }
        let group = new THREE.Group();
        for (var i = 0, l = 60; i < l; i++) {
          var phi = Math.acos(-1 + (2 * i) / l);
          var theta = Math.sqrt(l * Math.PI) * phi;
          var sprite = createS();
          sprite.scale.set(80, 40, 1);
          sprite.position.setFromSphericalCoords(800, phi, theta);
          //sphere.push(sprite)
          group.add(sprite);
        }
        console.log("最终分组", group);
        scene.add(group);
        /**
         * 创建渲染器对象
         */
        console.log("构造函数不存在？", THREE.WebGLRenderer);
        var renderer = new THREE.WebGLRenderer({
          canvas: canvas1,
          antialias: true,
        });
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.shadowMap.enabled = false;
        //renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera);
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        function render() {
          renderer.render(scene, camera); //执行渲染操作
          group.rotateY(-0.001); //每次绕y轴旋转0.01弧度
          group.rotateX(0.001);
          controls.update();
          requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        render();
      });
  },
};
</script>

<style lang="scss" scoped></style>
