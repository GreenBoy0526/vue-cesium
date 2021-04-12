## TileMap

`vc-provider-imagery-tile-mapservice` 组件用于加载由 [MapTiler](https://www.maptiler.com), [GDAL2Tiles](http://www.klokan.cz/projects/gdal2tiles/) 等生成的影像瓦片服务。**注意**：需要作为 `vc-layer-imagery` 的子组件才能正常加载。

### 基础用法

`vc-provider-imagery-tile-mapservice` 组件的基础用法。

:::demo 使用 `vc-layer-imagery` 标签在三维球上添加 `Cesium_Logo_Color` 瓦片服务图层。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady">
    <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">
      <vc-provider-imagery-tile-mapservice
        ref="provider"
        url="./SampleData/images/cesium_maptiler/Cesium_Logo_Color"
        :rectangle="[-120, 20, -60, 40]"
        :maximumLevel="4"
        @readyPromise="onImageryProviderReady"
      ></vc-provider-imagery-tile-mapservice>
    </vc-layer-imagery>
  </vc-viewer>
  <div class="demo-toolbar">
    <el-row>
      <el-button type="danger" round @click="unload">销毁</el-button>
      <el-button type="danger" round @click="load">加载</el-button>
      <el-button type="danger" round @click="reload">重载</el-button>
    </el-row>
    <el-row>
      <el-col>
        <div class="block">
          <span class="demonstration">透明度</span>
          <el-slider v-model="alpha" :min="0" :max="1" :step="0.01"></el-slider>
          <span class="demonstration">亮度</span>
          <el-slider v-model="brightness" :min="0" :max="5" :step="0.01"></el-slider>
          <span class="demonstration">对比度</span>
          <el-slider v-model="contrast" :min="0" :max="5" :step="0.01"></el-slider>
        </div>
      </el-col>
    </el-row>
  </div>
</el-row>

<script>
  import { ref, getCurrentInstance } from 'vue'
  export default {
    setup() {
      // state
      const instance = getCurrentInstance()
      const provider = ref(null)
      const alpha = ref(1)
      const brightness = ref(1)
      const contrast = ref(1)
      let viewer = undefined
      // methods
      const unload = () => {
        provider.value.unload()
      }
      const reload = () => {
        provider.value.reload()
      }
      const load = () => {
        provider.value.load()
      }
      const onImageryProviderReady = imageryProvider => {
        viewer.camera.flyTo({ destination: imageryProvider.rectangle })
      }
      const onViewerReady = cesiumInstance => {
        viewer = cesiumInstance.viewer
      }
      return {
        provider,
        unload,
        reload,
        load,
        alpha,
        brightness,
        contrast,
        onImageryProviderReady,
        onViewerReady
      }
    }
  }
</script>
```

:::

### 属性

| 属性名        | 类型           | 默认值  | 描述                                           |
| ------------- | -------------- | ------- | ---------------------------------------------- |
| url           | String\|Object | `'.'`   | `optional` 指定图片服务地址。                  |
| fileExtension | String         | `'png'` | `optional` 指定图片服务影像扩展名。            |
| credit        | String\|Object | `''`    | `optional` 指定服务版权描述信息。              |
| minimumLevel  | Number         | `0`     | `optional` 指定服务最小层级。                  |
| maximumLevel  | Number         |         | `optional` 指定服务最大层级。                  |
| rectangle     | Object         |         | `optional` 指定影像加载的矩形范围。            |
| tilingScheme  | Object         |         | `optional` 指定服务坐标系参数。                |
| ellipsoid     | Object         |         | `optional` 指定参考椭球体。默认 WGS84 椭球体。 |
| tileWidth     | Number         | `256`   | `optional` 指定图像瓦片宽度。                  |
| tileHeight    | Number         | `256`   | `optional` 指定图像瓦片高度。                  |
| flipXY        | Boolean        |         | `optional` 指定是否翻转 XY                     |

### 事件

| 事件名       | 参数                           | 描述                                                                             |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------- |
| ready        | {Cesium, viewer, cesiumObject} | 该组件渲染完毕时触发，返回 Cesium 类, viewer 实例，以及当前组件的 cesiumObject。 |
| errorEvent   | TileProviderError              | 当图层提供者发生异步错误时触发, 返回一个 TileProviderError 实例。                |
| readyPromise | ImageryProvider                | 当图层提供者可用时触发, 返回 ImageryProvider 实例。                              |

### 参考

- 官方文档： **[TileMapServiceImageryProvider](https://cesium.com/docs/cesiumjs-ref-doc/TileMapServiceImageryProvider.html)**