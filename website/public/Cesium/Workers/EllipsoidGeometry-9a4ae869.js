define([
  'exports',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './VertexFormat-71718faa'
], function (t, e, a, i, r, n, o, m, s, u, l) {
  'use strict'
  var f = new i.Cartesian3(),
    c = new i.Cartesian3(),
    d = new i.Cartesian3(),
    C = new i.Cartesian3(),
    p = new i.Cartesian3(),
    y = new i.Cartesian3(1, 1, 1),
    _ = Math.cos,
    v = Math.sin
  function h(t) {
    t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT)
    var e = n.defaultValue(t.radii, y),
      a = n.defaultValue(t.innerRadii, e),
      o = n.defaultValue(t.minimumClock, 0),
      m = n.defaultValue(t.maximumClock, r.CesiumMath.TWO_PI),
      s = n.defaultValue(t.minimumCone, 0),
      u = n.defaultValue(t.maximumCone, r.CesiumMath.PI),
      f = Math.round(n.defaultValue(t.stackPartitions, 64)),
      c = Math.round(n.defaultValue(t.slicePartitions, 64)),
      d = n.defaultValue(t.vertexFormat, l.VertexFormat.DEFAULT)
    ;(this._radii = i.Cartesian3.clone(e)),
      (this._innerRadii = i.Cartesian3.clone(a)),
      (this._minimumClock = o),
      (this._maximumClock = m),
      (this._minimumCone = s),
      (this._maximumCone = u),
      (this._stackPartitions = f),
      (this._slicePartitions = c),
      (this._vertexFormat = l.VertexFormat.clone(d)),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createEllipsoidGeometry')
  }
  ;(h.packedLength = 2 * i.Cartesian3.packedLength + l.VertexFormat.packedLength + 7),
    (h.pack = function (t, e, a) {
      return (
        (a = n.defaultValue(a, 0)),
        i.Cartesian3.pack(t._radii, e, a),
        (a += i.Cartesian3.packedLength),
        i.Cartesian3.pack(t._innerRadii, e, a),
        (a += i.Cartesian3.packedLength),
        l.VertexFormat.pack(t._vertexFormat, e, a),
        (a += l.VertexFormat.packedLength),
        (e[a++] = t._minimumClock),
        (e[a++] = t._maximumClock),
        (e[a++] = t._minimumCone),
        (e[a++] = t._maximumCone),
        (e[a++] = t._stackPartitions),
        (e[a++] = t._slicePartitions),
        (e[a] = n.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  var x,
    A = new i.Cartesian3(),
    b = new i.Cartesian3(),
    k = new l.VertexFormat(),
    w = {
      radii: A,
      innerRadii: b,
      vertexFormat: k,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      offsetAttribute: void 0
    }
  ;(h.unpack = function (t, e, a) {
    e = n.defaultValue(e, 0)
    var r = i.Cartesian3.unpack(t, e, A)
    e += i.Cartesian3.packedLength
    var o = i.Cartesian3.unpack(t, e, b)
    e += i.Cartesian3.packedLength
    var m = l.VertexFormat.unpack(t, e, k)
    e += l.VertexFormat.packedLength
    var s = t[e++],
      u = t[e++],
      f = t[e++],
      c = t[e++],
      d = t[e++],
      C = t[e++],
      p = t[e]
    return n.defined(a)
      ? ((a._radii = i.Cartesian3.clone(r, a._radii)),
        (a._innerRadii = i.Cartesian3.clone(o, a._innerRadii)),
        (a._vertexFormat = l.VertexFormat.clone(m, a._vertexFormat)),
        (a._minimumClock = s),
        (a._maximumClock = u),
        (a._minimumCone = f),
        (a._maximumCone = c),
        (a._stackPartitions = d),
        (a._slicePartitions = C),
        (a._offsetAttribute = -1 === p ? void 0 : p),
        a)
      : ((w.minimumClock = s),
        (w.maximumClock = u),
        (w.minimumCone = f),
        (w.maximumCone = c),
        (w.stackPartitions = d),
        (w.slicePartitions = C),
        (w.offsetAttribute = -1 === p ? void 0 : p),
        new h(w))
  }),
    (h.createGeometry = function (t) {
      var o = t._radii
      if (!(o.x <= 0 || o.y <= 0 || o.z <= 0)) {
        var l = t._innerRadii
        if (!(l.x <= 0 || l.y <= 0 || l.z <= 0)) {
          var y,
            h,
            x = t._minimumClock,
            A = t._maximumClock,
            b = t._minimumCone,
            k = t._maximumCone,
            w = t._vertexFormat,
            F = t._slicePartitions + 1,
            P = t._stackPartitions + 1
          ;(F = Math.round((F * Math.abs(A - x)) / r.CesiumMath.TWO_PI)) < 2 && (F = 2),
            (P = Math.round((P * Math.abs(k - b)) / r.CesiumMath.PI)) < 2 && (P = 2)
          var g = 0,
            V = [b],
            M = [x]
          for (y = 0; y < P; y++) V.push(b + (y * (k - b)) / (P - 1))
          for (V.push(k), h = 0; h < F; h++) M.push(x + (h * (A - x)) / (F - 1))
          M.push(A)
          var T = V.length,
            D = M.length,
            G = 0,
            L = 1,
            O = l.x !== o.x || l.y !== o.y || l.z !== o.z,
            I = !1,
            E = !1,
            z = !1
          O &&
            ((L = 2),
            b > 0 && ((I = !0), (G += F - 1)),
            k < Math.PI && ((E = !0), (G += F - 1)),
            (A - x) % r.CesiumMath.TWO_PI ? ((z = !0), (G += 2 * (P - 1) + 1)) : (G += 1))
          var N = D * T * L,
            R = new Float64Array(3 * N),
            U = e.arrayFill(new Array(N), !1),
            S = e.arrayFill(new Array(N), !1),
            B = F * P * L,
            W = 6 * (B + G + 1 - (F + P) * L),
            Y = u.IndexDatatype.createTypedArray(B, W),
            J = w.normal ? new Float32Array(3 * N) : void 0,
            X = w.tangent ? new Float32Array(3 * N) : void 0,
            Z = w.bitangent ? new Float32Array(3 * N) : void 0,
            j = w.st ? new Float32Array(2 * N) : void 0,
            q = new Array(T),
            H = new Array(T)
          for (y = 0; y < T; y++) (q[y] = v(V[y])), (H[y] = _(V[y]))
          var K = new Array(D),
            Q = new Array(D)
          for (h = 0; h < D; h++) (Q[h] = _(M[h])), (K[h] = v(M[h]))
          for (y = 0; y < T; y++) for (h = 0; h < D; h++) (R[g++] = o.x * q[y] * Q[h]), (R[g++] = o.y * q[y] * K[h]), (R[g++] = o.z * H[y])
          var $,
            tt,
            et,
            at,
            it = N / 2
          if (O)
            for (y = 0; y < T; y++)
              for (h = 0; h < D; h++)
                (R[g++] = l.x * q[y] * Q[h]),
                  (R[g++] = l.y * q[y] * K[h]),
                  (R[g++] = l.z * H[y]),
                  (U[it] = !0),
                  y > 0 && y !== T - 1 && 0 !== h && h !== D - 1 && (S[it] = !0),
                  it++
          for (g = 0, y = 1; y < T - 2; y++)
            for ($ = y * D, tt = (y + 1) * D, h = 1; h < D - 2; h++)
              (Y[g++] = tt + h), (Y[g++] = tt + h + 1), (Y[g++] = $ + h + 1), (Y[g++] = tt + h), (Y[g++] = $ + h + 1), (Y[g++] = $ + h)
          if (O) {
            var rt = T * D
            for (y = 1; y < T - 2; y++)
              for ($ = rt + y * D, tt = rt + (y + 1) * D, h = 1; h < D - 2; h++)
                (Y[g++] = tt + h), (Y[g++] = $ + h), (Y[g++] = $ + h + 1), (Y[g++] = tt + h), (Y[g++] = $ + h + 1), (Y[g++] = tt + h + 1)
          }
          if (O) {
            if (I)
              for (at = T * D, y = 1; y < D - 2; y++)
                (Y[g++] = y), (Y[g++] = y + 1), (Y[g++] = at + y + 1), (Y[g++] = y), (Y[g++] = at + y + 1), (Y[g++] = at + y)
            if (E)
              for (et = T * D - D, at = T * D * L - D, y = 1; y < D - 2; y++)
                (Y[g++] = et + y + 1), (Y[g++] = et + y), (Y[g++] = at + y), (Y[g++] = et + y + 1), (Y[g++] = at + y), (Y[g++] = at + y + 1)
          }
          if (z) {
            for (y = 1; y < T - 2; y++)
              (at = D * T + D * y), (et = D * y), (Y[g++] = at), (Y[g++] = et + D), (Y[g++] = et), (Y[g++] = at), (Y[g++] = at + D), (Y[g++] = et + D)
            for (y = 1; y < T - 2; y++)
              (at = D * T + D * (y + 1) - 1),
                (et = D * (y + 1) - 1),
                (Y[g++] = et + D),
                (Y[g++] = at),
                (Y[g++] = et),
                (Y[g++] = et + D),
                (Y[g++] = at + D),
                (Y[g++] = at)
          }
          var nt = new s.GeometryAttributes()
          w.position &&
            (nt.position = new m.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: R }))
          var ot,
            mt = 0,
            st = 0,
            ut = 0,
            lt = 0,
            ft = N / 2,
            ct = i.Ellipsoid.fromCartesian3(o),
            dt = i.Ellipsoid.fromCartesian3(l)
          if (w.st || w.normal || w.tangent || w.bitangent) {
            for (y = 0; y < N; y++) {
              ot = U[y] ? dt : ct
              var Ct = i.Cartesian3.fromArray(R, 3 * y, f),
                pt = ot.geodeticSurfaceNormal(Ct, c)
              if ((S[y] && i.Cartesian3.negate(pt, pt), w.st)) {
                var yt = i.Cartesian2.negate(pt, p)
                ;(j[mt++] = Math.atan2(yt.y, yt.x) / r.CesiumMath.TWO_PI + 0.5), (j[mt++] = Math.asin(pt.z) / Math.PI + 0.5)
              }
              if ((w.normal && ((J[st++] = pt.x), (J[st++] = pt.y), (J[st++] = pt.z)), w.tangent || w.bitangent)) {
                var _t,
                  vt = d,
                  ht = 0
                if (
                  (U[y] && (ht = ft),
                  (_t = !I && y >= ht && y < ht + 2 * D ? i.Cartesian3.UNIT_X : i.Cartesian3.UNIT_Z),
                  i.Cartesian3.cross(_t, pt, vt),
                  i.Cartesian3.normalize(vt, vt),
                  w.tangent && ((X[ut++] = vt.x), (X[ut++] = vt.y), (X[ut++] = vt.z)),
                  w.bitangent)
                ) {
                  var xt = i.Cartesian3.cross(pt, vt, C)
                  i.Cartesian3.normalize(xt, xt), (Z[lt++] = xt.x), (Z[lt++] = xt.y), (Z[lt++] = xt.z)
                }
              }
            }
            w.st && (nt.st = new m.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: j })),
              w.normal &&
                (nt.normal = new m.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: J })),
              w.tangent &&
                (nt.tangent = new m.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: X })),
              w.bitangent &&
                (nt.bitangent = new m.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: Z }))
          }
          if (n.defined(t._offsetAttribute)) {
            var At = R.length,
              bt = new Uint8Array(At / 3),
              kt = t._offsetAttribute === e.GeometryOffsetAttribute.NONE ? 0 : 1
            e.arrayFill(bt, kt),
              (nt.applyOffset = new m.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: bt
              }))
          }
          return new m.Geometry({
            attributes: nt,
            indices: Y,
            primitiveType: m.PrimitiveType.TRIANGLES,
            boundingSphere: a.BoundingSphere.fromEllipsoid(ct),
            offsetAttribute: t._offsetAttribute
          })
        }
      }
    }),
    (h.getUnitEllipsoid = function () {
      return n.defined(x) || (x = h.createGeometry(new h({ radii: new i.Cartesian3(1, 1, 1), vertexFormat: l.VertexFormat.POSITION_ONLY }))), x
    }),
    (t.EllipsoidGeometry = h)
})
