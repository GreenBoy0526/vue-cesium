import { defineComponent, getCurrentInstance, ref, reactive } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { measurementsProps, defaultOptions } from './defaultProps'
import { camelize } from '@vue-cesium/utils/util'
import { VcFabAction, VcFabProps } from '@vue-cesium/components/ui'
import VcMeasurementDistance from './distance'
import VcMeasurementPolyline from './polyline'
import VcMeasurementHorizontal from './horizontal'
import VcMeasurementVertical from './vertical'
import VcMeasurementHeight from './height'
import VcMeasurementPoint from './point'
import VcMeasurementArea from './area'
import VcMeasurementRectangle from './rectangle'
import VcMeasurementRegular from './regular'
import type {
  MeasurementActionCmpOpts,
  MeasurementActionCmpRef,
  MeasurementActionOpts,
  VcComponentDistanceMeasurementOpts,
  VcDrawingActionInstance,
  VcHorizontalMeasurementOpts,
  VcMeasurementOpts,
  VcPolylineMeasurementOpts,
  VcRegularMeasurementOpts
} from '@vue-cesium/utils/drawing-types'
import type { VcActionTooltipProps, VcComponentInternalInstance } from '@vue-cesium/utils/types'
import { useLocale } from '@vue-cesium/composables'
import useDrawingFab from '@vue-cesium/composables/use-drawing/use-drawing-fab'
import { drawingEmit } from '@vue-cesium/utils/emits'

