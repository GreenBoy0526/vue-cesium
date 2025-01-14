define([
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './EllipseGeometry-47331b4e',
  './VertexFormat-71718faa',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './combine-83860057',
  './EllipseGeometryLibrary-962723df',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryInstance-47b34185',
  './GeometryPipeline-2356afec',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './IndexDatatype-b7d979a6',
  './IntersectionTests-96a04219',
  './Plane-318d6937'
], function (e, t, i, r, o, n, a, l, s, d, m, c, u, p, y, _, G, x, h, g) {
  'use strict'
  function f(e) {
    var t = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).radius,
      o = {
        center: e.center,
        semiMajorAxis: t,
        semiMinorAxis: t,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        vertexFormat: e.vertexFormat,
        stRotation: e.stRotation,
        shadowVolume: e.shadowVolume
      }
    ;(this._ellipseGeometry = new r.EllipseGeometry(o)), (this._workerName = 'createCircleGeometry')
  }
  ;(f.packedLength = r.EllipseGeometry.packedLength),
    (f.pack = function (e, t, i) {
      return r.EllipseGeometry.pack(e._ellipseGeometry, t, i)
    })
  var v = new r.EllipseGeometry({ center: new e.Cartesian3(), semiMajorAxis: 1, semiMinorAxis: 1 }),
    E = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      vertexFormat: new o.VertexFormat(),
      stRotation: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      shadowVolume: void 0
    }
  return (
    (f.unpack = function (t, n, a) {
      var l = r.EllipseGeometry.unpack(t, n, v)
      return (
        (E.center = e.Cartesian3.clone(l._center, E.center)),
        (E.ellipsoid = e.Ellipsoid.clone(l._ellipsoid, E.ellipsoid)),
        (E.height = l._height),
        (E.extrudedHeight = l._extrudedHeight),
        (E.granularity = l._granularity),
        (E.vertexFormat = o.VertexFormat.clone(l._vertexFormat, E.vertexFormat)),
        (E.stRotation = l._stRotation),
        (E.shadowVolume = l._shadowVolume),
        i.defined(a)
          ? ((E.semiMajorAxis = l._semiMajorAxis), (E.semiMinorAxis = l._semiMinorAxis), (a._ellipseGeometry = new r.EllipseGeometry(E)), a)
          : ((E.radius = l._semiMajorAxis), new f(E))
      )
    }),
    (f.createGeometry = function (e) {
      return r.EllipseGeometry.createGeometry(e._ellipseGeometry)
    }),
    (f.createShadowVolume = function (e, t, i) {
      var r = e._ellipseGeometry._granularity,
        n = e._ellipseGeometry._ellipsoid,
        a = t(r, n),
        l = i(r, n)
      return new f({
        center: e._ellipseGeometry._center,
        radius: e._ellipseGeometry._semiMajorAxis,
        ellipsoid: n,
        stRotation: e._ellipseGeometry._stRotation,
        granularity: r,
        extrudedHeight: a,
        height: l,
        vertexFormat: o.VertexFormat.POSITION_ONLY,
        shadowVolume: !0
      })
    }),
    Object.defineProperties(f.prototype, {
      rectangle: {
        get: function () {
          return this._ellipseGeometry.rectangle
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return this._ellipseGeometry.textureCoordinateRotationPoints
        }
      }
    }),
    function (t, r) {
      return (
        i.defined(r) && (t = f.unpack(t, r)),
        (t._ellipseGeometry._center = e.Cartesian3.clone(t._ellipseGeometry._center)),
        (t._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid)),
        f.createGeometry(t)
      )
    }
  )
})
