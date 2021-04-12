import { defineComponent, getCurrentInstance, h, provide } from 'vue'
import { Cesium as CesiumNative, VcComponentInternalInstance } from '@vue-cesium/utils/types'
import { hSlot } from '@vue-cesium/utils/private/render'
import { useCommon } from '@vue-cesium/composables'
import defaultProps from './defaultProps'
import { getInstanceListener } from '@vue-cesium/utils/private/vm'
import { kebabCase } from '@vue-cesium/utils/util'

export default defineComponent({
  name: 'VcLayerImagery',
  props: defaultProps,
  emits: ['beforeLoad', 'ready', 'destroyed', 'update:imageryProvider'],
  setup (props, ctx) {
    // state
    const instance = getCurrentInstance() as VcComponentInternalInstance
    instance.cesiumClass = 'ImageryLayer'
    instance.cesiumEvents = []
    const commonState = useCommon(props, ctx, instance)
    if (commonState === void 0) {
      return
    }
    const { $services } = commonState
    const { emit } = ctx
    // methods
    instance.createCesiumObject = async () => {
      const options = commonState.transformProps(props)
      const imageryProvider = (props.imageryProvider || {}) as CesiumNative.ImageryProvider
      return new Cesium.ImageryLayer(imageryProvider, options)
    }
    instance.mount = async () => {
      const { viewer } = $services
      const imageryLayer = instance.cesiumObject as CesiumNative.ImageryLayer
      imageryLayer.sortOrder = props.sortOrder
      viewer.imageryLayers.add(imageryLayer)
      return !viewer.isDestroyed() && viewer.imageryLayers.contains(imageryLayer)
    }
    instance.unmount = async () => {
      const { viewer } = $services
      const imageryLayer = instance.cesiumObject as CesiumNative.ImageryLayer
      return !viewer.isDestroyed() && viewer.imageryLayers.remove(imageryLayer)
    }

    const setProvider = provider => {
      const imageryLayer = instance.cesiumObject as CesiumNative.ImageryLayer
      (imageryLayer as any)._imageryProvider = provider
      const listener = getInstanceListener(instance, 'update:imageryProvider')
      if (listener) emit('update:imageryProvider', provider)
      return true
    }

    // expose public methods
    Object.assign(instance.proxy, {
      createPromise: commonState.createPromise,
      load: commonState.load,
      unload: commonState.unload,
      reload: commonState.reload,
      getCesiumObject: () => instance.cesiumObject,
      // private but needed by VcProviderXXX
      __setProvider: setProvider
    })

    return () => (
      h('i', {
        class: kebabCase(instance.proxy.$options.name),
        style: { display: 'none !important' }
      }, hSlot(ctx.slots.default))
    )
  }
})