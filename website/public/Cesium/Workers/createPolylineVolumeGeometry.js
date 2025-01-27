define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './arrayRemoveDuplicates-18786327',
  './BoundingRectangle-218a9c7b',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a',
  './PolylineVolumeGeometryLibrary-06826ae8',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryPipeline-2356afec',
  './IndexDatatype-b7d979a6',
  './PolygonPipeline-da7fc5ca',
  './VertexFormat-71718faa',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidTangentPlane-eecce7e8',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './PolylinePipeline-64021a2e',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc'
], function (e, t, n, a, i, r, o, l, s, p, c, d, u, m, y, g, h, f, v, b, P, E, _, k, L) {
  'use strict'
  function V(n) {
    var a = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      i = n.shapePositions
    ;(this._positions = a),
      (this._shape = i),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, o.CornerType.ROUNDED)),
      (this._vertexFormat = m.VertexFormat.clone(e.defaultValue(n.vertexFormat, m.VertexFormat.DEFAULT))),
      (this._granularity = e.defaultValue(n.granularity, r.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeGeometry')
    var l = 1 + a.length * t.Cartesian3.packedLength
    ;(l += 1 + i.length * t.Cartesian2.packedLength), (this.packedLength = l + t.Ellipsoid.packedLength + m.VertexFormat.packedLength + 2)
  }
  V.pack = function (n, a, i) {
    var r
    i = e.defaultValue(i, 0)
    var o = n._positions,
      l = o.length
    for (a[i++] = l, r = 0; r < l; ++r, i += t.Cartesian3.packedLength) t.Cartesian3.pack(o[r], a, i)
    var s = n._shape
    for (l = s.length, a[i++] = l, r = 0; r < l; ++r, i += t.Cartesian2.packedLength) t.Cartesian2.pack(s[r], a, i)
    return (
      t.Ellipsoid.pack(n._ellipsoid, a, i),
      (i += t.Ellipsoid.packedLength),
      m.VertexFormat.pack(n._vertexFormat, a, i),
      (i += m.VertexFormat.packedLength),
      (a[i++] = n._cornerType),
      (a[i] = n._granularity),
      a
    )
  }
  var x = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    C = new m.VertexFormat(),
    F = { polylinePositions: void 0, shapePositions: void 0, ellipsoid: x, vertexFormat: C, cornerType: void 0, granularity: void 0 }
  V.unpack = function (n, a, i) {
    var r
    a = e.defaultValue(a, 0)
    var o = n[a++],
      l = new Array(o)
    for (r = 0; r < o; ++r, a += t.Cartesian3.packedLength) l[r] = t.Cartesian3.unpack(n, a)
    o = n[a++]
    var s = new Array(o)
    for (r = 0; r < o; ++r, a += t.Cartesian2.packedLength) s[r] = t.Cartesian2.unpack(n, a)
    var p = t.Ellipsoid.unpack(n, a, x)
    a += t.Ellipsoid.packedLength
    var c = m.VertexFormat.unpack(n, a, C)
    a += m.VertexFormat.packedLength
    var d = n[a++],
      u = n[a]
    return e.defined(i)
      ? ((i._positions = l),
        (i._shape = s),
        (i._ellipsoid = t.Ellipsoid.clone(p, i._ellipsoid)),
        (i._vertexFormat = m.VertexFormat.clone(c, i._vertexFormat)),
        (i._cornerType = d),
        (i._granularity = u),
        i)
      : ((F.polylinePositions = l), (F.shapePositions = s), (F.cornerType = d), (F.granularity = u), new V(F))
  }
  var A = new a.BoundingRectangle()
  return (
    (V.createGeometry = function (e) {
      var l = e._positions,
        m = n.arrayRemoveDuplicates(l, t.Cartesian3.equalsEpsilon),
        y = e._shape
      if (((y = o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)), !(m.length < 2 || y.length < 3))) {
        u.PolygonPipeline.computeWindingOrder2D(y) === u.WindingOrder.CLOCKWISE && y.reverse()
        var g = a.BoundingRectangle.fromPoints(y, A)
        return (function (e, t, n, a) {
          var l = new p.GeometryAttributes()
          a.position &&
            (l.position = new s.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: e }))
          var m,
            y,
            g,
            h,
            f,
            v,
            b = t.length,
            P = e.length / 3,
            E = (P - 2 * b) / (2 * b),
            _ = u.PolygonPipeline.triangulate(t),
            k = (E - 1) * b * 6 + 2 * _.length,
            L = d.IndexDatatype.createTypedArray(P, k),
            V = 2 * b,
            x = 0
          for (m = 0; m < E - 1; m++) {
            for (y = 0; y < b - 1; y++)
              (v = (g = 2 * y + m * b * 2) + V),
                (f = (h = g + 1) + V),
                (L[x++] = h),
                (L[x++] = g),
                (L[x++] = f),
                (L[x++] = f),
                (L[x++] = g),
                (L[x++] = v)
            ;(f = (h = 1 + (g = 2 * b - 2 + m * b * 2)) + V),
              (v = g + V),
              (L[x++] = h),
              (L[x++] = g),
              (L[x++] = f),
              (L[x++] = f),
              (L[x++] = g),
              (L[x++] = v)
          }
          if (a.st || a.tangent || a.bitangent) {
            var C,
              F,
              A = new Float32Array(2 * P),
              T = 1 / (E - 1),
              G = 1 / n.height,
              D = n.height / 2,
              w = 0
            for (m = 0; m < E; m++) {
              for (C = m * T, F = G * (t[0].y + D), A[w++] = C, A[w++] = F, y = 1; y < b; y++)
                (F = G * (t[y].y + D)), (A[w++] = C), (A[w++] = F), (A[w++] = C), (A[w++] = F)
              ;(F = G * (t[0].y + D)), (A[w++] = C), (A[w++] = F)
            }
            for (y = 0; y < b; y++) (C = 0), (F = G * (t[y].y + D)), (A[w++] = C), (A[w++] = F)
            for (y = 0; y < b; y++) (C = (E - 1) * T), (F = G * (t[y].y + D)), (A[w++] = C), (A[w++] = F)
            l.st = new s.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: new Float32Array(A) })
          }
          var R = P - 2 * b
          for (m = 0; m < _.length; m += 3) {
            var B = _[m] + R,
              S = _[m + 1] + R,
              I = _[m + 2] + R
            ;(L[x++] = B), (L[x++] = S), (L[x++] = I), (L[x++] = I + b), (L[x++] = S + b), (L[x++] = B + b)
          }
          var O = new s.Geometry({
            attributes: l,
            indices: L,
            boundingSphere: i.BoundingSphere.fromVertices(e),
            primitiveType: s.PrimitiveType.TRIANGLES
          })
          if ((a.normal && (O = c.GeometryPipeline.computeNormal(O)), a.tangent || a.bitangent)) {
            try {
              O = c.GeometryPipeline.computeTangentAndBitangent(O)
            } catch (e) {
              o.oneTimeWarning('polyline-volume-tangent-bitangent', 'Unable to compute tangents and bitangents for polyline volume geometry')
            }
            a.tangent || (O.attributes.tangent = void 0), a.bitangent || (O.attributes.bitangent = void 0), a.st || (O.attributes.st = void 0)
          }
          return O
        })(o.PolylineVolumeGeometryLibrary.computePositions(m, y, g, e, !0), y, g, e._vertexFormat)
      }
    }),
    function (n, a) {
      return e.defined(a) && (n = V.unpack(n, a)), (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)), V.createGeometry(n)
    }
  )
})
