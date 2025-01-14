/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-09-16 09:28:13
 * @LastEditTime: 2022-02-08 11:01:36
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\packages\components\drawings\src\rectangle\index.ts
 */
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import useDrawingSegment from '@vue-cesium/composables/use-drawing/use-drawing-segment'
import { useDrawingActionProps } from '@vue-cesium/composables/use-drawing/props'
import { drawingEmit } from '@vue-cesium/utils/emits'
import type { VcGeometryPolylineProps } from '../../../geometries'
import type { VcPolygonProps } from '../../../primitive-collections'
import type { VcPrimitiveGroundPolylineProps, VcPrimitiveProps } from '../../../primitives'
export default defineComponent({
  name: 'VcDrawingRectangle',
  props: {
    ...useDrawingActionProps,
    polylineOpts: Object as PropType<VcGeometryPolylineProps>,
    primitiveOpts: Object as PropType<VcPrimitiveProps & VcPrimitiveGroundPolylineProps>,
    polygonOpts: Object as PropType<VcPolygonProps>,
    clampToGround: Boolean,
    disableDepthTest: Boolean
  },
  emits: drawingEmit,
  setup(props, ctx) {
    // state
    return useDrawingSegment(props, ctx, 'VcDrawingRectangle')
  }
})
