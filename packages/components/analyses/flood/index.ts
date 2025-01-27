/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-12-31 10:30:21
 * @LastEditTime: 2022-01-14 14:52:57
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\packages\components\analyses\flood\index.ts
 */
import { defineComponent, getCurrentInstance, PropType, ref, h, createCommentVNode, WatchStopHandle, onUnmounted, watch } from 'vue'
import { polygonHierarchy } from '@vue-cesium/utils/cesium-props'
import { VcComponentInternalInstance, VcComponentPublicInstance } from '@vue-cesium/utils/types'
import { makeColor } from '@vue-cesium/utils/cesium-helpers'
import { VcPrimitiveClassification } from '@vue-cesium/components/primitives'
import { VcGeometryInstance } from '@vue-cesium/components/geometry-instance'
import { VcGeometryPolygon } from '@vue-cesium/components/geometries'
import { getInstanceListener, getVcParentInstance } from '@vue-cesium/utils/private/vm'
import { useCommon } from '@vue-cesium/composables'

export default defineComponent({
  name: 'VcAnalysisFlood',
  props: {
    minHeight: {
      type: Number,
      default: -1
    },
    maxHeight: {
      type: Number,
      default: 8888
    },
    speed: {
      type: Number,
      default: 10
    },
    loop: {
      type: Boolean,
      default: false
    },
    color: {
      type: [Object, Array, String] as PropType<Cesium.Color>,
      default: 'rgba(40,150,200,0.6)'
    },
    ...polygonHierarchy
  },
  emits: ['beforeLoad', 'ready', 'destroyed', 'stop'],
  setup(props, ctx) {
    const instance = getCurrentInstance() as VcComponentInternalInstance
    instance.cesiumClass = 'VcAnalysisFlood'
    instance.cesiumEvents = []

    const commonState = useCommon(props, ctx, instance)
    if (commonState === void 0) {
      return
    }

    const { emit } = ctx

    const canRender = ref(false)

    const vcParent = getVcParentInstance(instance)
    ;(vcParent.proxy as VcComponentPublicInstance).createPromise?.then(() => {
      canRender.value = true
    })

    const flooding = ref(false)
    const attributes = ref<any>(null)
    const extrudedHeight = ref(-1)
    const childRef = ref<Cesium.ClassificationPrimitive | null>(null)
    let stoped = false

    // watcch
    let unwatchFns: Array<WatchStopHandle> = []
    unwatchFns.push(
      watch(
        () => props.minHeight,
        val => {
          extrudedHeight.value = val
        }
      )
    )

    // methods
    instance.createCesiumObject = async () => {
      const { ColorGeometryInstanceAttribute } = Cesium

      attributes.value = {
        color: ColorGeometryInstanceAttribute.fromColor(makeColor(props.color) as Cesium.Color)
      }

      return childRef.value
    }

    instance.mount = async () => {
      const { viewer } = commonState.$services
      viewer.clock.onTick.addEventListener(onClockTick)
      return true
    }

    instance.unmount = async () => {
      const { viewer } = commonState.$services
      viewer.clock.onTick.removeEventListener(onClockTick)
      extrudedHeight.value = -1
      flooding.value = false
      return true
    }

    const onClockTick = () => {
      if (flooding.value) {
        if (extrudedHeight.value <= props.maxHeight) {
          extrudedHeight.value += props.speed
          stoped = false
        } else {
          const listener = getInstanceListener(instance, 'stop')
          listener && emit('stop', childRef.value)
          stoped = true
          if (props.loop) {
            extrudedHeight.value = props.minHeight
          } else {
            flooding.value = false
          }
        }
      }
    }

    const start = () => {
      extrudedHeight.value = props.minHeight
      flooding.value = true
    }

    const pause = () => {
      flooding.value = !flooding.value
      if (stoped) {
        extrudedHeight.value = props.minHeight
      }
    }

    const stop = () => {
      extrudedHeight.value = -1
      flooding.value = false
    }

    // life cycle
    onUnmounted(() => {
      unwatchFns.forEach(item => item())
      unwatchFns = []
    })

    // expose public methods
    Object.assign(instance.proxy, {
      childRef,
      start,
      pause,
      stop
    })

    return () => {
      if (canRender.value) {
        const { createGuid } = Cesium

        return h(
          VcPrimitiveClassification,
          {
            asynchronous: false,
            ref: childRef
          },
          () =>
            h(
              VcGeometryInstance,
              {
                id: createGuid(),
                attributes: attributes.value
              },
              () =>
                h(VcGeometryPolygon, {
                  extrudedHeight: extrudedHeight.value,
                  polygonHierarchy: props.polygonHierarchy
                })
            )
        )
      } else {
        return createCommentVNode('v-if')
      }
    }
  }
})
