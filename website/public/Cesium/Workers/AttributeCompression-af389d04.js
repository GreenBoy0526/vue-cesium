define(['exports', './Matrix2-9aa31791', './ComponentDatatype-93750d1a', './RuntimeError-346a3079', './when-4bbc8319'], function (e, t, a, n, r) {
  'use strict'
  var o = {
      SCALAR: 'SCALAR',
      VEC2: 'VEC2',
      VEC3: 'VEC3',
      VEC4: 'VEC4',
      MAT2: 'MAT2',
      MAT3: 'MAT3',
      MAT4: 'MAT4',
      getMathType: function (e) {
        switch (e) {
          case o.SCALAR:
            return Number
          case o.VEC2:
            return t.Cartesian2
          case o.VEC3:
            return t.Cartesian3
          case o.VEC4:
            return t.Cartesian4
          case o.MAT2:
            return t.Matrix2
          case o.MAT3:
            return t.Matrix3
          case o.MAT4:
            return t.Matrix4
        }
      },
      getNumberOfComponents: function (e) {
        switch (e) {
          case o.SCALAR:
            return 1
          case o.VEC2:
            return 2
          case o.VEC3:
            return 3
          case o.VEC4:
          case o.MAT2:
            return 4
          case o.MAT3:
            return 9
          case o.MAT4:
            return 16
        }
      },
      getGlslType: function (e) {
        switch (e) {
          case o.SCALAR:
            return 'float'
          case o.VEC2:
            return 'vec2'
          case o.VEC3:
            return 'vec3'
          case o.VEC4:
            return 'vec4'
          case o.MAT2:
            return 'mat2'
          case o.MAT3:
            return 'mat3'
          case o.MAT4:
            return 'mat4'
        }
      }
    },
    c = Object.freeze(o),
    s = 1 / 256,
    u = {
      octEncodeInRange: function (e, t, n) {
        if (((n.x = e.x / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z))), (n.y = e.y / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z))), e.z < 0)) {
          var r = n.x,
            o = n.y
          ;(n.x = (1 - Math.abs(o)) * a.CesiumMath.signNotZero(r)), (n.y = (1 - Math.abs(r)) * a.CesiumMath.signNotZero(o))
        }
        return (n.x = a.CesiumMath.toSNorm(n.x, t)), (n.y = a.CesiumMath.toSNorm(n.y, t)), n
      },
      octEncode: function (e, t) {
        return u.octEncodeInRange(e, 255, t)
      }
    },
    i = new t.Cartesian2(),
    C = new Uint8Array(1)
  function M(e) {
    return (C[0] = e), C[0]
  }
  ;(u.octEncodeToCartesian4 = function (e, t) {
    return u.octEncodeInRange(e, 65535, i), (t.x = M(i.x * s)), (t.y = M(i.x)), (t.z = M(i.y * s)), (t.w = M(i.y)), t
  }),
    (u.octDecodeInRange = function (e, n, r, o) {
      if (((o.x = a.CesiumMath.fromSNorm(e, r)), (o.y = a.CesiumMath.fromSNorm(n, r)), (o.z = 1 - (Math.abs(o.x) + Math.abs(o.y))), o.z < 0)) {
        var c = o.x
        ;(o.x = (1 - Math.abs(o.y)) * a.CesiumMath.signNotZero(c)), (o.y = (1 - Math.abs(c)) * a.CesiumMath.signNotZero(o.y))
      }
      return t.Cartesian3.normalize(o, o)
    }),
    (u.octDecode = function (e, t, a) {
      return u.octDecodeInRange(e, t, 255, a)
    }),
    (u.octDecodeFromCartesian4 = function (e, t) {
      var a = 256 * e.x + e.y,
        n = 256 * e.z + e.w
      return u.octDecodeInRange(a, n, 65535, t)
    }),
    (u.octPackFloat = function (e) {
      return 256 * e.x + e.y
    })
  var f = new t.Cartesian2()
  function m(e) {
    return (e >> 1) ^ -(1 & e)
  }
  ;(u.octEncodeFloat = function (e) {
    return u.octEncode(e, f), u.octPackFloat(f)
  }),
    (u.octDecodeFloat = function (e, t) {
      var a = e / 256,
        n = Math.floor(a),
        r = 256 * (a - n)
      return u.octDecode(n, r, t)
    }),
    (u.octPack = function (e, t, a, n) {
      var r = u.octEncodeFloat(e),
        o = u.octEncodeFloat(t),
        c = u.octEncode(a, f)
      return (n.x = 65536 * c.x + r), (n.y = 65536 * c.y + o), n
    }),
    (u.octUnpack = function (e, t, a, n) {
      var r = e.x / 65536,
        o = Math.floor(r),
        c = 65536 * (r - o)
      r = e.y / 65536
      var s = Math.floor(r),
        i = 65536 * (r - s)
      u.octDecodeFloat(c, t), u.octDecodeFloat(i, a), u.octDecode(o, s, n)
    }),
    (u.compressTextureCoordinates = function (e) {
      return 4096 * ((4095 * e.x) | 0) + ((4095 * e.y) | 0)
    }),
    (u.decompressTextureCoordinates = function (e, t) {
      var a = e / 4096,
        n = Math.floor(a)
      return (t.x = n / 4095), (t.y = (e - 4096 * n) / 4095), t
    }),
    (u.zigZagDeltaDecode = function (e, t, a) {
      for (var n = e.length, o = 0, c = 0, s = 0, u = 0; u < n; ++u)
        (o += m(e[u])), (c += m(t[u])), (e[u] = o), (t[u] = c), r.defined(a) && ((s += m(a[u])), (a[u] = s))
    }),
    (u.dequantize = function (e, t, n, r) {
      var o,
        s = c.getNumberOfComponents(n)
      switch (t) {
        case a.ComponentDatatype.BYTE:
          o = 127
          break
        case a.ComponentDatatype.UNSIGNED_BYTE:
          o = 255
          break
        case a.ComponentDatatype.SHORT:
          o = 32767
          break
        case a.ComponentDatatype.UNSIGNED_SHORT:
          o = 65535
          break
        case a.ComponentDatatype.INT:
          o = 2147483647
          break
        case a.ComponentDatatype.UNSIGNED_INT:
          o = 4294967295
      }
      for (var u = new Float32Array(r * s), i = 0; i < r; i++)
        for (var C = 0; C < s; C++) {
          var M = i * s + C
          u[M] = Math.max(e[M] / o, -1)
        }
      return u
    }),
    (e.AttributeCompression = u)
})
