define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './ArcType-98ec98bf',
  './arrayRemoveDuplicates-18786327',
  './Transforms-d13cc04e',
  './Color-1ab5c5c7',
  './ComponentDatatype-93750d1a',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './PolylinePipeline-64021a2e',
  './VertexFormat-71718faa',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4',
  './IntersectionTests-96a04219',
  './Plane-318d6937'
], function (e, t, r, a, o, n, i, l, s, p, c, d, u, y, m, f, h, v, C) {
  'use strict'
  var g = []
  function _(e, t, r, a, o) {
    var i,
      l = g
    l.length = o
    var s = r.red,
      p = r.green,
      c = r.blue,
      d = r.alpha,
      u = a.red,
      y = a.green,
      m = a.blue,
      f = a.alpha
    if (n.Color.equals(r, a)) {
      for (i = 0; i < o; i++) l[i] = n.Color.clone(r)
      return l
    }
    var h = (u - s) / o,
      v = (y - p) / o,
      C = (m - c) / o,
      _ = (f - d) / o
    for (i = 0; i < o; i++) l[i] = new n.Color(s + i * h, p + i * v, c + i * C, d + i * _)
    return l
  }
  function A(a) {
    var o = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)).positions,
      l = a.colors,
      s = e.defaultValue(a.width, 1),
      p = e.defaultValue(a.colorsPerVertex, !1)
    ;(this._positions = o),
      (this._colors = l),
      (this._width = s),
      (this._colorsPerVertex = p),
      (this._vertexFormat = u.VertexFormat.clone(e.defaultValue(a.vertexFormat, u.VertexFormat.DEFAULT))),
      (this._arcType = e.defaultValue(a.arcType, r.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(a.granularity, i.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(a.ellipsoid, t.Ellipsoid.WGS84))),
      (this._workerName = 'createPolylineGeometry')
    var c = 1 + o.length * t.Cartesian3.packedLength
    ;(c += e.defined(l) ? 1 + l.length * n.Color.packedLength : 1),
      (this.packedLength = c + t.Ellipsoid.packedLength + u.VertexFormat.packedLength + 4)
  }
  A.pack = function (r, a, o) {
    var i
    o = e.defaultValue(o, 0)
    var l = r._positions,
      s = l.length
    for (a[o++] = s, i = 0; i < s; ++i, o += t.Cartesian3.packedLength) t.Cartesian3.pack(l[i], a, o)
    var p = r._colors
    for (s = e.defined(p) ? p.length : 0, a[o++] = s, i = 0; i < s; ++i, o += n.Color.packedLength) n.Color.pack(p[i], a, o)
    return (
      t.Ellipsoid.pack(r._ellipsoid, a, o),
      (o += t.Ellipsoid.packedLength),
      u.VertexFormat.pack(r._vertexFormat, a, o),
      (o += u.VertexFormat.packedLength),
      (a[o++] = r._width),
      (a[o++] = r._colorsPerVertex ? 1 : 0),
      (a[o++] = r._arcType),
      (a[o] = r._granularity),
      a
    )
  }
  var E = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    P = new u.VertexFormat(),
    b = {
      positions: void 0,
      colors: void 0,
      ellipsoid: E,
      vertexFormat: P,
      width: void 0,
      colorsPerVertex: void 0,
      arcType: void 0,
      granularity: void 0
    }
  A.unpack = function (r, a, o) {
    var i
    a = e.defaultValue(a, 0)
    var l = r[a++],
      s = new Array(l)
    for (i = 0; i < l; ++i, a += t.Cartesian3.packedLength) s[i] = t.Cartesian3.unpack(r, a)
    var p = (l = r[a++]) > 0 ? new Array(l) : void 0
    for (i = 0; i < l; ++i, a += n.Color.packedLength) p[i] = n.Color.unpack(r, a)
    var c = t.Ellipsoid.unpack(r, a, E)
    a += t.Ellipsoid.packedLength
    var d = u.VertexFormat.unpack(r, a, P)
    a += u.VertexFormat.packedLength
    var y = r[a++],
      m = 1 === r[a++],
      f = r[a++],
      h = r[a]
    return e.defined(o)
      ? ((o._positions = s),
        (o._colors = p),
        (o._ellipsoid = t.Ellipsoid.clone(c, o._ellipsoid)),
        (o._vertexFormat = u.VertexFormat.clone(d, o._vertexFormat)),
        (o._width = y),
        (o._colorsPerVertex = m),
        (o._arcType = f),
        (o._granularity = h),
        o)
      : ((b.positions = s), (b.colors = p), (b.width = y), (b.colorsPerVertex = m), (b.arcType = f), (b.granularity = h), new A(b))
  }
  var w = new t.Cartesian3(),
    x = new t.Cartesian3(),
    T = new t.Cartesian3(),
    D = new t.Cartesian3()
  return (
    (A.createGeometry = function (l) {
      var u,
        y,
        m,
        f = l._width,
        h = l._vertexFormat,
        v = l._colors,
        C = l._colorsPerVertex,
        A = l._arcType,
        E = l._granularity,
        P = l._ellipsoid,
        b = [],
        k = a.arrayRemoveDuplicates(l._positions, t.Cartesian3.equalsEpsilon, !1, b)
      if (e.defined(v) && b.length > 0) {
        var V = 0,
          L = b[0]
        v = v.filter(function (e, t) {
          return !(C ? t === L || (0 === t && 1 === L) : t + 1 === L) || (V++, (L = b[V]), !1)
        })
      }
      var F = k.length
      if (!(F < 2 || f <= 0)) {
        if (A === r.ArcType.GEODESIC || A === r.ArcType.RHUMB) {
          var G, O
          A === r.ArcType.GEODESIC
            ? ((G = i.CesiumMath.chordLength(E, P.maximumRadius)), (O = d.PolylinePipeline.numberOfPoints))
            : ((G = E), (O = d.PolylinePipeline.numberOfPointsRhumbLine))
          var R = d.PolylinePipeline.extractHeights(k, P)
          if (e.defined(v)) {
            var I = 1
            for (u = 0; u < F - 1; ++u) I += O(k[u], k[u + 1], G)
            var S = new Array(I),
              B = 0
            for (u = 0; u < F - 1; ++u) {
              var U = k[u],
                N = k[u + 1],
                M = v[u],
                H = O(U, N, G)
              if (C && u < I) {
                var W = _(0, 0, M, v[u + 1], H),
                  Y = W.length
                for (y = 0; y < Y; ++y) S[B++] = W[y]
              } else for (y = 0; y < H; ++y) S[B++] = n.Color.clone(M)
            }
            ;(S[B] = n.Color.clone(v[v.length - 1])), (v = S), (g.length = 0)
          }
          k =
            A === r.ArcType.GEODESIC
              ? d.PolylinePipeline.generateCartesianArc({ positions: k, minDistance: G, ellipsoid: P, height: R })
              : d.PolylinePipeline.generateCartesianRhumbArc({ positions: k, granularity: G, ellipsoid: P, height: R })
        }
        var q,
          z = 4 * (F = k.length) - 4,
          J = new Float64Array(3 * z),
          j = new Float64Array(3 * z),
          K = new Float64Array(3 * z),
          Q = new Float32Array(2 * z),
          X = h.st ? new Float32Array(2 * z) : void 0,
          Z = e.defined(v) ? new Uint8Array(4 * z) : void 0,
          $ = 0,
          ee = 0,
          te = 0,
          re = 0
        for (y = 0; y < F; ++y) {
          var ae, oe
          0 === y ? ((q = w), t.Cartesian3.subtract(k[0], k[1], q), t.Cartesian3.add(k[0], q, q)) : (q = k[y - 1]),
            t.Cartesian3.clone(q, T),
            t.Cartesian3.clone(k[y], x),
            y === F - 1 ? ((q = w), t.Cartesian3.subtract(k[F - 1], k[F - 2], q), t.Cartesian3.add(k[F - 1], q, q)) : (q = k[y + 1]),
            t.Cartesian3.clone(q, D),
            e.defined(Z) && ((ae = 0 === y || C ? v[y] : v[y - 1]), y !== F - 1 && (oe = v[y]))
          var ne = y === F - 1 ? 2 : 4
          for (m = 0 === y ? 2 : 0; m < ne; ++m) {
            t.Cartesian3.pack(x, J, $), t.Cartesian3.pack(T, j, $), t.Cartesian3.pack(D, K, $), ($ += 3)
            var ie = m - 2 < 0 ? -1 : 1
            if (
              ((Q[ee++] = (m % 2) * 2 - 1), (Q[ee++] = ie * f), h.st && ((X[te++] = y / (F - 1)), (X[te++] = Math.max(Q[ee - 2], 0))), e.defined(Z))
            ) {
              var le = m < 2 ? ae : oe
              ;(Z[re++] = n.Color.floatToByte(le.red)),
                (Z[re++] = n.Color.floatToByte(le.green)),
                (Z[re++] = n.Color.floatToByte(le.blue)),
                (Z[re++] = n.Color.floatToByte(le.alpha))
            }
          }
        }
        var se = new p.GeometryAttributes()
        ;(se.position = new s.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: J })),
          (se.prevPosition = new s.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: j })),
          (se.nextPosition = new s.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: K })),
          (se.expandAndWidth = new s.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: Q })),
          h.st && (se.st = new s.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: X })),
          e.defined(Z) &&
            (se.color = new s.GeometryAttribute({
              componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 4,
              values: Z,
              normalize: !0
            }))
        var pe = c.IndexDatatype.createTypedArray(z, 6 * F - 6),
          ce = 0,
          de = 0,
          ue = F - 1
        for (y = 0; y < ue; ++y)
          (pe[de++] = ce), (pe[de++] = ce + 2), (pe[de++] = ce + 1), (pe[de++] = ce + 1), (pe[de++] = ce + 2), (pe[de++] = ce + 3), (ce += 4)
        return new s.Geometry({
          attributes: se,
          indices: pe,
          primitiveType: s.PrimitiveType.TRIANGLES,
          boundingSphere: o.BoundingSphere.fromPoints(k),
          geometryType: s.GeometryType.POLYLINES
        })
      }
    }),
    function (r, a) {
      return e.defined(a) && (r = A.unpack(r, a)), (r._ellipsoid = t.Ellipsoid.clone(r._ellipsoid)), A.createGeometry(r)
    }
  )
})
