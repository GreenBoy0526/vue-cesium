define([
  'exports',
  './Matrix2-9aa31791',
  './when-4bbc8319',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a'
], function (a, t, e, r, n, i) {
  'use strict'
  var s = {}
  function o(a, t, e) {
    var r = a + t
    return i.CesiumMath.sign(a) !== i.CesiumMath.sign(t) && Math.abs(r / Math.max(Math.abs(a), Math.abs(t))) < e ? 0 : r
  }
  ;(s.computeDiscriminant = function (a, t, e) {
    return t * t - 4 * a * e
  }),
    (s.computeRealRoots = function (a, t, e) {
      var r
      if (0 === a) return 0 === t ? [] : [-e / t]
      if (0 === t) {
        if (0 === e) return [0, 0]
        var n = Math.abs(e),
          s = Math.abs(a)
        if (n < s && n / s < i.CesiumMath.EPSILON14) return [0, 0]
        if (n > s && s / n < i.CesiumMath.EPSILON14) return []
        if ((r = -e / a) < 0) return []
        var u = Math.sqrt(r)
        return [-u, u]
      }
      if (0 === e) return (r = -t / a) < 0 ? [r, 0] : [0, r]
      var C = o(t * t, -(4 * a * e), i.CesiumMath.EPSILON14)
      if (C < 0) return []
      var c = -0.5 * o(t, i.CesiumMath.sign(t) * Math.sqrt(C), i.CesiumMath.EPSILON14)
      return t > 0 ? [c / a, e / c] : [e / c, c / a]
    })
  var u = {}
  function C(a, t, e, r) {
    var n,
      i,
      s = a,
      o = t / 3,
      u = e / 3,
      C = r,
      c = s * u,
      l = o * C,
      h = o * o,
      M = u * u,
      m = s * u - h,
      f = s * C - o * u,
      d = o * C - M,
      v = 4 * m * d - f * f
    if (v < 0) {
      var g, p, w
      h * l >= c * M ? ((g = s), (p = m), (w = -2 * o * m + s * f)) : ((g = C), (p = d), (w = -C * f + 2 * u * d))
      var R = -(w < 0 ? -1 : 1) * Math.abs(g) * Math.sqrt(-v),
        S = (i = -w + R) / 2,
        O = S < 0 ? -Math.pow(-S, 1 / 3) : Math.pow(S, 1 / 3),
        x = i === R ? -O : -p / O
      return (n = p <= 0 ? O + x : -w / (O * O + x * x + p)), h * l >= c * M ? [(n - o) / s] : [-C / (n + u)]
    }
    var y = m,
      P = -2 * o * m + s * f,
      b = d,
      N = -C * f + 2 * u * d,
      q = Math.sqrt(v),
      L = Math.sqrt(3) / 2,
      I = Math.abs(Math.atan2(s * q, -P) / 3)
    n = 2 * Math.sqrt(-y)
    var E = Math.cos(I)
    i = n * E
    var z = n * (-E / 2 - L * Math.sin(I)),
      T = i + z > 2 * o ? i - o : z - o,
      U = s,
      W = T / U
    I = Math.abs(Math.atan2(C * q, -N) / 3)
    var B = -C,
      V = (i = (n = 2 * Math.sqrt(-b)) * (E = Math.cos(I))) + (z = n * (-E / 2 - L * Math.sin(I))) < 2 * u ? i + u : z + u,
      Z = B / V,
      D = -T * V - U * B,
      A = (u * D - o * (T * B)) / (-o * D + u * (U * V))
    return W <= A ? (W <= Z ? (A <= Z ? [W, A, Z] : [W, Z, A]) : [Z, W, A]) : W <= Z ? [A, W, Z] : A <= Z ? [A, Z, W] : [Z, A, W]
  }
  ;(u.computeDiscriminant = function (a, t, e, r) {
    var n = t * t,
      i = e * e
    return 18 * a * t * e * r + n * i - 27 * (a * a) * (r * r) - 4 * (a * i * e + n * t * r)
  }),
    (u.computeRealRoots = function (a, t, e, r) {
      var n, i
      if (0 === a) return s.computeRealRoots(t, e, r)
      if (0 === t) {
        if (0 === e) {
          if (0 === r) return [0, 0, 0]
          var o = (i = -r / a) < 0 ? -Math.pow(-i, 1 / 3) : Math.pow(i, 1 / 3)
          return [o, o, o]
        }
        return 0 === r ? (0 === (n = s.computeRealRoots(a, 0, e)).Length ? [0] : [n[0], 0, n[1]]) : C(a, 0, e, r)
      }
      return 0 === e
        ? 0 === r
          ? (i = -t / a) < 0
            ? [i, 0, 0]
            : [0, 0, i]
          : C(a, t, 0, r)
        : 0 === r
        ? 0 === (n = s.computeRealRoots(a, t, e)).length
          ? [0]
          : n[1] <= 0
          ? [n[0], n[1], 0]
          : n[0] >= 0
          ? [0, n[0], n[1]]
          : [n[0], 0, n[1]]
        : C(a, t, e, r)
    })
  var c = {}
  function l(a, t, e, r) {
    var n = a * a,
      o = t - (3 * n) / 8,
      C = e - (t * a) / 2 + (n * a) / 8,
      c = r - (e * a) / 4 + (t * n) / 16 - (3 * n * n) / 256,
      l = u.computeRealRoots(1, 2 * o, o * o - 4 * c, -C * C)
    if (l.length > 0) {
      var h = -a / 4,
        M = l[l.length - 1]
      if (Math.abs(M) < i.CesiumMath.EPSILON14) {
        var m = s.computeRealRoots(1, o, c)
        if (2 === m.length) {
          var f,
            d = m[0],
            v = m[1]
          if (d >= 0 && v >= 0) {
            var g = Math.sqrt(d),
              p = Math.sqrt(v)
            return [h - p, h - g, h + g, h + p]
          }
          if (d >= 0 && v < 0) return [h - (f = Math.sqrt(d)), h + f]
          if (d < 0 && v >= 0) return [h - (f = Math.sqrt(v)), h + f]
        }
        return []
      }
      if (M > 0) {
        var w = Math.sqrt(M),
          R = (o + M - C / w) / 2,
          S = (o + M + C / w) / 2,
          O = s.computeRealRoots(1, w, R),
          x = s.computeRealRoots(1, -w, S)
        return 0 !== O.length
          ? ((O[0] += h),
            (O[1] += h),
            0 !== x.length
              ? ((x[0] += h),
                (x[1] += h),
                O[1] <= x[0]
                  ? [O[0], O[1], x[0], x[1]]
                  : x[1] <= O[0]
                  ? [x[0], x[1], O[0], O[1]]
                  : O[0] >= x[0] && O[1] <= x[1]
                  ? [x[0], O[0], O[1], x[1]]
                  : x[0] >= O[0] && x[1] <= O[1]
                  ? [O[0], x[0], x[1], O[1]]
                  : O[0] > x[0] && O[0] < x[1]
                  ? [x[0], O[0], x[1], O[1]]
                  : [O[0], x[0], O[1], x[1]])
              : O)
          : 0 !== x.length
          ? ((x[0] += h), (x[1] += h), x)
          : []
      }
    }
    return []
  }
  function h(a, t, e, r) {
    var n = a * a,
      o = -2 * t,
      C = e * a + t * t - 4 * r,
      c = n * r - e * t * a + e * e,
      l = u.computeRealRoots(1, o, C, c)
    if (l.length > 0) {
      var h,
        M,
        m,
        f,
        d,
        v,
        g = l[0],
        p = t - g,
        w = p * p,
        R = a / 2,
        S = p / 2,
        O = w - 4 * r,
        x = w + 4 * Math.abs(r),
        y = n - 4 * g,
        P = n + 4 * Math.abs(g)
      if (g < 0 || O * P < y * x) {
        var b = Math.sqrt(y)
        ;(h = b / 2), (M = 0 === b ? 0 : (a * S - e) / b)
      } else {
        var N = Math.sqrt(O)
        ;(h = 0 === N ? 0 : (a * S - e) / N), (M = N / 2)
      }
      0 === R && 0 === h ? ((m = 0), (f = 0)) : i.CesiumMath.sign(R) === i.CesiumMath.sign(h) ? (f = g / (m = R + h)) : (m = g / (f = R - h)),
        0 === S && 0 === M ? ((d = 0), (v = 0)) : i.CesiumMath.sign(S) === i.CesiumMath.sign(M) ? (v = r / (d = S + M)) : (d = r / (v = S - M))
      var q = s.computeRealRoots(1, m, d),
        L = s.computeRealRoots(1, f, v)
      if (0 !== q.length)
        return 0 !== L.length
          ? q[1] <= L[0]
            ? [q[0], q[1], L[0], L[1]]
            : L[1] <= q[0]
            ? [L[0], L[1], q[0], q[1]]
            : q[0] >= L[0] && q[1] <= L[1]
            ? [L[0], q[0], q[1], L[1]]
            : L[0] >= q[0] && L[1] <= q[1]
            ? [q[0], L[0], L[1], q[1]]
            : q[0] > L[0] && q[0] < L[1]
            ? [L[0], q[0], L[1], q[1]]
            : [q[0], L[0], q[1], L[1]]
          : q
      if (0 !== L.length) return L
    }
    return []
  }
  function M(a, r) {
    ;(r = t.Cartesian3.clone(e.defaultValue(r, t.Cartesian3.ZERO))),
      t.Cartesian3.equals(r, t.Cartesian3.ZERO) || t.Cartesian3.normalize(r, r),
      (this.origin = t.Cartesian3.clone(e.defaultValue(a, t.Cartesian3.ZERO))),
      (this.direction = r)
  }
  ;(c.computeDiscriminant = function (a, t, e, r, n) {
    var i = a * a,
      s = t * t,
      o = s * t,
      u = e * e,
      C = u * e,
      c = r * r,
      l = c * r,
      h = n * n
    return (
      s * u * c -
      4 * o * l -
      4 * a * C * c +
      18 * a * t * e * l -
      27 * i * c * c +
      256 * (i * a) * (h * n) +
      n * (18 * o * e * r - 4 * s * C + 16 * a * u * u - 80 * a * t * u * r - 6 * a * s * c + 144 * i * e * c) +
      h * (144 * a * s * e - 27 * s * s - 128 * i * u - 192 * i * t * r)
    )
  }),
    (c.computeRealRoots = function (a, t, e, r, n) {
      if (Math.abs(a) < i.CesiumMath.EPSILON15) return u.computeRealRoots(t, e, r, n)
      var s = t / a,
        o = e / a,
        C = r / a,
        c = n / a,
        M = s < 0 ? 1 : 0
      switch (((M += o < 0 ? M + 1 : M), (M += C < 0 ? M + 1 : M), (M += c < 0 ? M + 1 : M))) {
        case 0:
        case 3:
        case 4:
        case 6:
        case 7:
        case 9:
        case 10:
        case 12:
        case 13:
        case 14:
        case 15:
          return l(s, o, C, c)
        case 1:
        case 2:
        case 5:
        case 8:
        case 11:
          return h(s, o, C, c)
        default:
          return
      }
    }),
    (M.clone = function (a, r) {
      if (e.defined(a))
        return e.defined(r)
          ? ((r.origin = t.Cartesian3.clone(a.origin)), (r.direction = t.Cartesian3.clone(a.direction)), r)
          : new M(a.origin, a.direction)
    }),
    (M.getPoint = function (a, r, n) {
      return e.defined(n) || (n = new t.Cartesian3()), (n = t.Cartesian3.multiplyByScalar(a.direction, r, n)), t.Cartesian3.add(a.origin, n, n)
    })
  var m = {
      rayPlane: function (a, r, n) {
        e.defined(n) || (n = new t.Cartesian3())
        var s = a.origin,
          o = a.direction,
          u = r.normal,
          C = t.Cartesian3.dot(u, o)
        if (!(Math.abs(C) < i.CesiumMath.EPSILON15)) {
          var c = (-r.distance - t.Cartesian3.dot(u, s)) / C
          if (!(c < 0)) return (n = t.Cartesian3.multiplyByScalar(o, c, n)), t.Cartesian3.add(s, n, n)
        }
      }
    },
    f = new t.Cartesian3(),
    d = new t.Cartesian3(),
    v = new t.Cartesian3(),
    g = new t.Cartesian3(),
    p = new t.Cartesian3()
  ;(m.rayTriangleParametric = function (a, r, n, s, o) {
    o = e.defaultValue(o, !1)
    var u,
      C,
      c,
      l,
      h,
      M = a.origin,
      m = a.direction,
      w = t.Cartesian3.subtract(n, r, f),
      R = t.Cartesian3.subtract(s, r, d),
      S = t.Cartesian3.cross(m, R, v),
      O = t.Cartesian3.dot(w, S)
    if (o) {
      if (O < i.CesiumMath.EPSILON6) return
      if (((u = t.Cartesian3.subtract(M, r, g)), (c = t.Cartesian3.dot(u, S)) < 0 || c > O)) return
      if (((C = t.Cartesian3.cross(u, w, p)), (l = t.Cartesian3.dot(m, C)) < 0 || c + l > O)) return
      h = t.Cartesian3.dot(R, C) / O
    } else {
      if (Math.abs(O) < i.CesiumMath.EPSILON6) return
      var x = 1 / O
      if (((u = t.Cartesian3.subtract(M, r, g)), (c = t.Cartesian3.dot(u, S) * x) < 0 || c > 1)) return
      if (((C = t.Cartesian3.cross(u, w, p)), (l = t.Cartesian3.dot(m, C) * x) < 0 || c + l > 1)) return
      h = t.Cartesian3.dot(R, C) * x
    }
    return h
  }),
    (m.rayTriangle = function (a, r, n, i, s, o) {
      var u = m.rayTriangleParametric(a, r, n, i, s)
      if (e.defined(u) && !(u < 0))
        return e.defined(o) || (o = new t.Cartesian3()), t.Cartesian3.multiplyByScalar(a.direction, u, o), t.Cartesian3.add(a.origin, o, o)
    })
  var w = new M()
  m.lineSegmentTriangle = function (a, r, n, i, s, o, u) {
    var C = w
    t.Cartesian3.clone(a, C.origin), t.Cartesian3.subtract(r, a, C.direction), t.Cartesian3.normalize(C.direction, C.direction)
    var c = m.rayTriangleParametric(C, n, i, s, o)
    if (!(!e.defined(c) || c < 0 || c > t.Cartesian3.distance(a, r)))
      return e.defined(u) || (u = new t.Cartesian3()), t.Cartesian3.multiplyByScalar(C.direction, c, u), t.Cartesian3.add(C.origin, u, u)
  }
  var R = { root0: 0, root1: 0 }
  function S(a, r, i) {
    e.defined(i) || (i = new n.Interval())
    var s = a.origin,
      o = a.direction,
      u = r.center,
      C = r.radius * r.radius,
      c = t.Cartesian3.subtract(s, u, v),
      l = (function (a, t, e, r) {
        var n = t * t - 4 * a * e
        if (!(n < 0)) {
          if (n > 0) {
            var i = 1 / (2 * a),
              s = Math.sqrt(n),
              o = (-t + s) * i,
              u = (-t - s) * i
            return o < u ? ((r.root0 = o), (r.root1 = u)) : ((r.root0 = u), (r.root1 = o)), r
          }
          var C = -t / (2 * a)
          if (0 !== C) return (r.root0 = r.root1 = C), r
        }
      })(t.Cartesian3.dot(o, o), 2 * t.Cartesian3.dot(o, c), t.Cartesian3.magnitudeSquared(c) - C, R)
    if (e.defined(l)) return (i.start = l.root0), (i.stop = l.root1), i
  }
  m.raySphere = function (a, t, r) {
    if (((r = S(a, t, r)), e.defined(r) && !(r.stop < 0))) return (r.start = Math.max(r.start, 0)), r
  }
  var O = new M()
  m.lineSegmentSphere = function (a, r, n, i) {
    var s = O
    t.Cartesian3.clone(a, s.origin)
    var o = t.Cartesian3.subtract(r, a, s.direction),
      u = t.Cartesian3.magnitude(o)
    if ((t.Cartesian3.normalize(o, o), (i = S(s, n, i)), !(!e.defined(i) || i.stop < 0 || i.start > u)))
      return (i.start = Math.max(i.start, 0)), (i.stop = Math.min(i.stop, u)), i
  }
  var x = new t.Cartesian3(),
    y = new t.Cartesian3()
  function P(a, t, e) {
    var r = a + t
    return i.CesiumMath.sign(a) !== i.CesiumMath.sign(t) && Math.abs(r / Math.max(Math.abs(a), Math.abs(t))) < e ? 0 : r
  }
  m.rayEllipsoid = function (a, e) {
    var r,
      i,
      s,
      o,
      u,
      C = e.oneOverRadii,
      c = t.Cartesian3.multiplyComponents(C, a.origin, x),
      l = t.Cartesian3.multiplyComponents(C, a.direction, y),
      h = t.Cartesian3.magnitudeSquared(c),
      M = t.Cartesian3.dot(c, l)
    if (h > 1) {
      if (M >= 0) return
      var m = M * M
      if (((r = h - 1), m < (s = (i = t.Cartesian3.magnitudeSquared(l)) * r))) return
      if (m > s) {
        o = M * M - s
        var f = (u = -M + Math.sqrt(o)) / i,
          d = r / u
        return f < d ? new n.Interval(f, d) : { start: d, stop: f }
      }
      var v = Math.sqrt(r / i)
      return new n.Interval(v, v)
    }
    return h < 1
      ? ((r = h - 1), (o = M * M - (s = (i = t.Cartesian3.magnitudeSquared(l)) * r)), (u = -M + Math.sqrt(o)), new n.Interval(0, u / i))
      : M < 0
      ? ((i = t.Cartesian3.magnitudeSquared(l)), new n.Interval(0, -M / i))
      : void 0
  }
  var b = new t.Cartesian3(),
    N = new t.Cartesian3(),
    q = new t.Cartesian3(),
    L = new t.Cartesian3(),
    I = new t.Cartesian3(),
    E = new t.Matrix3(),
    z = new t.Matrix3(),
    T = new t.Matrix3(),
    U = new t.Matrix3(),
    W = new t.Matrix3(),
    B = new t.Matrix3(),
    V = new t.Matrix3(),
    Z = new t.Cartesian3(),
    D = new t.Cartesian3(),
    A = new t.Cartographic()
  m.grazingAltitudeLocation = function (a, r) {
    var n = a.origin,
      o = a.direction
    if (!t.Cartesian3.equals(n, t.Cartesian3.ZERO)) {
      var u = r.geodeticSurfaceNormal(n, b)
      if (t.Cartesian3.dot(o, u) >= 0) return n
    }
    var C = e.defined(this.rayEllipsoid(a, r)),
      l = r.transformPositionToScaledSpace(o, b),
      h = t.Cartesian3.normalize(l, l),
      M = t.Cartesian3.mostOrthogonalAxis(l, L),
      m = t.Cartesian3.normalize(t.Cartesian3.cross(M, h, N), N),
      f = t.Cartesian3.normalize(t.Cartesian3.cross(h, m, q), q),
      d = E
    ;(d[0] = h.x), (d[1] = h.y), (d[2] = h.z), (d[3] = m.x), (d[4] = m.y), (d[5] = m.z), (d[6] = f.x), (d[7] = f.y), (d[8] = f.z)
    var v = t.Matrix3.transpose(d, z),
      g = t.Matrix3.fromScale(r.radii, T),
      p = t.Matrix3.fromScale(r.oneOverRadii, U),
      w = W
    ;(w[0] = 0), (w[1] = -o.z), (w[2] = o.y), (w[3] = o.z), (w[4] = 0), (w[5] = -o.x), (w[6] = -o.y), (w[7] = o.x), (w[8] = 0)
    var R,
      S,
      O = t.Matrix3.multiply(t.Matrix3.multiply(v, p, B), w, B),
      x = t.Matrix3.multiply(t.Matrix3.multiply(O, g, V), d, V),
      y = t.Matrix3.multiplyByVector(O, n, I),
      F = (function (a, e, r, n, o) {
        var u,
          C = n * n,
          l = o * o,
          h = (a[t.Matrix3.COLUMN1ROW1] - a[t.Matrix3.COLUMN2ROW2]) * l,
          M = o * (n * P(a[t.Matrix3.COLUMN1ROW0], a[t.Matrix3.COLUMN0ROW1], i.CesiumMath.EPSILON15) + e.y),
          m = a[t.Matrix3.COLUMN0ROW0] * C + a[t.Matrix3.COLUMN2ROW2] * l + n * e.x + r,
          f = l * P(a[t.Matrix3.COLUMN2ROW1], a[t.Matrix3.COLUMN1ROW2], i.CesiumMath.EPSILON15),
          d = o * (n * P(a[t.Matrix3.COLUMN2ROW0], a[t.Matrix3.COLUMN0ROW2]) + e.z),
          v = []
        if (0 === d && 0 === f) {
          if (0 === (u = s.computeRealRoots(h, M, m)).length) return v
          var g = u[0],
            p = Math.sqrt(Math.max(1 - g * g, 0))
          if ((v.push(new t.Cartesian3(n, o * g, o * -p)), v.push(new t.Cartesian3(n, o * g, o * p)), 2 === u.length)) {
            var w = u[1],
              R = Math.sqrt(Math.max(1 - w * w, 0))
            v.push(new t.Cartesian3(n, o * w, o * -R)), v.push(new t.Cartesian3(n, o * w, o * R))
          }
          return v
        }
        var S = d * d,
          O = f * f,
          x = d * f,
          y = h * h + O,
          b = 2 * (M * h + x),
          N = 2 * m * h + M * M - O + S,
          q = 2 * (m * M - x),
          L = m * m - S
        if (0 === y && 0 === b && 0 === N && 0 === q) return v
        var I = (u = c.computeRealRoots(y, b, N, q, L)).length
        if (0 === I) return v
        for (var E = 0; E < I; ++E) {
          var z = u[E],
            T = z * z,
            U = Math.max(1 - T, 0),
            W = Math.sqrt(U),
            B =
              (i.CesiumMath.sign(h) === i.CesiumMath.sign(m)
                ? P(h * T + m, M * z, i.CesiumMath.EPSILON12)
                : i.CesiumMath.sign(m) === i.CesiumMath.sign(M * z)
                ? P(h * T, M * z + m, i.CesiumMath.EPSILON12)
                : P(h * T + M * z, m, i.CesiumMath.EPSILON12)) * P(f * z, d, i.CesiumMath.EPSILON15)
          B < 0
            ? v.push(new t.Cartesian3(n, o * z, o * W))
            : B > 0
            ? v.push(new t.Cartesian3(n, o * z, o * -W))
            : 0 !== W
            ? (v.push(new t.Cartesian3(n, o * z, o * -W)), v.push(new t.Cartesian3(n, o * z, o * W)), ++E)
            : v.push(new t.Cartesian3(n, o * z, o * W))
        }
        return v
      })(x, t.Cartesian3.negate(y, b), 0, 0, 1),
      G = F.length
    if (G > 0) {
      for (var Y = t.Cartesian3.clone(t.Cartesian3.ZERO, D), _ = Number.NEGATIVE_INFINITY, j = 0; j < G; ++j) {
        R = t.Matrix3.multiplyByVector(g, t.Matrix3.multiplyByVector(d, F[j], Z), Z)
        var k = t.Cartesian3.normalize(t.Cartesian3.subtract(R, n, L), L),
          H = t.Cartesian3.dot(k, o)
        H > _ && ((_ = H), (Y = t.Cartesian3.clone(R, Y)))
      }
      var J = r.cartesianToCartographic(Y, A)
      return (
        (_ = i.CesiumMath.clamp(_, 0, 1)),
        (S = t.Cartesian3.magnitude(t.Cartesian3.subtract(Y, n, L)) * Math.sqrt(1 - _ * _)),
        (S = C ? -S : S),
        (J.height = S),
        r.cartographicToCartesian(J, new t.Cartesian3())
      )
    }
  }
  var F = new t.Cartesian3()
  ;(m.lineSegmentPlane = function (a, r, n, s) {
    e.defined(s) || (s = new t.Cartesian3())
    var o = t.Cartesian3.subtract(r, a, F),
      u = n.normal,
      C = t.Cartesian3.dot(u, o)
    if (!(Math.abs(C) < i.CesiumMath.EPSILON6)) {
      var c = t.Cartesian3.dot(u, a),
        l = -(n.distance + c) / C
      if (!(l < 0 || l > 1)) return t.Cartesian3.multiplyByScalar(o, l, s), t.Cartesian3.add(a, s, s), s
    }
  }),
    (m.trianglePlaneIntersection = function (a, e, r, n) {
      var i,
        s,
        o = n.normal,
        u = n.distance,
        C = t.Cartesian3.dot(o, a) + u < 0,
        c = t.Cartesian3.dot(o, e) + u < 0,
        l = t.Cartesian3.dot(o, r) + u < 0,
        h = 0
      if (
        ((h += C ? 1 : 0), (h += c ? 1 : 0), (1 !== (h += l ? 1 : 0) && 2 !== h) || ((i = new t.Cartesian3()), (s = new t.Cartesian3())), 1 === h)
      ) {
        if (C)
          return m.lineSegmentPlane(a, e, n, i), m.lineSegmentPlane(a, r, n, s), { positions: [a, e, r, i, s], indices: [0, 3, 4, 1, 2, 4, 1, 4, 3] }
        if (c)
          return m.lineSegmentPlane(e, r, n, i), m.lineSegmentPlane(e, a, n, s), { positions: [a, e, r, i, s], indices: [1, 3, 4, 2, 0, 4, 2, 4, 3] }
        if (l)
          return m.lineSegmentPlane(r, a, n, i), m.lineSegmentPlane(r, e, n, s), { positions: [a, e, r, i, s], indices: [2, 3, 4, 0, 1, 4, 0, 4, 3] }
      } else if (2 === h) {
        if (!C)
          return m.lineSegmentPlane(e, a, n, i), m.lineSegmentPlane(r, a, n, s), { positions: [a, e, r, i, s], indices: [1, 2, 4, 1, 4, 3, 0, 3, 4] }
        if (!c)
          return m.lineSegmentPlane(r, e, n, i), m.lineSegmentPlane(a, e, n, s), { positions: [a, e, r, i, s], indices: [2, 0, 4, 2, 4, 3, 1, 3, 4] }
        if (!l)
          return m.lineSegmentPlane(a, r, n, i), m.lineSegmentPlane(e, r, n, s), { positions: [a, e, r, i, s], indices: [0, 1, 4, 0, 4, 3, 2, 3, 4] }
      }
    }),
    (a.IntersectionTests = m),
    (a.Ray = M)
})