const emits = {
  ...drawingEmit,
  fabUpdated: (value: boolean) => true
}
export default defineComponent({
  name: 'VcMeasurements',
  props: measurementsProps,
  emits: emits,
  setup(props: ExtractPropTypes<typeof measurementsProps>, ctx) {
    // state
    const instance = getCurrentInstance() as VcComponentInternalInstance
    instance.cesiumClass = 'VcMeasurements'
    const { t } = useLocale()

    const clearActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.clearActionOpts, props.clearActionOpts))
    const mainFabOpts = reactive<VcActionTooltipProps & VcFabProps>(Object.assign({}, defaultOptions.mainFabOpts, props.mainFabOpts))

    const distanceActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.distanceActionOpts, props.distanceActionOpts))
    const distanceMeasurementOpts = reactive<VcMeasurementOpts>(
      Object.assign({}, defaultOptions.distanceMeasurementOpts, props.distanceMeasurementOpts)
    )

    const componentDistanceActionOpts = reactive<VcActionTooltipProps>(
      Object.assign({}, defaultOptions.componentDistanceActionOpts, props.componentDistanceActionOpts)
    )
    const componentDistanceMeasurementOpts = reactive<VcComponentDistanceMeasurementOpts>(
      Object.assign({}, defaultOptions.componentDistanceMeasurementOpts, props.componentDistanceMeasurementOpts)
    )

    const polylineActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.polylineActionOpts, props.polylineActionOpts))
    const polylineMeasurementOpts = reactive<VcPolylineMeasurementOpts>(
      Object.assign({}, defaultOptions.polylineMeasurementOpts, props.polylineMeasurementOpts)
    )

    const horizontalActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.horizontalActionOpts, props.horizontalActionOpts))
    const horizontalMeasurementOpts = reactive<VcHorizontalMeasurementOpts>(
      Object.assign({}, defaultOptions.horizontalMeasurementOpts, props.horizontalMeasurementOpts)
    )

    const verticalActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.verticalActionOpts, props.verticalActionOpts))
    const verticalMeasurementOpts = reactive<VcMeasurementOpts>(
      Object.assign({}, defaultOptions.verticalMeasurementOpts, props.verticalMeasurementOpts)
    )

    const heightActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.heightActionOpts, props.heightActionOpts))
    const heightMeasurementOpts = reactive<VcMeasurementOpts>(Object.assign({}, defaultOptions.heightMeasurementOpts, props.heightMeasurementOpts))

    const areaActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.areaActionOpts, props.areaActionOpts))
    const areaMeasurementOpts = reactive<VcPolylineMeasurementOpts>(Object.assign({}, defaultOptions.areaMeasurementOpts, props.areaMeasurementOpts))

    const pointActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.pointActionOpts, props.pointActionOpts))
    const pointMeasurementOpts = reactive<VcMeasurementOpts>(Object.assign({}, defaultOptions.pointMeasurementOpts, props.pointMeasurementOpts))

    const rectangleActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.rectangleActionOpts, props.rectangleActionOpts))
    const rectangleMeasurementOpts = reactive<VcRegularMeasurementOpts>(
      Object.assign({}, defaultOptions.rectangleMeasurementOpts, props.rectangleMeasurementOpts)
    )

    const regularActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.regularActionOpts, props.regularActionOpts))
    const regularMeasurementOpts = reactive<VcRegularMeasurementOpts>(
      Object.assign({}, defaultOptions.regularMeasurementOpts, props.regularMeasurementOpts)
    )

    const circleActionOpts = reactive<VcActionTooltipProps>(Object.assign({}, defaultOptions.circleActionOpts, props.circleActionOpts))
    const circleMeasurementOpts = reactive<VcRegularMeasurementOpts>(
      Object.assign({}, defaultOptions.circleMeasurementOpts, props.circleMeasurementOpts)
    )

    const options: any = {}
    options.distanceActionOpts = distanceActionOpts
    options.distanceMeasurementOpts = distanceMeasurementOpts
    options.componentDistanceActionOpts = componentDistanceActionOpts
    options.componentDistanceMeasurementOpts = componentDistanceMeasurementOpts
    options.polylineActionOpts = polylineActionOpts
    options.polylineMeasurementOpts = polylineMeasurementOpts
    options.horizontalActionOpts = horizontalActionOpts
    options.horizontalMeasurementOpts = horizontalMeasurementOpts
    options.verticalActionOpts = verticalActionOpts
    options.verticalMeasurementOpts = verticalMeasurementOpts
    options.heightActionOpts = heightActionOpts
    options.heightMeasurementOpts = heightMeasurementOpts
    options.areaActionOpts = areaActionOpts
    options.areaMeasurementOpts = areaMeasurementOpts
    options.pointActionOpts = pointActionOpts
    options.pointMeasurementOpts = pointMeasurementOpts
    options.rectangleActionOpts = rectangleActionOpts
    options.rectangleMeasurementOpts = rectangleMeasurementOpts
    options.regularActionOpts = regularActionOpts
    options.regularMeasurementOpts = regularMeasurementOpts
    options.circleActionOpts = circleActionOpts
    options.circleMeasurementOpts = circleMeasurementOpts
    options.clearActionOpts = clearActionOpts

    const drawingActionInstances: Array<VcDrawingActionInstance> = props.measurements.map(measurement => ({
      name: measurement,
      type: 'measurement',
      actionStyle: {
        background: options[`${camelize(measurement)}ActionOpts`].color,
        color: options[`${camelize(measurement)}ActionOpts`].textColor
      },
      actionClass: `vc-measure-${measurement} vc-measure-button${
        measurement === (instance.proxy as any).selectedDrawingActionInstance?.name ? ' active' : ''
      }`,
      actionRef: ref<typeof VcFabAction>(null!),
      actionOpts: options[`${camelize(measurement)}ActionOpts`] as MeasurementActionOpts,
      cmp: getMeasurementCmp(measurement),
      cmpRef: ref<MeasurementActionCmpRef>(null!),
      cmpOpts: options[`${camelize(measurement)}MeasurementOpts`] as MeasurementActionCmpOpts,
      tip: options[`${camelize(measurement)}ActionOpts`].tooltip.tip || t(`vc.measurement.${measurement}.tip`),
      isActive: false
    }))

    function getMeasurementCmp(name) {
      switch (name) {
        case 'distance':
        case 'component-distance':
          return VcMeasurementDistance
        case 'polyline':
          return VcMeasurementPolyline
        case 'horizontal':
          return VcMeasurementHorizontal
        case 'vertical':
          return VcMeasurementVertical
        case 'height':
          return VcMeasurementHeight
        case 'point':
          return VcMeasurementPoint
        case 'area':
          return VcMeasurementArea
        case 'rectangle':
          return VcMeasurementRectangle
        case 'regular':
        case 'circle':
          return VcMeasurementRegular
        default:
          return undefined
      }
    }

    return useDrawingFab(props, ctx, instance, drawingActionInstances, mainFabOpts, clearActionOpts, 'measurement')?.renderContent
  }
})

export {
  VcMeasurementDistance,
  VcMeasurementPolyline,
  VcMeasurementHorizontal,
  VcMeasurementVertical,
  VcMeasurementHeight,
  VcMeasurementPoint,
  VcMeasurementArea,
  VcMeasurementRectangle,
  VcMeasurementRegular,
  measurementsProps
}

export type { VcMeasurementsProps } from './defaultProps'
export type VcMeasurementsEmits = typeof emits