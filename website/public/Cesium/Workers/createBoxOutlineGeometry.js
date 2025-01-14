define([
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './combine-83860057',
  './WebGLConstants-1c8239cc'
], function (e, t, a, n, i, r, u, m, o, s) {
  'use strict'
  var f = new a.Cartesian3()
  function c(e) {
    var t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).minimum,
      n = e.maximum
    ;(this._min = a.Cartesian3.clone(t)),
      (this._max = a.Cartesian3.clone(n)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createBoxOutlineGeometry')
  }
  ;(c.fromDimensions = function (e) {
    var t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).dimensions,
      n = a.Cartesian3.multiplyByScalar(t, 0.5, new a.Cartesian3())
    return new c({ minimum: a.Cartesian3.negate(n, new a.Cartesian3()), maximum: n, offsetAttribute: e.offsetAttribute })
  }),
    (c.fromAxisAlignedBoundingBox = function (e) {
      return new c({ minimum: e.minimum, maximum: e.maximum })
    }),
    (c.packedLength = 2 * a.Cartesian3.packedLength + 1),
    (c.pack = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        a.Cartesian3.pack(e._min, t, n),
        a.Cartesian3.pack(e._max, t, n + a.Cartesian3.packedLength),
        (t[n + 2 * a.Cartesian3.packedLength] = r.defaultValue(e._offsetAttribute, -1)),
        t
      )
    })
  var d = new a.Cartesian3(),
    p = new a.Cartesian3(),
    y = { minimum: d, maximum: p, offsetAttribute: void 0 }
  return (
    (c.unpack = function (e, t, n) {
      t = r.defaultValue(t, 0)
      var i = a.Cartesian3.unpack(e, t, d),
        u = a.Cartesian3.unpack(e, t + a.Cartesian3.packedLength, p),
        m = e[t + 2 * a.Cartesian3.packedLength]
      return r.defined(n)
        ? ((n._min = a.Cartesian3.clone(i, n._min)), (n._max = a.Cartesian3.clone(u, n._max)), (n._offsetAttribute = -1 === m ? void 0 : m), n)
        : ((y.offsetAttribute = -1 === m ? void 0 : m), new c(y))
    }),
    (c.createGeometry = function (n) {
      var o = n._min,
        s = n._max
      if (!a.Cartesian3.equals(o, s)) {
        var c = new m.GeometryAttributes(),
          d = new Uint16Array(24),
          p = new Float64Array(24)
        ;(p[0] = o.x),
          (p[1] = o.y),
          (p[2] = o.z),
          (p[3] = s.x),
          (p[4] = o.y),
          (p[5] = o.z),
          (p[6] = s.x),
          (p[7] = s.y),
          (p[8] = o.z),
          (p[9] = o.x),
          (p[10] = s.y),
          (p[11] = o.z),
          (p[12] = o.x),
          (p[13] = o.y),
          (p[14] = s.z),
          (p[15] = s.x),
          (p[16] = o.y),
          (p[17] = s.z),
          (p[18] = s.x),
          (p[19] = s.y),
          (p[20] = s.z),
          (p[21] = o.x),
          (p[22] = s.y),
          (p[23] = s.z),
          (c.position = new u.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: p })),
          (d[0] = 4),
          (d[1] = 5),
          (d[2] = 5),
          (d[3] = 6),
          (d[4] = 6),
          (d[5] = 7),
          (d[6] = 7),
          (d[7] = 4),
          (d[8] = 0),
          (d[9] = 1),
          (d[10] = 1),
          (d[11] = 2),
          (d[12] = 2),
          (d[13] = 3),
          (d[14] = 3),
          (d[15] = 0),
          (d[16] = 0),
          (d[17] = 4),
          (d[18] = 1),
          (d[19] = 5),
          (d[20] = 2),
          (d[21] = 6),
          (d[22] = 3),
          (d[23] = 7)
        var y = a.Cartesian3.subtract(s, o, f),
          l = 0.5 * a.Cartesian3.magnitude(y)
        if (r.defined(n._offsetAttribute)) {
          var C = p.length,
            b = new Uint8Array(C / 3),
            A = n._offsetAttribute === e.GeometryOffsetAttribute.NONE ? 0 : 1
          e.arrayFill(b, A),
            (c.applyOffset = new u.GeometryAttribute({ componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: b }))
        }
        return new u.Geometry({
          attributes: c,
          indices: d,
          primitiveType: u.PrimitiveType.LINES,
          boundingSphere: new t.BoundingSphere(a.Cartesian3.ZERO, l),
          offsetAttribute: n._offsetAttribute
        })
      }
    }),
    function (e, t) {
      return r.defined(t) && (e = c.unpack(e, t)), c.createGeometry(e)
    }
  )
})
