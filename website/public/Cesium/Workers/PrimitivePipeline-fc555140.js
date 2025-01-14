define([
  'exports',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './RuntimeError-346a3079',
  './Matrix2-9aa31791',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryPipeline-2356afec',
  './IndexDatatype-b7d979a6',
  './WebMercatorProjection-58801a11'
], function (e, t, r, n, i, o, a, s, d, p, u) {
  'use strict'
  function f(e, t, r) {
    ;(e = n.defaultValue(e, 0)), (t = n.defaultValue(t, 0)), (r = n.defaultValue(r, 0)), (this.value = new Float32Array([e, t, r]))
  }
  function c(e, t) {
    var n = e.attributes,
      i = n.position,
      o = i.values.length / i.componentsPerAttribute
    n.batchId = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 1, values: new Float32Array(o) })
    for (var s = n.batchId.values, d = 0; d < o; ++d) s[d] = t
  }
  function m(e) {
    var i,
      a,
      s = e.instances,
      p = e.projection,
      u = e.elementIndexUintSupported,
      f = e.scene3DOnly,
      m = e.vertexCacheOptimize,
      l = e.compressVertices,
      h = e.modelMatrix,
      g = s.length
    for (i = 0; i < g; ++i)
      if (n.defined(s[i].geometry)) {
        s[i].geometry.primitiveType
        break
      }
    if (
      ((function (e, t, r) {
        var i,
          a = !r,
          s = e.length
        if (!a && s > 1) {
          var p = e[0].modelMatrix
          for (i = 1; i < s; ++i)
            if (!o.Matrix4.equals(p, e[i].modelMatrix)) {
              a = !0
              break
            }
        }
        if (a) for (i = 0; i < s; ++i) n.defined(e[i].geometry) && d.GeometryPipeline.transformToWorldCoordinates(e[i])
        else o.Matrix4.multiplyTransformation(t, e[0].modelMatrix, t)
      })(s, h, f),
      !f)
    )
      for (i = 0; i < g; ++i) n.defined(s[i].geometry) && d.GeometryPipeline.splitLongitude(s[i])
    if (
      ((function (e) {
        for (var t = e.length, r = 0; r < t; ++r) {
          var i = e[r]
          n.defined(i.geometry)
            ? c(i.geometry, r)
            : n.defined(i.westHemisphereGeometry) &&
              n.defined(i.eastHemisphereGeometry) &&
              (c(i.westHemisphereGeometry, r), c(i.eastHemisphereGeometry, r))
        }
      })(s),
      m)
    )
      for (i = 0; i < g; ++i) {
        var y = s[i]
        n.defined(y.geometry)
          ? (d.GeometryPipeline.reorderForPostVertexCache(y.geometry), d.GeometryPipeline.reorderForPreVertexCache(y.geometry))
          : n.defined(y.westHemisphereGeometry) &&
            n.defined(y.eastHemisphereGeometry) &&
            (d.GeometryPipeline.reorderForPostVertexCache(y.westHemisphereGeometry),
            d.GeometryPipeline.reorderForPreVertexCache(y.westHemisphereGeometry),
            d.GeometryPipeline.reorderForPostVertexCache(y.eastHemisphereGeometry),
            d.GeometryPipeline.reorderForPreVertexCache(y.eastHemisphereGeometry))
      }
    var b = d.GeometryPipeline.combineInstances(s)
    for (g = b.length, i = 0; i < g; ++i) {
      var v,
        x = (a = b[i]).attributes
      if (f)
        for (v in x)
          x.hasOwnProperty(v) &&
            x[v].componentDatatype === r.ComponentDatatype.DOUBLE &&
            d.GeometryPipeline.encodeAttribute(a, v, v + '3DHigh', v + '3DLow')
      else
        for (v in x)
          if (x.hasOwnProperty(v) && x[v].componentDatatype === r.ComponentDatatype.DOUBLE) {
            var G = v + '3D',
              S = v + '2D'
            d.GeometryPipeline.projectTo2D(a, v, G, S, p),
              n.defined(a.boundingSphere) && 'position' === v && (a.boundingSphereCV = t.BoundingSphere.fromVertices(a.attributes.position2D.values)),
              d.GeometryPipeline.encodeAttribute(a, G, G + 'High', G + 'Low'),
              d.GeometryPipeline.encodeAttribute(a, S, S + 'High', S + 'Low')
          }
      l && d.GeometryPipeline.compressVertices(a)
    }
    if (!u) {
      var P = []
      for (g = b.length, i = 0; i < g; ++i) (a = b[i]), (P = P.concat(d.GeometryPipeline.fitToUnsignedShortIndices(a)))
      b = P
    }
    return b
  }
  function l(e, t, r, i) {
    var o,
      a,
      s,
      d = i.length - 1
    if (d >= 0) {
      var p = i[d]
      ;(o = p.offset + p.count), (a = r[(s = p.index)].indices.length)
    } else (o = 0), (a = r[(s = 0)].indices.length)
    for (var u = e.length, f = 0; f < u; ++f) {
      var c = e[f][t]
      if (n.defined(c)) {
        var m = c.indices.length
        o + m > a && ((o = 0), (a = r[++s].indices.length)), i.push({ index: s, offset: o, count: m }), (o += m)
      }
    }
  }
  Object.defineProperties(f.prototype, {
    componentDatatype: {
      get: function () {
        return r.ComponentDatatype.FLOAT
      }
    },
    componentsPerAttribute: {
      get: function () {
        return 3
      }
    },
    normalize: {
      get: function () {
        return !1
      }
    }
  }),
    (f.fromCartesian3 = function (e) {
      return new f(e.x, e.y, e.z)
    }),
    (f.toValue = function (e, t) {
      return n.defined(t) || (t = new Float32Array([e.x, e.y, e.z])), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z), t
    })
  var h = {}
  function g(e, t) {
    var r = e.attributes
    for (var i in r)
      if (r.hasOwnProperty(i)) {
        var o = r[i]
        n.defined(o) && n.defined(o.values) && t.push(o.values.buffer)
      }
    n.defined(e.indices) && t.push(e.indices.buffer)
  }
  function y(e, t) {
    var r = e.length,
      i = new Float64Array(1 + 19 * r),
      a = 0
    i[a++] = r
    for (var s = 0; s < r; s++) {
      var d = e[s]
      if ((o.Matrix4.pack(d.modelMatrix, i, a), (a += o.Matrix4.packedLength), n.defined(d.attributes) && n.defined(d.attributes.offset))) {
        var p = d.attributes.offset.value
        ;(i[a] = p[0]), (i[a + 1] = p[1]), (i[a + 2] = p[2])
      }
      a += 3
    }
    return t.push(i.buffer), i
  }
  function b(e) {
    var r = e.length,
      i = 1 + (t.BoundingSphere.packedLength + 1) * r,
      o = new Float32Array(i),
      a = 0
    o[a++] = r
    for (var s = 0; s < r; ++s) {
      var d = e[s]
      n.defined(d) ? ((o[a++] = 1), t.BoundingSphere.pack(e[s], o, a)) : (o[a++] = 0), (a += t.BoundingSphere.packedLength)
    }
    return o
  }
  function v(e) {
    for (var r = new Array(e[0]), n = 0, i = 1; i < e.length; )
      1 === e[i++] && (r[n] = t.BoundingSphere.unpack(e, i)), ++n, (i += t.BoundingSphere.packedLength)
    return r
  }
  ;(h.combineGeometry = function (e) {
    var r,
      i,
      o,
      a,
      s = e.instances,
      p = s.length,
      u = !1
    p > 0 &&
      ((r = m(e)).length > 0 &&
        ((i = d.GeometryPipeline.createAttributeLocations(r[0])),
        e.createPickOffsets &&
          (o = (function (e, t) {
            var r = []
            return l(e, 'geometry', t, r), l(e, 'westHemisphereGeometry', t, r), l(e, 'eastHemisphereGeometry', t, r), r
          })(s, r))),
      n.defined(s[0].attributes) && n.defined(s[0].attributes.offset) && ((a = new Array(p)), (u = !0)))
    for (var f = new Array(p), c = new Array(p), h = 0; h < p; ++h) {
      var g = s[h],
        y = g.geometry
      n.defined(y) && ((f[h] = y.boundingSphere), (c[h] = y.boundingSphereCV), u && (a[h] = g.geometry.offsetAttribute))
      var b = g.eastHemisphereGeometry,
        v = g.westHemisphereGeometry
      n.defined(b) &&
        n.defined(v) &&
        (n.defined(b.boundingSphere) && n.defined(v.boundingSphere) && (f[h] = t.BoundingSphere.union(b.boundingSphere, v.boundingSphere)),
        n.defined(b.boundingSphereCV) && n.defined(v.boundingSphereCV) && (c[h] = t.BoundingSphere.union(b.boundingSphereCV, v.boundingSphereCV)))
    }
    return {
      geometries: r,
      modelMatrix: e.modelMatrix,
      attributeLocations: i,
      pickOffsets: o,
      offsetInstanceExtend: a,
      boundingSpheres: f,
      boundingSpheresCV: c
    }
  }),
    (h.packCreateGeometryResults = function (e, r) {
      var i = new Float64Array(
          (function (e) {
            for (var r = 1, i = e.length, o = 0; o < i; o++) {
              var a = e[o]
              if ((++r, n.defined(a))) {
                var s = a.attributes
                for (var d in ((r += 7 + 2 * t.BoundingSphere.packedLength + (n.defined(a.indices) ? a.indices.length : 0)), s))
                  s.hasOwnProperty(d) && n.defined(s[d]) && (r += 5 + s[d].values.length)
              }
            }
            return r
          })(e)
        ),
        o = [],
        a = {},
        s = e.length,
        d = 0
      i[d++] = s
      for (var p = 0; p < s; p++) {
        var u = e[p],
          f = n.defined(u)
        if (((i[d++] = f ? 1 : 0), f)) {
          ;(i[d++] = u.primitiveType), (i[d++] = u.geometryType), (i[d++] = n.defaultValue(u.offsetAttribute, -1))
          var c = n.defined(u.boundingSphere) ? 1 : 0
          ;(i[d++] = c), c && t.BoundingSphere.pack(u.boundingSphere, i, d), (d += t.BoundingSphere.packedLength)
          var m = n.defined(u.boundingSphereCV) ? 1 : 0
          ;(i[d++] = m), m && t.BoundingSphere.pack(u.boundingSphereCV, i, d), (d += t.BoundingSphere.packedLength)
          var l = u.attributes,
            h = []
          for (var g in l) l.hasOwnProperty(g) && n.defined(l[g]) && (h.push(g), n.defined(a[g]) || ((a[g] = o.length), o.push(g)))
          i[d++] = h.length
          for (var y = 0; y < h.length; y++) {
            var b = h[y],
              v = l[b]
            ;(i[d++] = a[b]),
              (i[d++] = v.componentDatatype),
              (i[d++] = v.componentsPerAttribute),
              (i[d++] = v.normalize ? 1 : 0),
              (i[d++] = v.values.length),
              i.set(v.values, d),
              (d += v.values.length)
          }
          var x = n.defined(u.indices) ? u.indices.length : 0
          ;(i[d++] = x), x > 0 && (i.set(u.indices, d), (d += x))
        }
      }
      return r.push(i.buffer), { stringTable: o, packedData: i }
    }),
    (h.unpackCreateGeometryResults = function (e) {
      for (var n, i = e.stringTable, o = e.packedData, d = new Array(o[0]), u = 0, f = 1; f < o.length; ) {
        if (1 === o[f++]) {
          var c,
            m,
            l,
            h,
            g,
            y = o[f++],
            b = o[f++],
            v = o[f++]
          ;-1 === v && (v = void 0),
            1 === o[f++] && (c = t.BoundingSphere.unpack(o, f)),
            (f += t.BoundingSphere.packedLength),
            1 === o[f++] && (m = t.BoundingSphere.unpack(o, f)),
            (f += t.BoundingSphere.packedLength)
          var x,
            G = new s.GeometryAttributes(),
            S = o[f++]
          for (n = 0; n < S; n++) {
            var P = i[o[f++]],
              k = o[f++]
            g = o[f++]
            var C = 0 !== o[f++]
            ;(l = o[f++]), (h = r.ComponentDatatype.createTypedArray(k, l))
            for (var w = 0; w < l; w++) h[w] = o[f++]
            G[P] = new a.GeometryAttribute({ componentDatatype: k, componentsPerAttribute: g, normalize: C, values: h })
          }
          if ((l = o[f++]) > 0) {
            var A = h.length / g
            for (x = p.IndexDatatype.createTypedArray(A, l), n = 0; n < l; n++) x[n] = o[f++]
          }
          d[u++] = new a.Geometry({
            primitiveType: y,
            geometryType: b,
            boundingSphere: c,
            boundingSphereCV: m,
            indices: x,
            attributes: G,
            offsetAttribute: v
          })
        } else d[u++] = void 0
      }
      return d
    }),
    (h.packCombineGeometryParameters = function (e, r) {
      for (var n = e.createGeometryResults, i = n.length, o = 0; o < i; o++) r.push(n[o].packedData.buffer)
      return {
        createGeometryResults: e.createGeometryResults,
        packedInstances: y(e.instances, r),
        ellipsoid: e.ellipsoid,
        isGeographic: e.projection instanceof t.GeographicProjection,
        elementIndexUintSupported: e.elementIndexUintSupported,
        scene3DOnly: e.scene3DOnly,
        vertexCacheOptimize: e.vertexCacheOptimize,
        compressVertices: e.compressVertices,
        modelMatrix: e.modelMatrix,
        createPickOffsets: e.createPickOffsets
      }
    }),
    (h.unpackCombineGeometryParameters = function (e) {
      for (
        var r = (function (e) {
            for (var t = e, r = new Array(t[0]), i = 0, a = 1; a < t.length; ) {
              var s,
                d = o.Matrix4.unpack(t, a)
              ;(a += o.Matrix4.packedLength),
                n.defined(t[a]) && (s = { offset: new f(t[a], t[a + 1], t[a + 2]) }),
                (a += 3),
                (r[i++] = { modelMatrix: d, attributes: s })
            }
            return r
          })(e.packedInstances),
          i = e.createGeometryResults,
          a = i.length,
          s = 0,
          d = 0;
        d < a;
        d++
      )
        for (var p = h.unpackCreateGeometryResults(i[d]), c = p.length, m = 0; m < c; m++) {
          var l = p[m]
          ;(r[s].geometry = l), ++s
        }
      var g = o.Ellipsoid.clone(e.ellipsoid)
      return {
        instances: r,
        ellipsoid: g,
        projection: e.isGeographic ? new t.GeographicProjection(g) : new u.WebMercatorProjection(g),
        elementIndexUintSupported: e.elementIndexUintSupported,
        scene3DOnly: e.scene3DOnly,
        vertexCacheOptimize: e.vertexCacheOptimize,
        compressVertices: e.compressVertices,
        modelMatrix: o.Matrix4.clone(e.modelMatrix),
        createPickOffsets: e.createPickOffsets
      }
    }),
    (h.packCombineGeometryResults = function (e, t) {
      n.defined(e.geometries) &&
        (function (e, t) {
          for (var r = e.length, n = 0; n < r; ++n) g(e[n], t)
        })(e.geometries, t)
      var r = b(e.boundingSpheres),
        i = b(e.boundingSpheresCV)
      return (
        t.push(r.buffer, i.buffer),
        {
          geometries: e.geometries,
          attributeLocations: e.attributeLocations,
          modelMatrix: e.modelMatrix,
          pickOffsets: e.pickOffsets,
          offsetInstanceExtend: e.offsetInstanceExtend,
          boundingSpheres: r,
          boundingSpheresCV: i
        }
      )
    }),
    (h.unpackCombineGeometryResults = function (e) {
      return {
        geometries: e.geometries,
        attributeLocations: e.attributeLocations,
        modelMatrix: e.modelMatrix,
        pickOffsets: e.pickOffsets,
        offsetInstanceExtend: e.offsetInstanceExtend,
        boundingSpheres: v(e.boundingSpheres),
        boundingSpheresCV: v(e.boundingSpheresCV)
      }
    }),
    (e.PrimitivePipeline = h)
})
