(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[170],{

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm-browser.js
var vue_esm_browser = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/dist/templateLoader.js??ref--6!./node_modules/vue-loader/dist??ref--2-0!./website/md-loader!./website/docs/zh-CN/datasources/vc-datasource-geojson.md?vue&type=template&id=09cbaa14

const vc_datasource_geojsonvue_type_template_id_09cbaa14_hoisted_1 = {
  class: "content element-doc"
};

const vc_datasource_geojsonvue_type_template_id_09cbaa14_hoisted_2 = /*#__PURE__*/Object(vue_esm_browser["createStaticVNode"])("<h2 id=\"vcdatasourcegeojson\"><a class=\"header-anchor\" href=\"#vcdatasourcegeojson\">¶</a> VcDatasourceGeojson</h2><p>加载 <a href=\"https://geojson.org/\">GeoJSON</a> 和 <a href=\"https://github.com/topojson/topojson\">TopoJSON</a> 格式的数据源。相当于初始化一个 <code>Cesium.GeoJsonDataSource</code> 实例。</p><h3 id=\"ji-chu-yong-fa\"><a class=\"header-anchor\" href=\"#ji-chu-yong-fa\">¶</a> 基础用法</h3><p>GeoJson 数据源组件的基础用法。</p>", 4);

const _hoisted_6 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("div", null, [/*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("p", null, [/*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("使用 "), /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("code", null, "vc-datasource-geojson"), /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" 标签在三维球上添加 GeoJSON 格式数据源对象。")])], -1);

const _hoisted_7 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("pre", null, [/*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("code", {
  class: "html"
}, "<el-row ref=\"viewerContainer\" class=\"demo-viewer\">\n  <vc-viewer>\n    <vc-datasource-geojson\n      ref=\"datasourceRef\"\n      data=\"./SampleData/geojson/china.json\"\n      @ready=\"onDatasourceReady\"\n      :show=\"show\"\n      stroke=\"red\"\n      @click=\"onClicked\"\n      :entities=\"entities\"\n    ></vc-datasource-geojson>\n  </vc-viewer>\n  <el-row class=\"demo-toolbar\">\n    <el-button type=\"danger\" round @click=\"unload\">销毁</el-button>\n    <el-button type=\"danger\" round @click=\"load\">加载</el-button>\n    <el-button type=\"danger\" round @click=\"reload\">重载</el-button>\n    <el-switch v-model=\"show\" active-color=\"#13ce66\" inactive-text=\"显示/隐藏\"> </el-switch>\n  </el-row>\n</el-row>\n\n<script>\n  import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'\n  export default {\n    setup() {\n      // state\n      const show = ref(true)\n      const datasourceRef = ref(null)\n      const entities = reactive([])\n      for (let i = 0; i < 1000; i++) {\n        entities.push({\n          position: [Math.random() * 40 + 85, Math.random() * 30 + 21],\n          label: {\n            text: i.toString(),\n            pixelOffset: { x: 25, y: 20 }\n          },\n          point: {\n            pixelSize: 8,\n            outlineWidth: 2,\n            color: 'red',\n            outlineColor: 'yellow'\n          }\n        })\n      }\n      // methods\n      const onClicked = e => {\n        console.log(e)\n      }\n      const unload = () => {\n        datasourceRef.value.unload()\n      }\n      const reload = () => {\n        datasourceRef.value.reload()\n      }\n      const load = () => {\n        datasourceRef.value.load()\n      }\n      const onDatasourceReady = ({ Cesium, viewer, cesiumObject }) => {\n        viewer.zoomTo(cesiumObject)\n      }\n\n      return {\n        unload,\n        reload,\n        load,\n        show,\n        onClicked,\n        onDatasourceReady,\n        datasourceRef,\n        entities\n      }\n    }\n  }\n</script>\n")], -1);

const _hoisted_8 = /*#__PURE__*/Object(vue_esm_browser["createStaticVNode"])("<h3 id=\"shu-xing\"><a class=\"header-anchor\" href=\"#shu-xing\">¶</a> 属性</h3><table><thead><tr><th>属性名</th><th>类型</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td>data</td><td>String|Object</td><td></td><td><code>required</code> 指定要加载的 GeoJSON 或者 TopoJSON 的 url。</td></tr><tr><td>show</td><td>Boolean</td><td><code>true</code></td><td><code>optional</code> 指定数据源是否显示。</td></tr><tr><td>enableMouseEvent</td><td>Boolean</td><td><code>true</code></td><td><code>optional</code> 指定鼠标事件是否生效。</td></tr><tr><td>entities</td><td>Array</td><td><code>[]</code></td><td><code>optional</code> 指定要添加到该数据源的实体集合。</td></tr><tr><td>sourceUri</td><td>String</td><td></td><td><code>optional</code> 指定引用资源 url 的相对路径。</td></tr><tr><td>describe</td><td>Function</td><td></td><td><code>optional</code> 指定数据源描述信息函数，该函数返回一个字符串，将属性转换为 html 描述。</td></tr><tr><td>markerSize</td><td>Number</td><td><code>48</code></td><td><code>optional</code> 指定点对象创建的图钉的像素大小。</td></tr><tr><td>markerSymbol</td><td>String</td><td></td><td><code>optional</code> 指定点对象创建的图钉的风格符号。</td></tr><tr><td>markerColor</td><td>Object|String|Array</td><td></td><td><code>optional</code> 指定点对象创建的图钉的颜色。</td></tr><tr><td>stroke</td><td>Object|String|Array</td><td></td><td><code>optional</code> 指定线、面对象的边框颜色。</td></tr><tr><td>strokeWidth</td><td>Number</td><td><code>2</code></td><td><code>optional</code> 指定线、面对象的边框宽度。</td></tr><tr><td>fill</td><td>Object|String|Array</td><td></td><td><code>optional</code> 指定面对象的填充色。</td></tr><tr><td>clampToGround</td><td>Boolean</td><td><code>false</code></td><td><code>optional</code> 指定对象是否贴地。</td></tr><tr><td>credit</td><td>String|Object</td><td></td><td><code>optional</code> 指定数据源描述信息。</td></tr></tbody></table><h3 id=\"shi-jian\"><a class=\"header-anchor\" href=\"#shi-jian\">¶</a> 事件</h3><table><thead><tr><th>事件名</th><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>beforeLoad</td><td>Vue Instance</td><td>对象加载前触发。</td></tr><tr><td>ready</td><td>{Cesium, viewer, cesiumObject, vm}</td><td>对象加载成功时触发。</td></tr><tr><td>destroyed</td><td>Vue Instance</td><td>对象销毁时触发。</td></tr><tr><td>changedEvent</td><td></td><td>数据源改变时触发。</td></tr><tr><td>errorEvent</td><td></td><td>数据源发生错误时触发。</td></tr><tr><td>loadingEvent</td><td></td><td>数据源开始或结束加载时触发。</td></tr><tr><td>clusterEvent</td><td>(clusteredEntities, cluster)</td><td>数据源聚合事件。</td></tr><tr><td>collectionChanged</td><td>(collection, added, removed, changed)</td><td>数据源实体集合改变时触</td></tr><tr><td>mousedown</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标在该数据源上按下时触发。</td></tr><tr><td>mouseup</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标在该数据源上弹起时触发。</td></tr><tr><td>click</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标单击该数据源时触发。</td></tr><tr><td>clickout</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标单击该数据源外部时触发。</td></tr><tr><td>dblclick</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标左键双击该数据源时触发。</td></tr><tr><td>mousemove</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标在该数据源上移动时触发。</td></tr><tr><td>mouseover</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标移动到该数据源时触发。</td></tr><tr><td>mouseout</td><td>{button,surfacePosition,pickedFeature,type,windowPosition}</td><td>鼠标移出该数据源时触发。</td></tr></tbody></table><h3 id=\"can-kao\"><a class=\"header-anchor\" href=\"#can-kao\">¶</a> 参考</h3><ul><li>官方文档： <strong><a href=\"https://cesium.com/docs/cesiumjs-ref-doc/GeoJsonDataSource.html\">GeoJsonDataSource</a></strong></li></ul>", 6);

function vc_datasource_geojsonvue_type_template_id_09cbaa14_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_vue_cesium_demo0 = Object(vue_esm_browser["resolveComponent"])("vue-cesium-demo0");

  const _component_demo_block = Object(vue_esm_browser["resolveComponent"])("demo-block");

  const _component_right_nav = Object(vue_esm_browser["resolveComponent"])("right-nav");

  return Object(vue_esm_browser["openBlock"])(), Object(vue_esm_browser["createElementBlock"])("section", vc_datasource_geojsonvue_type_template_id_09cbaa14_hoisted_1, [vc_datasource_geojsonvue_type_template_id_09cbaa14_hoisted_2, Object(vue_esm_browser["createVNode"])(_component_demo_block, null, {
    source: Object(vue_esm_browser["withCtx"])(() => [Object(vue_esm_browser["createVNode"])(_component_vue_cesium_demo0)]),
    highlight: Object(vue_esm_browser["withCtx"])(() => [_hoisted_7]),
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_6]),
    _: 1
  }), _hoisted_8, Object(vue_esm_browser["createVNode"])(_component_right_nav)]);
}
// CONCATENATED MODULE: ./website/docs/zh-CN/datasources/vc-datasource-geojson.md?vue&type=template&id=09cbaa14

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/dist??ref--2-0!./website/md-loader!./website/docs/zh-CN/datasources/vc-datasource-geojson.md?vue&type=script&lang=ts

/* harmony default export */ var vc_datasource_geojsonvue_type_script_lang_ts = ({
  name: 'component-doc',
  components: {
    "vue-cesium-demo0": function () {
      const {
        resolveComponent: _resolveComponent,
        createVNode: _createVNode,
        withCtx: _withCtx,
        createTextVNode: _createTextVNode,
        openBlock: _openBlock,
        createElementBlock: _createElementBlock
      } = vue_esm_browser;

      const _hoisted_1 = /*#__PURE__*/_createTextVNode("销毁");

      const _hoisted_2 = /*#__PURE__*/_createTextVNode("加载");

      const _hoisted_3 = /*#__PURE__*/_createTextVNode("重载");

      function render(_ctx, _cache) {
        const _component_vc_datasource_geojson = _resolveComponent("vc-datasource-geojson");

        const _component_vc_viewer = _resolveComponent("vc-viewer");

        const _component_el_button = _resolveComponent("el-button");

        const _component_el_switch = _resolveComponent("el-switch");

        const _component_el_row = _resolveComponent("el-row");

        return _openBlock(), _createElementBlock("div", null, [_createVNode(_component_el_row, {
          ref: "viewerContainer",
          class: "demo-viewer"
        }, {
          default: _withCtx(() => [_createVNode(_component_vc_viewer, null, {
            default: _withCtx(() => [_createVNode(_component_vc_datasource_geojson, {
              ref: "datasourceRef",
              data: "./SampleData/geojson/china.json",
              onReady: _ctx.onDatasourceReady,
              show: _ctx.show,
              stroke: "red",
              onClick: _ctx.onClicked,
              entities: _ctx.entities
            }, null, 8, ["onReady", "show", "onClick", "entities"])]),
            _: 1
          }), _createVNode(_component_el_row, {
            class: "demo-toolbar"
          }, {
            default: _withCtx(() => [_createVNode(_component_el_button, {
              type: "danger",
              round: "",
              onClick: _ctx.unload
            }, {
              default: _withCtx(() => [_hoisted_1]),
              _: 1
            }, 8, ["onClick"]), _createVNode(_component_el_button, {
              type: "danger",
              round: "",
              onClick: _ctx.load
            }, {
              default: _withCtx(() => [_hoisted_2]),
              _: 1
            }, 8, ["onClick"]), _createVNode(_component_el_button, {
              type: "danger",
              round: "",
              onClick: _ctx.reload
            }, {
              default: _withCtx(() => [_hoisted_3]),
              _: 1
            }, 8, ["onClick"]), _createVNode(_component_el_switch, {
              modelValue: _ctx.show,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.show = $event),
              "active-color": "#13ce66",
              "inactive-text": "显示/隐藏"
            }, null, 8, ["modelValue"])]),
            _: 1
          })]),
          _: 1
        }, 512)]);
      }

      const {
        ref,
        reactive,
        getCurrentInstance,
        onMounted,
        watch
      } = vue_esm_browser;
      const democomponentExport = {
        setup() {
          // state
          const show = ref(true);
          const datasourceRef = ref(null);
          const entities = reactive([]);

          for (let i = 0; i < 1000; i++) {
            entities.push({
              position: [Math.random() * 40 + 85, Math.random() * 30 + 21],
              label: {
                text: i.toString(),
                pixelOffset: {
                  x: 25,
                  y: 20
                }
              },
              point: {
                pixelSize: 8,
                outlineWidth: 2,
                color: 'red',
                outlineColor: 'yellow'
              }
            });
          } // methods


          const onClicked = e => {
            console.log(e);
          };

          const unload = () => {
            datasourceRef.value.unload();
          };

          const reload = () => {
            datasourceRef.value.reload();
          };

          const load = () => {
            datasourceRef.value.load();
          };

          const onDatasourceReady = ({
            Cesium,
            viewer,
            cesiumObject
          }) => {
            viewer.zoomTo(cesiumObject);
          };

          return {
            unload,
            reload,
            load,
            show,
            onClicked,
            onDatasourceReady,
            datasourceRef,
            entities
          };
        }

      };
      return {
        render,
        ...democomponentExport
      };
    }()
  }
});
// CONCATENATED MODULE: ./website/docs/zh-CN/datasources/vc-datasource-geojson.md?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./website/docs/zh-CN/datasources/vc-datasource-geojson.md



vc_datasource_geojsonvue_type_script_lang_ts.render = vc_datasource_geojsonvue_type_template_id_09cbaa14_render

/* harmony default export */ var vc_datasource_geojson = __webpack_exports__["default"] = (vc_datasource_geojsonvue_type_script_lang_ts);

/***/ })

}]);